<script lang="ts" setup>
import LensExampleBasic from '@registry/components/lens/examples/basic.vue'
import LensExampleWithSize from '@registry/components/lens/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <LensExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <LensExampleWithSize />
    </UiTabsContent>
  </UiTabs>
</template>
