/*
 * @Author: ouyangyuying
 * @Date: 2022-06-22 10:34:06
 * @LastEditTime: 2022-06-23 15:58:31
 * @Description: 图片滑动验证组件
 */
import { LitElement, html, css, unsafeCSS } from 'lit';
import {
  customElement,
  property,
  query,
} from 'lit/decorators.js';
import cssContent from '../style/index.css?raw';
type Slide = {
  canWidth: Number;
  canHeight: Number;
  puzzleWidth: Number;
};
type Callback = () => void;

@customElement('young-image-slider')
export class YoungImageSliderElement extends LitElement {
  public bgImgArr: string[] = Object.values(
    import.meta.globEager('../img/*')
  ).map((i) => i.default);

  @property()
  index = 0; //随机背景图
  @property()
  puzzleX = 60; //拼图块距离顶部高度
  @property()
  puzzleY = 60; //拼图块距离右侧高度
  @property()
  canMove = false; //控制 变量
  @property()
  canWidth; //图片宽度
  @property()
  canHeight; //图片高度
  @property()
  offset = 0; //偏移度
  @property()
  isPass = false; //验证是否通过
  @property()
  isShow = true; //是否显示
  @property()
  isAnimate = true; //滑块是否有动画
  success:Callback;
  public puzzleWidth; /* 挖掉的拼图宽高度 */
  @query('#captcha')
  cap;
  @query('.slide')
  handle;
  @query('.btn')
  btn;

  constructor(success:Callback,slider: Slide, index: number = 0) {
    super();
    this.index = index;
    this.canWidth = slider.canWidth;
    this.canHeight = slider.canHeight;
    this.puzzleWidth = slider.puzzleWidth;
    this.success = success;
  }

