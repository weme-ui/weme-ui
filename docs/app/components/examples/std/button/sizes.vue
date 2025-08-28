<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex items-end gap-5">
    <Button v-for="size in sizes" :key="size" :size="size" icon="user">
      Button
    </Button>
  </div>
</template>
