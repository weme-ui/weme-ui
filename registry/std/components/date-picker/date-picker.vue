<script lang="ts" setup>
import type { DatePickerProps } from './date-picker.props'
import { reactiveOmit } from '@vueuse/core'
import Calendar from '../calendar/calendar.vue'
import Input from '../input/input.vue'
import Popover from '../popover/popover.vue'

const props = defineProps<DatePickerProps>()
const delegated = reactiveOmit(props, 'class', 'ui', 'color', 'size', 'radius')
</script>

<template>
  <Popover v-bind="delegated" :content-props="{ align: 'start' }">
    <template #trigger="{ open }">
      <slot>
        <Input trailing-icon="calendar" :data-focused="open ? '' : undefined" />
      </slot>
    </template>

    <Calendar />
  </Popover>
</template>
