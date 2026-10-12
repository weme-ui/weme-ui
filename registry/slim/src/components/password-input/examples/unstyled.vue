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
    <FormField name="password" label="Custom Styled">
      <PasswordInput
        toggle-visibility
        unstyled
        placeholder="Fully custom…"
        class="text-sm outline-none border-b b-base flex gap-1 w-full items-center focus-within:b-accent"
      />
    </FormField>
  </Form>
</template>
