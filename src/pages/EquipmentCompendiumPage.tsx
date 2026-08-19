import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EquipmentBrowser } from '@/features/equipment/components/EquipmentBrowser'
import { EquipmentTypeEditor } from '@/features/equipment/components/EquipmentTypeEditor'
import {
  EQUIPMENT_CREATE_QUERY,
  createEmptyHomebrewItem,
  equipmentKindFromQuery,
  type EquipmentCreateKind,
} from '@/features/equipment/homebrewDefaults'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'
import type { ContentSource, ItemDefinition } from '@/types'

type Mode = 'browse' | 'create' | 'edit'

export function EquipmentCompendiumPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { previewId, onActiveChange } = useCatalogPreview()
  const {
    items,
    loadAll,
    upsertItem,
    removeItem,
    duplicateItem,
    getHomebrewById,
  } = useEquipmentStore()
  const {
    loadAll: loadBackgrounds,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()

  const createKind = equipmentKindFromQuery(searchParams.get('criar'))
  const editId = searchParams.get('edit')

  const [mode, setMode] = useState<Mode>(
    createKind ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<ItemDefinition | null>(null)
  const [draftKind, setDraftKind] = useState<EquipmentCreateKind>('weapon')

  useEffect(() => {
    void loadAll()
    void loadBackgrounds()
  }, [loadAll, loadBackgrounds])

  useEffect(() => {
    if (createKind) {
      setDraft(createEmptyHomebrewItem(createKind))
      setDraftKind(createKind)
      setMode('create')
      return
    }
    if (editId) {
      const item = getHomebrewById(editId)
      if (item) {
        setDraft(structuredClone(item))
        setDraftKind(item.category)
        setMode('edit')
        return
      }
      setSearchParams({})
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [createKind, editId, getHomebrewById, setSearchParams, items])

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
  }

  async function handleSave(payload: {
    item: ItemDefinition
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    await upsertItem(payload.item)
    closeEditor()
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <EquipmentTypeEditor
        initial={draft}
        createKind={draftKind}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeItem(draft.id)
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
            Compêndio — Equipamento
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Oficiais e homebrew. Cada categoria tem o criador certo — arma não é
            artefato, armadura não é poção. Selecione um item e use Adicionar à
            ficha para colocar no inventário de um personagem ou baú dos grupos
            ativos. Pacotes rápidos de classe e o que vem em cada kit:{' '}
            <Link to="/compendio/kits" className="text-accent hover:underline">
              aba Kits
            </Link>
            .
          </p>
        </div>
        <HomebrewJsonButtons kind="items" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <EquipmentBrowser
          items={items}
          mode="manage"
          selectedId={previewId}
          onActiveChange={onActiveChange}
          onCreateHomebrew={(kind) =>
            setSearchParams({ criar: EQUIPMENT_CREATE_QUERY[kind] })
          }
          onEditHomebrew={(id) => setSearchParams({ edit: id })}
          onDuplicate={async (id) => {
            const copy = await duplicateItem(id)
            setSearchParams({ edit: copy.id })
          }}
        />
      </div>
    </div>
  )
}
