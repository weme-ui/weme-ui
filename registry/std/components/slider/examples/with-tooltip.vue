<script lang="ts" setup>
import Slider from '../slider.vue'

const value = ref([50])
const range = ref([20, 80])
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <Slider v-model="value" tooltip />
    <Slider v-model="range" tooltip />
  </div>
</template>
