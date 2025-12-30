<script lang="ts" setup>
import Code from '../code.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="space-x-6">
    <template v-for="color in colors" :key="color">
      <Code :color="color">Hello World</Code>
    </template>
  </div>
</template>
