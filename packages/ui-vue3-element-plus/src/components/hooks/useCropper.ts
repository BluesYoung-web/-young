/*
 * @Author: zhangyang
 * @Date: 2023-08-06 15:54:11
 * @LastEditTime: 2023-08-08 16:34:33
 * @Description:
 */
import {
  type ExtractPropTypes,
  computed,
  reactive,
  watch,
  nextTick,
  ref,
  onMounted,
  onUnmounted,
} from 'vue';
import { getImageExif } from '../utils/exif-js-min';

export const CropperPorps = {
  img: {
    type: String,
    default: '',
  },
  /**
   * 输出图片质量 ∈ [0,1]
   */
  outputSize: {
    type: Number,
    default: 1,
  },
  /**
   * 输出图片格式
   * @default webp
   */
  outputType: {
    type: String,
    default: 'webp',
  },
  info: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否开启滚轮放大缩小
   */
  canScale: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否自成截图框
   */
  autoCrop: {
    type: Boolean,
    default: true,
  },
  /**
   * 截图框宽度
   */
  autoCropWidth: {
    type: [Number, String],
    default: 0,
  },
  /**
   * 截图框高度
   */
  autoCropHeight: {
    type: [Number, String],
    default: 0,
  },
  /**
   * 是否开启固定宽高比
   */
  fixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 宽高比 w/h
   */
  fixedNumber: {
    type: Array,
    default: () => {
      return [1, 1];
    },
  },
  /**
   * 固定大小 禁止改变截图框大小
   */
  fixedBox: {
    type: Boolean,
    default: false,
  },
  /**
   * 输出截图是否缩放
   */
  full: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否可以拖动图片
   */
  canMove: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可以拖动截图框
   */
  canMoveBox: {
    type: Boolean,
    default: true,
  },
  /**
   * 上传图片按照原始比例显示
   */
  original: {
    type: Boolean,
    default: true,
  },
  /**
   * 截图框能否超过图片
   */
  centerBox: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否根据dpr输出高清图片
   */
  high: {
    type: Boolean,
    default: true,
  },
  /**
   * 截图框展示宽高类型
   */
  infoTrue: {
    type: Boolean,
    default: false,
  },
  /**
   * 可以压缩图片宽高，默认不超过 2000
   */
  maxImgSize: {
    type: [Number, String],
    default: 2000,
  },
  /**
   * 倍数  可渲染当前截图框的n倍 0 - 1000;
   */
  enlarge: {
    type: [Number, String],
    default: 1,
  },

  /**
   * 自动预览的固定宽度
   */
  preW: {
    type: [Number, String],
    default: 0,
  },
  /**
   * 图片布局方式 mode 实现和css背景一样的效果
   * contain  居中布局 默认不会缩放 保证图片在容器里面 mode: 'contain'
   * cover    拉伸布局 填充整个容器  mode: 'cover'
   * 如果仅有一个数值被给定,这个数值将作为宽度值大小,高度值将被设定为auto。 mode: '50px'
   * 如果有两个数值被给定,第一个将作为宽度值大小,第二个作为高度值大小。 mode: '50px 60px'
   */
  mode: {
    type: String,
    default: 'contain',
  },
  //限制最小区域,可传1以上的数字和字符串，限制长宽都是这么大
  // 也可以传数组[90,90]
  limitMinSize: {
    type: [Number, Array, String],
    default: () => {
      return 10;
    },
    validator: function (value) {
      if (Array.isArray(value)) {
        return Number(value[0]) >= 0 && Number(value[1]) >= 0;
      } else {
        return Number(value) >= 0;
      }
    },
  },
  // 导出时,填充背景颜色
  fillColor: {
    type: String,
    default: '',
  },
} as const;

