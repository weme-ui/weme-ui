<script lang="ts" setup>
import BarCodeExampleBasic from '@registry/components/bar-code/examples/basic.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <BarCodeExampleBasic />
    </UiTabsContent>
  </UiTabs>
</template>
