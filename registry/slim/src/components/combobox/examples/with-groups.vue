<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const form = useForm({
  defaultValues: {
    food: '',
  },
})

const items: ComboboxItems = [
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
      <Combobox
        :model-value="field.state.value"
        :items="items"
        placeholder="Search food…"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
