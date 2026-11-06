export const DIR_TOKEN = 'YOUR_WORKSHOP_DIR'

export function normalizeWorkshopDir(raw: string) {
  return String(raw || '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/[\\/]+$/, '')
}

export function quoteDirForFence(dir: string, fence?: string) {
  if (!dir || !/[\s"'`$]/.test(dir)) return dir
  const kind = (fence || '').toLowerCase()
  if (kind === 'powershell' || kind === 'ps1') return `'${dir.replace(/'/g, "''")}'`
  return `'${dir.replace(/'/g, `'\\''`)}'`
}

export function substituteDir(template: string, dir: string, fence?: string) {
  if (!dir) return template
  return template.split(DIR_TOKEN).join(quoteDirForFence(dir, fence))
}
