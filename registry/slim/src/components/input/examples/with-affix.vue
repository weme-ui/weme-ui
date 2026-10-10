<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    icons: '',
    text: '',
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="icons" label="With icons">
      <Input
        prefix-icon="ri:mail-line"
        suffix-icon="ri:search-line"
        placeholder="Search mail"
      />
    </FormField>
    <FormField name="text" label="With text">
      <Input prefix="https://" suffix=".com" placeholder="example" />
    </FormField>
  </Form>
</template>
