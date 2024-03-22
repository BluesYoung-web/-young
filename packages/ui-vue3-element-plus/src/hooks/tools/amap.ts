/*
 * @Author: zhangyang
 * @Date: 2024-03-21 19:45:43
 * @LastEditTime: 2024-03-22 08:40:38
 * @Description: 
 */
declare global {
  interface Window {
    _AMapSecurityConfig: any
    AMap: any
  }
}

export async function initAMapSDK(key: string, secret: string, url = '//webapi.amap.com/maps?v=2.0&key=') {
  await new Promise((resolve) => {
    if (window.AMap) {
      resolve(true)
    } else if (document.querySelector('#young-gaodemap')) {
      (document.querySelector('#young-gaodemap') as HTMLScriptElement).addEventListener('load', resolve)
    } else {
      // 高德地图秘钥，必须在加载JSAPI load.js文件之前
      window._AMapSecurityConfig = {
        securityJsCode: secret,
      }

      const script = document.createElement('script')
      script.id = 'young-gaodemap'
      script.src = url + key
      document.head.appendChild(script)

      script.onload = () => {
        resolve(true)
    }
  
  }})
}