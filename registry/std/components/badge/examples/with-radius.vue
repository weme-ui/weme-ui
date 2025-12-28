<script lang="ts" setup>
import Badge from '../badge.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Badge :radius="radius" :label="radius" />
    </template>
  </div>
</template>
