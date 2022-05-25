/*
 * @Author: zhangyang
 * @Date: 2022-05-25 11:42:32
 * @LastEditTime: 2022-05-25 12:26:18
 * @Description: 免登陆子应用
 */

import type { OnMessage } from '../typings/login';
import { defaultCmd } from './master';

type Config = {
  master_url: string;
  onmsg_cbk: (args: any) => Promise<void>;
};


export class Slave {
  constructor(
    conf: Config,
    private cmd = defaultCmd
  ) {
    const onMessage: OnMessage = async (e) => {
      if (e.origin === conf.master_url) {
        await conf.onmsg_cbk(e.data);
      }
    };

    window.addEventListener('message', onMessage);
  }

  init(fallback?: () => void) {
    if (window.opener) {
      (window.opener as Window).postMessage({
        cmd: this.cmd
      }, '*');
    } else {
      fallback?.();
    }
  }
};