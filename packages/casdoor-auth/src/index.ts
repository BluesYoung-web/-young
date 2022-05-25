/*
 * @Author: zhangyang
 * @Date: 2022-05-17 17:09:04
 * @LastEditTime: 2022-05-25 12:08:50
 * @Description: 
 */
import Casdoor from './casdoor-sdk';
import type { SdkConfig } from './casdoor-sdk';

type Operate = |
'login' |
'register';

const defaultConf: SdkConfig = {
  serverUrl: 'https://door.casdoor.com',
  clientId: '014ae4bd048734ca2dea',
  organizationName: 'casbin',
  appName: 'app-casnode',
  redirectPath: window.location.pathname
};

export class YoungAuth {
  static hasAuthed() {
    const { code, state } = Object.fromEntries(new URLSearchParams(window.location.search));
    if (code && state) {
      return true;
    } else {
      return false;
    }
  }

  private sdk: Casdoor;
  constructor(conf: Partial<SdkConfig> = {}) {
    const finalConf = Object.assign(defaultConf, conf);
    this.sdk = new Casdoor(finalConf);
  }

  init(operate: Operate = 'login') {
    let url = '';
    if (operate === 'register') {
      url = this.sdk.getSignupUrl();
    } else {
      url = this.sdk.getSigninUrl();
    }
    window.location.href = url;
  }
};

export * from './no-login/master';
export * from './no-login/slave';