/*
 * @Author: zhangyang
 * @Date: 2023-08-06 10:09:03
 * @LastEditTime: 2023-08-13 15:07:25
 * @Description:
 */
import { defineComponent, computed, type PropType, ref, nextTick } from 'vue';
import { ElUpload, ElButton, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { YoungDialog, useImagePreview } from '..';
import { randomId } from '@bluesyoung/utils';
import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css';
import { useMediaQuery } from '@vueuse/core';

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
    cropper: {
      type: Boolean,
      default: false,
    },
    aspt: {
      type: Object as PropType<[number, number]>,
      default: () => [1, 1],
    },
    cropperAttrs: {
      type: Object,
      default: () => ({}),
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
        if (props.type === 'image' && props.cropper) {
          showClipPopup.value = true;
          await nextTick();
          coverFile.value = URL.createObjectURL(file.raw as Blob);
          cropper.value.startCrop();
        } else {
          const url = await props.uploadFn(file.raw as unknown as File);
          const arr = [
            ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
            url,
          ];
          emit('update:modelValue', arr);
          emit('change', arr);
        }
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

    const cropper = ref();
    const coverFile = ref<string>();

    const showClipPopup = ref(false);

    const sureClip = () => {
      cropper.value.getCropBlob(async (blob: Blob) => {
        const url = await props.uploadFn(blob as File);
        const arr = [
          ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
          url,
        ];
        emit('update:modelValue', arr);
        emit('change', arr);
        coverFile.value = '';
      });
      showClipPopup.value = false;
    };

    const cancelClip = () => {
      coverFile.value = '';
      showClipPopup.value = false;
      const arr = [
        ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
      ];
      emit('update:modelValue', arr);
      emit('change', arr);
    };

    const ltLg = useMediaQuery('(max-width: 1023.9px)');

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
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
                  ></path>
                </svg>
              </div>
            ) : props.modelValue.length < props.limit ? (
              <div style={{ marginRight: '0.5rem' }}>
                <ElButton type="primary">上传文件</ElButton>
              </div>
            ) : (
              <div style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>已达数量上限</div>
            )}
          </div>
          <div>
            ({props.modelValue.length} / {props.limit})
          </div>
        </ElUpload>

        <YoungDialog
          modelValue={showClipPopup.value}
          onUpdate:modelValue={(v) => (showClipPopup.value = v)}
          // @ts-ignore
          top="0"
          width={'96%'}
          realTitle="图片裁剪"
          showCancel={false}
          showSure={false}
        >
          {{
            body: () => (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: ltLg.value ? '90vw' : '800px',
                    height: ltLg.value ? '90vh' : '72vh',
                  }}
                >
                  <VueCropper
                    ref={cropper}
                    autoCrop
                    centerBox
                    fixedNumber={props.aspt}
                    img={coverFile.value}
                    outputType="webp"
                    fixed
                    {...props.cropperAttrs}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '80px',
                    width: '96%',
                    padding: '0 20px',
                  }}
                >
                  <ElButton style={{ width: '48%' }} onClick={cancelClip}>
                    取消
                  </ElButton>
                  <ElButton style={{ width: '48%' }} type="primary" onClick={sureClip}>
                    裁剪
                  </ElButton>
                </div>
              </div>
            ),
          }}
        </YoungDialog>
      </div>
    );
  },
});
