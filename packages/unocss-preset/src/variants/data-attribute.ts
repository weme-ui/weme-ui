import type { Variant } from 'unocss'
import type { Theme } from '../types'
import { variantGetParameter } from '@unocss/rule-utils'

const alignAttributes = ['start', 'end', 'center']
const motionAttributes = ['to-start', 'to-end', 'from-start', 'from-end']
const orientationAttributes = ['vertical', 'horizontal']
const sideAttributes = ['left', 'right', 'top', 'bottom']
const stateAttributes = ['open', 'closed', 'checked', 'unchecked', 'indeterminate', 'completed', 'indeterminate', 'loading', 'on', 'off', 'active', 'inactive', 'visible', 'hidden', 'drag', 'hover']
const swipeAttributes = ['start', 'move', 'cancel', 'end']
const swipeDirectionAttributes = ['left', 'right', 'up', 'down']

// Extends
const orderAttributes = ['first', 'last', 'middle']

export const dataAttribute: Variant<Theme>[] = [
  // Align
  ...createDataVariants('align', alignAttributes),
  ...createDataVariants('align', alignAttributes, 'group'),
  ...createDataVariants('align', alignAttributes, 'peer'),
  ...createDataVariants('align', alignAttributes, 'previous'),
  ...createDataVariants('align', alignAttributes, 'parent'),
  ...createDataVariants('align', alignAttributes, 'has'),
  ...createDataVariants('align', alignAttributes, 'in'),
  ...createDataVariants('align', alignAttributes, 'not'),

  // Motion
  ...createDataVariants('motion', motionAttributes),
  ...createDataVariants('motion', motionAttributes, 'group'),
  ...createDataVariants('motion', motionAttributes, 'peer'),
  ...createDataVariants('motion', motionAttributes, 'previous'),
  ...createDataVariants('motion', motionAttributes, 'parent'),
  ...createDataVariants('motion', motionAttributes, 'has'),
  ...createDataVariants('motion', motionAttributes, 'in'),
  ...createDataVariants('motion', motionAttributes, 'not'),

  // Orientation
  ...createDataVariants('orientation', orientationAttributes),
  ...createDataVariants('orientation', orientationAttributes, 'group'),
  ...createDataVariants('orientation', orientationAttributes, 'peer'),
  ...createDataVariants('orientation', orientationAttributes, 'previous'),
  ...createDataVariants('orientation', orientationAttributes, 'parent'),
  ...createDataVariants('orientation', orientationAttributes, 'has'),
  ...createDataVariants('orientation', orientationAttributes, 'in'),
  ...createDataVariants('orientation', orientationAttributes, 'not'),

  // Side
  ...createDataVariants('side', sideAttributes),
  ...createDataVariants('side', sideAttributes, 'group'),
  ...createDataVariants('side', sideAttributes, 'peer'),
  ...createDataVariants('side', sideAttributes, 'previous'),
  ...createDataVariants('side', sideAttributes, 'parent'),
  ...createDataVariants('side', sideAttributes, 'has'),
  ...createDataVariants('side', sideAttributes, 'in'),
  ...createDataVariants('side', sideAttributes, 'not'),

  // State
  ...createDataVariants('state', stateAttributes),
  ...createDataVariants('state', stateAttributes, 'group'),
  ...createDataVariants('state', stateAttributes, 'peer'),
  ...createDataVariants('state', stateAttributes, 'previous'),
  ...createDataVariants('state', stateAttributes, 'parent'),
  ...createDataVariants('state', stateAttributes, 'has'),
  ...createDataVariants('state', stateAttributes, 'in'),
  ...createDataVariants('state', stateAttributes, 'not'),

  // Swipe
  ...createDataVariants('swipe', swipeAttributes),
  ...createDataVariants('swipe', swipeAttributes, 'group'),
  ...createDataVariants('swipe', swipeAttributes, 'peer'),
  ...createDataVariants('swipe', swipeAttributes, 'previous'),
  ...createDataVariants('swipe', swipeAttributes, 'parent'),
  ...createDataVariants('swipe', swipeAttributes, 'has'),
  ...createDataVariants('swipe', swipeAttributes, 'in'),
  ...createDataVariants('swipe', swipeAttributes, 'not'),

  // Swipe direction
  ...createDataVariants('swipe-direction', swipeDirectionAttributes),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'group'),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'peer'),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'previous'),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'parent'),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'has'),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'in'),
  ...createDataVariants('swipe-direction', swipeDirectionAttributes, 'not'),

  // Order
  ...createDataVariants('order', orderAttributes),
  ...createDataVariants('order', orderAttributes, 'group'),
  ...createDataVariants('order', orderAttributes, 'peer'),
  ...createDataVariants('order', orderAttributes, 'previous'),
  ...createDataVariants('order', orderAttributes, 'parent'),
  ...createDataVariants('order', orderAttributes, 'has'),
  ...createDataVariants('order', orderAttributes, 'in'),
  ...createDataVariants('order', orderAttributes, 'not'),
]

function createDataVariants(name: string, attributes: string[], tagName: string = ''): Variant[] {
  const variants: Variant[] = []

  attributes.forEach((attr) => {
    const prefix = `${tagName ? `${tagName}-` : ''}${name}-${attr}`

    variants.push({
      name: prefix,
      match(matcher, ctx) {
        const variant = variantGetParameter(prefix, matcher, ctx.generator.config.separators)

        if (variant) {
          const [, rest, label] = variant
          const dataAttribute = `${name}=${attr}`

          const tagSelectorMap: Record<string, string> = {
            group: `&:is(:where(.group${label ? `\\/${label}` : ''})[data-${dataAttribute}] *)`,
            peer: `&:is(:where(.peer${label ? `\\/${label}` : ''})[data-${dataAttribute}] ~ *)`,
            previous: `:where(*[data-${dataAttribute}] + &)`,
            parent: `:where(*[data-${dataAttribute}] > &)`,
            has: `&:has(*[data-${dataAttribute}])`,
            in: `:where(*[data-${dataAttribute}]) &`,
            not: `:not([data-${dataAttribute}])`,
          }

          return tagName === ''
            ? {
                matcher: rest,
                selector: s => `${s}[data-${dataAttribute}]`,
              }
            : {
                matcher: rest,
                handle: (input, next) => next({
                  ...input,
                  parent: `${input.parent ? `${input.parent} $$ ` : ''}${input.selector}`,
                  selector: tagSelectorMap[tagName],
                }),
              }
        }
      },
      multiPass: true,
    })
  })

  return variants
}
