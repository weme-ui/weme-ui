<script lang="ts" setup>
import Slider from '../slider.vue'

const range = ref([20, 80])
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <Slider />
    <Slider disabled />
    <Slider v-model="range" />
  </div>
</template>
