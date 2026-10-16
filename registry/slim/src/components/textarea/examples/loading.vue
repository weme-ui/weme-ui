<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const form = useForm({
  defaultValues: {
    notes: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="notes" label="Notes">
      <Textarea loading placeholder="Loading…" />
    </FormField>
  </Form>
</template>
