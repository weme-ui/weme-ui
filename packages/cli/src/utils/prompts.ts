import ora from 'ora'

export async function runStep<T>(
  loading: string,
  fn: (spinner: ReturnType<typeof ora>) => Promise<T>,
): Promise<T> {
  const spinner = ora(loading).start()

  return fn(spinner).finally(() => {
    spinner.stop()
  })
}
