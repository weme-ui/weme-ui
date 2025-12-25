<script lang="ts" setup>
import Group from '../group.vue'

const gaps = ['none', 'xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ center) h-full gap-6">
    <Group v-for="gap in gaps" :key="gap" :gap="gap">
      <div class="flex-(~ center) size-10 bg-muted b-(~ default) rounded-lg">
        A
      </div>
      <div class="flex-(~ center) size-10 bg-elevated b-(~ default) rounded-lg">
        B
      </div>
      <div class="flex-(~ center) size-10 bg-muted b-(~ default) rounded-lg">
        C
      </div>
    </Group>
  </div>
</template>
