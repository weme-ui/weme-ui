<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'

defineProps<{
  text?: string
}>()
</script>

<template>
  <Button :text="text || 'Button'" />
</template>
