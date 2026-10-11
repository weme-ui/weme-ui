<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Input variant="soft" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <Input variant="outline" placeholder="Outline" />
    </FormField>
  </Form>
</template>
