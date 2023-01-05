/*
 * @Author: zhangyang
 * @Date: 2022-12-07 10:40:28
 * @LastEditTime: 2022-12-07 12:22:27
 * @Description: 
 */
import { defineComponent, ref, onMounted, onUnmounted, nextTick, Teleport } from 'vue';

export default defineComponent({
  props: {
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  setup(props, { expose, slots }) {
    const showPopup = ref(false);

    const show = () => showPopup.value = true;
    const hide = () => showPopup.value = false;

    const clickHide = (e: MouseEvent) => {
      if (e.composedPath()[0] === e.currentTarget) {
        hide();
      }
    };

    expose({
      show,
      hide
    });

    const el = ref<HTMLInputElement>();

    const onKeyShow = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLocaleLowerCase() === 'k') {
        e.preventDefault();
        if (!showPopup.value) {
          show();
          nextTick(() => {
            el.value?.focus();
          });
        } else {
          hide();
        }
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', onKeyShow);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', onKeyShow);
    });

    return () => (
      <Teleport to="body">
        <div onClick={(e) => clickHide(e)} style={{
          display: showPopup.value ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: props.zIndex
        }}>
          <div
            style={{
              position: 'relative',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(600px, 70%)',
              maxHeight: 'min(520px, 60%)',
              overflow: 'auto',
              borderRadius: '1rem',
              border: '1px solid rgb(219, 234, 254)',
              backgroundColor: 'white',
              padding: '2rem',
              boxShadow: 'rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)'
            }}
          >
            {
              slots.default
                ? slots.default({ el })
                : <input ref={el} type="text" />
            }
          </div>
        </div>
      </Teleport>
    )
  }
})