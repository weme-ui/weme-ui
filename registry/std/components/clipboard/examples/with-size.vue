<script lang="ts" setup>
import Clipboard from '../clipboard.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Clipboard :size="size" value="Hello World" copy-text="Copy" copied-text="Copied" />
    </template>
  </div>
</template>
