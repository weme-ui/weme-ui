<script lang="ts" setup>
import MarqueeExampleBasic from '@registry/components/marquee/examples/basic.vue'
import MarqueeExampleWithOrientation from '@registry/components/marquee/examples/with-orientation.vue'
import MarqueeExampleWithReverse from '@registry/components/marquee/examples/with-reverse.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <MarqueeExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <MarqueeExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-reverse" title="With Reverse">
      <MarqueeExampleWithReverse />
    </UiTabsContent>
  </UiTabs>
</template>
