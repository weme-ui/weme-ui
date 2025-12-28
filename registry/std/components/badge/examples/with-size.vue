<script lang="ts" setup>
import Badge from '../badge.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Badge :size="size" :label="size" />
    </template>
  </div>
</template>
