/*
 * @Author: zhangyang
 * @Date: 2023-05-30 09:24:26
 * @LastEditTime: 2023-05-31 14:18:54
 * @Description:
 */
import { computed, nextTick, onActivated, ref, watchEffect, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElMessage, ElTable, ElTableColumn, ElButton, ElMessageBox } from 'element-plus';
import type { TableHeadItemPro, TableDataItem } from '..';
import CustomHead from './sub/CustomHead';
import { deepClone, randomId } from '@bluesyoung/utils';

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
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
      type: Object as PropType<string[]>,
      required: false,
    },
    tableHeight: {
      type: Number,
      default: 600,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
      type: Boolean,
      default: true,
    },
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit, attrs, expose }) {
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
    const tableHeadCheck_1 = ref<string[]>([]);
    const settingHeight = ref(0);
    watchEffect(() => {
      tableData_1.value = props.tableData;
      nextTick(() => {
        initHead();
        getHeaderHeight();
      });
    });

    const initHead = () => {
      if (props.history) {
        try {
          const historyHead = JSON.parse(localStorage.getItem('table_pro_tableHead') || '{}');
          tableHead_1.value = historyHead.tableHead;
          tableHeadCheck_1.value = [...historyHead.tableHeadCheck];
        } catch (error) {
          initDefaultData();
        }
      } else {
        initDefaultData();
      }
    };
    const initDefaultData = () => {
      tableHead_1.value = deepClone(props.tableHead);
      tableHeadCheck_1.value = props.tableHeadCheck?.length
        ? deepClone(props.tableHeadCheck)
        : props.tableHead.map((t) => t.prop as string);
    };
    /**
     * 所有表头初始化 设置check属性 true：被勾选 false:没被勾选
     */
    const initData = computed(() => {
      return tableHead_1.value.map((t) => {
        t.check = tableHeadCheck_1.value.includes(t.prop as string);
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
    const handleHeaderDragend = (newWidth, oldWidth, column, event) => {
      const changeHead = tableHead_1.value.find((t) => t.prop === column.property);
      changeHead.width = newWidth;
      nextTick(() => {
        getHeaderHeight();
      });
    };

    const handleChange = (item: TableHeadItemPro, check: boolean) => {
      const index = tableHeadCheck_1.value.findIndex((e) => e === item.prop);
      if (!check && index != -1) {
        tableHeadCheck_1.value.splice(index, 1);
      } else {
        tableHeadCheck_1.value.push(item.prop as string);
      }
    };

    const handleDragend = (list: TableHeadItemPro[]) => {
      tableHead_1.value = list;
    };

    const saveTableHead = () => {
      localStorage.setItem(
        'table_pro_tableHead',
        JSON.stringify({
          tableHead: initData.value,
          tableHeadCheck: tableHeadCheck_1.value,
        }),
      );
      ElMessage.success('保存成功');
    };
    const resetTableHead = () => {
      ElMessageBox.confirm('确定重置表头吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        localStorage.removeItem('table_pro_tableHead');
        ElMessage.success('重置成功');
        nextTick(() => {
          initHead();
        });
      });
    };

    const randomKey = randomId();

    expose({
      saveTableHead,
      resetTableHead,
    });
    return () => (
      <>
        <style>
          {`
          .nowarp {
            word-break: normal;
          }
          `}
        </style>
        <div>
          {props.saveTableHead && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
              <ElButton type='success' onClick={saveTableHead}>
                保存表头
              </ElButton>
              <ElButton type='primary' onClick={resetTableHead}>
                重置表头
              </ElButton>
            </div>
          )}
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
        </div>
      </>
    );
  },
});
