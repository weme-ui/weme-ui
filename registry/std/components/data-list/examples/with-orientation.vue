<script lang="ts" setup>
import DataList from '../data-list.vue'

const orientations = ['horizontal', 'vertical'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6">
    <template v-for="orientation in orientations" :key="orientation">
      <DataList
        :orientation="orientation"
        :items="[
          { label: 'Name', value: 'John Doe' },
          { label: 'Email', value: 'john.doe@example.com' },
          { label: 'Phone', value: '123-456-7890' },
        ]"
      />
    </template>
  </div>
</template>
