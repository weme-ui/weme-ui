<script lang="ts" setup>
import ButtonExampleWithBasic from '@registry/components/button/examples/basic.vue'
import ButtonExampleWithColor from '@registry/components/button/examples/with-color.vue'
import ButtonExampleWithIcon from '@registry/components/button/examples/with-icon.vue'
import ButtonExampleWithRadius from '@registry/components/button/examples/with-radius.vue'
import ButtonExampleWithSize from '@registry/components/button/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <ButtonExampleWithBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <ButtonExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <ButtonExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ButtonExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <ButtonExampleWithRadius />
    </UiTabsContent>
  </UiTabs>
</template>
