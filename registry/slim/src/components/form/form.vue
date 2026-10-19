<script lang="ts" setup>
import type { FormEmits, FormProps } from './form.props'
import type { FormRegisteredField } from '~/composables/use-form-context'
import { Primitive, useForwardExpose } from 'reka-ui'
import { computed, getCurrentInstance, nextTick, toRefs, watch } from 'vue'
import { provideFormContext } from '~/composables/use-form-context'
import { cn } from '~/utils/styles'

const props = withDefaults(defineProps<FormProps>(), {
  as: 'form',
  validationMode: 'onSubmit',
})

const emits = defineEmits<FormEmits>()

const {
  loading,
  disabled,
  validationMode,
} = toRefs(props)

const instance = getCurrentInstance()
const fields = new Set<FormRegisteredField>()
const serverErrors = computed(() => props.errors ?? {})

function registerField(field: FormRegisteredField) {
  fields.add(field)
  return () => {
    fields.delete(field)
  }
}

function getValues() {
  const values: Record<string, unknown> = {}
  fields.forEach((field) => {
    if (field.name.value)
      values[field.name.value] = field.getValue()
  })
  return values
}

function focusFirstInvalid() {
  let hasInvalid = false
  let first: HTMLElement | undefined
  fields.forEach((field) => {
    if (!field.invalid.value)
      return
    hasInvalid = true
    const element = field.getControlElement()
    if (element && (!first || first.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING))
      first = element
  })

  if (first) {
    first.focus()
    if (first instanceof HTMLInputElement)
      first.select()
  }
  return hasInvalid
}

let awaitingServerErrors = false

function handleSubmit(event: Event) {
  props.form.handleSubmit()

  if (focusFirstInvalid()) {
    event.preventDefault()
    return
  }

  awaitingServerErrors = true
  emits('submit', event as SubmitEvent)

  if (instance?.vnode.props?.onFormSubmit) {
    emits('formSubmit', getValues(), event as SubmitEvent)
  }
}

function handleReset() {
  fields.forEach(field => field.resetField())
}

watch(serverErrors, async () => {
  if (!awaitingServerErrors)
    return
  awaitingServerErrors = false
  await nextTick()
  focusFirstInvalid()
})

provideFormContext({
  form: props.form,
  validationMode,
  serverErrors,
  loading,
  disabled,
  getValues,
  registerField,
})

useForwardExpose()
</script>

<template>
  <Primitive
    data-slot="form"
    :as="as"
    :as-child="asChild"
    :class="cn('flex flex-col gap-4 p-4', props.class)"
    novalidate
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <slot />
  </Primitive>
</template>
