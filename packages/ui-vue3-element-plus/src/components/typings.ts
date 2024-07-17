import type { VNode } from 'vue';

export type SelectOptionItem<T extends any = any> = {
  label: string;
  value: T;
  disabled?: boolean;
  children?: SelectOptionItem<T>[];
};

export type YoungImageViewerConf = {
  /**
   * 图片目录
   */
  srcList: string[];
  /**
   * 当前为第几张
   */
  index?: number;
};

export type TableHeadAligin = 'left' | 'center' | 'right' | undefined;

export type TableHeadItem<T extends any = any> = {
  /**
   * 参数名
   */
  prop: keyof T | 'op';
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
   * !!! 后端排序需要传 'custom'
   */
  sortable?: boolean | 'custom';
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

export type YoungSearchFormType = 'input' | 'number' | 'select' | 'datetimerange' | 'custom';

export type YoungSearchFormItem = {
  /**
   * 表单元素的类型
   */
  type: YoungSearchFormType;
  /**
   * 是否拥有前缀提示
   */
  tip?: string;
  /**
   * 下拉专属选项
   */
  options?: SelectOptionItem[];
  /**
   * 自定义搜索项的渲染函数
   */
  render?: () => JSX.Element;
  /**
   * 值变更后的副作用函数
   * @param value 值
   */
  effect?: (value: any) => void;
  /**
   * 透传给元素的其他属性
   */
  attrs?: {
    placeholder?: string;
    title?: string;
    class?: string;
    style?: string;
    clearable?: boolean;
    disabled?: boolean;
    [props: string]: any;
  };
};

export type YoungSearchScheme<T extends any = any> = {
  [prop in keyof T]?: YoungSearchFormItem;
};

export type TableHeadItemPro = TableHeadItem & {
  check?: boolean;
};

export interface Restrictions {
  maxFileSize?: number | null
  minFileSize?: number | null
  maxTotalFileSize?: number | null
  maxNumberOfFiles?: number | null
  minNumberOfFiles?: number | null
  allowedFileTypes?: string[] | null
  requiredMetaFields?: string[]
}

export type InternalMetadata = { name: string; type?: string }
export interface FileProgress {
  uploadStarted: number | null
  uploadComplete: boolean
  percentage: number
  bytesUploaded: number
  bytesTotal: number
}

export type UppyFile<TMeta extends any = any> = {
  data: Blob | File
  extension: string
  id: string
  isPaused?: boolean
  isRemote: boolean
  meta: InternalMetadata & TMeta
  name: string
  preview?: string
  progress?: FileProgress
  remote?: {
    host: string
    url: string
    body?: Record<string, unknown>
  }
  size: number
  source?: string
  type?: string
  response?: {
    body: any
    status: number
    uploadURL: string | undefined
  }
}

export interface UppyOptions<
  TMeta extends any = Record<string, unknown>,
> {
  id?: string
  autoProceed?: boolean
  allowMultipleUploadBatches?: boolean
  logger?: any
  debug?: boolean
  restrictions?: Restrictions
  meta?: TMeta
  onBeforeFileAdded?: (
    currentFile: UppyFile<TMeta>,
    files: { [key: string]: UppyFile<TMeta> },
  ) => UppyFile<TMeta> | boolean | undefined
  onBeforeUpload?: (files: {
    [key: string]: UppyFile<TMeta>
  }) => { [key: string]: UppyFile<TMeta> } | boolean
  locale?: any
  store?: any
  infoTimeout?: number
}

export interface PluginOptions {
  id?: string
}

export interface UIPluginOptions extends PluginOptions {
  replaceTargetContent?: boolean
}

export interface DefaultPluginOptions extends PluginOptions {
  [prop: string]: any
}

export interface ThumbnailOptions extends UIPluginOptions {
  thumbnailWidth?: number
  thumbnailHeight?: number
  thumbnailType?: string
  waitForThumbnailsBeforeUpload?: boolean
  lazy?: boolean
}

type Options = UIPluginOptions & ThumbnailOptions

export interface DashboardOptions extends Options {
  animateOpenClose?: boolean
  browserBackButtonClose?: boolean
  closeAfterFinish?: boolean
  singleFileFullScreen?: boolean
  closeModalOnClickOutside?: boolean
  disableInformer?: boolean
  disablePageScrollWhenModalOpen?: boolean
  disableStatusBar?: boolean
  disableThumbnailGenerator?: boolean
  height?: string | number
  hideCancelButton?: boolean
  hidePauseResumeButton?: boolean
  hideProgressAfterFinish?: boolean
  hideRetryButton?: boolean
  hideUploadButton?: boolean
  inline?: boolean
  locale?: any
  metaFields?: MetaField[] | ((file: UppyFile) => MetaField[])
  note?: string | null
  plugins?: string[]
  fileManagerSelectionType?: 'files' | 'folders' | 'both'
  proudlyDisplayPoweredByUppy?: boolean
  showLinkToFileUploadResult?: boolean
  showProgressDetails?: boolean
  showSelectedFiles?: boolean
  showRemoveButtonAfterComplete?: boolean
  showNativePhotoCameraButton?: boolean
  showNativeVideoCameraButton?: boolean
  target?: any
  theme?: 'auto' | 'dark' | 'light'
  trigger?: string
  width?: string | number
  autoOpen?: 'metaEditor' | 'imageEditor' | null
  /** @deprecated use option autoOpen instead */
  autoOpenFileEditor?: boolean
  disabled?: boolean
  disableLocalFiles?: boolean
  onRequestCloseModal?: () => void
  doneButtonHandler?: () => void
  onDragOver?: (event: DragEvent) => void
  onDragLeave?: (event: DragEvent) => void
  onDrop?: (event: DragEvent) => void
}

type FieldRenderOptions = {
  value: string
  onChange: (newVal: string) => void
  fieldCSSClasses: { text: string }
  required: boolean
  form: string
}

type PreactRender = (
  node: any,
  params: Record<string, unknown> | null,
  ...children: any[]
) => any

interface MetaField {
  id: string
  name: string
  placeholder?: string
  render?: (field: FieldRenderOptions, h: PreactRender) => any
}

export interface XHRUploadOptions extends PluginOptions {
  limit?: number
  bundle?: boolean
  formData?: boolean
  headers?: Headers | ((file: UppyFile) => Headers)
  allowedMetaFields?: string[] | null
  fieldName?: string
  timeout?: number
  responseUrlFieldName?: string
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'get' | 'post' | 'put' | 'head'
  locale?: any
  responseType?: string
  withCredentials?: boolean
  validateStatus?: (
    statusCode: number,
    responseText: string,
    response: unknown,
  ) => boolean
  getResponseData?: (responseText: string, response: unknown) => any
  getResponseError?: (responseText: string, xhr: unknown) => Error
}

type Actions = {
  revert: boolean
  rotate: boolean
  granularRotate: boolean
  flip: boolean
  zoomIn: boolean
  zoomOut: boolean
  cropSquare: boolean
  cropWidescreen: boolean
  cropWidescreenVertical: boolean
}


export interface ImageEditorOptions extends UIPluginOptions {
  cropperOptions?: any
  actions?: Actions
  quality?: number
  target?: any
  locale?: any
}

export interface CompressorOptions extends PluginOptions {
  quality?: number
  limit?: number
  locale?: any
}