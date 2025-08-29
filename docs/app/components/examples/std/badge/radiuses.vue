<script lang="ts" setup>
import Badge from '@registry/std/components/badge/badge.vue'

const radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <div v-for="radius in radiuses" :key="radius">
      <Badge text="Badge" size="md" :radius />
    </div>
  </div>
</template>
