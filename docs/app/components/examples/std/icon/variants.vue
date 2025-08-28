<script lang="ts" setup>
import IconBox from '@registry/std/components/icon/icon-box.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-12">
    <IconBox
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      name="info"
      size="lg"
    />
  </div>
</template>
