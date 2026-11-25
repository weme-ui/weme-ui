import { defineCommand } from 'citty'
import { cwd } from 'node:process'

/**
 * 检查注册表项目状态
 */
export default defineCommand({
  meta: {
    name: 'check',
    description: 'Check registry item status',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
  },
})
