import type { LocaleMessages } from '~/types/locale'
import { defineLocale } from '~/composables/define-locale'

export default defineLocale<LocaleMessages>({
  name: '简体中文',
  code: 'zh-CN',
  timezone: 'Asia/Shanghai',
  messages: {
    alert: {
      close: '关闭',
    },
    banner: {
      close: '关闭',
    },
    calendar: {
      prevMonth: '上个月',
      monthView: '月视图',
      nextMonth: '下个月',
      prevYear: '去年',
      yearView: '年视图',
      nextYear: '明年',
      prevPage: '上一页',
      decadeView: '历年视图',
      nextPage: '下一页',
    },
    carousel: {
      dots: '选择要显示的幻灯片',
      goto: '跳转到第 {slide} 页',
      next: '下一页',
      prev: '上一页',
    },
    modal: {
      close: '关闭',
    },
    pagination: {
      total: '共 {total} 条数据',
      first: '首页',
      prev: '上一页',
      next: '下一页',
      last: '末页',
    },
    popConfirm: {
      confirm: '确认',
      cancel: '取消',
    },
    passwordStrengthMeter: {
      tooWeak: '弱',
      weak: '弱',
      medium: '中',
      strong: '强',
    },
    table: {
      noData: '暂无数据',
    },
    tag: {
      close: '关闭',
    },
    toast: {
      close: '关闭',
    },
  },
})
