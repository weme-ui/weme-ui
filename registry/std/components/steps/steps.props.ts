import type { StepperRootEmits, StepperRootProps } from 'reka-ui'
import type { StepsStyleProps, StepsStyleSlots } from './steps.style'

export interface StepItem {
  step?: number
  title: string
  description?: string
  icon?: string
  disabled?: boolean
  completed?: boolean
  completedIcon?: string
}

export interface StepsProps extends StepperRootProps {
  items?: StepItem[]
  completedIcon?: string
  color?: StepsStyleProps['color']
  variant?: StepsStyleProps['variant']
  orientation?: StepsStyleProps['orientation']
  size?: StepsStyleProps['size']
  class?: any
  ui?: Partial<StepsStyleSlots>
}

export interface StepsEmits extends StepperRootEmits {}
