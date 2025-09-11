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
    path: '/utils/clickable',
    meta: {
      category: 'Utils',
      title: 'Clickable',
    },
    component: () => import('./pages/utils/clickable.vue'),
  },
  {
    path: '/utils/static',
    meta: {
      category: 'Utils',
      title: 'Static',
    },
    component: () => import('./pages/utils/static.vue'),
  },
]
