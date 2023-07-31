/*
 * @Author: zhangyang
 * @Date: 2023-05-30 09:26:58
 * @LastEditTime: 2023-07-31 10:43:09
 * @Description:
 */
import { defineComponent, onMounted } from 'vue';
import type { PropType } from 'vue';
import type { TableHeadItem } from '..';
import { ElSwitch } from 'element-plus';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import { deepClone } from '@bluesyoung/utils';

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
    onMounted(() => {
      const el = document.querySelector('.young-drap-list') as HTMLDivElement;

      new Sortable(el, {
        animation: 150,
        onEnd: ({ oldIndex, newIndex }: SortableEvent) => {
          // 因为内联了一个 style 标签，所以索引是从 1 开始的
          oldIndex--;
          newIndex--;

          console.log(oldIndex, newIndex);
          if (oldIndex === newIndex) {
            return;
          }
          const data = props.list;
          const row = deepClone(data[oldIndex]);
          data.splice(oldIndex, 1);
          data.splice(newIndex, 0, row);
          emit('drag-end', data);
        },
      });
    });

    function handleChangeCheck(item: TableHeadItemPro) {
      emit('change', item, !item.check);
    }

    return () => (
      <div class='young-drap-list'>
        <style>
          {`
          .young-drag-list {
            list-style: none;
          }
          
          .young-drag-list-item {
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
        {props.list.map((item, index) => (
          <div class={`young-drag-list-item ${item.check ? 'active' : ''}`} key={item.label}>
            <div class='draggable' title='拖动可排序'>
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
              draggable={false}
            >
              <span>{item.label}</span>
              <ElSwitch modelValue={item.check} />
            </div>
          </div>
        ))}
      </div>
    );
  },
});
