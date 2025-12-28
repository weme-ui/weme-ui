<script lang="ts" setup>
import Tag from '../tag.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Tag :variant="variant" :label="variant" />
    </template>
  </div>
</template>
