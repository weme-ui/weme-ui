import chalk from 'chalk'
import logSymbols from 'log-symbols'

export function info(...args: string[]) {
  console.info(`${logSymbols.info}`, ...args)
}

export function success(...args: string[]) {
  console.info(`${logSymbols.success}`, ...args)
}

export function warn(...args: string[]) {
  console.warn(`${logSymbols.warning}`, ...args)
}

export function error(...args: string[]) {
  console.error(`${logSymbols.error}`, ...args)
}

export function skip(...args: string[]) {
  console.log(`${chalk.magenta('◇')}`, ...args)
}

export default {
  info,
  success,
  warn,
  error,
  skip,
}
