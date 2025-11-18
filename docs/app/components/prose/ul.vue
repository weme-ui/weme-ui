<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <ul :class="cn('list-disc ps-6 my-5 marker:text-accent', $props.class)">
    <slot />
  </ul>
</template>
