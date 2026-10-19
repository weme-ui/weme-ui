# Form

基于 TanStack Form 的表单容器，负责提交处理，并向子组件提供 Form Context。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/form
```

## Usage

## Props

| 属性             | 说明                                                            | 类型                                   | 默认值       |
| ---------------- | --------------------------------------------------------------- | -------------------------------------- | ------------ |
| `as`             | 渲染为的元素或组件（Reka UI `Primitive`）                       | `AsTag \| Component`                   | `'form'`     |
| `asChild`        | 合并到子元素上渲染（Reka UI composition）                       | `boolean`                              | —            |
| `form`           | TanStack Form 的 `FormApi` / `VueFormApi` 实例（必填）          | `FormApi`                              | —            |
| `validationMode` | 字段校验时机（经 `provideFormContext` 下发）                    | `'onSubmit' \| 'onBlur' \| 'onChange'` | `'onSubmit'` |
| `errors`         | 服务端 / 外部错误映射（按字段名）；变更后会尝试聚焦首个无效控件 | `Record<string, string \| string[]>`   | —            |
| `loading`        | 是否加载中（经 `provideFormContext` 下发）                      | `boolean`                              | —            |
| `disabled`       | 是否禁用（经 `provideFormContext` 下发）                        | `boolean`                              | —            |
| `class`          | 根节点额外 class                                                | `any`                                  | —            |

## Events

| 事件         | 说明                                                                             | 参数                                                  |
| ------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `submit`     | 客户端无无效字段时，在原生 submit 流程中触发（此前会调用 `form.handleSubmit()`） | `event: SubmitEvent`                                  |
| `formSubmit` | 存在 `@form-submit` 监听时触发；携带当前已注册字段的值快照                       | `values: Record<string, unknown>, event: SubmitEvent` |

## Slots

| 插槽      | 说明                     |
| --------- | ------------------------ |
| `default` | 表单内容（字段与操作区） |

## Accessibility

默认经 Reka UI `Primitive` 渲染为原生 `<form>`，并设置 `novalidate`（校验由 TanStack Form 与字段逻辑负责）。根节点带 `data-slot="form"`。提交时若存在无效已注册字段，会 `preventDefault` 并聚焦（必要时 `select`）文档顺序上的首个无效控件；提交后若 `errors` 更新，同样会聚焦首个无效控件。`reset` 事件会重置所有已注册字段。

### Keyboard Interactions

| Key     | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| `Enter` | 在可提交控件内按下时触发提交（原生 `<form>` 行为，经 `handleSubmit`） |
