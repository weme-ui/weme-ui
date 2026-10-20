# Checkbox Group

复选框组。须放在 `FormField` 内使用，通过 Context 合并 `id` / `name` / `aria-*` / `data-*`。基于 Reka UI `CheckboxGroupRoot`，按 `items` 渲染多个 `Checkbox`，支持外观变体、方向、最大可选数与 roving focus。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/checkbox-group
```

## Usage

## Props

| 属性                     | 说明                                                                                                                         | 类型                                                       | 默认值       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ |
| `as`                     | 根节点渲染为的元素或组件（Reka UI `Primitive` / RovingFocus）                                                                | `AsTag \| Component`                                       | —            |
| `items`                  | 选项列表（见下方 `CheckboxGroupItem`）                                                                                       | `CheckboxGroupItem[]`                                      | —            |
| `modelValue`             | 受控选中值数组；可用 `v-model`                                                                                               | `CheckboxGroupValue[]`                                     | —            |
| `defaultValue`           | 非受控初始选中值数组                                                                                                         | `CheckboxGroupValue[]`                                     | —            |
| `max`                    | 最大可选数量；达到后未选项会 `aria-disabled`                                                                                 | `number \| null`                                           | —            |
| `rovingFocus`            | 是否启用组内方向键漫游焦点                                                                                                   | `boolean`                                                  | `true`       |
| `loop`                   | roving focus 是否循环                                                                                                        | `boolean`                                                  | —            |
| `dir`                    | 阅读方向（影响水平漫游）                                                                                                     | `'ltr' \| 'rtl'`                                           | —            |
| `variant`                | 外观变体（下传到各项 `Checkbox`）                                                                                            | `'soft' \| 'outline' \| 'card'`                            | `'soft'`     |
| `size`                   | 尺寸                                                                                                                         | `'sm' \| 'md' \| 'lg'`                                     | `'md'`       |
| `radius`                 | 圆角                                                                                                                         | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`       |
| `orientation`            | 布局与漫游方向                                                                                                               | `'horizontal' \| 'vertical'`                               | `'vertical'` |
| `align`                  | 指示器与文案交叉轴对齐                                                                                                       | `'start' \| 'center' \| 'end'`                             | `'start'`    |
| `indicator`              | 指示器位置                                                                                                                   | `'start' \| 'end' \| 'none'`                               | —            |
| `checkedIcon`            | 选中态图标（Iconify）                                                                                                        | `IconifyIconProps['icon']`                                 | —            |
| `checkedIconClass`       | 选中态图标额外 class                                                                                                         | `any`                                                      | —            |
| `indeterminateIcon`      | 半选态图标（Iconify）                                                                                                        | `IconifyIconProps['icon']`                                 | —            |
| `indeterminateIconClass` | 半选态图标额外 class                                                                                                         | `any`                                                      | —            |
| `inverted`               | 反色样式变体                                                                                                                 | `boolean`                                                  | —            |
| `unstyled`               | 移除样式变体类，仅保留结构                                                                                                   | `boolean`                                                  | —            |
| `id`                     | 控件 `id` 前缀；未传时回退到 FormField Context；各项为 `` `${id}-${value}` ``                                                | `string`                                                   | —            |
| `name`                   | 控件 `name`；未传时回退到 FormField Context；各项为 `` `${name}[]` ``                                                        | `string`                                                   | —            |
| `required`               | 是否必填；会与 FormField Context 的 `required` 合并                                                                          | `boolean`                                                  | —            |
| `disabled`               | 是否禁用整组；会与 FormField Context 的 `disabled` 合并                                                                      | `boolean`                                                  | —            |
| `invalid`                | 是否无效；会与 FormField Context 的 `invalid` 合并                                                                           | `boolean`                                                  | —            |
| `class`                  | 根节点额外 class                                                                                                             | `any`                                                      | —            |
| `ui`                     | 覆盖 slots 样式（`root` / `item` / `indicator` / `checkedIcon` / `indeterminateIcon` / `content` / `label` / `description`） | `Partial<CheckboxGroupStyleSlots>`                         | —            |

### CheckboxGroupItem

| 字段                     | 说明                         | 类型                       |
| ------------------------ | ---------------------------- | -------------------------- |
| `value`                  | 选项值（`string \| number`） | `CheckboxGroupValue`       |
| `label`                  | 选项标签                     | `string`                   |
| `description`            | 选项描述                     | `string`                   |
| `disabled`               | 是否禁用该项                 | `boolean`                  |
| `class`                  | 该项额外 class               | `any`                      |
| `checkedIcon`            | 该项选中图标                 | `IconifyIconProps['icon']` |
| `checkedIconClass`       | 该项选中图标 class           | `any`                      |
| `indeterminateIcon`      | 该项半选图标                 | `IconifyIconProps['icon']` |
| `indeterminateIconClass` | 该项半选图标 class           | `any`                      |

## Events

| 事件                | 说明                                                                 | 参数                          |
| ------------------- | -------------------------------------------------------------------- | ----------------------------- |
| `update:modelValue` | 选中集合变更时触发（含 `v-model`）；由 Reka `CheckboxGroupRoot` 转发 | `value: CheckboxGroupValue[]` |
| `change`            | `update:modelValue` 时同步触发                                       | `value: CheckboxGroupValue[]` |

## Slots

| 插槽          | 说明                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| `indicator`   | 覆盖各项指示器；作用域参数 `{ state }`（`'checked' \| 'unchecked' \| 'indeterminate'`） |
| `label`       | 覆盖各项标签；作用域参数 `{ state }`                                                    |
| `description` | 覆盖各项描述；作用域参数 `{ state }`                                                    |

## Accessibility

基于 Reka UI `CheckboxGroupRoot`（默认 `rovingFocus`）。组内各项为 `Checkbox`（`role="checkbox"`、`aria-checked`），并以 `in-group` 渲染：不合并 FormField bindings、不单独注册控件，标签为 `span`（无 `for`）。组根通过 `useFormFieldBindings` 合并 `id` / `name` / `disabled` / `required` / `aria-*` 与字段 `data-*`，并向 FormField 注册为控件。根节点设置 `data-slot="checkbox-group"`。达到 `max` 时未选项会带 `aria-disabled`。

### Keyboard Interactions

| Key                        | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `Tab`                      | 进入 / 离开组（roving focus 时组内仅一项在 Tab 序中） |
| `ArrowUp` / `ArrowDown`    | 垂直方向时在组内移动焦点（`rovingFocus` 为真）        |
| `ArrowLeft` / `ArrowRight` | 水平方向时在组内移动焦点（`rovingFocus` 为真）        |
| `Space`                    | 切换当前焦点项的选中状态                              |
