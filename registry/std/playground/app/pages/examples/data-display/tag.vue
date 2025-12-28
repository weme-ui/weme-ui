<script lang="ts" setup>
import TagExampleBasic from '@registry/components/tag/examples/basic.vue'
import TagExampleWithClosable from '@registry/components/tag/examples/with-closable.vue'
import TagExampleWithColor from '@registry/components/tag/examples/with-color.vue'
import TagExampleWithRadius from '@registry/components/tag/examples/with-radius.vue'
import TagExampleWithSize from '@registry/components/tag/examples/with-size.vue'
import TagExampleWithVariant from '@registry/components/tag/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TagExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <TagExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <TagExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <TagExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <TagExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-closable" title="With Closable">
      <TagExampleWithClosable />
    </UiTabsContent>
  </UiTabs>
</template>
