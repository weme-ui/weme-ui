<script lang="ts" setup>
import type { TagGroupEmits, TagGroupItemValue, TagGroupProps } from './tag-group.props'
import { reactiveOmit } from '@vueuse/core'
import { TagGroupItem, TagGroupItemDelete, TagGroupItemText, TagGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolAriaValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import AnimatedSelectIcon from '../animated-select-icon/animated-select-icon.vue'
import Icon from '../icon/icon.vue'
import { useTagGroupStyle } from './tag-group.style'

const props = withDefaults(defineProps<TagGroupProps>(), {
  variant: 'soft',
  radius: 'md',
  size: 'md',
  deleteIcon: 'ri:close-line',
})

const emits = defineEmits<TagGroupEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'items', 'variant', 'radius', 'size', 'deleteIcon', 'closeable', 'unstyled', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const formFieldContext = useFormFieldContext()

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const name = computed(() => props.name ?? formFieldContext.name.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)

const pressedItem = ref<TagGroupItemValue | null>(null)

const ui = computed(() => useTagGroupStyle({
  variant: props.variant,
  radius: props.radius,
  size: props.size,
  unstyled: props.unstyled,
  disabled: disabled.value,
  selectable: props.selectionMode && props.selectionMode !== 'none',
}))

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

function handleItemPress(item: TagGroupItemValue | null) {
  pressedItem.value = item
}

function handleUpdate(value: TagGroupItemValue | TagGroupItemValue[] | undefined) {
  emits('change', value)
}
</script>

<template>
  <TagGroupRoot
    :data-slot="$attrs['data-slot'] ?? 'tag-group'"
    v-bind="forwarded"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <template v-if="items && items.length > 0">
      <TagGroupItem
        v-for="item in items"
        v-slot="{ selected }"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        :aria-pressed="toBoolAriaValue(pressedItem === item.value)"
        :class="cn(ui.item(), props.ui?.item, item.class)"
        @mousedown="handleItemPress(item.value)"
        @mouseup="handleItemPress(null)"
        @touchstart="handleItemPress(item.value)"
        @touchend="handleItemPress(null)"
      >
        <slot name="tag-icon" :item="item" :selected="selected">
          <AnimatedSelectIcon
            v-if="item.icon"
            :icon="item.icon"
            :selected-icon="item.selectedIcon"
            :selected="selected"
            :class="cn(ui.itemIcon(), props.ui?.itemIcon, item.iconClass)"
          />
        </slot>

        <TagGroupItemText :class="cn(ui.itemText(), props.ui?.itemText)">
          <slot name="tag-text" :item="item" :selected="selected">
            {{ item.label }}
          </slot>
        </TagGroupItemText>

        <TagGroupItemDelete v-if="closeable && !item.disabled" :class="cn(ui.itemDelete(), props.ui?.itemDelete)">
          <slot name="tag-delete" :item="item" :selected="selected">
            <Icon :name="deleteIcon" :class="cn(ui.itemDeleteIcon(), props.ui?.itemDeleteIcon)" />
          </slot>
        </TagGroupItemDelete>
      </TagGroupItem>
    </template>

    <template v-else>
      <slot name="empty" />
    </template>

    <input :id="id" :name="name" class="sr-only">
  </TagGroupRoot>
</template>
