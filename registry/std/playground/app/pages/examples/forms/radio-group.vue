<script lang="ts" setup>
import RadioGroupExampleBasic from '@registry/components/radio-group/examples/basic.vue'
import RadioGroupExampleWithAlign from '@registry/components/radio-group/examples/with-align.vue'
import RadioGroupExampleWithColor from '@registry/components/radio-group/examples/with-color.vue'
import RadioGroupExampleWithDisabled from '@registry/components/radio-group/examples/with-disabled.vue'
import RadioGroupExampleWithIndicator from '@registry/components/radio-group/examples/with-indicator.vue'
import RadioGroupExampleWithOrientation from '@registry/components/radio-group/examples/with-orientation.vue'
import RadioGroupExampleWithSize from '@registry/components/radio-group/examples/with-size.vue'
import RadioGroupExampleWithSlot from '@registry/components/radio-group/examples/with-slot.vue'
import RadioGroupExampleWithVariant from '@registry/components/radio-group/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <RadioGroupExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <RadioGroupExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <RadioGroupExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <RadioGroupExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <RadioGroupExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align">
      <RadioGroupExampleWithAlign />
    </UiTabsContent>

    <UiTabsContent value="with-indicator" title="With Indicator">
      <RadioGroupExampleWithIndicator />
    </UiTabsContent>

    <UiTabsContent value="with-disabled" title="With Disabled">
      <RadioGroupExampleWithDisabled />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <RadioGroupExampleWithSlot />
    </UiTabsContent>
  </UiTabs>
</template>
