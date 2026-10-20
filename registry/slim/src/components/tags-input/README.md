# Tags Input

可增删标签的输入控件。基于 Reka UI `TagsInput`，须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`；支持前缀、清除与分隔符添加。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/tags-input
```

## Usage

## Props

| 属性           | 说明                                                                                                                      | 类型                                                       | 默认值            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------- |
| `as`           | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                                           | `any`                                                      | —                 |
| `asChild`      | 是否合并到子元素（Reka UI `Primitive`）                                                                                   | `boolean`                                                  | —                 |
| `modelValue`   | 受控标签列表；可用 `v-model`                                                                                              | `TagsInputValue[] \| null`                                 | —                 |
| `defaultValue` | 非受控初始标签列表                                                                                                        | `TagsInputValue[]`                                         | —                 |
| `variant`      | 外观变体                                                                                                                  | `'soft' \| 'outline'`                                      | `'soft'`          |
| `size`         | 尺寸                                                                                                                      | `'sm' \| 'md' \| 'lg'`                                     | `'md'`            |
| `radius`       | 圆角                                                                                                                      | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`            |
| `placeholder`  | 输入框占位文案                                                                                                            | `string`                                                   | —                 |
| `prefix`       | 前缀文案（无 `prefix` 插槽且无 `prefixIcon` 时展示）                                                                      | `string`                                                   | —                 |
| `prefixIcon`   | 前缀图标（Iconify）                                                                                                       | `IconifyIconProps['icon']`                                 | —                 |
| `itemIcon`     | 标签项图标（Iconify）；见 props 类型                                                                                      | `IconifyIconProps['icon']`                                 | —                 |
| `clearIcon`    | 标签删除与清除全部共用的图标（Iconify）                                                                                   | `IconifyIconProps['icon']`                                 | `'ri:close-line'` |
| `clearable`    | 有标签且未禁用时显示清除全部控件                                                                                          | `boolean`                                                  | —                 |
| `delimiter`    | 触发添加标签的字符或正则；也用于粘贴拆分                                                                                  | `string \| RegExp`                                         | `','`             |
| `addOnPaste`   | 粘贴时是否按 `delimiter` 拆分并添加标签                                                                                   | `boolean`                                                  | —                 |
| `addOnTab`     | 按 `Tab` 时是否添加当前输入为标签                                                                                         | `boolean`                                                  | —                 |
| `addOnBlur`    | 失焦时是否添加当前输入为标签                                                                                              | `boolean`                                                  | —                 |
| `duplicate`    | 是否允许重复标签                                                                                                          | `boolean`                                                  | —                 |
| `max`          | 最大标签数；`0` 表示不限制                                                                                                | `number`                                                   | `0`               |
| `convertValue` | 将输入字符串转为标签值（对象值场景必填）                                                                                  | `(value: string) => TagsInputValue`                        | —                 |
| `displayValue` | 标签展示文案                                                                                                              | `(value: TagsInputValue) => string`                        | —                 |
| `dir`          | 阅读方向；未传时继承 `ConfigProvider`                                                                                     | `'ltr' \| 'rtl'`                                           | —                 |
| `unstyled`     | 移除样式变体类，仅保留结构                                                                                                | `boolean`                                                  | —                 |
| `id`           | 控件 `id`；未传时回退到 FormField Context                                                                                 | `string`                                                   | —                 |
| `name`         | 控件 `name`；未传时回退到 FormField Context                                                                               | `string`                                                   | —                 |
| `required`     | 是否必填；会与 FormField Context 的 `required` 合并                                                                       | `boolean`                                                  | —                 |
| `disabled`     | 是否禁用；会与 FormField Context 的 `disabled` 合并                                                                       | `boolean`                                                  | —                 |
| `invalid`      | 是否无效；会与 FormField Context 的 `invalid` 合并                                                                        | `boolean`                                                  | —                 |
| `class`        | 根节点额外 class                                                                                                          | `any`                                                      | —                 |
| `ui`           | 覆盖 slots 样式（`root` / `prefix` / `prefixIcon` / `item` / `itemIcon` / `itemText` / `itemDelete` / `input` / `clear`） | `Partial<TagsInputStyleSlots>`                             | —                 |

`TagsInputValue` 为 `string`。

## Events

| 事件                | 说明                                                          | 参数                       |
| ------------------- | ------------------------------------------------------------- | -------------------------- |
| `update:modelValue` | 标签列表变更时触发（含 `v-model`；透传自 Reka UI Root）       | `values: TagsInputValue[]` |
| `addTag`            | 添加标签时触发（透传自 Reka UI Root）                         | `value: TagsInputValue`    |
| `removeTag`         | 移除标签时触发（透传自 Reka UI Root）                         | `value: TagsInputValue`    |
| `invalid`           | 添加无效（如超限、重复且未允许）时触发（透传自 Reka UI Root） | `value: TagsInputValue`    |
| `focus`             | 输入框获得焦点                                                | `event: FocusEvent`        |
| `blur`              | 输入框失去焦点                                                | `event: FocusEvent`        |

## Slots

| 插槽        | 说明                                             |
| ----------- | ------------------------------------------------ |
| `prefix`    | 自定义前缀；未传时回退到 `prefixIcon` / `prefix` |
| `cleanIcon` | 自定义清除全部图标；未传时回退到 `clearIcon`     |

## Accessibility

基于 Reka UI `TagsInput`（`TagsInputRoot` / `TagsInputInput` / `TagsInputItem` / `TagsInputItemDelete` / `TagsInputClear`）。通过 `useFormFieldBindings` 将 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*` 合并到输入框，并向 FormField 注册控件。根节点设置 `data-slot="tags-input"`，并透传 FormField 的 `data-*`。

### Keyboard Interactions

| Key                        | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `Enter`                    | 将当前输入添加为标签                                                 |
| `Tab`                      | `addOnTab` 为真时将当前输入添加为标签                                |
| `,`（或 `delimiter`）      | 输入分隔符时添加标签                                                 |
| `Backspace`                | 光标在输入开头且无选中标签时选中末个标签；已选中时删除该标签         |
| `Delete`                   | 已选中标签时删除该标签                                               |
| `ArrowLeft` / `ArrowRight` | 光标在输入开头时在标签间移动选中（Roving）；离开末个标签后回到输入框 |
