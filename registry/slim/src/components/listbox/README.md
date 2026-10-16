# Listbox

可筛选的列表选择器。基于 Reka UI `Listbox`，须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。选项由 `items`（`useGroupItems`）驱动，支持分组、标签、分隔线、描述与多选（`multiple`）。顶部含筛选输入框；按 `label` / `description`（或 `value`）过滤，并保留分组结构。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/listbox
```

## Usage

## Props

| 属性                | 说明                                                              | 类型                                                        | 默认值              |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- | ------------------- |
| `as`                | 根节点渲染为的元素或组件（Reka UI `Primitive`）                   | `any`                                                       | —                   |
| `asChild`           | 是否合并到子元素（Reka UI `Primitive`）                           | `boolean`                                                   | —                   |
| `modelValue`        | 受控选中值；`multiple` 为 `true` 时为数组；可用 `v-model`         | `ListboxValue \| ListboxValue[]`                            | —                   |
| `defaultValue`      | 非受控初始选中值                                                  | `ListboxValue \| ListboxValue[]`                            | —                   |
| `multiple`          | 是否多选                                                          | `boolean`                                                   | `false`             |
| `items`             | 选项列表；支持扁平或二维分组，以及 `label` / `item` / `separator` | `ListboxItems`                                              | —                   |
| `filter`            | 筛选关键词；可用 `v-model:filter`；空字符串时不过滤               | `string`                                                    | `''`                |
| `variant`           | 外观变体                                                          | `'soft' \| 'outline'`                                       | `'soft'`            |
| `size`              | 尺寸                                                              | `'sm' \| 'md' \| 'lg'`                                      | `'md'`              |
| `radius`            | 圆角                                                              | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`  | `'md'`              |
| `placeholder`       | 筛选输入框占位文案                                                | `string`                                                    | —                   |
| `emptyText`         | 空状态标题；传给默认 `Empty` 的 `title`                           | `string`                                                    | `'无数据'`          |
| `emptyIcon`         | 空状态图标（Iconify）；传给默认 `Empty` 的 `icon`                 | `IconifyIconProps['icon']`                                  | `'ri:inbox-2-line'` |
| `itemIndicatorIcon` | 选中项指示图标（Iconify）                                         | `IconifyIconProps['icon']`                                  | `'ri:check-line'`   |
| `orientation`       | 列表方向；影响方向键导航                                          | `'vertical' \| 'horizontal'`                                | `'vertical'`        |
| `selectionBehavior` | 多选时的选择行为                                                  | `'toggle' \| 'replace'`                                     | `'toggle'`          |
| `highlightOnHover`  | 悬停时是否高亮选项                                                | `boolean`                                                   | —                   |
| `loop`              | 键盘导航是否在首尾循环                                            | `boolean`                                                   | —                   |
| `by`                | 比较选中值的字段名或自定义比较函数                                | `string \| ((a: ListboxValue, b: ListboxValue) => boolean)` | —                   |
| `dir`               | 阅读方向；未传时继承 `ConfigProvider`                             | `'ltr' \| 'rtl'`                                            | —                   |
| `unstyled`          | 移除样式变体类，仅保留结构                                        | `boolean`                                                   | —                   |
| `id`                | 控件 `id`；未传时回退到 FormField Context                         | `string`                                                    | —                   |
| `name`              | 控件 `name`；未传时回退到 FormField Context                       | `string`                                                    | —                   |
| `required`          | 是否必填；会与 FormField Context 的 `required` 合并               | `boolean`                                                   | —                   |
| `disabled`          | 是否禁用；会与 FormField Context 的 `disabled` 合并               | `boolean`                                                   | —                   |
| `invalid`           | 是否无效；会与 FormField Context 的 `invalid` 合并                | `boolean`                                                   | —                   |
| `class`             | 根节点额外 class                                                  | `any`                                                       | —                   |
| `ui`                | 覆盖 slots 样式（含 `filter` / `filterInput` / `itemContent` 等） | `Partial<ListboxStyleSlots>`                                | —                   |

`ListboxValue` 为 `string | number`。`items` 单项常用字段：`label`、`description`、`value`、`icon`、`selectedIcon`、`iconClass`、`class`、`disabled`、`type`（`'label' \| 'item' \| 'separator'`）、`onSelect`。详见 [`useGroupItems`](/weme-ui/slim/composables/use-group-items/)。

## Events

| 事件                | 说明                                                                    | 参数                                    |
| ------------------- | ----------------------------------------------------------------------- | --------------------------------------- |
| `update:modelValue` | 选中值变更时触发（含 `v-model`）；`multiple` 为 `true` 时值为数组       | `value: ListboxValue \| ListboxValue[]` |
| `update:filter`     | 筛选关键词变更时触发（含 `v-model:filter`）                             | `value: string`                         |
| `change`            | 选中值变更时与 `update:modelValue` 一并触发（参数为值，非原生 `Event`） | `value: ListboxValue \| ListboxValue[]` |
| `focus`             | 筛选输入框获得焦点                                                      | `event: FocusEvent`                     |
| `blur`              | 筛选输入框失去焦点                                                      | `event: FocusEvent`                     |

## Slots

| 插槽           | 说明                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `empty`        | 无可见选项时的空状态（含筛选后无匹配）；未传时渲染 `Empty`（`emptyIcon` + `emptyText`）                           |
| `group-label`  | 自定义分组标签（`type: 'label'`）；未传时回退到 `item.label`                                                      |
| `item`         | 自定义选项内容；作用域参数 `{ item, selected }`；未传时为 `item-icon` / `item-content`（选中指示器在插槽外）      |
| `item-icon`    | 自定义选项图标（嵌在默认 `item` 内）；作用域参数 `{ item, selected }`；未传时按选中态显示 `selectedIcon` / `icon` |
| `item-content` | 自定义选项文案区（嵌在默认 `item` 内）；作用域参数 `{ item, selected }`；未传时渲染 `label` / `description`       |

## Accessibility

遵循 WAI-ARIA Listbox 设计模式。基于 Reka UI `Listbox`（`ListboxRoot` / `ListboxFilter` / `ListboxContent` / `ListboxItem` 等）。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`（绑定在筛选输入框；筛选容器同步字段 `data-*`）。根节点设置 `data-slot="listbox"`。选项使用 `role="option"`，并以 `data-state` / `data-highlighted` 反映选中与高亮。

### Keyboard Interactions

| Key                     | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `ArrowDown` / `ArrowUp` | 在选项间移动高亮（`orientation` 为水平时为左右键） |
| `Home` / `End`          | 将高亮移到首个 / 末个选项                          |
| `Enter` / `Space`       | 选中当前高亮项                                     |
| `Ctrl` / `Cmd` + `A`    | `multiple` 为真时全选                              |
