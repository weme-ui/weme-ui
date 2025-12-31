<script lang="ts" setup>
import NumberTickerExampleBasic from '@registry/components/number-ticker/examples/basic.vue'
import NumberTickerExampleWithDecimal from '@registry/components/number-ticker/examples/with-decimal.vue'
import NumberTickerExampleWithDirection from '@registry/components/number-ticker/examples/with-direction.vue'
import NumberTickerExampleWithSlot from '@registry/components/number-ticker/examples/with-slot.vue'
import NumberTickerExampleWithTransform from '@registry/components/number-ticker/examples/with-transform.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <NumberTickerExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-direction" title="With Direction">
      <NumberTickerExampleWithDirection />
    </UiTabsContent>

    <UiTabsContent value="with-decimal" title="With Decimal">
      <NumberTickerExampleWithDecimal />
    </UiTabsContent>

    <UiTabsContent value="with-transform" title="With Transform">
      <NumberTickerExampleWithTransform />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <NumberTickerExampleWithSlot />
    </UiTabsContent>
  </UiTabs>
</template>
