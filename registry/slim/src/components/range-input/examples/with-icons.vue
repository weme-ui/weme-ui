<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const form = useForm({
  defaultValues: {
    amount: [10, 90] as [number, number],
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="amount" label="Amount">
      <RangeInput
        from-icon="ri:arrow-left-s-line"
        to-icon="ri:arrow-right-s-line"
        from-placeholder="Min"
        to-placeholder="Max"
      />
    </FormField>
  </Form>
</template>
