<script lang="ts" setup>
import IconBox from '@registry/std/components/icon/icon-box.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
const colors = ['accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-12">
    <template v-for="variant in variants" :key="variant">
      <IconBox
        v-for="color in colors"
        :key="color"
        :variant="variant"
        :color="color"
        name="info"
        size="lg"
      />
    </template>
  </div>
</template>
