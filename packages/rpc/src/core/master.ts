/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:57:48
 * @LastEditTime: 2022-07-02 16:15:20
 * @Description: 
 */
import { SHAKE_HANDS_MSG, SHAKE_HANDS_MSG_RETURN } from './share';
export class YoungRPCMaster {
  public port: MessagePort;
  constructor() {
    window.addEventListener('message', (e) => {
      if (e.data === SHAKE_HANDS_MSG) {
        this.port = e.ports[0];
        this.port.onmessage = (e) => {
          const { data, isTrusted } = e;
          if (isTrusted) {
            // 可以正式处理消息了
            if (data.cmd) {
              // 已知的消息类型
              
            }  else {
              // 未知的消息类型
              console.warn('🚀unknown msg', data);
            }
          }
        };
        this.port.onmessageerror = (e) => {
          console.error('🚀 ~ YoungRPCMaster ~ ', e);
        };
        // 信道建立完成
        this.port.postMessage(SHAKE_HANDS_MSG_RETURN);
        console.log('🚀🚀🚀 master app is ready 🚀🚀🚀');
      }
    });
  }
};