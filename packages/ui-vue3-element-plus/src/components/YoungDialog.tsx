/*
 * @Author: zhangyang
 * @Date: 2023-01-05 18:03:54
 * @LastEditTime: 2023-01-05 18:09:45
 * @Description:
 */
import { ElButton, ElDialog, ElMessageBox } from 'element-plus';
import { Teleport, computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: Boolean,
    realTitle: String,
    sureText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showSure: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    isAdd: Boolean,
    isEdit: Boolean,
    isMore: Boolean,
    sureFn: Function,
  },
  emits: ['sure', 'clear', 'update:modelValue'],
  setup(props, { emit, attrs, slots }) {
    const title = computed(() => {
      let str = '新建';
      if (props.isEdit) {
        str = '编辑';
      }
      if (props.isMore) {
        str = '详情';
      }
      return str;
    });

    const showDialog = computed({
      get: () => props.isAdd || props.isMore || props.isEdit,
      set: (v) => null,
    });

    const sure = async () => {
      if (props.sureFn) {
        const res = await props.sureFn();
        if (res === false) {
          return;
        }
      }
      if (props.isMore) {
        emit('clear');
        return;
      }
      emit('update:modelValue', false);
      emit('sure');
    };

    const beforeClose = () => {
      if (props.isMore || !props.showCancel) {
        emit('clear');
        emit('update:modelValue', false);
        return;
      }
      ElMessageBox.confirm('数据未保存，关闭将丢失数据，确认关闭？', '提示')
        .then(() => {
          emit('update:modelValue', false);
          emit('clear');
        })
        .catch(() => null);
    };

    return () => (
      <Teleport to="body">
        <ElDialog
          {...attrs}
          modelValue={props.modelValue || showDialog.value}
          title={props.realTitle || title.value}
          closeOnClickModal={true}
          closeOnPressEscape={false}
          beforeClose={beforeClose}
          v-slots={{
            default: () => slots.body?.(),
            footer: () => {
              return (
                <>
                  {slots.button?.()}
                  {props.showCancel && (
                    <ElButton onClick={() => beforeClose()}>{props.cancelText}</ElButton>
                  )}
                  {slots.step1?.()}
                  {slots.step2?.()}
                  {props.showSure && (
                    <ElButton type='primary' onClick={() => sure()}>
                      {props.sureText}
                    </ElButton>
                  )}
                </>
              );
            },
          }}
        />
      </Teleport>
    );
  },
});
