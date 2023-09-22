/*
 * @Author: zhangyang
 * @Date: 2023-09-22 15:14:54
 * @LastEditTime: 2023-09-22 15:46:17
 * @Description: 
 */
export type YoungLazyloadType = 'images' | 'videos' | 'audios' | 'iframes'

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