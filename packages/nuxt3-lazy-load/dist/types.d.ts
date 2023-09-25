export type YoungLazyloadType = 'images' | 'videos' | 'audios' | 'iframes';
export type YoungOSSProvider = 'aliyun' | 'qiniu' | 'tencent' | 'baidu' | '163yun' | 'huawei';
export declare const YoungOSSImageDefaultProcess: Record<YoungOSSProvider & string, string>;
export interface YoungLazyLoadOptions extends Record<YoungLazyloadType, boolean> {
    /**
     * 是否仅使用原生的懒加载机制 (loading="lazy")
     * @default false
     */
    native: boolean;
    /**
     * 是否仅使用自定义指令标记的才进行懒加载
     */
    directiveOnly: boolean;
    /**
     * 默认占位图
     */
    defaultImage: string;
    /**
     * 加载中的样式类名
     * @default 'isLoading'
     */
    loadingClass: string;
    /**
     * 加载完成的样式类名
     * @default 'isLoaded'
     */
    loadedClass: string;
    /**
     * 追加样式类名
     * @default 'lazyLoad'
     */
    appendClass: string;
    /**
     * intersection observer config
     */
    observerConfig: IntersectionObserverInit;
    /**
     * oss 服务提供商(暂时仅用于图片处理)
     * @default aliyun
     */
    OSSProvider: YoungOSSProvider;
    /**
     * 命令处理字符串
     * @cond1 默认会使用 OSSProvider 对应的值
     * @cond2 传入字符串的话，会覆盖
     * @cond3 传入 false，禁用 OSS 图片处理
     */
    OSSProcess?: string | false;
}
export type YoungReplaceRules = {
    from: RegExp;
    to: (match: string) => string;
}[];
declare module 'vite' {
    interface UserConfig {
        vue: {
            template: {
                transfromAssetUrls?: Record<string, string[]>;
            };
        };
    }
}
