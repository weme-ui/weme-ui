<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <PasswordInput toggle-visibility variant="soft" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <PasswordInput toggle-visibility variant="outline" placeholder="Outline" />
    </FormField>
  </Form>
</template>
