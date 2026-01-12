<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import ToggleExampleBasic from '@registry/components/toggle/examples/basic.vue'
import ToggleExampleWithColor from '@registry/components/toggle/examples/with-color.vue'
import ToggleExampleWithIcon from '@registry/components/toggle/examples/with-icon.vue'
import ToggleExampleWithRadius from '@registry/components/toggle/examples/with-radius.vue'
import ToggleExampleWithSize from '@registry/components/toggle/examples/with-size.vue'
import ToggleExampleWithSlot from '@registry/components/toggle/examples/with-slot.vue'
import ToggleExampleWithVariant from '@registry/components/toggle/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ToggleExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <ToggleExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <ToggleExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ToggleExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ToggleExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <ToggleExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <ToggleExampleWithSlot />
    </UiTabsContent>
  </UiTabs>
</template>
