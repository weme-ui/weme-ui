<script lang="ts" setup>
import Badge from '../badge.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="color in colors" :key="color">
      <Badge :color="color" :label="color" />
    </template>
  </div>
</template>
