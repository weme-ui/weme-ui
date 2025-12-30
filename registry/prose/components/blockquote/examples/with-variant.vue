<script lang="ts" setup>
import Blockquote from '../blockquote.vue'

const variants = ['solid', 'soft', 'none'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Blockquote :variant="variant">
        The quick brown fox jumps over the lazy fox.
      </Blockquote>
    </template>
  </div>
</template>
