<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const form = useForm({
  defaultValues: {
    bio: '',
  },
  onSubmit: async () => {},
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField
      v-slot="{ field }"
      name="bio"
      label="Bio"
      help="Keep it under 160 characters."
    >
      <Input
        :model-value="field.state.value"
        placeholder="Short bio"
        @blur="field.api.handleBlur"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
