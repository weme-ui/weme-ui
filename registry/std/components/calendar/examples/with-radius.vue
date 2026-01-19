<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import { fromDate } from '@internationalized/date'
import { useLocale } from '~/composables/use-locale'

import Calendar from '../calendar.vue'

const { timezone } = useLocale()
const date = shallowRef<DateValue>(fromDate(new Date(), timezone.value))

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="flex-(~ x-center wrap) items-start gap-6 mt-4">
    <template v-for="radius in radiuses" :key="radius">
      <Calendar v-model="date" :radius="radius" />
    </template>
  </div>
</template>
