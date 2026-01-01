<script lang="ts" setup>
import Timer from '../timer.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="size in sizes" :key="size">
      <Timer mode="countup" :size="size" />
    </template>
  </div>
</template>
