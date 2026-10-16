# Textarea

多行文本输入控件。须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`，支持自动增高（`autoSize`）、字数统计、加载态与 `v-model` modifiers。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/textarea
```

## Usage

## Props

| 属性             | 说明                                                                           | 类型                                             | 默认值             |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------ | ------------------ |
| `as`             | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                | `any`                                            | —                  |
| `modelValue`     | 受控值；可用 `v-model`                                                         | `string \| null \| undefined`                    | —                  |
| `defaultValue`   | 非受控初始值                                                                   | `string \| null \| undefined`                    | —                  |
| `variant`        | 外观变体                                                                       | `'soft' \| 'outline'`                            | `'soft'`           |
| `size`           | 尺寸                                                                           | `'sm' \| 'md' \| 'lg'`                           | `'md'`             |
| `radius`         | 圆角                                                                           | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`             |
| `placeholder`    | 占位文案                                                                       | `string`                                         | —                  |
| `rows`           | 最小行数（自动增高的起始行数）                                                 | `number`                                         | `3`                |
| `maxRows`        | 自动增高时的最大行数；未传则不限制                                             | `number`                                         | —                  |
| `maxLength`      | 最大长度（`countable` 展示用）；超出时计数器使用 error 色                      | `number`                                         | —                  |
| `autoSize`       | 是否按内容自动调整行数                                                         | `boolean`                                        | —                  |
| `countable`      | 配合 `maxLength` 显示字数统计                                                  | `boolean`                                        | —                  |
| `loadingIcon`    | 加载中图标（Iconify）；`loading` 为真时显示                                    | `IconifyIconProps['icon']`                       | `'ri:loader-line'` |
| `unstyled`       | 移除样式变体类，仅保留结构                                                     | `boolean`                                        | —                  |
| `id`             | 控件 `id`；未传时回退到 FormField Context                                      | `string`                                         | —                  |
| `name`           | 控件 `name`；未传时回退到 FormField Context                                    | `string`                                         | —                  |
| `loading`        | 是否加载中；会与 FormField Context 的 `loading` 合并                           | `boolean`                                        | —                  |
| `required`       | 是否必填；会与 FormField Context 的 `required` 合并                            | `boolean`                                        | —                  |
| `disabled`       | 是否禁用；会与 FormField Context 的 `disabled` 合并                            | `boolean`                                        | —                  |
| `readonly`       | 是否只读；会与 FormField Context 的 `readonly` 合并                            | `boolean`                                        | —                  |
| `invalid`        | 是否无效；会与 FormField Context 的 `invalid` 合并                             | `boolean`                                        | —                  |
| `modelModifiers` | `v-model` modifiers（`lazy` / `trim` / `nullable` / `optional`）               | `TextareaModelModifiers`                         | —                  |
| `class`          | 根节点额外 class                                                               | `any`                                            | —                  |
| `ui`             | 覆盖 slots 样式（`root` / `textarea` / `innerWrapper` / `counter` / `loader`） | `Partial<TextareaStyleSlots>`                    | —                  |

## Events

| 事件                | 说明                                                                                        | 参数                                 |
| ------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------ |
| `update:modelValue` | 值变更时触发（含 `v-model`）；受 `lazy` / `trim` / `nullable` / `optional` modifiers 影响   | `value: string \| null \| undefined` |
| `change`            | 原生 `change` 时触发；参数为当前 textarea 字符串（非原生 `Event`）。`lazy` 时同时写入 model | `value: string \| null \| undefined` |
| `focus`             | 获得焦点                                                                                    | `event: FocusEvent`                  |
| `blur`              | 失去焦点                                                                                    | `event: FocusEvent`                  |

## Slots

| 插槽      | 说明                                                                                |
| --------- | ----------------------------------------------------------------------------------- |
| `counter` | 自定义字数统计；作用域参数 `{ count }`；未传时渲染 `count / maxLength`              |
| `loader`  | 自定义加载指示；作用域参数 `{ loading }`；未传且 `loading` 为真时渲染 `loadingIcon` |

## Accessibility

原生 `<textarea>` 控件。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`。根节点为 Reka UI `Primitive`，并设置 `data-slot="textarea"`、`data-readonly`。
