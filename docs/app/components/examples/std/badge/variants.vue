<script lang="ts" setup>
import Badge from '@registry/std/components/badge/badge.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <div v-for="variant in variants" :key="variant" class="p-2 rounded-md" :class="variant === 'inverse' && 'bg-neutral-12'">
      <Badge text="Badge" :variant />
    </div>
  </div>
</template>
