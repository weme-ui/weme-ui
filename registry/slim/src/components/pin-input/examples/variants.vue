<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const form = useForm({
  defaultValues: {
    soft: [] as string[],
    outline: [] as string[],
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <PinInput variant="soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <PinInput variant="outline" />
    </FormField>
  </Form>
</template>
