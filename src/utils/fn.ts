/** Helpers genéricos de função e número (sem relação com domínio PF2e). */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
): ((...args: Parameters<T>) => void) & {
  cancel: () => void
  /** Executa agora o que estiver pendente (ex.: salvar antes de desmontar) */
  flush: () => void
} {
  let timer: ReturnType<typeof setTimeout> | null = null
  let pendingArgs: Parameters<T> | null = null

  const wrapped = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    pendingArgs = args
    timer = setTimeout(() => {
      timer = null
      pendingArgs = null
      fn(...args)
    }, waitMs)
  }

  wrapped.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
    pendingArgs = null
  }

  wrapped.flush = () => {
    if (!timer) return
    clearTimeout(timer)
    timer = null
    const args = pendingArgs
    pendingArgs = null
    if (args) fn(...args)
  }

  return wrapped
}
