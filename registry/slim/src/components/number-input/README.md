# Number Input

数值输入控件，带增减按钮。基于 Reka UI `NumberField`，须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/number-input
```

## Usage

## Props

| 属性                 | 说明                                                                                             | 类型                                                       | 默认值               |
| -------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | -------------------- |
| `as`                 | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                  | `AsTag \| Component`                                       | `'div'`              |
| `asChild`            | 将根节点行为合并到子元素                                                                         | `boolean`                                                  | —                    |
| `modelValue`         | 受控值                                                                                           | `number \| null`                                           | —                    |
| `defaultValue`       | 非受控初始值                                                                                     | `number`                                                   | —                    |
| `min`                | 允许的最小值                                                                                     | `number`                                                   | —                    |
| `max`                | 允许的最大值                                                                                     | `number`                                                   | —                    |
| `step`               | 每次增减的步长                                                                                   | `number`                                                   | `1`                  |
| `stepSnapping`       | 为 `false` 时不将值吸附到最近的 `step` 增量                                                      | `boolean`                                                  | `true`               |
| `allowInvalid`       | 为 `true` 时保留超出范围或偏离步长网格的键入值；步进交互仍会钳制与吸附                           | `boolean`                                                  | —                    |
| `focusOnChange`      | 值变化时是否聚焦输入框                                                                           | `boolean`                                                  | `true`               |
| `formatOptions`      | 显示值的 `Intl.NumberFormat` 选项，同时影响可键入字符                                            | `Intl.NumberFormatOptions`                                 | —                    |
| `locale`             | 格式化与货币所用 locale                                                                          | `string`                                                   | —                    |
| `disableWheelChange` | 为 `true` 时禁止滚轮改值                                                                         | `boolean`                                                  | —                    |
| `invertWheelChange`  | 为 `true` 时反转滚轮增减方向                                                                     | `boolean`                                                  | —                    |
| `startingValue`      | 空值时首次增减采用的起始值（钳制到 `min`/`max`，不吸附到 `step`；默认 `min`，无 `min` 则为 `0`） | `number`                                                   | —                    |
| `variant`            | 外观变体                                                                                         | `'soft' \| 'outline'`                                      | `'soft'`             |
| `unstyled`           | 移除所有样式类，仅保留布局结构                                                                   | `boolean`                                                  | —                    |
| `size`               | 尺寸                                                                                             | `'sm' \| 'md' \| 'lg'`                                     | `'md'`               |
| `radius`             | 圆角                                                                                             | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`               |
| `placeholder`        | 占位文案                                                                                         | `string`                                                   | —                    |
| `decrementIcon`      | 减少按钮图标（Iconify）                                                                          | `IconifyIconProps['icon']`                                 | `'ri:subtract-line'` |
| `incrementIcon`      | 增加按钮图标（Iconify）                                                                          | `IconifyIconProps['icon']`                                 | `'ri:add-line'`      |
| `id`                 | 控件 `id`；未传时回退到 FormField Context                                                        | `string`                                                   | —                    |
| `name`               | 控件 `name`；未传时回退到 FormField Context                                                      | `string`                                                   | —                    |
| `required`           | 是否必填；会与 FormField Context 的 `required` 合并                                              | `boolean`                                                  | —                    |
| `disabled`           | 是否禁用；会与 FormField Context 的 `disabled` 合并                                              | `boolean`                                                  | —                    |
| `readonly`           | 是否只读；会与 FormField Context 的 `readonly` 合并                                              | `boolean`                                                  | —                    |
| `invalid`            | 是否无效；会与 FormField Context 的 `invalid` 合并                                               | `boolean`                                                  | —                    |
| `class`              | 根节点额外 class                                                                                 | `any`                                                      | —                    |
| `ui`                 | 覆盖 slots 样式                                                                                  | `Partial<NumberInputStyleSlots>`                           | —                    |

## Events

| 事件                | 说明                                                                                 | 参数                         |
| ------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| `update:modelValue` | 值变更时始终触发（清空时为 `undefined`）；可用于 `v-model`                           | `value: number \| undefined` |
| `change`            | 值为有效数字时触发；`undefined` / `null` 时不触发（参数为 `number`，非原生 `Event`） | `value: number`              |
| `focus`             | 输入框获得焦点                                                                       | `event: FocusEvent`          |
| `blur`              | 输入框失去焦点                                                                       | `event: FocusEvent`          |

## Slots

| 插槽             | 说明                                         |
| ---------------- | -------------------------------------------- |
| `decrement-icon` | 自定义减少图标；未传时回退到 `decrementIcon` |
| `increment-icon` | 自定义增加图标；未传时回退到 `incrementIcon` |

## Accessibility

遵循 WAI-ARIA spinbutton 设计模式。基于 Reka UI `NumberField`（`NumberFieldRoot` / `NumberFieldInput` / `NumberFieldIncrement` / `NumberFieldDecrement`）。输入节点设置 `role="spinbutton"`、`aria-roledescription="Number field"`，以及 `aria-valuenow` / `aria-valuemin` / `aria-valuemax`。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`。根节点设置 `data-slot="number-input"`。

### Keyboard Interactions

| Key         | Description            |
| ----------- | ---------------------- |
| `ArrowUp`   | 按 `step` 增加         |
| `ArrowDown` | 按 `step` 减少         |
| `PageUp`    | 按 `step × 10` 增加    |
| `PageDown`  | 按 `step × 10` 减少    |
| `Home`      | 设为 `min`（若已配置） |
| `End`       | 设为 `max`（若已配置） |
| `Enter`     | 提交当前输入并格式化   |
