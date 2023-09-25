/*
 * @Author: zhangyang
 * @Date: 2023-09-22 09:23:29
 * @LastEditTime: 2023-09-25 12:25:54
 * @Description:
 */
import { addPlugin, addTemplate, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import { isNotLazy, replaceAttrs, replaceSrc } from './tool'
import type { YoungLazyLoadOptions, YoungReplaceRules } from './types'

const NAME = '@bluesyoung/nuxt3-lazy-load'

export default defineNuxtModule<YoungLazyLoadOptions>({
  meta: {
    name: NAME,
    configKey: NAME,
  },
  defaults: {
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
    observerConfig: {},
    defaultImage: '',
    OSSProvider: 'aliyun',
  },
  setup(options, nuxt) {
    extendViteConfig((config) => {
      if (!config.vue.template.transfromAssetUrls)
        config.vue.template.transfromAssetUrls = {}

      // 地址处理
      config.vue.template.transfromAssetUrls['img'] = [
        'src',
        'data-src',
        'srcset',
        'data-srcset',
        'data-flickity-lazyload',
      ]
      config.vue.template.transfromAssetUrls['video'] = ['src', 'data-src', 'poster', 'data-poster']
      config.vue.template.transfromAssetUrls['audio'] = ['src', 'data-src']
      config.vue.template.transfromAssetUrls['iframe'] = ['src', 'data-src']
      config.vue.template.transfromAssetUrls['source'] = ['src', 'data-src', 'srcset', 'data-srcset']

      const replaceArr: YoungReplaceRules = []
      if (!options.native) {
        replaceArr.push({
          from: /<img[^>]*?>/g,
          to: match => isNotLazy(match, options, 'images') ? match : replaceAttrs(match, 'img', ['src', 'srcset'], options),
        })

        replaceArr.push({
          from: /<source[^>]*?>/g,
          to: match => isNotLazy(match) ? match : replaceAttrs(match, '', ['src', 'srcset'], options),
        })

        replaceArr.push({
          from: /<video[^>]*?>/g,
          to: match => isNotLazy(match, options, 'videos') ? match.replace('<video', '<video v-not-lazy') : replaceAttrs(match, 'video', ['src', 'poster'], options),
        })

        replaceArr.push({
          from: /<picture[^>]*?>/g,
          to: match => isNotLazy(match, options, 'images') ? match.replace('<picture', '<picture v-not-lazy') : replaceAttrs(match, 'picture', ['src'], options),
        })

        replaceArr.push({
          from: /<audio[^>]*?>/g,
          to: match => isNotLazy(match, options, 'audios') ? match.replace('<audio', '<audio v-not-lazy') : replaceAttrs(match, 'audio', ['src'], options),
        })

        replaceArr.push({
          from: /<iframe[^>]*?>/g,
          to: match => isNotLazy(match, options, 'iframes') ? match.replace('<iframe', '<iframe v-not-lazy') : replaceAttrs(match, 'iframe', ['src'], options),
        })
      }
      else {
        replaceArr.push({
          from: /<img[^>]*?>/g,
          to: match => isNotLazy(match, options, 'images') ? match : match.replace('<img', '<img loading="lazy"'),
        })

        replaceArr.push({
          from: /<video[^>]*?>/g,
          to: match => isNotLazy(match, options, 'videos') ? match : match.replace('<video', '<video loading="lazy"'),
        })

        replaceArr.push({
          from: /<audio[^>]*?>/g,
          to: match => isNotLazy(match, options, 'audios') ? match : match.replace('<audio', '<audio loading="lazy"'),
        })

        replaceArr.push({
          from: /<iframe[^>]*?>/g,
          to: match => isNotLazy(match, options, 'iframes') ? match : match.replace('<iframe', '<iframe loading="lazy"'),
        })
      }

      config.plugins?.push({
        name: NAME,
        enforce: 'pre',
        transform(src) {
          return {
            code: replaceSrc(src, replaceArr),
            map: null,
          }
        },
      })
    })

    if (!options.native) {
      // 配置选项存储为文件
      addTemplate({
        filename: '@bluesyoung/nuxt3-lazy-load.ts',
        write: true,
        getContents: () => `export const options = ${JSON.stringify(options, null, 2)}`,
      })

      // 注入插件
      const resolver = createResolver(import.meta.url)
      addPlugin(resolver.resolve('./runtime/plugin'))
    }
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    [NAME]?: YoungLazyLoadOptions
  }
  interface NuxtOptions {
    [NAME]?: YoungLazyLoadOptions
  }
}