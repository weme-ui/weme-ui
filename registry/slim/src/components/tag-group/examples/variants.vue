<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
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

function onRemove(target: typeof softItems, values: TagGroupItemValue[]) {
  target.value = target.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <Form :form="form" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <TagGroup variant="soft" :items="softItems" @remove="values => onRemove(softItems, values)" />
    </FormField>
    <FormField name="outline" label="Outline">
      <TagGroup variant="outline" :items="outlineItems" @remove="values => onRemove(outlineItems, values)" />
    </FormField>
    <FormField name="inverted" label="Inverted">
      <TagGroup variant="inverted" :items="invertedItems" @remove="values => onRemove(invertedItems, values)" />
    </FormField>
  </Form>
</template>
