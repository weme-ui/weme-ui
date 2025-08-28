<script lang="ts" setup>
import Link from '@registry/std/components/link/link.vue'

const colors = ['accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-6">
    <Link v-for="color in colors" :key="color" href="#" :color="color">
      Text Link
    </Link>
  </div>
</template>
