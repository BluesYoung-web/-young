/*
 * @Author: zhangyang
 * @Date: 2023-01-05 15:01:31
 * @LastEditTime: 2023-01-05 15:14:17
 * @Description: 
 */
import { defineComponent, Teleport, nextTick, ref, watch, type PropType } from 'vue';
import { useMouse } from '@vueuse/core';

interface ContextMenuItem {
  handlerName: string;
  title: string;
};

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    menuList: {
      type: Object as PropType<ContextMenuItem[]>,
      required: true
    }
  },
  emits: ['update:modelValue', 'clickItem'],
  setup(props, { emit }) {
    const { x, y } = useMouse();
    const left = ref(0);
    const top = ref(0);
    const menu = ref();

    watch(() => props.modelValue, (newVal, oldVal) => {
      if (newVal && !oldVal) {
        nextTick(() => {
          console.log(menu.value)
          const { width, height } = window.getComputedStyle(menu.value as HTMLElement);
          const { innerWidth, innerHeight } = window;
          // 此时鼠标的坐标
          const tx = x.value;
          const ty = y.value;
          // 此时自定义菜单的宽高
          const rw = parseFloat(width);
          const rh = parseFloat(height);
          // 处理边界值
          left.value = innerWidth - tx > rw ? tx : innerWidth - rw;
          top.value = innerHeight - ty > rh ? ty : innerHeight - rh;
        });
      }
    });

    const clickHandler = (handler: string) => {
      emit('clickItem', handler);
    };
    const close = () => {
      emit('update:modelValue', false);
    };
    return () => (
      <Teleport to="body">
        {
          props.modelValue && <div style={{
            backgroundColor: 'rgba(200, 200, 200, 0)',
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            top: 0,
            zIndex: 1001
          }}
            onClick={() => close()}
          >
            <ul
              ref={menu}
              style={{
                left: left.value + 'px',
                top: top.value + 'px',
                margin: 0,
                background: '#fff',
                zIndex: 3000,
                position: 'absolute',
                listStyleType: 'none',
                padding: '5px 0',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 400,
                color: '#333',
                boxShadow: '2px 2px 3px 0 rgba(0, 0, 0, .3)'
              }}
            >
              {
                props.menuList.map((item, index) =>
                  <li
                    key={index + 'fdasjhe'}
                    style={{
                      margin: 0,
                      padding: '7px 16px',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => { e.stopPropagation(); clickHandler(item.handlerName) }}
                    onMouseover={(e) => (e.currentTarget as HTMLDivElement).style.background = '#eee'}
                    onMouseleave={(e) => (e.currentTarget as HTMLDivElement).style.background = '#fff'}
                  >
                    {item.title}
                  </li>
                )
              }
            </ul>
          </div>
        }
      </Teleport>
    )
  }
});