  // 使用纯CSS为组件定义scoped样式
  static styles = css`
    ${unsafeCSS(cssContent)}
  `;
  firstUpdated() {
    if (this.cap) {
      this.canWidth = this.cap.offsetWidth;
      this.canHeight = this.cap.offsetHeight;
    }
    window.addEventListener('mousemove', (e) => {
      if (this.canMove) {
        this.slideMove(e);
      }
    });
    window.addEventListener('mouseup', (e) => {
      if (this.canMove) {
        this.slideStop(e);
      }
    });
    window.addEventListener('mousedown',(e) => {
      e.preventDefault();
    });
  }
  show() {
    this.isShow = true;
  }
  hide() {
    this.isShow = false;
  }
  // 滑块滑动
  slideMove(e) {
    const offset = this.handle.getBoundingClientRect().left;
    const btn_width = this.btn.getBoundingClientRect().width;
    let slidePx = e.clientX - offset - btn_width / 2;
    this.isAnimate = false;
    if (
      slidePx < this.cap.offsetWidth - this.btn.getBoundingClientRect().width &&
      slidePx > 0
    ) {
      this.offset = slidePx;
    }
  }
  // 滑块停止滑动
  slideStop(e) {
    const offset = this.cap.offsetWidth - this.puzzleWidth - this.puzzleY; //重合时滑块距离左侧的距离
    const errorNum = 3; //容错像素  左右各3
    if (this.offset > offset - errorNum && this.offset < offset + errorNum) {
      this.cap.classList.add('pass');
      this.isPass = true;
      this.isAnimate = false;
      setTimeout(() => {
        this.hide()
      },500)
      this.success()
    } else {
      this.cap.style.setProperty('--offset', `0px`);
      this.offset = 0;
      this.isAnimate = true;
      this.isPass = false;
    }
    this.canMove = false;
  }
  // 初始化滑块和图片
  init() {
    //生成不重复索引
    this.createIndex();

    this.puzzleX = this.randomNum(30, 80);
    this.puzzleY = this.randomNum(30, 80);
    this.isAnimate = false;
    this?.cap?.classList.remove('pass');
    this.isPass = false;
    this.offset = 0
  }
  createIndex() {
    let index = Math.floor(Math.random() * this.bgImgArr.length);
    if (index == this.index) {
      this.createIndex();
    } else {
      this.index = index;
    }
  }
  // 打开滑动权限
  openMove() {
    this.canMove = true;
  }
  // 关闭滑动权限
  closeMove() {
    this.canMove = false;
  }
  // 生成区间范围的随机数
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        //@ts-ignore
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }

  render() {
    return html`
      <style>
        #captcha {
          width: ${this.canWidth}px;
          height: ${this.canHeight}px;
        }
        .bgImg {
          width: ${this.canWidth}px;
          height: ${this.canHeight}px;
        }
        #opacityImg {
          width: ${this.puzzleWidth}px;
          height: ${this.puzzleWidth}px;
          top: ${this.puzzleX}px;
          right: ${this.puzzleY}px;
        }
        #sliderImg {
          width: ${this.canWidth}px;
          height: ${this.canHeight}px;
          clip-path: inset(
            ${this.puzzleX}px ${this.puzzleY}px
              ${this.canHeight - this.puzzleWidth - this.puzzleX - 2}px
              ${this.canWidth - this.puzzleWidth - this.puzzleY - 2}px round 6px
          );
          -webkit-clip-path: inset(
            ${this.puzzleX}px ${this.puzzleY}px
              ${this.canHeight - this.puzzleWidth - this.puzzleX - 2}px
              ${this.canWidth - this.puzzleWidth - this.puzzleY - 2}px round 6px
          );
          left: calc(
            ${this.canWidth}px * -1 + ${this.puzzleWidth}px + ${this.puzzleY}px
          );
          transform: translateX(${this.offset}px);
          transition: ${this.isAnimate ? '0.25s all ease-in-out' : 'none'};
        }
        #sliderImg > img {
          width: ${this.canWidth}px;
          height: ${this.canHeight}px;
        }
        .slide {
          width: ${this.canWidth}px;
        }
        .btn {
          width: ${this.puzzleWidth}px;
          transform: translateX(
            clamp(
              0px,
              ${this.offset}px,
              calc(${this.canWidth}px + ${this.puzzleWidth}px)
            )
          );
        }
      </style>
      <div id="captchaBox" style="display: ${this.isShow ? "" : "none"};">
        <div
          style="border: 1px solid #EEEEEE;position: relative;background-color: #fff;"
        >
          <!-- 标题 -->
          <p
            style="display:flex;align-items:center;justify-content: space-between;padding:15px;border-bottom: 1px solid #EEEEEE;"
          >
            <span style="color:#55595B;">请完成安全验证</span>
            <svg
              @click=${this.hide}
              style="cursor:pointer;"
              t="1655949585727"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2128"
              width="16"
              height="16"
            >
              <path
                d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                p-id="2129"
                fill="#55595B"
              ></path>
            </svg>
          </p>
          <div style="padding:15px;">
            <div id="captcha">
              <img draggable="false" src="${this.bgImgArr[this.index]}" class="bgImg" />
              <!-- 左侧滑动图片 -->
              <div id="sliderImg" class="${this.isPass ? "pass" : ""}">
                <img draggable="false" src="${this.bgImgArr[this.index]}" />
                <p
                  class="border"
                  style="width:${this.puzzleWidth + 2}px;height:${this
                    .puzzleWidth + 2}px;top:${this.puzzleX}px;right:${this
                    .puzzleY}px;"
                ></p>
              </div>
              <!-- 刷新按钮 -->
              <svg
                id="refresh"
                @click=${this.init}
                t="1655802192519"
                style="display:${this.isPass ? "none" : ""};"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2194"
                data-spm-anchor-id="a313x.7781069.0.i0"
                width="32"
                height="32"
              >
                <path
                  d="M792.2 545.2c0-17.1-13.9-31-31-31-16.4 0-29.8 12.7-31 28.8l-0.4-0.1c-17.2 119.4-127.7 202.6-247.3 185.8C362.7 711.9 279.2 601.1 296 481.3 312.9 361.5 423.7 278 543.5 294.9c33.6 4.7 64.4 16.9 90.9 34.5l-38.6 60.4c-1.9 2.9 0.7 6.6 4.1 5.9l145-31.7c2.1-0.5 3.4-2.5 3-4.6L716 213.8c-0.7-3.4-5.2-4.2-7-1.3l-41 64.2c-33.8-22.3-73-37.7-115.8-43.7-154-21.6-296.3 85.6-317.9 239.6-21.6 154 85.6 296.3 239.6 317.9 153.7 21.6 295.9-85.3 317.8-238.9h-0.1c0.4-2 0.6-4.2 0.6-6.4z"
                  fill="#fff"
                  p-id="2195"
                ></path>
              </svg>
              <div class="slide">
                <span class="btn" @mousedown="${this.openMove}">
                  <svg
                    t="1655708815747"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2132"
                    width="28"
                    height="28"
                  >
                    <path
                      d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"
                      fill="#9499B3"
                      p-id="2133"
                    ></path>
                  </svg>
                </span>
                <span
                  style="font-size: 13px;color: #9DA7AE;display: flex;align-items: center;height: 100%;justify-content: center;user-select:none;"
                  >向右拖动滑块填充拼图</span
                >
              </div>
              <div
                class="slide success"
                style="background-color: #2AA863;display: none;display:${this
                  .isPass
                  ? "block"
                  : ""};"
              >
                <span
                  style="font-size: 13px;color: #fff;display: flex;align-items: center;height: 100%;justify-content: center;user-select:none;"
                >
                  <svg
                    t="1655800276723"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2143"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M918.795922 356.854687c-21.798121-51.476314-52.909055-97.631021-92.514092-137.236058-39.605037-39.605037-85.862083-70.818309-137.236058-92.514092C635.727364 104.590046 579.236458 93.128123 520.903458 93.128123s-114.823906 11.461923-168.142315 33.976414c-51.476314 21.798121-97.631021 52.909055-137.236058 92.514092s-70.818309 85.862083-92.514092 137.236058C100.496502 410.173096 89.034579 466.664002 89.034579 524.997002s11.461923 114.823906 33.976414 168.142315c21.798121 51.476314 52.909055 97.631021 92.514092 137.236058 39.605037 39.605037 85.862083 70.818309 137.236058 92.514092 53.21607 22.514491 109.809314 33.976414 168.142315 33.976414s114.823906-11.461923 168.142315-33.976414c51.476314-21.798121 97.631021-52.909055 137.236058-92.514092 39.605037-39.605037 70.818309-85.862083 92.514092-137.236058 22.514491-53.21607 33.976414-109.809314 33.976414-168.142315S941.310414 410.173096 918.795922 356.854687zM520.903458 911.836898c-213.273636 0-386.839896-173.56626-386.839896-386.839896s173.56626-386.839896 386.839896-386.839896 386.839896 173.56626 386.839896 386.839896S734.177094 911.836898 520.903458 911.836898zM713.402359 378.141115 713.402359 378.141115c-9.210474-8.289426-23.537877-7.470718-31.827304 1.739756L466.971017 619.046172l-110.218669-98.859085c-9.210474-8.289426-23.537877-7.470718-31.827304 1.739756l0 0c-8.289426 9.210474-7.470718 23.537877 1.739756 31.827304l126.490506 113.391165c0.102339 0.102339 0.204677 0.102339 0.307016 0.204677 0.102339 0.102339 0.204677 0.204677 0.204677 0.204677l0 0c9.210474 8.289426 23.537877 7.470718 31.827304-1.739756l229.647811-255.948831C723.431541 400.757945 722.612832 386.430542 713.402359 378.141115z"
                      p-id="2144"
                      fill="#ffffff"
                    ></path>
                  </svg>
                  <span style="margin-left: 5px;">验证成功</span>
                </span>
              </div>
              <div id="opacityImg" class="${this.isPass ? "pass" : ""}"></div>
            </div>
          </div>
          <!-- 占位元素 -->
          <div style="width: 100%;height: 45px;margin-top: 10px;"></div>
        </div>
      </div>
    `;
  }
}
export class YoungImgSlider {
  public el: YoungImageSliderElement;

  constructor(
    success:Callback,
    slider: Slide = { canWidth: 360, canHeight: 220, puzzleWidth: 55 }
  ) {
    this.el = new YoungImageSliderElement(success,slider);
  }

  show() {
    this.el.init();
    this.el.show()
    if (!this.el.isConnected) {
      document.body.appendChild(this.el);
    }
  }
  hide() {
    this.el.hide();
  }
}