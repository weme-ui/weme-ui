<script lang="ts" setup>
import ItemExampleBasic from '@registry/components/item/examples/basic.vue'
import ItemExampleWithAlign from '@registry/components/item/examples/with-align.vue'
import ItemExampleWithColor from '@registry/components/item/examples/with-color.vue'
import ItemExampleWithRadius from '@registry/components/item/examples/with-radius.vue'
import ItemExampleWithSize from '@registry/components/item/examples/with-size.vue'
import ItemExampleWithVariant from '@registry/components/item/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <ItemExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color" class="h-full">
      <ItemExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant" class="h-full">
      <ItemExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size" class="h-full">
      <ItemExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius" class="h-full">
      <ItemExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align" class="h-full">
      <ItemExampleWithAlign />
    </UiTabsContent>
  </UiTabs>
</template>
