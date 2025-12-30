<script lang="ts" setup>
import Highlight from '../highlight.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div v-for="radius in radiuses" :key="radius" class="py-2">
    <Highlight
      :radius="radius"
      query="fox"
      text="The quick brown fox jumps over the lazy fox."
    />
  </div>
</template>
