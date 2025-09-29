<script lang="ts" setup>
import DataList from '@registry/std/components/data-list/data-list.vue'

const items = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john.doe@example.com' },
  { label: 'Phone', value: '123-456-7890' },
]
</script>

<template>
  <DataList size="sm" orientation="vertical" :items="items" class="grid-cols-3" highlight />
</template>
