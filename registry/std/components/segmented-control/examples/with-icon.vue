<script lang="ts" setup>
import type { SegmentedControlItem } from '../segmented-control.props'
import SegmentedControl from '../segmented-control.vue'

const value = ref('option-1')

const items: SegmentedControlItem[] = [
  { value: 'option-1', label: 'Option 1', icon: 'lucide:circle' },
  { value: 'option-2', label: 'Option 2', icon: 'lucide:square' },
  { value: 'option-3', label: 'Option 3', icon: 'lucide:triangle' },
]

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <div v-for="radius in radiuses" :key="radius">
        <SegmentedControl v-model="value" :items="items" :radius="radius" :size="size" />
      </div>
    </template>
  </div>
</template>
