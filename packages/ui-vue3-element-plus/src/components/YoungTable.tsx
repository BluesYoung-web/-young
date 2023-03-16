/*
 * @Author: zhangyang
 * @Date: 2023-01-05 17:08:17
 * @LastEditTime: 2023-03-16 11:35:42
 * @Description:
 */
import { nextTick, onActivated, ref, watchEffect, defineComponent, onMounted } from 'vue';
import type { PropType, VNode } from 'vue';
import { deepClone } from '@bluesyoung/utils';
import { ElTable, ElTableColumn, ElTooltip } from 'element-plus';
import { useAutoLoad } from '..';
import type { SortableEvent } from 'sortablejs';

export type TableHeadAligin = 'left' | 'center' | 'right' | undefined;

export interface TableHeadItem<T extends any = any> {
  /**
   * 参数名
   */
  prop: keyof T;
  /**
   * 展示标题
   */
  label: string;
  /**
   * 列宽
   */
  width?: string;
  /**
   * 是否可排序
   */
  sortable?: boolean;
  /**
   * 是否固定表头
   */
  fixed?: boolean | 'left' | 'right';
  /**
   * 表格位置
   */
  aligin?: TableHeadAligin;
  /**
   * 表头提示
   */
  tool_content?: string;
  /**
   * 仅导出，不展示
   */
  only_export?: boolean;
  /**
   * 仅展示，不导出
   */
  only_display?: boolean;
  /**
   * 渲染函数
   * @param row 当前行的数据
   */
  render?: (row: T, index: number) => VNode;
  /**
   * 当内容过长时，hover 展示全部
   */
  show_overflow_tooltip?: boolean;
  [x: string]: any;
}

export type TableDataItem<T extends any = any> = {
  [key in keyof T]: T[key];
} & Record<string, any>;

export default defineComponent({
  props: {
    tableData: {
      type: Object as PropType<TableDataItem[]>,
      required: true,
    },
    tableHead: {
      type: Object as PropType<TableDataItem[]>,
      required: true,
    },
    tableHeight: {
      type: Number,
      default: 600,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    rowDraggable: {
      type: Boolean,
      default: false,
    },
    /**
     * 列排序有 bug，暂不放出
     */
    // colDraggable: {
    //   type: Boolean,
    //   default: false
    // }
  },
  emits: [
    'row-drag-change',
    //  'col-drag-change'
  ],
  setup(props, { emit, attrs, slots }) {
    onMounted(async () => {
      if (
        props.rowDraggable
        // || props.colDraggable
      ) {
        const { default: Sortable } = await import('sortablejs');
        if (props.rowDraggable) {
          const el = (tableRef.value.$el as HTMLDivElement).querySelector('tbody');
          el.style.cursor = 'move';
          new Sortable(el, {
            animation: 150,
            onEnd: ({ oldIndex, newIndex }: SortableEvent) => {
              if (oldIndex === newIndex) {
                return;
              }
              const data = tableData_drag.value;
              const row = deepClone(data[oldIndex]);
              data.splice(oldIndex, 1);
              data.splice(newIndex, 0, row);
              emit('row-drag-change', tableData_drag.value);
            },
          });
        }

        // if (props.colDraggable) {
        //   const el = (tableRef.value.$el as HTMLDivElement).querySelector('thead tr') as HTMLTableSectionElement;
        //   el.style.cursor = 'move';
        //   new Sortable(el, {
        //     animation: 150,
        //     onEnd: ({ oldIndex, newIndex }: SortableEvent) => {
        //       if (oldIndex === newIndex) {
        //         return;
        //       }
        //       const data = tableHead_drag.value;
        //       const col = deepClone(data[oldIndex]);
        //       data.splice(oldIndex, 1);
        //       data.splice(newIndex, 0, col);
        //       emit('col-drag-change', data);
        //     },
        //   });
        // }
      }
    });

    /**
     * 引用表格元素
     */
    const tableRef = ref<any>(null);
    // 修复表格切换时，显示出现错位的 bug
    onActivated(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
    });

    const tableData_1 = ref<TableDataItem[]>([]);
    const tableHead_1 = ref<TableHeadItem[]>([]);

    const tableData_drag = ref<TableDataItem[]>([]);
    // const tableHead_drag = ref<TableHeadItem[]>([]);

    watchEffect(() => {
      const t1 = props.tableData;
      const t2 = props.tableHead;
      const len = t1.length;

      nextTick(() => {
        // @ts-ignore
        tableHead_1.value = t2.filter((item) => !item.only_export);
        // @ts-ignore
        // tableHead_drag.value = t2.filter((item) => !item.only_export);

        const step = 50;
        if (len <= step) {
          tableData_1.value = deepClone(t1);
          tableData_drag.value = deepClone(t1);
        } else {
          const { elArr, load } = useAutoLoad(tableData_1, ref(t1), step);
          const { elArr: elArr_drag, load: load_drag } = useAutoLoad(tableData_drag, ref(t1), step);

          let n = 0;
          tableData_1.value = t1.slice(n, step);
          tableData_drag.value = t1.slice(n, step);

          nextTick(() => {
            elArr.value = tableRef.value.$el.querySelector('tbody').children;
            load();
          });

          nextTick(() => {
            elArr_drag.value = tableRef.value.$el.querySelector('tbody').children;
            load_drag();
          });
        }
      });
    });

    return () => (
      <ElTable
        {...attrs}
        ref={tableRef}
        data={tableData_1.value}
        style={{ width: '100%' }}
        height={props.tableHeight}
      >
        {props.selectable && <ElTableColumn type="selection" width="55" />}
        {tableHead_1.value.map((head, index) => (
          <ElTableColumn
            key={index}
            prop={head.prop as string}
            label={head.label}
            width={head.width || ''}
            sortable={head.sortable || false}
            fixed={head.fixed || false}
            align={head.aligin || 'left'}
            showOverflowTooltip={head.show_overflow_tooltip ?? true}
            v-slots={{
              header: (scope) => {
                if (tableHead_1.value[index].tool_content) {
                  return (
                    <>
                      <span>{scope.column.label}</span>
                      <ElTooltip
                        placement='bottom'
                        v-slots={{ content: () => tableHead_1.value[index].tool_content }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
                          ></path>
                        </svg>
                      </ElTooltip>
                    </>
                  );
                } else {
                  return <span>{scope.column.label}</span>;
                }
              },
              default: (scope) => {
                if (head.render) {
                  return head.render(scope.row, scope.$index);
                } else {
                  return <span>{scope.row[head.prop]}</span>;
                }
              },
            }}
          />
        ))}
        {slots.switch?.()}
        {slots.operate?.()}
      </ElTable>
    );
  },
});
