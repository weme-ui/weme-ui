import type { LocaleMessages } from '~/types/locale'
import { defineLocale } from '~/composables/define-locale'

export default defineLocale<LocaleMessages>({
  name: 'English',
  code: 'en',
  timezone: 'UTC',
  messages: {
    alert: {
      close: 'Close',
    },
    banner: {
      close: 'Close',
    },
    calendar: {
      prevMonth: 'Previous month',
      monthView: 'Month view',
      nextMonth: 'Next month',
      prevYear: 'Previous year',
      yearView: 'Year view',
      nextYear: 'Next year',
      prevPage: 'Previous page',
      decadeView: 'Decade view',
      nextPage: 'Next page',
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
    pagination: {
      total: 'Total {total} items',
      first: 'First',
      prev: 'Previous',
      next: 'Next',
      last: 'Last',
    },
    popConfirm: {
      confirm: 'Ok',
      cancel: 'Cancel',
    },
    passwordStrengthMeter: {
      tooWeak: 'Too weak',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
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
