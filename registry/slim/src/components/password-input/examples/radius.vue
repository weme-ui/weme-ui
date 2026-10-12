<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const form = useForm({
  defaultValues: {
    none: '',
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    full: '',
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <PasswordInput toggle-visibility radius="none" placeholder="None" />
    </FormField>
    <FormField name="xs" label="XS">
      <PasswordInput toggle-visibility radius="xs" placeholder="Extra small" />
    </FormField>
    <FormField name="sm" label="Small">
      <PasswordInput toggle-visibility radius="sm" placeholder="Small" />
    </FormField>
    <FormField name="md" label="Medium">
      <PasswordInput toggle-visibility radius="md" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="Large">
      <PasswordInput toggle-visibility radius="lg" placeholder="Large" />
    </FormField>
    <FormField name="xl" label="Extra large">
      <PasswordInput toggle-visibility radius="xl" placeholder="Extra large" />
    </FormField>
    <FormField name="full" label="Full">
      <PasswordInput toggle-visibility radius="full" placeholder="Full" />
    </FormField>
  </Form>
</template>
