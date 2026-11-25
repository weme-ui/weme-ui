import { defineCommand } from 'citty'
import { cwd } from 'node:process'

/**
 * 检查注册表环境
 */
export default defineCommand({
  meta: {
    name: 'doctor',
    description: 'Check registry environment',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
  },
})
