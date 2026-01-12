export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined
}

export type GetStyleProps<Props, Key extends string> = Props extends Record<string, any>
  ? Props[Key]
  : never
