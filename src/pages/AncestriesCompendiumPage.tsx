import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AncestryBrowser } from '@/features/ancestries/components/AncestryBrowser'
import { AncestryEditor } from '@/features/ancestries/components/AncestryEditor'
import { HeritageEditor } from '@/features/ancestries/components/HeritageEditor'
import {
  createEmptyHomebrewAncestry,
  createEmptyHomebrewHeritage,
} from '@/features/ancestries/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useFeatStore } from '@/stores/featStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { Ancestry, ContentSource, Feat, Heritage } from '@/types'

type Mode = 'browse' | 'createAncestry' | 'editAncestry' | 'createHeritage' | 'editHeritage'

export function AncestriesCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    ancestries,
    heritages,
    loadAll: loadAncestries,
    upsertAncestry,
    upsertHeritage,
    removeAncestry,
    removeHeritage,
    duplicateAncestry,
    duplicateHeritage,
    getAncestryById,
    getHeritageById,
  } = useAncestryStore()
  const {
    sources,
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()
  const { feats, loadAll: loadFeats, upsertFeat, removeFeat } = useFeatStore()

  const creatingAncestry = searchParams.get('criar') === '1'
  const creatingHeritage = searchParams.get('criar') === 'heranca'
  const editId = searchParams.get('edit')
  const editHeritageId = searchParams.get('editHeritage')
  const ancestryForHeritage = searchParams.get('ancestry')

  const [mode, setMode] = useState<Mode>('browse')
  const [ancestryDraft, setAncestryDraft] = useState<Ancestry | null>(null)
  const [heritageDraft, setHeritageDraft] = useState<Heritage | null>(null)
  const [nestedHeritages, setNestedHeritages] = useState<Heritage[]>([])
  const [nestedFeats, setNestedFeats] = useState<Feat[]>([])

  useEffect(() => {
    void loadAncestries()
    void loadBackgrounds()
    void loadFeats()
  }, [loadAncestries, loadBackgrounds, loadFeats])

  useEffect(() => {
    if (creatingAncestry) {
      setAncestryDraft(createEmptyHomebrewAncestry())
      setNestedHeritages([])
      setNestedFeats([])
      setHeritageDraft(null)
      setMode('createAncestry')
      return
    }
    if (creatingHeritage) {
      setHeritageDraft(createEmptyHomebrewHeritage(ancestryForHeritage))
      setAncestryDraft(null)
      setMode('createHeritage')
      return
    }
    if (editId) {
      const ancestry = getAncestryById(editId)
      if (ancestry && ancestry.provenance.type === 'homebrew') {
        setAncestryDraft(structuredClone(ancestry))
        setNestedHeritages(
          heritages.filter(
            (h) => h.ancestryId === ancestry.id && !h.isVersatile,
          ),
        )
        setNestedFeats(
          feats.filter(
            (f) => f.ancestryId === ancestry.id && f.provenance.type === 'homebrew',
          ),
        )
        setHeritageDraft(null)
        setMode('editAncestry')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    if (editHeritageId) {
      const heritage = getHeritageById(editHeritageId)
      if (heritage && heritage.provenance.type === 'homebrew') {
        setHeritageDraft(structuredClone(heritage))
        setAncestryDraft(null)
        setMode('editHeritage')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setAncestryDraft(null)
    setHeritageDraft(null)
    setNestedHeritages([])
    setNestedFeats([])
  }, [
    creatingAncestry,
    creatingHeritage,
    editId,
    editHeritageId,
    ancestryForHeritage,
    getAncestryById,
    getHeritageById,
    heritages,
    feats,
    setSearchParams,
    ancestries,
  ])

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSaveAncestry(payload: {
    ancestry: Ancestry
    heritages: Heritage[]
    feats: Feat[]
    removedHeritageIds: string[]
    removedFeatIds: string[]
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    for (const heritage of payload.heritages) {
      await upsertHeritage(heritage)
    }
    await upsertAncestry(payload.ancestry)
    for (const feat of payload.feats) {
      await upsertFeat(feat)
    }
    for (const id of payload.removedHeritageIds) {
      await removeHeritage(id)
    }
    for (const id of payload.removedFeatIds) {
      await removeFeat(id)
    }
    closeEditor()
  }

  async function handleSaveHeritage(heritage: Heritage, source: ContentSource) {
    await upsertSource(source)
    await upsertHeritage(heritage)
    closeEditor()
  }

  if (mode === 'createAncestry' || mode === 'editAncestry') {
    if (!ancestryDraft) return null
    const source = ancestryDraft.sourceId
      ? getSourceById(ancestryDraft.sourceId)
      : null
    return (
      <AncestryEditor
        initial={ancestryDraft}
        initialHeritages={nestedHeritages}
        initialFeats={nestedFeats}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSaveAncestry}
        onDelete={
          mode === 'editAncestry'
            ? async () => {
                await removeAncestry(ancestryDraft.id)
                closeEditor()
              }
            : undefined
        }
      />
    )
  }

  if (mode === 'createHeritage' || mode === 'editHeritage') {
    if (!heritageDraft) return null
    const source = heritageDraft.sourceId
      ? getSourceById(heritageDraft.sourceId)
      : null
    return (
      <HeritageEditor
        initial={heritageDraft}
        ancestries={ancestries}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSaveHeritage}
        onDelete={
          mode === 'editHeritage'
            ? async () => {
                await removeHeritage(heritageDraft.id)
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
            Compêndio — Ancestralidades
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Conteúdo oficial e homebrew no mesmo sistema. Consulte, duplique uma
            oficial ou invente um povo — a aplicação à ficha fica no editor do
            personagem.
          </p>
        </div>
        <HomebrewJsonButtons kind="ancestries" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <AncestryBrowser
          ancestries={ancestries}
          heritages={heritages}
          sources={sources}
          feats={feats}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={() => setSearchParams({ criar: '1' })}
          onCreateHeritage={(ancestryId) => {
            const next: Record<string, string> = { criar: 'heranca' }
            if (ancestryId) next.ancestry = ancestryId
            setSearchParams(next)
          }}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onEditHeritage={(id) => setSearchParams({ editHeritage: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateAncestry(id)
            await loadFeats()
            setSearchParams({ edit: copy.id })
          }}
          onDuplicateHeritage={async (id) => {
            const copy = await duplicateHeritage(id)
            setSearchParams({ editHeritage: copy.id })
          }}
        />
      </div>
    </div>
  )
}
