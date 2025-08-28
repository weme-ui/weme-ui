<script lang="ts" setup>
import Kbd from '@registry/std/components/kbd/kbd.vue'

const radiuses = ['none', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <div v-for="radius in radiuses" :key="radius">
      <Kbd :radius="radius" value="meta" size="lg" />
    </div>
  </div>
</template>
