<script lang="ts" setup>
import BreadcrumbExampleBasic from '@registry/components/breadcrumb/examples/basic.vue'
import BreadcrumbExampleWithIcon from '@registry/components/breadcrumb/examples/with-icon.vue'
import BreadcrumbExampleWithSeparator from '@registry/components/breadcrumb/examples/with-separator.vue'
import BreadcrumbExampleWithSize from '@registry/components/breadcrumb/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <BreadcrumbExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <BreadcrumbExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <BreadcrumbExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-separator" title="With Separator">
      <BreadcrumbExampleWithSeparator />
    </UiTabsContent>
  </UiTabs>
</template>
