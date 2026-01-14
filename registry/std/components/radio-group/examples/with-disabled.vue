<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const value = ref('option-1')

const items: RadioGroupItem[] = [
  { label: 'Option 1', description: 'This is a description.', value: 'option-1' },
  { label: 'Option 2', description: 'This is a description.', value: 'option-2' },
  { label: 'Option 3', description: 'This is a description.', value: 'option-3', disabled: true },
]

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <RadioGroup v-model="value" :items="items" :color="color" disabled />
    </template>
  </div>

  <div class="flex-(~ center) gap-6 mt-6">
    <template v-for="color in colors" :key="color">
      <RadioGroup v-model="value" :items="items" :color="color" />
    </template>
  </div>
</template>
