<script lang="ts" setup>
import type { OverlayEmits, OverlayProps } from './overlay.props'
import { useMounted } from '@vueuse/core'
import { Presence, Primitive, useForwardExpose } from 'reka-ui'
import { computed, watch } from 'vue'
import { cn } from '~/utils/styles'
import { useOverlayStyle } from './overlay.style'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<OverlayProps>()
const emits = defineEmits<OverlayEmits>()
const isMounted = useMounted()

const open = defineModel<boolean>({ default: false })
const ui = computed(() => useOverlayStyle(props))

watch(open, (value) => {
  emits('open', value)
})

useForwardExpose()
</script>

<template>
  <Presence v-if="isMounted || !!forceMount" :present="open">
    <Primitive
      v-if="open"
      v-bind="{ ...$attrs }"
      data-slot="overlay"
      aria-hidden="true"
      :as="as"
      :as-child="asChild"
      :data-state="open ? 'open' : 'closed'"
      :class="cn(ui.base(), props.ui?.base, props.class)"
    />
  </Presence>
</template>
