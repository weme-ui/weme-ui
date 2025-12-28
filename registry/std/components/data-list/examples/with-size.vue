<script lang="ts" setup>
import DataList from '../data-list.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-4">
    <template v-for="size in sizes" :key="size">
      <DataList
        :size="size"
        :items="[
          { label: 'Name', value: 'John Doe' },
          { label: 'Email', value: 'john.doe@example.com' },
          { label: 'Phone', value: '123-456-7890' },
        ]"
      />
    </template>
  </div>
</template>
