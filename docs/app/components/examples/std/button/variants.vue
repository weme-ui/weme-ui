<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'link', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <div v-for="variant in variants" :key="variant" class="p-2 rounded-lg" :class="variant === 'inverse' && 'bg-neutral-12'">
      <Button :variant="variant" icon="user">
        Button
      </Button>
    </div>
  </div>
</template>
