<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import CheckboxGroup from '../checkbox-group.vue'

const form = useForm({
  defaultValues: {
    soft: ['a'],
    outline: ['a'],
    card: ['a'],
  },
})

const items: CheckboxGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-6 max-w-sm w-full">
    <FormField v-slot="{ field }" name="soft" label="Soft">
      <CheckboxGroup
        variant="soft"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="outline" label="Outline">
      <CheckboxGroup
        variant="outline"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="card" label="Card">
      <CheckboxGroup
        variant="card"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
