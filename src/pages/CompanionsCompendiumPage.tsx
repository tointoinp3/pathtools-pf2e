import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompanionBrowser } from '@/features/companions/components/CompanionBrowser'
import { CompanionTypeEditor } from '@/features/companions/components/CompanionTypeEditor'
import {
  COMPANION_CREATE_QUERY,
  companionKindFromQuery,
  createEmptyHomebrewCompanion,
} from '@/features/companions/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useCompanionStore } from '@/stores/companionStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { CompanionCatalogKind, HomebrewCompanionRecord } from '@/types'
import type { ContentSource } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function CompanionsCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    animals,
    eidolons,
    forms,
    specifics,
    loadAll,
    upsertCompanion,
    removeCompanion,
    duplicateCompanion,
    getHomebrewById,
  } = useCompanionStore()
  const {
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()

  const createKind = companionKindFromQuery(searchParams.get('criar'))
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    createKind ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<HomebrewCompanionRecord | null>(null)

  useEffect(() => {
    void loadAll()
    void loadBackgrounds()
  }, [loadAll, loadBackgrounds])

  useEffect(() => {
    if (createKind) {
      setDraft(createEmptyHomebrewCompanion(createKind))
      setMode('create')
      return
    }
    if (editId) {
      const record = getHomebrewById(editId)
      if (record) {
        setDraft(structuredClone(record))
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [createKind, editId, getHomebrewById, setSearchParams, animals, eidolons, forms, specifics])

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  function openCreate(kind: CompanionCatalogKind) {
    setSearchParams({ criar: COMPANION_CREATE_QUERY[kind] })
  }

  async function handleSave(payload: {
    record: HomebrewCompanionRecord
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    await upsertCompanion(payload.record)
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <CompanionTypeEditor
        initial={draft}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeCompanion(draft.id)
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
            Compêndio — Companheiros
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Oficiais e homebrew. Na ficha, o tipo escolhido na aba Companheiros
            usa este catálogo — PV, CA e avanço saem do motor.
          </p>
        </div>
        <HomebrewJsonButtons kind="companions" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <CompanionBrowser
          animals={animals}
          eidolons={eidolons}
          forms={forms}
          specifics={specifics}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={openCreate}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateCompanion(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
