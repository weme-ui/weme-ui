<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import NumberInput from '../number-input.vue'

const form = useForm({
  defaultValues: {
    volume: 50,
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="volume" label="Volume">
      <NumberInput
        :min="0"
        :max="100"
        decrement-icon="ri:volume-down-line"
        increment-icon="ri:volume-up-line"
        placeholder="0"
      />
    </FormField>
  </Form>
</template>
