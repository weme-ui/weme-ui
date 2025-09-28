import type { StepperRootProps } from 'reka-ui'
import type { StepperStyleProps, StepperStyleSlots } from './stepper.style'

export interface StepperItem {
  value?: string | number
  icon?: string
  title?: string
  description?: string
  class?: any
  ui?: Partial<Omit<StepperStyleSlots, 'base'>>
}

export interface StepperProps extends StepperRootProps {
  steps?: StepperItem[]
  completedIcon?: string
  color?: StepperStyleProps['color']
  orientation?: StepperStyleProps['orientation']
  class?: any
  ui?: Partial<StepperStyleSlots>
}

export interface StepperEmits {
  next: [item: StepperItem]
  prev: [item: StepperItem]
}
