/** Baixa um objeto como arquivo .json no navegador. */
export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], {
    type: 'application/json;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.json') ? filename : `${filename}.json`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
}

/** Baixa um Blob (PNG, etc.) com o nome pedido. */
export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
}

export function jsonFormatOf(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null
  const format = (data as { format?: unknown }).format
  return typeof format === 'string' ? format : null
}

async function parseJsonFile(file: File): Promise<unknown> {
  let text: string
  try {
    text = await file.text()
  } catch {
    throw new Error(`Não foi possível ler “${file.name}”.`)
  }
  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new Error(`“${file.name}” não é um JSON válido.`)
  }
}

/**
 * Abre o seletor de arquivo (vários .json de uma vez).
 * `null` = o usuário cancelou.
 */
export function pickJsonFiles(): Promise<unknown[] | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.multiple = true
    input.addEventListener('change', () => {
      const files = Array.from(input.files ?? [])
      if (files.length === 0) {
        resolve(null)
        return
      }
      void Promise.all(files.map(parseJsonFile)).then(resolve).catch(reject)
    })
    input.addEventListener('cancel', () => resolve(null))
    input.click()
  })
}

/**
 * Abre o seletor de arquivo e devolve o JSON parseado.
 * `null` = o usuário cancelou.
 */
export async function pickJsonFile(): Promise<unknown | null> {
  const files = await pickJsonFiles()
  if (files == null || files.length === 0) return null
  return files[0] ?? null
}

/** Nome de arquivo seguro a partir de um rótulo (classe, personagem…). */
export function fileSlug(value: string, fallback = 'homebrew'): string {
  const slug = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  return slug || fallback
}

export function dateStamp(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
