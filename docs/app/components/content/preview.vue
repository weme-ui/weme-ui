<script lang="ts" setup>
import { usePreviewStyle } from '~/styles/content/preview.style'

defineProps<{
  class?: any
}>()

const slots = defineSlots<{
  default: (props?: object) => any
  code: (props?: object) => any
}>()

const ui = usePreviewStyle({
  code: !!slots.code,
})
</script>

<template>
  <div :class="ui.wrapper()">
    <div :class="ui.base({ class: $props.class })">
      <slot />
    </div>
    <slot name="code" />
  </div>
</template>
