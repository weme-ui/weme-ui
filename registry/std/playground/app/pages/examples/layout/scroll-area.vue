<script lang="ts" setup>
import ScrollAreaExampleBasic from '@registry/components/scroll-area/examples/basic.vue'
import ScrollAreaExampleWithOrientation from '@registry/components/scroll-area/examples/with-orientation.vue'
import ScrollAreaExampleWithRadius from '@registry/components/scroll-area/examples/with-radius.vue'
import ScrollAreaExampleWithSize from '@registry/components/scroll-area/examples/with-size.vue'
import ScrollAreaExampleWithVirtualize from '@registry/components/scroll-area/examples/with-virtualize.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ScrollAreaExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <ScrollAreaExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-virtualize" title="With Virtualize">
      <ScrollAreaExampleWithVirtualize />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ScrollAreaExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ScrollAreaExampleWithRadius />
    </UiTabsContent>
  </UiTabs>
</template>
