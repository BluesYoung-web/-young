/*
 * @Author: zhangyang
 * @Date: 2023-01-05 17:08:17
 * @LastEditTime: 2023-03-08 13:59:31
 * @Description:
 */
import { nextTick, onActivated, ref, watchEffect, defineComponent } from 'vue';
import type { PropType, VNode } from 'vue';
import { deepClone } from '@bluesyoung/utils';
import { ElTable, ElTableColumn, ElTooltip } from 'element-plus';
import { useAutoLoad } from '..';

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
  },
  emits: ['sort-change', 'selection-change'],
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
          const { elArr, load } = useAutoLoad(tableData_1, ref(t1), step);

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
      <ElTable
        {...attrs}
        ref={tableRef}
        data={tableData_1.value}
        style={{ width: '100%' }}
        height={props.tableHeight}
        onSort-Change={(e) => emit('sort-change', e)}
        onSelection-Change={(e) => emit('selection-change', e)}
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
                        ？
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
