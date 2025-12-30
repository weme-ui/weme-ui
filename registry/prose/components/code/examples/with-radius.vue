<script lang="ts" setup>
import Code from '../code.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="space-x-6">
    <template v-for="radius in radiuses" :key="radius">
      <Code :radius="radius">Hello World</Code>
    </template>
  </div>
</template>
