<script lang="ts" setup>
import AlertExampleBasic from '@registry/components/alert/examples/basic.vue'
import AlertExampleWithClickable from '@registry/components/alert/examples/with-clickable.vue'
import AlertExampleWithCloseable from '@registry/components/alert/examples/with-closeable.vue'
import AlertExampleWithColor from '@registry/components/alert/examples/with-color.vue'
import AlertExampleWithInline from '@registry/components/alert/examples/with-inline.vue'
import AlertExampleWithLinkable from '@registry/components/alert/examples/with-linkable.vue'
import AlertExampleWithRadius from '@registry/components/alert/examples/with-radius.vue'
import AlertExampleWithStatus from '@registry/components/alert/examples/with-status.vue'
import AlertExampleWithVariant from '@registry/components/alert/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <AlertExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <AlertExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <AlertExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <AlertExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-inline" title="With Inline">
      <AlertExampleWithInline />
    </UiTabsContent>

    <UiTabsContent value="with-closeable" title="With Closeable">
      <AlertExampleWithCloseable />
    </UiTabsContent>

    <UiTabsContent value="with-clickable" title="With Clickable">
      <AlertExampleWithClickable />
    </UiTabsContent>

    <UiTabsContent value="with-linkable" title="With Linkable">
      <AlertExampleWithLinkable />
    </UiTabsContent>

    <UiTabsContent value="with-status" title="With Status">
      <AlertExampleWithStatus />
    </UiTabsContent>
  </UiTabs>
</template>
