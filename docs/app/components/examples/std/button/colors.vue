<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'ghost', 'link', 'inverse'] as const
const colors = ['accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <template v-for="variant in variants" :key="variant">
      <div v-for="color in colors" :key="color" class="p-2 rounded-lg" :class="variant === 'inverse' && 'bg-neutral-12'">
        <Button :color="color" :variant="variant" icon="user">
          Button
        </Button>
      </div>
    </template>
  </div>
</template>
