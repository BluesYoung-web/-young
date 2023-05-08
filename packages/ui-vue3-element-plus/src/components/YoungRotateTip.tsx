/*
 * @Author: zhangyang
 * @Date: 2023-05-08 14:22:21
 * @LastEditTime: 2023-05-08 15:24:36
 * @Description:
 */
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { useEventListener, useWindowSize } from '@vueuse/core';
import { ElOverlay } from 'element-plus';
const landscape =
  'https://g2021-cdn.laiyouxi.com/image/21Store/laiyouxi_guid/website/landscape.png';
export default defineComponent({
  props: {
    maxWidth: {
      type: Number,
      default: 768,
    },
  },
  setup(props, { attrs }) {
    const element = ref<HTMLDivElement>();
    const showTip = ref(false);
    const show = () => (showTip.value = true);
    const hide = () => (showTip.value = false);

    const { width, height } = useWindowSize();
    const isSmallDevices = computed(
      () => width.value < height.value || width.value < props.maxWidth,
    );

    watchEffect(() => {
      if (isSmallDevices.value) {
        show();
      } else {
        hide();
      }
    });

    useEventListener(element, 'animationend', (e) => {
      hide();
    });
    return () => (
      <>
        {showTip.value && (
          <ElOverlay mask style={{ width: '100vw', height: '100vh' }} {...attrs}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <style>
                {`
                @keyframes rotate {
                  from {
                    transform: rotate(0);
                  }
                
                  to {
                    transform: rotate(90deg);
                  }
                }
                .rotate-tip {
                  width: 200px;
                  animation-name: rotate;
                  animation-iteration-count: 6;
                  animation-duration: 1s;
                  animation-direction: alternate;
                  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }
                `}
              </style>
              <img ref={element} src={landscape} class="rotate-tip" />
              <div
                style={{
                  color: 'white',
                  marginTop: '2.5rem',
                  fontSize: '1.25rem',
                  lineHeight: '1.75rem',
                }}
              >
                为了更好的用户体验，请横屏使用
              </div>
            </div>
          </ElOverlay>
        )}
      </>
    );
  },
});
