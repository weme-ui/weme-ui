import makeFetch from 'make-fetch-happen'
import { CLI_BASE_DIR } from '../constants'

const fetch = makeFetch.defaults({
  cachePath: CLI_BASE_DIR,
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

/**
 * Fetch a binary file.
 *
 * @param url - The URL to fetch.
 * @returns The binary response.
 */
export async function fetchBinary(url: string) {
  const res = await fetch(url)
  return res.arrayBuffer()
}
