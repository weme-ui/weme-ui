<script lang="ts" setup>
import IconBoxExampleBasic from '@registry/components/icon-box/examples/basic.vue'
import IconBoxExampleWithColor from '@registry/components/icon-box/examples/with-color.vue'
import IconBoxExampleWithRadius from '@registry/components/icon-box/examples/with-radius.vue'
import IconBoxExampleWithSize from '@registry/components/icon-box/examples/with-size.vue'
import IconBoxExampleWithVariant from '@registry/components/icon-box/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <IconBoxExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <IconBoxExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <IconBoxExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <IconBoxExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <IconBoxExampleWithColor />
    </UiTabsContent>
  </UiTabs>
</template>
