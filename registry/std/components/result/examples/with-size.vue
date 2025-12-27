<script lang="ts" setup>
import Result from '../result.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6 h-full py-4">
    <template v-for="size in sizes" :key="size">
      <Result icon="info" title="Title" description="Description" :size="size" class="w-full" />
    </template>
  </div>
</template>
