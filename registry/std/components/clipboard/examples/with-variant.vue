<script lang="ts" setup>
import Clipboard from '../clipboard.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'inverse'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Clipboard :variant="variant" value="Hello World" copy-text="Copy" copied-text="Copied" />
    </template>
  </div>
</template>
