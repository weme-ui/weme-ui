# Range Input

区间数值输入控件，包含起止两个输入框与中间分隔符。须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/range-input
```

## Usage

## Props

| 属性              | 说明                                                       | 类型                                                       | 默认值   |
| ----------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| `as`              | 根节点渲染为的元素或组件（Reka UI `Primitive`）            | `AsTag \| Component`                                       | `'div'`  |
| `asChild`         | 将根节点行为合并到子元素                                   | `boolean`                                                  | —        |
| `modelValue`      | 受控值，形如 `[from, to]`；空侧为 `null`                   | `[number \| null, number \| null]`                         | —        |
| `defaultValue`    | 非受控初始值                                               | `[number \| null, number \| null]`                         | —        |
| `min`             | 允许的最小值；写入时对两侧数值钳制                         | `number`                                                   | —        |
| `max`             | 允许的最大值；写入时对两侧数值钳制                         | `number`                                                   | —        |
| `variant`         | 外观变体                                                   | `'soft' \| 'outline'`                                      | `'soft'` |
| `unstyled`        | 移除所有样式类，仅保留布局结构                             | `boolean`                                                  | —        |
| `size`            | 尺寸                                                       | `'sm' \| 'md' \| 'lg'`                                     | `'md'`   |
| `radius`          | 圆角                                                       | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`   |
| `fromPlaceholder` | 起始输入框占位文案                                         | `string`                                                   | —        |
| `toPlaceholder`   | 结束输入框占位文案                                         | `string`                                                   | —        |
| `fromIcon`        | 起始侧图标（Iconify）                                      | `IconifyIconProps['icon']`                                 | —        |
| `toIcon`          | 结束侧图标（Iconify）                                      | `IconifyIconProps['icon']`                                 | —        |
| `separator`       | 中间分隔文案（无 `separator` 插槽且无 `separatorIcon` 时） | `string`                                                   | `'-'`    |
| `separatorIcon`   | 中间分隔图标（Iconify）；优先于 `separator` 文案           | `IconifyIconProps['icon']`                                 | —        |
| `id`              | 起始控件 `id`；未传时回退到 FormField Context              | `string`                                                   | —        |
| `name`            | 起始控件 `name`；未传时回退到 FormField Context            | `string`                                                   | —        |
| `required`        | 是否必填；会与 FormField Context 的 `required` 合并        | `boolean`                                                  | —        |
| `disabled`        | 是否禁用；会与 FormField Context 的 `disabled` 合并        | `boolean`                                                  | —        |
| `invalid`         | 是否无效；会与 FormField Context 的 `invalid` 合并         | `boolean`                                                  | —        |
| `class`           | 根节点额外 class                                           | `any`                                                      | —        |
| `ui`              | 覆盖 slots 样式                                            | `Partial<RangeInputStyleSlots>`                            | —        |

## Events

| 事件                | 说明                                                         | 参数                                      |
| ------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `update:modelValue` | 值变更时触发（可用于 `v-model`）                             | `value: [number \| null, number \| null]` |
| `change`            | 原生 `change` 时触发（参数为解析后的区间值，非原生 `Event`） | `value: [number \| null, number \| null]` |
| `focus`             | 输入框获得焦点                                               | `event: FocusEvent`                       |
| `blur`              | 输入框失去焦点                                               | `event: FocusEvent`                       |

## Slots

| 插槽        | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| `from-icon` | 自定义起始侧图标；未传时回退到 `fromIcon`                  |
| `separator` | 自定义中间分隔；未传时回退到 `separatorIcon` / `separator` |
| `to-icon`   | 自定义结束侧图标；未传时回退到 `toIcon`                    |

## Accessibility

根节点为 Reka UI `Primitive`（默认 `div`），设置 `data-slot="range-input"`，并透传 FormField Context 的字段 `data-*`。起始 `<input>` 通过 `useFormFieldBindings` 合并 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid`；结束 `<input>` 复用同一套无障碍绑定，但不设置独立的 `id` / `name`，避免与起始控件冲突。
