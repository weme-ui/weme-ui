<script lang="ts" setup>
import IconButton from '../icon-button.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'plain', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="variant in variants" :key="variant">
      <IconButton icon="info" :variant="variant" />
    </template>
  </div>
</template>
