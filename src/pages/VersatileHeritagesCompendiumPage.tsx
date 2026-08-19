import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { VersatileHeritageBrowser } from '@/features/ancestries/components/VersatileHeritageBrowser'
import { HeritageEditor } from '@/features/ancestries/components/HeritageEditor'
import { createEmptyHomebrewHeritage } from '@/features/ancestries/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useFeatStore } from '@/stores/featStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { ContentSource, Heritage } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function VersatileHeritagesCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    ancestries,
    heritages,
    loadAll: loadAncestries,
    upsertHeritage,
    removeHeritage,
    duplicateHeritage,
    getHeritageById,
  } = useAncestryStore()
  const {
    sources,
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()
  const { feats, loadAll: loadFeats } = useFeatStore()

  const creating = searchParams.get('criar') === '1'
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    creating ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Heritage | null>(null)

  useEffect(() => {
    void loadAncestries()
    void loadBackgrounds()
    void loadFeats()
  }, [loadAncestries, loadBackgrounds, loadFeats])

  useEffect(() => {
    if (creating) {
      setDraft(createEmptyHomebrewHeritage(null))
      setMode('create')
      return
    }
    if (editId) {
      const heritage = getHeritageById(editId)
      if (heritage && heritage.provenance.type === 'homebrew') {
        setDraft(structuredClone(heritage))
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [creating, editId, getHeritageById, setSearchParams, heritages])

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(heritage: Heritage, source: ContentSource) {
    await upsertSource(source)
    await upsertHeritage({
      ...heritage,
      isVersatile: true,
      ancestryId: null,
    })
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <HeritageEditor
        initial={draft}
        ancestries={ancestries}
        initialSource={source}
        lockTarget
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeHeritage(draft.id)
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
            Compêndio — Heranças Versáteis
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Aiuvarin, geniekin, beastkin e as outras heranças que encaixam em
            quase qualquer ancestralidade — oficiais e as que você inventar.
          </p>
        </div>
        <HomebrewJsonButtons kind="versatileHeritages" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <VersatileHeritageBrowser
          heritages={heritages}
          ancestries={ancestries}
          sources={sources}
          feats={feats}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={() => setSearchParams({ criar: '1' })}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateHeritage(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
