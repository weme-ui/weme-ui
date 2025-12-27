<script lang="ts" setup>
import Spinner from '../spinner.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6">
    <div v-for="size in sizes" :key="size" class="flex-(~ center) h-full">
      <Spinner :size="size" />
    </div>
  </div>
</template>
