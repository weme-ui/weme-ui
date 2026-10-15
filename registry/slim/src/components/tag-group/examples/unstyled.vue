<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const form = useForm({
  defaultValues: {
    tags: '',
  },
})

const items = ref<TagGroupItem[]>([
  { label: 'Plain', value: 'plain' },
  { label: 'Custom', value: 'custom' },
  { label: 'Styles', value: 'styles' },
])
</script>

<template>
  <Form :form="form" class="max-w-sm w-full">
    <FormField name="tags" label="Unstyled">
      <TagGroup unstyled :items="items" />
    </FormField>
  </Form>
</template>
