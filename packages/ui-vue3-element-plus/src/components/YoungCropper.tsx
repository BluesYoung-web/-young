/*
 * @Author: zhangyang
 * @Date: 2023-08-06 15:30:40
 * @LastEditTime: 2023-08-08 16:36:45
 * @Description:
 */
import styleStr from '../style/cropper.css?raw';
import { defineComponent, computed } from 'vue';
import { ElUpload, ElButton, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { useImagePreview } from '..';
import { randomId } from '@bluesyoung/utils';
import { CropperPorps } from './hooks/useCropper';
import type { PropType, ExtractPropTypes } from 'vue';

export default defineComponent({
  // @ts-ignore
  props: CropperPorps,
  setup(props) {
    return () => (
      <>
        <style>{styleStr}</style>
        <div>{props}</div>
      </>
    );
  },
});
