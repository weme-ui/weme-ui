<script lang="ts" setup>
import TabsContent from '@registry/std/components/tabs/tabs-content.vue'
import Tabs from '@registry/std/components/tabs/tabs.vue'
</script>

<template>
  <Tabs default-value="tab-1" radius="lg">
    <TabsContent icon="info" value="tab-1" title="Tab 1">
      Content 1
    </TabsContent>
    <TabsContent icon="info" value="tab-2" title="Tab 2">
      Content 2
    </TabsContent>
    <TabsContent icon="info" value="tab-3" title="Tab 3">
      Content 3
    </TabsContent>
  </Tabs>
</template>
