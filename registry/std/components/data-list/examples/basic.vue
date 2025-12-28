<script lang="ts" setup>
import DataList from '../data-list.vue'
</script>

<template>
  <DataList
    :items="[
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Phone', value: '123-456-7890' },
    ]"
  />
</template>
