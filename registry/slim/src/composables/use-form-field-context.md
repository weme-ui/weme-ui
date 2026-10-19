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

`useFormFieldContext()` 返回 `FormFieldContextValue`（由 `createContext` 注入；未提供上下文时行为与 Reka UI `createContext` 一致）。

## provideFormFieldContext

与 `useFormFieldContext` 成对的 Provider，参数类型为 `FormFieldContextValue`。

## useFormFieldBindings

无参数。从 `useAttrs()` 与 `useFormFieldContext()` 合并出控件绑定对象，包含：

- 透传的其余 attrs（不含已单独处理的 `class` / `id` / `name` / `disabled` / `required` / `aria-*`）
- `field.dataAttributes`
- `id` / `name` / `disabled` / `required`（优先取 Context，再回退 attrs）
- `aria-labelledby` / `aria-describedby` / `aria-invalid`（与字段 label、description、invalid 态合并）

## Types

### `FormFieldSharedProps`

供表单控件 props 复用的共享字段（均为可选）：`id`、`name`、`disabled`、`required`、`invalid`、`loading`。

### `FormFieldControlDetail`

| 字段    | 类型      | 说明       |
| ------- | --------- | ---------- |
| `value` | `unknown` | 控件当前值 |

### `FormFieldControlRegistration`

| 字段       | 类型                                     | 说明               |
| ---------- | ---------------------------------------- | ------------------ |
| `id`       | `() => string \| undefined`              | 可选；控件 id 读取 |
| `element`  | `() => HTMLElement \| null \| undefined` | 控件 DOM           |
| `getValue` | `() => unknown`                          | 读取控件当前值     |

### `FormFieldDataAttributes`

`data-disabled` | `data-valid` | `data-invalid` | `data-dirty` | `data-touched` | `data-filled` | `data-focused` 映射为 `'' | undefined`。

### `FormFieldContextValue`

| 字段                 | 类型                                                    | 说明                              |
| -------------------- | ------------------------------------------------------- | --------------------------------- |
| `fieldId`            | `ComputedRef<string \| undefined>`                      | 字段 id                           |
| `labelId`            | `ComputedRef<string \| undefined>`                      | label id                          |
| `descriptionId`      | `ComputedRef<string \| undefined>`                      | description id                    |
| `name`               | `Ref<string \| undefined>`                              | 字段名                            |
| `disabled`           | `ComputedRef<boolean>`                                  | 禁用                              |
| `required`           | `Ref<boolean>`                                          | 是否必填                          |
| `loading`            | `ComputedRef<boolean>`                                  | 加载中                            |
| `valid`              | `ComputedRef<boolean>`                                  | 校验通过                          |
| `invalid`            | `ComputedRef<boolean>`                                  | 校验失败                          |
| `dirty`              | `ComputedRef<boolean>`                                  | 已修改                            |
| `touched`            | `ComputedRef<boolean>`                                  | 已触碰                            |
| `filled`             | `ComputedRef<boolean>`                                  | 已填写                            |
| `focused`            | `Ref<boolean>`                                          | 聚焦                              |
| `dataAttributes`     | `ComputedRef<FormFieldDataAttributes>`                  | 状态 data 属性                    |
| `getControlId`       | `() => string \| undefined`                             | 已注册控件 id，否则回退 `fieldId` |
| `focusControl`       | `() => void`                                            | 聚焦已注册控件                    |
| `resetField`         | `() => void`                                            | 重置字段状态与值                  |
| `registryControl`    | `(control: FormFieldControlRegistration) => () => void` | 注册控件；返回取消注册函数        |
| `handleControlFocus` | `() => void`                                            | 控件 focus                        |
| `handleControlBlur`  | `(detail?: FormFieldControlDetail) => void`             | 控件 blur；可选携带当前值         |
