<script lang="ts" setup>
import type { OverlayProps } from './overlay.props'
import { useMounted } from '@vueuse/core'
import { Presence, Primitive, useForwardExpose } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useOverlayStyle } from './overlay.style'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<OverlayProps>()

const ui = computed(() => useOverlayStyle(props))
const isMounted = useMounted()

useForwardExpose()
</script>

<template>
  <Presence v-if="isMounted || !!forceMount" :present="visible">
    <Primitive
      v-if="visible"
      v-bind="{ ...$attrs }"
      data-slot="overlay"
      aria-hidden="true"
      :as="as"
      :as-child="asChild"
      :data-state="visible ? 'visible' : 'invisible'"
      :class="cn(ui.base(), props.ui?.base, props.class)"
    />
  </Presence>
</template>
