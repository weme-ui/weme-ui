<script lang="ts" setup>
import Link from '../link.vue'

const variants = ['plain', 'underline'] as const
</script>

<template>
  <div class="space-x-6">
    <template v-for="variant in variants" :key="variant">
      <Link href="https://github.com/weme-ui/weme-ui" target="_blank" :variant="variant">
        Hello World
      </Link>
    </template>
  </div>
</template>
