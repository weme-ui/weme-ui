<script lang="ts" setup>
import Badge from '@registry/std/components/badge/badge.vue'

const colors = ['accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <template v-for="size in sizes" :key="size">
      <div v-for="color in colors" :key="color">
        <Badge text="Badge" variant="surface" :color="color" :size="size" removable />
      </div>
    </template>
  </div>
</template>
