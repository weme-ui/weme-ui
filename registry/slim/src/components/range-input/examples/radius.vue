<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const form = useForm({
  defaultValues: {
    none: [0, 10] as [number, number],
    xs: [0, 10] as [number, number],
    sm: [0, 10] as [number, number],
    md: [0, 10] as [number, number],
    lg: [0, 10] as [number, number],
    xl: [0, 10] as [number, number],
    full: [0, 10] as [number, number],
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <RangeInput radius="none" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="xs" label="XS">
      <RangeInput radius="xs" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="sm" label="SM">
      <RangeInput radius="sm" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="md" label="MD">
      <RangeInput radius="md" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="lg" label="LG">
      <RangeInput radius="lg" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="xl" label="XL">
      <RangeInput radius="xl" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
    <FormField name="full" label="Full">
      <RangeInput radius="full" from-placeholder="Min" to-placeholder="Max" />
    </FormField>
  </Form>
</template>
