# Checkbox

复选框控件。须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。基于 Reka UI `CheckboxRoot` / `CheckboxIndicator`，支持外观变体、尺寸、圆角、标签 / 描述、指示器位置与半选态。泛型 `T extends boolean`（默认 `boolean`）用于 `modelValue` / `trueValue` / `falseValue`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/checkbox
```

## Usage

## Props

| 属性                     | 说明                                                                                                                | 类型                                                       | 默认值               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------- |
| `as`                     | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                                     | `AsTag \| Component`                                       | `'button'`           |
| `asChild`                | 合并到子元素上渲染（Reka UI composition）                                                                           | `boolean`                                                  | —                    |
| `modelValue`             | 受控值；可用 `v-model`；可为半选                                                                                    | `T \| 'indeterminate' \| null`                             | —                    |
| `defaultValue`           | 非受控初始值                                                                                                        | `T \| 'indeterminate'`                                     | —                    |
| `trueValue`              | 选中时写入 model 的值                                                                                               | `T`                                                        | `true`               |
| `falseValue`             | 未选中时写入 model 的值                                                                                             | `T`                                                        | `false`              |
| `value`                  | 随表单提交的 `name` 对应值                                                                                          | `AcceptableValue`                                          | `'on'`               |
| `variant`                | 外观变体                                                                                                            | `'soft' \| 'outline' \| 'card'`                            | `'soft'`             |
| `size`                   | 尺寸                                                                                                                | `'sm' \| 'md' \| 'lg'`                                     | `'md'`               |
| `radius`                 | 圆角                                                                                                                | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`               |
| `align`                  | 指示器与文案的交叉轴对齐                                                                                            | `'start' \| 'center' \| 'end'`                             | —                    |
| `indicator`              | 指示器位置；`none` 时仅保留无障碍指示器（可视隐藏）                                                                 | `'start' \| 'end' \| 'none'`                               | `'start'`            |
| `checkedIcon`            | 选中态图标（Iconify）                                                                                               | `IconifyIconProps['icon']`                                 | `'ri:check-line'`    |
| `checkedIconClass`       | 选中态图标额外 class                                                                                                | `any`                                                      | —                    |
| `indeterminateIcon`      | 半选态图标（Iconify）                                                                                               | `IconifyIconProps['icon']`                                 | `'ri:subtract-line'` |
| `indeterminateIconClass` | 半选态图标额外 class                                                                                                | `any`                                                      | —                    |
| `label`                  | 标签文案；未传且无 `label` 插槽时不渲染标签区                                                                       | `string`                                                   | —                    |
| `description`            | 描述文案；未传且无 `description` 插槽时不渲染描述                                                                   | `string`                                                   | —                    |
| `inverted`               | 反色样式变体                                                                                                        | `boolean`                                                  | —                    |
| `unstyled`               | 移除样式变体类，仅保留结构                                                                                          | `boolean`                                                  | —                    |
| `id`                     | 控件 `id`；未传时回退到 FormField Context                                                                           | `string`                                                   | —                    |
| `name`                   | 控件 `name`；未传时回退到 FormField Context                                                                         | `string`                                                   | —                    |
| `required`               | 是否必填；会与 FormField Context 的 `required` 合并                                                                 | `boolean`                                                  | —                    |
| `disabled`               | 是否禁用；会与 FormField Context 的 `disabled` 合并                                                                 | `boolean`                                                  | —                    |
| `invalid`                | 是否无效；会与 FormField Context 的 `invalid` 合并                                                                  | `boolean`                                                  | —                    |
| `class`                  | 根节点额外 class                                                                                                    | `any`                                                      | —                    |
| `ui`                     | 覆盖 slots 样式（`root` / `indicator` / `checkedIcon` / `indeterminateIcon` / `content` / `label` / `description`） | `Partial<CheckboxStyleSlots>`                              | —                    |

## Events

| 事件                | 说明                                                            | 参数                          |
| ------------------- | --------------------------------------------------------------- | ----------------------------- |
| `update:modelValue` | 选中状态变更时触发（含 `v-model`）；由 Reka `CheckboxRoot` 转发 | `value: T \| 'indeterminate'` |
| `change`            | `update:modelValue` 时同步触发                                  | `value: T`                    |

## Slots

| 插槽          | 说明                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| `indicator`   | 自定义指示器内容；作用域参数 `{ state }`（`'checked' \| 'unchecked' \| 'indeterminate'`） |
| `label`       | 自定义标签；作用域参数 `{ state }`；未传时回退到 `label`                                  |
| `description` | 自定义描述；作用域参数 `{ state }`；未传时回退到 `description`                            |

## Accessibility

遵循 WAI-ARIA Checkbox 设计模式。基于 Reka UI `CheckboxRoot`（`role="checkbox"`、`aria-checked`，半选时为 `mixed`、`data-state`）。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`。根节点设置 `data-slot="checkbox"`、`data-indicator`。内置 `Label` 通过 `for` 关联控件 `id`。

### Keyboard Interactions

| Key     | Description                     |
| ------- | ------------------------------- |
| `Space` | 切换选中 / 未选中（或退出半选） |
