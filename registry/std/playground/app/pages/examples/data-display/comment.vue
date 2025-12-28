<script lang="ts" setup>
import CommentExampleBasic from '@registry/components/comment/examples/basic.vue'
import CommentExampleWithAction from '@registry/components/comment/examples/with-action.vue'
import CommentExampleWithAlign from '@registry/components/comment/examples/with-align.vue'
import CommentExampleWithSize from '@registry/components/comment/examples/with-size.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <CommentExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-size" title="With Size">
      <CommentExampleWithSize />
    </UiTabsContent>

    <UiTabsContent value="with-align" title="With Align">
      <CommentExampleWithAlign />
    </UiTabsContent>

    <UiTabsContent value="with-action" title="With Action">
      <CommentExampleWithAction />
    </UiTabsContent>
  </UiTabs>
</template>
