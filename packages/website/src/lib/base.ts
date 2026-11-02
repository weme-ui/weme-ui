/**
 * Prefix a site-relative path with Astro `base`.
 * `import.meta.env.BASE_URL` may or may not include a trailing slash.
 */
export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}
