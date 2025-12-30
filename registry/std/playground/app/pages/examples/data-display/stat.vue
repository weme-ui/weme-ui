<script lang="ts" setup>
import StatExampleBasic from '@registry/components/stat/examples/basic.vue'
import StatExampleWithExtra from '@registry/components/stat/examples/with-extra.vue'
import StatExampleWithSize from '@registry/components/stat/examples/with-size.vue'
import StatExampleWithTrend from '@registry/components/stat/examples/with-trend.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <StatExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-trend" title="With Trend">
      <StatExampleWithTrend />
    </UiTabsContent>

    <UiTabsContent value="with-extra" title="With Extra">
      <StatExampleWithExtra />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <StatExampleWithSize />
    </UiTabsContent>
  </UiTabs>
</template>
