/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:57:53
 * @LastEditTime: 2022-07-02 16:09:20
 * @Description: 
 */
import { SHAKE_HANDS_MSG, SHAKE_HANDS_MSG_RETURN } from './share';
export class YoungRPCSlave {
  public port: MessagePort;
  public isReady = false;
  private masterWindow: Window;
  constructor() {
    if (window.opener && window.opener !== window) {
      // 由父窗口通过 window.open 打开的
      this.masterWindow = window.opener;
    } else if (window.parent && window.parent !== window) {
      // iframe 嵌套
      this.masterWindow = window.parent;
    }
    // 与父页面握手，建立信道
    this.shakeHands();
  }

  shakeHands() {
    if (!this.masterWindow) {
      throw new Error('YoungRPCSlave can only be used in sub window');
    }
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = (e) => {
      const { data, isTrusted } = e;
      if (isTrusted) {
        if (typeof data === 'string' && data === SHAKE_HANDS_MSG_RETURN) {
          // 信道建立完成，可以正式调用了
          this.isReady = true;
          console.log('🚀🚀🚀 slave app is ready 🚀🚀🚀');
        } else if (data.cmd) {
          // 已知的消息类型
          
        }  else {
          // 未知的消息类型
          console.warn('🚀unknown msg', data);
        }
      }
    };
    this.port.onmessageerror = (e) => {
      console.error('🚀 ~ YoungRPCSlave ~ e', e);
    };
    
    this.masterWindow.postMessage(SHAKE_HANDS_MSG, '*', [channel.port2]);
  }

  trigger() {
    if (!this.isReady) {
      throw new Error('the message channel has not established !');
    }
    
  }
};