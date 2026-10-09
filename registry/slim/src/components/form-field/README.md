# Form Field

表单字段布局与状态容器。须放在 `Form` 内使用，基于 TanStack Form 绑定字段，并通过 Context 向控件下发 `id` / `aria-*` / `data-*`。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/form-field
```

## Usage

## Props

| 属性          | 说明                                                                 | 类型                           | 默认值       |
| ------------- | -------------------------------------------------------------------- | ------------------------------ | ------------ |
| `as`          | 渲染为的元素或组件（Reka UI `Primitive`）                            | `AsTag \| Component`           | `'div'`      |
| `asChild`     | 合并到子元素上渲染（Reka UI composition）                            | `boolean`                      | —            |
| `name`        | TanStack Form 字段名（必填）                                         | `string`                       | —            |
| `id`          | 控件 `id`；未传时自动生成                                            | `string`                       | —            |
| `label`       | 标签文案                                                             | `string`                       | —            |
| `description` | 标签下方的说明文案                                                   | `string`                       | —            |
| `hint`        | 标签旁的提示文案                                                     | `string`                       | —            |
| `help`        | 控件下方的帮助文案（校验无效时隐藏，改显示错误）                     | `string`                       | —            |
| `orientation` | 布局方向                                                             | `'horizontal' \| 'vertical'`   | `'vertical'` |
| `nativeLabel` | 是否用原生 `label[for]` 关联控件；为 `false` 时阻止 pointerdown 聚焦 | `boolean`                      | `true`       |
| `required`    | 是否必填（显示必填标记，并写入 Context）                             | `boolean`                      | `false`      |
| `disabled`    | 是否禁用；未传时回退到 `Form` 的 `disabled`                          | `boolean`                      | `false`      |
| `loading`     | 是否加载中；未传时回退到 `Form` 的 `loading`                         | `boolean`                      | `false`      |
| `readonly`    | 是否只读（写入 Context）                                             | `boolean`                      | `false`      |
| `invalid`     | 强制标记无效；未传时根据字段 `meta.isValid`                          | `boolean`                      | `false`      |
| `class`       | 根节点额外 class                                                     | `any`                          | —            |
| `ui`          | 覆盖 slots 样式                                                      | `Partial<FormFieldStyleSlots>` | —            |

## Slots

| 插槽          | 说明                                                            |
| ------------- | --------------------------------------------------------------- |
| `default`     | 字段控件；作用域参数：`{ field }`（TanStack `useField` 返回值） |
| `label`       | 自定义标签；未传时回退到 `label` prop                           |
| `hint`        | 自定义标签旁提示；未传时回退到 `hint` prop                      |
| `description` | 自定义说明；未传时回退到 `description` prop                     |
| `required`    | 自定义必填标记；默认 `*`                                        |
| `errors`      | 自定义错误区；作用域参数：`{ errors }`（字段 `meta.errors`）    |
| `help`        | 自定义帮助文案；未传时回退到 `help` prop（仅在未无效时展示）    |

## Accessibility

根节点通过 `data-valid` / `data-invalid` / `data-dirty` / `data-touched` / `data-filled` / `data-focused` / `data-disabled` 与 `data-orientation` 暴露字段状态。标签使用 Reka UI `Label`：`nativeLabel` 为 `true` 时设置 `for` 指向控件 `id`。子控件可通过 `useFormFieldBindings` 合并 `aria-labelledby`、`aria-describedby`、`aria-invalid` 与上述 `data-*`。
