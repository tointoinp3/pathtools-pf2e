import type { AttributeId, ProficiencyRank, Rarity, SkillId } from './core'
import type { AncestryChoices, ResolvedImmunity, ResolvedResistance } from './ancestry'
import type { BackgroundChoices } from './background'
import type { CreatureSize } from './ancestry'
import type { ClassChoices, ResolvedClassProficiency } from './class'
import type { CharacterConnection, ResolvedConnection } from './connections'
import type {
  ActiveItemEffect,
  EquipmentItem,
  ResolvedActiveItemEffect,
  ResolvedEquipment,
} from './equipment'
import type { CharacterCompanions } from './companion'
import type { ArchetypeProgress } from './archetype'
import type { FeatSelection } from './feat'
import type { CharacterSpellState, ResolvedSpellcastingAccess } from './spell'
import type { DeityChoices } from './deity'
import type { ClassSignatureKit } from './classSignature'
import type { InventorOverdriveState } from './catalogEffects'
import type { ActiveCondition, ResolvedConditionEffects } from './condition'

/** Níveis em que o personagem ganha 4 boosts de atributo (Player Core) */
export type LevelAttributeBoostLevel = 5 | 10 | 15 | 20

/** Um aumento de perícia concedido em um nível específico */
export interface SkillIncreaseEntry {
  level: number
  skillId: SkillId
}

/** Tamanho do quadro do retrato na ficha */
export type PortraitFrameSize = 'sm' | 'md' | 'lg'

export const HERO_POINTS_MAX_BASE = 3
export const HERO_POINTS_START_BASE = 1

/** Transformação visual do retrato (zoom + pan) */
export interface PortraitTransform {
  /** Zoom relativo (1 = enquadramento padrão) */
  zoom: number
  /** Deslocamento horizontal em % do quadro (-50 … 50) */
  offsetX: number
  /** Deslocamento vertical em % do quadro (-50 … 50) */
  offsetY: number
  frameSize: PortraitFrameSize
}

export const DEFAULT_PORTRAIT_TRANSFORM: PortraitTransform = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  frameSize: 'md',
}

/** Retrato armazenado como Blob separado */
export interface PortraitRecord {
  id: string
  characterId: string
  blob: Blob
  mimeType: string
  /** Ajustes de enquadramento; opcional para retratos antigos */
  transform?: PortraitTransform
  updatedAt: string
}

/** Instância de Lore no personagem */
export interface LoreEntry {
  id: string
  name: string
  /** Fonte que concedeu (background, manual, etc.) */
  sourceType: string
  sourceId: string
}

/** Perícia customizada (homebrew) do personagem */
export interface CustomSkillEntry {
  id: string
  name: string
  attributeId: AttributeId
  rank: ProficiencyRank
  notes?: string
}

/** Feito concedido registrado no personagem (contribuição) */
export interface GrantedFeat {
  id: string
  featId?: string
  featName: string
  originalName?: string
  featType?: string
  description?: string
  /** Custo de ação PF2e, se o feito tiver */
  actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
  /** Traços do feito (Impulso, Transbordamento…). */
  traits?: string[]
  trigger?: string
  frequency?: string
  rarity?: Rarity
  aonUrl?: string
  level?: number
  sourceType: string
  sourceId: string
  sourceLabel: string
}

/** CD de classe resolvida (valor pronto para a ficha) */
export interface ResolvedClassDc {
  label: string
  rank: ProficiencyRank
  /** 10 + proficiência + atributo-chave */
  value: number | null
  pending: boolean
  pendingReason?: string
  keyAttributeId?: AttributeId
  keyAttributeModifier?: number
  proficiencyBonus?: number
  breakdown: Array<{ label: string; value: number | string }>
}

/** Cor de fundo de uma nota do mural */
export type StickyNoteColor =
  | 'parchment'
  | 'amber'
  | 'sage'
  | 'rose'
  | 'sky'
  | 'slate'

