/*
 * @Author: zhangyang
 * @Date: 2023-05-30 09:26:58
 * @LastEditTime: 2023-07-30 15:24:01
 * @Description:
 */
import { ref, defineComponent, TransitionGroup } from 'vue';
import type { PropType } from 'vue';
import type { TableHeadItem } from '..';
import { ElSwitch } from 'element-plus';

export type TableHeadItemPro = TableHeadItem & {
  check?: boolean;
};

export default defineComponent({
  props: {
    list: {
      required: true,
      type: Object as PropType<TableHeadItemPro[]>,
    },
  },
  emits: ['drag-end', 'change'],
  setup(props, { emit }) {
    const draggable = ref(false);
    const isDrag = ref(false);

    let dragIndex = -1;
    let timeout: NodeJS.Timeout;

    function dragstart(index: number) {
      dragIndex = index;
    }

    function dragenter(e: DragEvent, index: number) {
      e.preventDefault();
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      isDrag.value = true;
      // 拖拽事件的防抖
      timeout = setTimeout(() => {
        if (dragIndex !== index) {
          const source = props.list[dragIndex];
          props.list.splice(dragIndex, 1);
          props.list.splice(index, 0, source);
          // 排序变化后目标对象的索引变成源对象的索引
          dragIndex = index;
        }
        isDrag.value = false;
      }, 100);
    }

    function dragend() {
      if (!isDrag.value) {
        emit('drag-end', props.list);
      } else {
        setTimeout(() => {
          dragend();
        }, 100);
      }
    }

    function dragover(e: DragEvent, index: number) {
      e.preventDefault();
    }

    function handleChangeCheck(item: TableHeadItemPro) {
      emit('change', item, !item.check);
    }

    return () => (
      <div>
        <style>
          {`
          .young-drag-list {
            list-style: none;
          }
          
          .young-drag-list-item {
            transition: transform .3s;
            cursor: move;
            border-radius: 4px;
            color: #333;
            height: 36px;
            line-height: 36px;
            text-align: center;
            display: flex;
            align-items: center;
          }
          
          .young-drag-list-item:hover {
            background: #eee;
          }
          
          .young-drag-list-item.active {
            color: #409eff !important;
          }
          
          .young-drag-list-item .label {
            text-align: left;
            cursor: pointer;
            flex: 1;
            padding: 0 12px 0 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /* 显示省略号 */
          }
          
          .young-drag-list-item .draggable {
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 100%;
          }
          `}
        </style>
        <TransitionGroup>
          {props.list.map((item, index) => (
            <div
              class={`young-drag-list-item ${item.check ? 'active' : ''}`}
              key={item.label}
              onDragstart={() => dragstart(index)}
              onDragenter={(e) => dragenter(e, index)}
              onDragover={(e) => dragover(e, index)}
              onDragend={dragend}
              draggable={draggable.value}
            >
              <div
                class='draggable'
                title='拖动可排序'
                onMouseover={() => (draggable.value = true)}
                onMouseout={() => (draggable.value = false)}
              >
                <svg
                  class='icon'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  p-id='6483'
                  width='16'
                  height='16'
                >
                  <path
                    d='M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z'
                    p-id='6484'
                  ></path>
                  <path
                    d='M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z'
                    p-id='6485'
                  ></path>
                  <path
                    d='M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z'
                    p-id='6486'
                  ></path>
                </svg>
              </div>

              <div
                class='label'
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeCheck(item);
                }}
                title={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.label}</span>
                <ElSwitch modelValue={item.check} />
              </div>
            </div>
          ))}
        </TransitionGroup>
      </div>
    );
  },
});
