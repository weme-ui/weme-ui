import { isAbsolute, resolve } from 'pathe'
import { download } from './download'

export async function resolveCommandArgs(
  args: Record<string, any>,
  fn?: ((args: Record<string, any>) => void),
) {
  if (args.cwd && !isAbsolute(args.cwd))
    args.cwd = resolve(args.cwd)

  if (args.template) {
    args.resolve = args.resolve || {}
    args.resolve.template = await download(args.template)
  }

  if (args.repo) {
    args.resolve = args.resolve || {}
    args.resolve.repo = await download(args.repo)
  }

  if (fn)
    fn(args)
}
