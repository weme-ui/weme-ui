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
  pagination: {
    total: string
    first: string
    prev: string
    next: string
    last: string
  }
  popConfirm: {
    confirm: string
    cancel: string
  }
  passwordStrengthMeter: {
    tooWeak: string
    weak: string
    medium: string
    strong: string
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
