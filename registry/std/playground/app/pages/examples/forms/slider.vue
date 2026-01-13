<script lang="ts" setup>
import SliderExampleBasic from '@registry/components/slider/examples/basic.vue'
import SliderExampleWithColor from '@registry/components/slider/examples/with-color.vue'
import SliderExampleWithOrientation from '@registry/components/slider/examples/with-orientation.vue'
import SliderExampleWithRadius from '@registry/components/slider/examples/with-radius.vue'
import SliderExampleWithSize from '@registry/components/slider/examples/with-size.vue'
import SliderExampleWithSlot from '@registry/components/slider/examples/with-slot.vue'
import SliderExampleWithTooltip from '@registry/components/slider/examples/with-tooltip.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <SliderExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <SliderExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <SliderExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <SliderExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <SliderExampleWithSlot />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <SliderExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-tooltip" title="With Tooltip">
      <SliderExampleWithTooltip />
    </UiTabsContent>
  </UiTabs>
</template>
