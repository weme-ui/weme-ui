<script lang="ts" setup>
import Clipboard from '../clipboard.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <Clipboard value="Hello World" copy-text="Copy" copied-text="Copied" />
  </div>
</template>
