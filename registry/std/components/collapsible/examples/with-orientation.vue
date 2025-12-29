<script lang="ts" setup>
import Button from '../../button/button.vue'
import Collapsible from '../collapsible.vue'
</script>

<template>
  <div class="flex gap-6">
    <Collapsible>
      <template #trigger="{ open }">
        <Button>
          {{ open ? 'Close' : 'Open Bottom' }}
        </Button>
      </template>

      <div>Content</div>
    </Collapsible>

    <Collapsible orientation="top">
      <template #trigger="{ open }">
        <Button>
          {{ open ? 'Close' : 'Open Top' }}
        </Button>
      </template>

      <div>Content</div>
    </Collapsible>
  </div>
</template>
