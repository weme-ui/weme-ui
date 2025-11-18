<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <div :class="cn('grid grid-cols-1 sm:grid-cols-2 gap-5 my-5 *:my-', $props.class)">
    <slot />
  </div>
</template>
