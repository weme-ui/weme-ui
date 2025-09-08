import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/index.vue'),
  },
  // Basic
  {
    path: '/basic/typography',
    meta: {
      category: 'Basic',
      title: 'Typography',
    },
    component: () => import('./pages/basic/typography.vue'),
  },
  {
    path: '/basic/radius',
    meta: {
      category: 'Basic',
      title: 'Radius',
    },
    component: () => import('./pages/basic/radius.vue'),
  },
  {
    path: '/basic/spacing',
    meta: {
      category: 'Basic',
      title: 'Spacing',
    },
    component: () => import('./pages/basic/spacing.vue'),
  },
  // Theme
  {
    path: '/theme/color',
    meta: {
      category: 'Theme',
      title: 'Color',
    },
    component: () => import('./pages/theme/color.vue'),
  },
  // Utils
  {
    path: '/utils/button',
    meta: {
      category: 'Utils',
      title: 'Button',
    },
    component: () => import('./pages/utils/button.vue'),
  },
  {
    path: '/utils/badge',
    meta: {
      category: 'Utils',
      title: 'Badge',
    },
    component: () => import('./pages/utils/badge.vue'),
  },
]
