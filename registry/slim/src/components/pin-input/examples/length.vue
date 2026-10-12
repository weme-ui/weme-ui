<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const form = useForm({
  defaultValues: {
    code: [] as string[],
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="code" label="6-digit code">
      <PinInput :length="6" />
    </FormField>
  </Form>
</template>
