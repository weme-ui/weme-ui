<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const form = useForm({
  defaultValues: {
    email: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email" loading>
      <Input
        :model-value="field.state.value"
        type="email"
        placeholder="you@example.com"
      />
    </FormField>
  </Form>
</template>
