import { existsSync, mkdirSync } from 'node:fs'
import fs from 'node:fs/promises'
import { join, resolve } from 'node:path/posix'
import { cwd, exit } from 'node:process'

/**
 * Ensure the working directory.
 *
 * @param path - The working directory to ensure.
 * @returns The ensured working directory. If the directory does not exist, it will be created.
 */
export function ensureDir(path: string) {
  if (path === cwd()) {
    return path
  }

  const resolved = resolve(path)

  if (!existsSync(resolved)) {
    mkdirSync(resolved, { recursive: true })
  }

  return resolved
}

/**
 * Check if a file exists.
 *
 * @param root - The root directory of the project.
 * @param filename - The name of the file.
 * @returns Whether the file exists.
 */
export async function existsFile(root: string, filename: string) {
  const filePath = resolve(root, filename)
  const exists = existsSync(filePath)

  if (!exists)
    return false

  const content = await fs.readFile(filePath, 'utf-8')

  return exists && content !== null && content.trim() !== ''
}

/**
 * Read a file.
 *
 * @param root - The root directory of the project.
 * @param filename - The name of the file.
 * @returns The content of the file. If the file does not exist, it will return `null`.
 */
export async function readFile(root: string, filename: string) {
  try {
    if (!(await existsFile(root, filename)))
      return null

    const content = await fs.readFile(join(ensureDir(root), filename), 'utf-8')

    if (!content)
      return null

    return content
  }
  catch {
    return null
  }
}

/**
 * Write a file.
 *
 * @param root - The root directory of the project.
 * @param filename - The name of the file.
 * @param content - The content of the file.
 * @returns Whether the file was written successfully.
 */
export async function writeFile(root: string, filename: string, content: string) {
  try {
    const path = join(ensureDir(root), filename)
    await fs.writeFile(path, `${content}\n`, { encoding: 'utf-8', flag: 'w' })
  }
  catch {
    return false
  }

  return true
}

/**
 * Remove the trailing slash from a path.
 *
 * @param path - The path to remove the trailing slash from.
 * @returns The path without the trailing slash.
 */
export function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, '')
}

/**
 * Unwrap an error.
 *
 * @param error - The error to unwrap.
 * @returns The unwrapped error.
 */
export function unwrapError(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error'
}

/**
 * Call a callback when a condition is met.
 *
 * @param condition - The condition to check.
 * @param callback - The callback to call.
 * @param finalizer - The finalizer to call.
 * @returns Whether the callback was called successfully.
 */
export async function callWhen<T>(
  condition: boolean,
  callback: () => Promise<T>,
  finalizer?: () => Promise<void>,
) {
  if (condition) {
    try {
      await callback()
    }
    catch (e) {
      console.error(unwrapError(e))
      exit(1)
    }
    finally {
      if (finalizer) {
        await finalizer()
      }
    }
  }
}
