<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <blockquote :class="cn('b-(s-4 default) ps-4 italic', $props.class)">
    <slot />
  </blockquote>
</template>
