<script lang="ts" setup>
import Tag from '../tag.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Tag :size="size" :label="size" />
    </template>
  </div>
</template>
