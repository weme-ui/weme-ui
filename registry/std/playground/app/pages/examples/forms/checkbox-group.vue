<script lang="ts" setup>
import CheckboxGroupExampleBasic from '@registry/components/checkbox-group/examples/basic.vue'
import CheckboxGroupExampleWithColor from '@registry/components/checkbox-group/examples/with-color.vue'
import CheckboxGroupExampleWithOrientation from '@registry/components/checkbox-group/examples/with-orientation.vue'
import CheckboxGroupExampleWithRadius from '@registry/components/checkbox-group/examples/with-radius.vue'
import CheckboxGroupExampleWithSize from '@registry/components/checkbox-group/examples/with-size.vue'
import CheckboxGroupExampleWithVariant from '@registry/components/checkbox-group/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <CheckboxGroupExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <CheckboxGroupExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <CheckboxGroupExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <CheckboxGroupExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <CheckboxGroupExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <CheckboxGroupExampleWithRadius />
    </UiTabsContent>
  </UiTabs>
</template>
