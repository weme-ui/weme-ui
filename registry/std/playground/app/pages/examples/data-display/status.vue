<script lang="ts" setup>
import StatusExampleBasic from '@registry/components/status/examples/basic.vue'
import StatusExampleWithAnimate from '@registry/components/status/examples/with-animate.vue'
import StatusExampleWithColor from '@registry/components/status/examples/with-color.vue'
import StatusExampleWithSize from '@registry/components/status/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <StatusExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <StatusExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <StatusExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-animate" title="With Animate">
      <StatusExampleWithAnimate />
    </UiTabsContent>
  </UiTabs>
</template>
