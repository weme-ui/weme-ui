<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <hr :class="cn('my-12 b-(t default)', $props.class)">
</template>
