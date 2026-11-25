import { defineCommand } from 'citty'
import { cwd } from 'node:process'

/**
 * 添加注册表项目
 */
export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add a new registry item',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
  },
})
