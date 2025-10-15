<script lang="ts" setup>
import type { CalendarEmits, CalendarProps } from './calendar.props'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { Calendar } from 'reka-ui/namespaced'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import Button from '../button/button.vue'
import { useCalendarStyle } from './calendar.style'

const props = withDefaults(defineProps<CalendarProps>(), {
  color: 'accent',
  size: 'md',
  radius: 'sm',
  fixedWeeks: true,
})

const emits = defineEmits<CalendarEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'color', 'size', 'radius')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useCalendarStyle({
  ...props,
  disabled: toBoolValue(props.disabled),
}))
</script>

<template>
  <Calendar.Root v-slot="{ date: currentDate, grid, weekDays }" v-bind="forwarded" :class="ui.base({ class: [props.ui?.base, props.class] })">
    <Calendar.Header :class="ui.header({ class: props.ui?.header })">
      <slot name="header" v-bind="{ currentDate }">
        <Calendar.Prev as-child>
          <slot name="prev">
            <Button icon="left" variant="ghost" :radius="radius" :size="size" />
          </slot>
        </Calendar.Prev>

        <Calendar.Heading v-slot="{ headingValue }" :class="ui.heading({ class: props.ui?.heading })">
          <slot name="heading" v-bind="{ headingValue }">
            {{ headingValue }}
          </slot>
        </Calendar.Heading>

        <Calendar.Next as-child>
          <slot name="next">
            <Button icon="right" variant="ghost" :radius="radius" :size="size" />
          </slot>
        </Calendar.Next>
      </slot>
    </Calendar.Header>

    <div :class="ui.body({ class: props.ui?.body })">
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        :class="ui.grid({ class: props.ui?.grid })"
      >
        <Calendar.GridHead>
          <Calendar.GridRow :class="ui.gridHeadRow({ class: props.ui?.gridHeadRow })">
            <Calendar.HeadCell
              v-for="day in weekDays"
              :key="day"
              :class="ui.gridHeadCell({ class: props.ui?.gridHeadCell })"
            >
              {{ day }}
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>

        <Calendar.GridBody :class="ui.gridBody({ class: props.ui?.gridBody })">
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`date-${index}`"
            :class="ui.gridRow({ class: props.ui?.gridRow })"
          >
            <Calendar.Cell
              v-for="date in weekDates"
              :key="date.toString()"
              :date="date"
              :class="ui.gridCell({ class: props.ui?.gridCell })"
            >
              <Calendar.CellTrigger
                :day="date"
                :month="month.value"
                :class="ui.gridCellTrigger({ class: props.ui?.gridCellTrigger })"
              >
                {{ date.day }}
              </Calendar.CellTrigger>
              <slot name="day" v-bind="{ date }" />
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </Calendar.Root>
</template>
