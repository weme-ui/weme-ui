<script lang="ts" setup>
import ButtonGroupExampleWithBasic from '@registry/components/button-group/examples/basic.vue'
import ButtonGroupExampleWithColor from '@registry/components/button-group/examples/with-color.vue'
import ButtonGroupExampleWithGap from '@registry/components/button-group/examples/with-gap.vue'
import ButtonGroupExampleWithSize from '@registry/components/button-group/examples/with-size.vue'
import ButtonGroupExampleWithVariant from '@registry/components/button-group/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <ButtonGroupExampleWithBasic />
    </UiTabsContent>

    <UiTabsContent value="with-gap" title="With Gap">
      <ButtonGroupExampleWithGap />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <ButtonGroupExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <ButtonGroupExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ButtonGroupExampleWithSize />
    </UiTabsContent>
  </UiTabs>
</template>
