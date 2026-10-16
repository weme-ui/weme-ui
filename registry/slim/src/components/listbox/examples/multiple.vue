<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const form = useForm({
  defaultValues: {
    fruits: [] as string[],
  },
})

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
]
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="fruits" label="Fruits">
      <Listbox
        multiple
        :model-value="field.state.value"
        :items="items"
        placeholder="Pick fruits…"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
