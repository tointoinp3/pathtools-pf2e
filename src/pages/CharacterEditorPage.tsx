import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  resolveCharacterSheet,
  emptyAncestryChoices,
  pruneFeatSelections,
  pruneLevelAttributeBoosts,
  pruneGradualAttributeBoosts,
  pruneSkillIncreases,
  resolveGrantedSkillRanks,
  refreshDailyMagicItems,
  dismissActiveItemEffect,
  spendWeaponPoison,
  activateAffixedTalisman,
  classRequiresDeity,
  buildCreationChecklist,
  applyStartingWealth,
  applyDailyPreparations,
  formatCoinsCp,
  drainedHpDelta,
  emptyClassChoices,
  mergeFeatChoicesIntoClassPicks,
} from '@/engine'
import type { CreationSectionId } from '@/engine/creationWizard'
import { CreationChecklistBanner } from '@/features/characters/components/CreationChecklist'
import { AncestryBrowser } from '@/features/ancestries/components/AncestryBrowser'
import { HeritagePicker } from '@/features/ancestries/components/HeritagePicker'
import { BackgroundBrowser } from '@/features/backgrounds/components/BackgroundBrowser'
import { ClassBrowser } from '@/features/classes/components/ClassBrowser'
import { DeityBrowser } from '@/features/deities/components/DeityBrowser'
import { MythicCallingPanel } from '@/features/mythic/components/MythicCallingPanel'
import { ArchetypePanel } from '@/features/archetypes/components/ArchetypePanel'
import { CharacterSheetView } from '@/features/characters/components/CharacterSheetView'
import { CombatPanel } from '@/features/characters/components/CombatPanel'
import { CompanionsPanel } from '@/features/characters/components/CompanionsPanel'
import { ConnectionsPanel } from '@/features/characters/components/ConnectionsPanel'
import { EquipmentPanel } from '@/features/characters/components/EquipmentPanel'
import { FormulaBookPanel } from '@/features/characters/components/FormulaBookPanel'
import { ProgressionPanel } from '@/features/characters/components/ProgressionPanel'
import { FeatBrowser } from '@/features/feats/components/FeatBrowser'
import { SpellsPanel } from '@/features/spells/components/SpellsPanel'
import { NotesBoard } from '@/features/characters/components/NotesBoard'
import { IdentityPanel } from '@/features/characters/components/IdentityPanel'
import { PortraitPicker } from '@/features/characters/components/PortraitPicker'
import { SaveIndicator } from '@/features/characters/components/SaveIndicator'
import { resolveStickyNotes, needsStickyNotesMigration } from '@/features/characters/stickyNotes'
import { Button } from '@/components/ui/Button'
import { runCharacterExportOne } from '@/features/backup/characterBackup'
import { Field, Input } from '@/components/ui/Field'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useCharacterStore } from '@/stores/characterStore'
import { useClassStore } from '@/stores/classStore'
import { useArchetypeStore } from '@/stores/archetypeStore'
import { useFeatStore } from '@/stores/featStore'
import { useSettingsStore } from '@/stores/settingsStore'
import type {
  AncestryChoices,
  BackgroundChoices,
  ClassChoices,
  DeityChoices,
  FeatSelection,
  SkillIncreaseEntry,
} from '@/types'
import { emptyDeityChoices } from '@/types'
import { debounce } from '@/utils/fn'
import { createId } from '@/utils/id'
import { useDocumentTitle } from '@/utils/useDocumentTitle'

type EditorSection =
  | 'sheet'
  | 'ancestry'
  | 'background'
  | 'class'
  | 'deity'
  | 'mythic'
  | 'archetypes'
  | 'progression'
  | 'feats'
  | 'combat'
  | 'companions'
  | 'spells'
  | 'equipment'
  | 'connections'
  | 'identity'
  | 'notes'

interface NavItem {
  id: EditorSection
  label: string
  hint: string
  children?: Array<{ id: string; label: string }>
}

const NAV: NavItem[] = [
  {
    id: 'sheet',
    label: 'Ficha',
    hint: 'Visão geral editável',
  },
  {
    id: 'ancestry',
    label: 'Ancestralidade',
    hint: 'Inclui herança',
    /** Só herança como submenu — ancestralidade é o item pai */
    children: [{ id: 'heritage', label: 'Herança' }],
  },
  {
    id: 'background',
    label: 'Origem',
    hint: 'Origem + escolhas',
  },
  {
    id: 'class',
    label: 'Classe',
    hint: 'PV/nível, salvaguardas, perícias',
  },
  {
    id: 'deity',
    label: 'Divindade',
    hint: 'Fé, fonte e santificação',
  },
  {
    id: 'mythic',
    label: 'Mítico',
    hint: 'Chamado e Pontos Míticos',
  },
  {
    id: 'archetypes',
    label: 'Arquétipos',
    hint: 'Dedicação e multiclasse',
  },
  {
    id: 'progression',
    label: 'Progressão',
    hint: 'Nível, boosts e escolhas',
  },
  {
    id: 'feats',
    label: 'Feitos',
    hint: 'Selecionar e ver ativos',
  },
  {
    id: 'combat',
    label: 'Combate',
    hint: 'PV, defesas e dados',
  },
  {
    id: 'companions',
    label: 'Companheiros',
    hint: 'Familiar, pet e animal',
  },
  {
    id: 'spells',
    label: 'Magias',
    hint: 'Grimório, foco e rituais',
  },
  {
    id: 'equipment',
    label: 'Equipamento',
    hint: 'Inventário e catálogo',
  },
  {
    id: 'connections',
    label: 'Conexões',
    hint: 'Efeitos que a ficha não calcula',
  },
  {
    id: 'identity',
    label: 'Identidade',
    hint: 'Conceito, aparência e PFS',
  },
  {
    id: 'notes',
    label: 'Notas',
    hint: 'Anotações da mesa',
  },
]

const EDITOR_SECTION_IDS = new Set(NAV.map((item) => item.id))

function readSavedSection(characterId: string | undefined): EditorSection {
  if (!characterId) return 'sheet'
  try {
    const saved = sessionStorage.getItem(`sp.editor.section.${characterId}`)
    if (saved && EDITOR_SECTION_IDS.has(saved as EditorSection)) {
      return saved as EditorSection
    }
  } catch {
    /* private mode */
  }
  return 'sheet'
}

