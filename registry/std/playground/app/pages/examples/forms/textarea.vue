<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import TextareaExampleBasic from '@registry/components/textarea/examples/basic.vue'
import TextareaExampleWithInvalid from '@registry/components/textarea/examples/with-invalid.vue'
import TextareaExampleWithRadius from '@registry/components/textarea/examples/with-radius.vue'
import TextareaExampleWithVariant from '@registry/components/textarea/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TextareaExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <TextareaExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <TextareaExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <TextareaExampleWithInvalid />
    </UiTabsContent>
  </UiTabs>
</template>
