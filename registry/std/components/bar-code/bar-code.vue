<script lang="ts" setup>
import type { BarCodeProps } from './bar-code.props'
import JsBarcode from 'jsbarcode'
import { computed, shallowRef, watch } from 'vue'
import { omit, removeUndefined } from '~/utils/props'
import { cn } from '~/utils/styles'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BarCodeProps>(), {
  fontSize: 13,
  height: 40,
  background: 'rgba(0, 0, 0, 0)',
  margin: 0,
  displayValue: true,
})

const src = shallowRef<string>('')
const value = computed(() => props.text ?? '')
const options = computed(() => removeUndefined(omit({ ...props }, ['class'])))

watch(
  [value, options],
  ([newValue, newOptions]) => {
    if (import.meta.client) {
      const canvas = document.createElement('canvas')
      JsBarcode(canvas, newValue, newOptions)
      src.value = canvas.toDataURL()
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <ClientOnly>
    <img data-slot="bar-code" :src="src" :class="cn(props.class)">
  </ClientOnly>
</template>
