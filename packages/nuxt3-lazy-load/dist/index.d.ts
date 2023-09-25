import type { YoungLazyLoadOptions } from './types';
declare const NAME = "@bluesyoung/nuxt3-lazy-load";
declare const _default: import("@nuxt/schema").NuxtModule<YoungLazyLoadOptions>;
export default _default;
declare module '@nuxt/schema' {
    interface NuxtConfig {
        [NAME]?: YoungLazyLoadOptions;
    }
    interface NuxtOptions {
        [NAME]?: YoungLazyLoadOptions;
    }
}
