<script lang="ts" setup>
import Icon from '../../icon/icon.vue'
import Toggle from '../toggle.vue'
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Toggle>
      <template #icon="{ state }">
        <Icon
          :name="state === 'on' ? 'lucide:star' : 'lucide:star-off'"
          :class="{
            'text-amber': state === 'on',
          }"
        />
      </template>

      <template #default="{ state }">
        {{ state }}
      </template>
    </Toggle>
  </div>
</template>
