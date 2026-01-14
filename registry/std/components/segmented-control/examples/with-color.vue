<script lang="ts" setup>
import type { SegmentedControlItem } from '../segmented-control.props'
import SegmentedControl from '../segmented-control.vue'

const value = ref('option-1')

const items: SegmentedControlItem[] = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
]

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <SegmentedControl v-model="value" :items="items" :color="color" />
    </template>
  </div>
</template>
