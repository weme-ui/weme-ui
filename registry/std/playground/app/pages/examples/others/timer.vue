<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import TimerExampleBasic from '@registry/components/timer/examples/basic.vue'
import TimerExampleWithColor from '@registry/components/timer/examples/with-color.vue'
import TimerExampleWithInverse from '@registry/components/timer/examples/with-inverse.vue'
import TimerExampleMode from '@registry/components/timer/examples/with-mode.vue'
import TimerExampleWithPrecision from '@registry/components/timer/examples/with-precision.vue'
import TimerExampleWithRadius from '@registry/components/timer/examples/with-radius.vue'
import TimerExampleWithSize from '@registry/components/timer/examples/with-size.vue'
import TimerExampleWithSlot from '@registry/components/timer/examples/with-slot.vue'
import TimerExampleWithVariant from '@registry/components/timer/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TimerExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-mode" title="With Mode">
      <TimerExampleMode />
    </UiTabsContent>

    <UiTabsContent value="with-precision" title="With Precision">
      <TimerExampleWithPrecision />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <TimerExampleWithSlot />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <TimerExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <TimerExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-inverse" title="With Inverse">
      <TimerExampleWithInverse />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <TimerExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <TimerExampleWithRadius />
    </UiTabsContent>
  </UiTabs>
</template>
