<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import CheckboxGroup from '../checkbox-group.vue'

const form = useForm({
  defaultValues: {
    vertical: ['design'],
    horizontal: ['design'],
  },
})

const items: CheckboxGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-6 max-w-md w-full">
    <FormField v-slot="{ field }" name="vertical" label="Vertical">
      <CheckboxGroup
        orientation="vertical"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="horizontal" label="Horizontal">
      <CheckboxGroup
        orientation="horizontal"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
