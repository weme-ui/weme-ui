<script lang="ts" setup>
import TabsExampleBasic from '@registry/components/tabs/examples/basic.vue'
import TabsExampleWithAnimate from '@registry/components/tabs/examples/with-animate.vue'
import TabsExampleWithRadius from '@registry/components/tabs/examples/with-radius.vue'
import TabsExampleWithSide from '@registry/components/tabs/examples/with-side.vue'
import TabsExampleWithSize from '@registry/components/tabs/examples/with-size.vue'
import TabsExampleWithVariant from '@registry/components/tabs/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TabsExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <TabsExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-side" title="With Side">
      <TabsExampleWithSide />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <TabsExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <TabsExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-animate" title="With Animate">
      <TabsExampleWithAnimate />
    </UiTabsContent>
  </UiTabs>
</template>
