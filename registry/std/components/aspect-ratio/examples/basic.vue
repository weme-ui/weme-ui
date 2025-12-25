<script lang="ts" setup>
import AspectRatio from '../aspect-ratio.vue'
</script>

<template>
  <div class="mx-auto relative w-90 overflow-hidden rounded-lg">
    <AspectRatio :ratio="16 / 9">
      <img src="https://images.unsplash.com/photo-1498855926480-d98e83099315?w=300&dpr=2&q=80" class="size-full object-cover">
    </AspectRatio>
  </div>
</template>
