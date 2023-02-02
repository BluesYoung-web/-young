/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:04
 * @LastEditTime: 2023-02-02 09:42:23
 * @Description:
 */
import { copy, detector } from '@bluesyoung/share-dom';
import { defu } from 'defu';
import type { SetOptional } from '@bluesyoung/utils';
const isIos = detector.os.name === 'ios';
const inWeixin = detector.browser.name === 'micromessenger';
// const inQQ = detector.browser.name === 'qq';
// const inWeibo = detector.browser.name === 'weibo';
// const inBaidu = detector.browser.name === 'baidu';

enum QuickCall {
  wechat = 'weixin://',
}

/**
 * 快捷唤端的配置
 */
type QuickCallConfig = {
  quickType: QuickCall;
};
/**
 * 基本唤端配置
 */
type CommonCallConfig = {
  /**
   * 安卓唤端地址
   */
  android_shceme: string;
  /**
   * ios 唤端地址
   */
  ios_shceme: string;
  /**
   * 特定渠道的下载地址
   */
  download?: {
    /**
     * 安卓
     */
    android?: string;
    /**
     * ios
     */
    ios?: string;
    /**
     * 应用宝
     */
    yyb?: string;
  };
  /**
   * 唤端路径
   */
  path?: string;
  /**
   * 需要传递的参数
   */
  params?: Record<string, string>;
  /**
   * 兜底的落地页
   */
  landpage?: string;
};

type Cbk = () => void;
type Options = {
  /**
   * 超时时间
   * @default 2500 ms
   */
  timeout: number;
  /**
   * 特殊环境的遮罩
   */
  mask: {
    wechat: Cbk;
  };
  startCall: Cbk;
  callFail: Cbk;
};

const defaultOptions: Options = {
  timeout: 2500,
  mask: {
    wechat: () => null,
  },
  startCall: () => console.log('---开始唤端---'),
  callFail: () => console.log('---唤起失败，跳转下载---'),
};

class YoungCallApp {
  static QuickCall = QuickCall;

  public scheme: string;
  public download: string;
  public info: string;
  public options: Options;
  constructor(conf: QuickCallConfig, options?: SetOptional<Options, keyof Options>);
  constructor(conf: CommonCallConfig, options?: SetOptional<Options, keyof Options>);
  constructor(conf: any, options: SetOptional<Options, keyof Options> = {}) {
    this.options = defu(options, defaultOptions);
    if (conf.quickType) {
      this.scheme = conf.quickType;
    } else {
      this.generateScheme(conf);
    }
  }

  /**
   * 生成通用唤端地址
   */
  generateScheme(conf: CommonCallConfig) {
    let scheme = '',
      download = '',
      info = '(复制此消息打开app)|';
    if (isIos) {
      if (conf.ios_shceme.includes('://')) {
        scheme = conf.ios_shceme;
      } else {
        scheme = `${conf.ios_shceme}://`;
      }
      download = conf?.download?.ios || conf.landpage;
    } else {
      if (conf.android_shceme.includes('://')) {
        scheme = conf.android_shceme;
      } else {
        scheme = `${conf.android_shceme}://`;
      }
      download = conf?.download?.yyb || conf.landpage;
      if (inWeixin && conf?.download?.yyb) {
        download = conf.download.yyb;
      }
    }
    if (conf.path) {
      scheme += conf.path;
    }
    if (conf.params) {
      const query = new URLSearchParams(conf.params).toString();
      scheme += `?${query}`;
      info += query;
    }

    this.scheme = scheme;
    this.download = download;
    this.info = info;
  }

  call() {
    const { mask, startCall } = this.options;
    if (inWeixin && mask.wechat) {
      mask.wechat();
      return;
    }
    this.copyInfo();
    startCall?.();
    // 开始唤端
    window.location.href = this.scheme;
    this.fallback();
  }

  copyInfo() {
    copy(this.info);
  }

  fallback() {
    const t = setTimeout(() => {
      /**
       * 调用唤起失败的回调函数
       */
      this.options.callFail();
      if (this.download) {
        /**
         * 拥有兜底的落地页，跳转
         */
        window.location.href = this.download;
      }
    }, this.options.timeout);

    setTimeout(() => {
      window.addEventListener('blur', () => clearTimeout(t));
    }, this.options.timeout - 500);
  }
}

export default YoungCallApp;
