<script lang="ts" setup>
import AccordionExampleBasic from '@registry/components/accordion/examples/basic.vue'
import AccordionExampleWithAlign from '@registry/components/accordion/examples/with-align.vue'
import AccordionExampleWithColor from '@registry/components/accordion/examples/with-color.vue'
import AccordionExampleWithDisabled from '@registry/components/accordion/examples/with-disabled.vue'
import AccordionExampleWithRadius from '@registry/components/accordion/examples/with-radius.vue'
import AccordionExampleWithSize from '@registry/components/accordion/examples/with-size.vue'
import AccordionExampleWithVariant from '@registry/components/accordion/examples/with-variant.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <AccordionExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <AccordionExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <AccordionExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <AccordionExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <AccordionExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align">
      <AccordionExampleWithAlign />
    </UiTabsContent>

    <UiTabsContent value="with-disabled" title="With Disabled">
      <AccordionExampleWithDisabled />
    </UiTabsContent>
  </UiTabs>
</template>
