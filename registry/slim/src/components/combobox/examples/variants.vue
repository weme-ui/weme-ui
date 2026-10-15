<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
  },
})

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Combobox variant="soft" :items="items" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <Combobox variant="outline" :items="items" placeholder="Outline" />
    </FormField>
  </Form>
</template>
