<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const form = useForm({
  defaultValues: {
    icons: '',
    text: '',
  },
})

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Search', value: 'search', icon: 'ri:search-line' },
]
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="icons" label="With icons">
      <Autocomplete
        prefix-icon="ri:search-line"
        suffix-icon="ri:sparkling-line"
        :items="items"
        placeholder="Search…"
        open-on-focus
      />
    </FormField>
    <FormField name="text" label="With text">
      <Autocomplete
        prefix="@"
        suffix=".com"
        :items="items"
        placeholder="handle"
        open-on-focus
      />
    </FormField>
  </Form>
</template>
