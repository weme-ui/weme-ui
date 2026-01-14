<script lang="ts" setup>
import type { SegmentedControlItem } from '../segmented-control.props'
import SegmentedControl from '../segmented-control.vue'

const value = ref('option-1')

const items: SegmentedControlItem[] = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
]

const orientations = ['horizontal', 'vertical'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="orientation in orientations" :key="orientation">
      <SegmentedControl v-model="value" :items="items" :orientation="orientation" />
    </template>
  </div>
</template>
