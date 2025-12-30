<script lang="ts" setup>
import ImageExampleBasic from '@registry/components/image/examples/basic.vue'
import ImageExampleWithFallback from '@registry/components/image/examples/with-fallback.vue'
import ImageExampleWithRadius from '@registry/components/image/examples/with-radius.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ImageExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ImageExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-fallback" title="With Fallback">
      <ImageExampleWithFallback />
    </UiTabsContent>
  </UiTabs>
</template>
