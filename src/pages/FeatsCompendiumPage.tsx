import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FeatCatalogBrowser } from '@/features/feats/components/FeatCatalogBrowser'
import { FeatEditor } from '@/features/feats/components/FeatEditor'
import {
  emptyHomebrewFeat,
  featCategoryFromQuery,
  FEAT_CREATE_QUERY,
} from '@/features/feats/homebrewFeat'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useArchetypeStore } from '@/stores/archetypeStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useClassStore } from '@/stores/classStore'
import { useFeatStore } from '@/stores/featStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { ContentSource, Feat, FeatCategory } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function FeatsCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    feats,
    loadAll,
    upsertFeat,
    removeFeat,
    duplicateFeat,
    getHomebrewById,
  } = useFeatStore()
  const {
    sources,
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()
  const { ancestries, loadAll: loadAncestries } = useAncestryStore()
  const { classes, loadAll: loadClasses } = useClassStore()
  const { archetypes, loadAll: loadArchetypes } = useArchetypeStore()

  const createCategory = featCategoryFromQuery(searchParams.get('criar'))
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    createCategory ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Feat | null>(null)

  useEffect(() => {
    void loadAll()
    void loadBackgrounds()
    void loadAncestries()
    void loadClasses()
    void loadArchetypes()
  }, [loadAll, loadBackgrounds, loadAncestries, loadClasses, loadArchetypes])

  useEffect(() => {
    if (createCategory) {
      setDraft(emptyHomebrewFeat({ category: createCategory }))
      setMode('create')
      return
    }
    if (editId) {
      const feat = getHomebrewById(editId)
      if (feat) {
        setDraft(structuredClone(feat))
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [createCategory, editId, getHomebrewById, setSearchParams, feats])

  const parents = useMemo(
    () => ({
      ancestries: ancestries.map((a) => ({ id: a.id, name: a.name })),
      classes: classes.map((c) => ({ id: c.id, name: c.name })),
      archetypes: archetypes.map((a) => ({ id: a.id, name: a.name })),
    }),
    [ancestries, classes, archetypes],
  )

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: { feat: Feat; source: ContentSource }) {
    await upsertSource(payload.source)
    await upsertFeat(payload.feat)
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <FeatEditor
        initial={draft}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeFeat(draft.id)
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
            Compêndio — Feitos
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Todos os feitos oficiais (Remaster) e homebrew num só lugar.
            Filtre por prateleira, nível, raridade, ação, traço ou povo/classe.
            Duplique um oficial para criar o seu, ou importe um JSON.
          </p>
        </div>
        <HomebrewJsonButtons kind="feats" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <FeatCatalogBrowser
          feats={feats}
          sources={sources}
          parents={parents}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={(category: FeatCategory) =>
            setSearchParams({ criar: FEAT_CREATE_QUERY[category] })
          }
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateFeat(id)
            await loadBackgrounds()
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
