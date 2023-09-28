/*
 * @Author: zhangyang
 * @Date: 2023-09-22 11:00:24
 * @LastEditTime: 2023-09-28 09:31:24
 * @Description:
 */
import { defineNuxtPlugin } from 'nuxt/app';
// @ts-ignore
import { options } from '#build/@bluesyoung/nuxt3-lazy-load';
import { YoungOSSImageDefaultProcess } from '../types';

/**
 * 是否为 <picture> 的子元素
 */
function isPictureChild(el: HTMLElement) {
  return el.parentNode && el.parentNode.nodeName.toLocaleLowerCase() === 'picture';
}

/**
 * 设置属性
 */
function setAttribute(el: HTMLElement | NodeList, attribute: string) {
  const dataAttribute = `data-${attribute}`;

  if (el instanceof NodeList) {
    for (const e of el) setAttribute(e as HTMLElement, attribute);
  } else if (el.getAttribute(dataAttribute)) {
    let originURL = el.getAttribute(dataAttribute);
    if (!['http://', 'https://'].some(proto => originURL.startsWith(proto))) {
      originURL = new URL(originURL, location.href).toString();
    }
    const srcURL = new URL(originURL);

    const extendsSrc = (str: string) => {
      const OSSProcess = new URLSearchParams(str);
      for (const [key, value] of OSSProcess.entries()) {
        srcURL.searchParams.set(key, value);
      }
    }

    if (options.OSSProcess === false) {
      // 不进行处理
      null;
    } else if (el.getAttribute('data-image-process')) {
      extendsSrc(el.getAttribute('data-image-process'));
    } else if (options.OSSProcess) {
      extendsSrc(options.OSSProcess);
    } else if (YoungOSSImageDefaultProcess[options.OSSProvider]) {
      extendsSrc(YoungOSSImageDefaultProcess[options.OSSProvider]);
    } else {
      console.warn('[OSSProvider]: ', 'unknown oss provider');
    }

    el.setAttribute(attribute, srcURL.toString());
    el.removeAttribute(dataAttribute);

    // @ts-expect-error
    el.parentNode.load && el.parentNode.load();
  } else if (el.tagName.toLocaleLowerCase() === 'picture') {
    const img = el.querySelector('img');
    if (img) {
      setAttribute(img, 'src');
      setAttribute(img, 'srcset');
      img.addEventListener('load', () => setClass(el));
    }
  }
}

/**
 * 设置类
 */
function setClass(el: HTMLElement) {
  el.classList.remove(options.loadingClass);
  options.loadedClass && el.classList.add(options.loadedClass);
}

/**
 * 设置事件
 */
function setEvent(el: HTMLElement) {
  const tagName = el.tagName.toLocaleLowerCase();
  let eventName = 'load';
  if (['video', 'audio'].includes(tagName)) eventName = 'loadeddata';

  el.addEventListener(eventName, () => {
    if (isPictureChild(el)) {
      if ((el.parentNode as HTMLElement).getAttribute('data-not-lazy'))
        setClass(el.parentNode as HTMLElement);
      else (el.parentNode as HTMLElement).removeAttribute('data-not-lazy');
    } else {
      setClass(el);
    }
  });
}

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver;

  // intersction observer
  if (process.client) {
    observer = new IntersectionObserver((entries, self) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          let el: HTMLElement | NodeList = target as HTMLElement;
          if (!isPictureChild(el) && options.loadingClass) el.classList.add(options.loadingClass);

          const source = el.querySelectorAll('source');
          setAttribute(el, 'poster');

          if (source.length) el = source;

          setAttribute(el, 'src');
          setAttribute(el, 'srcset');

          self.unobserve(target);
        }
      });
    }, options.observerConfig);
  }

  // 自定义指令
  nuxtApp.vueApp.directive('lazy-load', {
    beforeMount(el) {
      setEvent(el);
      !isPictureChild(el) && options.appendClass && el.classList.add(options.appendClass);
    },
    mounted(el) {
      observer && observer.observe(el);
      options.defaultImage &&
        el.tagName.toLocaleLowerCase() === 'img' &&
        (el.src = options.defaultImage);
    },
    getSSRProps() {
      return {};
    },
  });

  nuxtApp.vueApp.directive('not-lazy', {
    beforeMount(el) {
      for (const item of [...el.querySelectorAll('source'), ...el.querySelectorAll('img')]) {
        setAttribute(item, 'src');
        setAttribute(item, 'srcset');
      }

      el.tagName.toLocaleLowerCase() !== 'picture' && el.removeAttribute('data-not-lazy');
    },
    getSSRProps() {
      return {};
    },
  });
});
