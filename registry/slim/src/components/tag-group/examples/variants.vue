<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const form = useForm({
  defaultValues: {
    soft: '',
    outline: '',
    inverted: '',
  },
})

function createItems(): TagGroupItem[] {
  return [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ]
}

const softItems = ref(createItems())
const outlineItems = ref(createItems())
const invertedItems = ref(createItems())
</script>

<template>
  <Form :form="form" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <TagGroup variant="soft" :items="softItems" />
    </FormField>
    <FormField name="outline" label="Outline">
      <TagGroup variant="outline" :items="outlineItems" />
    </FormField>
    <FormField name="inverted" label="Inverted">
      <TagGroup variant="inverted" :items="invertedItems" />
    </FormField>
  </Form>
</template>
