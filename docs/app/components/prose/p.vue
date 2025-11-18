<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <p :class="cn('my-5 leading-7 text-pretty', $props.class)">
    <slot />
  </p>
</template>
