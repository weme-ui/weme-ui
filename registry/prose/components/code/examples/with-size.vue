<script lang="ts" setup>
import Code from '../code.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="space-x-6">
    <template v-for="size in sizes" :key="size">
      <Code :size="size">Hello World</Code>
    </template>
  </div>
</template>
