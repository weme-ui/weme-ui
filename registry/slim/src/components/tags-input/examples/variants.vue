<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
  },
})

const soft = ref<TagsInputValue[]>(['soft'])
const outline = ref<TagsInputValue[]>(['outline'])
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <TagsInput v-model="soft" variant="soft" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <TagsInput v-model="outline" variant="outline" placeholder="Outline" />
    </FormField>
  </Form>
</template>
