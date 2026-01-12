import type { GetStyleProps } from './utils'

export interface ModelModifiers<T = any> {
  string?: string extends T ? boolean : never
  number?: number extends T ? boolean : never
  trim?: string extends T ? boolean : never
  lazy?: boolean
  nullable?: null extends T ? boolean : never
  optional?: boolean
}

export interface FormFieldInjectedProps<T> {
  id?: string
  name?: string
  size?: GetStyleProps<T, 'size'>
  radius?: GetStyleProps<T, 'radius'>
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}