/** Nota individual no mural do personagem */
export interface CharacterStickyNote {
  id: string
  /** Título opcional */
  title?: string
  body: string
  color: StickyNoteColor
  /** Posição no mural (px) */
  x: number
  y: number
  /** Tamanho customizável (px) */
  width: number
  height: number
  zIndex: number
  /** Fica no topo da lista e do mural */
  pinned?: boolean
  createdAt: string
  updatedAt: string
}

/** Detalhes finais da ficha (Player Core: finishing details). */
export interface CharacterIdentity {
  concept?: string
  age?: string
  height?: string
  weight?: string
  gender?: string
  appearance?: string
  personality?: string
  beliefs?: string
}

/** Pathfinder Society — número do jogador e da ficha. */
export interface CharacterPfsInfo {
  playerNumber?: string
  characterNumber?: string
  faction?: string
}

/** Estado persistido do personagem — valores derivados NÃO são salvos */

/** Trackers de mesa das assinaturas de classe. */
export interface CharacterClassTrackers {
  /** Cargas de Golpe Mágico disponíveis (padrão = máximo). */
  magusSpellstrikeCharges?: number
  /** Aura cinética ligada (Canalizar Elementos). */
  kineticAuraActive?: boolean
  /** Servos atuais no campo (1 PV cada, 1 min). */
  necromancerThralls?: number
  /** Inventor: resultado da Sobrecarga. */
  inventorOverdrive?: InventorOverdriveState
  /** Exemplar: ícone com a faísca. */
  exemplarSparkIkonId?: string | null
  /** Taumaturgo: Explorar Vulnerabilidade ativo. */
  thaumaturgeExploit?: boolean
  /** Taumaturgo: empunha implemento (Empoderamento). Padrão true. */
  thaumaturgeImplementInHand?: boolean
  /** Alquimista: frascos versáteis atuais. */
  alchemistVials?: number
  /** Toggles genéricos (ex.: etched:rune-holtrik). */
  kitToggles?: Record<string, boolean>
}

