<script lang="ts" setup generic="R extends boolean = false, M extends boolean = false">
import type { DateValue } from 'reka-ui'
import type { Grid } from 'reka-ui/date'
import type { IconButtonProps } from '../icon-button/icon-button.props'
import type { CalendarEmits, CalendarProps, CalendarView } from './calendar.props'
import { today as todayFn } from '@internationalized/date'
import { createReusableTemplate, reactiveOmit, useCycleList } from '@vueuse/core'
import { Presence, useDateFormatter, useForwardPropsEmits } from 'reka-ui'
import { createDecade, createYear, toDate } from 'reka-ui/date'
import { RangeCalendar, Calendar as SingleCalendar } from 'reka-ui/namespaced'
import { computed, ref, toRaw, watch } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { mergeToRef, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import IconButton from '../icon-button/icon-button.vue'
import Icon from '../icon/icon.vue'
import { useCalendarStyle } from './calendar.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CalendarProps<R, M>>(), {
  prevIcon: 'left',
  nextIcon: 'right',
  prevYearIcon: 'lucide:chevrons-left',
  nextYearIcon: 'lucide:chevrons-right',
  monthControls: true,
  yearControls: true,
  pageControls: true,
  fixedWeeks: false,
})
const emits = defineEmits<CalendarEmits<R, M>>()

const rootProps = useForwardPropsEmits(
  reactiveOmit(
    props,
    'range',
    'modelValue',
    'defaultValue',
    'dir',
    'icon',
    'color',
    'size',
    'radius',
    'prevIcon',
    'nextIcon',
    'nextYearIcon',
    'prevYearIcon',
    'yearRange',
    'monthControls',
    'yearControls',
    'pageControls',
    'viewTrigger',
    'class',
    'ui',
  ),
  emits,
)

const yearControlsProps = mergeToRef(props.yearControls, { variant: 'ghost' })
const monthControlsProps = mergeToRef(props.monthControls, { variant: 'ghost' })
const pageControlsProps = mergeToRef(props.pageControls, { variant: 'ghost' })
const viewTriggerProps = mergeToRef(props.viewTrigger, { variant: 'ghost' })

const { t, code, dir, timezone } = useLocale()
const locale = computed(() => props.locale ?? code.value)
const formatter = useDateFormatter(locale.value)

const isLoaded = ref(false)
const placeholder = ref(toRaw(props.placeholder) ?? props.defaultPlaceholder ?? todayFn(timezone.value))

const decade = computed(() => {
  const size = 11
  const range = props.yearRange ?? createDecade({
    dateObj: placeholder.value.cycle('year', size - Number(placeholder.value.year.toString().slice(-1))),
    endIndex: size + 1,
  })

  return {
    range,
    start: range[0]?.year,
    end: range[range.length - 1]?.year,
  }
})

const { state: view, next: nextView, go: gotoView } = useCycleList<CalendarView>([
  'month',
  'year',
  'decade',
])

const ui = computed(() => useCalendarStyle({
  color: props.color,
  size: props.size,
  radius: props.radius,
}))

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined && value !== null)
      emits('change', value)
  },
)

watch(
  view,
  () => { isLoaded.value = true },
)

function paginate(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 })
  }

  return date.add({ years: 1 })
}

function paginateDecade(sign: -1 | 1) {
  if (view.value !== 'decade')
    return

  placeholder.value = placeholder.value.cycle('year', sign * 10)
}

function chunkDates(dates: DateValue[], size: number): DateValue[][] {
  const chunks: DateValue[][] = []
  for (let i = 0; i < dates.length; i += size) {
    chunks.push(dates.slice(i, i + size))
  }
  return chunks
}

const [DefineCalendarHeading, ReuseCalendarHeading] = createReusableTemplate<{
  icon?: IconButtonProps['icon']
  date: DateValue
}>({
  inheritAttrs: false,
})

// Month View
const [DefineCalendarMonthView, ReuseCalendarMonthView] = createReusableTemplate<{
  months: Grid<DateValue>[]
  weekDays: string[]
}>({
  inheritAttrs: false,
})

// Year View
const [DefineCalendarYearView, ReuseCalendarYearView] = createReusableTemplate<{
  chunks: DateValue[][]
}>({
  inheritAttrs: false,
})

// Decade View
const [DefineCalendarDecadeView, ReuseCalendarDecadeView] = createReusableTemplate<{
  chunks: DateValue[][]
}>({
  inheritAttrs: false,
})

const Calendar = computed(() => props.range ? RangeCalendar : SingleCalendar)
</script>

