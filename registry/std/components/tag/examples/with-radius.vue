<script lang="ts" setup>
import Tag from '../tag.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Tag :radius="radius" :label="radius" />
    </template>
  </div>
</template>
