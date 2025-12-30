<script lang="ts" setup>
import Heading from '../heading.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'] as const
</script>

<template>
  <div class="space-y-6">
    <template v-for="size in sizes" :key="size">
      <Heading :size="size" class="text-highlighted">
        Hello World
      </Heading>
    </template>
  </div>
</template>
