import { resolve } from 'pathe'
import { afterEach, describe, expect, it } from 'vitest'
import { fs } from '../src/utils/fs'
import {
  appendRegistryItem,
  appendRegistryItemFiles,
  existsRegistryItem,
  existsRegistryItemFile,
  getRegistryInfo,
  getRegistryItem,
  listRegistries,
  loadRegistryConfig,
} from '../src/utils/schema/registry'

const cwd = resolve(__dirname, 'fixtures')

describe('registry schema', () => {
  afterEach(() => {
    fs.copy(
      './test/fixtures/registry.json',
      './test/fixtures/registry/test/registry.json',
    )
  })

  it('should list registries', async () => {
    expect(await listRegistries(cwd)).toMatchSnapshot()
  })

  it('should load registry config', () => {
    expect(loadRegistryConfig('test', cwd)).toMatchSnapshot()
  })

  it('should get registry info', () => {
    expect(getRegistryInfo('test', cwd)).toMatchSnapshot()
  })

  it('should get registry item', () => {
    expect(getRegistryItem('test', 'icon', cwd)).toMatchSnapshot()
  })

  it('should check registry item exists', () => {
    expect(existsRegistryItem('test', 'icon', cwd)).toBe(true)
    expect(existsRegistryItem('test', 'not-exists', cwd)).toBe(false)
  })

  it('should check registry item file exists', () => {
    expect(existsRegistryItemFile('test', 'icon', 'components/icon/icon.vue', cwd)).toBe(true)
    expect(existsRegistryItemFile('test', 'icon', 'components/icon/not-exists.vue', cwd)).toBe(false)
  })

  it('should append registry item', async () => {
    await appendRegistryItem('test', 'test', 'component', 'general', ['components/test/test.vue'], cwd)
    expect(loadRegistryConfig('test', cwd)).toMatchSnapshot()
  })

  it('should append registry item files', async () => {
    await appendRegistryItemFiles('test', 'icon', ['components/icon/icon-test.vue'], cwd)
    expect(loadRegistryConfig('test', cwd)).toMatchSnapshot()
  })
})
