/*
 * @Author: zhangyang
 * @Date: 2023-08-06 15:30:40
 * @LastEditTime: 2023-08-06 19:29:57
 * @Description:
 */
import { defineComponent, computed } from 'vue';
import { ElUpload, ElButton, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { useImagePreview } from '..';
import { randomId } from '@bluesyoung/utils';
import { CropperPorps } from './hooks/useCropper';
import type { PropType, ExtractPropTypes } from 'vue';

export default defineComponent({
  props: {
    img: {
      type: [String, Blob, null, File],
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
  },
  setup(props) {
    return () => (
      <>
        <div>{props}</div>
      </>
    );
  },
});
