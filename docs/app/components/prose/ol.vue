<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <ol :class="cn('list-decimal ps-6 my-5 marker:c-muted', $props.class)">
    <slot />
  </ol>
</template>
