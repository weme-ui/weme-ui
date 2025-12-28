<script lang="ts" setup>
import TimelineExampleBasic from '@registry/components/timeline/examples/basic.vue'
import TimelineExampleWithAvatar from '@registry/components/timeline/examples/with-avatar.vue'
import TimelineExampleWithColor from '@registry/components/timeline/examples/with-color.vue'
import TimelineExampleWithIcon from '@registry/components/timeline/examples/with-icon.vue'
import TimelineExampleWithSize from '@registry/components/timeline/examples/with-size.vue'
import TimelineExampleWithVariant from '@registry/components/timeline/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TimelineExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <TimelineExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <TimelineExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-avatar" title="With Avatar">
      <TimelineExampleWithAvatar />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <TimelineExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <TimelineExampleWithVariant />
    </UiTabsContent>
  </UiTabs>
</template>
