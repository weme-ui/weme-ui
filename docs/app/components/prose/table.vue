<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <div class="relative my-5 overflow-x-auto">
    <table :class="cn('w-full border-collapse', $props.class)">
      <slot />
    </table>
  </div>
</template>
