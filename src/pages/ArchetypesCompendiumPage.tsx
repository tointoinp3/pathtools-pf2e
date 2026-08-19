import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArchetypeBrowser } from '@/features/archetypes/components/ArchetypeBrowser'
import { ArchetypeEditor } from '@/features/archetypes/components/ArchetypeEditor'
import { createEmptyHomebrewArchetype } from '@/features/archetypes/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useArchetypeStore } from '@/stores/archetypeStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useClassStore } from '@/stores/classStore'
import { useFeatStore } from '@/stores/featStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { Archetype, ContentSource, Feat } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function ArchetypesCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    archetypes,
    loadAll: loadArchetypes,
    upsertArchetype,
    removeArchetype,
    duplicateArchetype,
    getById,
  } = useArchetypeStore()
  const {
    sources,
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()
  const { classes, loadAll: loadClasses } = useClassStore()
  const { feats, loadAll: loadFeats, upsertFeat, removeFeat } = useFeatStore()

  const creating = searchParams.get('criar') === '1'
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    creating ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Archetype | null>(null)
  const [dedication, setDedication] = useState<Feat | null>(null)
  const [extraFeats, setExtraFeats] = useState<Feat[]>([])

  useEffect(() => {
    void loadArchetypes()
    void loadBackgrounds()
    void loadClasses()
    void loadFeats()
  }, [loadArchetypes, loadBackgrounds, loadClasses, loadFeats])

  useEffect(() => {
    if (creating) {
      const empty = createEmptyHomebrewArchetype()
      setDraft(empty.archetype)
      setDedication(empty.dedication)
      setExtraFeats(empty.extraFeats)
      setMode('create')
      return
    }
    if (editId) {
      const archetype = getById(editId)
      if (archetype && archetype.provenance.type === 'homebrew') {
        const linked = feats.filter(
          (f) =>
            f.archetypeId === archetype.id && f.provenance.type === 'homebrew',
        )
        const ded =
          linked.find((f) => f.id === archetype.dedicationFeatId) ??
          linked.find((f) => f.isDedication)
        if (!ded) {
          setSearchParams({})
          setMode('browse')
          return
        }
        setDraft(structuredClone(archetype))
        setDedication(structuredClone(ded))
        setExtraFeats(
          linked
            .filter((f) => f.id !== ded.id)
            .sort((a, b) => a.level - b.level),
        )
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
    setDedication(null)
    setExtraFeats([])
  }, [creating, editId, getById, setSearchParams, archetypes, feats])

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: {
    archetype: Archetype
    feats: Feat[]
    removedFeatIds: string[]
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    await upsertArchetype(payload.archetype)
    for (const feat of payload.feats) {
      await upsertFeat(feat)
    }
    for (const id of payload.removedFeatIds) {
      await removeFeat(id)
    }
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft || !dedication) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <ArchetypeEditor
        initial={draft}
        initialDedication={dedication}
        initialExtraFeats={extraFeats}
        classes={classes}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeArchetype(draft.id)
                await loadFeats()
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
            Compêndio — Arquétipos
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Dedicações oficiais e homebrew. Multiclasse primeiro; os demais em
            seguida. Na ficha, a Dedicação ocupa um slot de classe, na aba Feitos.
          </p>
        </div>
        <HomebrewJsonButtons kind="archetypes" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ArchetypeBrowser
          archetypes={archetypes}
          feats={feats}
          sources={sources}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={() => setSearchParams({ criar: '1' })}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateArchetype(id)
            await loadFeats()
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
