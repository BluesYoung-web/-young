import { defineNuxtModule, addComponent, addImports } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@bluesyoung/ui-vue3-element-plus',
    configKey: '@bluesyoung/ui-vue3-element-plus',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(options, nuxt) {
    // 工具函数自动导入 & 组件导入(供 tsx 及 h 使用)
    ["useAutoLoad","useFormMode","useExport2Excel","useVerifyCode","useImagePreview","useVideoPreview","useAudioPreview","dataURLtoFile","useKeyUp","useQuery","useRemoteSearch","initAMapSDK","getVideoCover","YoungTable","YoungPagination","YoungDialog","YoungSelect","YoungWeekday","YoungTimeRange","YoungDateRange","YoungImageViewer","YoungSearchForm","YoungTablePro","YoungUpload","YoungGaodeMap","YoungGaodeAreaSelect","YoungPureUpload"].forEach(fn => {
      addImports({
        name: fn,
        from: '@bluesyoung/ui-vue3-element-plus'
      });
    });

    // 组件自动导入
    ["YoungTable","YoungPagination","YoungDialog","YoungSelect","YoungWeekday","YoungTimeRange","YoungDateRange","YoungImageViewer","YoungSearchForm","YoungTablePro","YoungUpload","YoungGaodeMap","YoungGaodeAreaSelect","YoungPureUpload"].forEach(name => {
      addComponent({
        export: name,
        name,
        filePath: '@bluesyoung/ui-vue3-element-plus',
      });
    });

    // 工具类型自动导入
    ["TableDataItem","TableHeadItem","SelectOptionItem","YoungSearchScheme"].forEach(t => {
      addImports({
        name: t,
        from: '@bluesyoung/ui-vue3-element-plus',
        type: true
      });
    });
  }
})
