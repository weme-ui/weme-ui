<script lang="ts" setup>
import Status from '../status.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6">
    <template v-for="size in sizes" :key="size">
      <Status :size="size" :label="size" />
    </template>
  </div>
</template>
