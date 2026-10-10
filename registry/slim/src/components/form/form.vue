<script lang="ts" setup>
import type { FormProps } from './form.props'
import { toRefs, useId } from 'vue'
import { provideFormContext } from '~/composables/use-form-context'
import { cn } from '~/utils/styles'

const props = defineProps<FormProps>()

const formId = props.id ?? useId() as string

const {
  loading,
  disabled,
} = toRefs(props)

provideFormContext({
  form: props.form,
  loading,
  disabled,
})
</script>

<template>
  <form
    :id="formId"
    data-slot="form"
    :name="name"
    :class="cn('flex flex-col gap-4 p-4', props.class)"
    method="post"
    novalidate
    @submit.prevent="form.handleSubmit"
  >
    <slot />
  </form>
</template>
