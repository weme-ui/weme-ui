<script lang="ts" setup>
import PinInputExampleBasic from '@registry/components/pin-input/examples/basic.vue'
import PinInputExampleWithInvalid from '@registry/components/pin-input/examples/with-invalid.vue'
import PinInputExampleWithRadius from '@registry/components/pin-input/examples/with-radius.vue'
import PinInputExampleWithSize from '@registry/components/pin-input/examples/with-size.vue'
import PinInputExampleWithVariant from '@registry/components/pin-input/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <PinInputExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <PinInputExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <PinInputExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <PinInputExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <PinInputExampleWithInvalid />
    </UiTabsContent>
  </UiTabs>
</template>
