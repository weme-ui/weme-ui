<script lang="ts" setup>
import Badge from '@registry/std/components/badge/badge.vue'

const colors = ['accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <div v-for="color in colors" :key="color">
      <Badge text="Badge" :color />
    </div>
  </div>
</template>
