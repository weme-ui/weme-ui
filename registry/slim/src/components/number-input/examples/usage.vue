<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const form = useForm({
  defaultValues: {
    quantity: 1,
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="quantity" label="Quantity">
      <NumberInput
        :model-value="field.state.value"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
