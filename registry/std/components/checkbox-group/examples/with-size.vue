<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Option 1', description: 'This is a description.', value: 'option-1' },
  { label: 'Option 2', description: 'This is a description.', value: 'option-2' },
  { label: 'Option 3', description: 'This is a description.', value: 'option-3' },
]

const variants = ['list', 'card', 'table'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <div v-for="size in sizes" :key="size">
        <CheckboxGroup :items="items" :size="size" :variant="variant" />
      </div>
    </template>
  </div>
</template>
