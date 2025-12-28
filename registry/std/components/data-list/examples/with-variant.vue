<script lang="ts" setup>
import DataList from '../data-list.vue'

const variants = ['normal', 'bold'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-4">
    <template v-for="variant in variants" :key="variant">
      <DataList
        :variant="variant"
        :items="[
          { label: 'Name', value: 'John Doe' },
          { label: 'Email', value: 'john.doe@example.com' },
          { label: 'Phone', value: '123-456-7890' },
        ]"
      />
    </template>
  </div>
</template>
