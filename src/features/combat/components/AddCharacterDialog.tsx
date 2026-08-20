import { useEffect, useState } from 'react'
import type { Character } from '@/types'
import { Button } from '@/components/ui/Button'
import { findFreeSpot, nextTokenName } from '@/engine/combat'
import {
  getPortraitByCharacter,
  listCharacters,
} from '@/features/characters/characterRepository'
import {
  buildCharacterToken,
  loadCharacterCatalogs,
} from '@/features/combat/characterImport'
import { saveTokenImage } from '@/features/combat/combatImageRepository'
import { useClassStore } from '@/stores/classStore'
import { useCombatStore } from '@/stores/combatStore'

export function AddCharacterDialog({ onClose }: { onClose: () => void }) {
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    void (async () => {
      await loadCharacterCatalogs()
      const list = await listCharacters()
      if (active) setCharacters(list)
    })()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleAdd(character: Character) {
    const store = useCombatStore.getState()
    const session = store.current
    if (!session) return
    const token = buildCharacterToken(
      character,
      nextTokenName(
        character.name || 'Jogador',
        session.tokens.map((t) => t.name),
      ),
      findFreeSpot(session.tokens, session.gridCols, session.gridRows, 1, 1),
    )
    store.addTokens([token])
    setFeedback(`${token.name} no tabuleiro.`)

    if (character.portraitId) {
      const portrait = await getPortraitByCharacter(character.id)
      if (portrait?.blob) {
        await saveTokenImage('token', token.id, portrait.blob)
        useCombatStore.getState().bumpImageVersion()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-character-title"
        className="flex max-h-[min(32rem,90vh)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <h2
            id="add-character-title"
            className="font-display text-lg font-semibold tracking-wide text-accent"
          >
            Adicionar jogadores
          </h2>
          {feedback ? (
            <p className="mt-1 text-[11px] text-success">{feedback}</p>
          ) : (
            <p className="mt-1 text-[11px] text-text-dim">
              PV, CA e percepção vêm da ficha; o retrato vira a imagem no grid.
            </p>
          )}
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto p-2">
          {characters === null ? (
            <li className="px-2 py-6 text-center text-sm text-text-dim">
              Carregando personagens…
            </li>
          ) : characters.length === 0 ? (
            <li className="px-2 py-6 text-center text-sm text-text-dim">
              Nenhum personagem salvo. Crie um em “Meus Personagens”.
            </li>
          ) : (
            characters.map((character) => {
              const className = character.classId
                ? (useClassStore.getState().getById(character.classId)?.name ??
                  null)
                : null
              return (
                <li key={character.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left hover:bg-surface-2"
                    onClick={() => void handleAdd(character)}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text">
                        {character.name || 'Sem nome'}
                      </span>
                      <span className="block truncate text-[11px] text-text-dim">
                        {className ?? 'Sem classe'}
                        {character.playerName
                          ? ` · ${character.playerName}`
                          : ''}
                      </span>
                    </span>
                    <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-text-muted">
                      Nv {character.level}
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>

        <div className="border-t border-border/70 px-4 py-3 text-right">
          <Button size="sm" variant="accent" onClick={onClose}>
            Concluir
          </Button>
        </div>
      </div>
    </div>
  )
}
