/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:57:53
 * @LastEditTime: 2022-07-02 19:58:42
 * @Description: 
 */
import { GetParamsSign, Young } from '../../typings';
import { SHAKE_HANDS_MSG } from './share';

type SlaveHandlers<T extends string | number | symbol> = Partial<Record<T, (args: Young.MasterReturnParams) => Promise<void>>>;

export class YoungRPCSlave<R extends Record<string, any>, T extends keyof R = keyof R> {
  public port: MessagePort;
  private masterWindow: Window;

  private handlersMap: SlaveHandlers<T> = {};

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

  public shakeHands() {
    if (!this.masterWindow) {
      throw new Error('YoungRPCSlave can only be used in sub window');
    }
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = (e) => {
      const { data, isTrusted } = e;
      if (isTrusted && data) {
        if (data.cmd && typeof data.cmd === 'string' && data.cmd as T) {
          // 已知的消息类型
          this.handlersMap[data.cmd]?.(data);
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

  public trigger(cmd: T, params: Record<string, any> = {}) {
    this.port.postMessage({ cmd, params });
  }

  public setHandler(cmd: T, { success, fail }: Young.Cbk) {
    this.handlersMap[cmd] = async ({ ok, data }) => {
      if (ok) {
        await success?.(data);
      } else {
        await fail?.(data);
      }
    };
    return this.trigger.bind(this, cmd) as (params?: GetParamsSign<R[T]>) => void;
  }
};