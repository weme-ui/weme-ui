<script lang="ts" setup>
import Slider from '../slider.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="radius in radiuses" :key="radius">
      <Slider :radius="radius" />
    </template>
  </div>
</template>
