<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import CheckboxGroup from '../checkbox-group.vue'

const form = useForm({
  defaultValues: {
    picks: ['a'] as string[],
  },
})

const items: CheckboxGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
]
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="picks" label="Pick up to 2">
      <CheckboxGroup
        :max="2"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
