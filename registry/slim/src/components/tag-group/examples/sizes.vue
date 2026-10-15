<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const form = useForm({
  defaultValues: {
    sm: '',
    md: '',
    lg: '',
  },
})

function createItems(): TagGroupItem[] {
  return [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ]
}

const smItems = ref(createItems())
const mdItems = ref(createItems())
const lgItems = ref(createItems())
</script>

<template>
  <Form :form="form" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="sm" label="Small">
      <TagGroup size="sm" :items="smItems" />
    </FormField>
    <FormField name="md" label="Medium">
      <TagGroup size="md" :items="mdItems" />
    </FormField>
    <FormField name="lg" label="Large">
      <TagGroup size="lg" :items="lgItems" />
    </FormField>
  </Form>
</template>
