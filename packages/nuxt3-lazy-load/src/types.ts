/*
 * @Author: zhangyang
 * @Date: 2023-09-22 15:14:54
 * @LastEditTime: 2023-09-25 14:20:29
 * @Description: 
 */
export type YoungLazyloadType = 'images' | 'videos' | 'audios' | 'iframes'

export type YoungOSSProvider = 'aliyun' | 'qiniu' | 'tencent' | 'baidu' | '163yun' | 'huawei'

export const YoungOSSImageDefaultProcess: Record<YoungOSSProvider & string, string> = {
  /**
   * 官方文档 https://help.aliyun.com/zh/oss/user-guide/img-parameters/?spm=a2c4g.11186623.0.0.533b1210VUHgHP
   */
  'aliyun': 'x-oss-process=image/format,webp/quality,Q_75',
  /**
   * 官方文档 https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2
   */
  'qiniu': 'imageView2/0/format/webp/q/75',
  /**
   * 官方文档 https://cloud.tencent.com/document/product/436/44883
   */
  'tencent': 'imageMogr2/format/webp/lquality/75',
  /**
   * 官方文档 https://cloud.baidu.com/doc/BOS/s/dldh5wp4s
   * @description 自适应 webp，据文档所说挺厉害的
   */
  'baidu': 'x-bce-process=image/format,f_auto/quality,Q_75',
  /**
   * 官方文档 https://sf.163.com/help/documents/114078550521466880
   */
  '163yun': 'imageView&type=webp&quality=75',
  /**
   * 官方文档 https://support.huaweicloud.com/fg-obs/obs_01_0471.html
   */
  'huawei': 'x-image-process=image/format,webp/quality,Q_75'
}

export interface YoungLazyLoadOptions extends Record<YoungLazyloadType, boolean> {
  /**
   * 是否仅使用原生的懒加载机制 (loading="lazy")
   * @default false
   */
  native: boolean

  /**
   * 是否仅使用自定义指令标记的才进行懒加载
   */
  directiveOnly: boolean

  /**
   * 默认占位图
   */
  defaultImage: string

  /**
   * 加载中的样式类名
   * @default 'isLoading'
   */
  loadingClass: string
  /**
   * 加载完成的样式类名
   * @default 'isLoaded'
   */
  loadedClass: string
  /**
   * 追加样式类名
   * @default 'lazyLoad'
   */
  appendClass: string

  /**
   * intersection observer config
   */
  observerConfig: IntersectionObserverInit

  /**
   * oss 服务提供商(暂时仅用于图片处理)
   * @default aliyun
   */
  OSSProvider: YoungOSSProvider
  /**
   * 命令处理字符串
   * @cond1 默认会使用 OSSProvider 对应的默认值
   * @cond2 传入字符串的话，会覆盖
   * @cond3 传入 false，禁用 OSS 图片处理
   */
  OSSProcess?: string | false
}

export type YoungReplaceRules = {
  from: RegExp
  to: (match: string) => string
}[]

declare module 'vite' {
  interface UserConfig {
    vue: {
      template: {
        transfromAssetUrls?: Record<string, string[]>
      }
    }
  }
}