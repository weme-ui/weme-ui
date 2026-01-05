<script lang="ts" setup>
import PasswordInputExampleBasic from '@registry/components/password-input/examples/basic.vue'
import PasswordInputExampleWithIcon from '@registry/components/password-input/examples/with-icon.vue'
import PasswordInputExampleWithInvalid from '@registry/components/password-input/examples/with-invalid.vue'
import PasswordInputExampleWithRadius from '@registry/components/password-input/examples/with-radius.vue'
import PasswordInputExampleWithSize from '@registry/components/password-input/examples/with-size.vue'
import PasswordInputExampleWithVariant from '@registry/components/password-input/examples/with-variant.vue'

import UiTabsContent from '@registry/components/tabs/tabs-content.vue'
import UiTabs from '@registry/components/tabs/tabs.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <PasswordInputExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-variant" title="With Variant">
      <PasswordInputExampleWithVariant />
    </UiTabsContent>

    <UiTabsContent value="with-radius" title="With Radius">
      <PasswordInputExampleWithRadius />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <PasswordInputExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-icon" title="With Icon">
      <PasswordInputExampleWithIcon />
    </UiTabsContent>

    <UiTabsContent value="with-invalid" title="With Invalid">
      <PasswordInputExampleWithInvalid />
    </UiTabsContent>
  </UiTabs>
</template>
