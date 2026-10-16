<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const form = useForm({
  defaultValues: {
    bio: '',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="bio" label="Bio">
      <Textarea
        :model-value="field.state.value"
        :max-length="100"
        placeholder="Tell us about yourself…"
        countable
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
