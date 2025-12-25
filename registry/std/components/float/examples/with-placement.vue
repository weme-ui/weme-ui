<script lang="ts" setup>
import Float from '../float.vue'

const placements = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
  'middle-start',
  'middle-center',
  'middle-end',
] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6 h-full py-4 gap-6">
    <template v-for="placement in placements" :key="placement">
      <div class="relative size-12 rounded-lg bg-muted mx-auto">
        <Float :placement="placement">
          <div class="flex rounded-full p-1.5 bg-danger" />
        </Float>
      </div>
    </template>
  </div>
</template>