<template>
  <DefineCalendarHeading v-slot="{ date, icon }">
    <slot v-if="icon || !$slots.icon" name="icon" v-bind="{ view, icon }">
      <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
    {{
      view !== 'decade'
        ? formatter.custom(
          toDate(date),
          view === 'year'
            ? { year: 'numeric' }
            : { month: 'long', year: 'numeric' },
        )
        : `${decade.start} - ${decade.end}`
    }}
  </DefineCalendarHeading>

  <DefineCalendarMonthView v-slot="{ months, weekDays }">
    <div :data-active="toBoolDataAttrValue(isLoaded)" data-slot="calendar-view" :data-view="view" :class="cn(ui.view(), props.ui?.view)">
      <Calendar.Grid
        v-for="month in months"
        :key="month.value.toString()"
        data-slot="calendar-grid"
        :class="cn(ui.grid(), props.ui?.grid)"
      >
        <Calendar.GridHead :class="cn(ui.head(), props.ui?.head)">
          <Calendar.GridRow :class="cn(ui.row(), props.ui?.row)">
            <Calendar.HeadCell
              v-for="weekday in weekDays"
              :key="weekday"
              :class="cn(ui.headCell(), props.ui?.headCell)"
            >
              <slot name="weekday" v-bind="{ weekday }">
                {{ weekday }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody :class="cn(ui.body(), props.ui?.body)">
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`date-${index}`"
            :class="cn(ui.row(), props.ui?.row)"
          >
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="cn(ui.cell(), props.ui?.cell)"
            >
              <Calendar.CellTrigger
                v-slot="{ disabled, selected, today, outsideView, outsideVisibleView, unavailable }"
                :day="weekDate"
                :month="month.value"
                :data-readonly="toBoolDataAttrValue(readonly)"
                :class="cn(ui.cellTrigger(), props.ui?.cellTrigger)"
              >
                <slot name="cell" v-bind="{ date: weekDate, disabled, selected, today, outsideView, outsideVisibleView, unavailable }">
                  {{ weekDate.day }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>

      <slot name="month-view-footer" />
    </div>
  </DefineCalendarMonthView>

  <DefineCalendarYearView v-slot="{ chunks }">
    <div data-active data-slot="calendar-view" :data-view="view" :class="cn(ui.view(), props.ui?.view)">
      <Calendar.Grid data-slot="calendar-grid" :class="cn(ui.grid(), props.ui?.grid)">
        <Calendar.GridBody :class="cn(ui.body(), props.ui?.body)">
          <Calendar.GridRow v-for="(chunk, index) in chunks" :key="`month-${index}`" :class="cn(ui.row(), props.ui?.row)">
            <Calendar.Cell
              v-for="date in chunk"
              :key="date.toString()"
              :date="date"
              :class="cn(ui.cell(), props.ui?.cell)"
            >
              <Calendar.CellTrigger
                v-slot="{ disabled, selected, unavailable }"
                :day="date"
                :month="date"
                data-slot="calendar-view-cell-trigger"
                :data-selected="date.month === placeholder.month"
                :class="cn(ui.viewCellTrigger(), props.ui?.viewCellTrigger)"
                @click="gotoView(0)"
              >
                <slot name="year-cell" v-bind="{ date, disabled, selected, unavailable }">
                  {{ formatter.custom(toDate(date), { month: 'short' }) }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </DefineCalendarYearView>

  <DefineCalendarDecadeView v-slot="{ chunks }">
    <div data-active data-slot="calendar-view" :data-view="view" :class="cn(ui.view(), props.ui?.view)">
      <Calendar.Grid data-slot="calendar-grid" :class="cn(ui.grid(), props.ui?.grid)">
        <Calendar.GridBody :class="cn(ui.body(), props.ui?.body)">
          <Calendar.GridRow v-for="(chunk, index) in chunks" :key="`month-${index}`" :class="cn(ui.row(), props.ui?.row)">
            <Calendar.Cell
              v-for="date in chunk"
              :key="date.toString()"
              :date="date"
              :class="cn(ui.cell(), props.ui?.cell)"
            >
              <Calendar.CellTrigger
                v-slot="{ disabled, selected, unavailable }"
                :day="date"
                :month="date"
                data-slot="calendar-view-cell-trigger"
                :data-selected="date.year === placeholder.year"
                :class="cn(ui.viewCellTrigger(), props.ui?.viewCellTrigger)"
                @click="gotoView(1)"
              >
                <slot name="year-cell" v-bind="{ date, disabled, selected, unavailable }">
                  {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </DefineCalendarDecadeView>

  <Calendar.Root
    v-slot="{ grid, date, weekDays }"
    v-bind="{ ...rootProps, ...$attrs }"
    data-slot="calendar"
    :data-range="toBoolDataAttrValue(range)"
    :dir="dir"
    :locale="locale"
    :model-value="(modelValue as DateValue | DateValue[])"
    :default-value="(defaultValue as DateValue)"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <Calendar.Header data-slot="calendar-header" :data-readonly="toBoolDataAttrValue(readonly)" :class="cn(ui.header(), props.ui?.header)">
      <template v-if="view === 'month' && !readonly">
        <Calendar.Prev
          v-if="yearControls"
          :prev-page="(date: DateValue) => paginate(date, -1)"
          :aria-label="t('calendar.prevYear')"
          as-child
        >
          <IconButton
            v-bind="yearControlsProps"
            data-slot="calendar-prev-year"
            :color="color"
            :icon="prevYearIcon"
            :class="cn(ui.headerButton(), props.ui?.headerButton)"
          />
        </Calendar.Prev>
        <Calendar.Prev v-if="monthControls" :aria-label="t('calendar.prevMonth')" as-child>
          <IconButton
            v-bind="monthControlsProps"
            data-slot="calendar-prev-month"
            :color="color"
            :icon="prevIcon"
            :class="cn(ui.headerButton(), props.ui?.headerButton)"
          />
        </Calendar.Prev>
      </template>
      <IconButton
        v-else-if="pageControls && !readonly"
        v-bind="pageControlsProps"
        data-slot="calendar-prev-page"
        :aria-label="t('calendar.prevPage')"
        :color="color"
        :icon="prevIcon"
        :class="cn(ui.headerButton(), props.ui?.headerButton)"
        @click="view === 'year' ? placeholder = paginate(date, -1) : paginateDecade(-1)"
      />
      <Calendar.Heading
        v-if="!!readonly"
        v-slot="{ headingValue }"
        data-slot="calendar-heading"
        :class="cn(ui.heading(), props.ui?.heading)"
        :as-child="toBoolValue(readonly) === false"
      >
        <slot name="heading" v-bind="{ headingValue, icon, view }">
          <ReuseCalendarHeading :icon="icon" :date="date" />
        </slot>
      </Calendar.Heading>
      <Button
        v-else
        v-bind="viewTriggerProps"
        data-slot="calendar-view-trigger"
        :aria-label="t(`calendar.${view}View`)"
        :color="color"
        :class="cn(ui.viewTrigger(), props.ui?.viewTrigger)"
        @click="nextView()"
      >
        <slot name="view-trigger" v-bind="{ date, icon, view }">
          <ReuseCalendarHeading :icon="icon" :date="date" />
        </slot>
      </Button>
      <IconButton
        v-if="view !== 'month' && pageControls"
        v-bind="pageControlsProps"
        data-slot="calendar-next-page"
        :aria-label="t('calendar.nextPage')"
        :color="color"
        :icon="nextIcon"
        :class="cn(ui.headerButton(), props.ui?.headerButton)"
        @click="view === 'year' ? placeholder = paginate(date, 1) : paginateDecade(1)"
      />
      <template v-else-if="!readonly">
        <Calendar.Next v-if="monthControls" :aria-label="t('calendar.nextMonth')" as-child>
          <IconButton
            v-bind="monthControlsProps"
            data-slot="calendar-next-month"
            :color="color"
            :icon="nextIcon"
            :class="cn(ui.headerButton(), props.ui?.headerButton)"
          />
        </Calendar.Next>
        <Calendar.Next
          v-if="yearControls"
          :next-page="(date: DateValue) => paginate(date, 1)"
          :aria-label="t('calendar.nextYear')"
          as-child
        >
          <IconButton
            v-bind="yearControlsProps"
            data-slot="calendar-next-year"
            :color="color"
            :icon="nextYearIcon"
            :class="cn(ui.headerButton(), props.ui?.headerButton)"
          />
        </Calendar.Next>
      </template>
    </Calendar.Header>

    <Presence :present="view === 'month'">
      <ReuseCalendarMonthView :months="grid" :week-days="weekDays" />
    </Presence>

    <Presence :present="view === 'year'">
      <ReuseCalendarYearView :chunks="chunkDates(createYear({ dateObj: date }), 4)" />
    </Presence>

    <Presence :present="view === 'decade'">
      <ReuseCalendarDecadeView :chunks="chunkDates(decade.range, 4)" />
    </Presence>
  </Calendar.Root>
</template>
