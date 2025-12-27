<script lang="ts" setup>
import SpinnerExampleBasic from '@registry/components/spinner/examples/basic.vue'
import SpinnerExampleWithDescription from '@registry/components/spinner/examples/with-description.vue'
import SpinnerExampleWithIcon from '@registry/components/spinner/examples/with-icon.vue'
import SpinnerExampleWithOverlay from '@registry/components/spinner/examples/with-overlay.vue'
import SpinnerExampleWithSize from '@registry/components/spinner/examples/with-size.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <SpinnerExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <SpinnerExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-overlay" title="With Overlay">
      <SpinnerExampleWithOverlay />
    </UiTabsContent>

    <UiTabsContent value="with-description" title="With Description">
      <SpinnerExampleWithDescription />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <SpinnerExampleWithIcon />
    </UiTabsContent>
  </UiTabs>
</template>
