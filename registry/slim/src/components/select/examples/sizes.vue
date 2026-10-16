<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const form = useForm({
  defaultValues: {
    sm: '',
    md: '',
    lg: '',
  },
})

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="sm" label="SM">
      <Select :model-value="field.state.value" size="sm" :items="items" placeholder="Small" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="md" label="MD">
      <Select :model-value="field.state.value" size="md" :items="items" placeholder="Medium" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="lg" label="LG">
      <Select :model-value="field.state.value" size="lg" :items="items" placeholder="Large" @change="field.api.handleChange" />
    </FormField>
  </Form>
</template>
