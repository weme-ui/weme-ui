<script lang="ts" setup>
import DataList from '../data-list.vue'
</script>

<template>
  <DataList
    class="grid-cols-2"
    :items="[
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Phone', value: '123-456-7890' },
    ]"
  />
</template>
