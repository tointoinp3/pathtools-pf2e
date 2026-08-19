/**
 * Resolve, para o runner nativo do Node (`node --test`), as duas coisas que
 * o Vite resolve sozinho no app:
 *
 * 1. o alias `@/` apontando para `src/`;
 * 2. imports relativos sem extensão (`./lootTreasure`).
 *
 * Sem isso os módulos de `src/engine` não carregam fora do bundler.
 */
import { registerHooks } from 'node:module'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { statSync } from 'node:fs'
import path from 'node:path'

const srcDir = path.resolve(import.meta.dirname, '..', 'src')

function isFile(file) {
  try {
    return statSync(file).isFile()
  } catch {
    return false
  }
}

/** Tenta o caminho como está, com extensão e como pasta com index. */
function firstExisting(base) {
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ]
  const hit = candidates.find(isFile)
  return hit ? pathToFileURL(hit).href : null
}

function resolveAlias(specifier) {
  return firstExisting(path.join(srcDir, specifier.slice(2)))
}

function resolveRelative(specifier, parentURL) {
  if (!parentURL?.startsWith('file:')) return null
  const parentDir = path.dirname(fileURLToPath(parentURL))
  return firstExisting(path.resolve(parentDir, specifier))
}

registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) {
      const url = resolveAlias(specifier)
      if (url) return { url, shortCircuit: true }
    }
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
      const url = resolveRelative(specifier, context.parentURL)
      if (url) return { url, shortCircuit: true }
    }
    return next(specifier, context)
  },
})
