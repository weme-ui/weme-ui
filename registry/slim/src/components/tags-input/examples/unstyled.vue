<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const form = useForm({
  defaultValues: {
    tags: '',
  },
})

const tags = ref<TagsInputValue[]>(['custom'])
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="tags" label="Unstyled">
      <TagsInput
        v-model="tags"
        unstyled
        placeholder="Fully custom…"
        class="text-sm py-1 outline-none border-b b-base flex flex-wrap gap-1 w-full focus-within:b-accent"
      />
    </FormField>
  </Form>
</template>
