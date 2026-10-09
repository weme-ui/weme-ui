<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import Form from '../../form/form.vue'
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
      name="bio"
      label="Bio"
      help="Keep it under 160 characters."
    >
      <template #default="{ field }">
        <textarea
          class="text-sm px-3 py-2 outline-none border border-border-base rounded-md bg-background-base min-h-20 w-full focus:border-border-elevated"
          :name="field.name"
          :value="field.state.value"
          @blur="field.handleBlur"
          @input="field.handleChange(($event.target as HTMLTextAreaElement).value)"
        />
      </template>
    </FormField>
  </Form>
</template>
