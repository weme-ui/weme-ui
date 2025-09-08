<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const paddings = ['p-xs', 'p-sm', 'p-md', 'p-lg', 'p-xl', 'p-2xl', 'p-3xl', 'p-4xl', 'p-5xl', 'p-6xl', 'p-7xl', 'p-8xl'] as const
</script>

<template>
  <Example name="Padding" description="Discover all padding.">
    <Preview v-for="padding in paddings" :key="padding" :name="padding">
      <div :class="padding" class="flex-(~ col) gap-2 bg-accent-3 rounded-lg">
        <div class="h-4 bg-accent-5 rounded-md" />
        <div class="h-4 bg-accent-5 rounded-md" />
        <div class="h-4 bg-accent-5 rounded-md" />
      </div>
    </Preview>
  </Example>
</template>
