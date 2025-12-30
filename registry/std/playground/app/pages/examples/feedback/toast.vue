<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import ToastExampleBasic from '@registry/components/toast/examples/basic.vue'
import ToastExampleWithActions from '@registry/components/toast/examples/with-actions.vue'
import ToastExampleWithColor from '@registry/components/toast/examples/with-color.vue'
import ToastExampleWithOrientation from '@registry/components/toast/examples/with-orientation.vue'
import ToastExampleWithVariant from '@registry/components/toast/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <ToastExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <ToastExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <ToastExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-actions" title="With Actions">
      <ToastExampleWithActions />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <ToastExampleWithOrientation />
    </UiTabsContent>
  </UiTabs>
</template>
