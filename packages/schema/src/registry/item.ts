import * as v from 'valibot'
import { CSSVariables, NonEmptyTrimmedString } from '../shared'

// ============================================================================
// Registry Item Schema
// ============================================================================

/**
 * 注册项类型
 *
 * @category Registry
 */
export const RegistryItemTypeEnum = v.pipe(
  v.picklist([
    'component',
    'composable',
    'ui',
    'block',
    'layout',
    'page',
    'util',
  ]),
  v.metadata({
    title: '注册项类型',
    description: 'registry item 的分类。决定如何归类该 item，以及解析文件时使用哪条默认安装路径。',
    examples: ['component', 'composable', 'ui', 'block', 'layout', 'page', 'util'],
  }),
)

/**
 * 注册项何时被安装，仅影响被动安装的情况
 *
 * @category Registry
 *
 * @default 'on-depended'
 */
export const RegistryItemWhenEnum = v.pipe(
  v.picklist([
    'on-init',
    'on-depended',
  ]),
  v.metadata({
    title: '安装时机',
    description: '控制被动（自动）安装时该 item 何时被安装。"on-init" 表示 registry 初始化后立即安装；"on-depended" 表示仅在其他 item 依赖它时才安装。不影响用户显式请求的安装。',
    examples: ['on-init', 'on-depended'],
  }),
)

/**
 * 注册项文件类型
 *
 * @category Registry
 *
 * @default 'file'
 */
export const RegistryItemFileKindEnum = v.pipe(
  v.picklist([
    'file',
    'doc',
    'example',
    'test',
  ]),
  v.metadata({
    title: '文件种类',
    description: '文件在 registry item 中的角色。"file" 为主源码；"doc"、"example"、"test" 分别标记配套文档、示例与测试。',
    examples: ['file', 'doc', 'example', 'test'],
  }),
)

/**
 * 注册项文件配置
 *
 * @category Registry
 */
export const RegistryItemFileSchema = v.pipe(
  v.object({
    /**
     * 注册项类型
     *
     * @default 'block'
     * @optional
     */
    type: v.optional(RegistryItemTypeEnum, 'block'),

    /**
     * 注册项文件类型
     *
     * @default 'file'
     * @optional
     */
    kind: v.optional(RegistryItemFileKindEnum, 'file'),

    /**
     * 注册项文件路径
     */
    path: v.pipe(
      NonEmptyTrimmedString,
      v.metadata({
        title: '源路径',
        description: '文件在 registry 包内的路径，相对于 registry 根目录。',
        examples: ['button/button.vue', 'use-toggle/index.ts'],
      }),
    ),

    /**
     * 注册项文件目标路径
     *
     * @optional
     */
    target: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '目标路径',
          description: '安装该 item 时文件应写入的目标路径。省略时根据 registry 默认路径与 item type 推导。',
          examples: ['components/ui/button.vue'],
        }),
      ),
    ),
  }),
  v.metadata({
    title: 'Registry item 文件',
    description: '描述属于某个 registry item 的单个文件，包括源路径、可选安装目标、type 与 kind。',
  }),
)

/**
 * 注册项配置
 *
 * @category Registry
 */
