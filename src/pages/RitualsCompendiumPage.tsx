import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RitualBrowser } from '@/features/rituals/components/RitualBrowser'
import { RitualEditor } from '@/features/rituals/components/RitualEditor'
import { withLocalizedRitual } from '@/features/rituals/localizeRituals'
import {
  createEmptyHomebrewRitual,
  ritualKindFromQuery,
} from '@/features/rituals/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useRitualStore } from '@/stores/ritualStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { ContentSource, Ritual } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function RitualsCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    rituals,
    loadAll,
    upsertRitual,
    removeRitual,
    duplicateRitual,
    getHomebrewById,
  } = useRitualStore()
  const {
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()

  const creating = ritualKindFromQuery(searchParams.get('criar'))
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    creating ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Ritual | null>(null)

  useEffect(() => {
    void loadAll()
    void loadBackgrounds()
  }, [loadAll, loadBackgrounds])

  useEffect(() => {
    if (creating) {
      setDraft(createEmptyHomebrewRitual())
      setMode('create')
      return
    }
    if (editId) {
      const ritual = getHomebrewById(editId)
      if (ritual) {
        setDraft(structuredClone(ritual))
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [creating, editId, getHomebrewById, setSearchParams, rituals])

  const catalog = useMemo(
    () =>
      rituals
        .map(withLocalizedRitual)
        .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt')),
    [rituals],
  )

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: {
    ritual: Ritual
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    await upsertRitual(payload.ritual)
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <RitualEditor
        initial={draft}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeRitual(draft.id)
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
            Compêndio — Rituais
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Oficiais e homebrew (postos 1–10). Não usam tradição nem espaços de
            magia: o teste principal é de perícia. Magia de combate fica no
            Compêndio → Magias.
          </p>
        </div>
        <HomebrewJsonButtons kind="rituals" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <RitualBrowser
          rituals={catalog}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={() => setSearchParams({ criar: '1' })}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateRitual(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
