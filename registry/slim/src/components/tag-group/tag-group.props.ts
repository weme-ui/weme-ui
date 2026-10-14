import type { IconifyIconProps } from '@iconify/vue'
import type { TagGroupRootEmits, TagGroupRootProps } from 'reka-ui'
import type { TagGroupStyleProps, TagGroupStyleSlots } from './tag-group.style'
import type { GroupItem } from '~/composables/use-group-items'

export type TagGroupItem = Omit<GroupItem<string>, 'type' | 'onSelect'>
export type TagGroupItemValue = TagGroupItem['value']

export interface TagGroupProps extends TagGroupRootProps<TagGroupItemValue> {
  id?: string
  name?: string
  items?: TagGroupItem[]
  variant?: TagGroupStyleProps['variant']
  radius?: TagGroupStyleProps['radius']
  size?: TagGroupStyleProps['size']
  deleteIcon?: IconifyIconProps['icon']
  unstyled?: boolean
  closeable?: boolean
  class?: any
  ui?: Partial<TagGroupStyleSlots>
}

export interface TagGroupEmits extends TagGroupRootEmits<TagGroupItemValue> {
  change: [value: TagGroupItemValue | TagGroupItemValue[] | undefined]
}
