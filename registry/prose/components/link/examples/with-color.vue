<script lang="ts" setup>
import Link from '../link.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="space-x-6">
    <template v-for="color in colors" :key="color">
      <Link href="https://github.com/weme-ui/weme-ui" target="_blank" :color="color">
        Hello World
      </Link>
    </template>
  </div>
</template>
