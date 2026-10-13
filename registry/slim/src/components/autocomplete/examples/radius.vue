<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const form = useForm({
  defaultValues: {
    none: '',
    sm: '',
    md: '',
    lg: '',
    full: '',
  },
})

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <Autocomplete radius="none" :items="items" placeholder="None" open-on-focus />
    </FormField>
    <FormField name="sm" label="SM">
      <Autocomplete radius="sm" :items="items" placeholder="SM" open-on-focus />
    </FormField>
    <FormField name="md" label="MD">
      <Autocomplete radius="md" :items="items" placeholder="MD" open-on-focus />
    </FormField>
    <FormField name="lg" label="LG">
      <Autocomplete radius="lg" :items="items" placeholder="LG" open-on-focus />
    </FormField>
    <FormField name="full" label="Full">
      <Autocomplete radius="full" :items="items" placeholder="Full" open-on-focus />
    </FormField>
  </Form>
</template>
