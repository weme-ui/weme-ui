<script lang="ts" setup>
import Rating from '../rating.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <Rating :size="size" />
    </template>
  </div>
</template>
