<script lang="ts" setup>
import Blockquote from '../blockquote.vue'

const aligns = ['start', 'center', 'end'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="align in aligns" :key="align">
      <Blockquote :align="align">
        The quick brown fox jumps over the lazy fox.
      </Blockquote>
    </template>
  </div>
</template>
