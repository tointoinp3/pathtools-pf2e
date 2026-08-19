import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DeityBrowser } from '@/features/deities/components/DeityBrowser'
import { DeityEditor } from '@/features/deities/components/DeityEditor'
import { withLocalizedDeity } from '@/features/deities/localizeDeities'
import {
  DEITY_CREATE_QUERY,
  createEmptyHomebrewDeity,
  deityKindFromQuery,
} from '@/features/deities/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useDeityStore } from '@/stores/deityStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { ContentSource, Deity, DeityKind } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function DeitiesCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    deities,
    loadAll,
    upsertDeity,
    removeDeity,
    duplicateDeity,
    getHomebrewById,
  } = useDeityStore()
  const {
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()

  const createKind = deityKindFromQuery(searchParams.get('criar'))
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    createKind ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Deity | null>(null)
  const [draftKind, setDraftKind] = useState<DeityKind>('deity')

  useEffect(() => {
    void loadAll()
    void loadBackgrounds()
  }, [loadAll, loadBackgrounds])

  useEffect(() => {
    if (createKind) {
      setDraft(createEmptyHomebrewDeity(createKind))
      setDraftKind(createKind)
      setMode('create')
      return
    }
    if (editId) {
      const deity = getHomebrewById(editId)
      if (deity) {
        setDraft(structuredClone(deity))
        setDraftKind(deity.kind)
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [createKind, editId, getHomebrewById, setSearchParams, deities])

  const catalog = useMemo(
    () => deities.map(withLocalizedDeity),
    [deities],
  )

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: { deity: Deity; source: ContentSource }) {
    await upsertSource(payload.source)
    await upsertDeity(payload.deity)
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <DeityEditor
        initial={draft}
        createKind={draftKind}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeDeity(draft.id)
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
            Compêndio — Divindades
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Oficiais e homebrew: deuses, panteões, filosofias e pactos. Na ficha,
            clérigo e campeão aplicam os benefícios; qualquer personagem pode
            venerar.
          </p>
        </div>
        <HomebrewJsonButtons kind="deities" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <DeityBrowser
          deities={catalog}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={(kind) =>
            setSearchParams({ criar: DEITY_CREATE_QUERY[kind] })
          }
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateDeity(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
