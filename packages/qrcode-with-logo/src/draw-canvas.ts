/*
 * @Author: zhangyang
 * @Date: 2022-11-15 11:40:25
 * @LastEditTime: 2022-11-15 14:19:34
 * @Description: 
 */
import type { BaseOptions, Logo, NodeQrCodeOptions } from './types';
import { toCanvas as _toCanvas } from 'qrcode'
import { promisify } from './utils';
import { drawLogo } from './draw-logo';

const _toCanvasPromise = promisify(_toCanvas);

export const renderQrCode = ({
  canvas,
  content,
  width = 0,
  nodeQrCodeOptions = {}
}: BaseOptions) => {
  // 容错率，默认对内容少的二维码采用高容错率，内容多的二维码采用低容错率
  // according to the content length to choose different errorCorrectionLevel
  nodeQrCodeOptions.errorCorrectionLevel =
    nodeQrCodeOptions.errorCorrectionLevel || getErrorCorrectionLevel(content);

  return getOriginWidth(content, nodeQrCodeOptions).then((_width: number) => {
    // 得到原始比例后还原至设定值，再放大4倍以获取高清图
    // Restore to the set value according to the original ratio, and then zoom in 4 times to get the HD image.
    nodeQrCodeOptions.scale = width === 0 ? undefined : (width / _width) * 4;
    return _toCanvasPromise(canvas, content, nodeQrCodeOptions);
  });
};

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
// Get the size of the original QrCode
const getOriginWidth = (
  content: string,
  nodeQrCodeOption: NodeQrCodeOptions
) => {
  const _canvas = document.createElement('canvas');
  return _toCanvasPromise(_canvas, content, nodeQrCodeOption).then(() => _canvas.width);
};

// 对于内容少的QrCode，增大容错率
// Increase the fault tolerance for QrCode with less content
const getErrorCorrectionLevel = (content: string): string => {
  if (content.length > 36) {
    return 'M';
  } else if (content.length > 16) {
    return 'Q';
  } else {
    return 'H';
  }
};


export const toCanvas = (options: BaseOptions): Promise<void> => {
  return renderQrCode(options).then(() => drawLogo(options));
};

export const toImage = async function (options: BaseOptions) {
  const { canvas } = options
  if (options.logo) {
    if (typeof options.logo === 'string') {
      options.logo = { src: options.logo } as Logo;
    }
    (options.logo as Logo).crossOrigin = 'Anonymous';
  }

  if (!this.ifCanvasDrawed) await toCanvas(options)

  const { image, downloadName = 'qr-code' } = options;
  let { download } = options;

  if (canvas.toDataURL()) image.src = canvas.toDataURL();
  else {
    throw new Error('Can not get the canvas DataURL')
  }

  this.ifImageCreated = true

  if (download !== true && !(typeof download === 'function')) {
    return;
  }
  
  download = download === true ? (start: Function) => start() : download;

  const startDownload: Function = () => {
    saveImage(image, downloadName);
  };

  download && download(startDownload);

  return Promise.resolve();
};

export const saveImage = (image: HTMLImageElement, name: string): void => {
  const dataURL = image.src;
  const link = document.createElement('a');
  link.download = name;
  link.href = dataURL;
  link.dispatchEvent(new MouseEvent('click'));
};