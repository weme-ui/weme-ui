# Tag Group

可选择、可移除的标签组。基于 Reka UI `TagGroup`，须放在 `FormField` 内使用，通过 Context 合并 `id` / `name` / `disabled`。选项由 `items` 驱动；监听 `remove` 后删除控件才会生效。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/tag-group
```

## Usage

## Props

| 属性                     | 说明                                                                                           | 类型                                                                  | 默认值             |
| ------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------ |
| `as`                     | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                                | `any`                                                                 | `'div'`            |
| `asChild`                | 是否合并到子元素（Reka UI `Primitive`）                                                        | `boolean`                                                             | —                  |
| `modelValue`             | 受控选中值；`selectionMode` 为 `multiple` 时为数组；可用 `v-model`                             | `TagGroupItemValue \| TagGroupItemValue[]`                            | —                  |
| `defaultValue`           | 非受控初始选中值                                                                               | `TagGroupItemValue \| TagGroupItemValue[]`                            | —                  |
| `items`                  | 标签列表                                                                                       | `TagGroupItem[]`                                                      | —                  |
| `selectionMode`          | 选择模式；`none` 时不可选中                                                                    | `'none' \| 'single' \| 'multiple'`                                    | `'none'`           |
| `disallowEmptySelection` | 为 `true` 时禁止取消最后一个选中项                                                             | `boolean`                                                             | —                  |
| `escapeKeyBehavior`      | 按 `Escape` 时是否清空选中                                                                     | `'clearSelection' \| 'none'`                                          | `'clearSelection'` |
| `by`                     | 比较选中值的字段名或自定义比较函数                                                             | `string \| ((a: TagGroupItemValue, b: TagGroupItemValue) => boolean)` | —                  |
| `variant`                | 外观变体                                                                                       | `'soft' \| 'outline' \| 'inverted'`                                   | `'soft'`           |
| `size`                   | 尺寸                                                                                           | `'sm' \| 'md' \| 'lg'`                                                | `'md'`             |
| `radius`                 | 圆角                                                                                           | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`            | `'md'`             |
| `closeable`              | 是否显示删除按钮（`TagGroupItemDelete`）                                                       | `boolean`                                                             | `false`            |
| `deleteIcon`             | 删除图标（Iconify）；`closeable` 为真时生效                                                    | `IconifyIconProps['icon']`                                            | `'ri:close-line'`  |
| `loop`                   | 键盘导航是否在首尾循环                                                                         | `boolean`                                                             | `true`             |
| `dir`                    | 阅读方向；未传时继承 `ConfigProvider`                                                          | `'ltr' \| 'rtl'`                                                      | —                  |
| `unstyled`               | 移除样式变体类，仅保留结构                                                                     | `boolean`                                                             | —                  |
| `id`                     | 隐藏 input 的 `id`；未传时回退到 FormField Context                                             | `string`                                                              | —                  |
| `name`                   | 隐藏 input 的 `name`；未传时回退到 FormField Context                                           | `string`                                                              | —                  |
| `disabled`               | 是否禁用整组；会与 FormField Context 的 `disabled` 合并                                        | `boolean`                                                             | —                  |
| `class`                  | 根节点额外 class                                                                               | `any`                                                                 | —                  |
| `ui`                     | 覆盖 slots 样式（`root` / `item` / `itemIcon` / `itemText` / `itemDelete` / `itemDeleteIcon`） | `Partial<TagGroupStyleSlots>`                                         | —                  |

`items` 单项常用字段：`label`、`value`、`icon`、`selectedIcon`、`iconClass`、`class`、`disabled`、`description`。类型为 `Omit<GroupItem<string>, 'type' \| 'onSelect'>`，详见 [`useGroupItems`](/weme-ui/slim/composables/use-group-items/)。

## Events

| 事件                | 说明                                                                                  | 参数                                                           |
| ------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `update:modelValue` | 选中值变更时触发（含 `v-model`；透传自 Reka UI Root）                                 | `value: TagGroupItemValue \| TagGroupItemValue[] \| undefined` |
| `change`            | 选中值变更时触发（由 `@update:modelValue` 转发；参数同选中值，非原生 `Event`）        | `value: TagGroupItemValue \| TagGroupItemValue[] \| undefined` |
| `remove`            | 用户移除标签时触发；**须监听此事件**删除控件才会生效，由消费方从 `items` 中移除对应项 | `values: TagGroupItemValue[]`                                  |

## Slots

| 插槽         | 说明                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `tag-icon`   | 自定义标签图标；作用域参数 `{ item, selected }`；未传且 `item.icon` 存在时渲染 `AnimatedSelectIcon`             |
| `tag-text`   | 自定义标签文案；作用域参数 `{ item, selected }`；未传时回退到 `item.label`                                      |
| `tag-delete` | 自定义删除控件内容；作用域参数 `{ item, selected }`；仅在 `closeable` 且该项未禁用时渲染；未传时用 `deleteIcon` |
| `empty`      | `items` 为空或不存在时的占位内容                                                                                |

## Accessibility

基于 Reka UI `TagGroup`（`TagGroupRoot` / `TagGroupItem` / `TagGroupItemDelete`）与 `RovingFocusGroup`。有标签时根节点 `role="grid"`，单项 `role="row"`；为空时根节点 `role="group"`。`selectionMode="multiple"` 时设置 `aria-multiselectable`。指针按下时单项设置 `aria-pressed`（用于按压缩放反馈）。根节点设置 `data-slot="tag-group"`，并通过 FormField Context 合并隐藏 input 的 `id` / `name`。

### Keyboard Interactions

| Key                        | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `ArrowLeft` / `ArrowRight` | 在标签间移动焦点（Roving Tabindex）                |
| `Home` / `End`             | 将焦点移到首个 / 末个可聚焦标签                    |
| `Enter` / `Space`          | `selectionMode` 非 `none` 时切换选中               |
| `Delete` / `Backspace`     | 已监听 `remove` 时移除当前（或整组选中）标签       |
| `Escape`                   | `escapeKeyBehavior` 为 `clearSelection` 时清空选中 |
