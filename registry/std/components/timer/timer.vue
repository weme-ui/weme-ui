<script lang="ts" setup>
import type { TimerEmits, TimerProps, TimerTick } from './timer.props'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { cn } from '~/utils/styles'
import { useTimerStyle } from './timer.style'

const props = withDefaults(defineProps<TimerProps>(), {
  color: 'primary',
  variant: 'soft',
  size: 'md',
  radius: 'md',
  mode: 'countdown',
  autoStart: true,
  startTime: 0,
  endTime: 0,
  precision: 0,
})

const emits = defineEmits<TimerEmits>()
const delegated = reactivePick(props, 'as', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useTimerStyle(props))

let timerId: number | null = null
let elapsed = 0
let now = -1

const distance = ref(0)
const running = ref(props.autoStart)
const finished = ref(false)

const timeTick = computed(() => getTimeTick(distance.value))

watchEffect(() => {
  distance.value = props.startTime
})

function getDistance(time: DOMHighResTimeStamp): number {
  if (props.mode === 'countdown')
    return props.startTime - elapsed + now - time

  return time - now
}

function getTimeTick(distance: number): TimerTick {
  let milliseconds = 0

  switch (props.precision) {
    case 0:
      distance += 999
      break
    case 1:
      distance += 99
      milliseconds = Math.floor((distance % 1000) / 100)
      break
    case 2:
      distance += 9
      milliseconds = Math.floor((distance % 1000) / 10)
      break
    case 3:
      milliseconds = Math.floor(distance % 1000)
      break
  }

  const days = Math.floor(distance / 86400000)
  const hours = Math.floor((distance % 86400000) / 3600000)
  const minutes = Math.floor((distance % 3600000) / 60000)
  const seconds = Math.floor((distance % 60000) / 1000)

  return {
    days: `${days}`,
    hours: `${hours}`.padStart(2, '0'),
    minutes: `${minutes}`.padStart(2, '0'),
    seconds: `${seconds}`.padStart(2, '0'),
    milliseconds: `${milliseconds}`,
  }
}

function tick() {
  const { mode, precision, endTime } = props
  const now = getDistance(performance.now())

  if (mode === 'countdown' && now <= 0) {
    distance.value = 0
    stopTimer()

    if (!finished.value) {
      finished.value = true
      running.value = false
      emits('finish')
    }
    return
  }

  if (mode === 'countup' && endTime > 0 && now >= endTime) {
    distance.value = endTime
    stopTimer()

    if (!finished.value) {
      finished.value = true
      running.value = false
      emits('finish')
    }
    return
  }

  emits('tick', getTimeTick(now))

  let leftTime: number
  switch (precision) {
    case 3:
    case 2:
      leftTime = now % 34
      break
    case 1:
      leftTime = now % 100
      break
    default:
      leftTime = now % 1000
      break
  }

  distance.value = now

  timerId = window.setTimeout(() => {
    tick()
  }, leftTime)
}

function pause() {
  if (running.value)
    running.value = false
}

function resume() {
  if (!running.value)
    running.value = true
}

function reset() {
  elapsed = 0
  now = -1
  distance.value = props.startTime

  if (running.value && finished.value)
    tick()

  finished.value = false
}

function stopTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    running.value = false
    timerId = null
  }
}

onMounted(() => {
  if (import.meta.client) {
    watchEffect(() => {
      if (running.value) {
        now = performance.now()
        tick()
      }
      else {
        if (now !== -1) {
          elapsed += performance.now() - now
        }
        stopTimer()
      }
    })
  }
})

onBeforeUnmount(() => {
  stopTimer()
})

defineExpose({
  running,
  finished,
  pause,
  resume,
  reset,
})
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    :data-state="running ? 'running' : finished ? 'finished' : 'paused'"
    data-slot="timer"
  >
    <template v-if="timeTick.days !== '0'">
      <div :class="cn(ui.item(), props.ui?.item)" data-slot="timer-days">
        <div :class="cn(ui.value(), props.ui?.value)" data-slot="timer-days-value">
          <slot name="days" v-bind="{ value: timeTick.days }">
            {{ timeTick.days }}
          </slot>
        </div>
        <div v-if="!!$slots['days-label']" :class="cn(ui.label(), props.ui?.label)" data-slot="timer-days-label">
          <slot name="days-label" />
        </div>
      </div>
      <div :class="cn(ui.separator(), props.ui?.separator)">
        <slot name="separator" v-bind="{ key: 'days' }">
          :
        </slot>
      </div>
    </template>

    <div :class="cn(ui.item(), props.ui?.item)" data-slot="timer-hours">
      <div :class="cn(ui.value(), props.ui?.value)" data-slot="timer-hours-value">
        <slot name="hours" v-bind="{ value: timeTick.hours }">
          {{ timeTick.hours }}
        </slot>
      </div>
      <div v-if="!!$slots['hours-label']" :class="cn(ui.label(), props.ui?.label)" data-slot="timer-hours-label">
        <slot name="hours-label" />
      </div>
    </div>
    <div :class="cn(ui.separator(), props.ui?.separator)">
      <slot name="separator" v-bind="{ key: 'hours' }">
        :
      </slot>
    </div>

    <div :class="cn(ui.item(), props.ui?.item)" data-slot="timer-minutes">
      <div :class="cn(ui.value(), props.ui?.value)" data-slot="timer-minutes-value">
        <slot name="minutes" v-bind="{ value: timeTick.minutes }">
          {{ timeTick.minutes }}
        </slot>
      </div>
      <div v-if="!!$slots['minutes-label']" :class="cn(ui.label(), props.ui?.label)" data-slot="timer-minutes-label">
        <slot name="minutes-label" />
      </div>
    </div>
    <div :class="cn(ui.separator(), props.ui?.separator)">
      <slot name="separator" v-bind="{ key: 'minutes' }">
        :
      </slot>
    </div>

    <div :class="cn(ui.item(), props.ui?.item)" data-slot="timer-seconds">
      <div :class="cn(ui.value(), props.ui?.value)" data-slot="timer-seconds-value">
        <slot name="seconds" v-bind="{ value: timeTick.seconds }">
          {{ timeTick.seconds }}
        </slot>
      </div>
      <div v-if="!!$slots['seconds-label']" :class="cn(ui.label(), props.ui?.label)" data-slot="timer-seconds-label">
        <slot name="seconds-label" />
      </div>
    </div>

    <template v-if="props.precision > 0">
      <div :class="cn(ui.separator(), props.ui?.separator)">
        <slot name="separator" v-bind="{ key: 'seconds' }">
          :
        </slot>
      </div>
      <div :class="cn(ui.item(), props.ui?.item)" data-slot="timer-milliseconds">
        <div :class="cn(ui.value(), props.ui?.value)" data-slot="timer-milliseconds-value">
          <slot name="milliseconds" v-bind="{ value: timeTick.milliseconds }">
            {{ timeTick.milliseconds }}
          </slot>
        </div>
        <div v-if="!!$slots['milliseconds-label']" :class="cn(ui.label(), props.ui?.label)" data-slot="timer-milliseconds-label">
          <slot name="milliseconds-label" />
        </div>
      </div>
    </template>
  </Primitive>
</template>
