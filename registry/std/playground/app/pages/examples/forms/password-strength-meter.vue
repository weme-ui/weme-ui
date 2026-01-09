<script lang="ts" setup>
import PasswordStrengthMeterExampleBasic from '@registry/components/password-strength-meter/examples/basic.vue'
import PasswordStrengthMeterExampleWithSize from '@registry/components/password-strength-meter/examples/with-size.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <PasswordStrengthMeterExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <PasswordStrengthMeterExampleWithSize />
    </UiTabsContent>
  </UiTabs>
</template>
