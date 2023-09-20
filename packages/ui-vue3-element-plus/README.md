# 基于 Vue3 + ElementPlus 二次封装的 UI 组件库

## 安装

```bash
npm i @bluesyoung/ui-vue3-element-plus
yarn add @bluesyoung/ui-vue3-element-plus
pnpm add @bluesyoung/ui-vue3-element-plus
```

## nuxt 推荐配套

**一切常用的组件、方法、类型，全部自动按需导入**

`nuxt.config.ts` 的 `modules` 修改如下：

```ts
{
  modules: [
    // 新增下面的内容
    '@bluesyoung/ui-vue3-element-plus/nuxt',
  ]
}
```

## 使用说明

[组件使用说明](./src/components/README.md)

[方法使用说明](./src/hooks/README.md)