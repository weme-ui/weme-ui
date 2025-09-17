<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import Popover from '@registry/std/components/popover/popover.vue'
</script>

<template>
  <Popover show-arrow as-child>
    <template #trigger>
      <Button>Open</Button>
    </template>

    <div>
      This is the content.
    </div>
  </Popover>
</template>
