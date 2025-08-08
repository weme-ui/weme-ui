import * as p from '@clack/prompts'
import chalk from 'chalk'

export const colors = {
  theme: chalk.hex('#05f'),
  themeBg: chalk.bgHex('#05f'),
}

function format(message: string) {
  return (
    message
      .replace(/`([^`]+)`/g, (_, m) => colors.theme(m))
      .replace(/\s+_([^_]+)_\s+/g, (_, m) => ` ${chalk.underline(m)} `)
  )
}

export const consola = {
  intro: (title: string) => {
    p.intro(chalk.bold(format(title)))
  },

  outro: (message: string) => {
    p.outro(format(message))
  },

  spinner: p.spinner,

  prompts: {
    text: p.text,
    select: p.select,
    confirm: p.confirm,
    password: p.password,
  },

  isCancel: p.isCancel,
  group: p.group,
  tasks: p.tasks,
  note: p.note,

  ...p.log,

  format,
}

export default consola
