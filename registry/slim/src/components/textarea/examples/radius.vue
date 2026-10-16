<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const form = useForm({
  defaultValues: {
    none: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <Textarea radius="none" placeholder="None" />
    </FormField>
    <FormField name="sm" label="SM">
      <Textarea radius="sm" placeholder="SM" />
    </FormField>
    <FormField name="md" label="MD">
      <Textarea radius="md" placeholder="MD" />
    </FormField>
    <FormField name="lg" label="LG">
      <Textarea radius="lg" placeholder="LG" />
    </FormField>
    <FormField name="xl" label="XL">
      <Textarea radius="xl" placeholder="XL" />
    </FormField>
  </Form>
</template>
