<script lang="ts" setup>
import InputExampleBasic from '@registry/components/input/examples/basic.vue'
import InputExampleWithAddon from '@registry/components/input/examples/with-addon.vue'
import InputExampleWithClear from '@registry/components/input/examples/with-clear.vue'
import InputExampleWithCount from '@registry/components/input/examples/with-count.vue'
import InputExampleWithEvent from '@registry/components/input/examples/with-event.vue'
import InputExampleWithIcon from '@registry/components/input/examples/with-icon.vue'
import InputExampleWithInvalid from '@registry/components/input/examples/with-invalid.vue'
import InputExampleWithRadius from '@registry/components/input/examples/with-radius.vue'
import InputExampleWithSize from '@registry/components/input/examples/with-size.vue'
import InputExampleWithVariant from '@registry/components/input/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <InputExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <InputExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <InputExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <InputExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <InputExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-addon" title="With Addon">
      <InputExampleWithAddon />
    </UiTabsContent>

    <UiTabsContent value="with-clear" title="With Clear">
      <InputExampleWithClear />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <InputExampleWithInvalid />
    </UiTabsContent>

    <UiTabsContent value="with-count" title="With Count">
      <InputExampleWithCount />
    </UiTabsContent>

    <UiTabsContent value="with-event" title="With Event">
      <InputExampleWithEvent />
    </UiTabsContent>
  </UiTabs>
</template>
