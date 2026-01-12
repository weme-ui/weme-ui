<script lang="ts" setup>
import Toggle from '../toggle.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <Toggle icon="lucide:bold" :size="size" class="mx-auto" />
    </template>
    <template v-for="size in sizes" :key="size">
      <Toggle icon="lucide:bold" :size="size" label="Bold" class="mx-auto" />
    </template>
  </div>
</template>
