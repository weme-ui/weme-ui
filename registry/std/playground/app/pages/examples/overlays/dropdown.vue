<script lang="ts" setup>
import DropdownExampleBasic from '@registry/components/dropdown/examples/basic.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <DropdownExampleBasic />
    </UiTabsContent>
  </UiTabs>
</template>
