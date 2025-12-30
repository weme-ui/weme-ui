<script lang="ts" setup>
import BannerExampleBasic from '@registry/components/banner/examples/basic.vue'
import BannerExampleWithActions from '@registry/components/banner/examples/with-actions.vue'
import BannerExampleWithColor from '@registry/components/banner/examples/with-color.vue'
import BannerExampleWithVariant from '@registry/components/banner/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <BannerExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <BannerExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <BannerExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-actions" title="With Actions">
      <BannerExampleWithActions />
    </UiTabsContent>
  </UiTabs>
</template>
