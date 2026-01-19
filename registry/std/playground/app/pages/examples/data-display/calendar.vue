<script lang="ts" setup>
import CalendarExampleBasic from '@registry/components/calendar/examples/basic.vue'
import CalendarExampleWithColor from '@registry/components/calendar/examples/with-color.vue'
import CalendarExampleWithMultiple from '@registry/components/calendar/examples/with-multiple.vue'
import CalendarExampleWithRadius from '@registry/components/calendar/examples/with-radius.vue'
import CalendarExampleWithRange from '@registry/components/calendar/examples/with-range.vue'
import CalendarExampleWithReadonly from '@registry/components/calendar/examples/with-readonly.vue'
import CalendarExampleWithSize from '@registry/components/calendar/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" class="h-full" animate>
    <UiTabsContent value="basic" title="Basic" class="h-full">
      <CalendarExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-multiple" title="With Multiple">
      <CalendarExampleWithMultiple />
    </UiTabsContent>

    <UiTabsContent value="with-range" title="With Range">
      <CalendarExampleWithRange />
    </UiTabsContent>

    <UiTabsContent value="with-color" title="With Color">
      <CalendarExampleWithColor />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <CalendarExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <CalendarExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-readonly" title="With Readonly">
      <CalendarExampleWithReadonly />
    </UiTabsContent>
  </UiTabs>
</template>
