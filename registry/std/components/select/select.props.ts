import type { AcceptableValue, SelectContentEmits, SelectContentProps, SelectRootEmits, SelectRootProps, SelectTriggerProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { SelectStyleProps, SelectStyleSlots } from './select.style'

export interface SelectOption<T> {
  type?: 'label' | 'item' | 'separator'
  icon?: string
  label?: string
  value: T
  disabled?: boolean
  class?: any
  ui?: Partial<Pick<SelectStyleSlots, 'itemIcon' | 'itemText' | 'itemIndicator'>>
  onSelect?: (value: T | undefined) => void
  [key: string]: any
}

export interface SelectProps<T extends AcceptableValue = AcceptableValue> extends SelectRootProps<T> {
  options?: SelectOption<T>[] | SelectOption<T>[][]
  icon?: string
  selectedIcon?: string
  loadingIcon?: string
  triggerIcon?: string
  scrollUpIcon?: string
  scrollDownIcon?: string
  variant?: SelectStyleProps['variant']
  size?: SelectStyleProps['size']
  radius?: SelectStyleProps['radius']
  reference?: SelectTriggerProps['reference']
  placeholder?: string
  portal?: boolean | string | HTMLElement
  content?: Omit<SelectContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<SelectContentEmits>>
  loading?: boolean
  invalid?: boolean
  syncIcon?: boolean
  class?: any
  ui?: Partial<SelectStyleSlots>
}

export interface SelectEmits<T extends AcceptableValue = AcceptableValue> extends SelectRootEmits<T> {
  change: [value: T | T[] | undefined]
}
