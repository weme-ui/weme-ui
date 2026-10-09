<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
import FormField from '../form-field.vue'

const form = useForm({
  defaultValues: {
    password: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="password" label="Password" hint="Optional">
      <template #default="{ field }">
        <input
          class="text-sm px-3 py-2 outline-none border border-border-base rounded-md bg-background-base w-full focus:border-border-elevated"
          type="password"
          :name="field.name"
          :value="field.state.value"
          @blur="field.handleBlur"
          @input="field.handleChange(($event.target as HTMLInputElement).value)"
        >
      </template>
    </FormField>
  </Form>
</template>
