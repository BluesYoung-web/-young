/*
 * @Author: zhangyang
 * @Date: 2022-05-25 11:42:10
 * @LastEditTime: 2022-05-25 12:23:41
 * @Description: 免登陆主应用
 */

import type { OnMessage } from '../typings/login';

export const defaultCmd = 'I want to login';

type Config = {
  onmsg_cbk: OnMessage;
};

export class Master {
  constructor(conf: Config, cmd = defaultCmd) {
    const onMessage: OnMessage = async (e) => {
      if (e.data.cmd === cmd) {
        conf.onmsg_cbk(e);
      }
    };

    window.addEventListener('message', onMessage);
  }
};