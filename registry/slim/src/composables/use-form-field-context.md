# useFormFieldContext

基于 Reka UI `createContext` 的 FormField 上下文：读取字段 id、校验态与 `data-*` 属性等。同文件还导出 `provideFormFieldContext`、`useFormFieldBindings` 与相关类型。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-form-field-context
```

## Usage

```ts
import {
  provideFormFieldContext,
  useFormFieldBindings,
  useFormFieldContext,
} from '~/composables/use-form-field-context'

// 在 FormField 中提供
provideFormFieldContext({ /* FormFieldContextValue */ })

// 在控件中读取
const field = useFormFieldContext()

// 合并 attrs 与字段 a11y / data 属性，供原生控件绑定
const bindings = useFormFieldBindings()
```

## Returns

`useFormFieldContext()` 返回 `FormFieldContextValue`。

## provideFormFieldContext

与 `useFormFieldContext` 成对的 Provider，参数类型为 `FormFieldContextValue`。

## useFormFieldBindings

无参数。从 `useAttrs()` 与 `useFormFieldContext()` 合并出控件绑定对象，包含：

- 透传的其余 attrs
- `field.dataAttributes`
- `id` / `name` / `disabled` / `required`
- `aria-labelledby` / `aria-describedby` / `aria-invalid`（与字段 label、description、invalid 态合并）

## Types

### `FormFieldDataAttributes`

`data-disabled` | `data-valid` | `data-invalid` | `data-focused` | `data-touched` | `data-dirty` | `data-filled` 映射为 `'' | undefined`。

### `FormFieldContextValue`

| 字段                 | 类型                                   | 说明           |
| -------------------- | -------------------------------------- | -------------- |
| `fieldId`            | `ComputedRef<string \| undefined>`     | 控件 id        |
| `labelId`            | `ComputedRef<string \| undefined>`     | label id       |
| `descriptionId`      | `ComputedRef<string \| undefined>`     | description id |
| `name`               | `Ref<string \| undefined>`             | 字段名         |
| `required`           | `Ref<boolean>`                         | 是否必填       |
| `readonly`           | `Ref<boolean>`                         | 是否只读       |
| `loading`            | `ComputedRef<boolean>`                 | 加载中         |
| `valid`              | `ComputedRef<boolean>`                 | 校验通过       |
| `invalid`            | `ComputedRef<boolean>`                 | 校验失败       |
| `dirty`              | `ComputedRef<boolean>`                 | 已修改         |
| `touched`            | `ComputedRef<boolean>`                 | 已触碰         |
| `filled`             | `ComputedRef<boolean>`                 | 已填写         |
| `focused`            | `Ref<boolean>`                         | 聚焦           |
| `disabled`           | `ComputedRef<boolean>`                 | 禁用           |
| `dataAttributes`     | `ComputedRef<FormFieldDataAttributes>` | 状态 data 属性 |
| `orientation`        | `Ref<'horizontal' \| 'vertical'>`      | 布局方向       |
| `handleControlFocus` | `() => void`                           | 控件 focus     |
| `handleControlBlur`  | `() => void`                           | 控件 blur      |

### `FormFieldSharedProps`

供表单控件 props 复用的共享字段：`id`、`name`、`loading`、`required`、`disabled`、`readonly`、`invalid`（均为可选）。
