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

const rootRef = useTemplateRef<HTMLElement>('rootRef')
const targetRef = shallowRef<HTMLElement | Window>()

const isFixed = ref(false)
const width = ref<number | null>(null)
const height = ref<number | null>(null)
const top = ref<number | null>(null)
const bottom = ref<number | null>(null)

const ui = computed(() => useAffixStyle({ enable: isFixed.value }))

const throttledUpdatePosition = useThrottleFn(() => {
  if (!targetRef.value || !rootRef.value) {
    return
  }

  const { triggerTop, triggerBottom } = props
  const placement = triggerBottom === undefined ? 'top' : 'bottom'

  const rootRect = rootRef.value.getBoundingClientRect()
  const targetRect = targetRef.value instanceof Window
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : targetRef.value.getBoundingClientRect()

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
  watchEffect((onInvalidate) => {
    if (!import.meta.client) {
      return
    }

    const element
      = (props.target
        && props.target !== window
        && document.querySelector(props.target as string) as HTMLElement)
      || window

    targetRef.value = element

    if (element) {
      window.addEventListener('scroll', throttledUpdatePosition)
      window.addEventListener('resize', throttledUpdatePosition)

      onInvalidate(() => {
        window.removeEventListener('scroll', throttledUpdatePosition)
        window.removeEventListener('resize', throttledUpdatePosition)
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
