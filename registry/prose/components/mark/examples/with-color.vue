<script lang="ts" setup>
import Mark from '../mark.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="space-y-6">
    <template v-for="color in colors" :key="color">
      <p>The <Mark :color="color">quick</Mark> brown fox jumps over the lazy fox.</p>
    </template>
  </div>
</template>
