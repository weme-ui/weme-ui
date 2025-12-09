import makeFetch from 'make-fetch-happen'
import { CLI_CACHE_DIR } from '../constants'

const fetch = makeFetch.defaults({
  cachePath: CLI_CACHE_DIR,
})

/**
 * Fetch JSON from URL.
 */
export async function fetchJSON<T>(url: string) {
  const res = await fetch(url)
  return res.json() as Promise<T>
}

/**
 * Fetch text from URL.
 */
export async function fetchURL<T extends string>(url: string) {
  const res = await fetch(url)
  return res.text() as Promise<T>
}

/**
 * Fetch binary from URL.
 */
export async function fetchBinary(url: string) {
  const res = await fetch(url)
  return res.arrayBuffer() as Promise<ArrayBuffer>
}
