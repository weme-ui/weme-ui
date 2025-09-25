<script lang="ts" setup>
import Progress from '@registry/std/components/progress/progress.vue'

const value = ref(0)

if (import.meta.client) {
  const timer = setInterval(() => {
    value.value = Number.parseFloat((Math.random() * 100).toFixed(2))
  }, 1000)

  onBeforeRouteLeave(() => {
    clearInterval(timer)
  })
}
</script>

<template>
  <Progress v-model="value" size="sm" :ui="{ label: 'flex-(~ y-center) gap-x-1.5' }">
    <template #label>
      <UiIcon
        name="info"
        class="transition-color"
        :class="{
          'c-error': value < 30,
          'c-warning': value >= 30 && value < 70,
          'c-success': value >= 70,
        }"
      />
      In Progress
    </template>
  </Progress>
</template>
