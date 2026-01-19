<script lang="ts" setup>
import { CalendarDate } from '@internationalized/date'
import Calendar from '../calendar.vue'

const date = shallowRef({
  start: new CalendarDate(2022, 2, 3),
  end: new CalendarDate(2022, 2, 20),
})
</script>

<template>
  <div class="flex-(~ col center) gap-6 mt-4">
    <Calendar v-model="date" range />
  </div>
</template>
