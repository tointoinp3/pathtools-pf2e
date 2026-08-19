import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BackgroundBrowser } from '@/features/backgrounds/components/BackgroundBrowser'
import { BackgroundEditor } from '@/features/backgrounds/components/BackgroundEditor'
import { createEmptyHomebrewBackground } from '@/features/backgrounds/backgroundRepository'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { Background, ContentSource } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function BackgroundsCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    backgrounds,
    sources,
    loadAll,
    upsertBackground,
    upsertSource,
    removeBackground,
    duplicateAsHomebrew,
    getById,
    getSourceById,
  } = useBackgroundStore()

  const editId = searchParams.get('edit')
  const creating = searchParams.get('criar') === '1'

  const [mode, setMode] = useState<Mode>(
    creating ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Background | null>(null)

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  useEffect(() => {
    if (creating) {
      setDraft(createEmptyHomebrewBackground())
      setMode('create')
    } else if (editId) {
      const bg = getById(editId)
      if (bg && bg.provenance.type === 'homebrew') {
        setDraft(structuredClone(bg))
        setMode('edit')
      } else {
        setMode('browse')
        setSearchParams({})
      }
    } else {
      setMode('browse')
      setDraft(null)
    }
  }, [creating, editId, getById, setSearchParams, backgrounds])

  async function handleSave(background: Background, source: ContentSource) {
    await upsertSource(source)
    await upsertBackground(background)
    setSearchParams({})
    setMode('browse')
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <BackgroundEditor
        initial={draft}
        initialSource={source}
        onCancel={() => {
          setSearchParams({})
          setMode('browse')
        }}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeBackground(draft.id)
                setSearchParams({})
                setMode('browse')
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
            Compêndio — Origens
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Conteúdo oficial e homebrew no mesmo sistema. Clique para ver detalhes
            ou crie a sua própria origem.
          </p>
        </div>
        <HomebrewJsonButtons kind="backgrounds" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <BackgroundBrowser
          backgrounds={backgrounds}
          sources={sources}
          mode="manage"
          previewId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={() => setSearchParams({ criar: '1' })}
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateAsHomebrew(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
