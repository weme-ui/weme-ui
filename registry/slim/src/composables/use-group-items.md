# useGroupItems

将扁平或分组的 `GroupItems` 规范为二维分组，并派生可选中项列表与当前选中项。

## Installation

```bash
pnpm dlx @weme-ui/weme-ui add weme-ui/slim/use-group-items
```

## Options

`useGroupItems<T, M = false>(items, selectedValue)`：

| 参数            | 类型                  | 说明                                                                    |
| --------------- | --------------------- | ----------------------------------------------------------------------- |
| `items`         | `GroupItems<T>`       | 扁平 `GroupItem<T>[]` 或分组 `GroupItem<T>[][]`                         |
| `selectedValue` | `Ref<S \| undefined>` | 当前选中值；`S` 在单选（`M = false`）为 `T`，多选（`M = true`）为 `T[]` |

## Usage

```ts
import { ref } from 'vue'
import { useGroupItems } from '~/composables/use-group-items'

const selected = ref<string>()
const { groupedItems, flattenedItems, selectedItem } = useGroupItems(
  [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ],
  selected,
)

// 多选：传入第二个泛型参数 M = true
const selectedMany = ref<string[]>()
const multi = useGroupItems<string, true>(
  [
    [
      { type: 'label', label: 'Fruit', value: 'fruit-label' },
      { label: 'Apple', value: 'apple' },
    ],
    [
      { label: 'Carrot', value: 'carrot' },
    ],
  ],
  selectedMany,
)
```

## Returns

| 字段             | 类型                            | 说明                                                                        |
| ---------------- | ------------------------------- | --------------------------------------------------------------------------- |
| `groupedItems`   | `ComputedRef<GroupItem<T>[][]>` | 始终为二维分组；扁平输入会被包成单组                                        |
| `flattenedItems` | `ComputedRef<GroupItem<T>[]>`   | 过滤掉 `type` 为 `separator` / `label` 后的可选项                           |
| `selectedItem`   | `ComputedRef<R \| undefined>`   | 与 `selectedValue` 匹配的项；单选为 `GroupItem<T>`，多选为 `GroupItem<T>[]` |

## Types

### `GroupItemType`

`'label' | 'item' | 'separator'`

### `GroupItem<T>`

| 字段           | 类型                              | 说明             |
| -------------- | --------------------------------- | ---------------- |
| `type`         | `GroupItemType`                   | 可选；项类型     |
| `label`        | `string`                          | 可选；展示文案   |
| `description`  | `string`                          | 可选；描述文案   |
| `value`        | `T`                               | 选项值           |
| `icon`         | `IconifyIconProps['icon']`        | 可选；图标       |
| `selectedIcon` | `IconifyIconProps['icon']`        | 可选；选中态图标 |
| `disabled`     | `boolean`                         | 可选；是否禁用   |
| `class`        | `any`                             | 可选；额外 class |
| `iconClass`    | `any`                             | 可选；图标 class |
| `onSelect`     | `(value: T \| undefined) => void` | 可选；选中回调   |

### `GroupItems<T>`

`GroupItem<T>[] | GroupItem<T>[][]`
