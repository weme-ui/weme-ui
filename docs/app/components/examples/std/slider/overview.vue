<script lang="ts" setup>
import Slider from '@registry/std/components/slider/slider.vue'

const value = ref([20, 60])
</script>

<template>
  <Slider v-model="value" util="%" tooltip />
</template>
