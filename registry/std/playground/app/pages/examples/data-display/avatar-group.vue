<script lang="ts" setup>
import AvatarGroupExampleBasic from '@registry/components/avatar-group/examples/basic.vue'
import AvatarGroupExampleWithColor from '@registry/components/avatar-group/examples/with-color.vue'
import AvatarGroupExampleWithMax from '@registry/components/avatar-group/examples/with-max.vue'
import AvatarGroupExampleWithRadius from '@registry/components/avatar-group/examples/with-radius.vue'
import AvatarGroupExampleWithSize from '@registry/components/avatar-group/examples/with-size.vue'
import AvatarGroupExampleWithVariant from '@registry/components/avatar-group/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <AvatarGroupExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color" class="h-full">
      <AvatarGroupExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant" class="h-full">
      <AvatarGroupExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size" class="h-full">
      <AvatarGroupExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius" class="h-full">
      <AvatarGroupExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-max" title="With Max" class="h-full">
      <AvatarGroupExampleWithMax />
    </UiTabsContent>
  </UiTabs>
</template>
