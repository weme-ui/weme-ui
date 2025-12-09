import type { IRegistryItem, IRegistryItemFile, IRegistryName } from '@weme-ui/schema'

export type IRemoteURI = `http${string}`
export type ILocalURI = `${string}`

export type IProjectGroupedItems = Record<string, IProjectResolvedItem[]>

export interface IProjectResolvedItem extends IProjectNormalizedItem {
  type: IRegistryItem['type']
  dependencies?: IRegistryItem['dependencies']
  devDependencies?: IRegistryItem['devDependencies']
  registryDependencies?: IRegistryItem['registryDependencies']
  cssVars?: IRegistryItem['cssVars']
  files: IProjectResolvedItemFile[]
}

export interface IProjectResolvedItemFile {
  type: IRegistryItemFile['type']
  path: string
  target: string
  hash: string
  content: string
}

export interface IProjectNormalizedItem {
  name: string
  repo: IRemoteURI
  registry: IRegistryName
  prefix: string
}

export interface IRemoteRepositoryURL {
  host: string
  name: IRegistryName
  owner: string
  repo: string
  branch: string
}
