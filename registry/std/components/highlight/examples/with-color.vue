<script lang="ts" setup>
import Highlight from '../highlight.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div v-for="color in colors" :key="color" class="py-2">
    <Highlight
      :color="color"
      query="fox"
      text="The quick brown fox jumps over the lazy fox."
    />
  </div>
</template>
