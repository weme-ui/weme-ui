<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
import FormField from '../form-field.vue'

const form = useForm({
  defaultValues: {
    vertical: '',
    horizontal: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="gap-6 max-w-md w-full">
    <FormField name="vertical" label="Vertical" orientation="vertical">
      <template #default="{ field }">
        <input
          class="text-sm px-3 py-2 outline-none border border-border-base rounded-md bg-background-base w-full focus:border-border-elevated"
          type="text"
          :name="field.name"
          :value="field.state.value"
          @blur="field.handleBlur"
          @input="field.handleChange(($event.target as HTMLInputElement).value)"
        >
      </template>
    </FormField>

    <FormField name="horizontal" label="Horizontal" orientation="horizontal">
      <template #default="{ field }">
        <input
          class="text-sm px-3 py-2 outline-none border border-border-base rounded-md bg-background-base w-full focus:border-border-elevated"
          type="text"
          :name="field.name"
          :value="field.state.value"
          @blur="field.handleBlur"
          @input="field.handleChange(($event.target as HTMLInputElement).value)"
        >
      </template>
    </FormField>
  </Form>
</template>
