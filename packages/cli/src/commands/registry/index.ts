import { defineCommand } from 'citty'

/**
 * 管理 Weme UI 注册表
 */
export default defineCommand({
  meta: {
    name: 'registry',
    description: 'Manage Weme UI registry',
  },

  subCommands: {
    /**
     * 检查注册表项目状态
     */
    check: () => import('./check/index').then((r) => r.default),

    /**
     * 添加注册表项目
     */
    add: () => import('./add/index').then((r) => r.default),

    /**
     * 更新注册表项目
     */
    update: () => import('./update/index').then((r) => r.default),

    /**
     * 检查注册表环境
     */
    doctor: () => import('./doctor/index').then((r) => r.default),
  },
})
