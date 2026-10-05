# Button

用于触发操作或事件的按钮组件。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/button
```

## Usage

## Props

| 属性          | 说明                                               | 类型                                                                                                           | 默认值             |
| ------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------ |
| `variant`     | 外观变体                                           | `'primary' \| 'secondary' \| 'soft' \| 'outline' \| 'ghost' \| 'plain' \| 'inverse' \| 'danger' \| 'unstyled'` | `'primary'`        |
| `size`        | 尺寸                                               | `'sm' \| 'md' \| 'lg'`                                                                                         | `'md'`             |
| `radius`      | 圆角                                               | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                     | `'sm'`             |
| `type`        | 原生 button 类型                                   | `'button' \| 'submit' \| 'reset'`                                                                              | `'button'`         |
| `icon`        | 前置图标（Iconify）                                | `IconifyIconProps['icon']`                                                                                     | —                  |
| `label`       | 按钮文案                                           | `string`                                                                                                       | —                  |
| `loadingIcon` | 加载中图标（Iconify）                              | `IconifyIconProps['icon']`                                                                                     | `'ri:loader-line'` |
| `loadingText` | 加载中文案；未传时回退到 `label`                   | `string`                                                                                                       | —                  |
| `disabled`    | 是否禁用                                           | `boolean`                                                                                                      | —                  |
| `loading`     | 是否加载中                                         | `boolean`                                                                                                      | —                  |
| `unstyled`    | 是否去掉默认样式                                   | `boolean`                                                                                                      | —                  |
| `class`       | 根节点额外 class                                   | `any`                                                                                                          | —                  |
| `ui`          | 覆盖 slots 样式（`root` / `icon` / `label`）       | `Partial<ButtonStyleSlots>`                                                                                    | —                  |
| `onClick`     | 点击回调（支持异步；异步执行期间自动进入 loading） | `((event: MouseEvent) => void \| Promise<void>) \| Array<((event: MouseEvent) => void \| Promise<void>)>`      | —                  |

## Slots

| 插槽           | 说明                                                 |
| -------------- | ---------------------------------------------------- |
| `icon`         | 自定义前置图标，作用域参数：`{ icon }`               |
| `label`        | 自定义文案，作用域参数：`{ label }`                  |
| `loading-icon` | 自定义加载图标，作用域参数：`{ loadingIcon }`        |
| `loading-text` | 自定义加载文案，作用域参数：`{ label, loadingText }` |
