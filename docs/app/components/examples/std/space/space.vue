<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import Separator from '@registry/std/components/separator/separator.vue'
import Space from '@registry/std/components/space/space.vue'
</script>

<template>
  <Space>
    <Button>Item 1</Button>
    <Button>Item 2</Button>
    <Button>Item 3</Button>

    <template #separator>
      <Separator />
    </template>
  </Space>
</template>
