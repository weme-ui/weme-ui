<script lang="ts" setup>
import OverflowList from '@registry/std/components/overflow-list/overflow-list.vue'
</script>

<template>
  <OverflowList :max="3">
    <UiBadge text="Badge 1" />
    <UiBadge text="Badge 2" />
    <UiBadge text="Badge 3" />
    <UiBadge text="Badge 4" />
    <UiBadge text="Badge 5" />
    <template #overflow="{ number }">
      <UiBadge :text="`${number}+`" />
    </template>
  </OverflowList>
</template>
