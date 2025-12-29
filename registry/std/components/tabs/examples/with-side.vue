<script lang="ts" setup>
import TabsContent from '../tabs-content.vue'
import Tabs from '../tabs.vue'

const variants = ['line', 'pill', 'card', 'capsule', 'plain'] as const
const sides = ['top', 'bottom', 'left', 'right'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <template v-for="variant in variants" :key="variant">
      <template v-for="side in sides" :key="side">
        <Tabs default-value="1" :side="side" :variant="variant">
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
    </template>
  </div>
</template>
