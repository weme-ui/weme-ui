<script lang="ts" setup>
import Empty from '../empty.vue'
</script>

<template>
  <Empty
    icon="ri:inbox-line"
    :unstyled="true"
    class="text-left gap-4 items-start"
  >
    <template #title>
      Unstyled
    </template>
    <template #description>
      Structure only; style via `class` / `ui`.
    </template>
  </Empty>
</template>
