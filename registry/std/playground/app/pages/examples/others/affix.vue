<script lang="ts" setup>
import AffixExampleBasic from '@registry/components/affix/examples/basic.vue'
import AffixExampleWithBottom from '@registry/components/affix/examples/with-bottom.vue'
import AffixExampleWithTop from '@registry/components/affix/examples/with-top.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <AffixExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-top" title="With Top">
      <AffixExampleWithTop />
    </UiTabsContent>

    <UiTabsContent value="with-bottom" title="With Bottom">
      <AffixExampleWithBottom />
    </UiTabsContent>
  </UiTabs>
</template>
