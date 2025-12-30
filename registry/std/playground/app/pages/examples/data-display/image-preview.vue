<script lang="ts" setup>
import ImagePreviewExampleBasic from '@registry/components/image-preview/examples/basic.vue'
import ImagePreviewExampleWithDisabled from '@registry/components/image-preview/examples/with-disabled.vue'
import ImagePreviewExampleWithPlaceholder from '@registry/components/image-preview/examples/with-placeholder.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ImagePreviewExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-placeholder" title="With Placeholder">
      <ImagePreviewExampleWithPlaceholder />
    </UiTabsContent>

    <UiTabsContent value="with-disabled" title="With Disabled">
      <ImagePreviewExampleWithDisabled />
    </UiTabsContent>
  </UiTabs>
</template>
