import makeFetch from 'make-fetch-happen'
import { join } from 'node:path/posix'
import { CLI_TMP_DIR } from '../constants'

const fetch = makeFetch.defaults({
  cachePath: join(CLI_TMP_DIR, 'cache'),
  noProxy: ['raw.githubusercontent.com'],
})

/**
 * Fetch a URL.
 *
 * @param url - The URL to fetch.
 * @returns The text response.
 */
export async function fetchURL(url: string) {
  const res = await fetch(url)
  return res.text()
}

/**
 * Fetch a JSON file.
 *
 * @param url - The URL to fetch.
 * @returns The JSON response.
 */
export async function fetchJSON<T>(url: string) {
  const res = await fetch(url)
  return res.json() as Promise<T>
}
