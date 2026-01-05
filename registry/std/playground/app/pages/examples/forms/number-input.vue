<script lang="ts" setup>
import NumberInputExampleBasic from '@registry/components/number-input/examples/basic.vue'
import NumberInputExampleWithInvalid from '@registry/components/number-input/examples/with-invalid.vue'
import NumberInputExampleWithOrientation from '@registry/components/number-input/examples/with-orientation.vue'
import NumberInputExampleWithSize from '@registry/components/number-input/examples/with-size.vue'
import NumberInputExampleWithVariant from '@registry/components/number-input/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <NumberInputExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <NumberInputExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <NumberInputExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <NumberInputExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <NumberInputExampleWithInvalid />
    </UiTabsContent>
  </UiTabs>
</template>
