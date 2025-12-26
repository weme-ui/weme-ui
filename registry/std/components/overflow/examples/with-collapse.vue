<script lang="ts" setup>
import Icon from '../../icon/icon.vue'
import Tag from '../../tag/tag.vue'
import Overflow from '../overflow.vue'

const max = ref<number | undefined>(3)
</script>

<template>
  <Overflow :max="max">
    <template v-for="i in 10" :key="i">
      <Tag :label="`tag ${i}`" />
    </template>

    <template #overflow>
      <Tag variant="outline" class="hover:bg-elevated" @click="max = max ? undefined : 3">
        <template v-if="max">
          <Icon name="right" />
        </template>
        <template v-else>
          <Icon name="left" />
        </template>
      </Tag>
    </template>
  </Overflow>
</template>
