<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
import { ref } from 'vue'
import { useForm } from '~/composables/use-form-context'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import TagGroup from '../tag-group.vue'

const form = useForm({
  defaultValues: {
    single: '',
    multiple: '',
  },
})

const singleItems = ref<TagGroupItem[]>([
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
])

const multipleItems = ref<TagGroupItem[]>([
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
])

const singleValue = ref<TagGroupItemValue>()
const multipleValue = ref<TagGroupItemValue[]>([])

function onRemove(target: typeof singleItems, values: TagGroupItemValue[]) {
  target.value = target.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <Form :form="form" class="flex flex-col gap-4 max-w-sm w-full">
    <FormField name="single" label="Single">
      <TagGroup
        v-model="singleValue"
        selection-mode="single"
        :items="singleItems"
        @remove="values => onRemove(singleItems, values)"
      />
    </FormField>
    <FormField name="multiple" label="Multiple">
      <TagGroup
        v-model="multipleValue"
        selection-mode="multiple"
        :items="multipleItems"
        @remove="values => onRemove(multipleItems, values)"
      />
    </FormField>
  </Form>
</template>
