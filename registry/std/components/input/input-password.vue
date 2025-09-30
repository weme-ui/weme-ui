<script lang="ts" setup>
import type { InputPasswordEmits, InputPasswordProps } from './input-password.props'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import Icon from '../icon/icon.vue'
import { useInputPasswordStyle } from './input-password.style'
import Input from './input.vue'

const props = withDefaults(defineProps<InputPasswordProps>(), {
  type: 'password',
  size: 'md',
  showInvisibleButton: false,
})

const emits = defineEmits<InputPasswordEmits>()
const delegated = reactiveOmit(props, 'class', 'asChild', 'showInvisibleButton')

const type = ref(props.type)

function onInvisibleChange() {
  type.value = type.value === 'text'
    ? 'password'
    : 'text'

  emits('invisibleChange', type.value === 'text')
}

const ui = computed(() => useInputPasswordStyle(props))
</script>

<template>
  <Input v-bind="delegated" :type="type" :class="ui.base({ class: props.class })">
    <slot />

    <template v-if="showInvisibleButton" #append>
      <button :class="ui.invisibleButton({ class: props.ui?.invisibleButton })" @click="onInvisibleChange">
        <Icon v-if="type === 'text'" name="lucide:eye" />
        <Icon v-else name="lucide:eye-off" />
      </button>
    </template>
  </Input>
</template>
