<script lang="ts" setup>
import SegmentedControlExampleBasic from '@registry/components/segmented-control/examples/basic.vue'
import SegmentedControlExampleWithColor from '@registry/components/segmented-control/examples/with-color.vue'
import SegmentedControlExampleWithIcon from '@registry/components/segmented-control/examples/with-icon.vue'
import SegmentedControlExampleWithOrientation from '@registry/components/segmented-control/examples/with-orientation.vue'
import SegmentedControlExampleWithRadius from '@registry/components/segmented-control/examples/with-radius.vue'
import SegmentedControlExampleWithSize from '@registry/components/segmented-control/examples/with-size.vue'
import SegmentedControlExampleWithState from '@registry/components/segmented-control/examples/with-state.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <SegmentedControlExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <SegmentedControlExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <SegmentedControlExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <SegmentedControlExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <SegmentedControlExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <SegmentedControlExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-state" title="With State">
      <SegmentedControlExampleWithState />
    </UiTabsContent>
  </UiTabs>
</template>
