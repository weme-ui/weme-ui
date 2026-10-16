<script lang="ts" setup>
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const form = useForm({
  defaultValues: {
    auto: '',
    fixed: '',
  },
})
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField v-slot="{ field }" name="auto" label="Auto size">
      <Textarea
        :model-value="field.state.value"
        :auto-size="true"
        :rows="2"
        :max-rows="6"
        placeholder="Grows with content…"
        @change="field.api.handleChange"
      />
    </FormField>
    <FormField name="fixed" label="Fixed rows">
      <Textarea
        :auto-size="false"
        :rows="4"
        placeholder="Fixed height…"
      />
    </FormField>
  </Form>
</template>
