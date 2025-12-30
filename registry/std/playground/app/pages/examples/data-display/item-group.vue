<script lang="ts" setup>
import ItemGroupExampleBasic from '@registry/components/item-group/examples/basic.vue'
import ItemGroupExampleWithAlign from '@registry/components/item-group/examples/with-align.vue'
import ItemGroupExampleWithHeader from '@registry/components/item-group/examples/with-header.vue'
import ItemGroupExampleWithSize from '@registry/components/item-group/examples/with-size.vue'
import ItemGroupExampleWithVariant from '@registry/components/item-group/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ItemGroupExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <ItemGroupExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ItemGroupExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align">
      <ItemGroupExampleWithAlign />
    </UiTabsContent>

    <UiTabsContent value="with-header" title="With Header">
      <ItemGroupExampleWithHeader />
    </UiTabsContent>
  </UiTabs>
</template>
