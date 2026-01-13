<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Option 1', description: 'This is a description.', value: 'option-1' },
  { label: 'Option 2', description: 'This is a description.', value: 'option-2' },
  { label: 'Option 3', description: 'This is a description.', value: 'option-3' },
]

const variants = ['list', 'card', 'table'] as const
const orientations = ['horizontal', 'vertical'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6 mt-4">
    <template v-for="orientation in orientations" :key="orientation">
      <div v-for="variant in variants" :key="variant">
        <CheckboxGroup :items="items" :orientation="orientation" :variant="variant" />
      </div>
    </template>
  </div>
</template>
