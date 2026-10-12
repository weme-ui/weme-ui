<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const form = useForm({
  defaultValues: {
    password: 'secret',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="password" label="Password">
      <PasswordInput
        toggle-visibility
        visible
        :model-value="field.state.value"
        placeholder="Visible by default"
      />
    </FormField>
  </Form>
</template>