export function CharacterEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [section, setSection] = useState<EditorSection>(() =>
    readSavedSection(id),
  )
  const skipSectionPersist = useRef(true)
  const [ancestryTab, setAncestryTab] = useState<'ancestry-main' | 'heritage'>(
    'ancestry-main',
  )
  /** Submenu Herança aberto/fechado — não troca de página ao minimizar */
  const [ancestryExpanded, setAncestryExpanded] = useState(true)
  /** Slot de feito focado ao vir da Progressão */
  const [featFocusSlotId, setFeatFocusSlotId] = useState<string | null>(null)
  /** Nível da Progressão focado ao vir do checklist (boosts / perícias) */
  const [progressionFocusLevel, setProgressionFocusLevel] = useState<
    number | null
  >(null)

  const {
    current,
    saveStatus,
    loading,
    loadOne,
    updateCurrent,
    persistCurrent,
    setPortrait,
    updatePortraitTransform,
    clearPortrait,
    remove,
    duplicate,
    setSaveStatus,
  } = useCharacterStore()

  const {
    backgrounds,
    sources,
    loadAll: loadBackgrounds,
    getById,
  } = useBackgroundStore()

  const {
    ancestries,
    heritages,
    loadAll: loadAncestries,
    getAncestryById,
    getHeritageById,
  } = useAncestryStore()

  const {
    classes,
    loadAll: loadClasses,
    getById: getClassById,
  } = useClassStore()

  const {
    feats,
    loadAll: loadFeats,
  } = useFeatStore()

  const { loadAll: loadArchetypes } = useArchetypeStore()

  const settings = useSettingsStore((s) => s.settings)
  const loadSettings = useSettingsStore((s) => s.load)
  const freeArchetype = settings?.freeArchetypeEnabled === true
  const ignoreDedicationLock =
    freeArchetype && settings?.freeArchetypeIgnoreDedicationLock === true
  const mythicRules = settings?.mythicRulesEnabled === true
  const ancestryParagon = settings?.ancestryParagonEnabled === true
  const dualClass = settings?.dualClassEnabled === true
  const gradualAbilityBoosts = settings?.gradualAbilityBoostsEnabled === true
  const automaticBonusProgression =
    settings?.automaticBonusProgressionEnabled === true
  const proficiencyWithoutLevel =
    settings?.proficiencyWithoutLevelEnabled === true
  const featVariantOptions = {
    freeArchetype,
    ignoreDedicationLock,
    mythicRules,
    mythicCallingId: current?.mythicCallingId ?? null,
    ancestryParagon,
    secondClass: current?.secondClassId
      ? (getClassById(current.secondClassId) ?? null)
      : null,
  }

  useEffect(() => {
    void loadBackgrounds()
    void loadAncestries()
    void loadClasses()
    void loadArchetypes()
    void loadFeats()
    void loadSettings()
  }, [
    loadBackgrounds,
    loadAncestries,
    loadClasses,
    loadArchetypes,
    loadFeats,
    loadSettings,
  ])

  useEffect(() => {
    if (id) void loadOne(id)
  }, [id, loadOne])

  useEffect(() => {
    skipSectionPersist.current = true
    setSection(readSavedSection(id))
  }, [id])

  useEffect(() => {
    if (!id) return
    if (skipSectionPersist.current) {
      skipSectionPersist.current = false
      return
    }
    try {
      sessionStorage.setItem(`sp.editor.section.${id}`, section)
    } catch {
      /* private mode */
    }
  }, [id, section])

  useDocumentTitle(current?.name)

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
    if (saveStatus === 'dirty') {
      debouncedSave()
    }
  }, [saveStatus, current, debouncedSave])

  /**
   * Salva o que estiver pendente ao sair da ficha ou fechar a aba.
   * Antes o debounce era cancelado no cleanup, então editar e navegar
   * em menos de 600 ms perdia a alteração silenciosamente.
   */
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

  /** Migra nota antiga (texto único) para o mural quando o personagem carrega */
  useEffect(() => {
    if (!current) return
    if (!needsStickyNotesMigration(current)) return
    updateCurrent({
      stickyNotes: resolveStickyNotes(current),
      notes: '',
    })
  }, [current, updateCurrent])

  const background = current?.backgroundId
    ? getById(current.backgroundId)
    : null

  const ancestry = current?.ancestryId
    ? getAncestryById(current.ancestryId)
    : null

  const heritage = current?.heritageId
    ? getHeritageById(current.heritageId)
    : null

  const characterClass = current?.classId
    ? getClassById(current.classId)
    : null

  const secondCharacterClass =
    dualClass && current?.secondClassId
      ? (getClassById(current.secondClassId) ?? null)
      : null

  const sheet = useMemo(() => {
    if (!current) return null
    return resolveCharacterSheet({
      character: current,
      background,
      ancestry,
      heritage,
      characterClass,
      secondClass: secondCharacterClass,
      sources,
      feats,
      freeArchetype,
      mythicRules,
      ancestryParagon,
      dualClass,
      gradualAbilityBoosts,
      automaticBonusProgression,
      proficiencyWithoutLevel,
    })
  }, [
    current,
    background,
    ancestry,
    heritage,
    characterClass,
    secondCharacterClass,
    sources,
    feats,
    freeArchetype,
    mythicRules,
    ancestryParagon,
    dualClass,
    gradualAbilityBoosts,
    automaticBonusProgression,
    proficiencyWithoutLevel,
  ])

  const checklist = useMemo(() => {
    if (!current) return null
    return buildCreationChecklist({
      character: current,
      ancestry: ancestry ?? null,
      heritage: heritage ?? null,
      background: background ?? null,
      characterClass: characterClass ?? null,
      secondClass: secondCharacterClass,
      sheet,
      feats,
      freeArchetype,
      mythicRules,
      ignoreDedicationLock,
      dualClass,
      ancestryParagon,
      gradualAbilityBoosts,
    })
  }, [
    current,
    ancestry,
    heritage,
    background,
    characterClass,
    secondCharacterClass,
    sheet,
    feats,
    freeArchetype,
    mythicRules,
    ignoreDedicationLock,
    dualClass,
    ancestryParagon,
    gradualAbilityBoosts,
  ])

  const jumpedToGap = useRef(false)
  useEffect(() => {
    if (!current || !checklist || jumpedToGap.current) return
    const next = checklist.pendingRequired[0]
    if (!next) return
    jumpedToGap.current = true
    setSection(next.section as EditorSection)
    if (next.ancestryTab) {
      setAncestryExpanded(true)
      setAncestryTab(next.ancestryTab)
    }
  }, [current, checklist])

  function jumpToCreationStep(
    nextSection: CreationSectionId,
    ancestryTab?: 'ancestry-main' | 'heritage',
    focusLevel?: number,
  ) {
    setFeatFocusSlotId(null)
    setSection(nextSection as EditorSection)
    if (nextSection === 'ancestry') {
      setAncestryExpanded(true)
      setAncestryTab(ancestryTab ?? 'ancestry-main')
    }
    if (nextSection === 'progression' && focusLevel != null) {
      setProgressionFocusLevel(focusLevel)
    } else {
      setProgressionFocusLevel(null)
    }
  }

  const LOCKED_UNTIL_CORE: EditorSection[] = [
    'feats',
    'spells',
    'progression',
    'archetypes',
    'combat',
  ]

  function openEditorSection(id: EditorSection) {
    if (checklist && LOCKED_UNTIL_CORE.includes(id)) {
      const core = checklist.pendingRequired.find((s) =>
        [
          'ancestry',
          'heritage',
          'ancestry-picks',
          'background',
          'background-picks',
          'class',
          'class-picks',
        ].includes(s.id),
      )
      if (core) {
        jumpToCreationStep(core.section, core.ancestryTab)
        return
      }
    }
    setFeatFocusSlotId(null)
    setProgressionFocusLevel(null)
    setSection(id)
  }

  const baseSkillRanks = useMemo(() => {
    if (!current) return {}
    return resolveGrantedSkillRanks(
      current,
      background,
      ancestry,
      heritage,
      characterClass,
      feats,
      {
        freeArchetype,
        mythicRules,
        ancestryParagon,
        secondClass: secondCharacterClass,
      },
    )
  }, [
    current,
    background,
    ancestry,
    heritage,
    characterClass,
    secondCharacterClass,
    feats,
    freeArchetype,
    mythicRules,
    ancestryParagon,
  ])

  /** Remove feitos inválidos quando muda raça/classe/nível/herança */
  useEffect(() => {
    if (!current || feats.length === 0) return
    const pruned = pruneFeatSelections(
      current,
      feats,
      characterClass,
      heritage,
      featVariantOptions,
    )
    const prev = current.featSelections ?? []
    if (
      pruned.length === prev.length &&
      pruned.every(
        (s, i) => s.slotId === prev[i]?.slotId && s.featId === prev[i]?.featId,
      )
    ) {
      return
    }
    updateCurrent({ featSelections: pruned })
  }, [
    current?.ancestryId,
    current?.heritageId,
    current?.classId,
    current?.level,
    current?.mythicCallingId,
    feats,
    characterClass,
    freeArchetype,
    ignoreDedicationLock,
    mythicRules,
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só re-poda quando o caminho ou a variante muda
    updateCurrent,
  ])

  /** Podar boosts e aumentos de perícia acima do nível atual / slots inválidos */
  useEffect(() => {
    if (!current) return
    const nextBoosts = pruneLevelAttributeBoosts(
      current.levelAttributeBoosts,
      current.level,
    )
    const nextSkills = pruneSkillIncreases(
      current.skillIncreases,
      current.level,
      characterClass,
    )
    const boostsChanged =
      JSON.stringify(nextBoosts ?? {}) !==
      JSON.stringify(current.levelAttributeBoosts ?? {})
    const skillsChanged =
      JSON.stringify(nextSkills) !==
      JSON.stringify(current.skillIncreases ?? [])
    if (!boostsChanged && !skillsChanged) return
    updateCurrent({
      levelAttributeBoosts: nextBoosts,
      skillIncreases: nextSkills,
    })
  }, [
    current?.level,
    current?.classId,
    characterClass,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    updateCurrent,
  ])

  const intelligenceWithoutAncestry = useMemo(() => {
    const attr = sheet?.attributes.find((a) => a.id === 'intelligence')
    if (!attr) return 0
    return attr.contributions
      .filter((c) => c.sourceType !== 'ancestry')
      .reduce((sum, c) => sum + c.value, 0)
  }, [sheet])

  const intelligenceWithoutClass = useMemo(() => {
    const attr = sheet?.attributes.find((a) => a.id === 'intelligence')
    if (!attr) return 0
    return attr.contributions
      .filter(
        (c) => c.sourceType !== 'class' && c.sourceType !== 'freeBoost',
      )
      .reduce((sum, c) => sum + c.value, 0)
  }, [sheet])

  if (loading && !current) {
    return (
      <div className="p-4 text-sm text-text-muted">Carregando personagem…</div>
    )
  }

  if (!current || !sheet) {
    return (
      <div className="p-4">
        <p className="text-sm text-text-muted">Personagem não encontrado.</p>
        <Button className="mt-2" onClick={() => navigate('/personagens')}>
          Voltar
        </Button>
      </div>
    )
  }

  function applyBackground(backgroundId: string, choices: BackgroundChoices) {
    updateCurrent({
      backgroundId,
      backgroundChoices: choices,
    })
    setSection('sheet')
  }

  function clearBackground() {
    updateCurrent({
      backgroundId: null,
      backgroundChoices: null,
    })
  }

  function applyAncestry(
    ancestryId: string,
    choices: AncestryChoices,
    options?: { clearHeritage?: boolean },
  ) {
    const next = {
      ...current!,
      ancestryId,
      ancestryChoices: options?.clearHeritage
        ? { ...choices, heritageChoices: {} }
        : choices,
      ...(options?.clearHeritage ? { heritageId: null } : {}),
    }
    updateCurrent({
      ancestryId: next.ancestryId,
      ancestryChoices: next.ancestryChoices,
      ...(options?.clearHeritage ? { heritageId: null } : {}),
      featSelections: pruneFeatSelections(
        next,
        feats,
        characterClass,
        options?.clearHeritage ? null : heritage,
        featVariantOptions,
      ),
    })
    setSection('sheet')
  }

  function clearAncestry() {
    const next = {
      ...current!,
      ancestryId: null,
      heritageId: null,
      ancestryChoices: null,
    }
    updateCurrent({
      ancestryId: null,
      heritageId: null,
      ancestryChoices: null,
      featSelections: pruneFeatSelections(
        next,
        feats,
        characterClass,
        null,
        featVariantOptions,
      ),
    })
  }

  function applyHeritage(heritageId: string, choices: AncestryChoices) {
    const next = {
      ...current!,
      heritageId,
      ancestryChoices: choices,
    }
    const applied = getHeritageById(heritageId) ?? null
    updateCurrent({
      heritageId,
      ancestryChoices: choices,
      featSelections: pruneFeatSelections(
        next,
        feats,
        characterClass,
        applied,
        featVariantOptions,
      ),
    })
    setSection('sheet')
  }

  function clearHeritage() {
    if (!current) return
    const base = current.ancestryChoices ?? emptyAncestryChoices()
    const next = {
      ...current,
      heritageId: null,
      ancestryChoices: {
        ...base,
        heritageChoices: {},
      },
    }
    updateCurrent({
      heritageId: null,
      ancestryChoices: next.ancestryChoices,
      featSelections: pruneFeatSelections(
        next,
        feats,
        characterClass,
        null,
        featVariantOptions,
      ),
    })
  }

  function applyClass(classId: string, choices: ClassChoices) {
    const nextClass = getClassById(classId) ?? null
    const next = {
      ...current!,
      classId,
      classChoices: choices,
    }
    updateCurrent({
      classId,
      classChoices: choices,
      featSelections: pruneFeatSelections(
        next,
        feats,
        nextClass,
        heritage,
        featVariantOptions,
      ),
      skillIncreases: pruneSkillIncreases(
        current!.skillIncreases,
        current!.level,
        nextClass,
      ),
    })
    setSection('sheet')
  }

  function applyDeity(deityId: string) {
    if (current?.deityId === deityId) {
      setSection('sheet')
      return
    }
    updateCurrent({
      deityId,
      deityChoices: emptyDeityChoices(),
    })
    setSection('sheet')
  }

  function clearDeity() {
    updateCurrent({
      deityId: null,
      deityChoices: null,
    })
  }

  function clearClass() {
    const next = {
      ...current!,
      classId: null,
      classChoices: null,
    }
    updateCurrent({
      classId: null,
      classChoices: null,
      featSelections: pruneFeatSelections(
        next,
        feats,
        null,
        heritage,
        featVariantOptions,
      ),
      skillIncreases: pruneSkillIncreases(
        current!.skillIncreases,
        current!.level,
        null,
      ),
    })
  }

  function applyFeatSelections(featSelections: FeatSelection[]) {
    updateCurrent({ featSelections })
  }

  function applyCharacterLevel(level: number) {
    if (!current) return
    const nextLevel = Math.max(1, Math.min(20, level))
    const goingUp = nextLevel > current.level
    updateCurrent({
      level: nextLevel,
      levelAttributeBoosts: pruneLevelAttributeBoosts(
        current.levelAttributeBoosts,
        nextLevel,
      ),
      gradualAttributeBoosts: pruneGradualAttributeBoosts(
        current.gradualAttributeBoosts,
        nextLevel,
      ),
      skillIncreases: pruneSkillIncreases(
        current.skillIncreases,
        nextLevel,
        characterClass,
      ),
      featSelections: pruneFeatSelections(
        { ...current, level: nextLevel },
        feats,
        characterClass,
        heritage,
        featVariantOptions,
      ),
    })
    if (goingUp) {
      setProgressionFocusLevel(nextLevel)
      setSection('progression')
    }
  }

  function openFeatSlot(slotId: string) {
    setFeatFocusSlotId(slotId)
    setSection('feats')
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="print-hidden flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-1 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/personagens"
            className="rounded-lg px-2 py-1 text-xs text-text-dim transition-colors hover:bg-surface-3 hover:text-text"
          >
            ← Personagens
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="truncate font-display text-sm font-semibold tracking-wide">
            {current.name}
          </h1>
          <SaveIndicator status={saveStatus} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => navigate(`/personagens/${current.id}/sessao`)}
          >
            Ficha de sessão
          </Button>
          <Button size="sm" variant="secondary" onClick={() => window.print()}>
            Imprimir
          </Button>
          <Button
            size="sm"
            onClick={() => {
              void (async () => {
                try {
                  if (saveStatus === 'dirty') await persistCurrent()
                  const copy = await duplicate(current.id)
                  navigate(`/personagens/${copy.id}`)
                } catch (error) {
                  window.alert(
                    error instanceof Error
                      ? error.message
                      : 'Falha ao duplicar o personagem.',
                  )
                }
              })()
            }}
          >
            Duplicar
          </Button>
          <Button
            size="sm"
            onClick={() => {
              void runCharacterExportOne(current).catch((error) =>
                window.alert(
                  error instanceof Error
                    ? error.message
                    : 'Falha ao exportar o personagem.',
                ),
              )
            }}
          >
            Exportar JSON
          </Button>
          <Button size="sm" variant="secondary" onClick={() => void persistCurrent()}>
            Salvar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  `Excluir o personagem "${current.name}"? Esta ação não pode ser desfeita.`,
                )
              ) {
                void remove(current.id).then(() => navigate('/personagens'))
              }
            }}
          >
            Excluir
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="print-hidden hidden w-56 shrink-0 overflow-y-auto border-r border-border bg-surface-1 p-2.5 md:block">
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            Personagem
          </div>
          <ul className="space-y-0.5">
            {NAV.filter((item) => item.id !== 'mythic' || mythicRules).map((item) => {
              const isActive = section === item.id
              const isAncestry = item.id === 'ancestry'
              const showChildren =
                isAncestry && isActive && ancestryExpanded && Boolean(item.children)

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    title={
                      isAncestry && isActive
                        ? ancestryExpanded
                          ? 'Clique de novo para minimizar (esconder Herança)'
                          : 'Clique para expandir Herança'
                        : undefined
                    }
                    onClick={() => {
                      if (isAncestry) {
                        if (section === 'ancestry') {
                          // Só minimiza/expande o submenu — permanece na ancestralidade
                          if (ancestryExpanded) {
                            setAncestryExpanded(false)
                            setAncestryTab('ancestry-main')
                          } else {
                            setAncestryExpanded(true)
                          }
                          return
                        }
                        setSection('ancestry')
                        setAncestryExpanded(true)
                        setAncestryTab('ancestry-main')
                        return
                      }
                      setFeatFocusSlotId(null)
                      openEditorSection(item.id)
                    }}
                    className={`nav-link-item flex w-full flex-col rounded-lg px-2.5 py-2 text-left ${
                      isActive
                        ? 'bg-accent/15 text-accent shadow-[inset_3px_0_0_0_var(--color-accent)]'
                        : 'text-text-muted hover:bg-surface-2 hover:text-text'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2 text-xs font-medium">
                      <span>{item.label}</span>
                      {isAncestry && (
                        <span
                          className={`text-[10px] transition-transform duration-200 ${
                            isActive && ancestryExpanded
                              ? 'rotate-90 text-accent'
                              : 'text-text-dim'
                          }`}
                          aria-hidden
                        >
                          ▸
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 text-[10px] text-text-dim">
                      {isAncestry && isActive && !ancestryExpanded
                        ? 'Minimizado'
                        : item.hint}
                    </span>
                  </button>

                  {showChildren && (
                    <ul className="mt-0.5 ml-3 animate-fade-up space-y-0.5 border-l border-border pl-2">
                      {item.children!.map((child) => {
                        const childActive = ancestryTab === 'heritage'
                        return (
                          <li key={child.id}>
                            <button
                              type="button"
                              title={
                                childActive
                                  ? 'Clique de novo para voltar à ancestralidade'
                                  : 'Abrir herança'
                              }
                              onClick={() => {
                                if (ancestryTab === 'heritage') {
                                  setAncestryTab('ancestry-main')
                                  return
                                }
                                setSection('ancestry')
                                setAncestryExpanded(true)
                                setAncestryTab('heritage')
                              }}
                              className={`w-full rounded-md px-2 py-1.5 text-left text-[11px] transition-colors ${
                                childActive
                                  ? 'bg-surface-3 text-accent'
                                  : 'text-text-dim hover:bg-surface-2 hover:text-text-muted'
                              }`}
                            >
                              {child.label}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-4 space-y-2 px-2">
            <div className="rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2.5 text-[11px]">
              <div className="font-display text-[9px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                Resumo
              </div>
              <dl className="mt-2 space-y-1.5 text-text-muted">
                <div className="flex justify-between gap-2">
                  <dt className="text-text-dim">Nível</dt>
                  <dd className="font-medium text-text">{current.level}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-dim">Ancestralidade</dt>
                  <dd className="truncate text-right font-medium text-text">
                    {ancestry?.name ?? '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-dim">Herança</dt>
                  <dd className="truncate text-right font-medium text-text">
                    {heritage?.name ?? '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-dim">Origem</dt>
                  <dd className="truncate text-right font-medium text-text">
                    {background?.name ?? '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-dim">Classe</dt>
                  <dd className="truncate text-right font-medium text-text">
                    {characterClass?.name ?? '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-text-dim">Moedas</dt>
                  <dd className="truncate text-right font-medium text-text">
                    {formatCoinsCp(current.coinsCp ?? 0)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto p-4">
          <div className="mb-3 flex flex-wrap gap-1 md:hidden">
            {NAV.filter((item) => item.id !== 'mythic' || mythicRules).map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={section === item.id ? 'accent' : 'secondary'}
                onClick={() => {
                  if (item.id === 'ancestry') {
                    if (section === 'ancestry') {
                      if (ancestryExpanded) {
                        setAncestryExpanded(false)
                        setAncestryTab('ancestry-main')
                      } else {
                        setAncestryExpanded(true)
                      }
                      return
                    }
                    setSection('ancestry')
                    setAncestryExpanded(true)
                    setAncestryTab('ancestry-main')
                    return
                  }
                  setFeatFocusSlotId(null)
                  openEditorSection(item.id)
                }}
              >
                {item.label}
              </Button>
            ))}
            {section === 'ancestry' && ancestryExpanded && (
              <Button
                size="sm"
                variant={ancestryTab === 'heritage' ? 'accent' : 'secondary'}
                onClick={() =>
                  setAncestryTab(
                    ancestryTab === 'heritage' ? 'ancestry-main' : 'heritage',
                  )
                }
              >
                Herança
              </Button>
            )}
          </div>

          {checklist && (
            <CreationChecklistBanner
              checklist={checklist}
              onJump={jumpToCreationStep}
            />
          )}

          {section === 'sheet' && (
            <div className="animate-fade-up space-y-4">
              <div className="grid gap-4 xl:grid-cols-[17rem_1fr]">
                <aside className="space-y-3 xl:sticky xl:top-2 xl:self-start">
                  <section className="overflow-hidden rounded-2xl border border-border/90 bg-surface-1">
                    <div className="flex flex-col items-center border-b border-border/60 bg-gradient-to-b from-surface-2/80 to-transparent px-3 pb-3 pt-4">
                      <PortraitPicker
                        characterId={current.id}
                        portraitId={current.portraitId}
                        onSelect={(file, mime) => setPortrait(file, mime)}
                        onTransformChange={(transform) =>
                          updatePortraitTransform(transform)
                        }
                        onRemove={() => clearPortrait()}
                      />
                    </div>
                    <div className="space-y-3 p-4">
                      <div>
                        <h2 className="font-display text-base font-semibold tracking-wide text-text">
                          Identidade
                        </h2>
                        <p className="mt-0.5 text-[11px] text-text-dim">
                          Nome e nível da ficha
                        </p>
                      </div>
                      <Field label="Nome">
                        <Input
                          value={current.name}
                          onChange={(e) =>
                            updateCurrent({ name: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Jogador">
                        <Input
                          placeholder="Opcional"
                          value={current.playerName ?? ''}
                          onChange={(e) =>
                            updateCurrent({
                              playerName: e.target.value || undefined,
                            })
                          }
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Nível">
                          <Input
                            type="number"
                            min={1}
                            max={20}
                            value={current.level}
                            onChange={(e) =>
                              applyCharacterLevel(
                                Math.max(1, Number(e.target.value) || 1),
                              )
                            }
                          />
                        </Field>
                        <Field label="XP">
                          <Input
                            type="number"
                            min={0}
                            value={current.xp}
                            onChange={(e) =>
                              updateCurrent({
                                xp: Math.max(0, Number(e.target.value) || 0),
                              })
                            }
                          />
                        </Field>
                      </div>
                    </div>
                  </section>
                </aside>

                <CharacterSheetView
                  sheet={sheet}
                  showBreakdown={settings?.showModifierBreakdown ?? true}
                  onBackgroundClick={() => setSection('background')}
                  onAncestryClick={() => {
                    setSection('ancestry')
                    setAncestryTab('ancestry-main')
                    setAncestryExpanded(true)
                  }}
                  onHeritageClick={() => {
                    setSection('ancestry')
                    setAncestryTab('heritage')
                    setAncestryExpanded(true)
                  }}
                  onClassClick={() => setSection('class')}
                  onDeityClick={() => setSection('deity')}
                  onMythicClick={
                    mythicRules ? () => setSection('mythic') : undefined
                  }
                  onArchetypesClick={() => setSection('archetypes')}
                  onFeatsClick={() => setSection('feats')}
                  onCombatClick={() => setSection('combat')}
                  onSpellsClick={() => setSection('spells')}
                  onEquipmentClick={() => setSection('equipment')}
                  onCurrentHpChange={(currentHp) =>
                    updateCurrent({ currentHp })
                  }
                  onHeroPointsChange={(heroPoints) =>
                    updateCurrent({ heroPoints })
                  }
                  onMythicPointsChange={(mythicPoints) =>
                    updateCurrent({ mythicPoints })
                  }
                  onClassTrackersChange={(classTrackers) =>
                    updateCurrent({ classTrackers })
                  }
                  onCustomSkillsChange={(customSkills) =>
                    updateCurrent({ customSkills })
                  }
                  onSkillChoice={(store, key, skillId) => {
                    if (store === 'feat') {
                      const next = { ...(current.featChoices ?? {}) }
                      if (skillId) next[key] = skillId
                      else delete next[key]
                      updateCurrent({ featChoices: next })
                      return
                    }
                    if (store === 'class') {
                      const choices =
                        current.classChoices ?? emptyClassChoices()
                      const featurePicks = { ...(choices.featurePicks ?? {}) }
                      if (skillId) featurePicks[key] = skillId
                      else delete featurePicks[key]
                      updateCurrent({
                        classChoices: { ...choices, featurePicks },
                      })
                      return
                    }
                    if (store === 'deity') {
                      const choices =
                        current.deityChoices ?? emptyDeityChoices()
                      const next: DeityChoices = { ...choices }
                      if (key === 'font') {
                        next.font = skillId as DeityChoices['font']
                      } else if (key === 'sanctification') {
                        next.sanctification =
                          skillId as DeityChoices['sanctification']
                      } else if (key === 'domain') {
                        next.domainId = skillId
                      }
                      updateCurrent({ deityChoices: next })
                      return
                    }
                    const choices =
                      current.ancestryChoices ?? emptyAncestryChoices()
                    updateCurrent({
                      ancestryChoices: {
                        ...choices,
                        heritageChoices: {
                          ...choices.heritageChoices,
                          [key]: skillId,
                        },
                      },
                    })
                  }}
                />
              </div>
            </div>
          )}

          {section === 'background' && (
            <div className="animate-fade-up space-y-3">
              {current.backgroundId && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                  <span>
                    Origem atual:{' '}
                    <strong className="text-accent">
                      {background?.name ?? 'Desconhecida'}
                    </strong>
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSection('sheet')}
                    >
                      Voltar à ficha
                    </Button>
                    <Button size="sm" variant="danger" onClick={clearBackground}>
                      Remover origem
                    </Button>
                  </div>
                </div>
              )}
              <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                <BackgroundBrowser
                  backgrounds={backgrounds}
                  sources={sources}
                  selectedId={current.backgroundId}
                  initialChoices={current.backgroundChoices}
                  onConfirm={applyBackground}
                  mode="select"
                  characterLevel={current.level}
                  skillRanks={
                    sheet
                      ? Object.fromEntries(
                          sheet.skills.map((skill) => [skill.id, skill.rank]),
                        )
                      : undefined
                  }
                />
              </div>
            </div>
          )}

          {section === 'ancestry' && (
            <div className="animate-fade-up space-y-3">
              {ancestryTab === 'ancestry-main' ? (
                <>
                  {current.ancestryId && (
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                      <span>
                        Ancestralidade atual:{' '}
                        <strong className="text-accent">
                          {ancestry?.name ?? 'Desconhecida'}
                        </strong>
                        {heritage && (
                          <span className="text-text-muted">
                            {' '}
                            · Herança: {heritage.name}
                          </span>
                        )}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSection('sheet')}
                        >
                          Voltar à ficha
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={clearAncestry}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                    <AncestryBrowser
                      ancestries={ancestries}
                      heritages={heritages}
                      sources={sources}
                      selectedId={current.ancestryId}
                      selectedHeritageId={current.heritageId}
                      initialChoices={current.ancestryChoices}
                      characterLevel={current.level}
                      intelligenceModifier={intelligenceWithoutAncestry}
                      extraLanguageSlots={sheet.languageSlotBonus ?? 0}
                      feats={feats}
                      onConfirm={applyAncestry}
                      onOpenHeritage={() => setAncestryTab('heritage')}
                    />
                  </div>
                </>
              ) : (
                <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                  <HeritagePicker
                    ancestry={ancestry ?? null}
                    heritages={heritages}
                    sources={sources}
                    selectedHeritageId={current.heritageId}
                    ancestryChoices={current.ancestryChoices}
                    characterLevel={current.level}
                    feats={feats}
                    onConfirm={applyHeritage}
                    onClear={clearHeritage}
                    onBackToAncestry={() => setAncestryTab('ancestry-main')}
                  />
                </div>
              )}
            </div>
          )}

          {section === 'class' && (
            <div className="animate-fade-up space-y-3">
              {current.classId && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                  <span>
                    Classe atual:{' '}
                    <strong className="text-accent">
                      {characterClass?.name ?? 'Desconhecida'}
                    </strong>
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSection('sheet')}
                    >
                      Voltar à ficha
                    </Button>
                    <Button size="sm" variant="danger" onClick={clearClass}>
                      Remover classe
                    </Button>
                  </div>
                </div>
              )}
              <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                <ClassBrowser
                  classes={classes}
                  sources={sources}
                  selectedId={current.classId}
                  initialChoices={mergeFeatChoicesIntoClassPicks(
                    current.classChoices,
                    current.featChoices,
                  )}
                  characterLevel={current.level}
                  intelligenceModifier={intelligenceWithoutClass}
                  feats={feats}
                  excludeClassId={dualClass ? current.secondClassId : null}
                  onConfirm={applyClass}
                />
              </div>
              {dualClass ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                    <span>
                      2ª classe:{' '}
                      <strong className="text-accent">
                        {secondCharacterClass?.name ?? 'nenhuma'}
                      </strong>
                    </span>
                    {current.secondClassId ? (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          updateCurrent({
                            secondClassId: null,
                            secondClassChoices: null,
                          })
                        }
                      >
                        Remover 2ª classe
                      </Button>
                    ) : null}
                  </div>
                  <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                    <ClassBrowser
                      classes={classes}
                      sources={sources}
                      selectedId={current.secondClassId}
                      initialChoices={
                        current.secondClassChoices ?? emptyClassChoices()
                      }
                      characterLevel={current.level}
                      intelligenceModifier={intelligenceWithoutClass}
                      feats={feats}
                      excludeClassId={current.classId}
                      confirmLabel="Aplicar 2ª classe"
                      onConfirm={(classId, choices) => {
                        updateCurrent({
                          secondClassId: classId,
                          secondClassChoices: choices,
                          featSelections: pruneFeatSelections(
                            {
                              ...current!,
                              secondClassId: classId,
                              secondClassChoices: choices,
                            },
                            feats,
                            characterClass,
                            heritage,
                            {
                              ...featVariantOptions,
                              secondClass: getClassById(classId) ?? null,
                            },
                          ),
                        })
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {section === 'deity' && (
            <div className="animate-fade-up space-y-3">
              {current.deityId && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                  <span>
                    Divindade atual:{' '}
                    <strong className="text-accent">
                      {sheet.deityName ?? 'Desconhecida'}
                    </strong>
                    {classRequiresDeity(current.classId)
                      ? ' · benefícios de clérigo/campeão ativos'
                      : ' · veneração (sem treino automático de perícia)'}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSection('sheet')}
                    >
                      Voltar à ficha
                    </Button>
                    <Button size="sm" variant="danger" onClick={clearDeity}>
                      Remover divindade
                    </Button>
                  </div>
                </div>
              )}
              {classRequiresDeity(current.classId) && !current.deityId && (
                <p className="rounded-xl border border-accent/30 bg-accent/8 px-3 py-2 text-sm text-text-muted">
                  {characterClass?.name ?? 'Esta classe'} precisa de uma
                  divindade: perícia divina, arma favorita, santificação e
                  (clérigo) fonte e magias extras.
                </p>
              )}
              <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                <DeityBrowser
                  mode="select"
                  selectedId={current.deityId}
                  onConfirm={applyDeity}
                  onClear={clearDeity}
                />
              </div>
            </div>
          )}

          {section === 'mythic' && mythicRules && (
            <div className="animate-fade-up space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm">
                <span>
                  {current.mythicCallingId
                    ? `Chamado atual: ${sheet.mythicCallingName ?? 'escolhido'}`
                    : 'Escolha o chamado — o motor não escolhe.'}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSection('sheet')}
                >
                  Voltar à ficha
                </Button>
              </div>
              <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                <MythicCallingPanel
                  selectedId={current.mythicCallingId}
                  onSelect={(mythicCallingId) =>
                    updateCurrent({
                      mythicCallingId,
                      mythicPoints: current.mythicPoints ?? 3,
                    })
                  }
                  onClear={() =>
                    updateCurrent({
                      mythicCallingId: null,
                      mythicPoints: null,
                    })
                  }
                />
              </div>
            </div>
          )}

          {section === 'archetypes' && (
            <ArchetypePanel
              progress={sheet.archetypes}
              feats={feats}
              character={current}
              heritage={heritage}
              skillRanks={Object.fromEntries(
                sheet.skills.map((s) => [s.id, s.rank]),
              )}
              attributeModifiers={Object.fromEntries(
                sheet.attributes.map((a) => [a.id, a.modifier]),
              )}
              freeArchetype={freeArchetype}
              ignoreDedicationLock={ignoreDedicationLock}
              mythicRules={mythicRules}
              onGoToFeats={() => setSection('feats')}
            />
          )}

          {section === 'feats' && (
            <div className="animate-fade-up space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface-1 px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">Feitos</p>
                  <p className="text-[11px] text-text-dim">
                    {[
                      ancestry?.name,
                      characterClass?.name,
                      freeArchetype ? 'Arquétipos grátis' : null,
                      mythicRules
                        ? current.mythicCallingId
                          ? 'Mítico'
                          : 'Mítico — escolha o chamado'
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || 'Este personagem'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSection('progression')}
                  >
                    Progressão
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSection('sheet')}
                  >
                    Voltar à ficha
                  </Button>
                </div>
              </div>
              <div className="h-[calc(100vh-11rem)] min-h-[28rem]">
                <FeatBrowser
                  feats={feats}
                  sources={sources}
                  character={current}
                  characterClass={characterClass}
                  heritage={heritage}
                  ancestryName={ancestry?.name}
                  classLabel={characterClass?.name}
                  selections={current.featSelections ?? []}
                  onChange={applyFeatSelections}
                  initialSlotId={featFocusSlotId}
                  freeArchetype={freeArchetype}
                  ignoreDedicationLock={ignoreDedicationLock}
                  mythicRules={mythicRules}
                  ancestryParagon={ancestryParagon}
                  secondClass={secondCharacterClass}
                  skillRanks={Object.fromEntries(
                    sheet.skills.map((s) => [s.id, s.rank]),
                  )}
                  attributeModifiers={Object.fromEntries(
                    sheet.attributes.map((a) => [a.id, a.modifier]),
                  )}
                  grantedFeatPicks={sheet.grantedFeatPicks}
                  onFeatChoice={(key, featId) => {
                    if (key.startsWith('class:')) {
                      const choiceId = key.slice('class:'.length)
                      const choices =
                        current.classChoices ?? emptyClassChoices()
                      const featurePicks = { ...(choices.featurePicks ?? {}) }
                      if (featId) featurePicks[choiceId] = featId
                      else delete featurePicks[choiceId]
                      updateCurrent({
                        classChoices: { ...choices, featurePicks },
                      })
                      return
                    }
                    const next = { ...(current.featChoices ?? {}) }
                    if (featId) next[key] = featId
                    else delete next[key]
                    updateCurrent({ featChoices: next })
                  }}
                />
              </div>
            </div>
          )}

          {section === 'progression' && (
            <ProgressionPanel
              character={current}
              characterClass={characterClass}
              feats={feats}
              baseSkillRanks={baseSkillRanks}
              freeArchetype={freeArchetype}
              mythicRules={mythicRules}
              ancestryParagon={ancestryParagon}
              secondClass={secondCharacterClass}
              gradualAbilityBoosts={gradualAbilityBoosts}
              initialFocusLevel={progressionFocusLevel}
              onChangeLevel={applyCharacterLevel}
              onChangeXp={(xp) => updateCurrent({ xp })}
              onChangeLevelBoosts={(levelAttributeBoosts) =>
                updateCurrent({ levelAttributeBoosts })
              }
              onChangeGradualBoosts={(gradualAttributeBoosts) =>
                updateCurrent({ gradualAttributeBoosts })
              }
              automaticBonusProgression={automaticBonusProgression}
              onChangeAbpSkills={(abpSkillPotencies) =>
                updateCurrent({ abpSkillPotencies })
              }
              onChangeAbpApex={(abpApexAttributeId) =>
                updateCurrent({ abpApexAttributeId })
              }
              onChangeSkillIncreases={(skillIncreases: SkillIncreaseEntry[]) =>
                updateCurrent({ skillIncreases })
              }
              onChooseFeatSlot={openFeatSlot}
            />
          )}

          {section === 'combat' && (
            <CombatPanel
              sheet={sheet}
              onCurrentHpChange={(currentHp) => updateCurrent({ currentHp })}
              onHeroPointsChange={(heroPoints) => updateCurrent({ heroPoints })}
              onMythicPointsChange={(mythicPoints) =>
                updateCurrent({ mythicPoints })
              }
              onDismissActiveEffect={(effectId) => {
                const result = dismissActiveItemEffect(
                  current.activeItemEffects ?? [],
                  current.equipment ?? [],
                  effectId,
                )
                updateCurrent({
                  activeItemEffects: result.effects,
                  equipment: result.items,
                })
              }}
              onSpendWeaponPoison={(weaponId) =>
                updateCurrent({
                  equipment: spendWeaponPoison(
                    current.equipment ?? [],
                    weaponId,
                  ),
                })
              }
              onActivateTalisman={(hostId) => {
                const result = activateAffixedTalisman(
                  current.equipment ?? [],
                  current.activeItemEffects ?? [],
                  hostId,
                  createId('fx'),
                )
                updateCurrent({
                  equipment: result.items,
                  activeItemEffects: result.effects,
                })
              }}
              onChangeEquipment={(equipment) => updateCurrent({ equipment })}
              onChangeActiveEffects={(activeItemEffects) =>
                updateCurrent({ activeItemEffects })
              }
              onClassTrackersChange={(classTrackers) =>
                updateCurrent({ classTrackers })
              }
              onChangeSpellState={(spellState) => updateCurrent({ spellState })}
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
              onDailyReset={() => {
                const access = sheet.spellcasting
                updateCurrent({
                  spellState:
                    access?.hasAccess
                      ? applyDailyPreparations(current.spellState, access)
                      : current.spellState,
                  equipment: refreshDailyMagicItems(
                    current.equipment ?? [],
                    access?.highestSlotRank ?? 0,
                  ),
                })
              }}
            />
          )}

          {section === 'companions' && (
            <CompanionsPanel
              sheet={sheet}
              companions={current.companions}
              onChange={(companions) => updateCurrent({ companions })}
            />
          )}

          {section === 'spells' && (
            <SpellsPanel
              character={current}
              characterClass={characterClass}
              attrMap={Object.fromEntries(
                sheet.attributes.map((a) => [a.id, a.modifier]),
              )}
              spellcasting={sheet.spellcasting}
              skills={sheet.skills}
              onChangeSpellState={(spellState) =>
                updateCurrent({ spellState })
              }
              onChangeClassChoices={(classChoices) =>
                updateCurrent({ classChoices })
              }
              onRefreshMagicItems={() =>
                updateCurrent({
                  equipment: refreshDailyMagicItems(
                    current.equipment ?? [],
                    sheet.spellcasting?.highestSlotRank ?? 0,
                  ),
                })
              }
            />
          )}

          {section === 'equipment' && (
            <div className="space-y-3">
            <EquipmentPanel
              items={current.equipment ?? []}
              activeEffects={current.activeItemEffects ?? []}
              sheet={sheet}
              coinsCp={current.coinsCp ?? 0}
              startingWealth={current.startingWealth ?? null}
              classId={current.classId ?? null}
              onChange={(equipment) => updateCurrent({ equipment })}
              onChangeActiveEffects={(activeItemEffects) =>
                updateCurrent({ activeItemEffects })
              }
              onChangeCoins={(coinsCp) => updateCurrent({ coinsCp })}
              onApplyStartingWealth={(kind) => {
                const result = applyStartingWealth(current, kind)
                if ('error' in result) return
                updateCurrent({
                  equipment: result.equipment,
                  coinsCp: result.coinsCp,
                  startingWealth: result.startingWealth,
                })
              }}
            />
            <FormulaBookPanel
              knownIds={current.formulaKnownIds ?? []}
              characterLevel={current.level}
              onChange={(formulaKnownIds) => updateCurrent({ formulaKnownIds })}
            />
            </div>
          )}

          {section === 'connections' && (
            <ConnectionsPanel
              sheet={sheet}
              connections={current.connections ?? []}
              onChange={(connections) => updateCurrent({ connections })}
            />
          )}

          {section === 'identity' && (
            <IdentityPanel
              identity={current.identity}
              pfs={current.pfs}
              onChangeIdentity={(identity) => updateCurrent({ identity })}
              onChangePfs={(pfs) => updateCurrent({ pfs })}
            />
          )}

          {section === 'notes' && (
            <div className="animate-fade-up h-[calc(100vh-9rem)] min-h-[28rem]">
              <NotesBoard
                notes={current.stickyNotes ?? []}
                onChange={(stickyNotes) =>
                  updateCurrent({ stickyNotes, notes: '' })
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