export const useCropper = (
  props: ExtractPropTypes<typeof CropperPorps>,
  emit: (e: string, v: any) => void,
) => {
  const state = reactive({
    // 容器高宽
    w: 0,
    h: 0,
    // 图片缩放比例
    scale: 1,
    // 图片偏移x轴
    x: 0,
    // 图片偏移y轴
    y: 0,
    // 图片加载
    loading: true,
    // 图片真实宽度
    trueWidth: 0,
    // 图片真实高度
    trueHeight: 0,
    move: true,
    // 移动的x
    moveX: 0,
    // 移动的y
    moveY: 0,
    // 开启截图
    crop: false,
    // 正在截图
    cropping: false,
    // 裁剪框大小
    cropW: 0,
    cropH: 0,
    cropOldW: 0,
    cropOldH: 0,
    // 判断是否能够改变
    canChangeX: false,
    canChangeY: false,
    // 改变的基准点
    changeCropTypeX: 1,
    changeCropTypeY: 1,
    // 裁剪框的坐标轴
    cropX: 0,
    cropY: 0,
    cropChangeX: 0,
    cropChangeY: 0,
    cropOffsertX: 0,
    cropOffsertY: 0,
    // 支持的滚动事件
    support: '',
    // 移动端手指缩放
    touches: [],
    touchNow: false,
    // 图片旋转
    rotate: 0,
    isIos: false,
    orientation: 0,
    imgs: '',
    // 图片缩放系数
    coe: 0.2,
    // 是否正在多次缩放
    scaling: false,
    scalingSet: null,
    coeStatus: '',
    // 控制emit触发频率
    isCanShow: true,
  });

  const cropInfo = computed(() => {
    let top = state.cropOffsertY > 21 ? '-21px' : '0px';
    let width = state.cropW > 0 ? state.cropW : 0;
    let height = state.cropH > 0 ? state.cropH : 0;
    if (props.infoTrue) {
      let dpr = 1;
      if (props.high && !props.full) {
        dpr = window.devicePixelRatio;
      }
      if (+props.enlarge !== 1 && !props.full) {
        dpr = Math.abs(Number(props.enlarge));
      }
      width *= dpr;
      height *= dpr;
      if (props.full) {
        width /= state.scale;
        height /= state.scale;
      }
    }
    return {
      top,
      width: width.toFixed(0),
      height: height.toFixed(0),
    };
  });

  function getVersion(name: string) {
    const arr = navigator.userAgent.split(' ');
    let chromeVersion = '';
    let result: number | string[] = 0;
    const reg = new RegExp(name, 'i');
    for (var i = 0; i < arr.length; i++) {
      if (reg.test(arr[i])) chromeVersion = arr[i];
    }
    if (chromeVersion) {
      result = chromeVersion.split('/')[1].split('.');
    } else {
      result = ['0', '0', '0'];
    }
    return result.map((i) => +i);
  }

  function checkOrientationImage(
    img: HTMLImageElement,
    orientation: number,
    width: number,
    height: number,
  ) {
    // 如果是 chrome内核版本在81 safari 在 605 以上不处理图片旋转
    if (getVersion('chrome')[0] >= 81) {
      orientation = -1;
    } else {
      if (getVersion('safari')[0] >= 605) {
        const safariVersion = getVersion('version');
        if (safariVersion[0] > 13 && safariVersion[1] > 1) {
          orientation = -1;
        }
      } else {
        //  判断 ios 版本进行处理
        // 针对 ios 版本大于 13.4的系统不做图片旋转
        const isIos = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
        if (isIos) {
          const version_str = isIos[1];
          const version = version_str.split('_').map((i) => +i);
          if (version[0] > 13 || (version[0] >= 13 && version[1] >= 4)) {
            orientation = -1;
          }
        }
      }
    }

    // alert(`当前处理的orientation${orientation}`)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.save();

    switch (orientation) {
      case 2:
        canvas.width = width;
        canvas.height = height;
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        canvas.width = width;
        canvas.height = height;
        //180 graus
        ctx.translate(width / 2, height / 2);
        ctx.rotate((180 * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        break;
      case 4:
        canvas.width = width;
        canvas.height = height;
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        canvas.width = height;
        canvas.height = width;
        //90 graus
        ctx.translate(height / 2, width / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        canvas.height = width;
        canvas.width = height;
        //-90 graus
        ctx.translate(height / 2, width / 2);
        ctx.rotate((-90 * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
        break;
      default:
        canvas.width = width;
        canvas.height = height;
    }

    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
    canvas.toBlob(
      (blob) => {
        let data = URL.createObjectURL(blob);
        URL.revokeObjectURL(state.imgs);
        state.imgs = data;
      },
      'image/' + props.outputType,
      1,
    );
  }

  function clearCrop() {
    state.cropping = false;
    state.cropW = 0;
    state.cropH = 0;
  }

  function checkedImg() {
    if (props.img === '') {
      state.imgs = '';
      clearCrop();
      return;
    }
    state.loading = true;
    state.scale = 1;
    state.rotate = 0;
    clearCrop();
    let img = new Image();
    img.onload = () => {
      if (props.img === '') {
        emit('img-load', 'error');
        return false;
      }

      let width = img.width;
      let height = img.height;
      getImageExif(img).then((data) => {
        state.orientation = data.orientation || 1;
        let max = Number(props.maxImgSize);
        if (!state.orientation && width < max && height < max) {
          state.imgs = props.img;
          return;
        }

        if (width > max) {
          height = (height / width) * max;
          width = max;
        }

        if (height > max) {
          width = (width / height) * max;
          height = max;
        }
        checkOrientationImage(img, state.orientation, width, height);
      });
    };

    img.onerror = () => {
      emit('img-load', 'error');
    };

    // 判断如果不是base64图片 再添加crossOrigin属性，否则会导致iOS低版本(10.2)无法显示图片
    if (props.img.substr(0, 4) !== 'data') {
      img.crossOrigin = '';
    }

    img.src = props.img;
  }

  function stopCrop() {
    state.crop = false;
  }

  function startCrop() {
    state.crop = true;
  }

  function checkCropLimitSize() {
    let cropW = state.cropW;
    let cropH = state.cropH;
    let limitMinSize = props.limitMinSize;

    let limitMinNum = new Array();
    if (!Array.isArray(limitMinSize)) {
      limitMinNum = [limitMinSize, limitMinSize];
    } else {
      limitMinNum = limitMinSize;
    }

    //限制最小宽度和高度
    cropW = parseFloat(limitMinNum[0]);
    cropH = parseFloat(limitMinNum[1]);
    return [cropW, cropH];
  }

  /**
   * 根据比例x/y，最小宽度，最小高度，现有宽度，现有高度，得到应该有的宽度和高度
   */
  function calculateSize(x: number, y: number, minX: number, minY: number, w: number, h: number) {
    const ratio = x / y;
    let width = w;
    let height = h;
    // 先根据最小宽度来计算高度
    if (width < minX) {
      width = minX;
      height = Math.ceil(width / ratio);
    }
    // 如果计算出来的高度小于最小高度，则根据最小高度来重新计算宽度和高度
    if (height < minY) {
      height = minY;
      width = Math.ceil(height * ratio);
      // 如果重新计算的宽度仍然小于最小宽度，则使用最小宽度，并重新计算高度
      if (width < minX) {
        width = minX;
        height = Math.ceil(width / ratio);
      }
    }
    // 如果计算出来的宽度或高度小于输入的宽度或高度，则分别使用输入的宽度或高度
    if (width < w) {
      width = w;
      height = Math.ceil(width / ratio);
    }
    if (height < h) {
      height = h;
      width = Math.ceil(height * ratio);
    }
    return { width, height };
  }

  function createCrop(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    // 移动生成大小
    const nowX = 'clientX' in e ? e.clientX : e.touches ? e.touches[0].clientX : 0;
    const nowY = 'clientY' in e ? e.clientY : e.touches ? e.touches[0].clientY : 0;
    nextTick(() => {
      let fw = nowX - state.cropX;
      let fh = nowY - state.cropY;
      if (fw > 0) {
        state.cropW = fw + state.cropChangeX > state.w ? state.w - state.cropChangeX : fw;
        state.cropOffsertX = state.cropChangeX;
      } else {
        state.cropW =
          state.w - state.cropChangeX + Math.abs(fw) > state.w ? state.cropChangeX : Math.abs(fw);
        state.cropOffsertX = state.cropChangeX + fw > 0 ? state.cropChangeX + fw : 0;
      }

      if (!props.fixed) {
        if (fh > 0) {
          state.cropH = fh + state.cropChangeY > state.h ? state.h - state.cropChangeY : fh;
          state.cropOffsertY = state.cropChangeY;
        } else {
          state.cropH =
            state.h - state.cropChangeY + Math.abs(fh) > state.h ? state.cropChangeY : Math.abs(fh);
          state.cropOffsertY = state.cropChangeY + fh > 0 ? state.cropChangeY + fh : 0;
        }
      } else {
        let fixedHeight = (state.cropW / +props.fixedNumber[0]) * +props.fixedNumber[1];
        if (fixedHeight + state.cropOffsertY > state.h) {
          state.cropH = state.h - state.cropOffsertY;
          state.cropW = (state.cropH / +props.fixedNumber[1]) * +props.fixedNumber[0];
          if (fw > 0) {
            state.cropOffsertX = state.cropChangeX;
          } else {
            state.cropOffsertX = state.cropChangeX - state.cropW;
          }
        } else {
          state.cropH = fixedHeight;
        }
        state.cropOffsertY = state.cropOffsertY;
      }
    });
  }

  function endCrop() {
    if (state.cropW === 0 && state.cropH === 0) {
      state.cropping = false;
    }
    let [minCropW, minCropH] = checkCropLimitSize();
    const { width, height } = props.fixed
      ? calculateSize(
          +props.fixedNumber[0],
          +props.fixedNumber[1],
          minCropW,
          minCropH,
          state.cropW,
          state.cropH,
        )
      : { width: minCropW, height: minCropH };
    if (width > state.cropW) {
      state.cropW = width;
      if (state.cropOffsertX + width > state.w) {
        state.cropOffsertX = state.w - width;
      }
    }
    if (height > state.cropH) {
      state.cropH = height;
      if (state.cropOffsertY + height > state.h) {
        state.cropOffsertY = state.h - height;
      }
    }
    window.removeEventListener('mousemove', createCrop);
    window.removeEventListener('mouseup', endCrop);
    window.removeEventListener('touchmove', createCrop);
    window.removeEventListener('touchend', endCrop);
  }

  const cropperRef = ref<HTMLDivElement>();

  function reload() {
    let img = new Image();
    img.onload = () => {
      // 读取图片的信息原始信息， 解析是否需要旋转
      // 读取图片的旋转信息
      // 得到外层容器的宽度高度
      state.w = parseFloat(window.getComputedStyle(cropperRef.value).width);
      state.h = parseFloat(window.getComputedStyle(cropperRef.value).height);

      // 存入图片真实高度
      state.trueWidth = img.width;
      state.trueHeight = img.height;

      // 判断是否需要压缩大图
      if (!props.original) {
        // 判断布局方式 mode
        state.scale = checkedMode();
      } else {
        state.scale = 1;
      }

      nextTick(() => {
        state.x =
          -(state.trueWidth - state.trueWidth * state.scale) / 2 +
          (state.w - state.trueWidth * state.scale) / 2;
        state.y =
          -(state.trueHeight - state.trueHeight * state.scale) / 2 +
          (state.h - state.trueHeight * state.scale) / 2;
        state.loading = false;
        // // 获取是否开启了自动截图
        if (props.autoCrop) {
          goAutoCrop();
        }
        // 图片加载成功的回调
        emit('img-load', 'success');
        setTimeout(() => {
          showPreview();
        }, 20);
      });
    };
    img.onerror = () => {
      emit('img-load', 'error');
    };
    img.src = state.imgs;
  }

  function checkedMode() {
    let scale = 1;
    // 通过字符串分割
    let imgW = state.trueWidth;
    let imgH = state.trueHeight;
    const arr = props.mode.split(' ');
    switch (arr[0]) {
      case 'contain':
        if (state.trueWidth > state.w) {
          // 如果图片宽度大于容器宽度
          scale = state.w / state.trueWidth;
        }

        if (state.trueHeight * scale > state.h) {
          scale = state.h / state.trueHeight;
        }
        break;
      case 'cover':
        // 扩展布局 默认填充满整个容器
        // 图片宽度大于容器
        imgW = state.w;
        scale = imgW / state.trueWidth;
        imgH = imgH * scale;
        // 如果扩展之后高度小于容器的外层高度 继续扩展高度
        if (imgH < state.h) {
          imgH = state.h;
          scale = imgH / state.trueHeight;
        }
        break;
      default:
        try {
          let str = arr[0];
          if (str.search('px') !== -1) {
            str = str.replace('px', '');
            imgW = parseFloat(str);
            const scaleX = imgW / state.trueWidth;
            let scaleY = 1;
            let strH = arr[1];
            if (strH.search('px') !== -1) {
              strH = strH.replace('px', '');
              imgH = parseFloat(strH);
              scaleY = imgH / state.trueHeight;
            }
            scale = Math.min(scaleX, scaleY);
          }
          if (str.search('%') !== -1) {
            str = str.replace('%', '');
            imgW = (parseFloat(str) / 100) * state.w;
            scale = imgW / state.trueWidth;
          }

          if (arr.length === 2 && str === 'auto') {
            let str2 = arr[1];
            if (str2.search('px') !== -1) {
              str2 = str2.replace('px', '');
              imgH = parseFloat(str2);
              scale = imgH / state.trueHeight;
            }
            if (str2.search('%') !== -1) {
              str2 = str2.replace('%', '');
              imgH = (parseFloat(str2) / 100) * state.h;
              scale = imgH / state.trueHeight;
            }
          }
        } catch (error) {
          scale = 1;
        }
    }
    return scale;
  }

  function goAutoCrop(cw?: number, ch?: number) {
    if (state.imgs === '' || state.imgs === null) return;
    clearCrop();
    state.cropping = true;
    let maxWidth = state.w;
    let maxHeight = state.h;
    if (props.centerBox) {
      const switchWH = Math.abs(state.rotate) % 2 > 0;
      let imgW = (switchWH ? state.trueHeight : state.trueWidth) * state.scale;
      let imgH = (switchWH ? state.trueWidth : state.trueHeight) * state.scale;
      maxWidth = imgW < maxWidth ? imgW : maxWidth;
      maxHeight = imgH < maxHeight ? imgH : maxHeight;
    }
    // 截图框默认大小
    // 如果为0 那么计算容器大小 默认为80%
    let w = cw ? cw : parseFloat(props.autoCropWidth.toString());
    let h = ch ? ch : parseFloat(props.autoCropHeight.toString());
    if (w === 0 || h === 0) {
      w = maxWidth * 0.8;
      h = maxHeight * 0.8;
    }
    w = w > maxWidth ? maxWidth : w;
    h = h > maxHeight ? maxHeight : h;
    if (props.fixed) {
      h = (w / +props.fixedNumber[0]) * +props.fixedNumber[1];
    }
    // 如果比例之后 高度大于h
    if (h > state.h) {
      h = state.h;
      w = (h / +props.fixedNumber[1]) * +props.fixedNumber[0];
    }
    changeCrop(w, h);
  }

  function showPreview() {
    // 优化不要多次触发
    if (state.isCanShow) {
      state.isCanShow = false;
      setTimeout(() => {
        state.isCanShow = true;
      }, 16);
    } else {
      return false;
    }
    let w = state.cropW;
    let h = state.cropH;
    let scale = state.scale;
    const obj: Record<string, any> = {};
    obj.div = {
      width: `${w}px`,
      height: `${h}px`,
    };
    let transformX = (state.x - state.cropOffsertX) / scale;
    let transformY = (state.y - state.cropOffsertY) / scale;
    let transformZ = 0;
    obj.w = w;
    obj.h = h;
    obj.url = state.imgs;
    obj.img = {
      width: `${state.trueWidth}px`,
      height: `${state.trueHeight}px`,
      transform: `scale(${scale})translate3d(${transformX}px, ${transformY}px, ${transformZ}px)rotateZ(${
        state.rotate * 90
      }deg)`,
    };
    obj.html = `
    <div class="show-preview" style="width: ${obj.w}px; height: ${obj.h}px,; overflow: hidden">
      <div style="width: ${w}px; height: ${h}px">
        <img src=${obj.url} style="width: ${state.trueWidth}px; height: ${state.trueHeight}px; transform:
        scale(${scale})translate3d(${transformX}px, ${transformY}px, ${transformZ}px)rotateZ(${
      state.rotate * 90
    }deg)">
      </div>
    </div>`;
    emit('real-time', obj);
  }

  function getImgAxis(x?: number, y?: number, scale?: number) {
    x = x || state.x;
    y = y || state.y;
    scale = scale || state.scale;
    // 如果设置了截图框在图片内， 那么限制截图框不能超过图片的坐标
    // 图片的坐标
    let obj = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    };
    let imgW = state.trueWidth * scale;
    let imgH = state.trueHeight * scale;
    switch (state.rotate) {
      case 0:
        obj.x1 = x + (state.trueWidth * (1 - scale)) / 2;
        obj.x2 = obj.x1 + state.trueWidth * scale;
        obj.y1 = y + (state.trueHeight * (1 - scale)) / 2;
        obj.y2 = obj.y1 + state.trueHeight * scale;
        break;
      case 1:
      case -1:
      case 3:
      case -3:
        obj.x1 = x + (state.trueWidth * (1 - scale)) / 2 + (imgW - imgH) / 2;
        obj.x2 = obj.x1 + state.trueHeight * scale;
        obj.y1 = y + (state.trueHeight * (1 - scale)) / 2 + (imgH - imgW) / 2;
        obj.y2 = obj.y1 + state.trueWidth * scale;
        break;
      default:
        obj.x1 = x + (state.trueWidth * (1 - scale)) / 2;
        obj.x2 = obj.x1 + state.trueWidth * scale;
        obj.y1 = y + (state.trueHeight * (1 - scale)) / 2;
        obj.y2 = obj.y1 + state.trueHeight * scale;
        break;
    }
    return obj;
  }

  function changeCrop(w, h) {
    if (props.centerBox) {
      // 修复初始化时候在centerBox=true情况下
      let axis = getImgAxis();
      if (w > axis.x2 - axis.x1) {
        // 宽度超标
        w = axis.x2 - axis.x1;
        h = (w / +props.fixedNumber[0]) * +props.fixedNumber[1];
      }
      if (h > axis.y2 - axis.y1) {
        // 高度超标
        h = axis.y2 - axis.y1;
        w = (h / +props.fixedNumber[1]) * +props.fixedNumber[0];
      }
    }
    // 判断是否大于容器
    state.cropW = w;
    state.cropH = h;
    checkCropLimitSize();
    nextTick(() => {
      // 居中走一走
      state.cropOffsertX = (state.w - state.cropW) / 2;
      state.cropOffsertY = (state.h - state.cropH) / 2;
      if (props.centerBox) {
        moveCrop(null, true);
      }
    });
  }

  function moveCrop(e?: MouseEvent | TouchEvent, isMove?: boolean) {
    let nowX = 0;
    let nowY = 0;
    if (e) {
      e.preventDefault();
      nowX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      nowY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    }
    nextTick(() => {
      let cx, cy;
      let fw = nowX - state.cropX;
      let fh = nowY - state.cropY;
      if (isMove) {
        fw = state.cropOffsertX;
        fh = state.cropOffsertY;
      }
      // 不能超过外层容器
      if (fw <= 0) {
        cx = 0;
      } else if (fw + state.cropW > state.w) {
        cx = state.w - state.cropW;
      } else {
        cx = fw;
      }

      if (fh <= 0) {
        cy = 0;
      } else if (fh + state.cropH > state.h) {
        cy = state.h - state.cropH;
      } else {
        cy = fh;
      }

      // 不能超过图片
      if (props.centerBox) {
        let axis = getImgAxis();
        // 横坐标判断
        if (cx <= axis.x1) {
          cx = axis.x1;
        }

        if (cx + state.cropW > axis.x2) {
          cx = axis.x2 - state.cropW;
        }

        // 纵坐标纵轴
        if (cy <= axis.y1) {
          cy = axis.y1;
        }

        if (cy + state.cropH > axis.y2) {
          cy = axis.y2 - state.cropH;
        }
      }

      state.cropOffsertX = cx;
      state.cropOffsertY = cy;

      // 触发截图框移动事件
      emit('crop-moving', {
        moving: true,
        axis: getCropAxis(),
      });
    });
  }

  function getCropAxis() {
    let obj = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    };
    obj.x1 = state.cropOffsertX;
    obj.x2 = obj.x1 + state.cropW;
    obj.y1 = state.cropOffsertY;
    obj.y2 = obj.y1 + state.cropH;
    return obj;
  }

  function leaveCrop() {
    window.removeEventListener('mousemove', moveCrop);
    window.removeEventListener('mouseup', leaveCrop);
    window.removeEventListener('touchmove', moveCrop);
    window.removeEventListener('touchend', leaveCrop);
    // 触发截图框移动事件
    emit('crop-moving', {
      moving: false,
      axis: getCropAxis(),
    });
  }

  function cropMove(e) {
    e.preventDefault();
    if (!props.canMoveBox) {
      state.crop = false;
      startMove(e);
      return false;
    }

    if (e.touches && e.touches.length === 2) {
      state.crop = false;
      startMove(e);
      leaveCrop();
      return false;
    }
    window.addEventListener('mousemove', moveCrop);
    window.addEventListener('mouseup', leaveCrop);
    window.addEventListener('touchmove', moveCrop);
    window.addEventListener('touchend', leaveCrop);
    let x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    let y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    let newX, newY;
    newX = x - state.cropOffsertX;
    newY = y - state.cropOffsertY;
    state.cropX = newX;
    state.cropY = newY;
    // 触发截图框移动事件
    emit('crop-moving', {
      moving: true,
      axis: getCropAxis(),
    });
  }

  function getCropChecked(cb) {
    let canvas = document.createElement('canvas');
    let img = new Image();
    let rotate = state.rotate;
    let trueWidth = state.trueWidth;
    let trueHeight = state.trueHeight;
    let cropOffsertX = state.cropOffsertX;
    let cropOffsertY = state.cropOffsertY;
    img.onload = () => {
      if (state.cropW !== 0) {
        let ctx = canvas.getContext('2d');
        let dpr = 1;
        if (props.high && !props.full) {
          dpr = window.devicePixelRatio;
        }
        if (+props.enlarge !== 1 && !props.full) {
          dpr = Math.abs(Number(props.enlarge));
        }
        let width = state.cropW * dpr;
        let height = state.cropH * dpr;
        let imgW = trueWidth * state.scale * dpr;
        let imgH = trueHeight * state.scale * dpr;
        // 图片x轴偏移
        let dx = (state.x - cropOffsertX + (state.trueWidth * (1 - state.scale)) / 2) * dpr;
        // 图片y轴偏移
        let dy = (state.y - cropOffsertY + (state.trueHeight * (1 - state.scale)) / 2) * dpr;
        //保存状态
        setCanvasSize(width, height);
        ctx.save();
        // 填充背景颜色
        if (props.fillColor) {
          ctx.fillStyle = props.fillColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        switch (rotate) {
          case 0:
            if (!props.full) {
              ctx.drawImage(img, dx, dy, imgW, imgH);
            } else {
              // 输出原图比例截图
              setCanvasSize(width / state.scale, height / state.scale);
              ctx.drawImage(
                img,
                dx / state.scale,
                dy / state.scale,
                imgW / state.scale,
                imgH / state.scale,
              );
            }
            break;
          case 1:
          case -3:
            if (!props.full) {
              // 换算图片旋转后的坐标弥补
              dx = dx + (imgW - imgH) / 2;
              dy = dy + (imgH - imgW) / 2;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(img, dy, -dx - imgH, imgW, imgH);
            } else {
              setCanvasSize(width / state.scale, height / state.scale);
              // 换算图片旋转后的坐标弥补
              dx = dx / state.scale + (imgW / state.scale - imgH / state.scale) / 2;
              dy = dy / state.scale + (imgH / state.scale - imgW / state.scale) / 2;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(
                img,
                dy,
                -dx - imgH / state.scale,
                imgW / state.scale,
                imgH / state.scale,
              );
            }
            break;
          case 2:
          case -2:
            if (!props.full) {
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(img, -dx - imgW, -dy - imgH, imgW, imgH);
            } else {
              setCanvasSize(width / state.scale, height / state.scale);
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              dx = dx / state.scale;
              dy = dy / state.scale;
              ctx.drawImage(
                img,
                -dx - imgW / state.scale,
                -dy - imgH / state.scale,
                imgW / state.scale,
                imgH / state.scale,
              );
            }
            break;
          case 3:
          case -1:
            if (!props.full) {
              // 换算图片旋转后的坐标弥补
              dx = dx + (imgW - imgH) / 2;
              dy = dy + (imgH - imgW) / 2;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(img, -dy - imgW, dx, imgW, imgH);
            } else {
              setCanvasSize(width / state.scale, height / state.scale);
              // 换算图片旋转后的坐标弥补
              dx = dx / state.scale + (imgW / state.scale - imgH / state.scale) / 2;
              dy = dy / state.scale + (imgH / state.scale - imgW / state.scale) / 2;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(
                img,
                -dy - imgW / state.scale,
                dx,
                imgW / state.scale,
                imgH / state.scale,
              );
            }
            break;
          default:
            if (!props.full) {
              ctx.drawImage(img, dx, dy, imgW, imgH);
            } else {
              // 输出原图比例截图
              setCanvasSize(width / state.scale, height / state.scale);
              ctx.drawImage(
                img,
                dx / state.scale,
                dy / state.scale,
                imgW / state.scale,
                imgH / state.scale,
              );
            }
        }
        ctx.restore();
      } else {
        let width = trueWidth * state.scale;
        let height = trueHeight * state.scale;
        let ctx = canvas.getContext('2d');
        ctx.save();
        // 填充背景颜色
        if (props.fillColor) {
          ctx.fillStyle = props.fillColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        switch (rotate) {
          case 0:
            setCanvasSize(width, height);
            ctx.drawImage(img, 0, 0, width, height);
            break;
          case 1:
          case -3:
            // 旋转90度 或者-270度 宽度和高度对调
            setCanvasSize(height, width);
            ctx.rotate((rotate * 90 * Math.PI) / 180);
            ctx.drawImage(img, 0, -height, width, height);
            break;
          case 2:
          case -2:
            setCanvasSize(width, height);
            ctx.rotate((rotate * 90 * Math.PI) / 180);
            ctx.drawImage(img, -width, -height, width, height);
            break;
          case 3:
          case -1:
            setCanvasSize(height, width);
            ctx.rotate((rotate * 90 * Math.PI) / 180);
            ctx.drawImage(img, -width, 0, width, height);
            break;
          default:
            setCanvasSize(width, height);
            ctx.drawImage(img, 0, 0, width, height);
        }
        ctx.restore();
      }
      cb(canvas);
    };
    // 判断图片是否是base64
    const s = props.img.substr(0, 4);
    if (s !== 'data') {
      img.crossOrigin = 'Anonymous';
    }
    img.src = state.imgs;

    function setCanvasSize(width, height) {
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
    }
  }

  watch(
    () => props.img,
    () => {
      checkedImg();
    },
    { immediate: true },
  );

  watch(
    () => state.imgs,
    (v) => {
      if (!v) {
        return;
      }
      reload();
    },
    { immediate: true },
  );

  watch(
    [
      () => state.cropW,
      () => state.cropH,
      () => state.cropOffsertX,
      () => state.cropOffsertY,
      () => state.x,
      () => state.y,
      () => state.scale,
    ],
    () => showPreview(),
    { immediate: true },
  );

  watch(
    [() => props.autoCrop, () => props.autoCropWidth, () => props.autoCropHeight],
    () => {
      if (props.autoCrop) {
        goAutoCrop();
      }
    },
    { immediate: true },
  );

  watch(
    () => props.mode,
    () => {
      checkedImg();
    },
  );

  watch(
    () => state.rotate,
    () => {
      showPreview();
      if (props.autoCrop) {
        goAutoCrop(state.cropW, state.cropH);
      } else {
        if (state.cropW > 0 || state.cropH > 0) {
          goAutoCrop(state.cropW, state.cropH);
        }
      }
    },
  );

  function checkoutImgAxis(x?: number, y?: number, scale?: number) {
    x = x || state.x;
    y = y || state.y;
    scale = scale || state.scale;
    let canGo = true;
    // 开始校验 如果说缩放之后的坐标在截图框外 则阻止缩放
    if (props.centerBox) {
      let axis = getImgAxis(x, y, scale);
      let cropAxis = getCropAxis();
      // 左边的横坐标 图片不能超过截图框
      if (axis.x1 >= cropAxis.x1) {
        canGo = false;
      }

      // 右边横坐标
      if (axis.x2 <= cropAxis.x2) {
        canGo = false;
      }

      // 纵坐标上面
      if (axis.y1 >= cropAxis.y1) {
        canGo = false;
      }

      // 纵坐标下面
      if (axis.y2 <= cropAxis.y2) {
        canGo = false;
      }
    }
    return canGo;
  }

  function touchScale(e: TouchEvent) {
    e.preventDefault();
    let scale = state.scale;
    // 记录变化量
    // 第一根手指
    const oldTouch1 = {
      x: state.touches[0].clientX,
      y: state.touches[0].clientY,
    };
    const newTouch1 = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    // 第二根手指
    const oldTouch2 = {
      x: state.touches[1].clientX,
      y: state.touches[1].clientY,
    };
    const newTouch2 = {
      x: e.touches[1].clientX,
      y: e.touches[1].clientY,
    };
    const oldL = Math.sqrt(
      Math.pow(oldTouch1.x - oldTouch2.x, 2) + Math.pow(oldTouch1.y - oldTouch2.y, 2),
    );
    const newL = Math.sqrt(
      Math.pow(newTouch1.x - newTouch2.x, 2) + Math.pow(newTouch1.y - newTouch2.y, 2),
    );
    const cha = newL - oldL;
    // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
    // 1px - 0.2
    let coe = 1;
    coe =
      coe / state.trueWidth > coe / state.trueHeight
        ? coe / state.trueHeight
        : coe / state.trueWidth;
    coe = coe > 0.1 ? 0.1 : coe;
    let num = coe * cha;
    if (!state.touchNow) {
      state.touchNow = true;
      if (cha > 0) {
        scale += Math.abs(num);
      } else if (cha < 0) {
        scale > Math.abs(num) ? (scale -= Math.abs(num)) : scale;
      }
      state.touches = e.touches as any;
      setTimeout(() => {
        state.touchNow = false;
      }, 8);
      if (!checkoutImgAxis(state.x, state.y, scale)) {
        return false;
      }
      state.scale = scale;
    }
  }

  function cancelTouchScale(e) {
    window.removeEventListener('touchmove', touchScale);
  }

  function moveImg(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    if (e instanceof TouchEvent && e.touches && e.touches.length === 2) {
      state.touches = e.touches as any;
      window.addEventListener('touchmove', touchScale);
      window.addEventListener('touchend', cancelTouchScale);
      window.removeEventListener('touchmove', moveImg);
      return false;
    }
    let nowX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    let nowY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    let changeX, changeY;
    changeX = nowX - state.moveX;
    changeY = nowY - state.moveY;

    nextTick(() => {
      if (props.centerBox) {
        let axis = getImgAxis(changeX, changeY, state.scale);
        let cropAxis = getCropAxis();
        let imgW = state.trueHeight * state.scale;
        let imgH = state.trueWidth * state.scale;
        let maxLeft, maxTop, maxRight, maxBottom;
        switch (state.rotate) {
          case 1:
          case -1:
          case 3:
          case -3:
            maxLeft =
              state.cropOffsertX - (state.trueWidth * (1 - state.scale)) / 2 + (imgW - imgH) / 2;
            maxTop =
              state.cropOffsertY - (state.trueHeight * (1 - state.scale)) / 2 + (imgH - imgW) / 2;
            maxRight = maxLeft - imgW + state.cropW;
            maxBottom = maxTop - imgH + state.cropH;
            break;
          default:
            maxLeft = state.cropOffsertX - (state.trueWidth * (1 - state.scale)) / 2;
            maxTop = state.cropOffsertY - (state.trueHeight * (1 - state.scale)) / 2;
            maxRight = maxLeft - imgH + state.cropW;
            maxBottom = maxTop - imgW + state.cropH;
            break;
        }

        // 图片左边 图片不能超过截图框
        if (axis.x1 >= cropAxis.x1) {
          changeX = maxLeft;
        }

        // 图片上边 图片不能超过截图框
        if (axis.y1 >= cropAxis.y1) {
          changeY = maxTop;
        }

        // 图片右边
        if (axis.x2 <= cropAxis.x2) {
          changeX = maxRight;
        }

        // 图片下边
        if (axis.y2 <= cropAxis.y2) {
          changeY = maxBottom;
        }
      }
      state.x = changeX;
      state.y = changeY;
      // 触发图片移动事件
      emit('img-moving', {
        moving: true,
        axis: getImgAxis(),
      });
    });
  }

  function leaveImg(e: MouseEvent | TouchEvent) {
    window.removeEventListener('mousemove', moveImg);
    window.removeEventListener('touchmove', moveImg);
    window.removeEventListener('mouseup', leaveImg);
    window.removeEventListener('touchend', leaveImg);
    // 触发图片移动事件
    emit('img-moving', {
      moving: false,
      axis: getImgAxis(),
    });
  }

  function scaleImg() {
    if (props.canScale) {
      window.addEventListener(state.support, changeSize);
    }
  }

  function cancelScale() {
    if (props.canScale) {
      window.removeEventListener(state.support, changeSize);
    }
  }

  function changeSize(e) {
    e.preventDefault();
    let scale = state.scale;
    let change = e.deltaY || e.wheelDelta;
    // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
    const isFirefox = navigator.userAgent.indexOf('Firefox');
    change = isFirefox > 0 ? change * 30 : change;
    // 1px - 0.2
    let coe = state.coe;
    coe =
      coe / state.trueWidth > coe / state.trueHeight
        ? coe / state.trueHeight
        : coe / state.trueWidth;
    var num = coe * change;
    num < 0 ? (scale += Math.abs(num)) : scale > Math.abs(num) ? (scale -= Math.abs(num)) : scale;
    // 延迟0.1s 每次放大大或者缩小的范围
    let status = num < 0 ? 'add' : 'reduce';
    if (status !== state.coeStatus) {
      state.coeStatus = status;
      state.coe = 0.2;
    }
    if (!state.scaling) {
      state.scalingSet = setTimeout(() => {
        state.scaling = false;
        state.coe = state.coe += 0.01;
      }, 50);
    }
    state.scaling = true;
    if (!checkoutImgAxis(state.x, state.y, scale)) {
      return false;
    }
    state.scale = scale;
  }

  function changeScale(num?: number) {
    let scale = state.scale;
    num = num || 1;
    var coe = 20;
    coe =
      coe / state.trueWidth > coe / state.trueHeight
        ? coe / state.trueHeight
        : coe / state.trueWidth;
    num = num * coe;
    num > 0 ? (scale += Math.abs(num)) : scale > Math.abs(num) ? (scale -= Math.abs(num)) : scale;
    if (!checkoutImgAxis(state.x, state.y, scale)) {
      return false;
    }
    state.scale = scale;
  }

  function changeCropEnd(e) {
    window.removeEventListener('mousemove', changeCropNow);
    window.removeEventListener('mouseup', changeCropEnd);
    window.removeEventListener('touchmove', changeCropNow);
    window.removeEventListener('touchend', changeCropEnd);
  }

  function changeCropSize(e, w, h, typeW, typeH) {
    e.preventDefault();
    window.addEventListener('mousemove', changeCropNow);
    window.addEventListener('mouseup', changeCropEnd);
    window.addEventListener('touchmove', changeCropNow);
    window.addEventListener('touchend', changeCropEnd);
    state.canChangeX = w;
    state.canChangeY = h;
    state.changeCropTypeX = typeW;
    state.changeCropTypeY = typeH;
    state.cropX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    state.cropY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    state.cropOldW = state.cropW;
    state.cropOldH = state.cropH;
    state.cropChangeX = state.cropOffsertX;
    state.cropChangeY = state.cropOffsertY;
    if (props.fixed) {
      if (state.canChangeX && state.canChangeY) {
        state.canChangeY = false;
      }
    }
    emit('change-crop-size', {
      width: state.cropW,
      height: state.cropH,
    });
  }

  function changeCropNow(e) {
    e.preventDefault();
    const nowX = 'clientX' in e ? e.clientX : e.touches ? e.touches[0].clientX : 0;
    const nowY = 'clientY' in e ? e.clientY : e.touches ? e.touches[0].clientY : 0;
    // 容器的宽高
    let wrapperW = state.w;
    let wrapperH = state.h;

    // 不能超过的坐标轴
    let minX = 0;
    let minY = 0;

    if (props.centerBox) {
      let axis = getImgAxis();
      let imgW = axis.x2;
      let imgH = axis.y2;
      minX = axis.x1 > 0 ? axis.x1 : 0;
      minY = axis.y1 > 0 ? axis.y1 : 0;
      if (wrapperW > imgW) {
        wrapperW = imgW;
      }

      if (wrapperH > imgH) {
        wrapperH = imgH;
      }
    }
    const [minCropW, minCropH] = checkCropLimitSize();
    nextTick(() => {
      let fw = nowX - state.cropX;
      let fh = nowY - state.cropY;
      if (state.canChangeX) {
        if (state.changeCropTypeX === 1) {
          if (state.cropOldW - fw < minCropW) {
            state.cropW = minCropW;
            state.cropOffsertX = state.cropOldW + state.cropChangeX - minX - minCropW;
          } else if (state.cropOldW - fw > 0) {
            state.cropW =
              wrapperW - state.cropChangeX - fw <= wrapperW - minX
                ? state.cropOldW - fw
                : state.cropOldW + state.cropChangeX - minX;
            state.cropOffsertX =
              wrapperW - state.cropChangeX - fw <= wrapperW - minX ? state.cropChangeX + fw : minX;
          } else {
            state.cropW =
              Math.abs(fw) + state.cropChangeX <= wrapperW
                ? Math.abs(fw) - state.cropOldW
                : wrapperW - state.cropOldW - state.cropChangeX;
            state.cropOffsertX = state.cropChangeX + state.cropOldW;
          }
        } else if (state.changeCropTypeX === 2) {
          if (state.cropOldW + fw < minCropW) {
            state.cropW = minCropW;
          } else if (state.cropOldW + fw > 0) {
            state.cropW =
              state.cropOldW + fw + state.cropOffsertX <= wrapperW
                ? state.cropOldW + fw
                : wrapperW - state.cropOffsertX;
            state.cropOffsertX = state.cropChangeX;
          } else {
            // 右侧坐标抽 超过左侧
            state.cropW =
              wrapperW - state.cropChangeX + Math.abs(fw + state.cropOldW) <= wrapperW - minX
                ? Math.abs(fw + state.cropOldW)
                : state.cropChangeX - minX;
            state.cropOffsertX =
              wrapperW - state.cropChangeX + Math.abs(fw + state.cropOldW) <= wrapperW - minX
                ? state.cropChangeX - Math.abs(fw + state.cropOldW)
                : minX;
          }
        }
      }

      if (state.canChangeY) {
        if (state.changeCropTypeY === 1) {
          if (state.cropOldH - fh < minCropH) {
            state.cropH = minCropH;
            state.cropOffsertY = state.cropOldH + state.cropChangeY - minY - minCropH;
          } else if (state.cropOldH - fh > 0) {
            state.cropH =
              wrapperH - state.cropChangeY - fh <= wrapperH - minY
                ? state.cropOldH - fh
                : state.cropOldH + state.cropChangeY - minY;
            state.cropOffsertY =
              wrapperH - state.cropChangeY - fh <= wrapperH - minY ? state.cropChangeY + fh : minY;
          } else {
            state.cropH =
              Math.abs(fh) + state.cropChangeY <= wrapperH
                ? Math.abs(fh) - state.cropOldH
                : wrapperH - state.cropOldH - state.cropChangeY;
            state.cropOffsertY = state.cropChangeY + state.cropOldH;
          }
        } else if (state.changeCropTypeY === 2) {
          if (state.cropOldH + fh < minCropH) {
            state.cropH = minCropH;
          } else if (state.cropOldH + fh > 0) {
            state.cropH =
              state.cropOldH + fh + state.cropOffsertY <= wrapperH
                ? state.cropOldH + fh
                : wrapperH - state.cropOffsertY;
            state.cropOffsertY = state.cropChangeY;
          } else {
            state.cropH =
              wrapperH - state.cropChangeY + Math.abs(fh + state.cropOldH) <= wrapperH - minY
                ? Math.abs(fh + state.cropOldH)
                : state.cropChangeY - minY;
            state.cropOffsertY =
              wrapperH - state.cropChangeY + Math.abs(fh + state.cropOldH) <= wrapperH - minY
                ? state.cropChangeY - Math.abs(fh + state.cropOldH)
                : minY;
          }
        }
      }
      if (state.canChangeX && props.fixed) {
        let fixedHeight = (state.cropW / +props.fixedNumber[0]) * +props.fixedNumber[1];
        if (fixedHeight < minCropH) {
          state.cropH = minCropH;
          state.cropW = (+props.fixedNumber[0] * minCropH) / +props.fixedNumber[1];
          // 这里需要去修改 offsetX的值，去调整因为高度变化而导致的宽度变化
          if (state.changeCropTypeX === 1) {
            state.cropOffsertX = state.cropChangeX + (state.cropOldW - state.cropW);
          }
        } else if (fixedHeight + state.cropOffsertY > wrapperH) {
          state.cropH = wrapperH - state.cropOffsertY;
          state.cropW = (state.cropH / +props.fixedNumber[1]) * +props.fixedNumber[0];
          if (state.changeCropTypeX === 1) {
            state.cropOffsertX = state.cropChangeX + (state.cropOldW - state.cropW);
          }
        } else {
          state.cropH = fixedHeight;
        }
      }
      if (state.canChangeY && props.fixed) {
        var fixedWidth = (state.cropH / +props.fixedNumber[1]) * +props.fixedNumber[0];
        if (fixedWidth < minCropW) {
          state.cropW = minCropW;
          state.cropH = (+props.fixedNumber[1] * minCropW) / +props.fixedNumber[0];
          state.cropOffsertY = state.cropOldH + state.cropChangeY - state.cropH;
        } else if (fixedWidth + state.cropOffsertX > wrapperW) {
          state.cropW = wrapperW - state.cropOffsertX;
          state.cropH = (state.cropW / +props.fixedNumber[0]) * +props.fixedNumber[1];
        } else {
          state.cropW = fixedWidth;
        }
      }
    });
  }

  function startMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    // 如果move 为true 表示当前可以拖动
    if (state.move && !state.crop) {
      if (!props.canMove) {
        return false;
      }
      // 开始移动
      state.moveX = ('clientX' in e ? e.clientX : e.touches[0].clientX) - state.x;
      state.moveY = ('clientY' in e ? e.clientY : e.touches[0].clientY) - state.y;
      if (e instanceof TouchEvent && e.touches) {
        window.addEventListener('touchmove', moveImg);
        window.addEventListener('touchend', leaveImg);
        if (e.touches.length == 2) {
          // 记录手指刚刚放上去
          state.touches = (e as TouchEvent).touches as any;
          window.addEventListener('touchmove', touchScale);
          window.addEventListener('touchend', cancelTouchScale);
        }
      } else {
        window.addEventListener('mousemove', moveImg);
        window.addEventListener('mouseup', leaveImg);
      }
      // 触发图片移动事件
      emit('img-moving', {
        moving: true,
        axis: getImgAxis(),
      });
    } else {
      // 截图ing
      state.cropping = true;
      // 绑定截图事件
      window.addEventListener('mousemove', createCrop);
      window.addEventListener('mouseup', endCrop);
      window.addEventListener('touchmove', createCrop);
      window.addEventListener('touchend', endCrop);
      state.cropOffsertX = (e as MouseEvent).offsetX
        ? (e as MouseEvent).offsetX
        : (e as TouchEvent).touches[0].pageX - cropperRef.value.offsetLeft;
      state.cropOffsertY = (e as MouseEvent).offsetY
        ? (e as MouseEvent).offsetY
        : (e as TouchEvent).touches[0].pageY - cropperRef.value.offsetTop;
      state.cropX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      state.cropY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      state.cropChangeX = state.cropOffsertX;
      state.cropChangeY = state.cropOffsertY;
      state.cropW = 0;
      state.cropH = 0;
    }
  }

  function getCropData(cb: Function) {
    getCropChecked((data) => {
      cb(data.toDataURL('image/' + props.outputType, props.outputSize));
    });
  }

  function getCropBlob(cb: Function) {
    getCropChecked((data) => {
      data.toBlob((blob) => cb(blob), 'image/' + props.outputType, props.outputSize);
    });
  }

  function refresh() {
    let img = props.img;
    state.imgs = '';
    state.scale = 1;
    state.crop = false;
    state.rotate = 0;
    state.w = 0;
    state.h = 0;
    state.trueWidth = 0;
    state.trueHeight = 0;
    clearCrop();
    nextTick(() => {
      checkedImg();
    });
  }

  function rotateLeft() {
    state.rotate = state.rotate <= -3 ? 0 : state.rotate - 1;
  }

  function rotateRight() {
    state.rotate = state.rotate >= 3 ? 0 : state.rotate + 1;
  }

  function rotateClear() {
    state.rotate = 0;
  }

  onMounted(() => {
    state.support =
      'onwheel' in document.createElement('div')
        ? 'wheel'
        : // @ts-ignore
        document.onmousewheel !== undefined
        ? 'mousewheel'
        : 'DOMMouseScroll';
    const u = navigator.userAgent;
    state.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // 兼容blob
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
          const binStr = atob(this.toDataURL(type, quality).split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: props.outputType || 'image/png' }));
        },
      });
    }
    showPreview();
    checkedImg();
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', moveCrop);
    window.removeEventListener('mouseup', leaveCrop);
    window.removeEventListener('touchmove', moveCrop);
    window.removeEventListener('touchend', leaveCrop);
    cancelScale();
  });

  return {
    state,
    cropInfo,
    getVersion,
    startCrop,
    stopCrop,
    endCrop,
    cropperRef,
    startMove,
  };
};
