/*
 * @Author: zhangyang
 * @Date: 2023-03-17 21:03:39
 * @LastEditTime: 2023-03-18 15:57:32
 * @Description:
 */
import { useEventListener } from '@vueuse/core';
import { ElImageViewer } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

export type YoungImageViewerConf = {
  /**
   * 图片目录
   */
  srcList: string[];
  /**
   * 当前为第几张
   */
  index?: number;
};

export default defineComponent({
  props: {
    onDestroy: {
      type: Function,
      default: () => console.log('为了节省性能，此时应该销毁dom'),
    },
    zIndex: {
      type: Number,
      default: 9999,
    },
  },
  setup(props, { expose }) {
    const showViewer = ref(false);

    const previewConfig = reactive({
      srcList: [],
      index: 0,
      zIndex: props.zIndex,
    });

    function wheelHandler(e: WheelEvent) {
      if (!e.ctrlKey) return;

      if (e.deltaY < 0) {
        e.preventDefault();
        return false;
      } else if (e.deltaY > 0) {
        e.preventDefault();
        return false;
      }
    }

    const stopWheelListener = useEventListener('wheel', wheelHandler, {
      passive: false,
    });

    let prevOverflow: string;

    function show(conf: YoungImageViewerConf) {
      previewConfig.srcList = conf.srcList;
      previewConfig.index = conf.index ?? 0;

      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      showViewer.value = true;
    }

    function close() {
      stopWheelListener();
      document.body.style.overflow = prevOverflow;
      showViewer.value = false;
      props.onDestroy();
    }

    expose({
      show,
      close,
    });

    return () =>
      showViewer.value && (
        <ElImageViewer
          zIndex={previewConfig.zIndex}
          initialIndex={previewConfig.index}
          urlList={previewConfig.srcList}
          hideOnClickModal
          onClose={close}
        />
      );
  },
});
