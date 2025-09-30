import type { InputPasswordStyleSlots } from './input-password.style'
import type { InputProps } from './input.props'
import type { InputStyleSlots } from './input.style'

export interface InputPasswordProps extends InputProps {
  type?: 'text' | 'password'
  showInvisibleButton?: boolean
  class?: any
  ui?: Partial<InputStyleSlots> & Partial<Omit<InputPasswordStyleSlots, 'base'>>
}

export interface InputPasswordEmits {
  (e: 'invisibleChange', payload: boolean): void
}
