<script lang="ts" setup>
import type { SelectOption } from '../select.props'
import Status from '../../status/status.vue'
import Select from '../select.vue'

const value = ref('')

const options: SelectOption<string>[][] = [
  [
    { label: 'Info', value: 'option-1', color: 'info' },
    { label: 'Success', value: 'option-2', color: 'success' },
    { label: 'Warning', value: 'option-3', color: 'warning' },
    { label: 'Danger', value: 'option-4', color: 'danger' },
  ],
]

const flatOptions = options.flat()
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Select
      v-model="value"
      :options="options"
      placeholder="Select"
    >
      <template #prefix="{ modelValue }">
        <Status
          v-if="modelValue"
          :color="flatOptions.find(opt => opt.value === modelValue)?.color"
          animate
        />
        <Status v-else color="neutral" />
      </template>

      <template #item-icon="{ option }">
        <Status :color="option.color" />
      </template>
    </Select>
  </div>
</template>
