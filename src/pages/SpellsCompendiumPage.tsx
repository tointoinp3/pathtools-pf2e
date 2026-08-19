import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SpellBrowser } from '@/features/spells/components/SpellBrowser'
import { SpellEditor } from '@/features/spells/components/SpellEditor'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import {
  SPELL_CREATE_QUERY,
  createEmptyHomebrewSpell,
  spellKindFromQuery,
  type SpellCreateKind,
} from '@/features/spells/homebrewDefaults'
import { spellKind } from '@/features/spells/spellUi'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useSpellStore } from '@/stores/spellStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { ContentSource, Spell } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function SpellsCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    spells,
    loadAll,
    upsertSpell,
    removeSpell,
    duplicateSpell,
    getHomebrewById,
  } = useSpellStore()
  const {
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()

  const createKind = spellKindFromQuery(searchParams.get('criar'))
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    createKind ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Spell | null>(null)
  const [draftKind, setDraftKind] = useState<SpellCreateKind>('spell')

  useEffect(() => {
    void loadAll()
    void loadBackgrounds()
  }, [loadAll, loadBackgrounds])

  useEffect(() => {
    if (createKind) {
      setDraft(createEmptyHomebrewSpell(createKind))
      setDraftKind(createKind)
      setMode('create')
      return
    }
    if (editId) {
      const spell = getHomebrewById(editId)
      if (spell) {
        setDraft(structuredClone(spell))
        setDraftKind(spellKind(spell))
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [createKind, editId, getHomebrewById, setSearchParams, spells])

  const catalog = useMemo(
    () =>
      spells
        .map(withLocalizedSpell)
        .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt')),
    [spells],
  )

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: { spell: Spell; source: ContentSource }) {
    await upsertSource(payload.source)
    await upsertSpell(payload.spell)
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <SpellEditor
        initial={draft}
        createKind={draftKind}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeSpell(draft.id)
                closeEditor()
              }
            : undefined
        }
      />
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col p-5 animate-fade-up">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Compêndio — Magias
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Oficiais e homebrew: tradições (0–10), truques e magias de foco.
            Ritual é outra ficha — horas, perícia e custo, sem espaços. Filtre
            por posto, tradição, raridade, ação ou traço.
          </p>
        </div>
        <HomebrewJsonButtons kind="spells" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <SpellBrowser
          spells={catalog}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={(kind) =>
            setSearchParams({ criar: SPELL_CREATE_QUERY[kind] })
          }
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateSpell(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
