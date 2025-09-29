<script lang="ts" setup>
import type { ToggleGroupItem } from '@registry/std/components/toggle/toggle-group.props'
import ToggleGroup from '@registry/std/components/toggle/toggle-group.vue'

const single: ToggleGroupItem[] = [
  { icon: 'lucide:bold', value: 'bold' },
  { icon: 'lucide:italic', value: 'italic' },
  { icon: 'lucide:underline', value: 'underline' },
]

const multiple: ToggleGroupItem[] = [
  { icon: 'lucide:align-left', value: 'left' },
  { icon: 'lucide:align-center', value: 'center' },
  { icon: 'lucide:align-right', value: 'right' },
  { icon: 'lucide:align-justify', value: 'justify' },
]

const singleValue = ref('bold')
const multiValue = ref(['left'])
</script>

<template>
  <div class="flex-(~ y-center) gap-2">
    <ToggleGroup v-model="singleValue" color="accent" :items="single" />
    <ToggleGroup v-model="multiValue" color="info" :items="multiple" />
  </div>

  <div class="flex-(~ 1 center) p-6 rounded-lg b-(~ dashed default) bg-dimmed">
    <p>
      {{ singleValue }} {{ multiValue }}
    </p>
  </div>
</template>
