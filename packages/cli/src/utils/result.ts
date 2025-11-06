type ResultOptions<T, E> = { ok: true, value: T } | { ok: false, error: E }

class Result<T, E> {
  private readonly result: ResultOptions<T, E>

  constructor(result: ResultOptions<T, E>) {
    this.result = result
  }

  match<A, B = A>(success: (value: T) => A, error: (error: E) => B) {
    return this.result.ok
      ? success(this.result.value)
      : error(this.result.error)
  }

  map<A>(fn: (value: T) => A) {
    return this.match(
      value => Ok(fn(value)),
      error => Err(error),
    )
  }

  unwrap(): T {
    return this.match(
      value => value,
      () => {
        throw new Error('Called `.unwrap()` on a non `Ok` value.')
      },
    )
  }

  unwrapErr(): E {
    return this.match(
      () => {
        throw new Error('Called `.unwrapErr()` on a non `Err` value.')
      },
      error => error,
    )
  }

  expect(message: string) {
    return this.match(
      value => value,
      () => {
        throw new Error(message)
      },
    )
  }

  expectErr(message: string) {
    return this.match(
      () => {
        throw new Error(message)
      },
      error => error,
    )
  }

  isOk() {
    return this.match(
      () => true,
      () => false,
    )
  }

  isErr() {
    return this.match(
      () => false,
      () => true,
    )
  }
}

export function Ok<T>(value: T) {
  return new Result<T, never>({ ok: true, value })
}

export function Err<E>(error: E) {
  return new Result<never, E>({ ok: false, error })
}

export type { Result }
