<script lang="ts" setup>
import type { OverlayEmits, OverlayProps } from './overlay.props'
import { Presence, Primitive } from 'reka-ui'
import { computed, watch } from 'vue'
import { cn } from '~/utils/styles'
import { useOverlayStyle } from './overlay.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<OverlayProps>(), { to: 'body' })
const emits = defineEmits<OverlayEmits>()

const model = defineModel<boolean>({ default: false })
const ui = computed(() => useOverlayStyle(props))

watch(
  model,
  (value) => {
    if (value) {
      emits('open')
    }
    else {
      emits('close')
    }
  },
)
</script>

<template>
  <Teleport :to="to" :disabled="disabled" :defer="defer">
    <Presence v-if="model" :present="model">
      <Primitive v-bind="{ ...$attrs }" :as="as" :as-child="asChild" :class="cn(ui.base(), props.ui?.base, props.class)" @click="emits('click', $event)">
        <slot />
      </Primitive>
    </Presence>
  </Teleport>
</template>
