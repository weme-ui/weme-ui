<script lang="ts" setup>
import IconExampleBasic from '@registry/components/icon/examples/basic.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <IconExampleBasic />
    </UiTabsContent>
  </UiTabs>
</template>
