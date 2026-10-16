<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const form = useForm({
  defaultValues: {
    none: '',
    sm: '',
    md: '',
    lg: '',
    full: '',
  },
})

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <Listbox radius="none" :items="items" placeholder="None" />
    </FormField>
    <FormField name="sm" label="SM">
      <Listbox radius="sm" :items="items" placeholder="SM" />
    </FormField>
    <FormField name="md" label="MD">
      <Listbox radius="md" :items="items" placeholder="MD" />
    </FormField>
    <FormField name="lg" label="LG">
      <Listbox radius="lg" :items="items" placeholder="LG" />
    </FormField>
    <FormField name="full" label="Full">
      <Listbox radius="full" :items="items" placeholder="Full" />
    </FormField>
  </Form>
</template>