export interface Character {
  id: string
  name: string
  playerName?: string
  level: number
  xp: number
  /** ID do retrato na tabela portraits (se houver) */
  portraitId?: string | null
  ancestryId?: string | null
  heritageId?: string | null
  ancestryChoices?: AncestryChoices | null
  backgroundId?: string | null
  backgroundChoices?: BackgroundChoices | null
  classId?: string | null
  classChoices?: ClassChoices | null
  /** Divindade venerada (catálogo Remaster). */
  deityId?: string | null
  deityChoices?: DeityChoices | null
  /** Feitos escolhidos nos slots (ancestralidade / classe / perícia / geral) */
  featSelections?: FeatSelection[]
  /**
   * Escolhas extras de feitos (perícia alternativa quando o feito
   * treina algo que o personagem já tinha).
   */
  featChoices?: Record<string, string>
  /**
   * Boosts de atributo por nível de progressão (5 / 10 / 15 / 20).
   * Cada conjunto: até 4 AttributeId distintos (+1 no modificador cada).
   */
  levelAttributeBoosts?: Partial<
    Record<LevelAttributeBoostLevel, AttributeId[]>
  >
  /**
   * Variante Aumentos graduais: 1 atributo por nível (conjuntos de 4).
   * Chave = nível (2, 3, 4…).
   */
  gradualAttributeBoosts?: Partial<Record<number, AttributeId>>
  /** Segunda classe (variante Classe dupla). */
  secondClassId?: string | null
  secondClassChoices?: ClassChoices | null
  /**
   * Progressão automática de bônus: cada entrada é +1 de potência numa perícia
   * (máx. +3 na mesma). Quantidade de slots = nível (5 / 8 / 13 / 14).
   */
  abpSkillPotencies?: SkillId[]
  /** Atributo no ápice automático (17º nível, variante ABP). */
  abpApexAttributeId?: AttributeId | null
  /** IDs de itens do catálogo no livro de fórmulas. */
  formulaKnownIds?: string[]
  /** Detalhes finais (Player Core): conceito, aparência, PFS. */
  identity?: CharacterIdentity
  pfs?: CharacterPfsInfo
  /**
   * Aumentos de perícia ganhos por nível (um por slot da tabela da classe).
   */
  skillIncreases?: SkillIncreaseEntry[]
  /**
   * Boosts livres manuais / ajustes avulsos.
   * Boosts de ancestralidade, origem e classe vivem nas respectivas choices.
   */
  attributeBoosts?: Partial<Record<AttributeId, number>>
  /** Perícias homebrew além das 16 oficiais */
  customSkills?: CustomSkillEntry[]
  /**
   * PV atuais (tracker de mesa). Se omitido, assume PV cheios (= máximo derivado).
   */
  currentHp?: number | null
  /**
   * Pontos de herói atuais (Player Core). Se omitido, usa o valor de início
   * de sessão (1 + conexões em `heroPoints.start`).
   * Com regras míticas e chamado escolhido, a ficha usa Pontos Míticos
   * no lugar (você não ganha pontos de herói).
   */
  heroPoints?: number | null
  /** Chamado mítico (War of Immortals). O jogador escolhe. */
  mythicCallingId?: string | null
  /**
   * Pontos Míticos atuais (máx. 3, começam em 3 na sessão).
   * Só valem com regras míticas ligadas e chamado escolhido.
   */
  mythicPoints?: number | null
  /**
   * Moedas em peças de cobre (1 po = 100 pc). Kit inicial ou 15 po.
   */
  coinsCp?: number
  /**
   * Riqueza de 1º nível já aplicada (15 po ou kit da classe).
   * Impede receber duas vezes.
   */
  startingWealth?: {
    kind: 'coins' | 'kit'
    kitId?: string
  } | null
  /** Itens no personagem (instâncias; `definitionId` liga ao catálogo) */
  equipment?: EquipmentItem[]
  /**
   * Grupo da mesa (campanha). `null` = ficha órfã, visível quando
   * nenhum grupo está ativo.
   */
  groupId?: string | null
  /**
   * Efeitos de itens consumíveis ainda ativos (mutagênico, elixir, etc.).
   * Beber outro da mesma família substitui o anterior.
   */
  activeItemEffects?: ActiveItemEffect[]
  /**
   * Companheiro animal e/ou familiar|pet (Remaster).
   * Catálogo de fichas de tipo vem depois; estado e habilidades já persistem.
   */
  companions?: CharacterCompanions | null
  /**
   * Conexões: efeitos manuais ligados a feitos/itens/etc.
   * Flat ou fórmula (ex.: CON * 2 em PV máximo, +1 em perícia, CD de magia).
   */
  connections?: CharacterConnection[]
  /**
   * Trackers de mesa das assinaturas de classe (Golpe Mágico, aura cinética, servos).
   */
  classTrackers?: CharacterClassTrackers
  /**
   * Condições ativas na mesa (assustado, ferido, desprevenido…).
   * Penalidades numéricas entram no motor da ficha.
   */
  activeConditions?: ActiveCondition[]
  /**
   * @deprecated Preferir stickyNotes (mural). Mantido para migrar fichas antigas.
   */
  notes?: string
  /** Mural de notas do personagem */
  stickyNotes?: CharacterStickyNote[]
  /**
   * Estado mínimo de magias (preparos / lista de teste).
   * Scaffold — catálogo completo e slots por posto vêm depois.
   */
  spellState?: CharacterSpellState
  createdAt: string
  updatedAt: string
}

/** Visão resolvida de um atributo */
export interface ResolvedAttribute {
  id: AttributeId
  modifier: number
  contributions: Array<{ label: string; value: number; sourceType: string }>
}

