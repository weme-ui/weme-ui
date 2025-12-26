<script lang="ts" setup>
import Separator from '../separator.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div v-for="size in sizes" :key="size" class="py-4">
    <Separator :size="size" />
  </div>
</template>
