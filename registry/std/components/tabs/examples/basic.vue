<script lang="ts" setup>
import TabsContent from '../tabs-content.vue'
import Tabs from '../tabs.vue'
</script>

<template>
  <Tabs default-value="1">
    <TabsContent value="1" title="Tab 1">
      Content 1
    </TabsContent>
    <TabsContent value="2" title="Tab 2">
      Content 2
    </TabsContent>
    <TabsContent value="3" title="Tab 3">
      Content 3
    </TabsContent>
  </Tabs>
</template>
