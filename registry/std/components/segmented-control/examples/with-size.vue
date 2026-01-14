<script lang="ts" setup>
import type { SegmentedControlItem } from '../segmented-control.props'
import SegmentedControl from '../segmented-control.vue'

const value = ref('option-1')

const items: SegmentedControlItem[] = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
]

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center wrap) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <SegmentedControl v-model="value" :items="items" :size="size" />
    </template>
  </div>

  <div class="flex-(~ center wrap) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <SegmentedControl v-model="value" :items="items" :size="size" orientation="vertical" />
    </template>
  </div>
</template>
