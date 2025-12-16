import type { LocaleMessages } from '~/types'
import { defineLocale } from '~/composables/define-locale'

export default defineLocale<LocaleMessages>({
  name: 'English',
  code: 'en',
  messages: {
    alert: {
      close: 'Close',
    },
    banner: {
      close: 'Close',
    },
    calendar: {
      nextMonth: 'Next month',
      nextYear: 'Next year',
      prevMonth: 'Previous month',
      prevYear: 'Previous year',
    },
    carousel: {
      dots: 'Choose slide to display',
      goto: 'Goto slide {slide}',
      next: 'Next',
      prev: 'Previous',
    },
    modal: {
      close: 'Close',
    },
    table: {
      noData: 'No data',
    },
    tag: {
      close: 'Close',
    },
    toast: {
      close: 'Close',
    },
  },
})
