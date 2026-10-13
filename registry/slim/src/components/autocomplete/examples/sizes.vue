<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const form = useForm({
  defaultValues: {
    sm: '',
    md: '',
    lg: '',
  },
})

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <Autocomplete size="sm" :items="items" placeholder="Small" open-on-focus />
    </FormField>
    <FormField name="md" label="MD">
      <Autocomplete size="md" :items="items" placeholder="Medium" open-on-focus />
    </FormField>
    <FormField name="lg" label="LG">
      <Autocomplete size="lg" :items="items" placeholder="Large" open-on-focus />
    </FormField>
  </Form>
</template>
