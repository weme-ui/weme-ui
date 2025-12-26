<script lang="ts" setup>
import OverflowExampleBasic from '@registry/components/overflow/examples/basic.vue'
import OverflowExampleWithCollapse from '@registry/components/overflow/examples/with-collapse.vue'
import OverflowExampleWithGap from '@registry/components/overflow/examples/with-gap.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <OverflowExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-collapse" title="With Collapse">
      <OverflowExampleWithCollapse />
    </UiTabsContent>

    <UiTabsContent value="with-gap" title="With Gap">
      <OverflowExampleWithGap />
    </UiTabsContent>
  </UiTabs>
</template>
