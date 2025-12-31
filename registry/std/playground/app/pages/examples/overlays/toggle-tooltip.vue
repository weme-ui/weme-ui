<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import ToggleTooltipExampleBasic from '@registry/components/toggle-tooltip/examples/basic.vue'
import ToggleTooltipExampleWithLoading from '@registry/components/toggle-tooltip/examples/with-loading.vue'
import ToggleTooltipExampleWithRadius from '@registry/components/toggle-tooltip/examples/with-radius.vue'
import ToggleTooltipExampleWithSide from '@registry/components/toggle-tooltip/examples/with-side.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ToggleTooltipExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-side" title="With Side">
      <ToggleTooltipExampleWithSide />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ToggleTooltipExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-loading" title="With Loading">
      <ToggleTooltipExampleWithLoading />
    </UiTabsContent>
  </UiTabs>
</template>
