<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const form = useForm({
  defaultValues: {
    food: '',
  },
})

const items: AutocompleteItems = [
  [
    { type: 'label', label: 'Fruits', value: 'fruits' },
    { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
    { label: 'Banana', value: 'banana' },
    { type: 'separator', value: 'sep-1' },
  ],
  [
    { type: 'label', label: 'Vegetables', value: 'vegetables' },
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
  ],
]
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="food" label="Food">
      <Autocomplete
        :model-value="field.state.value"
        :items="items"
        placeholder="Search food…"
        open-on-focus
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
