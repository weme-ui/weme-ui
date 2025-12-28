<script lang="ts" setup>
import Item from '../item.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 h-full py-4 gap-6">
    <template v-for="size in sizes" :key="size">
      <Item icon="user" title="Title" description="Description" content="Content" :size="size" variant="outline" />
    </template>
  </div>
</template>
