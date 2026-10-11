<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import RangeInput from '../range-input.vue'

const form = useForm({
  defaultValues: {
    price: [0, 100] as [number, number],
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="price" label="Price">
      <RangeInput
        :model-value="field.state.value"
        from-placeholder="Min"
        to-placeholder="Max"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
