/** Geração de identificadores e carimbos de data usados na persistência. */

export function createId(prefix?: string): string {
  const id = crypto.randomUUID()
  return prefix ? `${prefix}-${id}` : id
}

export function nowIso(): string {
  return new Date().toISOString()
}
