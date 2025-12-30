<script lang="ts" setup>
import CardExampleBasic from '@registry/components/card/examples/basic.vue'
import CardExampleWithIcon from '@registry/components/card/examples/with-icon.vue'
import CardExampleWithRadius from '@registry/components/card/examples/with-radius.vue'
import CardExampleWithSize from '@registry/components/card/examples/with-size.vue'
import CardExampleWithSlot from '@registry/components/card/examples/with-slot.vue'
import CardExampleWithTranslucent from '@registry/components/card/examples/with-translucent.vue'
import CardExampleWithVariant from '@registry/components/card/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <CardExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <CardExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <CardExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <CardExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-translucent" title="With Translucent">
      <CardExampleWithTranslucent />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <CardExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <CardExampleWithSlot />
    </UiTabsContent>
  </UiTabs>
</template>
