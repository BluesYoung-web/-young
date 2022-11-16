/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:04
 * @LastEditTime: 2022-11-16 10:20:24
 * @Description: 
 */
import { toCanvas, toImage, saveImage } from './draw-canvas';
import type { BaseOptions } from './types';
import { version } from '../package.json';

class YoungQRCodeLogo {

  static version = version;

  public option: BaseOptions;
  public ifCanvasDrawed = false;
  public ifImageCreated = false;

  private defaultOption: BaseOptions = {
    canvas: document.createElement('canvas'),
    image: new Image(),
    content: ''
  };

  constructor(option: BaseOptions) {
    this.option = Object.assign(this.defaultOption, option);
    if (!this.option.canvas) {
      this.option.canvas = document.createElement('canvas');
    }
    if (!this.option.image) {
      this.option.image = document.createElement('img');
    }
  }

  public toCanvas(): Promise<void> {
    return toCanvas.call(this, this.option).then(() => {
      this.ifCanvasDrawed = true;
      return Promise.resolve();
    }).catch(() => {
      this.ifCanvasDrawed = false;
      return Promise.reject();
    });
  };
  public toImage(): Promise<void> {
    return toImage.call(this, this.option);
  }
  public async downloadImage(name: string) {
    if (!this.ifImageCreated) {
      await this.toImage();
    }
    saveImage(this.option.image, name);
  }
  public async getCanvas(): Promise<HTMLCanvasElement> {
    if (!this.ifCanvasDrawed) {
      await this.toCanvas();
    }
    return this.option.canvas;
  }
}

export default YoungQRCodeLogo;
