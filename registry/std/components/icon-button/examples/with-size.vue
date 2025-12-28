<script lang="ts" setup>
import IconButton from '../icon-button.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="size in sizes" :key="size">
      <IconButton icon="info" :size="size" variant="soft" />
    </template>
  </div>
</template>
