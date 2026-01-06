<script lang="ts" setup>
import SwitchExampleBasic from '@registry/components/switch/examples/basic.vue'
import SwitchExampleWithColor from '@registry/components/switch/examples/with-color.vue'
import SwitchExampleWithDisabled from '@registry/components/switch/examples/with-disabled.vue'
import SwitchExampleWithIcon from '@registry/components/switch/examples/with-icon.vue'
import SwitchExampleWithLoading from '@registry/components/switch/examples/with-loading.vue'
import SwitchExampleWithRadius from '@registry/components/switch/examples/with-radius.vue'
import SwitchExampleWithSize from '@registry/components/switch/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <SwitchExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <SwitchExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <SwitchExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <SwitchExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <SwitchExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-disabled" title="With Disabled">
      <SwitchExampleWithDisabled />
    </UiTabsContent>

    <UiTabsContent value="with-loading" title="With Loading">
      <SwitchExampleWithLoading />
    </UiTabsContent>
  </UiTabs>
</template>
