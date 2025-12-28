<script lang="ts" setup>
import DataListExampleBasic from '@registry/components/data-list/examples/basic.vue'
import DataListExampleWithColumn from '@registry/components/data-list/examples/with-column.vue'
import DataListExampleWithOrientation from '@registry/components/data-list/examples/with-orientation.vue'
import DataListExampleWithSize from '@registry/components/data-list/examples/with-size.vue'
import DataListExampleWithVariant from '@registry/components/data-list/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <DataListExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <DataListExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <DataListExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <DataListExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-column" title="With Column">
      <DataListExampleWithColumn />
    </UiTabsContent>
  </UiTabs>
</template>
