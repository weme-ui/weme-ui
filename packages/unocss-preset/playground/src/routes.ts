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
  {
    path: '/theme/typography',
    meta: {
      category: 'Theme',
      title: 'Typography',
    },
    component: () => import('./pages/theme/typography.vue'),
  },
  {
    path: '/theme/color-rules',
    meta: {
      category: 'Theme',
      title: 'Color Rules',
    },
    component: () => import('./pages/theme/color-rules.vue'),
  },

  // Utils
  {
    path: '/utils/button',
    meta: {
      category: 'Utils',
      title: 'Button',
    },
    component: () => import('./pages/utils/btn.vue'),
  },
  {
    path: '/utils/box',
    meta: {
      category: 'Utils',
      title: 'Box',
    },
    component: () => import('./pages/utils/box.vue'),
  },
]
