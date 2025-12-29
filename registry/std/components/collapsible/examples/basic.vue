<script lang="ts" setup>
import Button from '../../button/button.vue'
import Collapsible from '../collapsible.vue'
</script>

<template>
  <Collapsible>
    <template #trigger="{ open }">
      <Button>
        {{ open ? 'Close' : 'Open' }}
      </Button>
    </template>

    <div>Content</div>
  </Collapsible>
</template>
