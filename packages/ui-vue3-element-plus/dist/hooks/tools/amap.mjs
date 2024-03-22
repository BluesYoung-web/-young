export async function initAMapSDK(key, secret, url = "//webapi.amap.com/maps?v=2.0&key=") {
  await new Promise((resolve) => {
    if (window.AMap) {
      resolve(true);
    } else if (document.querySelector("#young-gaodemap")) {
      document.querySelector("#young-gaodemap").addEventListener("load", resolve);
    } else {
      window._AMapSecurityConfig = {
        securityJsCode: secret
      };
      const script = document.createElement("script");
      script.id = "young-gaodemap";
      script.src = url + key;
      document.head.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
    }
  });
}
