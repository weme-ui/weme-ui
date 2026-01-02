<script lang="ts" setup>
import type { AffixEmits, AffixProps } from './affix.props'
import { useThrottleFn } from '@vueuse/core'
import { computed, onMounted, ref, shallowRef, useTemplateRef, watchEffect } from 'vue'
import { cn } from '~/utils/styles'
import { useAffixStyle } from './affix.style'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<AffixProps>()
const emits = defineEmits<AffixEmits>()

const containerRef = shallowRef<HTMLElement | Window>()
const rootRef = useTemplateRef<HTMLElement>('rootRef')

const isFixed = ref(false)
const width = ref<number | null>(null)
const height = ref<number | null>(null)
const top = ref<number | null>(null)
const bottom = ref<number | null>(null)

const ui = computed(() => useAffixStyle({ enable: isFixed.value }))

const throttledUpdatePosition = useThrottleFn(() => {
  if (!containerRef.value || !rootRef.value) {
    return
  }

  const { triggerTop, triggerBottom } = props
  const placement = triggerBottom === undefined ? 'top' : 'bottom'

  const rootRect = rootRef.value.getBoundingClientRect()
  const targetRect = containerRef.value instanceof Window
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : containerRef.value.getBoundingClientRect()

  width.value = rootRect.width
  height.value = rootRect.height

  let newIsFixed = false

  if (placement === 'top') {
    newIsFixed = rootRect.top - targetRect.top < (triggerTop || 0)
    top.value = newIsFixed
      ? targetRect.top + (triggerTop || 0)
      : null
  }
  else {
    newIsFixed = targetRect.bottom - rootRect.bottom < (triggerBottom || 0)
    bottom.value = newIsFixed
      ? window.innerHeight - targetRect.bottom + (triggerBottom || 0)
      : null
  }

  if (isFixed.value !== newIsFixed) {
    isFixed.value = newIsFixed
    emits('change', isFixed.value)
  }
}, 10)

onMounted(() => {
  if (!import.meta.client) {
    return
  }

  watchEffect((onInvalidate) => {
    const element
      = (props.container
        && props.container !== window
        && document.querySelector(props.container as string) as HTMLElement)
      || window

    containerRef.value = element

    if (element) {
      element.addEventListener('scroll', throttledUpdatePosition)
      element.addEventListener('resize', throttledUpdatePosition)

      onInvalidate(() => {
        element.removeEventListener('scroll', throttledUpdatePosition)
        element.removeEventListener('resize', throttledUpdatePosition)
      })
    }
  })
})

defineExpose({
  isFixed,
  updatePosition: throttledUpdatePosition,
})
</script>

<template>
  <div ref="rootRef" data-slot="affix">
    <div
      v-if="isFixed"
      aria-hidden="true"
      :style="{
        width: !!width ? `${width}px` : undefined,
        height: !!height ? `${height}px` : undefined,
      }"
      data-slot="affix-placeholder"
    />
    <div
      v-bind="$attrs"
      :class="cn(ui.base(), props.ui?.base, props.class)"
      :style="{
        '--affix-top': top !== null ? `${top}px` : undefined,
        '--affix-bottom': bottom !== null ? `${bottom}px` : undefined,
        '--affix-width': width !== null ? `${width}px` : undefined,
        '--affix-height': height !== null ? `${height}px` : undefined,
      }"
      data-slot="affix-wrapper"
    >
      <slot />
    </div>
  </div>
</template>
