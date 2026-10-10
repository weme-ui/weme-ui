# Input

单行文本输入控件。须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`，并支持前后缀、清除、字数统计与加载态。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/input
```

## Usage

## Props

| 属性             | 说明                                                                        | 类型                                                                        | 默认值             |
| ---------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------ |
| `as`             | 根节点渲染为的元素或组件（Reka UI `Primitive`）                             | `AsTag \| Component`                                                        | `'div'`            |
| `modelValue`     | 受控值                                                                      | `string \| number \| null \| undefined`                                     | —                  |
| `defaultValue`   | 非受控初始值                                                                | `string \| number \| null \| undefined`                                     | —                  |
| `variant`        | 外观变体                                                                    | `'soft' \| 'outline' \| 'unstyled'`                                         | `'soft'`           |
| `size`           | 尺寸                                                                        | `'xs' \| 'sm' \| 'md' \| 'lg'`                                              | `'md'`             |
| `radius`         | 圆角                                                                        | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                  | `'md'`             |
| `type`           | 原生 input 类型                                                             | `'text' \| 'email' \| 'number' \| 'url' \| 'tel' \| 'search' \| 'password'` | `'text'`           |
| `placeholder`    | 占位文案                                                                    | `string`                                                                    | —                  |
| `autocomplete`   | 原生 autocomplete                                                           | `'on' \| 'off' \| 'string'`                                                 | `'off'`            |
| `prefix`         | 前缀文案（无 `prefix` 插槽且无 `prefixIcon` 时展示）                        | `string`                                                                    | —                  |
| `suffix`         | 后缀文案（无 `suffix` 插槽且无图标 / loading 时展示）                       | `string`                                                                    | —                  |
| `prefixIcon`     | 前缀图标（Iconify）                                                         | `IconifyIconProps['icon']`                                                  | —                  |
| `suffixIcon`     | 后缀图标（Iconify）；loading 时改显示 `loadingIcon`                         | `IconifyIconProps['icon']`                                                  | —                  |
| `loadingIcon`    | 加载中图标（Iconify）                                                       | `IconifyIconProps['icon']`                                                  | `'ri:loader-line'` |
| `clearIcon`      | 清除按钮图标（Iconify）                                                     | `IconifyIconProps['icon']`                                                  | `'ri:close-line'`  |
| `clearable`      | 有值且未禁用时显示清除按钮                                                  | `boolean`                                                                   | —                  |
| `countable`      | 配合 `maxLength` 显示字数统计                                               | `boolean`                                                                   | —                  |
| `maxLength`      | 最大长度（`countable` 展示用；需大于 `0`）                                  | `number`                                                                    | —                  |
| `id`             | 控件 `id`；未传时回退到 FormField Context                                   | `string`                                                                    | —                  |
| `name`           | 控件 `name`；未传时回退到 FormField Context                                 | `string`                                                                    | —                  |
| `loading`        | 是否加载中；会与 FormField Context 的 `loading` 合并                        | `boolean`                                                                   | —                  |
| `required`       | 是否必填；会与 FormField Context 的 `required` 合并                         | `boolean`                                                                   | —                  |
| `disabled`       | 是否禁用；会与 FormField Context 的 `disabled` 合并                         | `boolean`                                                                   | —                  |
| `readonly`       | 是否只读；会与 FormField Context 的 `readonly` 合并                         | `boolean`                                                                   | —                  |
| `invalid`        | 是否无效；会与 FormField Context 的 `invalid` 合并                          | `boolean`                                                                   | —                  |
| `modelModifiers` | `v-model` modifiers（`lazy` / `trim` / `number` / `nullable` / `optional`） | `InputModelModifiers`                                                       | —                  |
| `class`          | 根节点额外 class                                                            | `any`                                                                       | —                  |
| `ui`             | 覆盖 slots 样式                                                             | `Partial<InputStyleSlots>`                                                  | —                  |

## Events

| 事件                | 说明                                      | 参数                                           |
| ------------------- | ----------------------------------------- | ---------------------------------------------- |
| `update:modelValue` | 值变更时触发                              | `value: string \| number \| null \| undefined` |
| `enter`             | 在输入框按 `Enter` 时触发（值为 trim 后） | `value: string \| number \| null \| undefined` |
| `clean`             | 点击清除按钮时触发（参数为清除前的值）    | `value: string \| number \| null \| undefined` |
| `change`            | 原生 `change`                             | `event: Event`                                 |
| `focus`             | 获得焦点                                  | `event: FocusEvent`                            |
| `blur`              | 失去焦点                                  | `event: FocusEvent`                            |

## Slots

| 插槽        | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| `default`   | 输入框与清除按钮之间的自定义内容                           |
| `prefix`    | 自定义前缀；未传时回退到 `prefixIcon` / `prefix`           |
| `suffix`    | 自定义后缀；未传时回退到 loading / `suffixIcon` / `suffix` |
| `cleanIcon` | 自定义清除图标；未传时回退到 `clearIcon`                   |

## Accessibility

原生 `<input>` 控件。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`。根节点为 Reka UI `Primitive`（默认 `div`），并设置 `data-slot="input"`、`data-readonly`。

### Keyboard Interactions

| Key     | Description                                                   |
| ------- | ------------------------------------------------------------- |
| `Enter` | 触发 `enter` 事件；若使用 `lazy` modifier，同时提交当前输入值 |
