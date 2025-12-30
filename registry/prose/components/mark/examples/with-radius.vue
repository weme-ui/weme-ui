<script lang="ts" setup>
import Mark from '../mark.vue'

const radiuses = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="space-y-6">
    <template v-for="radius in radiuses" :key="radius">
      <p>The <Mark :radius="radius">quick</Mark> brown fox jumps over the lazy fox.</p>
    </template>
  </div>
</template>
