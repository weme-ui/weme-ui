<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const form = useForm({
  defaultValues: {
    none: '',
    sm: '',
    md: '',
    lg: '',
    full: '',
  },
})

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <Combobox radius="none" :items="items" placeholder="None" />
    </FormField>
    <FormField name="sm" label="SM">
      <Combobox radius="sm" :items="items" placeholder="SM" />
    </FormField>
    <FormField name="md" label="MD">
      <Combobox radius="md" :items="items" placeholder="MD" />
    </FormField>
    <FormField name="lg" label="LG">
      <Combobox radius="lg" :items="items" placeholder="LG" />
    </FormField>
    <FormField name="full" label="Full">
      <Combobox radius="full" :items="items" placeholder="Full" />
    </FormField>
  </Form>
</template>
