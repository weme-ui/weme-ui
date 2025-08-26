<script lang="ts" setup>
import { usePreviewStyle } from '~/styles/preview.style'

defineProps<{
  class?: any
}>()

const ui = usePreviewStyle()
</script>

<template>
  <div :class="ui.base()">
    <div :class="ui.wrapper()">
      <div :class="cn(ui.preview(), $props.class)">
        <slot name="preview" mdc-unwrap="p" />
      </div>

      <div :class="ui.code()">
        <slot name="code" mdc-unwrap="p" />
      </div>
    </div>
  </div>
</template>
