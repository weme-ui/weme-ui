<script lang="ts" setup>
import Card from '../../card/card.vue'
import IconBox from '../../icon-box/icon-box.vue'
import Stack from '../../stack/stack.vue'
import Stat from '../stat.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6">
    <template v-for="size in sizes" :key="size">
      <Card>
        <Stack orientation="horizontal" class="gap-8">
          <Stack orientation="horizontal" class="flex-1">
            <Stat
              :size="size"
              label="Visitors"
              description="Since last month"
              value="14,000"
              class="flex-1"
            />
            <IconBox name="user" radius="full" />
          </Stack>

          <Stack orientation="horizontal" class="flex-1">
            <Stat
              :size="size"
              label="Page Views"
              description="Since last month"
              value="14,000"
              class="flex-1"
            />
            <IconBox name="lucide:activity" radius="full" />
          </Stack>

          <Stack orientation="horizontal" class="flex-1">
            <Stat
              :size="size"
              label="Incoming"
              description="Since last month"
              value="14,000"
              class="flex-1"
            />
            <IconBox name="lucide:locate" radius="full" />
          </Stack>

          <Stack orientation="horizontal" class="flex-1">
            <Stat
              :size="size"
              label="Outgoing"
              description="Since last month"
              value="14,000"
              class="flex-1"
            />
            <IconBox name="lucide:log-out" radius="full" />
          </Stack>

          <template #separator>
            <div class="bg-muted w-px" />
          </template>
        </Stack>
      </Card>
    </template>
  </div>
</template>
