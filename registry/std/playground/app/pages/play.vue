<script lang="ts" setup>
import type { BreadcrumbItem } from '../../../components/breadcrumb/breadcrumb.props'

const items: BreadcrumbItem[] = [
  { icon: 'lucide:house', label: 'Home', to: '/', disabled: true },
  { label: 'Components', to: '/' },
  { label: 'Disclosure' },
  { label: 'Breadcrumb' },
]
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiBreadcrumb :items size="md" />
  </Container>
</template>
