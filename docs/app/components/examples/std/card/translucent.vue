<script lang="ts" setup>
import Card from '@registry/std/components/card/card.vue'
</script>

<template>
  <Card icon="info" title="Title" description="Description" translucent>
    This is the content.

    <template #action>
      Action
    </template>

    <template #footer>
      Footer
    </template>
  </Card>
</template>
