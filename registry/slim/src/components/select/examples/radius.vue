<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const form = useForm({
  defaultValues: {
    none: '',
    sm: '',
    md: '',
    lg: '',
    full: '',
  },
})

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="none" label="None">
      <Select :model-value="field.state.value" radius="none" :items="items" placeholder="None" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="sm" label="SM">
      <Select :model-value="field.state.value" radius="sm" :items="items" placeholder="SM" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="md" label="MD">
      <Select :model-value="field.state.value" radius="md" :items="items" placeholder="MD" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="lg" label="LG">
      <Select :model-value="field.state.value" radius="lg" :items="items" placeholder="LG" @change="field.api.handleChange" />
    </FormField>
    <FormField v-slot="{ field }" name="full" label="Full">
      <Select :model-value="field.state.value" radius="full" :items="items" placeholder="Full" @change="field.api.handleChange" />
    </FormField>
  </Form>
</template>
