<script lang="ts" setup>
import Highlight from '../highlight.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'plain'] as const
</script>

<template>
  <div v-for="variant in variants" :key="variant" class="py-2">
    <Highlight
      :variant="variant"
      query="fox"
      text="The quick brown fox jumps over the lazy fox."
    />
  </div>
</template>
