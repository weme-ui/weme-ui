<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    value: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="value" label="Custom Styled">
      <Input
        unstyled
        placeholder="Fully custom…"
        class="text-sm py-1 outline-none border-b b-base w-full focus:b-accent"
      />
    </FormField>
  </Form>
</template>
