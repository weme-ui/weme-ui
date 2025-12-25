<script lang="ts" setup>
import Item from '../item.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 h-full py-4 gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Item icon="user" title="Title" description="Description" content="Content" :radius="radius" variant="outline" arrow clickable />
    </template>
  </div>
</template>
