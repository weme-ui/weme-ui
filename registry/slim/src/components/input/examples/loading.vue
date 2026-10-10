<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    query: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="query" label="Search">
      <Input loading placeholder="Loading…" />
    </FormField>
  </Form>
</template>
