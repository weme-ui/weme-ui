<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
import FormField from '../form-field.vue'

const form = useForm({
  defaultValues: {
    email: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email">
      <input
        class="text-sm px-3 py-2 outline-none border b-base rounded-md bg-base w-full focus:b-elevated"
        type="email"
        :name="field.name"
        :value="field.state.value"
        placeholder="you@example.com"
        @blur="field.handleBlur"
        @input="field.handleChange(($event.target as HTMLInputElement).value)"
      >
    </FormField>
  </Form>
</template>
