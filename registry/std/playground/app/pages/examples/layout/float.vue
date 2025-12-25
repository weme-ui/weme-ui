<script lang="ts" setup>
import FloatExampleBasic from '@registry/components/float/examples/basic.vue'
import FloatExampleWithOffset from '@registry/components/float/examples/with-offset.vue'
import FloatExampleWithPlacement from '@registry/components/float/examples/with-placement.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <FloatExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-placement" title="With Placement">
      <FloatExampleWithPlacement />
    </UiTabsContent>

    <UiTabsContent value="with-offset" title="With Offset">
      <FloatExampleWithOffset />
    </UiTabsContent>
  </UiTabs>
</template>
