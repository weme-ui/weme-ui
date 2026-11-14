<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const shortcuts = ['test-shortcut'] as const
</script>

<template>
  <Example name="Component Shortcuts" description="Discover all component shortcuts.">
    <Preview v-for="shortcut in shortcuts" :key="shortcut" :name="shortcut">
      <div :class="shortcut" class="h-8 rounded"></div>
    </Preview>
  </Example>
</template>
