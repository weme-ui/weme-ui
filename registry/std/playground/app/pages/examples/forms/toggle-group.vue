<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import ToggleGroupExampleBasic from '@registry/components/toggle-group/examples/basic.vue'
import ToggleGroupExampleWithOrientation from '@registry/components/toggle-group/examples/with-orientation.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ToggleGroupExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <ToggleGroupExampleWithOrientation />
    </UiTabsContent>
  </UiTabs>
</template>
