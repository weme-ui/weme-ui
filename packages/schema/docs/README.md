# README

## Top-level Schemas

* [Project configuration](./config.md "Configuration for a Weme UI project") – `-`

* [Project lock file](./lockfile.md "Records which registry items have been installed into a Weme UI project, including their source registry and the exact files written on disk") – `-`

* [Registry configuration](./registry.md "Configuration for a Weme UI registry") – `-`

* [Registry manifest](./manifest.md "An index of registries available in a repository or workspace") – `-`

## Other Schemas

### Objects

* [Accent colors](./config-properties-unocss-extensions-properties-accent-colors.md "Accent (brand) color tokens for the project theme") – `undefined#/properties/unocss/properties/accent`

* [CSS variables](./config-properties-unocss-extensions-properties-css-variables.md "Additional CSS custom properties for the project theme") – `undefined#/properties/unocss/properties/cssVars`

* [CSS variables](./registry-properties-items-registry-item-properties-css-variables.md "CSS custom properties to inject when this item is installed") – `undefined#/properties/items/items/properties/cssVars`

* [Installed file](./lockfile-properties-items-installed-item-properties-files-installed-file.md "A single file recorded in the lock file: where it came from in the registry, and where it was installed in the project") – `undefined#/properties/items/items/properties/files/items`

* [Installed item](./lockfile-properties-items-installed-item.md "A registry item that has been installed into the project") – `undefined#/properties/items/items`

* [Metadata](./registry-properties-metadata.md "Arbitrary key-value metadata for tooling and discovery") – `undefined#/properties/meta`

* [Neutral colors](./config-properties-unocss-extensions-properties-neutral-colors.md "Neutral (gray-scale) color tokens for the project theme") – `undefined#/properties/unocss/properties/neutral`

* [Paths](./config-properties-paths.md "Maps registry item types to install destinations") – `undefined#/properties/paths`

* [Paths](./registry-properties-paths.md "Maps registry item types to install destinations") – `undefined#/properties/defaultPaths`

* [Registered registry](./config-properties-registries-registered-registry.md "A registry registered with the project") – `undefined#/properties/registries/items`

* [Registries](./manifest-properties-registries.md "A map of registered registry names to their directory paths on disk") – `undefined#/properties/registries`

* [Registry item](./registry-properties-items-registry-item.md "A single installable unit in a registry") – `undefined#/properties/items/items`

* [Registry item file](./registry-properties-items-registry-item-properties-files-registry-item-file.md "Describes a single file that belongs to a registry item, including its source path, optional install target, type, and kind") – `undefined#/properties/items/items/properties/files/items`

* [UnoCSS extensions](./config-properties-unocss-extensions.md "Project-level UnoCSS theme extensions") – `undefined#/properties/unocss`

* [Untitled object in Project configuration](./config-properties-unocss-extensions-properties-css-variables-additionalproperties.md) – `undefined#/properties/unocss/properties/cssVars/additionalProperties`

* [Untitled object in Registry configuration](./registry-properties-items-registry-item-properties-css-variables-additionalproperties.md) – `undefined#/properties/items/items/properties/cssVars/additionalProperties`

### Arrays

* [Contributors](./registry-properties-contributors.md "A list of people who have contributed to this registry") – `undefined#/properties/contributors`

* [Dependencies](./registry-properties-items-registry-item-properties-dependencies.md "NPM packages required at runtime by this item") – `undefined#/properties/items/items/properties/dependencies`

* [Dev dependencies](./registry-properties-items-registry-item-properties-dev-dependencies.md "NPM packages required only for developing or testing this item") – `undefined#/properties/items/items/properties/devDependencies`

* [Exclude](./registry-properties-exclude.md "A list of registry item names to omit from resolution or installation") – `undefined#/properties/exclude`

* [Files](./lockfile-properties-items-installed-item-properties-files.md "The files installed into the project for this item, each with its registry source path and project destination path") – `undefined#/properties/items/items/properties/files`

* [Files](./registry-properties-items-registry-item-properties-files.md "The files that make up this registry item") – `undefined#/properties/items/items/properties/files`

* [Items](./lockfile-properties-items.md "The registry items currently installed in the project") – `undefined#/properties/items`

* [Items](./registry-properties-items.md "The catalog of registry items published by this registry") – `undefined#/properties/items`

* [Registries](./config-properties-registries.md "Registries registered with this project") – `undefined#/properties/registries`

* [Registry dependencies](./registry-properties-items-registry-item-properties-registry-dependencies.md "Other registry items that must be installed alongside this one") – `undefined#/properties/items/items/properties/registryDependencies`

## Version Note

The schemas linked above follow the JSON Schema Spec version: `https://json-schema.org/draft-07/schema#`
