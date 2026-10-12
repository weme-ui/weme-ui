# Password Input

密码输入控件，基于 `Input`，内置可见性切换。须放在 `FormField` 内使用，通过 Context 合并 `id` / `aria-*` / `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/password-input
```

## Usage

## Props

| 属性               | 说明                                                 | 类型                                                       | 默认值              |
| ------------------ | ---------------------------------------------------- | ---------------------------------------------------------- | ------------------- |
| `as`               | 根节点渲染为的元素或组件（Reka UI `Primitive`）      | `any`                                                      | `'div'`             |
| `modelValue`       | 受控值                                               | `string \| number \| null \| undefined`                    | —                   |
| `defaultValue`     | 非受控初始值                                         | `string \| number \| null \| undefined`                    | —                   |
| `visible`          | 密码是否明文显示；可用 `v-model:visible`             | `boolean`                                                  | `false`             |
| `toggleVisibility` | 是否显示可见性切换控件（`suffix` 位）                | `boolean`                                                  | —                   |
| `visibleIcon`      | 明文态图标（Iconify）                                | `IconifyIconProps['icon']`                                 | `'ri:eye-line'`     |
| `invisibleIcon`    | 掩码态图标（Iconify）                                | `IconifyIconProps['icon']`                                 | `'ri:eye-off-line'` |
| `variant`          | 外观变体                                             | `'soft' \| 'outline'`                                      | `'soft'`            |
| `unstyled`         | 移除所有样式类，仅保留布局结构                       | `boolean`                                                  | —                   |
| `size`             | 尺寸                                                 | `'sm' \| 'md' \| 'lg'`                                     | `'md'`              |
| `radius`           | 圆角                                                 | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`              |
| `placeholder`      | 占位文案                                             | `string`                                                   | —                   |
| `prefix`           | 前缀文案（无 `prefix` 插槽且无 `prefixIcon` 时展示） | `string`                                                   | —                   |
| `prefixIcon`       | 前缀图标（Iconify）                                  | `IconifyIconProps['icon']`                                 | —                   |
| `id`               | 控件 `id`；未传时回退到 FormField Context            | `string`                                                   | —                   |
| `name`             | 控件 `name`；未传时回退到 FormField Context          | `string`                                                   | —                   |
| `required`         | 是否必填；会与 FormField Context 的 `required` 合并  | `boolean`                                                  | —                   |
| `disabled`         | 是否禁用；会与 FormField Context 的 `disabled` 合并  | `boolean`                                                  | —                   |
| `readonly`         | 是否只读；会与 FormField Context 的 `readonly` 合并  | `boolean`                                                  | —                   |
| `invalid`          | 是否无效；会与 FormField Context 的 `invalid` 合并   | `boolean`                                                  | —                   |
| `class`            | 根节点额外 class                                     | `any`                                                      | —                   |
| `ui`               | 覆盖 slots 样式（含 `visibility`）                   | `Partial<PasswordInputStyleSlots>`                         | —                   |

相对 `Input` 已省略：`type`（由可见性决定）、`loading` / `loadingIcon`、`suffix` / `suffixIcon`、`clearable` / `clearIcon`、`autocomplete`、`countable` / `maxLength`、`modelModifiers`。

## Events

| 事件                | 说明                                                                           | 参数                                           |
| ------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- |
| `update:modelValue` | 值变更时触发（含 `v-model`）                                                   | `value: string \| number \| null \| undefined` |
| `update:visible`    | 可见性变更时触发（含 `v-model:visible`）                                       | `value: boolean`                               |
| `change`            | 原生 `change` 时触发；参数为当前输入框字符串（非原生 `Event`；透传自 `Input`） | `value: string \| number \| null \| undefined` |
| `enter`             | 在输入框按 `Enter` 时触发；参数为当前输入框值（透传自 `Input`）                | `value: string \| number \| null \| undefined` |
| `focus`             | 获得焦点                                                                       | `event: FocusEvent`                            |
| `blur`              | 失去焦点                                                                       | `event: FocusEvent`                            |

## Slots

| 插槽         | 说明                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| `default`    | 透传至 `Input` 的默认插槽                                                               |
| `visibility` | 自定义可见性控件；作用域参数 `{ visible: boolean }`；未传时为带 `aria-label` 的切换按钮 |

`visibility` 仅在 `toggleVisibility` 为真时渲染。

## Accessibility

基于 `Input`（原生 `<input>` + FormField Context 的 `id` / `name` / `disabled` / `required` / `aria-*` / `data-*`）。开启 `toggleVisibility` 时，可见性切换为 `type="button"`，默认 `aria-label="Toggle password visibility"`；明文时输入 `type="text"`，掩码时 `type="password"`。

### Keyboard Interactions

| Key               | Description                                   |
| ----------------- | --------------------------------------------- |
| `Enter`           | 在输入框内触发 `enter` 事件（行为同 `Input`） |
| `Space` / `Enter` | 在可见性按钮上激活切换                        |
