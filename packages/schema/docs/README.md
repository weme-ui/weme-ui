# README

## Top-level Schemas

* [Registry manifest](./manifest.md "仓库或 workspace 中可用 registry 的索引。将每个 registry 名称映射到包含其配置与 items 的目录。") – `-`

* [Registry 配置](./registry.md "Weme UI registry 的配置。声明标识、访问权限、默认安装路径，以及对外暴露的 items。") – `-`

* [项目配置](./config.md "Weme UI 项目配置。声明安装路径、已注册的 registries，以及可选的 UnoCSS 主题扩展。") – `-`

* [项目锁定文件](./lockfile.md "记录已安装进 Weme UI 项目的 registry items，包括来源 registry 以及磁盘上写入的具体文件。") – `-`

## Other Schemas

### Objects

* [CSS 变量](./config-properties-unocss-扩展-properties-css-变量.md "项目主题的额外 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。") – `undefined#/properties/unocss/properties/cssVars`

* [CSS 变量](./registry-properties-items-registry-item-properties-css-变量.md "安装该 item 时注入的 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。") – `undefined#/properties/items/items/properties/cssVars`

* [Registries](./manifest-properties-registries.md "已注册 registry 名称到磁盘目录路径的映射。键为 \"owner/registry\" 形式；值为各 registry 根目录的相对或绝对路径。") – `undefined#/properties/registries`

* [Registry item](./registry-properties-items-registry-item.md "registry 中的一个可安装单元。描述标识、类型、文件、CSS 变量，以及 NPM 与 registry 级依赖。") – `undefined#/properties/items/items`

* [Registry item 文件](./registry-properties-items-registry-item-properties-文件-registry-item-文件.md "描述属于某个 registry item 的单个文件，包括源路径、可选安装目标、type 与 kind。") – `undefined#/properties/items/items/properties/files/items`

* [UnoCSS 扩展](./config-properties-unocss-扩展.md "项目级 UnoCSS 主题扩展。用于自定义强调色、中性色，以及注入 UnoCSS preset 的额外 CSS 变量。") – `undefined#/properties/unocss`

* [Untitled object in Registry 配置](./registry-properties-items-registry-item-properties-css-变量-additionalproperties.md) – `undefined#/properties/items/items/properties/cssVars/additionalProperties`

* [Untitled object in 项目配置](./config-properties-unocss-扩展-properties-css-变量-additionalproperties.md) – `undefined#/properties/unocss/properties/cssVars/additionalProperties`

* [中性色](./config-properties-unocss-扩展-properties-中性色.md "项目主题的中性（灰阶）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。") – `undefined#/properties/unocss/properties/neutral`

* [元数据](./registry-properties-items-registry-item-properties-元数据.md "供工具链与文档使用的任意键值元数据。文档展示字段使用 \"docs") – `undefined#/properties/items/items/properties/meta`

* [已安装 item](./lockfile-properties-items-已安装-item.md "已安装进项目的 registry item。记录来源 registry 以及实际写入的文件。") – `undefined#/properties/items/items`

* [已安装文件](./lockfile-properties-items-已安装-item-properties-文件-已安装文件.md "锁定文件中记录的单个文件：来自 registry 的源路径，以及写入项目的目标路径。") – `undefined#/properties/items/items/properties/files/items`

* [已注册的 Registry](./config-properties-registries-已注册的-registry.md "已向项目注册的 registry。指明使用哪个 registry，以及可选的拉取来源与安装前缀。") – `undefined#/properties/registries/items`

* [强调色](./config-properties-unocss-扩展-properties-强调色.md "项目主题的强调（品牌）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。") – `undefined#/properties/unocss/properties/accent`

* [路径](./config-properties-路径.md "将 registry item 类型映射到安装目标路径。用 \"*\" 作为未显式配置类型的兜底。路径可使用别名，例如 \"~/components\"。") – `undefined#/properties/paths`

* [路径](./registry-properties-路径.md "将 registry item 类型映射到安装目标路径。用 \"*\" 作为未显式配置类型的兜底。路径可使用别名，例如 \"~/components\"。") – `undefined#/properties/defaultPaths`

### Arrays

* [Items](./lockfile-properties-items.md "当前已安装进项目的 registry items。用于在更新时追踪来源与已安装文件位置。") – `undefined#/properties/items`

* [Items](./registry-properties-items.md "该 registry 发布的 item 目录。每个 item 描述一个可安装单元，例如 component、block 或工具。") – `undefined#/properties/items`

* [Registries](./config-properties-registries.md "已向本项目注册的 registries。每项选择一个 registry，并可指定仓库来源与安装前缀。") – `undefined#/properties/registries`

* [Registry 依赖](./registry-properties-items-registry-item-properties-registry-依赖.md "必须与该 item 一并安装的其他 registry item。按同一或已解析 registry 内的 item 名称引用。") – `undefined#/properties/items/items/properties/registryDependencies`

* [依赖](./registry-properties-依赖.md "以该 registry 初始化消费方项目时默认安装的运行时 NPM 包。与 item 级依赖不同，这些依赖对整个 registry 只应用一次。条目可带版本范围或 tag，例如 \"vue^3") – `undefined#/properties/dependencies`

* [依赖](./registry-properties-items-registry-item-properties-依赖.md "该 item 运行时所需的 NPM 包。条目可带版本范围或 tag，例如 \"vue^3") – `undefined#/properties/items/items/properties/dependencies`

* [开发依赖](./registry-properties-开发依赖.md "以该 registry 初始化消费方项目时默认安装的开发用 NPM 包。适用于 registry 共享的工具链（例如测试辅助），而非应用运行时所需的包。条目可带版本范围或 tag。") – `undefined#/properties/devDependencies`

* [开发依赖](./registry-properties-items-registry-item-properties-开发依赖.md "仅用于开发或测试该 item 的 NPM 包，生产环境不需要。") – `undefined#/properties/items/items/properties/devDependencies`

* [排除](./registry-properties-排除.md "在解析或安装时忽略的 registry item 名称列表。适合临时隐藏未完成或已弃用的 item。") – `undefined#/properties/exclude`

* [文件](./lockfile-properties-items-已安装-item-properties-文件.md "为该 item 写入项目的文件列表，每项含 registry 源路径与项目目标路径。") – `undefined#/properties/items/items/properties/files`

* [文件](./registry-properties-items-registry-item-properties-文件.md "构成该 registry item 的文件列表。至少应列出主要源文件。") – `undefined#/properties/items/items/properties/files`

* [贡献者](./registry-properties-贡献者.md "参与该 registry 的贡献者列表。通常为姓名，可选附带邮箱。") – `undefined#/properties/contributors`

## Version Note

The schemas linked above follow the JSON Schema Spec version: `https://json-schema.org/draft-07/schema#`
