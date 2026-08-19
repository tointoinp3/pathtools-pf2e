import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BestiaryBrowser } from '@/features/bestiary/components/BestiaryBrowser'
import { CreatureEditor } from '@/features/bestiary/components/CreatureEditor'
import { catalogCreatureCount, getCreatureById } from '@/engine/bestiaryCatalog'
import {
  creatureVariantQuery,
  parseCreatureVariant,
} from '@/engine/creatureVariant'
import { Tip } from '@/components/ui/Panel'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useCreatureStore } from '@/stores/creatureStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { createEmptyHomebrewCreature } from '@/features/bestiary/homebrewDefaults'
import type { ContentSource, Creature } from '@/types'
import type { CreaturePowerVariant } from '@/types/creature'
import { intentFromPointer } from '@/features/tabs/tabPointer'
import { useAppTabs } from '@/features/tabs/useAppTabs'
import { useDocumentTitle } from '@/utils/useDocumentTitle'

type Mode = 'browse' | 'create' | 'edit'

export function BestiaryPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { openInTab } = useAppTabs()
  const loadEquipment = useEquipmentStore((s) => s.loadAll)
  const {
    creatures,
    loadAll,
    upsertCreature,
    removeCreature,
    duplicateCreature,
    getHomebrewById,
  } = useCreatureStore()
  const {
    loadAll: loadSources,
    upsertSource,
    getSourceById,
  } = useBackgroundStore()

  const creating = searchParams.get('criar') === '1' || searchParams.get('criar') === 'criatura'
  const editId = searchParams.get('edit')
  const variant = parseCreatureVariant(searchParams.get('v'))
  const selected = getCreatureById(id)
  const total = catalogCreatureCount()

  const [mode, setMode] = useState<Mode>(
    creating ? 'create' : editId ? 'edit' : 'browse',
  )
  const [draft, setDraft] = useState<Creature | null>(null)

  useDocumentTitle(
    mode === 'create'
      ? 'Criar criatura'
      : mode === 'edit'
        ? draft?.name
        : selected?.name,
  )

  useEffect(() => {
    void loadEquipment()
    void loadAll()
    void loadSources()
  }, [loadEquipment, loadAll, loadSources])

  useEffect(() => {
    if (creating) {
      setDraft(createEmptyHomebrewCreature())
      setMode('create')
      return
    }
    if (editId) {
      const creature = getHomebrewById(editId)
      if (creature) {
        setDraft(structuredClone(creature))
        setMode('edit')
        return
      }
      setSearchParams({}, { replace: true })
      setMode('browse')
      return
    }
    setMode('browse')
    setDraft(null)
  }, [creating, editId, getHomebrewById, setSearchParams, creatures])

  function setVariant(next: CreaturePowerVariant) {
    const query = creatureVariantQuery(next)
    if (query) setSearchParams({ v: query }, { replace: true })
    else setSearchParams({}, { replace: true })
  }

  function closeEditor() {
    setSearchParams({})
    setMode('browse')
    setDraft(null)
    navigate('/bestiario')
  }

  async function handleSave(payload: {
    creature: Creature
    source: ContentSource
  }) {
    await upsertSource(payload.source)
    const saved = await upsertCreature(payload.creature)
    setSearchParams({})
    setMode('browse')
    setDraft(null)
    navigate(`/bestiario/${saved.id}`)
  }

  if (mode === 'create' || mode === 'edit') {
    if (!draft) return null
    const source = draft.sourceId ? getSourceById(draft.sourceId) : null
    return (
      <CreatureEditor
        initial={draft}
        initialSource={source}
        onCancel={closeEditor}
        onSave={handleSave}
        onDelete={
          mode === 'edit'
            ? async () => {
                await removeCreature(draft.id)
                closeEditor()
              }
            : undefined
        }
      />
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col p-5 animate-fade-up">
      <div className="mb-3">
        <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
          Bestiário
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Fichas oficiais Remaster e as suas criaturas homebrew. {total}{' '}
          criatura{total === 1 ? '' : 's'} no catálogo. Cada ficha tem versão
          Normal, Elite e Fraca. O custo de ação nas homebrew usa os mesmos
          ícones das oficiais.
        </p>
      </div>
      <Tip>
        Criar criatura abre o guia do GM Core (Extremo / Alto / Moderado / Baixo).
        Duplicar uma oficial e trocar o lore é o caminho mais seguro. JSON
        importa um arquivo ou um lote.
      </Tip>
      <div className="mt-3 min-h-0 flex-1 overflow-hidden">
        <BestiaryBrowser
          selectedId={id}
          creatures={creatures}
          variant={variant}
          onVariantChange={setVariant}
          mode="manage"
          onCreateHomebrew={() => navigate('/bestiario?criar=1')}
          onEditHomebrew={(creatureId) =>
            navigate(`/bestiario?edit=${creatureId}`)
          }
          onDuplicate={async (creatureId) => {
            const copy = await duplicateCreature(creatureId)
            navigate(`/bestiario?edit=${copy.id}`)
          }}
          onSelect={(creatureId, event) => {
            if (event && intentFromPointer(event) !== 'current') {
              openInTab(`/bestiario/${creatureId}`, intentFromPointer(event))
              event.preventDefault()
              return
            }
            if (creatureId === id) return
            navigate(`/bestiario/${creatureId}`)
          }}
        />
      </div>
    </div>
  )
}
