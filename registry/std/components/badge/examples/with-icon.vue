<script lang="ts" setup>
import Badge from '../badge.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Badge icon="lucide:tag" :variant="variant" :label="variant" />
    </template>
  </div>
</template>
