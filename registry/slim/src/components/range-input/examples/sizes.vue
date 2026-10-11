<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const form = useForm({
  defaultValues: {
    sm: [0, 10] as [number, number],
    md: [0, 10] as [number, number],
    lg: [0, 10] as [number, number],
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <RangeInput size="sm" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="md" label="MD">
      <RangeInput size="md" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="lg" label="LG">
      <RangeInput size="lg" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
  </Form>
</template>
