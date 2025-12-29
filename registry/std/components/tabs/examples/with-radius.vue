<script lang="ts" setup>
import TabsContent from '../tabs-content.vue'
import Tabs from '../tabs.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <Tabs default-value="1" variant="card" :radius="radius">
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
  </div>
</template>
