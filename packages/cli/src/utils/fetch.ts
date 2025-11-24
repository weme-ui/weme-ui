import makeFetch from 'make-fetch-happen'
import { CLI_CACHE_DIR } from '../constants'

const fetch = makeFetch.defaults({
  cachePath: CLI_CACHE_DIR,
})

export async function fetchJSON<T>(url: string) {
  const res = await fetch(url)
  return res.json() as Promise<T>
}

export async function fetchURL<T extends string>(url: string) {
  const res = await fetch(url)
  return res.text() as Promise<T>
}

export async function fetchBinary(url: string) {
  const res = await fetch(url)
  return res.arrayBuffer() as Promise<ArrayBuffer>
}

export function getGithubRepoName(url: string) {
  return url
    .trim()
    .replace(/^https?:\/\/github.com\//, '')
    .replace(/\.git$/, '')
}
