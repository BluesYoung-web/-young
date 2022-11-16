/*
 * @Author: zhangyang
 * @Date: 2022-11-15 11:46:28
 * @LastEditTime: 2022-11-16 16:04:00
 * @Description: 
 */
import type { BaseOptions } from './types';

export const drawLogo = async ({ canvas, logo }: BaseOptions) => {

  if (!logo) {
    return;
  }

  const canvasWidth = canvas.width;

  if (typeof logo === 'string') {
    logo = { src: logo };
  }
  
  const {
    logoSize = 0.15,
    borderColor = '#ffffff',
    bgColor = borderColor || '#ffffff',
    borderSize = 0.05,
    crossOrigin,
    borderRadius = 8,
    logoRadius = 0,
    src: logoSrc
  } = logo;

  let logoWidth = canvasWidth * logoSize;
  let logoXY = (canvasWidth * (1 - logoSize)) / 2;
  let logoBgWidth = canvasWidth * (logoSize + borderSize);
  let logoBgXY = (canvasWidth * (1 - logoSize - borderSize)) / 2;

  const ctx = canvas.getContext('2d');

  // logo 底色, draw logo background color
  canvasRoundRect(ctx)(
    logoBgXY,
    logoBgXY,
    logoBgWidth,
    logoBgWidth,
    borderRadius
  );
  ctx.fillStyle = bgColor;
  ctx.fill();

  // logo
  const image = new Image();
  if (crossOrigin) {
    if (typeof crossOrigin === 'string') {
      image.setAttribute('crossorigin', crossOrigin);
    } else {
      image.setAttribute('crossorigin', 'anonymous');
    }
  }
  image.src = logoSrc;

  // 使用image绘制可以避免某些跨域情况
  // Use image drawing to avoid some cross-domain situations
  const drawLogoWithImage = (image: HTMLImageElement) => {
    ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth);
  };

  // 使用canvas绘制以获得更多的功能
  // Use canvas to draw more features, such as borderRadius
  const drawLogoWithCanvas = (image: HTMLImageElement) => {
    const canvasImage = document.createElement('canvas');
    
    canvasImage.width = logoXY + logoWidth;
    canvasImage.height = logoXY + logoWidth;
    canvasImage
      .getContext('2d')
      .drawImage(image, logoXY, logoXY, logoWidth, logoWidth);

    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius);
    ctx.fillStyle = ctx.createPattern(canvasImage, 'no-repeat');
    ctx.fill();
  };

  // 将 logo绘制到 canvas上
  // Draw the logo on the canvas
  return new Promise((resolve, reject) => {
    image.onload = () => {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image);
      resolve(true);
    };

    image.onerror = reject;
  });
};

// draw radius
const canvasRoundRect = (ctx: CanvasRenderingContext2D) => (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  const minSize = Math.min(w, h);
  if (r > minSize / 2) {
    r = minSize / 2;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
};
