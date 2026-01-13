<script lang="ts" setup>
import Slider from '../slider.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4 h-40">
    <template v-for="color in colors" :key="color">
      <Slider :color="color" orientation="vertical" />
    </template>
  </div>
</template>
