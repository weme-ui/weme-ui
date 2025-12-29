<script lang="ts" setup>
import { ref } from 'vue'
import Tag from '../../tag/tag.vue'
import Overflow from '../overflow.vue'

const max = ref<number | undefined>(3)
const gaps = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex-(~ col) gap-6 h-full py-4 gap-6">
    <template v-for="gap in gaps" :key="gap">
      <Overflow :max="max" :gap="gap">
        <template v-for="i in 10" :key="i">
          <Tag :label="`tag ${i}`" />
        </template>

        <template #overflow="{ number }">
          <Tag :label="`${number} +`" />
        </template>
      </Overflow>
    </template>
  </div>
</template>
