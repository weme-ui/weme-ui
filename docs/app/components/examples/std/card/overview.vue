<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import Card from '@registry/std/components/card/card.vue'
</script>

<template>
  <Card icon="info" title="Card" class="w-120" variant="wrapped">
    This is the content.

    <template #action>
      <AppIcon name="close" />
    </template>

    <template #footer>
      <Button>
        Apply
      </Button>
    </template>
  </Card>
</template>
