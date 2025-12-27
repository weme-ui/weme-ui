<script lang="ts" setup>
import ResultExampleBasic from '@registry/components/result/examples/basic.vue'
import ResultExampleWithSize from '@registry/components/result/examples/with-size.vue'
import ResultExampleWithSlot from '@registry/components/result/examples/with-slot.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <ResultExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <ResultExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <ResultExampleWithSlot />
    </UiTabsContent>
  </UiTabs>
</template>
