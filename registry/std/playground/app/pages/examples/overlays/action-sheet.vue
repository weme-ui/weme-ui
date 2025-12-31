<script lang="ts" setup>
import ActionSheetExampleBasic from '@registry/components/action-sheet/examples/basic.vue'
import ActionSheetExampleWithEsc from '@registry/components/action-sheet/examples/with-esc.vue'
import ActionSheetExampleWithRadius from '@registry/components/action-sheet/examples/with-radius.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ActionSheetExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ActionSheetExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-esc" title="With ESC">
      <ActionSheetExampleWithEsc />
    </UiTabsContent>
  </UiTabs>
</template>
