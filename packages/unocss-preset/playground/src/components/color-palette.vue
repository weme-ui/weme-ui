<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <div class="p-1 ring-(~ default) rounded-lg">
    <div class="size-12 rounded" :class="$props.class" />
  </div>
</template>
