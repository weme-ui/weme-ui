<script lang="ts" setup>
import type { DataListItem } from '../../../components/data-list/data-list.props'

const data: DataListItem[] = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john.doe@example.com' },
  { label: 'Phone', value: '123-456-7890' },
]
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiDataList :items="data" orientation="vertical" size="md" />
  </Container>
</template>
