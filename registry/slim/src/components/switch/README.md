# Switch

开关控件。须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。基于 Reka UI `SwitchRoot` / `SwitchThumb`，支持外观变体、尺寸、圆角、加载态与拇指指示图标。泛型 `T extends boolean`（默认 `boolean`）用于 `modelValue` / `trueValue` / `falseValue`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/switch
```

## Usage

## Props

| 属性            | 说明                                                                                | 类型                                                       | 默认值             |
| --------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------ |
| `as`            | 根节点渲染为的元素或组件（Reka UI `Primitive`）                                     | `AsTag \| Component`                                       | —                  |
| `asChild`       | 合并到子元素上渲染（Reka UI composition）                                           | `boolean`                                                  | —                  |
| `modelValue`    | 受控值；可用 `v-model`                                                              | `T \| null`                                                | —                  |
| `defaultValue`  | 非受控初始值                                                                        | `T`                                                        | —                  |
| `trueValue`     | 开启时写入 model 的值                                                               | `T`                                                        | `true`             |
| `falseValue`    | 关闭时写入 model 的值                                                               | `T`                                                        | `false`            |
| `value`         | 随表单提交的 `name` 对应值                                                          | `string`                                                   | —                  |
| `variant`       | 外观变体                                                                            | `'soft' \| 'outline'`                                      | `'soft'`           |
| `size`          | 尺寸                                                                                | `'sm' \| 'md' \| 'lg'`                                     | `'md'`             |
| `radius`        | 圆角                                                                                | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'`           |
| `indicatorIcon` | 拇指指示图标（Iconify）；无 checked / unchecked 图标时的回退                        | `IconifyIconProps['icon']`                                 | —                  |
| `loadingIcon`   | 加载中图标（Iconify）；`loading` 为真时显示                                         | `IconifyIconProps['icon']`                                 | `'ri:loader-line'` |
| `checkedIcon`   | 选中态拇指图标（Iconify）                                                           | `IconifyIconProps['icon']`                                 | —                  |
| `uncheckedIcon` | 未选中态拇指图标（Iconify）                                                         | `IconifyIconProps['icon']`                                 | —                  |
| `inverted`      | 反色拇指（`true` 时拇指为 inverted 色，否则为 base 色）                             | `boolean`                                                  | —                  |
| `unstyled`      | 移除样式变体类，仅保留结构                                                          | `boolean`                                                  | —                  |
| `id`            | 控件 `id`；未传时回退到 FormField Context                                           | `string`                                                   | —                  |
| `name`          | 控件 `name`；未传时回退到 FormField Context                                         | `string`                                                   | —                  |
| `loading`       | 是否加载中；会与 FormField Context 的 `loading` 合并                                | `boolean`                                                  | —                  |
| `required`      | 是否必填；会与 FormField Context 的 `required` 合并                                 | `boolean`                                                  | —                  |
| `disabled`      | 是否禁用；会与 FormField Context 的 `disabled` 合并                                 | `boolean`                                                  | —                  |
| `invalid`       | 是否无效；会与 FormField Context 的 `invalid` 合并；不转发到 Reka `SwitchRoot`      | `boolean`                                                  | —                  |
| `class`         | 根节点额外 class                                                                    | `any`                                                      | —                  |
| `ui`            | 覆盖 slots 样式（`root` / `thumb` / `indicator` / `checkedIcon` / `uncheckedIcon`） | `Partial<SwitchStyleSlots>`                                | —                  |

## Events

| 事件                | 说明                                                          | 参数       |
| ------------------- | ------------------------------------------------------------- | ---------- |
| `update:modelValue` | 开关状态变更时触发（含 `v-model`）；由 Reka `SwitchRoot` 转发 | `value: T` |
| `change`            | `update:modelValue` 时同步触发                                | `value: T` |

## Slots

| 插槽             | 说明                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `indicator`      | 自定义拇指指示内容；作用域参数 `{ checked }`；未传时按 loading / checked / unchecked / `indicatorIcon` 回退 |
| `checked-icon`   | 选中时自定义图标；未传时回退到 `checkedIcon`                                                                |
| `unchecked-icon` | 未选中时自定义图标；未传时回退到 `uncheckedIcon`                                                            |

## Accessibility

遵循 WAI-ARIA Switch 设计模式。基于 Reka UI `SwitchRoot`（`role="switch"`、`aria-checked`、`data-state`）。按下时额外设置 `aria-pressed`。通过 `useFormFieldBindings` 合并 FormField Context 的 `id`、`name`、`disabled`、`required`、`aria-labelledby`、`aria-describedby`、`aria-invalid` 与字段 `data-*`。根节点设置 `data-slot="switch"`。

### Keyboard Interactions

| Key     | Description |
| ------- | ----------- |
| `Space` | 切换开 / 关 |
| `Enter` | 切换开 / 关 |
