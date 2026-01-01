<script lang="ts" setup>
import Icon from '../../icon/icon.vue'
import Timer from '../timer.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <Timer mode="countup" :precision="0">
      <template #hours-label>
        时
      </template>
      <template #minutes-label>
        分
      </template>
      <template #seconds-label>
        秒
      </template>
      <template #separator>
        <Icon name="lucide:slash" />
      </template>
    </Timer>
  </div>
</template>
