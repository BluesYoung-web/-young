import { defineNuxtPlugin } from "nuxt/app";
import { options } from "#build/@bluesyoung/nuxt3-lazy-load";
function isPictureChild(el) {
  return el.parentNode && el.parentNode.nodeName.toLocaleLowerCase() === "picture";
}
function setAttribute(el, attribute) {
  const dataAttribute = `data-${attribute}`;
  if (el instanceof NodeList) {
    for (const e of el)
      setAttribute(e, attribute);
  } else if (el.getAttribute(dataAttribute)) {
    el.setAttribute(attribute, el.getAttribute(dataAttribute));
    el.removeAttribute(dataAttribute);
    el.parentNode.load && el.parentNode.load();
  } else if (el.tagName.toLocaleLowerCase() === "picture") {
    const img = el.querySelector("img");
    if (img) {
      setAttribute(img, "src");
      setAttribute(img, "srcset");
      img.addEventListener("load", () => setClass(el));
    }
  }
}
function setClass(el) {
  el.classList.remove(options.loadingClass);
  options.loadedClass && el.classList.add(options.loadedClass);
}
function setEvent(el) {
  const tagName = el.tagName.toLocaleLowerCase();
  let eventName = "load";
  if (["video", "audio"].includes(tagName))
    eventName = "loadeddata";
  el.addEventListener(eventName, () => {
    if (isPictureChild(el)) {
      if (el.parentNode.getAttribute("data-not-lazy"))
        setClass(el.parentNode);
      else
        el.parentNode.removeAttribute("data-not-lazy");
    } else {
      setClass(el);
    }
  });
}
export default defineNuxtPlugin((nuxtApp) => {
  let observer;
  if (process.client) {
    observer = new IntersectionObserver((entries, self) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          let el = target;
          if (!isPictureChild(el) && options.loadingClass)
            el.classList.add(options.loadingClass);
          const source = el.querySelectorAll("source");
          setAttribute(el, "poster");
          if (source.length)
            el = source;
          setAttribute(el, "src");
          setAttribute(el, "srcset");
          self.unobserve(target);
        }
      });
    }, options.observerConfig);
  }
  nuxtApp.vueApp.directive("lazy-load", {
    beforeMount(el) {
      setEvent(el);
      !isPictureChild(el) && options.appendClass && el.classList.add(options.appendClass);
    },
    mounted(el) {
      observer && observer.observe(el);
      options.defaultImage && el.tagName.toLocaleLowerCase() === "img" && (el.src = options.defaultImage);
    },
    getSSRProps() {
      return {};
    }
  });
  nuxtApp.vueApp.directive("not-lazy", {
    beforeMount(el) {
      for (const item of [...el.querySelectorAll("source"), ...el.querySelectorAll("img")]) {
        setAttribute(item, "src");
        setAttribute(item, "srcset");
      }
      el.tagName.toLocaleLowerCase() !== "picture" && el.removeAttribute("data-not-lazy");
    },
    getSSRProps() {
      return {};
    }
  });
});
