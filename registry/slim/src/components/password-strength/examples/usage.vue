<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../../password-input/password-input.vue'
import PasswordStrength from '../password-strength.vue'

const form = useForm({
  defaultValues: {
    password: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="password" label="Password">
      <PasswordStrength
        :password="String(field.state.value ?? '')"
        show-message
      >
        <PasswordInput
          toggle-visibility
          :model-value="field.state.value"
          placeholder="Enter password"
          @change="field.api.handleChange"
        />
      </PasswordStrength>
    </FormField>
  </Form>
</template>
