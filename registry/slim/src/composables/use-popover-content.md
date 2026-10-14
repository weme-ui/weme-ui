# usePopoverContent

根据 open / side / sideOffset 等选项，生成供 motion-v 使用的 `initial` / `animate` / `transition`（返回值为 `ComputedRef`）。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-popover-content
```

## Options

`UsePopoverContentOptions`（均可选）：

| 字段         | 类型                                   | 默认         | 说明                        |
| ------------ | -------------------------------------- | ------------ | --------------------------- |
| `open`       | `Ref<boolean>`                         | `ref(false)` | 是否打开                    |
| `height`     | `MaybeRefOrGetter<number \| 'auto'>`   | —            | 展开高度；关闭时按 `0` 处理 |
| `side`       | `MaybeRefOrGetter<PopoverContentSide>` | `'bottom'`   | 弹出方向                    |
| `sideOffset` | `MaybeRefOrGetter<number>`             | `6`          | 沿 side 的位移偏移          |

## Usage

```ts
import { ref } from 'vue'
import { usePopoverContent } from '~/composables/use-popover-content'

const open = ref(false)
const motion = usePopoverContent({
  open,
  height: 200,
  side: 'bottom',
  sideOffset: 6,
})

// motion.value.initial / animate / transition
```

## Returns

`ComputedRef<UsePopoverContentReturn>`：

| 字段         | 类型                    | 说明                                      |
| ------------ | ----------------------- | ----------------------------------------- |
| `initial`    | `Options['initial']`    | 初始：`height: 0`、`opacity: 0`、`y: 0`   |
| `animate`    | `Options['animate']`    | 打开时高度 / 透明度 / 按 side 的 `y` 偏移 |
| `transition` | `Options['transition']` | spring：`duration: 0.5`、`bounce: 0.2`    |

## Types

### `PopoverContentSide`

`'top' | 'bottom' | 'left' | 'right'`

### `UsePopoverContentOptions`

见上方 Options。

### `UsePopoverContentReturn`

见上方 Returns。
