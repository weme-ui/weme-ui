<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const form = useForm({
  defaultValues: {
    drink: '',
  },
})

const items: ListboxItems = [
  { label: 'Beer', value: 'beer', icon: 'ri:beer-line', selectedIcon: 'ri:beer-fill', iconClass: 'text-accent' },
  { label: 'Coffee', value: 'coffee', icon: 'ri:drinks-line', selectedIcon: 'ri:drinks-fill', iconClass: 'text-neutral' },
  { label: 'Juice', value: 'juice', icon: 'ri:goblet-line', selectedIcon: 'ri:goblet-fill', iconClass: 'text-info' },
  { label: 'Milk Tea', value: 'milk tea', icon: 'ri:drinks-2-line', selectedIcon: 'ri:drinks-2-fill', iconClass: 'text-warning' },
  { label: 'Wine', value: 'wine', description: 'A type of alcoholic beverage made from fermented grapes', icon: 'ri:goblet-2-line', selectedIcon: 'ri:goblet-2-fill', iconClass: 'text-error' },
]
</script>

<template>
  <Form :form="form" class="w-full">
    <FormField v-slot="{ field }" name="drink" label="Pick a drink">
      <Listbox
        orientation="horizontal"
        :model-value="field.state.value"
        :items="items"
        placeholder="Search drinks…"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
