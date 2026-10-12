# Password Strength

密码强度指示器。基于 `usePasswordStrength` 按长度与字符多样性划分 `tooWeak` / `weak` / `medium` / `strong`，并以分段轨道与可选文案展示结果。

设计上可作为 `PasswordInput` 的**父组件**：将输入放在默认插槽中，由外层传入 `password` 驱动强度展示。二者**互不引用**，安装与使用均需单独添加；`password-strength` 不会拉取 `password-input`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/password-strength
# 若与 PasswordInput 组合使用，需另行安装：
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/password-input
```

## Usage

## Props

| 属性          | 说明                                                          | 类型                                     | 默认值  |
| ------------- | ------------------------------------------------------------- | ---------------------------------------- | ------- |
| `as`          | 根节点渲染为的元素或组件（Reka UI `Primitive`）               | `any`                                    | `'div'` |
| `asChild`     | 是否合并到子元素（Reka UI `Primitive`）                       | `boolean`                                | —       |
| `password`    | 待评估的密码字符串                                            | `string`                                 | —       |
| `options`     | 覆盖强度档位阈值（不可覆盖 `tooWeak`）                        | `UsePasswordStrengthOptions['options']`  | —       |
| `messages`    | 覆盖各档位文案                                                | `UsePasswordStrengthOptions['messages']` | —       |
| `showMessage` | 是否显示强度文案                                              | `boolean`                                | —       |
| `size`        | 尺寸                                                          | `'sm' \| 'md' \| 'lg'`                   | `'md'`  |
| `disabled`    | 为 `true` 时不渲染轨道与文案；根节点设置 `data-disabled`      | `boolean`                                | —       |
| `unstyled`    | 移除样式变体类，仅保留结构                                    | `boolean`                                | —       |
| `class`       | 根节点额外 class                                              | `any`                                    | —       |
| `ui`          | 覆盖 slots 样式（`root` / `track` / `indicator` / `message`） | `Partial<PasswordStrengthStyleSlots>`    | —       |

默认档位（`usePasswordStrength`）：`weak` 需长度 ≥ 8 且多样性 ≥ 2；`medium` ≥ 10 / 3；`strong` ≥ 12 / 4。多样性按是否包含小写、大写、数字、符号累计。默认文案为 `Too weak` / `Weak` / `Medium` / `Strong`。

## Slots

| 插槽      | 说明                                                                                          |
| --------- | --------------------------------------------------------------------------------------------- |
| `default` | 根节点内、轨道之前的自定义内容；典型用法是放入 `PasswordInput`（需另行安装）                  |
| `message` | 自定义强度文案；作用域参数 `{ message: string, length: number }`；未传时回退到 `message` 文本 |

`message` 插槽仅在 `showMessage` 为真且未 `disabled` 时渲染。

## CSS Variables

可在 `*.style.ts` 或 `class` 中使用，例如 `bg-password-strength-too-weak`。

| CSS Variable                         | Value       |
| ------------------------------------ | ----------- |
| `--password-strength-too-weak-color` | `error.9`   |
| `--password-strength-weak-color`     | `error.7`   |
| `--password-strength-medium-color`   | `success.7` |
| `--password-strength-strong-color`   | `success.9` |

`error.9` / `success.7` 等为语义色别名（色板阶），详见 [Tokens](/weme-ui/unocss-preset/docs/theme/tokens/)。

## Accessibility

基于 Reka UI `Primitive`。根节点设置 `data-slot="password-strength"`，禁用时设置 `data-disabled`。强度轨道为 `role="progressbar"`；各分段为 `role="presentation"`，并以 `aria-valuenow` 标记档位键名（`tooWeak` / `weak` / `medium` / `strong`）。开启 `showMessage` 时，文案容器为 `role="status"`，并以 `aria-label` 暴露当前强度文案。
