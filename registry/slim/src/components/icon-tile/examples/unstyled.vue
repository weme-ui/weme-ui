<script lang="ts" setup>
import IconTile from '../icon-tile.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <IconTile icon="ri:bookmark-line" :unstyled="true" class="bg-blue-500 text-white rounded-md size-10" />
    <IconTile icon="ri:star-line" :unstyled="true" class="bg-green-500 text-white rounded-full size-10" />
    <IconTile icon="ri:heart-line" :unstyled="true" class="border-red-400 text-red-500 border rounded-lg size-10" />
  </div>
</template>
