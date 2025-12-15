<script lang="ts" setup>
import type { TimelineItem } from '../../../components/timeline/timeline.props'

const items: TimelineItem[] = [
  { avatar: { src: 'https://i.pravatar.cc/300?u=a' }, title: 'title', description: 'description', icon: 'lucide:list-tree', tag: { from: 'new', to: 'done' } },
  { title: 'title', description: 'description', icon: 'lucide:list-tree', avatar: 'Allen', color: 'danger' },
  { title: 'title', description: 'description', icon: 'lucide:list-tree' },
  { title: 'title', description: 'description', icon: 'lucide:list-tree' },
  { title: 'title', description: 'description', icon: 'lucide:list-tree' },
  { title: 'title', description: 'description', icon: 'lucide:list-tree' },
]
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiTimeline :items="items" size="md" variant="soft" class="w-100" pending reversed>
      <template #default="{ item }">
        <UiStack v-if="item.tag" orientation="horizontal" class="flex-y-center">
          <span class="text-xs">Change status from</span>
          <UiBadge :label="item.tag.from" color="info" variant="surface" size="xs" class="self-start" />
          <span class="text-xs">to</span>
          <UiBadge :label="item.tag.to" color="success" variant="surface" size="xs" class="self-start" />
        </UiStack>
      </template>
    </UiTimeline>
  </Container>
</template>
