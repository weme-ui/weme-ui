<script lang="ts" setup>
import Button from '../button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Button label="Loading" loading />
    <Button label="Saving" loading loading-text="Saving…" />
  </div>
</template>
