<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const form = useForm({
  defaultValues: {
    value: [0, 10] as [number, number],
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="value" label="Custom Styled">
      <RangeInput
        unstyled
        from-placeholder="Min"
        to-placeholder="Max"
        class="text-sm outline-none border-b b-base flex gap-2 w-full items-center focus-within:b-accent"
      />
    </FormField>
  </Form>
</template>
