<script lang="ts" setup>
import ModalExampleBasic from '@registry/components/modal/examples/basic.vue'
import ModalExampleWithIcon from '@registry/components/modal/examples/with-icon.vue'
import ModalExampleWithPlacement from '@registry/components/modal/examples/with-placement.vue'
import ModalExampleWithRadius from '@registry/components/modal/examples/with-radius.vue'
import ModalExampleWithSize from '@registry/components/modal/examples/with-size.vue'
import ModalExampleWithVariant from '@registry/components/modal/examples/with-variant.vue'
import ModalExampleWithoutOverlay from '@registry/components/modal/examples/without-overlay.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ModalExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <ModalExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-placement" title="With Placement">
      <ModalExampleWithPlacement />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ModalExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ModalExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <ModalExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="without-overlay" title="Without Overlay">
      <ModalExampleWithoutOverlay />
    </UiTabsContent>
  </UiTabs>
</template>
