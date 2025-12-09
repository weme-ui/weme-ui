import type { IRemoteRepositoryURL, IRemoteURI } from '../../types'
import { parseURL } from 'ufo'

/**
 * Parse repository URL.
 *
 * - https://github.com/weme-ui/weme-ui
 * - https://github.com/weme-ui/weme-ui/tree/main
 */
export function parseRepositoryURL(url: string): IRemoteRepositoryURL {
  const {
    host = 'github.com',
    pathname,
  } = parseURL(url, 'https')

  const path = pathname.replace(/^\//, '').replace(/\/$/, '')
  const [
    name,
    branch = 'main',
  ] = path.split('tree').map(p => p.replace(/^\//, '').replace(/\/$/, ''))

  const [
    owner,
    repo,
  ] = name.split('/')

  return { host, name, owner, repo, branch } as IRemoteRepositoryURL
}

export function resolveGroupNameWithRepo(repo: IRemoteURI, ...args: string[]): string {
  const {
    owner,
  } = parseRepositoryURL(repo)

  return [owner, ...args].join('/')
}
