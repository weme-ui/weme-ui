<script lang="ts" setup>
import KbdExampleBasic from '@registry/components/kbd/examples/basic.vue'
import KbdExampleWithColor from '@registry/components/kbd/examples/with-color.vue'
import KbdExampleWithSize from '@registry/components/kbd/examples/with-size.vue'
import KbdExampleWithVariant from '@registry/components/kbd/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <KbdExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <KbdExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <KbdExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <KbdExampleWithSize />
    </UiTabsContent>
  </UiTabs>
</template>
