# @bluesyoung/editor

基于 [@aomao/engine](https://github.com/red-axe/am-editor) 开发的框架无关的富文本编辑器

由于官方提供的 Vue 组件过于依赖 UI 框架，这让我很不爽，因此我决定开发一个框架无关的库

> 本来准备用 webcomponent 实现的，但是引擎无法获取到真实的dom。要么输入一个字符之后光标失去焦点，要么直接报错，暂无解决办法