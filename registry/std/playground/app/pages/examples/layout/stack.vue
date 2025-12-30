<script lang="ts" setup>
import StackExampleBasic from '@registry/components/stack/examples/basic.vue'
import StackExampleWithOrientation from '@registry/components/stack/examples/with-orientation.vue'
import StackExampleWithSeparator from '@registry/components/stack/examples/with-separator.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <StackExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <StackExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-separator" title="With Separator">
      <StackExampleWithSeparator />
    </UiTabsContent>
  </UiTabs>
</template>
