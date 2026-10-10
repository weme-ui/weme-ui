<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const form = useForm({
  defaultValues: {
    displayName: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField
      v-slot="{ field }"
      name="displayName"
      label="Display name"
      description="Shown on your public profile."
    >
      <Input
        :model-value="field.state.value"
        placeholder="Display name"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
