<script lang="ts" setup>
import RatingExampleBasic from '@registry/components/rating/examples/basic.vue'
import RatingExampleWithColor from '@registry/components/rating/examples/with-color.vue'
import RatingExampleWithReadonly from '@registry/components/rating/examples/with-readonly.vue'
import RatingExampleWithSize from '@registry/components/rating/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <RatingExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <RatingExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <RatingExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-readonly" title="With Readonly">
      <RatingExampleWithReadonly />
    </UiTabsContent>
  </UiTabs>
</template>
