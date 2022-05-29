/*
 * @Author: zhangyang
 * @Date: 2022-03-01 19:11:11
 * @LastEditTime: 2022-05-29 09:13:09
 * @Description: 
 */
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: [
    ['toolbar-el', 'flex items-center children:mx-1 children:my-2 children:p-1 rounded border border-gray-200 shadow pl-4 children:not-last:border-l children:not-last:border-gray-200']
  ]
});
