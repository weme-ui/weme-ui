<script lang="ts" setup>
import type { SegmentedControlItem } from '../segmented-control.props'
import SegmentedControl from '../segmented-control.vue'

const value = ref('option-1')

const items: SegmentedControlItem[] = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3', disabled: true },
]
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <SegmentedControl v-model="value" :items="items" disabled />
    <SegmentedControl v-model="value" :items="items" />
  </div>
</template>
