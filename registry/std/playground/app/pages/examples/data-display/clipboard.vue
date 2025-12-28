<script lang="ts" setup>
import ClipboardExampleBasic from '@registry/components/clipboard/examples/basic.vue'
import ClipboardExampleWithSize from '@registry/components/clipboard/examples/with-size.vue'
import ClipboardExampleWithText from '@registry/components/clipboard/examples/with-text.vue'
import ClipboardExampleWithVariant from '@registry/components/clipboard/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ClipboardExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-text" title="With Text">
      <ClipboardExampleWithText />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ClipboardExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <ClipboardExampleWithVariant />
    </UiTabsContent>
  </UiTabs>
</template>
