<script lang="ts" setup>
import type { NumberTickerProps } from './number-ticker.props'
import { reactivePick, TransitionPresets, useElementVisibility, useTransition } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import { useNumberTickerStyle } from './number-ticker.style'

const props = withDefaults(defineProps<NumberTickerProps>(), {
  as: 'span',
  value: 0,
  direction: 'up',
  duration: 1000,
  delay: 0,
  decimal: 0,
  transition: 'easeOutCubic',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useNumberTickerStyle())

const transitionValue = ref(props.direction === 'down' ? props.value : 0)
const transitionOutput = useTransition(transitionValue, {
  delay: props.delay,
  duration: props.duration,
  transition: TransitionPresets[props.transition],
})

const { code } = useLocale()
const output = computed(() => {
  return new Intl.NumberFormat(code.value, {
    minimumFractionDigits: props.decimal,
    maximumFractionDigits: props.decimal,
  }).format(Number(transitionOutput.value.toFixed(props.decimal)))
})

const rootRef = ref<HTMLElement>()
const isInView = useElementVisibility(rootRef, {
  threshold: 0,
})

const hasBeenInView = ref(false)

const stopIsInViewWatcher = watch(
  isInView,
  (isVisible) => {
    if (isVisible && !hasBeenInView.value) {
      hasBeenInView.value = true
      transitionValue.value = props.direction === 'down' ? 0 : props.value
      stopIsInViewWatcher()
    }
  },
  { immediate: true },
)

watch(
  () => props.value,
  (newVal) => {
    if (hasBeenInView.value) {
      transitionValue.value = props.direction === 'down' ? 0 : newVal
    }
  },
)
</script>

<template>
  <Primitive ref="rootRef" v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)" data-slot="number-ticker">
    <slot v-bind="{ output }">
      {{ transform ? transform(Number(output)) : output }}
    </slot>
  </Primitive>
</template>
