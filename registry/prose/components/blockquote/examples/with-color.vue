<script lang="ts" setup>
import Blockquote from '../blockquote.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="color in colors" :key="color">
      <Blockquote :color="color">
        The quick brown fox jumps over the lazy fox.
      </Blockquote>
    </template>
  </div>
</template>
