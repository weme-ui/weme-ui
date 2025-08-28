<script lang="ts" setup>
import Kbd from '@registry/std/components/kbd/kbd.vue'

const colors = ['accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-x-12 gap-y-4">
    <template v-for="color in colors" :key="color">
      <Kbd v-for="variant in variants" :key="variant" :color="color" :variant="variant" value="meta" />
    </template>
  </div>
</template>
