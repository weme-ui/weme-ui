<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import { fromDate } from '@internationalized/date'
import { useLocale } from '~/composables/use-locale'

import Calendar from '../calendar.vue'

const { timezone } = useLocale()
const date = shallowRef<DateValue>(fromDate(new Date(), timezone.value))

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ x-center) items-start gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <Calendar v-model="date" :size="size" />
    </template>
  </div>
</template>
