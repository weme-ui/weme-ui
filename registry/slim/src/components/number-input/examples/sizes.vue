<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const form = useForm({
  defaultValues: {
    sm: 0,
    md: 0,
    lg: 0,
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <NumberInput size="sm" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <NumberInput size="md" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <NumberInput size="lg" placeholder="Large" />
    </FormField>
  </Form>
</template>
