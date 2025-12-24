<script lang="ts" setup>
import Button from '../button.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 flex-wrap">
    <template v-for="size in sizes" :key="size">
      <Button :label="size" :size="size" class="place-self-center" />
    </template>
  </div>
</template>
