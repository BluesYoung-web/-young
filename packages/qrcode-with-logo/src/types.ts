/*
 * @Author: zhangyang
 * @Date: 2022-11-15 11:37:45
 * @LastEditTime: 2022-11-16 16:03:07
 * @Description: 
 */
export interface Logo {
  src: string;
  logoRadius?: number;
  logoSize?: number;
  borderRadius?: number;
  borderColor?: string;
  borderSize?: number;
  bgColor?: string;
  /**
   * 是否启用跨域
   */
  crossOrigin?: string | boolean;
}

export interface NodeQrCodeOptions {
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: string;
  scale?: any;
}

export interface BaseOptions {
  content: string;
  width?: number;
  nodeQrCodeOptions?: NodeQrCodeOptions;
  logo?: Logo | string;
  canvas?: HTMLCanvasElement;
  image?: HTMLImageElement;
  download?: boolean | Function;
  downloadName?: string;
}

declare class IQrCodeWithLogo {
  constructor(option: BaseOptions)
  toCanvas(): Promise<any>;
  toImage(): Promise<any>;
  downloadImage(name: string): void;
  getCanvas(): Promise<HTMLCanvasElement>
}

export default IQrCodeWithLogo
