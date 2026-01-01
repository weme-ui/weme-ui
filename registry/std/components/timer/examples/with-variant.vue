<script lang="ts" setup>
import Timer from '../timer.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'plain'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Timer mode="countup" :variant="variant" />
    </template>
  </div>
</template>
