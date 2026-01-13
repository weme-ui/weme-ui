<script lang="ts" setup>
import Rating from '../rating.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <Rating :color="color" />
    </template>
  </div>
</template>
