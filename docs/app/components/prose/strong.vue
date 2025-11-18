<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <strong :class="cn('c-highlighted', $props.class)">
    <slot />
  </strong>
</template>
