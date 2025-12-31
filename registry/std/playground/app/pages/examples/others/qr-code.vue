<script lang="ts" setup>
import QRCodeExampleBasic from '@registry/components/qr-code/examples/basic.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <QRCodeExampleBasic />
    </UiTabsContent>
  </UiTabs>
</template>
