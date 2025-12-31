<script lang="ts" setup>
import PopConfirmExampleBasic from '@registry/components/pop-confirm/examples/basic.vue'
import PopConfirmExampleWithType from '@registry/components/pop-confirm/examples/with-type.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <PopConfirmExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-type" title="With Type">
      <PopConfirmExampleWithType />
    </UiTabsContent>
  </UiTabs>
</template>
