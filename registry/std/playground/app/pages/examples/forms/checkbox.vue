<script lang="ts" setup>
import CheckboxExampleBasic from '@registry/components/checkbox/examples/basic.vue'
import CheckboxExampleWithAlign from '@registry/components/checkbox/examples/with-align.vue'
import CheckboxExampleWithColor from '@registry/components/checkbox/examples/with-color.vue'
import CheckboxExampleWithIcon from '@registry/components/checkbox/examples/with-icon.vue'
import CheckboxExampleWithIndicator from '@registry/components/checkbox/examples/with-indicator.vue'
import CheckboxExampleWithRadius from '@registry/components/checkbox/examples/with-radius.vue'
import CheckboxExampleWithSize from '@registry/components/checkbox/examples/with-size.vue'
import CheckboxExampleWithState from '@registry/components/checkbox/examples/with-state.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <CheckboxExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <CheckboxExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <CheckboxExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <CheckboxExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align">
      <CheckboxExampleWithAlign />
    </UiTabsContent>

    <UiTabsContent value="with-indicator" title="With Indicator">
      <CheckboxExampleWithIndicator />
    </UiTabsContent>

    <UiTabsContent value="with-state" title="With State">
      <CheckboxExampleWithState />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <CheckboxExampleWithIcon />
    </UiTabsContent>
  </UiTabs>
</template>
