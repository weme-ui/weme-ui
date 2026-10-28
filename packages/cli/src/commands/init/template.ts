import { existsSync } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path/posix'
import { x } from 'tinyexec'
import { glob } from 'tinyglobby'
import { CLI_TMP_DIR } from '../../constants'
import { ensureDir, existsFile } from '../../utils'

/**
 * Initialize the project template.
 *
 * @param cwd - The current working directory.
 * @param template - The template to initialize.
 * @throws If the template is not found.
 */
export async function initProjectTemplate(cwd: string, template: string = 'vite') {
  const templatePath = join(cwd, CLI_TMP_DIR, 'repository', 'templates', template)

  if (!existsSync(templatePath)) {
    throw new Error(`Template ${template} not found`)
  }

  const files = await glob('**', { cwd: templatePath, onlyFiles: true })

  for (const file of files) {
    const filePath = join(cwd, file)
    const fileDir = dirname(filePath)

    if (!existsSync(fileDir)) {
      ensureDir(fileDir)
    }

    if (!await existsFile(cwd, file)) {
      await copyFile(join(templatePath, file), filePath)
    }
  }

  // Clean the template repository finally.
  await cleanTemplateRepository(cwd)
}

/**
 * Clone the template repository.
 *
 * @returns The result of the clone operation.
 * @throws If the clone operation fails.
 */
export async function cloneTemplateRepository(cwd: string) {
  const repositoryPath = join(cwd, CLI_TMP_DIR, 'repository')

  await cleanTemplateRepository(cwd)

  const result = await x('git', ['clone', '--depth', '1', 'https://github.com/weme-ui/weme-ui.git', repositoryPath])

  if (result.exitCode !== 0) {
    throw new Error(`Failed to clone template repository: ${result.stderr}`)
  }

  return result.stdout
}

/**
 * Clean the template repository.
 *
 * @param cwd - The current working directory.
 * @returns The result of the clean operation.
 * @throws If the clean operation fails.
 */
export async function cleanTemplateRepository(cwd: string) {
  const repositoryPath = join(cwd, CLI_TMP_DIR, 'repository')

  if (existsSync(repositoryPath)) {
    await x('rm', ['-rf', repositoryPath])
  }
}
