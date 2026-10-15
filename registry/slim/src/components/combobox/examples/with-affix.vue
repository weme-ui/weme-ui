<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const form = useForm({
  defaultValues: {
    icons: '',
    text: '',
  },
})

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Search', value: 'search', icon: 'ri:search-line' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="icons" label="With icons">
      <Combobox
        prefix-icon="ri:search-line"
        suffix-icon="ri:sparkling-line"
        :items="items"
        placeholder="Search…"
      />
    </FormField>
    <FormField name="text" label="With text">
      <Combobox
        prefix="@"
        suffix=".com"
        :items="items"
        placeholder="handle"
      />
    </FormField>
  </Form>
</template>
