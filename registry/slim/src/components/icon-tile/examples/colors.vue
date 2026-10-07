<script lang="ts" setup>
import IconTile from '../icon-tile.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <IconTile icon="ri:bookmark-line" color="accent" />
    <IconTile icon="ri:bookmark-line" color="neutral" />
    <IconTile icon="ri:information-line" color="info" />
    <IconTile icon="ri:checkbox-circle-line" color="success" />
    <IconTile icon="ri:alert-line" color="warning" />
    <IconTile icon="ri:error-warning-line" color="error" />
  </div>
</template>
