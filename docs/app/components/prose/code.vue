<script lang="ts" setup>
defineProps<{
  lang?: string
  class?: any
}>()
</script>

<template>
  <code
    :class="cn(
      'px-1.5 py-0.5 rounded-md inline-block text-(xs highlighted) font-(mono medium) b-(~ default)',
      $props.class,
    )"
  >
    <slot />
  </code>
</template>
