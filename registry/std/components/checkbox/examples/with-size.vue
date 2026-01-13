<script lang="ts" setup>
import Checkbox from '../checkbox.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <Checkbox :size="size" label="Checkbox" description="This is a description." />
    </template>
  </div>
</template>
