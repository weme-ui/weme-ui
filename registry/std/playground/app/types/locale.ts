export interface LocaleMessages {
  alert: {
    close: string
  }
  banner: {
    close: string
  }
  calendar: {
    nextMonth: string
    nextYear: string
    prevMonth: string
    prevYear: string
  }
  carousel: {
    dots: string
    goto: string
    next: string
    prev: string
  }
  modal: {
    close: string
  }
  table: {
    noData: string
  }
  tag: {
    close: string
  }
  toast: {
    close: string
  }
}

export type LocaleDirection = 'ltr' | 'rtl'

export interface Locale<M> {
  name: string
  code: string
  dir: LocaleDirection
  messages: M
}
