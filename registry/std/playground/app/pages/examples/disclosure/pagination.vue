<script lang="ts" setup>
import PaginationExampleBasic from '@registry/components/pagination/examples/basic.vue'
import PaginationExampleWithAlign from '@registry/components/pagination/examples/with-align.vue'
import PaginationExampleWithMoreControls from '@registry/components/pagination/examples/with-more-controls.vue'
import PaginationExampleWithRadius from '@registry/components/pagination/examples/with-radius.vue'
import PaginationExampleWithSimple from '@registry/components/pagination/examples/with-simple.vue'
import PaginationExampleWithSize from '@registry/components/pagination/examples/with-size.vue'
import PaginationExampleWithVariant from '@registry/components/pagination/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <PaginationExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <PaginationExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <PaginationExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <PaginationExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align">
      <PaginationExampleWithAlign />
    </UiTabsContent>

    <UiTabsContent value="with-simple" title="With Simple">
      <PaginationExampleWithSimple />
    </UiTabsContent>

    <UiTabsContent value="with-more-controls" title="With More Controls">
      <PaginationExampleWithMoreControls />
    </UiTabsContent>
  </UiTabs>
</template>
