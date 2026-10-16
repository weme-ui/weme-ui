<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const form = useForm({
  defaultValues: {
    icons: '',
    text: '',
  },
})

const items: SelectItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Search', value: 'search', icon: 'ri:search-line' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="icons" label="With icons">
      <Select
        prefix-icon="ri:search-line"
        suffix-icon="ri:sparkling-line"
        :model-value="field.state.value"
        :items="items"
        placeholder="Select…"
        @change="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="text" label="With text">
      <Select
        prefix="@"
        suffix=".com"
        :model-value="field.state.value"
        :items="items"
        placeholder="handle"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
