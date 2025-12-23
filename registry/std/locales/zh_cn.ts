import type { LocaleMessages } from '~/types'
import { defineLocale } from '~/composables/define-locale'

export default defineLocale<LocaleMessages>({
  name: '简体中文',
  code: 'zh-CN',
  messages: {
    alert: {
      close: '关闭',
    },
    banner: {
      close: '关闭',
    },
    calendar: {
      nextMonth: '下个月',
      nextYear: '明年',
      prevMonth: '上个月',
      prevYear: '去年',
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
