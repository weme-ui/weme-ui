<script lang="ts" setup>
import Empty from '../empty.vue'
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <Empty icon="ri:inbox-line" size="sm">
      <template #title>
        Small
      </template>
      <template #description>
        Compact empty state.
      </template>
    </Empty>
    <Empty icon="ri:inbox-line" size="md">
      <template #title>
        Medium
      </template>
      <template #description>
        Default empty state.
      </template>
    </Empty>
    <Empty icon="ri:inbox-line" size="lg">
      <template #title>
        Large
      </template>
      <template #description>
        Emphasized empty state.
      </template>
    </Empty>
  </div>
</template>
