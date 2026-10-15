<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagsInput from '../tags-input.vue'

const form = useForm({
  defaultValues: {
    none: '',
    md: '',
    full: '',
  },
})

const none = ref<TagsInputValue[]>(['none'])
const md = ref<TagsInputValue[]>(['md'])
const full = ref<TagsInputValue[]>(['full'])
</script>

<template>
  <Form :form="form" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <TagsInput v-model="none" radius="none" placeholder="None" />
    </FormField>
    <FormField name="md" label="Medium">
      <TagsInput v-model="md" radius="md" placeholder="Medium" />
    </FormField>
    <FormField name="full" label="Full">
      <TagsInput v-model="full" radius="full" placeholder="Full" />
    </FormField>
  </Form>
</template>
