import { existsSync } from 'node:fs'
import { exit } from 'node:process'
import createDebugger from 'debug'
import { downloadTemplate } from 'giget'
import { isAbsolute, resolve } from 'pathe'
import { CACHE_PATH } from '../constants'
import { consola } from './consola'
import { fs } from './fs'

interface History {
  repo: string
  path: string
  timestamp: number
}

const histories: History[] = []
const debug = createDebugger('download')

export async function download(repo: string) {
  const url = resolveRepoUrl(repo)

  if (isAbsolute(url) && existsSync(url))
    return url

  const cached = getHistory(repo)

  if (cached.timestamp > 0 && existsSync(cached.path))
    return cached.path

  try {
    consola.start('Downloading `%s`...', repo)

    const dest = url.slice(url.lastIndexOf(':') + 1, url.length).replace(/\//g, '-')

    const result = await downloadTemplate(url, {
      cwd: CACHE_PATH,
      dir: dest,
      force: true,
    })

    consola.success('Downloaded `%s` to `%s`', repo, result.dir)

    updateHistory({
      repo,
      path: result.dir,
      timestamp: Date.now(),
    })

    return result.dir
  }
  catch (e: any) {
    consola.error(e.message)
    exit(1)
  }
}

function getHistory(repo: string): History {
  if (histories.length === 0) {
    histories.push(...(fs.readJson<History[]>('history.json', CACHE_PATH) || []))
    debug('history', 'init', histories)
  }

  const history = histories.find(
    h => h.repo === repo
      && h.timestamp > Date.now() - 60 * 60 * 1000,
  )

  debug('history', 'get', history)

  return history || {
    repo,
    path: '',
    timestamp: 0,
  }
}

function updateHistory(history: History) {
  const index = histories.findIndex(h => h.repo === history.repo)

  if (index > -1) {
    histories[index] = history
    debug('history', 'update', history)
  }
  else {
    histories.push(history)
    debug('history', 'add', history)
  }

  fs.write({
    path: 'history.json',
    content: JSON.stringify(histories, null, 2),
    cwd: CACHE_PATH,
    force: true,
  })
}

function resolveRepoUrl(repo: string) {
  if (repo.startsWith('http') || repo.startsWith('@')) {
    const aliases = {
      '@': 'gh:',
      'https://github.com/': 'gh:',
    }

    let alias = repo

    Object.entries(aliases)
      .forEach(([key, value]) => {
        if (repo.startsWith(key))
          alias = repo.replace(key, value)
      })

    return alias
  }

  if (repo.includes(':'))
    return repo

  return resolve(repo)
}
