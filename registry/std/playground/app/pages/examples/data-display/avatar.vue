<script lang="ts" setup>
import AvatarExampleBasic from '@registry/components/avatar/examples/basic.vue'
import AvatarExampleWithColor from '@registry/components/avatar/examples/with-color.vue'
import AvatarExampleWithIcon from '@registry/components/avatar/examples/with-icon.vue'
import AvatarExampleWithRadius from '@registry/components/avatar/examples/with-radius.vue'
import AvatarExampleWithSize from '@registry/components/avatar/examples/with-size.vue'
import AvatarExampleWithVariant from '@registry/components/avatar/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <AvatarExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color" class="h-full">
      <AvatarExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant" class="h-full">
      <AvatarExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size" class="h-full">
      <AvatarExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius" class="h-full">
      <AvatarExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon" class="h-full">
      <AvatarExampleWithIcon />
    </UiTabsContent>
  </UiTabs>
</template>
