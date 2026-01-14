<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import Icon from '../../icon/icon.vue'
import RadioGroup from '../radio-group.vue'

const value = ref('option-1')

const items: RadioGroupItem[] = [
  { label: 'Option 1', description: 'This is a description.', value: 'option-1' },
  { label: 'Option 2', description: 'This is a description.', value: 'option-2' },
  { label: 'Option 3', description: 'This is a description.', value: 'option-3' },
]
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <RadioGroup v-model="value" :items="items" indicator="none" variant="card">
      <template #leading="{ checked }">
        <Icon v-if="checked" name="lucide:laugh" class="size-8 text-primary" />
        <Icon v-else name="lucide:smile" class="size-8 text-muted" />
      </template>
    </RadioGroup>

    <RadioGroup v-model="value" :items="items" variant="card">
      <template #trailing="{ checked }">
        <div class="size-9 b-(~ default) rounded-sm" :class="{ 'b-primary': checked }" />
      </template>
    </RadioGroup>
  </div>
</template>
