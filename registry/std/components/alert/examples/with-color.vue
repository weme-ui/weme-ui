<script lang="ts" setup>
import Alert from '../alert.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ col) gap-4">
    <template v-for="color in colors" :key="color">
      <Alert :color="color" icon="info" title="Title" content="Content" />
    </template>
  </div>
</template>
