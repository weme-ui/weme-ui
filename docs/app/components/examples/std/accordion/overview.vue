<script lang="ts" setup>
import Accordion from '@registry/std/components/accordion/accordion.vue'

const items = [
  { icon: 'lucide:circle-dashed', title: 'Item 1', description: 'Description 1', content: 'Content 1', value: 'item-1' },
  { icon: 'lucide:circle-dashed', title: 'Item 2', description: 'Description 2', content: 'Content 2', value: 'item-2' },
  { icon: 'lucide:circle-dashed', title: 'Item 3', description: 'Description 3', content: 'Content 3', value: 'item-3' },
]
</script>

<template>
  <Accordion :items="items" />
</template>
