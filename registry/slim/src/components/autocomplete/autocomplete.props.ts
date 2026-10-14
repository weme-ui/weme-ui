import type { IconifyIconProps } from '@iconify/vue'
import type { AutocompleteAnchorProps, AutocompleteContentEmits, AutocompleteContentProps, AutocompletePortalProps, AutocompleteRootEmits, AutocompleteRootProps } from 'reka-ui'
import type { AutocompleteStyleProps, AutocompleteStyleSlots } from './autocomplete.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItems } from '~/composables/use-group-items'
import type { EmitsToProps } from '~/utils/props'

export type AutocompleteValue = NonNullable<AutocompleteRootProps['modelValue']>

export type AutocompleteItems = GroupItems<AutocompleteValue>

export interface AutocompleteProps extends AutocompleteRootProps, FormFieldSharedProps {
  items?: AutocompleteItems
  variant?: AutocompleteStyleProps['variant']
  size?: AutocompleteStyleProps['size']
  radius?: AutocompleteStyleProps['radius']
  prefix?: string
  suffix?: string
  prefixIcon?: IconifyIconProps['icon']
  suffixIcon?: IconifyIconProps['icon']
  loadingIcon?: IconifyIconProps['icon']
  placeholder?: string
  emptyText?: string
  emptyIcon?: IconifyIconProps['icon']
  itemIndicatorIcon?: IconifyIconProps['icon']
  clearable?: boolean
  clearIcon?: IconifyIconProps['icon']
  unstyled?: boolean
  reference?: AutocompleteAnchorProps['reference']
  portalProps?: Partial<AutocompletePortalProps>
  contentProps?: Partial<Omit<AutocompleteContentProps, 'as' | 'asChild'>> & Partial<EmitsToProps<AutocompleteContentEmits>>
  class?: any
  ui?: Partial<AutocompleteStyleSlots>
}

export interface AutocompleteEmits extends AutocompleteRootEmits {
  change: [value: AutocompleteValue]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
