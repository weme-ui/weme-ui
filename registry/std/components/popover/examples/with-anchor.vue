<script lang="ts" setup>
import { ref } from 'vue'
import IconButton from '../../icon-button/icon-button.vue'
import Popover from '../popover.vue'

const open = ref(false)
</script>

<template>
  <div class="flex-(~ center)">
    <Popover :open="open" size="md">
      <template #anchor>
        <input
          placeholder="Focus me to open popover"
          class="p-3 bg-elevated rounded-lg w-80 focus-visible:outline-primary"
          :class="{ 'outline-(2 primary)': open }"
          @focus="open = true"
        >
      </template>

      <template #content>
        <div class="flex-(~ col) gap-2">
          <div class="flex-(~ y-center)">
            <h3 class="font-medium text-highlighted flex-1">
              Popover with Anchor
            </h3>
            <IconButton
              icon="close"
              size="sm"
              @click="open = false"
            />
          </div>
          <p class="text-sm py-2">
            This popover is anchored to the input field. It opens when the input is focused.
          </p>
        </div>
      </template>
    </Popover>
  </div>
</template>
