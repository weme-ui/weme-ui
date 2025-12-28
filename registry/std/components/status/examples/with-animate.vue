<script lang="ts" setup>
import Status from '../status.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="color in colors" :key="color">
      <Status :color="color" :label="color" animate />
    </template>
  </div>
</template>
