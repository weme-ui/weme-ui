<script lang="ts" setup>
import { useCardGroupStyle } from '~/styles/card-group.style'

const props = defineProps<{
  columns?: number
}>()

const ui = computed(() => useCardGroupStyle({
  columns: props.columns ? `cols-${props.columns}` as any : undefined,
}))
</script>

<template>
  <div :class="ui">
    <slot />
  </div>
</template>
