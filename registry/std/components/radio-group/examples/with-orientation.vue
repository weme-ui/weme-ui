<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const value = ref('option-1')

const items: RadioGroupItem[] = [
  { label: 'Option 1', description: 'This is a description.', value: 'option-1' },
  { label: 'Option 2', description: 'This is a description.', value: 'option-2' },
  { label: 'Option 3', description: 'This is a description.', value: 'option-3' },
]

const variants = ['list', 'card', 'table'] as const
const orientations = ['horizontal', 'vertical'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <div v-for="orientation in orientations" :key="orientation">
        <RadioGroup v-model="value" :items="items" :orientation="orientation" :variant="variant" />
      </div>
    </template>
  </div>
</template>
