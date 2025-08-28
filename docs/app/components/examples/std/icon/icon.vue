<script lang="ts" setup>
import Icon from '@registry/std/components/icon/icon.vue'

defineProps<{
  name?: string
  class?: any
}>()
</script>

<template>
  <Icon :name="name || 'info'" :class="cn('size-6', $props.class)" />
</template>
