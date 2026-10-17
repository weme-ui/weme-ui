<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const form = useForm({
  defaultValues: {
    none: true,
    sm: true,
    md: true,
    full: true,
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="none">
      <Checkbox
        radius="none"
        label="None"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="sm">
      <Checkbox
        radius="sm"
        label="SM"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="md">
      <Checkbox
        radius="md"
        label="MD"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
    <FormField v-slot="{ field }" name="full">
      <Checkbox
        radius="full"
        label="Full"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
