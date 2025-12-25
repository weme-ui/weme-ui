<script lang="ts" setup>
import IconButtonExampleBasic from '@registry/components/icon-button/examples/basic.vue'
import IconButtonExampleWithColor from '@registry/components/icon-button/examples/with-color.vue'
import IconButtonExampleWithRadius from '@registry/components/icon-button/examples/with-radius.vue'
import IconButtonExampleWithSize from '@registry/components/icon-button/examples/with-size.vue'
import IconButtonExampleWithVariant from '@registry/components/icon-button/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <IconButtonExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <IconButtonExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <IconButtonExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <IconButtonExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <IconButtonExampleWithRadius />
    </UiTabsContent>
  </UiTabs>
</template>
