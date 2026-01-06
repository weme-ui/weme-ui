<script lang="ts" setup>
import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'

import TagsInputExampleBasic from '@registry/components/tags-input/examples/basic.vue'
import TagsInputExampleWithIcon from '@registry/components/tags-input/examples/with-icon.vue'
import TagsInputExampleWithInvalid from '@registry/components/tags-input/examples/with-invalid.vue'
import TagsInputExampleWithRadius from '@registry/components/tags-input/examples/with-radius.vue'
import TagsInputExampleWithSize from '@registry/components/tags-input/examples/with-size.vue'
import TagsInputExampleWithVariant from '@registry/components/tags-input/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <TagsInputExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <TagsInputExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <TagsInputExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <TagsInputExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <TagsInputExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <TagsInputExampleWithInvalid />
    </UiTabsContent>
  </UiTabs>
</template>
