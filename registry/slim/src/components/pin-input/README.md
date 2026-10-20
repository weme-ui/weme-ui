# Pin Input

分段 PIN / OTP 输入控件。基于 Reka UI `PinInput`，须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/pin-input
```

## Usage

## Props

| 属性           | 说明                                                                                  | 类型                                                       | 默认值   |
| -------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| `as`           | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                       | `AsTag \| Component`                                       | `'div'`  |
| `asChild`      | 将根节点行为合并到子元素                                                              | `boolean`                                                  | —        |
| `modelValue`   | 受控值；`type="text"` 时为 `string[]`，`type="number"` 时为 `(number \| undefined)[]` | `string[] \| (number \| undefined)[] \| null`              | —        |
| `defaultValue` | 非受控初始值                                                                          | `string[] \| (number \| undefined)[]`                      | —        |
| `length`       | 输入格数量                                                                            | `number`                                                   | `4`      |
| `type`         | 单格输入类型                                                                          | `'text' \| 'number'`                                       | `'text'` |
| `placeholder`  | 空格占位字符                                                                          | `string`                                                   | `'○'`    |
| `mask`         | 为 `true` 时按密码遮罩显示                                                            | `boolean`                                                  | —        |
| `otp`          | 为 `true` 时启用 OTP 自动填充相关行为，并限制跳格填写                                 | `boolean`                                                  | `true`   |
| `dir`          | 阅读方向；未传时继承 `ConfigProvider` 或默认 LTR                                      | `'ltr' \| 'rtl'`                                           | —        |
| `variant`      | 外观变体                                                                              | `'soft' \| 'outline'`                                      | `'soft'` |
| `unstyled`     | 移除所有样式类，仅保留布局结构                                                        | `boolean`                                                  | —        |
| `size`         | 尺寸                                                                                  | `'sm' \| 'md' \| 'lg'`                                     | `'md'`   |
| `radius`       | 圆角（作用于单格）                                                                    | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`   |
| `id`           | 根节点 `id`；未传时回退到 FormField Context                                           | `string`                                                   | —        |
| `name`         | 根节点 `name`；未传时回退到 FormField Context；各输入格为 `{name}-{n}`                | `string`                                                   | —        |
| `required`     | 是否必填；会与 FormField Context 的 `required` 合并                                   | `boolean`                                                  | —        |
| `disabled`     | 是否禁用；会与 FormField Context 的 `disabled` 合并                                   | `boolean`                                                  | —        |
| `invalid`      | 是否无效；会与 FormField Context 的 `invalid` 合并（影响样式）                        | `boolean`                                                  | —        |
| `class`        | 根节点额外 class                                                                      | `any`                                                      | —        |
| `ui`           | 覆盖 slots 样式                                                                       | `Partial<PinInputStyleSlots>`                              | —        |

## Events

| 事件                | 说明                             | 参数                                         |
| ------------------- | -------------------------------- | -------------------------------------------- |
| `update:modelValue` | 值变更时触发（可用于 `v-model`） | `value: string[] \| (number \| undefined)[]` |
| `complete`          | 全部输入格填写完成时触发         | `value: string[] \| (number \| undefined)[]` |
| `focus`             | 任一输入格获得焦点               | `event: FocusEvent`                          |
| `blur`              | 任一输入格失去焦点               | `event: FocusEvent`                          |

## Accessibility

基于 Reka UI `PinInput`（`PinInputRoot` / `PinInputInput`）。各输入格带 `aria-label`（如 `pin input 1 of N`）；`otp` 时使用 `autocomplete="one-time-code"`。根节点合并 FormField Context 的 `id` / `name` / `required` / `disabled` 与字段 `data-*`，并向 FormField 注册控件；设置 `data-slot="pin-input"`；各格 `name` 为 `{name}-{n}`。焦点变化会调用 FormField 的 `handleControlFocus` / `handleControlBlur`。

### Keyboard Interactions

| Key                        | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `ArrowLeft` / `ArrowRight` | 在相邻输入格间移动焦点（OTP 模式下不越过首个空格） |
| `Home`                     | 聚焦第一个输入格                                   |
| `End`                      | 聚焦最后一个输入格                                 |
| `Backspace`                | 清除当前格；若已空则回退并清除上一格               |
| `Delete`                   | 清除当前格（不移动焦点）                           |
