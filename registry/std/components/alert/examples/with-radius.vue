<script lang="ts" setup>
import Alert from '../alert.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ col) gap-4">
    <template v-for="radius in radiuses" :key="radius">
      <Alert :radius="radius" icon="info" title="Title" content="Content" />
    </template>
  </div>
</template>
