<script lang="ts" setup>
import type { RadioItem } from '@registry/std/components/radio-group/radio-group.props'
import RadioGroup from '@registry/std/components/radio-group/radio-group.vue'

const items: RadioItem[] = [
  { icon: 'mingcute:car-2-line', activeIcon: 'mingcute:car-2-fill', label: 'Drive', value: 'item-1' },
  { icon: 'mingcute:airplane-line', activeIcon: 'mingcute:airplane-fill', label: 'Fly', value: 'item-2' },
  { icon: 'mingcute:ship-line', activeIcon: 'mingcute:ship-fill', label: 'Sail', value: 'item-3' },
]
const value = ref('item-1')
</script>

<template>
  <RadioGroup v-model="value" variant="table" size="md" radius="lg" indicator="end" align="center" color="accent" :items="items" fill>
    <template #leading="{ item, checked }">
      <div class="p-2 rounded-full b-(~ default)">
        <AppIcon :name="checked ? item.activeIcon : item.icon" />
      </div>
    </template>
  </RadioGroup>
</template>
