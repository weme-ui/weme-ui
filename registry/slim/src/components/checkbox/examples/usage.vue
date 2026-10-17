<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const form = useForm({
  defaultValues: {
    terms: false,
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="terms">
      <Checkbox
        variant="card"
        indicator="end"
        radius="xl"
        label="Accept terms and conditions"
        description="By accepting, you agree to the terms and conditions"
        :model-value="field.state.value"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
