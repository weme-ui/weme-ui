<script lang="ts" setup>
import SelectExampleBasic from '@registry/components/select/examples/basic.vue'
import SelectExampleWithInvalid from '@registry/components/select/examples/with-invalid.vue'
import SelectExampleWithLoading from '@registry/components/select/examples/with-loading.vue'
import SelectExampleWithMultiple from '@registry/components/select/examples/with-multiple.vue'
import SelectExampleWithRadius from '@registry/components/select/examples/with-radius.vue'
import SelectExampleWithSelectIcon from '@registry/components/select/examples/with-select-icon.vue'
import SelectExampleWithSize from '@registry/components/select/examples/with-size.vue'
import SelectExampleWithSlot from '@registry/components/select/examples/with-slot.vue'
import SelectExampleWithSyncIcon from '@registry/components/select/examples/with-sync-icon.vue'
import SelectExampleWithVariant from '@registry/components/select/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <SelectExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-multiple" title="With Multiple">
      <SelectExampleWithMultiple />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <SelectExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <SelectExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <SelectExampleWithInvalid />
    </UiTabsContent>

    <UiTabsContent value="with-loading" title="With Loading">
      <SelectExampleWithLoading />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <SelectExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-sync-icon" title="With Sync Icon">
      <SelectExampleWithSyncIcon />
    </UiTabsContent>

    <UiTabsContent value="with-select-icon" title="With Select Icon">
      <SelectExampleWithSelectIcon />
    </UiTabsContent>

    <UiTabsContent value="with-slot" title="With Slot">
      <SelectExampleWithSlot />
    </UiTabsContent>
  </UiTabs>
</template>
