import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  applyDailyPreparations,
  drainedHpDelta,
  refreshDailyMagicItems,
  resolveCharacterSheet,
} from '@/engine'
import { SessionSheetView } from '@/features/characters/components/SessionSheetView'
import { SaveIndicator } from '@/features/characters/components/SaveIndicator'
import { Button } from '@/components/ui/Button'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useCharacterStore } from '@/stores/characterStore'
import { useClassStore } from '@/stores/classStore'
import { useCompanionStore } from '@/stores/companionStore'
import { useFeatStore } from '@/stores/featStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { debounce } from '@/utils/fn'
import { useDocumentTitle } from '@/utils/useDocumentTitle'

export function SessionSheetPage() {
  const { id } = useParams<{ id: string }>()
  const {
    current,
    loading,
    loadOne,
    updateCurrent,
    persistCurrent,
    saveStatus,
    setSaveStatus,
  } = useCharacterStore()
  const loadBackgrounds = useBackgroundStore((s) => s.loadAll)
  const getBackground = useBackgroundStore((s) => s.getById)
  const sources = useBackgroundStore((s) => s.sources)
  const loadAncestries = useAncestryStore((s) => s.loadAll)
  const getAncestryById = useAncestryStore((s) => s.getAncestryById)
  const getHeritageById = useAncestryStore((s) => s.getHeritageById)
  const loadClasses = useClassStore((s) => s.loadAll)
  const getClassById = useClassStore((s) => s.getById)
  const loadFeats = useFeatStore((s) => s.loadAll)
  const feats = useFeatStore((s) => s.feats)
  const loadCompanions = useCompanionStore((s) => s.loadAll)
  const settings = useSettingsStore((s) => s.settings)
  const loadSettings = useSettingsStore((s) => s.load)

  useEffect(() => {
    void loadBackgrounds()
    void loadAncestries()
    void loadClasses()
    void loadFeats()
    void loadCompanions()
    void loadSettings()
  }, [
    loadBackgrounds,
    loadAncestries,
    loadClasses,
    loadFeats,
    loadCompanions,
    loadSettings,
  ])

  useEffect(() => {
    if (id) void loadOne(id)
  }, [id, loadOne])

  const persistRef = useRef(persistCurrent)
  persistRef.current = persistCurrent
  const debouncedSave = useMemo(
    () =>
      debounce(() => {
        void persistRef.current()
      }, 600),
    [],
  )

  useEffect(() => {
    if (saveStatus === 'dirty') debouncedSave()
  }, [saveStatus, current, debouncedSave])

  useEffect(() => {
    const flush = () => debouncedSave.flush()
    window.addEventListener('beforeunload', flush)
    return () => {
      window.removeEventListener('beforeunload', flush)
      flush()
    }
  }, [debouncedSave])

  useEffect(() => {
    if (saveStatus !== 'saved') return
    const timer = setTimeout(() => setSaveStatus('idle'), 1500)
    return () => clearTimeout(timer)
  }, [saveStatus, setSaveStatus])

  const sheet = useMemo(() => {
    if (!current || current.id !== id) return null
    return resolveCharacterSheet({
      character: current,
      background: current.backgroundId
        ? (getBackground(current.backgroundId) ?? null)
        : null,
      ancestry: current.ancestryId
        ? (getAncestryById(current.ancestryId) ?? null)
        : null,
      heritage: current.heritageId
        ? (getHeritageById(current.heritageId) ?? null)
        : null,
      characterClass: current.classId
        ? (getClassById(current.classId) ?? null)
        : null,
      secondClass: settings?.dualClassEnabled
        ? current.secondClassId
          ? (getClassById(current.secondClassId) ?? null)
          : null
        : null,
      sources,
      feats,
      freeArchetype: settings?.freeArchetypeEnabled === true,
      mythicRules: settings?.mythicRulesEnabled === true,
      ancestryParagon: settings?.ancestryParagonEnabled === true,
      dualClass: settings?.dualClassEnabled === true,
      gradualAbilityBoosts: settings?.gradualAbilityBoostsEnabled === true,
      automaticBonusProgression:
        settings?.automaticBonusProgressionEnabled === true,
      proficiencyWithoutLevel:
        settings?.proficiencyWithoutLevelEnabled === true,
    })
  }, [
    current,
    id,
    getBackground,
    getAncestryById,
    getHeritageById,
    getClassById,
    sources,
    feats,
    settings,
  ])

  useDocumentTitle(
    current?.name ? `Sessão · ${current.name}` : 'Ficha de sessão',
  )

  if (loading && !sheet) {
    return <p className="p-5 text-sm text-text-dim">Carregando ficha…</p>
  }

  if (!sheet || !current) {
    return (
      <div className="p-5 text-sm text-text-muted">
        Personagem não encontrado.{' '}
        <Link to="/personagens" className="text-accent hover:underline">
          Voltar
        </Link>
      </div>
    )
  }

  const access = sheet.spellcasting

  return (
    <div className="mx-auto max-w-6xl p-4 print:max-w-none print:p-0">
      <header className="print-hidden mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-1 px-1 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/personagens"
            className="rounded-lg px-2 py-1 text-xs text-text-dim transition-colors hover:bg-surface-3 hover:text-text"
          >
            ← Personagens
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="min-w-0">
            <h1 className="truncate font-display text-sm font-semibold tracking-wide text-accent">
              Ficha de sessão
            </h1>
            <p className="truncate text-[11px] text-text-dim">
              Mesa e PDF — PV e pontos salvam nesta ficha
            </p>
          </div>
          <SaveIndicator status={saveStatus} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/personagens/${sheet.character.id}`}>
            <Button size="sm" variant="secondary">
              Abrir ficha
            </Button>
          </Link>
          <Button
            size="sm"
            variant="secondary"
            title="Recarrega magias, foco e cargas de itens. Não cura PV."
            onClick={() => {
              updateCurrent({
                spellState: access?.hasAccess
                  ? applyDailyPreparations(current.spellState, access)
                  : current.spellState,
                equipment: refreshDailyMagicItems(
                  current.equipment ?? [],
                  access?.highestSlotRank ?? 0,
                ),
              })
            }}
          >
            Preparações diárias
          </Button>
          <Button size="sm" variant="accent" onClick={() => window.print()}>
            Imprimir / PDF
          </Button>
        </div>
      </header>
      <SessionSheetView
        sheet={sheet}
        onCurrentHpChange={(currentHp) => updateCurrent({ currentHp })}
        onHeroPointsChange={(heroPoints) => updateCurrent({ heroPoints })}
        onMythicPointsChange={(mythicPoints) => updateCurrent({ mythicPoints })}
        onFocusPointsChange={(focusPointsCurrent) =>
          updateCurrent({
            spellState: { ...current.spellState, focusPointsCurrent },
          })
        }
        onActiveConditionsChange={(activeConditions) => {
          const delta = drainedHpDelta(
            current.activeConditions,
            activeConditions,
            current.level,
          )
          const maxHp = sheet.derived.hp.value
          let currentHp = current.currentHp
          if (delta !== 0 && maxHp != null) {
            const from = currentHp == null ? maxHp : currentHp
            currentHp = Math.max(0, from - delta)
          }
          updateCurrent({ activeConditions, currentHp })
        }}
      />
    </div>
  )
}
