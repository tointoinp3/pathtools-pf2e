import { useRef } from 'react'
import type { CombatToken } from '@/types'
import { Button } from '@/components/ui/Button'
import { getCreatureById } from '@/engine/bestiaryCatalog'
import { useCombatStore } from '@/stores/combatStore'
import {
  deleteTokenImage,
  saveTokenImage,
} from '@/features/combat/combatImageRepository'
import { useTokenImage } from '@/features/combat/useTokenImage'

export function TokenImageControl({ token }: { token: CombatToken }) {
  const bumpImageVersion = useCombatStore((s) => s.bumpImageVersion)
  const { url, scope } = useTokenImage(token.id, token.creatureId)
  const inputRef = useRef<HTMLInputElement>(null)
  const pendingScopeRef = useRef<'token' | 'creature'>('token')
  const creature = getCreatureById(token.creatureId)

  function pick(scope: 'token' | 'creature') {
    pendingScopeRef.current = scope
    inputRef.current?.click()
  }

  async function handleFile(file: File | null | undefined) {
    if (!file) return
    const scope = pendingScopeRef.current
    const ownerId = scope === 'token' ? token.id : token.creatureId
    if (!ownerId) return
    await saveTokenImage(scope, ownerId, file)
    bumpImageVersion()
  }

  async function handleRemove() {
    if (scope === 'token') {
      await deleteTokenImage('token', token.id)
      bumpImageVersion()
      return
    }
    if (scope === 'creature' && token.creatureId) {
      const name = creature?.name ?? token.name
      if (
        window.confirm(
          `Remover a imagem de TODAS as fichas de "${name}" (inclusive em outros combates)?`,
        )
      ) {
        await deleteTokenImage('creature', token.creatureId)
        bumpImageVersion()
      }
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/*"
        className="hidden"
        onChange={(event) => {
          void handleFile(event.target.files?.[0])
          event.target.value = ''
        }}
      />

      <div className="flex items-start gap-2.5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2">
          {url ? (
            <img
              src={url}
              alt={token.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="px-1 text-center text-[9px] leading-tight text-text-dim">
              Sem imagem
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Button
            size="sm"
            className="w-full"
            onClick={() => pick('token')}
            title="A imagem vale só para esta ficha do tabuleiro"
          >
            Só esta ficha…
          </Button>
          {token.creatureId ? (
            <Button
              size="sm"
              className="w-full"
              onClick={() => pick('creature')}
              title="A imagem vale para todas as fichas desta criatura, aqui e em novos combates"
            >
              Todas as “{creature?.name ?? token.name}”…
            </Button>
          ) : null}
          {url ? (
            <Button
              size="sm"
              variant="ghost"
              className="w-full"
              onClick={() => void handleRemove()}
            >
              {scope === 'token' ? 'Remover desta ficha' : 'Remover de todas'}
            </Button>
          ) : null}
        </div>
      </div>
      {url ? (
        <p className="mt-1.5 text-[11px] text-text-dim">
          {scope === 'token'
            ? 'Imagem exclusiva desta ficha.'
            : `Imagem herdada de todas as “${creature?.name ?? token.name}”.`}
        </p>
      ) : null}
    </div>
  )
}
