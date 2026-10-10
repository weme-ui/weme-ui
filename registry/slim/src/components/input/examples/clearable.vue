<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const form = useForm({
  defaultValues: {
    name: 'Weme UI',
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="name" label="Name">
      <Input
        clearable
        :model-value="field.state.value"
        placeholder="Clearable"
        @change="field.api.handleChange($event.target?.value)"
        @clean="field.api.handleChange('')"
      />
    </FormField>
  </Form>
</template>
