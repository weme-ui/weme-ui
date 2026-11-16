<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const radiuses = [
  'rounded-none',
  'rounded-xs',
  'rounded-sm',
  'rounded-md',
  'rounded-lg',
  'rounded-xl',
  'rounded-2xl',
  'rounded-3xl',
  'rounded-4xl',
  'rounded-full',
] as const
</script>

<template>
  <Example name="Border Radius" description="Discover all border-radius.">
    <Preview v-for="radius in radiuses" :key="radius" :name="radius">
      <div :class="radius" class="bg-muted b b-default h-30" />
    </Preview>
  </Example>
</template>
