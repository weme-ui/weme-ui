<script lang="ts" setup>
import SeparatorExampleBasic from '@registry/components/separator/examples/basic.vue'
import SeparatorExampleWithLabel from '@registry/components/separator/examples/with-label.vue'
import SeparatorExampleWithOrientation from '@registry/components/separator/examples/with-orientation.vue'
import SeparatorExampleWithSize from '@registry/components/separator/examples/with-size.vue'
import SeparatorExampleWithVariant from '@registry/components/separator/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <SeparatorExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <SeparatorExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <SeparatorExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <SeparatorExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-label" title="With Label">
      <SeparatorExampleWithLabel />
    </UiTabsContent>
  </UiTabs>
</template>
