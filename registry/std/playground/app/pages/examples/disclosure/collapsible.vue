<script lang="ts" setup>
import CollapsibleExampleBasic from '@registry/components/collapsible/examples/basic.vue'
import CollapsibleExampleWithOrientation from '@registry/components/collapsible/examples/with-orientation.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <CollapsibleExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <CollapsibleExampleWithOrientation />
    </UiTabsContent>
  </UiTabs>
</template>
