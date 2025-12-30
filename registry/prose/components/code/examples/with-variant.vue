<script lang="ts" setup>
import Code from '../code.vue'

const variants = ['solid', 'soft', 'surface', 'outline'] as const
</script>

<template>
  <div class="space-x-6">
    <template v-for="variant in variants" :key="variant">
      <Code :variant="variant">Hello World</Code>
    </template>
  </div>
</template>
