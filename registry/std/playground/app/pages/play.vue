<script lang="ts" setup>
import type { AccordionItem } from '../../../components/accordion/accordion.props'

const items: AccordionItem[] = [
  {
    icon: 'lucide:box',
    title: 'Item 1',
    description: 'Description 1',
    content: 'Content 1',
  },
  {
    icon: 'lucide:box',
    title: 'Item 2',
    description: 'Description 2',
    content: 'Content 2',
  },
  {
    icon: 'lucide:box',
    title: 'Item 3',
    description: 'Description 3',
    content: 'Content 3',
  },
]
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiAccordion :items="items" variant="table" size="sm" color="secondary" class="w-100" />
  </Container>
</template>