/** De onde veio o treino da perícia */
export interface SkillRankSource {
  label: string
  rank: ProficiencyRank
}

/** Escolha pendente na ficha (perícia, salvaguarda, idioma, lore…). */
export type PendingFeatChoiceKind =
  | 'skill'
  | 'save'
  | 'tradition'
  | 'attribute'
  | 'lore'
  | 'language'
  | 'ancestry'
  | 'saveOrPerception'
  | 'text'
  | 'font'
  | 'sanctification'
  | 'domain'
  | 'feat'

export interface PendingSkillChoice {
  key: string
  store: 'feat' | 'heritage' | 'deity' | 'class'
  label: string
  hint: string
  options: string[]
  selected?: string
  valueKind?: PendingFeatChoiceKind
  /** `text` = o jogador escreve (Conhecimento, arma avançada). */
  inputKind?: 'select' | 'text'
  optionLabels?: Record<string, string>
  placeholder?: string
  /** Lista rica para `valueKind: 'feat'` (seletor de feito filho). */
  featOptions?: GrantedFeatPickOption[]
  /** Texto de cada opção (recurso de classe, instinto, etc.). */
  optionDescriptions?: Record<string, string>
}

/** Visão resolvida de uma perícia */
export interface ResolvedSkill {
  id: SkillId
  attributeId: AttributeId
  rank: ProficiencyRank
  modifier: number
  breakdown: Array<{ label: string; value: number }>
  rankSources?: SkillRankSource[]
}

/** Visão resolvida de uma Lore */
export interface ResolvedLore {
  id: string
  name: string
  rank: ProficiencyRank
  modifier: number
  breakdown: Array<{ label: string; value: number }>
  sourceLabel?: string
}

/** Visão resolvida de perícia homebrew */
export interface ResolvedCustomSkill {
  id: string
  name: string
  attributeId: AttributeId
  rank: ProficiencyRank
  modifier: number
  breakdown: Array<{ label: string; value: number }>
  notes?: string
}

export interface GrantedFeatPickOption {
  id: string
  name: string
  originalName?: string
  level: number
  actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
  traits: string[]
  description: string
  available: boolean
  reasons: string[]
}

/** Escolha de feito concedido por outro feito (ex.: Manobra Básica). */
export interface GrantedFeatPick {
  key: string
  parentFeatId: string
  parentName: string
  hint: string
  selectedFeatId?: string
  options: GrantedFeatPickOption[]
}

/** Estatísticas derivadas (podem ser pendentes) */
export interface DerivedStat {
  key: string
  label: string
  value: number | null
  pending: boolean
  pendingReason?: string
  provisional?: boolean
  breakdown?: Array<{ label: string; value: number | string }>
}

