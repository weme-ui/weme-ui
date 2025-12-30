<script lang="ts" setup>
import GroupExampleBasic from '@registry/components/group/examples/basic.vue'
import GroupExampleWithGap from '@registry/components/group/examples/with-gap.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <GroupExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-gap" title="With Gap">
      <GroupExampleWithGap />
    </UiTabsContent>
  </UiTabs>
</template>
