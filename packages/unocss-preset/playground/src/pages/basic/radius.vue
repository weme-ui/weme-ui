<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const radiuses = ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full'] as const
</script>

<template>
  <Example name="Border Radius" description="Discover all border-radius.">
    <Preview v-for="radius in radiuses" :key="radius" :name="radius">
      <div :class="radius" class="bg-accent-5 h-16" />
    </Preview>
  </Example>
</template>
