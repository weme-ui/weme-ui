<script lang="ts" setup>
import type { ToastProviderProps } from './toast-provider.props'
import { reactivePick } from '@vueuse/core'
import { ToastPortal, ToastProvider, ToastViewport, useForwardProps } from 'reka-ui'
import { computed, ref, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { useToast } from '~/composables/use-toast'
import { cn } from '~/utils/styles'
import { useToastProviderStyle } from './toast-provider.style'

const props = withDefaults(defineProps<ToastProviderProps>(), { side: 'bottom-right' })
const delegated = reactivePick(props, 'disableSwipe', 'duration', 'label', 'swipeThreshold')
const forwarded = useForwardProps(delegated)

const portalProps = usePortal(toRef(() => props.portal))

const swipeDirection = computed<ToastProviderProps['swipeDirection']>(() => {
  switch (props.side) {
    case 'top':
      return 'up'
    case 'bottom':
      return 'down'
    case 'top-left':
    case 'bottom-left':
      return 'left'
  }

  return 'right'
})

const ui = computed(() => useToastProviderStyle({
  ...props,
  swipeDirection: swipeDirection.value,
}))

const { toasts, remove } = useToast()

const expanded = ref(false)
const refs = ref<{ height: number }[]>([])

const height = computed(() => refs.value.reduce((acc, { height }) => acc + height + 16, 0))
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0)

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + 16, 0)
}

function onUpdateOpen(value: boolean, id: string | number) {
  if (value) {
    return
  }

  remove(id)
}
</script>

<template>
  <ToastProvider v-bind="forwarded" :swipe-direction="swipeDirection">
    <slot />

    <Toast
      v-for="(toast, index) in toasts"
      v-bind="toast"
      ref="refs"
      :key="toast.id"
      :data-expanded="expanded"
      :data-front="!expanded && index === toasts.length - 1"
      :style="{
        '--index': (index - toasts.length) + toasts.length,
        '--before': toasts.length - 1 - index,
        '--offset': getOffset(index),
        '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--translate': expanded ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))',
      }"
      :class="cn(ui.toast(), props.ui?.toast)"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="toast.onClick && toast.onClick(toast)"
    />

    <ToastPortal v-bind="portalProps">
      <ToastViewport
        :data-expanded="expanded"
        :style="{
          '--scale-factor': '0.05',
          '--translate-factor': side?.startsWith('top') ? '1px' : '-1px',
          '--gap': side?.startsWith('top') ? '16px' : '-16px',
          '--toast-height': `${frontHeight}px`,
          '--height': `${height}px`,
        }"
        :class="cn(ui.viewport(), props.ui?.viewport, props.class)"
        data-slot="toast-viewport"
        @mouseenter="expanded = true"
        @mouseleave="expanded = false"
      />
    </ToastPortal>
  </ToastProvider>
</template>
