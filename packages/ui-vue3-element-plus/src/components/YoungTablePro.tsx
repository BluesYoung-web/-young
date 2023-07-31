/*
 * @Author: zhangyang
 * @Date: 2023-05-30 09:24:26
 * @LastEditTime: 2023-07-31 14:27:30
 * @Description:
 */
import { computed, nextTick, onActivated, ref, watchEffect, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElMessage, ElTable, ElTableColumn, ElMessageBox, ElTooltip } from 'element-plus';
import type { TableHeadItemPro, TableDataItem } from '..';
import CustomHead from './sub/CustomHead';
import { deepClone, randomId } from '@bluesyoung/utils';
import { useLocalStorage } from '@vueuse/core';

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
      type: [Number, String],
      default: '100%',
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
    /**
     * 存储历史id
     */
    historyId: {
      type: String,
      default: location.href.replace(location.origin, ''),
    },
  },
  setup(props, { attrs, expose, slots }) {
    /**
     * 引用表格元素
     */
    const tableRef = ref<InstanceType<typeof ElTable>>();
    // 修复表格切换时，显示出现错位的 bug
    onActivated(() => {
      nextTick(() => {
        tableRef.value!.doLayout();
      });
    });

    const tableData_1 = ref<TableDataItem[]>([]);
    const tableHead_1 = ref<TableHeadItemPro[]>([]);
    const tableHeadCheck_1 = ref<string[]>([]);
    watchEffect(() => {
      tableData_1.value = props.tableData;
      nextTick(() => {
        initHead();
      });
    });

    const historyHead = useLocalStorage<{
      tableHead?: TableHeadItemPro[];
      tableHeadCheck?: string[];
    }>(`table_pro_tableHead_${props.historyId}`, {});

    const initHead = () => {
      if (props.history) {
        tableHead_1.value = historyHead.value?.tableHead ?? [];
        tableHeadCheck_1.value = historyHead.value?.tableHeadCheck ?? [];

        if (tableHeadCheck_1.value.length === 0) {
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
      historyHead.value = {
        tableHead: initData.value,
        tableHeadCheck: tableHeadCheck_1.value,
      };
      ElMessage.success('保存成功');
    };
    const resetTableHead = () => {
      ElMessageBox.confirm('确定重置表头吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        historyHead.value = {};
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
            <CustomHead
              tableHead={initData.value}
              onDrag-end={handleDragend}
              onChange={handleChange}
              onSave={saveTableHead}
              onReset={resetTableHead}
            />
          )}
          <div style='position: relative;'>
            <ElTable
              ref={tableRef}
              header-cell-class-name='nowarp'
              data={tableData_1.value}
              style={{ width: '100%' }}
              height={props.tableHeight}
              border
              {...attrs}
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
                    header: (scope: any) => {
                      if (tableHead_1.value[index].tool_content) {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <span class='nowarp' title={item.label}>
                              {scope.column.label}
                            </span>
                            <ElTooltip
                              placement='bottom'
                              v-slots={{ content: () => tableHead_1.value[index].tool_content }}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='1.2em'
                                height='1.2em'
                                viewBox='0 0 256 256'
                              >
                                <path
                                  fill='currentColor'
                                  d='M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z'
                                ></path>
                              </svg>
                            </ElTooltip>
                          </div>
                        );
                      } else {
                        return (
                          <span class='nowarp' title={item.label}>
                            {scope.column.label}
                          </span>
                        );
                      }
                    },
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

              {slots.switch?.()}
              {slots.operate?.()}
            </ElTable>
          </div>
        </div>
      </>
    );
  },
});
