<script lang="ts" setup>
import HighlightExampleBasic from '@registry/components/highlight/examples/basic.vue'
import HighlightExampleWithMatchAll from '@registry/components/highlight/examples/with-all.vue'
import HighlightExampleWithCase from '@registry/components/highlight/examples/with-case.vue'
import HighlightExampleWithColor from '@registry/components/highlight/examples/with-color.vue'
import HighlightExampleWithRadius from '@registry/components/highlight/examples/with-radius.vue'
import HighlightExampleWithVariant from '@registry/components/highlight/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <HighlightExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-case" title="With IgnoreCase">
      <HighlightExampleWithCase />
    </UiTabsContent>

    <UiTabsContent value="with-all" title="With MatchAll">
      <HighlightExampleWithMatchAll />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <HighlightExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <HighlightExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <HighlightExampleWithColor />
    </UiTabsContent>
  </UiTabs>
</template>
