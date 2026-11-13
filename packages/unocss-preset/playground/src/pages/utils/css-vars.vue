<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const cssVars = [
  'bg-activity-bar-active',
  'w-activity-bar',
  'bg-scrollbar',
  'bg-scrollbar-thumb',
  'bg-scrollbar-thumb-hover',
  'bg-tooltip',
  'text-tooltip',
] as const
</script>

<template>
  <Example name="Css Variables" description="Discover all css variables.">
    <Preview v-for="cssVar in cssVars" :key="cssVar" :name="cssVar">
      <div :class="cssVar" class="h-8 rounded bg-muted">
        {{ cssVar }}
      </div>
    </Preview>
  </Example>
</template>
