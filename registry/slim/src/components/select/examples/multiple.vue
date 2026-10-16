<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const form = useForm({
  defaultValues: {
    fruits: [] as string[],
  },
})

const items: SelectItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
]
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="fruits" label="Fruits">
      <Select
        multiple
        :model-value="field.state.value"
        :items="items"
        prefix-icon="ri:apple-line"
        placeholder="Pick fruits…"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
