<script lang="ts" setup>
import SkeletonExampleBasic from '@registry/components/skeleton/examples/basic.vue'
import SkeletonExampleWithRadius from '@registry/components/skeleton/examples/with-radius.vue'
import SkeletonExampleWithVariant from '@registry/components/skeleton/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <SkeletonExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <SkeletonExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <SkeletonExampleWithRadius />
    </UiTabsContent>
  </UiTabs>
</template>
