# useFormContext

基于 Reka UI `createContext` 的 Form 上下文：消费 `FormContextValue`，并与 `provideFormContext` 成对使用。同文件还再导出 TanStack Vue Form 的常用 API 与相关类型。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-form-context
```

## Usage

```ts
import { provideFormContext, useForm, useFormContext } from '~/composables/use-form-context'

// 在 Form 根组件中提供上下文
provideFormContext({
  form,
  loading,
  disabled,
})

// 在子组件中读取
const { form, loading, disabled } = useFormContext()

// 再导出的 TanStack Form API
const formApi = useForm({ /* ... */ })
```

## Returns

`useFormContext()` 返回 `FormContextValue`（由 `createContext` 注入；未提供上下文时行为与 Reka UI `createContext` 一致）。

## provideFormContext

与 `useFormContext` 成对的 Provider，参数类型为 `FormContextValue`。

## Exports

| 导出              | 来源                                  | 说明         |
| ----------------- | ------------------------------------- | ------------ |
| `useForm`         | `@tanstack/vue-form`                  | 创建表单实例 |
| `useFormField`    | `@tanstack/vue-form` 的 `useField`    | 字段 API     |
| `useFormSelector` | `@tanstack/vue-form` 的 `useSelector` | 选择器 API   |

## Types

### `AnyFormApi`

`VueFormApi` 与 `FormApi`（均来自 `@tanstack/vue-form`）的交叉类型，用于宽松标注表单实例。

### `FormContextValue`

| 字段       | 类型           | 说明       |
| ---------- | -------------- | ---------- |
| `form`     | `AnyFormApi`   | 表单 API   |
| `loading`  | `Ref<boolean>` | 是否加载中 |
| `disabled` | `Ref<boolean>` | 是否禁用   |
