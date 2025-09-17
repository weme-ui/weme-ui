<script lang="ts" setup>
import Tooltip from '@registry/std/components/tooltip/tooltip.vue'
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <Tooltip content="top-left" side="top-left">
      <UiIconBox name="lucide:arrow-up-left" variant="soft" />
    </Tooltip>
    <Tooltip content="top" side="top">
      <UiIconBox name="lucide:arrow-up" variant="soft" />
    </Tooltip>
    <Tooltip content="top-right" side="top-right">
      <UiIconBox name="lucide:arrow-up-right" variant="soft" />
    </Tooltip>
    <Tooltip content="left" side="left">
      <UiIconBox name="lucide:arrow-left" variant="soft" />
    </Tooltip>

    <div />

    <Tooltip content="right" side="right">
      <UiIconBox name="lucide:arrow-right" variant="soft" />
    </Tooltip>
    <Tooltip content="bottom-left" side="bottom-left">
      <UiIconBox name="lucide:arrow-down-left" variant="soft" />
    </Tooltip>
    <Tooltip content="bottom" side="bottom">
      <UiIconBox name="lucide:arrow-down" variant="soft" />
    </Tooltip>
    <Tooltip content="bottom-right" side="bottom-right">
      <UiIconBox name="lucide:arrow-down-right" variant="soft" />
    </Tooltip>
  </div>
</template>
