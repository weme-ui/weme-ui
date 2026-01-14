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
const aligns = ['start', 'center', 'end'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <div v-for="align in aligns" :key="align">
        <RadioGroup v-model="value" :items="items" :align="align" :variant="variant" />
      </div>
    </template>
  </div>
</template>
