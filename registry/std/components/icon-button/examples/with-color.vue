<script lang="ts" setup>
import IconButton from '../icon-button.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="color in colors" :key="color">
      <IconButton icon="info" :color="color" />
    </template>
  </div>
</template>