export interface ResolvedCharacterSheet {
  character: Character
  attributes: ResolvedAttribute[]
  skills: ResolvedSkill[]
  customSkills: ResolvedCustomSkill[]
  lores: ResolvedLore[]
  feats: GrantedFeat[]
  /** O feito/herança pede outra perícia no lugar de uma que já estava treinada. */
  pendingSkillChoices?: PendingSkillChoice[]
  /** Feito de arquétipo que pede um feito de classe filho (Manobra Básica…). */
  grantedFeatPicks?: GrantedFeatPick[]
  /** Arquétipos iniciados (Dedicação ± feitos), na ordem das Dedicações. */
  archetypes: ArchetypeProgress[]
  senses: Array<{ id: string; name: string; description: string; sourceLabel: string }>
  specialAbilities: Array<{
    id: string
    name: string
    description: string
    sourceLabel: string
    actionType?: string
  }>
  resistances: ResolvedResistance[]
  /** Fraquezas a dano (herança, conexões, etc.). */
  weaknesses: ResolvedResistance[]
  /** Imunidades (conexões; presença, sem número). */
  immunities: ResolvedImmunity[]
  languages: string[]
  /** Habilidades extras de familiar concedidas por feitos (ex.: Bruxaria Básica). */
  familiarAbilitySlotBonus?: number
  /**
   * Tamanho efetivo (ancestralidade ± conexões em `size`).
   * Sem ancestralidade: null.
   */
  size: CreatureSize | null
  /** Tamanho base da ancestralidade, antes de conexões */
  baseSize: CreatureSize | null
  /** Soma de conexões com alvo `size` (categorias: +1 = maior) */
  sizeShift: number
  /** Partes que alteraram o tamanho */
  sizeBreakdown: Array<{ label: string; value: number }>
  attackProficiencies: ResolvedClassProficiency[]
  defenseProficiencies: ResolvedClassProficiency[]
  /** Familiaridade com armas (feitos de ancestralidade, etc.). */
  weaponFamiliarities: Array<{
    sourceLabel: string
    itemsLabel: string
    rulesLabel: string
    critSpecReady: boolean
  }>
  /** Bônus de circunstância persistentes (não entram no número da perícia). */
  circumstanceBonuses: Array<{
    sourceLabel: string
    value: number
    appliesTo: string
  }>
  /**
   * CD de classe (10 + proficiência + atributo-chave).
   * Presente quando há classe; `pending` se o atributo-chave ainda não foi escolhido.
   */
  classDc?: ResolvedClassDc | null
  /** CDs extras de Dedicação (guerreiro, ladino, etc.). */
  extraClassDcs?: Array<{
    label: string
    rank: ProficiencyRank
    attributeId: AttributeId
    value: number
    extras?: Array<{ label: string; value: number }>
  }>
  /** Assinaturas de classe na mesa (Golpe Mágico, explosão, servos, kit, eidolon). */
  classSignature?: ClassSignatureKit
  /** Acesso a magia resolvido (ataque, CD, espaços, tradição) */
  spellcasting?: ResolvedSpellcastingAccess
  /** Conexões resolvidas (com valor calculado) */
  connections: ResolvedConnection[]
  /** Limite de carga (5 + FOR), já com bônus de conexões */
  bulkLimit: number
  /** Inventário resolvido (catálogo + itens livres) */
  equipment: ResolvedEquipment
  /** Mutagênicos e elixires ainda ativos */
  activeItemEffects: ResolvedActiveItemEffect[]
  /** Condições ativas e penalidades já aplicadas nos números abaixo. */
  conditionEffects?: ResolvedConditionEffects
  derived: {
    hp: DerivedStat
    ac: DerivedStat
    perception: DerivedStat
    /** Percepção + conexões de iniciativa (bônus só na rolagem de iniciativa). */
    initiative: DerivedStat
    fortitude: DerivedStat
    reflex: DerivedStat
    will: DerivedStat
    speed: DerivedStat
    /** PV temporários concedidos por conexões (0/null = oculto). */
    tempHp: DerivedStat
    /** Máximo de pontos de herói (base 3). */
    heroPointsMax: DerivedStat
    /** Quantos pontos de herói no início da sessão (base 1). */
    heroPointsStart: DerivedStat
    /** Máximo de Pontos Míticos (3). Só preenchido se o personagem for mítico. */
    mythicPointsMax?: DerivedStat
    /** Pontos Míticos no início da sessão (3). */
    mythicPointsStart?: DerivedStat
    /** Bônus de proficiência mítica (nível + 10). */
    mythicProficiency?: DerivedStat
  }
  mythicActive?: boolean
  mythicCallingName?: string
  mythicCallingOriginalName?: string
  /** Slots extras de idioma (conexões), somados à INT + ancestralidade. */
  languageSlotBonus?: number
  ancestryName?: string
  ancestrySourceLabel?: string
  heritageName?: string
  heritageSourceLabel?: string
  backgroundName?: string
  backgroundSourceLabel?: string
  className?: string
  classSourceLabel?: string
  deityName?: string
}
