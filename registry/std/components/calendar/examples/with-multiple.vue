<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import { fromDate } from '@internationalized/date'
import { useLocale } from '~/composables/use-locale'

import Calendar from '../calendar.vue'

const { timezone } = useLocale()
const date = shallowRef<DateValue[]>([fromDate(new Date(), timezone.value)])
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Calendar v-model="date" multiple />
  </div>
</template>
