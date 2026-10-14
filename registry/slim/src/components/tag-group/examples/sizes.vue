<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
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

function onRemove(target: typeof smItems, values: TagGroupItemValue[]) {
  target.value = target.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <Form :form="form" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="sm" label="Small">
      <TagGroup size="sm" :items="smItems" @remove="values => onRemove(smItems, values)" />
    </FormField>
    <FormField name="md" label="Medium">
      <TagGroup size="md" :items="mdItems" @remove="values => onRemove(mdItems, values)" />
    </FormField>
    <FormField name="lg" label="Large">
      <TagGroup size="lg" :items="lgItems" @remove="values => onRemove(lgItems, values)" />
    </FormField>
  </Form>
</template>
