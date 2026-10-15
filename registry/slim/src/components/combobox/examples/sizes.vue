<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const form = useForm({
  defaultValues: {
    sm: '',
    md: '',
    lg: '',
  },
})

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <Combobox size="sm" :items="items" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <Combobox size="md" :items="items" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <Combobox size="lg" :items="items" placeholder="Large" />
    </FormField>
  </Form>
</template>
