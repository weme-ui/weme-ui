<script lang="ts" setup>
import Alert from '../alert.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="flex-(~ col) gap-4">
    <template v-for="variant in variants" :key="variant">
      <Alert :variant="variant" icon="info" title="Title" content="Content" />
    </template>
  </div>
</template>
