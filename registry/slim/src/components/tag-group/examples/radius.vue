<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const form = useForm({
  defaultValues: {
    none: '',
    md: '',
    full: '',
  },
})

function createItems(): TagGroupItem[] {
  return [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ]
}

const noneItems = ref(createItems())
const mdItems = ref(createItems())
const fullItems = ref(createItems())

function onRemove(target: typeof noneItems, values: TagGroupItemValue[]) {
  target.value = target.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <Form :form="form" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="none" label="None">
      <TagGroup radius="none" :items="noneItems" @remove="values => onRemove(noneItems, values)" />
    </FormField>
    <FormField name="md" label="Medium">
      <TagGroup radius="md" :items="mdItems" @remove="values => onRemove(mdItems, values)" />
    </FormField>
    <FormField name="full" label="Full">
      <TagGroup radius="full" :items="fullItems" @remove="values => onRemove(fullItems, values)" />
    </FormField>
  </Form>
</template>
