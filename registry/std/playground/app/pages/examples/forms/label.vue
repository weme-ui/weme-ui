<script lang="ts" setup>
import LabelExampleBasic from '@registry/components/label/examples/basic.vue'
import LabelExampleWithHint from '@registry/components/label/examples/with-hint.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <LabelExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-hint" title="With Hint">
      <LabelExampleWithHint />
    </UiTabsContent>
  </UiTabs>
</template>
