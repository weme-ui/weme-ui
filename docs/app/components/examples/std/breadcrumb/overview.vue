<script lang="ts" setup>
import Breadcrumb from '@registry/std/components/breadcrumb/breadcrumb.vue'

const items = [
  { label: 'Home', to: '/', icon: 'lucide:home' },
  { label: 'Docs', to: '/docs' },
  { label: 'Components', to: '/docs/components' },
  { label: 'Breadcrumb', to: '/docs/components/std/breadcrumb' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
