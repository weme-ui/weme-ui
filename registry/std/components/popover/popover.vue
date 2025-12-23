<script lang="ts" setup generic="M extends PopoverMode">
import type { PopoverArrowProps, PopoverContentProps } from 'reka-ui'
import type { PopoverEmits, PopoverMode, PopoverProps } from './popover.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useForwardPropsEmits } from 'reka-ui'
import { HoverCard, Popover } from 'reka-ui/namespaced'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePopoverStyle } from './popover.style'

const props = withDefaults(defineProps<PopoverProps<M>>(), {
  mode: 'click' as never,
  openDelay: 0,
  closeDelay: 0,
  dismissible: true,
  variant: 'normal',
  size: 'sm',
  radius: 'md',
  translucent: false,
})

const emits = defineEmits<PopoverEmits>()

const delegated = props.mode === 'click'
  ? reactivePick(props, 'defaultOpen', 'open', 'openDelay', 'closeDelay')
  : reactivePick(props, 'defaultOpen', 'open', 'modal')
const forwarded = useForwardPropsEmits(delegated, emits)

const arrowProps = toRef(() => props.arrow as PopoverArrowProps)
const portalProps = usePortal(toRef(props, 'portal'))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as PopoverContentProps)

const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown']

    return events.reduce((acc, curr) => {
      acc[curr] = (e: Event) => {
        e.preventDefault()
        // eslint-disable-next-line vue/custom-event-name-casing
        emits('close:prevent')
      }
      return acc
    }, {} as Record<typeof events[number], (e: Event) => void>)
  }

  return {}
})

const ui = computed(() => usePopoverStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  translucent: toBoolValue(props.translucent),
}))

const Component = computed(() => props.mode === 'hover' ? HoverCard : Popover)
</script>

<template>
  <Component.Root v-slot="{ open, close }: { open: boolean, close?: () => void }" v-bind="forwarded">
    <Component.Trigger
      v-if="!!$slots.default || !!reference"
      :reference="reference"
      :class="cn(ui.trigger(), props.ui?.trigger)"
      as-child
    >
      <slot :open="open" />
    </Component.Trigger>

    <Component.Anchor v-if="'Anchor' in Component && !!$slots.anchor" as-child>
      <slot name="anchor" v-bind="((close ? { close } : {}))" />
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <Component.Content v-bind="contentProps" :class="cn(ui.contentWrapper(), props.ui?.contentWrapper)" v-on="contentEvents">
        <div :class="cn(ui.content(), props.ui?.content, props.class)">
          <slot name="content" v-bind="((close ? { close } : {}))" />
        </div>
        <Component.Arrow v-if="!!arrow" v-bind="arrowProps" :class="cn(ui.arrow(), props.ui?.arrow)" />
      </Component.Content>
    </Component.Portal>
  </Component.Root>
</template>
