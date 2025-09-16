import { exit } from 'node:process'
import { createConsola } from 'consola'

export const consola = createConsola({
  formatOptions: {
    date: false,
  },
})

export async function confirm(
  prompt: string,
  cb: () => void,
  exitCode: boolean | number = 0,
) {
  const result = await consola.prompt(prompt, {
    type: 'confirm',
    initial: true,
    cancel: 'undefined',
  })

  if (result === undefined && exitCode !== false)
    exit(Number(exitCode))

  if (result)
    cb()
}

export async function textPrompt(
  prompt: string,
  placeholder?: string,
  exitCode: boolean | number = 0,
) {
  const answer = await consola.prompt(prompt, {
    type: 'text',
    placeholder,
    cancel: 'undefined',
  })

  if (answer === undefined && exitCode !== false)
    exit(Number(exitCode))

  return answer
}

export async function selectPrompt(
  prompt: string,
  options: Array<string | { label: string, value: string }>,
  exitCode: boolean | number = 0,
) {
  const answer = await consola.prompt(prompt, {
    type: 'select',
    options,
    cancel: 'undefined',
  })

  if (answer === undefined && exitCode !== false)
    exit(Number(exitCode))

  return answer
}
