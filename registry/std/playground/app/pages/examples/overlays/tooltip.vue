<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import TooltipExampleBasic from '@registry/components/tooltip/examples/basic.vue'
import TooltipExampleWithLoading from '@registry/components/tooltip/examples/with-loading.vue'
import TooltipExampleWithRadius from '@registry/components/tooltip/examples/with-radius.vue'
import TooltipExampleWithSide from '@registry/components/tooltip/examples/with-side.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TooltipExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-side" title="With Side">
      <TooltipExampleWithSide />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <TooltipExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-loading" title="With Loading">
      <TooltipExampleWithLoading />
    </UiTabsContent>
  </UiTabs>
</template>
