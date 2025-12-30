<script lang="ts" setup>
import ProgressExampleBasic from '@registry/components/progress/examples/basic.vue'
import ProgressExampleWithAnimate from '@registry/components/progress/examples/with-animate.vue'
import ProgressExampleWithColor from '@registry/components/progress/examples/with-color.vue'
import ProgressExampleWithLabel from '@registry/components/progress/examples/with-label.vue'
import ProgressExampleWithRadius from '@registry/components/progress/examples/with-radius.vue'
import ProgressExampleWithSize from '@registry/components/progress/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <ProgressExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-label" title="With Label">
      <ProgressExampleWithLabel />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <ProgressExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ProgressExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ProgressExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-animate" title="With Animate">
      <ProgressExampleWithAnimate />
    </UiTabsContent>
  </UiTabs>
</template>
