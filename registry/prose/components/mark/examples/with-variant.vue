<script lang="ts" setup>
import Mark from '../mark.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'plain'] as const
</script>

<template>
  <div class="space-y-6">
    <template v-for="variant in variants" :key="variant">
      <p>The <Mark :variant="variant">quick</Mark> brown fox jumps over the lazy fox.</p>
    </template>
  </div>
</template>
