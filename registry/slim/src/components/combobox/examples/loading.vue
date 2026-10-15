<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const form = useForm({
  defaultValues: {
    query: '',
  },
})

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="query" label="Search">
      <Combobox loading :items="items" placeholder="Loading…" />
    </FormField>
  </Form>
</template>
