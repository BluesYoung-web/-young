/*
 * @Author: zhangyang
 * @Date: 2023-05-30 09:24:26
 * @LastEditTime: 2023-05-30 12:11:32
 * @Description:
 */
import { computed, nextTick, onActivated, ref, watchEffect, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import type { TableHeadItemPro, TableDataItem } from '..';
import CustomHead from './sub/CustomHead';
import { randomId } from '@bluesyoung/utils';

export default defineComponent({
  props: {
    tableData: {
      type: Object as PropType<TableDataItem[]>,
      required: true,
    },
    tableHead: {
      type: Object as PropType<TableHeadItemPro[]>,
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
  setup(props, { emit, attrs }) {
    /**
     * 引用表格元素
     */
    const tableRef = ref<InstanceType<typeof ElTable>>();
    // 修复表格切换时，显示出现错位的 bug
    onActivated(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
    });

    const tableData_1 = ref<TableDataItem[]>([]);
    const tableHead_1 = ref<TableHeadItemPro[]>([]);
    const tableHeadCheck = ref<string[]>([]);
    const settingHeight = ref(0);
    watchEffect(() => {
      tableData_1.value = props.tableData;
      tableHead_1.value = props.tableHead;
      tableHeadCheck.value = props.tableHead.map((item) => item.prop.toString());
      nextTick(() => {
        handleHeaderDragend();
      });
    });

    /**
     * 所有表头初始化 设置check属性 true：被勾选 false:没被勾选
     */
    const initData = computed(() => {
      return tableHead_1.value.map((t) => {
        t.check = tableHeadCheck.value.includes(t.prop as string);
        return t;
      });
    });
    /**
     * 被勾选的表头
     */
    const filterHeader = computed(() => {
      return initData.value.filter((d) => d.check);
    });

    /**
     * 获取表头高度 给设置按钮设置高度
     */
    const getHeaderHeight = () => {
      const tr = document.querySelector('.el-table__header');
      // @ts-ignore
      if (tr.offsetHeight === 0) {
        setTimeout(() => {
          getHeaderHeight();
        }, 100);
      } else {
        // @ts-ignore
        settingHeight.value = tr.offsetHeight - 1;
      }
    };

    /**
     * 拖动表头后重新获取表头高度
     */
    const handleHeaderDragend = () => {
      nextTick(() => {
        getHeaderHeight();
      });
    };

    const handleChange = (item: TableHeadItemPro, check: boolean) => {
      const index = tableHeadCheck.value.findIndex((e) => e === item.prop);
      if (!check && index != -1) {
        tableHeadCheck.value.splice(index, 1);
      } else {
        tableHeadCheck.value.push(item.prop as string);
      }
    };

    const handleDragend = (list: TableHeadItemPro[]) => {
      tableHead_1.value = list;
    };

    const randomKey = randomId();

    return () => (
      <>
        <style>
          {`
          .nowarp {
            word-break: normal;
          }
          `}
        </style>
        <div style='position: relative;'>
          <ElTable
            {...attrs}
            ref={tableRef}
            header-cell-class-name='nowarp'
            data={tableData_1.value}
            style={{ width: '100%' }}
            height={props.tableHeight}
            border
            onHeader-dragend={handleHeaderDragend}
          >
            {props.selectable && <ElTableColumn type='selection' width='55' />}
            {filterHeader.value.map((item, index) => (
              <ElTableColumn
                key={item.prop.toString() + index + randomKey}
                prop={item.prop as string}
                label={item.label}
                width={item.width || ''}
                sortable={item.sortable || false}
                fixed={item.fixed || false}
                align={item.aligin || 'left'}
                showOverflowTooltip={item.show_overflow_tooltip ?? true}
              >
                {{
                  header: () => (
                    <span class='nowarp' title={item.label}>
                      {item.label}
                    </span>
                  ),
                  default: ({ row, $index }: { row: TableHeadItemPro; $index: number }) => {
                    if (item.render) {
                      return item.render(row, $index);
                    } else {
                      return <span>{row[item.prop as string]}</span>;
                    }
                  },
                }}
              </ElTableColumn>
            ))}
          </ElTable>
          <CustomHead
            height={`${settingHeight.value}px`}
            tableHead={initData.value}
            onDrag-end={handleDragend}
            onChange={handleChange}
          />
        </div>
      </>
    );
  },
});
