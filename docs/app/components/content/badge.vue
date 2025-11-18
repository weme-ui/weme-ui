<script lang="ts" setup>
defineProps<{
  class?: any
}>()
</script>

<template>
  <UiBadge variant="surface" radius="full" :class="$props.class">
    <slot mdc-unwrap="p" />
  </UiBadge>
</template>
