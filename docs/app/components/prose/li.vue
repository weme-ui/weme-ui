<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <li :class="cn('my-1.5 ps-1.5 leading-7 [&>ul]:my-0', $props.class)">
    <slot />
  </li>
</template>
