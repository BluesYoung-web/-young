/*
 * @Author: zhangyang
 * @Date: 2023-01-05 17:51:59
 * @LastEditTime: 2023-01-05 18:02:01
 * @Description: 
 */
import { ElPagination } from 'element-plus';
import { defineComponent, type PropType } from 'vue';

const RequiredNumber = {
  type: Number,
  required: true
} as const;

export default defineComponent({
  props: {
    total: RequiredNumber,
    page: RequiredNumber,
    limit: RequiredNumber,
    pageSizes: {
      type: Object as PropType<number[]>,
      default: () => ([10, 20, 30, 50])
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  emits: ['page-change', 'update:page', 'update:limit'],
  setup(props, { emit, attrs }) {
    const sizeChange = (val: number) => {
      emit('update:page', 1);
      emit('update:limit', val);
      emit('page-change');
    };
    const pageChange = (val: number) => {
      emit('update:page', val);
      emit('page-change');
    };

    return () => (
      <div style="background: white; padding-top: 20px;">
        <ElPagination
          {...attrs}
          background={props.background}
          currentPage={props.page}
          pageSize={props.limit}
          layout={props.layout}
          pageSizes={props.pageSizes}
          total={props.total}
          onSize-change={(v) => sizeChange(v)}
          onCurrent-change={(v) => pageChange(v)}
        />
      </div>
    );
  }
});