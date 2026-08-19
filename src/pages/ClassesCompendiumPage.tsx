import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ClassBrowser } from '@/features/classes/components/ClassBrowser'
import { ClassEditor } from '@/features/classes/components/ClassEditor'
import { createEmptyHomebrewClass } from '@/features/classes/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useClassStore } from '@/stores/classStore'
import { useFeatStore } from '@/stores/featStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { CharacterClass, ContentSource, Feat } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function ClassesCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    classes,
    loadAll: loadClasses,
    upsertClass,
    removeClass,
    duplicateClass,
    getById,
  } = useClassStore()
  const {
    sources,
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()
  const { feats, loadAll: loadFeats, upsertFeat, removeFeat } = useFeatStore()

  const creating = searchParams.get('criar') === '1'
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    creating ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<CharacterClass | null>(null)
  const [nestedFeats, setNestedFeats] = useState<Feat[]>([])

  useEffect(() => {
    void loadClasses()
    void loadBackgrounds()
    void loadFeats()
  }, [loadClasses, loadBackgrounds, loadFeats])

  useEffect(() => {
    if (creating) {
      setDraft(createEmptyHomebrewClass())
      setNestedFeats([])
      setMode('create')
      return
    }
    if (editId) {
      const characterClass = getById(editId)
      if (characterClass && characterClass.provenance.type === 'homebrew') {
        setDraft(structuredClone(characterClass))
        setNestedFeats(
          feats.filter(
            (f) =>
              f.classId === characterClass.id && f.provenance.type === 'homebrew',
          ),
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
    setNestedFeats([])
  }, [creating, editId, getById, setSearchParams, classes, feats])

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: {
    characterClass: CharacterClass
    feats: Feat[]
    removedFeatIds: string[]
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    await upsertClass(payload.characterClass)
    for (const feat of payload.feats) {
      await upsertFeat(feat)
    }
    for (const id of payload.removedFeatIds) {
      await removeFeat(id)
    }
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <ClassEditor
        initial={draft}
        initialFeats={nestedFeats}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeClass(draft.id)
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
            Compêndio — Classes
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Conteúdo oficial e homebrew no mesmo sistema. Consulte, duplique uma
            oficial ou invente uma classe — a aplicação à ficha fica no editor do
            personagem.
          </p>
        </div>
        <HomebrewJsonButtons kind="classes" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ClassBrowser
          classes={classes}
          sources={sources}
          feats={feats}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={() => setSearchParams({ criar: '1' })}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateClass(id)
            await loadFeats()
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
