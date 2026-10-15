<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const form = useForm({
  defaultValues: {
    tags: ['design', 'vue'] as TagsInputValue[],
  },
})
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="tags" label="Tags">
      <TagsInput
        :model-value="field.state.value"
        placeholder="Add a tag…"
        prefix-icon="ri:search-line"
        clearable
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
