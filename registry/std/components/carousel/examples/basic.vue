<script lang="ts" setup>
import Carousel from '../carousel.vue'
</script>

<template>
  <Carousel
    class="aspect-1/1 size-80"
    :items="[
      { src: 'https://github.com/yyx990803.png' },
      { src: 'https://github.com/antfu.png' },
      { src: 'https://github.com/posva.png' },
    ]"
  >
    <template #default="{ item }">
      <img :src="item.src" alt="Image">
    </template>
  </Carousel>
</template>