export const RegistryItemSchema = v.pipe(
  v.object({
    /**
     * 注册项名称
     */
    name: v.pipe(
      NonEmptyTrimmedString,
      v.toLowerCase(),
      v.metadata({
        title: '名称',
        description: 'registry item 在所属 registry 内的唯一标识，必须为小写。',
        examples: ['button', 'use-toggle'],
      }),
    ),

    /**
     * 注册项显示名称
     *
     * @optional
     */
    title: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '显示名称',
          description: '用于界面与文档展示的友好名称；省略时回退为 name。',
          examples: ['Button', 'Use Toggle'],
        }),
      ),
    ),

    /**
     * 注册项描述
     *
     * @optional
     */
    description: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '描述',
          description: '对该 registry item 能力的简短说明，便于发现与文档展示。',
          examples: ['支持多种变体的通用按钮 component。'],
        }),
      ),
    ),

    /**
     * 注册项类型
     *
     * @default 'block'
     * @optional
     */
    type: v.optional(
      v.pipe(
        RegistryItemTypeEnum,
        v.metadata({
          title: '类型',
          description: '该 registry item 的分类。省略时默认为 "block"。用于归类，并选择对应的默认安装路径。',
          examples: ['block', 'component', 'composable', 'ui', 'layout', 'page', 'util'],
        }),
      ),
      'block',
    ),

    /**
     * 注册项何时被安装
     *
     * @default 'on-depended'
     * @optional
     */
    when: v.optional(
      v.pipe(
        RegistryItemWhenEnum,
        v.metadata({
          title: '安装时机',
          description: '控制被动（自动）安装时该 item 何时被安装。"on-init" 表示 registry 初始化后立即安装；"on-depended" 表示仅在其他 item 依赖它时才安装。显式安装不受影响。',
          examples: ['on-init', 'on-depended'],
        }),
      ),
      'on-depended',
    ),

    /**
     * 注册项文件清单
     */
    files: v.pipe(
      v.array(RegistryItemFileSchema),
      v.metadata({
        title: '文件',
        description: '构成该 registry item 的文件列表。至少应列出主要源文件。',
        examples: [{ path: 'button/button.vue' }],
      }),
    ),

    /**
     * 注册项待注入 CSS 变量，将注入至 UnoCSS Preset Options 中
     *
     * @optional
     */
    cssVars: v.optional(
      v.pipe(
        CSSVariables,
        v.metadata({
          title: 'CSS 变量',
          description: '安装该 item 时注入的 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。',
          examples: [{ theme: { 'color-primary': 'oklch(0.55 0.2 250)' } }],
        }),
      ),
    ),

    /**
     * 注册项 NPM 依赖项
     *
     * @optional
     */
    dependencies: v.optional(
      v.pipe(
        v.array(v.pipe(NonEmptyTrimmedString, v.toLowerCase())),
        v.metadata({
          title: '依赖',
          description: '该 item 运行时所需的 NPM 包。条目可带版本范围或 tag，例如 "vue^3.0.0" 或 "lodash@latest"。',
          examples: ['vue^3.4.0', 'class-variance-authority@latest'],
        }),
      ),
    ),

    /**
     * 注册项 NPM 开发依赖项
     *
     * @optional
     */
    devDependencies: v.optional(
      v.pipe(
        v.array(v.pipe(NonEmptyTrimmedString, v.toLowerCase())),
        v.metadata({
          title: '开发依赖',
          description: '仅用于开发或测试该 item 的 NPM 包，生产环境不需要。',
          examples: ['vitest^2.0.0', '@vue/test-utils@latest'],
        }),
      ),
    ),

    /**
     * 注册项依赖的注册项
     *
     * @optional
     */
    registryDependencies: v.optional(
      v.pipe(
        v.array(v.pipe(NonEmptyTrimmedString, v.toLowerCase())),
        v.metadata({
          title: 'Registry 依赖',
          description: '必须与该 item 一并安装的其他 registry item。按同一或已解析 registry 内的 item 名称引用。',
          examples: ['button', 'utils'],
        }),
      ),
    ),

    /**
     * 注册项元数据
     *
     * @optional
     */
    meta: v.optional(
      v.pipe(
        v.record(NonEmptyTrimmedString, NonEmptyTrimmedString),
        v.metadata({
          title: '元数据',
          description: '供工具链与文档使用的任意键值元数据。文档展示字段使用 "docs.*" 命名空间，例如 "docs.category" 与 "docs.categoryLabel"。',
          examples: [{
            'docs.category': 'actions',
            'docs.categoryLabel': 'Actions',
          }],
        }),
      ),
    ),
  }),
  v.metadata({
    title: 'Registry item',
    description: 'registry 中的一个可安装单元。描述标识、类型、文件、CSS 变量，以及 NPM 与 registry 级依赖。',
    examples: [{
      name: 'button',
      title: 'Button',
      description: '支持多种变体的通用按钮 component。',
      type: 'component',
      files: [{ path: 'button/button.vue' }],
      registryDependencies: ['utils'],
      meta: {
        'docs.category': 'actions',
        'docs.categoryLabel': 'Actions',
      },
    }],
  }),
)
