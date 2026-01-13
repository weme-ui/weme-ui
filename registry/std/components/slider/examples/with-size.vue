<script lang="ts" setup>
import Slider from '../slider.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <Slider :size="size" />
    </template>
  </div>
</template>
