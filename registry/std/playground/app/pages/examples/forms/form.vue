<script lang="ts" setup>
import FormExampleBasic from '@registry/components/form/examples/basic.vue'
import FormExampleWithOrientation from '@registry/components/form/examples/with-orientation.vue'
import FormExampleWithSize from '@registry/components/form/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <FormExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <FormExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <FormExampleWithSize />
    </UiTabsContent>
  </UiTabs>
</template>
