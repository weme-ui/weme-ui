<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const form = useForm({
  defaultValues: {
    none: 0,
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    full: 0,
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <NumberInput radius="none" placeholder="None" />
    </FormField>
    <FormField name="xs" label="XS">
      <NumberInput radius="xs" placeholder="XS" />
    </FormField>
    <FormField name="sm" label="SM">
      <NumberInput radius="sm" placeholder="SM" />
    </FormField>
    <FormField name="md" label="MD">
      <NumberInput radius="md" placeholder="MD" />
    </FormField>
    <FormField name="lg" label="LG">
      <NumberInput radius="lg" placeholder="LG" />
    </FormField>
    <FormField name="xl" label="XL">
      <NumberInput radius="xl" placeholder="XL" />
    </FormField>
    <FormField name="full" label="Full">
      <NumberInput radius="full" placeholder="Full" />
    </FormField>
  </Form>
</template>
