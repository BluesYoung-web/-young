/*
 * @Author: zhangyang
 * @Date: 2023-08-06 10:09:03
 * @LastEditTime: 2023-08-06 15:14:32
 * @Description:
 */
import { defineComponent, computed, type PropType } from 'vue';
import { ElUpload, ElButton, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { useImagePreview } from '..';
import { randomId } from '@bluesyoung/utils';

export type YoungUploadFn = (file: File) => string;

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    type: {
      type: String as PropType<'image' | 'file'>,
      default: 'image',
    },
    accept: {
      type: String,
      default: '',
    },
    uploadFn: {
      type: Function as PropType<YoungUploadFn>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const files = computed<UploadUserFile[]>(() =>
      props.modelValue.map((url, index) => ({
        uid: index,
        name: url,
        status: 'success',
        url,
      })),
    );

    const exceed = () => ElMessage.error('超出数量限制！！！');
    const del = (_: any, all: UploadUserFile[]) => {
      const arr = all.map((item) => item.url!);
      emit('update:modelValue', arr);
      emit('change', arr);
    };

    const upload = async (file: UploadUserFile) => {
      if (file) {
        const url = await props.uploadFn(file.raw as unknown as File);
        const arr = [
          ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
          url,
        ];
        emit('update:modelValue', arr);
        emit('change', arr);
      }
    };

    const preView = (url: string) => {
      const index = props.modelValue.indexOf(url);
      useImagePreview({
        srcList: props.modelValue,
        index: index === -1 ? 0 : index,
      });
    };

    const limitStyle = computed(() =>
      props.modelValue.length < props.limit ? 'inline-flex' : 'none',
    );

    const id = 'young-upload-' + randomId();

    return () => (
      <div id={id}>
        <style>
          {`
          #${id} .el-upload--picture-card {
            display: ${limitStyle.value};
          }
          `}
        </style>
        <ElUpload
          accept={props.accept ? props.accept : props.type === 'image' ? 'image/*' : '*'}
          limit={props.limit}
          listType={props.type === 'image' ? 'picture-card' : undefined}
          multiple={props.limit > 1}
          fileList={files.value}
          autoUpload={false}
          onExceed={exceed}
          onChange={upload}
          onRemove={del}
          onPreview={({ url }) => props.type === 'image' && preView(url!)}
          style={{ maxWidth: '500px' }}
        >
          <div>
            {props.modelValue.length < props.limit && props.type === 'image' ? (
              <div
                style={{
                  fontSize: '1.875rem',
                  lineHeight: '2.25rem',
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z'
                  ></path>
                </svg>
              </div>
            ) : props.modelValue.length < props.limit ? (
              <div style={{ marginRight: '0.5rem' }}>
                <ElButton type='primary'>上传文件</ElButton>
              </div>
            ) : (
              <div style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>已达数量上限</div>
            )}
          </div>
          <div>
            ({props.modelValue.length} / {props.limit})
          </div>
        </ElUpload>
      </div>
    );
  },
});
