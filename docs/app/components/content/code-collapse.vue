<script lang="ts" setup>
import { useCodeCollapseStyle } from '~/styles/content/code-collapse.style'

withDefaults(defineProps<{
  icon?: string
  openText?: string
  closeText?: string
  class?: any
}>(), {
  openText: 'Expand code',
  closeText: 'Collapse code',
})

const open = defineModel<boolean>('open', { default: false })
const ui = computed(() => useCodeCollapseStyle({ open: open.value }))
</script>

<template>
  <div :class="ui.base({ class: $props.class })">
    <slot />

    <div :class="ui.trigger()">
      <UiButton
        :icon="icon"
        :text="open ? closeText : openText"
        variant="surface"
        @click="open = !open"
      />
    </div>
  </div>
</template>
