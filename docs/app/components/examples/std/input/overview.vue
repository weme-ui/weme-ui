<script lang="ts" setup>
import InputNumber from '@registry/std/components/input/input-number.vue'
import InputPassword from '@registry/std/components/input/input-password.vue'
import InputPin from '@registry/std/components/input/input-pin.vue'
import Input from '@registry/std/components/input/input.vue'

const password = ref('hello')
const pin = ref([])
const number = ref(0)
</script>

<template>
  <Input
    name="input"
    leading-icon="info"
    trailing-icon="help"
    prepend="$"
    append="RMB"
    placeholder="Please input..."
    color="info"
    size="md"
    autocomplete="off"
    :max-length="10"
    show-count
    show-clear
  />

  <InputPassword v-model="password" name="password" show-invisible-button />

  <InputPin v-model="pin" name="pin" :length="6" />

  <InputNumber v-model="number" name="number" variant="normal" />
</template>
