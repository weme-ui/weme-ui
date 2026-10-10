<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    email: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="email" label="Email">
      <Input
        :model-value="field.state.value"
        type="email"
        radius="full"
        size="md"
        variant="outline"
        prefix-icon="ri:mail-line"
        placeholder="You@example.com"
        @change="field.api.handleChange($event.target.value)"
      />
    </FormField>
  </Form>
</template>
