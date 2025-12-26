<script lang="ts" setup>
import Tag from '../../tag/tag.vue'
import Overflow from '../overflow.vue'

const max = ref<number | undefined>(3)
</script>

<template>
  <Overflow :max="max">
    <template v-for="i in 10" :key="i">
      <Tag :label="`tag ${i}`" />
    </template>

    <template #overflow="{ number }">
      <Tag :label="`${number} +`" />
    </template>
  </Overflow>
</template>
