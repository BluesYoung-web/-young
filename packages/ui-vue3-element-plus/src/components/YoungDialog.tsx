/*
 * @Author: zhangyang
 * @Date: 2023-01-05 18:03:54
 * @LastEditTime: 2023-07-31 10:07:24
 * @Description:
 */
import { useMediaQuery } from '@vueuse/core';
import { ElButton, ElDialog, ElMessageBox } from 'element-plus';
import { Teleport, computed, defineComponent, watch, ref } from 'vue';

export default defineComponent({
  props: {
    modelValue: Boolean,
    realTitle: String,
    width: {
      type: [String, Number],
      default: '50%'
    },
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
    /**
     * 对比 form 表单
     */
    diffForm: {
      type: Object,
      default: null,
    },
  },
  emits: ['sure', 'clear', 'update:modelValue'],
  setup(props, { emit, attrs, slots }) {
    const formHash_before = ref('');

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

    props.diffForm &&
      watch(
        () => showDialog.value,
        (v, o) => {
          if (v && !o) {
            formHash_before.value = JSON.stringify(props.diffForm);
          }
        },
      );

    props.diffForm &&
      watch(
        () => props.modelValue,
        (v, o) => {
          if (v && !o) {
            formHash_before.value = JSON.stringify(props.diffForm);
          }
        },
      );

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
      const formHash_after = JSON.stringify(props.diffForm);
      if (props.isMore || !props.showCancel) {
        emit('clear');
        emit('update:modelValue', false);
        return;
      }
      if (props.diffForm && formHash_before.value === formHash_after) {
        emit('clear');
        emit('update:modelValue', false);
        return;
      } else {
        ElMessageBox.confirm('数据未保存，关闭将丢失数据，确认关闭？', '提示')
          .then(() => {
            emit('update:modelValue', false);
            emit('clear');
          })
          .catch(() => null);
      }
    };
    
    const ltLg = useMediaQuery('(max-width: 1023.9px)');

    return () => (
      <Teleport to="body">
        <ElDialog
          {...attrs}
          modelValue={props.modelValue || showDialog.value}
          title={props.realTitle || title.value}
          width={ltLg.value ? '96%' : props.width}
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
