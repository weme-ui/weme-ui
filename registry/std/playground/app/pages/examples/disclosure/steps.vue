<script lang="ts" setup>
import StepsExampleBasic from '@registry/components/steps/examples/basic.vue'
import StepsExampleWithColor from '@registry/components/steps/examples/with-color.vue'
import StepsExampleWithControl from '@registry/components/steps/examples/with-control.vue'
import StepsExampleWithIcon from '@registry/components/steps/examples/with-icon.vue'
import StepsExampleWithOrientation from '@registry/components/steps/examples/with-orientation.vue'
import StepsExampleWithSize from '@registry/components/steps/examples/with-size.vue'
import StepsExampleWithVariant from '@registry/components/steps/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <StepsExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <StepsExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <StepsExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <StepsExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <StepsExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-control" title="With Control">
      <StepsExampleWithControl />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <StepsExampleWithIcon />
    </UiTabsContent>
  </UiTabs>
</template>
