<script lang="ts" setup>
import Calendar from '@registry/std/components/calendar/calendar.vue'
</script>

<template>
  <Calendar color="accent" size="md" radius="full" class="ring-(~ default) p-3 rounded-md">
    <template #day="{ date }">
      <div v-if="date.day === new Date().getDate()" class="abs-(~ x-center) ring-(1 neutral-1) bottom-0 bg-info rounded-full size-1 z-1" />
    </template>
  </Calendar>
</template>
