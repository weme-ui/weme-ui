import type { IconifyIconProps } from '@iconify/vue'
import type { ComputedRef, Ref } from 'vue'
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

interface UseGroupItemsReturn<T, R> {
  groupedItems: ComputedRef<GroupItem<T>[][]>
  flattenedItems: ComputedRef<GroupItem<T>[]>
  selectedItem: ComputedRef<R | undefined>
}

export function useGroupItems<
  T,
  M extends boolean = false,
  S = M extends false ? T : T[],
  R = M extends false ? GroupItem<T> : GroupItem<T>[],
>(
  items: GroupItems<T>,
  selectedValue: Ref<S | undefined>,
): UseGroupItemsReturn<T, R> {
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

  const selectedItem = computed<R | undefined>(
    () => {
      if (selectedValue.value) {
        if (Array.isArray(selectedValue.value) && selectedValue.value.length) {
          return flattenedItems.value.filter(
            item => (selectedValue.value as T[]).includes(item.value),
          ) as GroupItem<T>[] as R
        }
        else {
          return flattenedItems.value.find(
            item => item.value === selectedValue.value,
          ) as GroupItem<T> | undefined as R
        }
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
