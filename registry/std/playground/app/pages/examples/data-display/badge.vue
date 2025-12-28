<script lang="ts" setup>
import BadgeExampleBasic from '@registry/components/badge/examples/basic.vue'
import BadgeExampleWithColor from '@registry/components/badge/examples/with-color.vue'
import BadgeExampleWithIcon from '@registry/components/badge/examples/with-icon.vue'
import BadgeExampleWithLinkable from '@registry/components/badge/examples/with-linkable.vue'
import BadgeExampleWithRadius from '@registry/components/badge/examples/with-radius.vue'
import BadgeExampleWithSize from '@registry/components/badge/examples/with-size.vue'
import BadgeExampleWithVariant from '@registry/components/badge/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <BadgeExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color" class="h-full">
      <BadgeExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant" class="h-full">
      <BadgeExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size" class="h-full">
      <BadgeExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius" class="h-full">
      <BadgeExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon" class="h-full">
      <BadgeExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-linkable" title="With Linkable" class="h-full">
      <BadgeExampleWithLinkable />
    </UiTabsContent>
  </UiTabs>
</template>
