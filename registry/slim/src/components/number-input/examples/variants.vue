<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const form = useForm({
  defaultValues: {
    soft: 0,
    outline: 0,
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <NumberInput variant="soft" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <NumberInput variant="outline" placeholder="Outline" />
    </FormField>
  </Form>
</template>
