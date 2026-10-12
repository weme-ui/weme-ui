<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const form = useForm({
  defaultValues: {
    password: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="password" label="Password">
      <PasswordInput
        toggle-visibility
        prefix-icon="ri:lock-line"
        placeholder="Enter password"
      />
    </FormField>
  </Form>
</template>
