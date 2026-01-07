import type { PrimitiveProps } from 'reka-ui'
import type { AvatarProps } from '../avatar/avatar.props'
import type { ButtonProps } from '../button/button.props'
import type { CommentStyleProps, CommentStyleSlots } from './comment.style'

export interface CommentProps extends PrimitiveProps {
  avatar?: string | Partial<Omit<AvatarProps, 'class'>>
  author?: string
  datetime?: string
  content?: string
  actions?: ButtonProps[]
  variant?: CommentStyleProps['variant']
  align?: CommentStyleProps['align']
  size?: CommentStyleProps['size']
  radius?: CommentStyleProps['radius']
  class?: any
  ui?: Partial<CommentStyleSlots>
}
