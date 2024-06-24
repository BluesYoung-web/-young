/*
 * @Author: zhangyang
 * @Date: 2023-09-20 09:03:04
 * @LastEditTime: 2024-06-24 15:31:45
 * @Description: 生成 nuxt 模块
 */
import { readFile, writeFile } from 'node:fs/promises';

const NAME = '@bluesyoung/ui-vue3-element-plus';

const ComponentsStr = await readFile(new URL('../dist/components/index.mjs', import.meta.url), 'utf-8');

const ComponentsReg = /(?<=as\s)(\w+)/img;
const Components = ComponentsStr.match(ComponentsReg);

/**
 * todo: 工具函数自动导入，数量不多，暂时写死
 */
const FNS = [
  'useAutoLoad',
  'useFormMode',
  'useExport2Excel',
  'useVerifyCode',
  'useImagePreview',
  'useVideoPreview',
  'useAudioPreview',
  'useKeyUp',
  'useQuery',
  'useRemoteSearch',
  'initAMapSDK'
];

/**
 * todo: 类型自动导入，数量不多，暂时写死
 */
const TYPES = [
  'TableDataItem',
  'TableHeadItem',
  'SelectOptionItem',
  'YoungSearchScheme'
];

const MODULE_TEMPLATE = `import { defineNuxtModule, addComponent, addImports } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '${NAME}',
    configKey: '${NAME}',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(options, nuxt) {
    // 工具函数自动导入 & 组件导入(供 tsx 及 h 使用)
    ${JSON.stringify([
  ...FNS,
  ...Components,
])}.forEach(fn => {
      addImports({
        name: fn,
        from: '${NAME}'
      });
    });

    // 组件自动导入
    ${JSON.stringify(Components)}.forEach(name => {
      addComponent({
        export: name,
        name,
        filePath: '${NAME}',
      });
    });

    // 工具类型自动导入
    ${JSON.stringify(TYPES)}.forEach(t => {
      addImports({
        name: t,
        from: '${NAME}',
        type: true
      });
    });
  }
})
`

await writeFile(new URL('../nuxt.mjs', import.meta.url), MODULE_TEMPLATE)