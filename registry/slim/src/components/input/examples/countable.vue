<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    bio: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="bio" label="Bio">
      <Input
        countable
        :max-length="32"
        :model-value="field.state.value"
        placeholder="Up to 32 characters"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
