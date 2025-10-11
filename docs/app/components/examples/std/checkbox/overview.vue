<script lang="ts" setup>
import CheckboxGroup from '@registry/std/components/checkbox/checkbox-group.vue'

const items = [
  { icon: 'lucide:circle-dashed', label: 'Item 1', description: 'Description 1', value: 'item-1' },
  { icon: 'lucide:circle-dashed', label: 'Item 2', description: 'Description 2', value: 'item-2' },
  { icon: 'lucide:circle-dashed', label: 'Item 3', description: 'Description 3', value: 'item-3' },
]

const value = ref<string[]>()
</script>

<template>
  <CheckboxGroup
    v-model="value"
    variant="card"
    color="info"
    radius="md"
    size="sm"
    indicator="end"
    :items="items"
    fill
  >
    <template #leading="{ item }">
      <div class="p-2 rounded-full b-(~ default)">
        <AppIcon :name="item.icon" />
      </div>
    </template>
  </CheckboxGroup>
</template>
