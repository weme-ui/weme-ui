<script lang="ts" setup>
import type { SelectItem } from '@registry/std/components/select/select.props'
import Select from '@registry/std/components/select/select.vue'

const items = shallowReactive<SelectItem[][]>([])
const loading = ref(false)
const value = ref<string>()

function onOpen(open: boolean) {
  if (open && !items.length) {
    loading.value = true

    setTimeout(() => {
      items.push(
        [
          { type: 'label', label: 'Default', value: 'label-1' },
          { label: 'Item 1', value: 'item-1' },
          { label: 'Item 2', value: 'item-2' },
          { label: 'Item 3', value: 'item-3' },
        ],
        [
          { type: 'label', label: 'With Icon', value: 'label-2' },
          { icon: 'info', label: 'Item 1', value: 'item-4' },
          { icon: 'success', label: 'Item 2', value: 'item-5' },
          { icon: 'error', label: 'Item 3', value: 'item-6' },
        ],
        [
          { type: 'label', label: 'With Chip', value: 'label-3' },
          { label: 'Item 1', value: 'item-7', chip: { color: 'info', variant: 'dotted' } },
          { label: 'Item 2', value: 'item-8', chip: { color: 'success', variant: 'dotted' } },
          { label: 'Item 3', value: 'item-9', chip: { color: 'error', variant: 'dotted' } },
        ],
        [
          { type: 'label', label: 'With Avatar', value: 'label-4' },
          { label: 'Item 1', value: 'item-10', avatar: { src: 'https://www.shadcn-vue.com/avatars/01.png' } },
          { label: 'Item 2', value: 'item-11', avatar: { src: 'https://www.shadcn-vue.com/avatars/02.png' } },
          { label: 'Item 3', value: 'item-12', avatar: { src: 'https://www.shadcn-vue.com/avatars/03.png' } },
        ],
      )

      loading.value = false
    }, 1000)
  }
}
</script>

<template>
  <Select
    v-model="value"
    placeholder="Please select"
    color="info"
    leading-icon="lucide:diamond"
    class="w-50"
    empty-text="No Data"
    :items="items"
    :loading="loading"
    @update:open="onOpen"
  />
</template>
