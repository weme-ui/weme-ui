<script lang="ts" setup>
import IconButton from '../icon-button.vue'

const radiuses = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <IconButton icon="info" :radius="radius" />
    </template>
  </div>
</template>
