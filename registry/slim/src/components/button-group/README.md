# Button Group

用于将多个 Button 组成一组，统一尺寸、圆角与禁用态，并支持键盘 Roving Focus 导航。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/button-group
```

## Usage

## Props

| 属性                        | 说明                                                 | 类型                                                                                                           | 默认值         |
| --------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------- |
| `as`                        | 渲染为的元素或组件（Reka UI `Primitive`）            | `AsTag \| Component`                                                                                           | `'div'`        |
| `asChild`                   | 合并到子元素上渲染（Reka UI composition）            | `boolean`                                                                                                      | —              |
| `orientation`               | 排列方向；同时影响箭头键导航方向                     | `'horizontal' \| 'vertical'`                                                                                   | `'horizontal'` |
| `gap`                       | 子项间距                                             | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                               | `'md'`         |
| `variant`                   | 统一下发到子 Button 的外观变体                       | `'primary' \| 'secondary' \| 'soft' \| 'outline' \| 'ghost' \| 'plain' \| 'inverse' \| 'danger' \| 'unstyled'` | `'outline'`    |
| `size`                      | 统一下发到子 Button 的尺寸                           | `'sm' \| 'md' \| 'lg'`                                                                                         | —              |
| `radius`                    | 统一下发到子 Button 的圆角                           | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                     | —              |
| `separator`                 | 是否在子项之间渲染分隔线                             | `boolean`                                                                                                      | —              |
| `disabled`                  | 是否禁用整组（会合并到各子项）                       | `boolean`                                                                                                      | —              |
| `dir`                       | 阅读方向，影响键盘导航（Reka UI `RovingFocusGroup`） | `'ltr' \| 'rtl'`                                                                                               | —              |
| `loop`                      | 键盘导航是否循环                                     | `boolean`                                                                                                      | —              |
| `currentTabStopId`          | 当前焦点项 id（可 `v-model`）                        | `string \| null`                                                                                               | —              |
| `defaultCurrentTabStopId`   | 非受控模式下的初始焦点项 id                          | `string`                                                                                                       | —              |
| `preventScrollOnEntryFocus` | 获得焦点时是否阻止滚动到焦点项                       | `boolean`                                                                                                      | —              |
| `class`                     | 根节点额外 class                                     | `any`                                                                                                          | —              |
| `ui`                        | 覆盖 slots 样式（`root` / `item` / `separator`）     | `Partial<ButtonGroupStyleSlots>`                                                                               | —              |

## Events

| 事件                      | 说明                     | 载荷                                 |
| ------------------------- | ------------------------ | ------------------------------------ |
| `entryFocus`              | 组获得入口焦点时触发     | `event: Event`                       |
| `update:currentTabStopId` | 当前焦点项 id 变化时触发 | `value: string \| null \| undefined` |

## Slots

| 插槽      | 说明                               |
| --------- | ---------------------------------- |
| `default` | 子项内容，通常为多个 `Button` 组件 |

## Accessibility

根节点 `role="group"`，并设置 `aria-orientation`、`aria-disabled`。基于 Reka UI `RovingFocusGroup` / `RovingFocusItem` 实现组内 Roving Tabindex。

### Keyboard Interactions

| Key                        | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `Tab`                      | 进入或离开按钮组（组内仅一项参与 Tab 顺序）            |
| `ArrowLeft` / `ArrowRight` | 水平方向（`orientation="horizontal"`）在子项间移动焦点 |
| `ArrowUp` / `ArrowDown`    | 垂直方向（`orientation="vertical"`）在子项间移动焦点   |
| `Home`                     | 将焦点移到第一个可聚焦子项                             |
| `End`                      | 将焦点移到最后一个可聚焦子项                           |
