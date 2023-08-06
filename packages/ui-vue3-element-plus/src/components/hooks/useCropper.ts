/*
 * @Author: zhangyang
 * @Date: 2023-08-06 15:54:11
 * @LastEditTime: 2023-08-06 19:29:54
 * @Description:
 */
import { type ExtractPropTypes, computed, reactive, watch } from 'vue';
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
    scalingSet: '',
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

  function checkOrientationImage(img, orientation, width, height) {
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

  function endCrop() {
    if (state.cropW === 0 && state.cropH === 0) {
      state.cropping = false;
    }
    let [minCropW, minCropH] = state.checkCropLimitSize();
    const { width, height } = state.fixed
      ? state.calculateSize(
          state.fixedNumber[0],
          state.fixedNumber[1],
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
    window.removeEventListener('mousemove', state.createCrop);
    window.removeEventListener('mouseup', state.endCrop);
    window.removeEventListener('touchmove', state.createCrop);
    window.removeEventListener('touchend', state.endCrop);
  }

  watch(
    () => props.img,
    () => {
      checkedImg();
    },
    { immediate: true },
  );

  return {
    state,
    cropInfo,
    getVersion,
    startCrop,
    stopCrop,
  };
};
