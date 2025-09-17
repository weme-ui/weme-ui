<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import Collapsible from '@registry/std/components/collapsible/collapsible.vue'
import Icon from '@registry/std/components/icon/icon.vue'
</script>

<template>
  <Collapsible class="w-100" as-child>
    <template #trigger="{ open }">
      <Button class="w-full justify-between" variant="ghost">
        <div class="flex-(~ y-center) gap-2">
          <Icon name="info" />
          {{ open ? 'Collapse' : 'Expand' }}
        </div>
        <Icon name="down" class="transition-transform" :class="{ '-rotate-180': open }" />
      </Button>
    </template>

    <div class="p-4 rounded-lg b-(~ default) mt-3">
      This is the content.
    </div>
  </Collapsible>
</template>
