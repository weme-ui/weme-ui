<script lang="ts" setup>
import Separator from '../separator.vue'

const variants = ['solid', 'dashed', 'dotted', 'gradient'] as const
</script>

<template>
  <div v-for="variant in variants" :key="variant" class="py-4">
    <Separator :variant="variant" />
  </div>
</template>
