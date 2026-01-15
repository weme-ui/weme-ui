<script lang="ts" setup>
import type { SelectOption } from '../select.props'
import Select from '../select.vue'

const value = ref('')

const options: SelectOption<string>[][] = [
  [
    { type: 'label', label: 'Group 1', value: 'label-1' },
    { icon: 'lucide:circle', label: 'Circle', value: 'option-1' },
    { icon: 'lucide:square', label: 'Square', value: 'option-2' },
    { icon: 'lucide:triangle', label: 'Triangle', value: 'option-3' },
    { icon: 'lucide:hexagon', label: 'Hexagon', value: 'option-4' },
    { type: 'separator', value: 'separator-1' },
  ],
  [
    { type: 'label', label: 'Group 2', value: 'label-2' },
    { icon: 'lucide:text-align-justify', label: 'Align justify', value: 'option-5' },
    { icon: 'lucide:text-align-center', label: 'Align center', value: 'option-6' },
    { icon: 'lucide:text-align-end', label: 'Align end', value: 'option-7' },
    { icon: 'lucide:text-align-start', label: 'Align start', value: 'option-8', disabled: true },
  ],
]
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Select
      v-model="value"
      :options="options"
      placeholder="Select"
      multiple
    />
  </div>
</template>
