<script lang="ts" setup>
import Kbd from '@registry/std/components/kbd/kbd.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6">
    <div v-for="size in sizes" :key="size">
      <Kbd :size="size" value="meta" />
    </div>
  </div>
</template>
