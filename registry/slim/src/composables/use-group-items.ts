import type { IconifyIconProps } from '@iconify/vue'
import type { Ref } from 'vue'
import { computed } from 'vue'

export type GroupItemType = 'label' | 'item' | 'separator'

export interface GroupItem<T> {
  type?: GroupItemType
  label?: string
  description?: string
  value: T
  icon?: IconifyIconProps['icon']
  selectedIcon?: IconifyIconProps['icon']
  disabled?: boolean
  class?: any
  iconClass?: any
  onSelect?: (value: T | undefined) => void
}

export type GroupItems<T> = GroupItem<T>[] | GroupItem<T>[][]

export function useGroupItems<T>(items: GroupItems<T>, selectedValue: Ref<T | undefined>) {
  const groupedItems = computed<GroupItem<T>[][]>(
    () => {
      if (items.length) {
        return Array.isArray(items) && Array.isArray(items[0])
          ? items as GroupItem<T>[][]
          : [items] as GroupItem<T>[][]
      }
      return []
    },
  )

  const flattenedItems = computed<GroupItem<T>[]>(
    () => groupedItems.value.flat().filter(
      item => item.type !== 'separator' && item.type !== 'label',
    ),
  )

  const selectedItem = computed<GroupItem<T> | undefined>(
    () => {
      if (selectedValue.value) {
        return flattenedItems.value.find(
          item => item.value === selectedValue.value,
        )
      }
      return undefined
    },
  )

  return {
    groupedItems,
    flattenedItems,
    selectedItem,
  }
}
