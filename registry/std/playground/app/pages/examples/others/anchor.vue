<script lang="ts" setup>
import AnchorExampleBasic from '@registry/components/anchor/examples/basic.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <AnchorExampleBasic />
    </UiTabsContent>
  </UiTabs>
</template>
