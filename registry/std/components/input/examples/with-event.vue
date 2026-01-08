<script lang="ts" setup>
import Kbd from '../../kbd/kbd.vue'
import Input from '../input.vue'

const text = ref('')

const changed = ref(false)
const entered = ref(false)
const cleared = ref(false)
const focused = ref(false)
const blurred = ref(false)

watchEffect(() => {
  if (changed.value) {
    setTimeout(() => {
      changed.value = false
    }, 1000)
  }

  if (entered.value) {
    setTimeout(() => {
      entered.value = false
    }, 1000)
  }

  if (cleared.value) {
    setTimeout(() => {
      cleared.value = false
    }, 1000)
  }

  if (focused.value) {
    setTimeout(() => {
      focused.value = false
    }, 1000)
  }

  if (blurred.value) {
    setTimeout(() => {
      blurred.value = false
    }, 1000)
  }
})
</script>

<template>
  <div class="text-center mt-4">
    <Input
      v-model="text"
      name="input"
      prefix-icon="user"
      placeholder="Enter your text here"
      class="min-w-80"
      clear
      @change="changed = true"
      @enter="entered = true"
      @clear="cleared = true"
      @focus="focused = true"
      @blur="blurred = true"
      @update:model-value="console.log"
    />
  </div>

  <div class="flex-(~ center) gap-6 mt-4">
    <Kbd value="Change" :variant="changed ? 'solid' : 'soft'" />
    <Kbd value="Enter" :variant="entered ? 'solid' : 'soft'" />
    <Kbd value="Clear" :variant="cleared ? 'solid' : 'soft'" />
    <Kbd value="Focus" :variant="focused ? 'solid' : 'soft'" />
    <Kbd value="Blur" :variant="blurred ? 'solid' : 'soft'" />
  </div>
</template>
