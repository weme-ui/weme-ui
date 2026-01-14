<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const value = ref('option-1')

const items: RadioGroupItem[] = [
  { label: 'Option 1', description: 'This is a description.', value: 'option-1' },
  { label: 'Option 2', description: 'This is a description.', value: 'option-2' },
  { label: 'Option 3', description: 'This is a description.', value: 'option-3' },
]
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <RadioGroup v-model="value" :items="items" />
  </div>
</template>
