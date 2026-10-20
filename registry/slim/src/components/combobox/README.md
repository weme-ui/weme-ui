# Combobox

可筛选的组合框选择器。基于 Reka UI `Combobox`，须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。选项由 `items`（`useGroupItems`）驱动，支持分组、标签、分隔线、描述与多选（`multiple`）。单选时锚点展示选中项标签；多选时展示各项图标、末项标签与数量。弹出层内含筛选输入框。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/combobox
```

## Usage

## Props

| 属性                      | 说明                                                                                         | 类型                                                                                                   | 默认值                     |
| ------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------- |
| `as`                      | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                              | `any`                                                                                                  | —                          |
| `asChild`                 | 是否合并到子元素（Reka UI `Primitive`）                                                      | `boolean`                                                                                              | —                          |
| `modelValue`              | 受控选中值；`multiple` 为 `true` 时为数组；可用 `v-model`                                    | `ComboboxValue \| ComboboxValue[]`                                                                     | —                          |
| `defaultValue`            | 非受控初始选中值                                                                             | `ComboboxValue \| ComboboxValue[]`                                                                     | —                          |
| `multiple`                | 是否多选                                                                                     | `boolean`                                                                                              | `false`                    |
| `open`                    | 受控弹出层开关                                                                               | `boolean`                                                                                              | —                          |
| `defaultOpen`             | 非受控初始打开状态                                                                           | `boolean`                                                                                              | —                          |
| `items`                   | 选项列表；支持扁平或二维分组，以及 `label` / `item` / `separator`                            | `ComboboxItems`                                                                                        | —                          |
| `variant`                 | 外观变体                                                                                     | `'soft' \| 'outline'`                                                                                  | `'soft'`                   |
| `size`                    | 尺寸                                                                                         | `'sm' \| 'md' \| 'lg'`                                                                                 | `'md'`                     |
| `radius`                  | 圆角                                                                                         | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                             | `'md'`                     |
| `prefix`                  | 前缀文案（无 `prefix` 插槽、无选中项图标且无 `prefixIcon` 时展示）                           | `string`                                                                                               | —                          |
| `suffix`                  | 后缀文案（无 `suffix` 插槽且无 `suffixIcon` / loading 时展示）；位于触发器内                 | `string`                                                                                               | —                          |
| `prefixIcon`              | 前缀图标（Iconify）；单选且有选中项 `selectedIcon` / `icon` 时优先显示选中项图标             | `IconifyIconProps['icon']`                                                                             | —                          |
| `suffixIcon`              | 后缀 / 触发器图标（Iconify）；`loading` 时改显示 `loadingIcon`                               | `IconifyIconProps['icon']`                                                                             | `'ri:expand-up-down-line'` |
| `loadingIcon`             | 加载中图标（Iconify）；显示在触发器位置                                                      | `IconifyIconProps['icon']`                                                                             | `'ri:loader-line'`         |
| `clearable`               | 有值且未禁用时显示清除控件（`ComboboxCancel`）                                               | `boolean`                                                                                              | —                          |
| `clearIcon`               | 清除图标（Iconify）                                                                          | `IconifyIconProps['icon']`                                                                             | `'ri:close-line'`          |
| `emptyText`               | 无匹配项时的空状态文案                                                                       | `string`                                                                                               | —                          |
| `emptyIcon`               | 空状态图标（Iconify）                                                                        | `IconifyIconProps['icon']`                                                                             | —                          |
| `itemIndicatorIcon`       | 选中项指示图标（Iconify）                                                                    | `IconifyIconProps['icon']`                                                                             | `'ri:check-line'`          |
| `placeholder`             | 弹出层内筛选输入框的占位文案                                                                 | `string`                                                                                               | —                          |
| `reference`               | 定位参考元素；透传至 `ComboboxAnchor`                                                        | `ComboboxAnchorProps['reference']`                                                                     | —                          |
| `portalProps`             | 透传至 `ComboboxPortal`                                                                      | `Partial<ComboboxPortalProps>`                                                                         | —                          |
| `contentProps`            | 透传至 `ComboboxContent`（默认 `align: 'start'`、`side: 'bottom'`、`position: 'popper'` 等） | `Partial<Omit<ComboboxContentProps, 'as' \| 'asChild'>> & Partial<EmitsToProps<ComboboxContentEmits>>` | —                          |
| `openOnFocus`             | 筛选输入框聚焦时是否打开列表                                                                 | `boolean`                                                                                              | `false`                    |
| `openOnClick`             | 点击筛选输入框时是否打开列表                                                                 | `boolean`                                                                                              | `false`                    |
| `resetSearchTermOnBlur`   | 失焦时是否重置搜索词                                                                         | `boolean`                                                                                              | `true`                     |
| `resetSearchTermOnSelect` | 选中后是否重置搜索词                                                                         | `boolean`                                                                                              | `true`                     |
| `resetModelValueOnClear`  | 清除时是否将 `modelValue` 重置为 `null`（多选时为 `[]`）                                     | `boolean`                                                                                              | `false`                    |
| `ignoreFilter`            | 为 `true` 时禁用默认过滤                                                                     | `boolean`                                                                                              | —                          |
| `highlightOnHover`        | 悬停时是否高亮选项                                                                           | `boolean`                                                                                              | `true`                     |
| `loop`                    | 键盘导航是否在首尾循环                                                                       | `boolean`                                                                                              | —                          |
| `by`                      | 比较选中值的字段名或自定义比较函数                                                           | `string \| ((a: ComboboxValue, b: ComboboxValue) => boolean)`                                          | —                          |
| `unmountOnHide`           | 关闭时是否卸载弹出层内容；为 `false` 时仅用 CSS 隐藏                                         | `boolean`                                                                                              | `true`                     |
| `dir`                     | 阅读方向；未传时继承 `ConfigProvider`                                                        | `'ltr' \| 'rtl'`                                                                                       | —                          |
| `unstyled`                | 移除样式变体类，仅保留结构                                                                   | `boolean`                                                                                              | —                          |
| `id`                      | 控件 `id`；未传时回退到 FormField Context                                                    | `string`                                                                                               | —                          |
| `name`                    | 控件 `name`；未传时回退到 FormField Context                                                  | `string`                                                                                               | —                          |
| `loading`                 | 是否加载中；会与 FormField Context 的 `loading` 合并；为真时触发器显示加载图标               | `boolean`                                                                                              | —                          |
| `required`                | 是否必填；会与 FormField Context 的 `required` 合并                                          | `boolean`                                                                                              | —                          |
| `disabled`                | 是否禁用；会与 FormField Context 的 `disabled` 合并                                          | `boolean`                                                                                              | —                          |
| `invalid`                 | 是否无效；会与 FormField Context 的 `invalid` 合并                                           | `boolean`                                                                                              | —                          |
| `class`                   | 根节点额外 class                                                                             | `any`                                                                                                  | —                          |
| `ui`                      | 覆盖 slots 样式（含 `values` / `value` / `valueIcon` / `valueCount` 等多选锚点样式）         | `Partial<ComboboxStyleSlots>`                                                                          | —                          |

`ComboboxValue` 为 `string | number`。`items` 单项常用字段：`label`、`description`、`value`、`icon`、`selectedIcon`、`iconClass`、`class`、`disabled`、`type`（`'label' \| 'item' \| 'separator'`）、`onSelect`。详见 [`useGroupItems`](/weme-ui/slim/composables/use-group-items/)。

## Events

| 事件                | 说明                                                                    | 参数                                      |
| ------------------- | ----------------------------------------------------------------------- | ----------------------------------------- |
| `update:modelValue` | 选中值变更时触发（含 `v-model`）；`multiple` 为 `true` 时值为数组       | `value: ComboboxValue \| ComboboxValue[]` |
| `change`            | 选中值变更时与 `update:modelValue` 一并触发（参数为值，非原生 `Event`） | `value: ComboboxValue \| ComboboxValue[]` |
| `focus`             | 筛选输入框获得焦点                                                      | `event: FocusEvent`                       |
| `blur`              | 筛选输入框失去焦点                                                      | `event: FocusEvent`                       |

## Slots

| 插槽        | 说明                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `prefix`    | 自定义前缀；未传时回退到选中项图标 / `prefixIcon` / `prefix`                                                      |
| `suffix`    | 自定义触发器内后缀；未传时回退到 loading / `suffixIcon` / `suffix`                                                |
| `empty`     | 无匹配项时的空状态；未传时回退到 `emptyIcon` + `emptyText`                                                        |
| `label`     | 自定义分组标签（`type: 'label'`）；未传时回退到 `item.label`                                                      |
| `item`      | 自定义选项内容；作用域参数 `{ item, selected }`；未传时为 `item-icon` / 标签与描述 / 选中指示器                   |
| `item-icon` | 自定义选项图标（嵌在默认 `item` 内）；作用域参数 `{ item, selected }`；未传时按选中态显示 `selectedIcon` / `icon` |

## Accessibility

遵循 WAI-ARIA Combobox 设计模式。基于 Reka UI `Combobox`（`ComboboxRoot` / `ComboboxInput` / `ComboboxContent` / `ComboboxItem` 等）。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`（绑定在弹出层内筛选输入框）。根节点设置 `data-slot="combobox"`，弹出层内容设置 `data-slot="combobox-content"`。

### Keyboard Interactions

| Key                     | Description                  |
| ----------------------- | ---------------------------- |
| `ArrowDown` / `ArrowUp` | 打开列表，或在选项间移动高亮 |
| `Enter`                 | 选中当前高亮项               |
| `Escape`                | 关闭列表                     |
