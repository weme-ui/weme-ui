<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
  },
})

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="soft" label="Soft">
      <Select :model-value="field.state.value" variant="soft" :items="items" placeholder="Soft" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="outline" label="Outline">
      <Select :model-value="field.state.value" variant="outline" :items="items" placeholder="Outline" @change="field.api.handleChange" />
    </FormField>
  </Form>
</template>
