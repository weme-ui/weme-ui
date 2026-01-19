<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import { fromDate } from '@internationalized/date'
import { useLocale } from '~/composables/use-locale'

import Calendar from '../calendar.vue'

const { timezone } = useLocale()
const date = shallowRef<DateValue>(fromDate(new Date(), timezone.value))

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex-(~ x-center wrap) items-start gap-6 mt-4">
    <template v-for="color in colors" :key="color">
      <Calendar v-model="date" :color="color" />
    </template>
  </div>
</template>
