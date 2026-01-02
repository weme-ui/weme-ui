<script lang="ts" setup>
import PopoverExampleBasic from '@registry/components/popover/examples/basic.vue'
import PopoverExampleWithAnchor from '@registry/components/popover/examples/with-anchor.vue'
import PopoverExampleWithDismissible from '@registry/components/popover/examples/with-dismissible.vue'
import PopoverExampleWithMode from '@registry/components/popover/examples/with-mode.vue'
import PopoverExampleWithRadius from '@registry/components/popover/examples/with-radius.vue'
import PopoverExampleWithSize from '@registry/components/popover/examples/with-size.vue'
import PopoverExampleWithTranslucent from '@registry/components/popover/examples/with-translucent.vue'
import PopoverExampleWithVariant from '@registry/components/popover/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <PopoverExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <PopoverExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-mode" title="With Mode">
      <PopoverExampleWithMode />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <PopoverExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <PopoverExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-translucent" title="With Translucent">
      <PopoverExampleWithTranslucent />
    </UiTabsContent>

    <UiTabsContent value="with-dismissible" title="With Dismissible">
      <PopoverExampleWithDismissible />
    </UiTabsContent>

    <UiTabsContent value="with-anchor" title="With Anchor">
      <PopoverExampleWithAnchor />
    </UiTabsContent>
  </UiTabs>
</template>
