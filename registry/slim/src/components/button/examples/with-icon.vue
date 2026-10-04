<script lang="ts" setup>
import Button from '../button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Button label="Add" icon="ri:add-line" />
    <Button label="Share" icon="ri:share-line" variant="soft" />
    <Button icon="ri:heart-line" aria-label="Favorite" />
  </div>
</template>
