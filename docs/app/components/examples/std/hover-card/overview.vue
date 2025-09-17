<script lang="ts" setup>
import HoverCard from '@registry/std/components/hover-card/hover-card.vue'
</script>

<template>
  <HoverCard show-arrow>
    <template #trigger>
      <UiIconBox name="user" variant="soft" />
    </template>

    <div>
      This is the content.
    </div>
  </HoverCard>
</template>
