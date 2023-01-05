/*
 * @Author: zhangyang
 * @Date: 2023-01-05 17:08:17
 * @LastEditTime: 2023-01-05 17:44:40
 * @Description: 
 */
import { nextTick, onActivated, ref, watchEffect, defineComponent } from 'vue';
import type { PropType, VNode } from 'vue';
import { deepClone } from '@bluesyoung/utils';
import { ElTable, ElTableColumn, ElTooltip } from 'element-plus';
import { useAutoLoad } from '..';

export type TableHeadAligin = 'left' | 'center' | 'right' | undefined;

export interface TableHeadItem<T extends any = any> {
  prop: keyof T;
  label: string;
  width?: string;
  sortable?: boolean;
  fixed?: boolean;
  aligin?: TableHeadAligin;
  tool_content?: string;
  only_export?: boolean;
  only_display?: boolean;
  render?: (row: T) => VNode;
  [x: string]: any;
};

export type TableDataItem<T extends any = any> = {
  [key in keyof T]: T[key];
} & Record<string, any>;


export default defineComponent({
  props: {
    tableData: {
      type: Object as PropType<TableDataItem[]>,
      required: true
    },
    tableHead: {
      type: Object as PropType<TableDataItem[]>,
      required: true
    },
    tableHeight: {
      type: Number,
      default: 600
    }
  },
  emits: ['sort-change'],
  setup(props, { emit, attrs, slots }) {
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

    watchEffect(() => {
      const t1 = props.tableData;
      const t2 = props.tableHead;
      const len = t1.length;

      nextTick(() => {
        // @ts-ignore
        tableHead_1.value = t2.filter((item) => !item.only_export);

        const step = 50;
        if (len <= step) {
          tableData_1.value = deepClone(t1);
        } else {
          const {
            elArr,
            load
          } = useAutoLoad(tableData_1, ref(t1), step);

          let n = 0;
          tableData_1.value = t1.slice(n, step);

          nextTick(() => {
            elArr.value = tableRef.value.$el.querySelector('tbody').children;
            load();
          });
        }
      });
    });

    return () => (
      // @ts-ignore
      <ElTable {...attrs} ref={tableRef} data={tableData_1.value} style="width: 100%" height={props.tableHeight} onSortChange={(e) => emit('sort-change', e)}>
        {
          tableHead_1.value.map((head, index) =>
            <ElTableColumn
              key={index}
              prop={head.prop as string}
              label={head.label}
              width={head.width || ''}
              sortable={head.sortable || false}
              fixed={head.fixed || false}
              align={head.aligin || 'left'}
              v-slots={{
                header: (scope) => {
                  if (tableHead_1.value[scope.$index].tool_content) {
                    return (
                      <>
                        <span>{scope.column.label}</span>
                        <ElTooltip placement='bottom' v-slots={{ content: () => tableHead_1.value[scope.$index].tool_content }}
                        />
                      </>);
                  } else {
                    return <span>{scope.column.label}</span>;
                  }
                },
                default: (scope) => {
                  if (head.render) {
                    return <component is={head.render(scope.row)} />
                  } else {
                    return <span>{scope.row[head.prop]}</span>
                  }
                }
              }}
            />
          )
        }
        {
          slots.switch?.()
        }
        {
          slots.operate?.()
        }
      </ElTable>
    )
  }
});