<script lang="ts" setup>
import Carousel from '../carousel.vue'
</script>

<template>
  <div class="flex gap-8">
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

    <Carousel
      class="aspect-1/1 size-80"
      orientation="vertical"
      :ui="{ container: 'h-88' }"
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
  </div>
</template>
