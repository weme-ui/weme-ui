<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
  },
})

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Listbox variant="soft" :items="items" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <Listbox variant="outline" :items="items" placeholder="Outline" />
    </FormField>
  </Form>
</template>
