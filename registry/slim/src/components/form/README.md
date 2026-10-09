# Form

基于 TanStack Form 的表单容器，负责提交处理，并向子组件提供 `disabled` / `loading` 上下文。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/form
```

## Usage

## Props

| 属性       | 说明                                                   | 类型         | 默认值 |
| ---------- | ------------------------------------------------------ | ------------ | ------ |
| `id`       | 根节点 `id`；未传时由 Vue `useId()` 生成               | `string`     | —      |
| `name`     | 原生 form `name`                                       | `string`     | —      |
| `form`     | TanStack Form 的 `FormApi` / `VueFormApi` 实例（必填） | `AnyFormApi` | —      |
| `loading`  | 是否加载中（经 `provideFormContext` 下发）             | `boolean`    | —      |
| `disabled` | 是否禁用（经 `provideFormContext` 下发）               | `boolean`    | —      |
| `class`    | 根节点额外 class                                       | `any`        | —      |

## Slots

| 插槽      | 说明                     |
| --------- | ------------------------ |
| `default` | 表单内容（字段与操作区） |

## Accessibility

渲染为原生 `<form>`，固定 `method="post"` 与 `novalidate`（由 TanStack Form 负责校验）。

### Keyboard Interactions

| Key     | Description                                            |
| ------- | ------------------------------------------------------ |
| `Enter` | 在可提交控件内按下时触发提交（经 `form.handleSubmit`） |
