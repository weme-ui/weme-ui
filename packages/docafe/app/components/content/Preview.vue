<script lang="ts" setup>
import { usePreviewStyle } from '~/styles/preview.style'

const props = withDefaults(defineProps<{
  orientation?: 'vertical' | 'horizontal'
  inverse?: boolean
  class?: any
}>(), {
  orientation: 'vertical',
  inverse: false,
})

const ui = computed(() => usePreviewStyle({
  orientation: props.orientation,
  inverse: !!props.inverse,
}))
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
