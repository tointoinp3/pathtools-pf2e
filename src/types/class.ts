import type { LoreGrantRule, SkillGrantRule } from './background'
import type { AttributeId, ProficiencyRank, Provenance, Rarity, SkillId } from './core'
import type { SpecialAbilityDefinition } from './ancestry'
import type { SpellTradition, SpellcastingDefinition } from './spell'

/** Onde a magia concedida pela classe aparece na ficha */
export type GrantedSpellSlot = 'cantrip' | 'collection' | 'focus'

/**
 * Magia que a especialização (ou a classe) entrega sozinha.
 * `originalName` bate com o catálogo; `pickOne` pede escolha na aba Classe.
 */
export interface GrantedClassSpell {
  originalName?: string
  pickOneOriginalNames?: string[]
  /** Chave em `ClassChoices.grantedSpellPicks` */
  choiceId?: string
  slot: GrantedSpellSlot
  /** Nível do personagem em que entra (padrão 1) */
  minLevel?: number
  /** Rótulo na UI (Currículo, Linhagem, Musa…) */
  sourceLabel?: string
  /** Só aplica se o jogador escolheu este `spellPicks` */
  whenPick?: { choiceId: string; optionId: string }
  /** Só aplica se a perícia da especialização for esta (exemplar dracônico) */
  whenSkill?: SkillId
}

export interface ClassSpellPickOption {
  id: string
  name: string
  originalName?: string
}

/** Escolha extra que destranca magias (influência elemental, hex inicial…) */
export interface ClassSpellPick {
  id: string
  label: string
  description?: string
  options: ClassSpellPickOption[]
}

/** Como o personagem preenche o catálogo */
export type ClassCatalogKind = 'repertoire' | 'daily' | 'progression'

/** Quantos itens o nível libera (vale o maior `minLevel` ≤ nível atual) */
export interface ClassCatalogSlotRule {
  minLevel: number
  count: number
}

/** Bloco extra no cartão (imanência, invocação, vaso…) */
export interface ClassCatalogSection {
  label: string
  body: string
  actionType?: SpecialAbilityDefinition['actionType']
}

/** Uma opção escolhível (ícone, runa, tática, fórmula…) */
export interface ClassCatalogOption {
  id: string
  name: string
  originalName: string
  /** Agrupa na UI (arma, mobilidade, inicial…) */
  category?: string
  /** Nível mínimo para aprender / usar */
  level?: number
  rarity?: Rarity
  usage?: string
  description: string
  rulesSummary: string
  sections?: ClassCatalogSection[]
  actionType?: SpecialAbilityDefinition['actionType']
  traits?: string[]
  subclassIds?: string[]
  prerequisiteOptionIds?: string[]
  /** Perícia treinada ao escolher (epíteto-raiz) */
  skillId?: SkillId
  /** Lores concedidas enquanto sintonizado (aparição) */
  loreNames?: string[]
  loreExpertAtLevel?: number
  loreMasterAtLevel?: number
  sourceId?: string
  sourcePage?: number
}

export interface ClassCatalogConstraint {
  kind:
    | 'minCategory'
    | 'excludeSubclassId'
    | 'requireSubclass'
    | 'onePerCategory'
    | 'advancedWeaponSkipsInitial'
  category?: string
  count?: number
  message: string
}

/** Campo extra fora da lista (traje do inventor, varinha do taumaturgo) */
export interface ClassCatalogDetailField {
  id: string
  label: string
  description?: string
  subclassIds?: string[]
  kind: 'choice' | 'text' | 'weapon' | 'counter'
  options?: Array<{
    id: string
    name: string
    originalName?: string
    rulesSummary?: string
  }>
  /** Mostra o campo se a especialização ou um pick for um destes ids */
  showWhenOptionIds?: string[]
  required?: boolean
  /** Máximo do contador: 2+INT (frascos) ou 4+INT (infusões) */
  counterKind?: 'versatileVials' | 'infusedItems'
}

/**
 * Catálogo de escolhas da classe além de subclass/secondarySubclass.
 * Vive no código (não no Dexie) e é lido pela aba Classe.
 */
export interface ClassCatalogDefinition {
  id: string
  classId: string
  label: string
  originalName?: string
  description: string
  kind: ClassCatalogKind
  unique: boolean
  slotsByLevel: ClassCatalogSlotRule[]
  /** Soma o modificador de INT (mín. 0) ao total de vagas */
  addIntelligence?: boolean
  /** Nível mínimo por categoria (expert = 7º, etc.) */
  categoryMinLevel?: Record<string, number>
  pickMode?: 'count' | 'perCategory'
  /** Se perCategory: uma cota por categoria, desbloqueada no nível */
  picksPerCategory?: Array<{
    category: string
    minLevel: number
    count: number
  }>
  preparedSlotsByLevel?: ClassCatalogSlotRule[]
  preparedAddIntelligence?: boolean
  preparedLabel?: string
  preparedDescription?: string
  /** Preparados precisam estar em `catalogPicks` deste id (ou dos ids abaixo) */
  preparedFromPicks?: boolean
  preparedFromCatalogIds?: string[]
  allowPreparedDuplicates?: boolean
  primaryPick?: { label: string; description: string }
  constraints?: ClassCatalogConstraint[]
  filterBySubclass?: boolean
  searchPlaceholder?: string
  categoryLabels?: Record<string, string>
  options: ClassCatalogOption[]
  details?: ClassCatalogDetailField[]
  emptyHint?: string
}

/** Categoria de ataque / defesa para proficiências de classe */
export type AttackProficiencyCategory =
  | 'unarmed'
  | 'simple'
  | 'martial'
  | 'advanced'
  | 'bomb'
  | 'simpleFirearm'
  | 'martialFirearm'
  | 'advancedFirearm'

export type DefenseProficiencyCategory =
  | 'unarmored'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'allArmor'

export interface AttackProficiencyRule {
  category: AttackProficiencyCategory
  rank: ProficiencyRank
  label: string
}

export interface DefenseProficiencyRule {
  category: DefenseProficiencyCategory
  rank: ProficiencyRank
  label: string
}

/** Efeito mecânico de um recurso de classe (escala com nível) */
export type ClassFeatureEffect =
  | {
      kind: 'saveRank'
      save: 'fortitude' | 'reflex' | 'will'
      rank: ProficiencyRank
    }
  | { kind: 'perceptionRank'; rank: ProficiencyRank }
  | { kind: 'classDcRank'; rank: ProficiencyRank }
  | {
      kind: 'defenseRank'
      categories: DefenseProficiencyCategory[]
      rank: ProficiencyRank
    }
  | {
      kind: 'attackRank'
      categories: AttackProficiencyCategory[]
      rank: ProficiencyRank
    }
  | {
      kind: 'grantedFeat'
      featName: string
      originalName?: string
      featType?: string
      /** ID no catálogo (ex.: feat-shield-block-general). */
      featId?: string
    }
  | {
      kind: 'grantedFeatChoice'
      choiceId: string
      featIds: string[]
      hint?: string
      label?: string
      whenSubclassIds?: string[]
    }
  | {
      kind: 'saveRankChoice'
      choiceId: string
      rank: ProficiencyRank
      requireRank?: ProficiencyRank
      /** Ids de outras escolhas cujo valor (fortitude/reflex/will) sai da lista. */
      excludeChoiceIds?: string[]
      saveOptions?: Array<'fortitude' | 'reflex' | 'will'>
      hint?: string
    }
  | {
      kind: 'featureChoice'
      choiceId: string
      hint?: string
      /** Título no seletor (senão usa o nome do recurso). */
      label?: string
      /** Só pede esta escolha se a especialização atual estiver na lista. */
      whenSubclassIds?: string[]
      options: Array<{
        id: string
        name: string
        originalName?: string
        description: string
        /** Pés, igual ao resto do motor (Rapidez Abençoada = 5). */
        speedBonus?: number
      }>
    }
  | {
      kind: 'speedBonus'
      /** Pés no nível em que o recurso entra. */
      value: number
      /** Extra a cada N níveis após o nível do recurso (Movimento Incrível). */
      extraEveryLevels?: number
      extraAmount?: number
      unarmoredOnly?: boolean
      /** Metade, arredondada para baixo em incrementos de 1,5 m (Velocidade Viva sem panache). */
      halfRoundedDownTo5?: boolean
    }

/** Recurso de classe desbloqueado em um nível */
export interface ClassFeature {
  id: string
  name: string
  originalName?: string
  level: number
  description: string
  actionType?: SpecialAbilityDefinition['actionType']
  trigger?: string
  frequency?: string
  effects?: ClassFeatureEffect[]
}

/** Linha da tabela de progressão */
export interface ClassLevelRow {
  level: number
  /** Nomes curtos dos recursos daquele nível */
  features: string[]
}

/** Coluna de uma tabela oficial (espaços, progressão, frascos…). */
export interface OfficialTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

/** Tabela copiada do livro / AoN para a UI. */
export interface OfficialTable {
  id: string
  title: string
  subtitle?: string
  caption?: string
  columns: OfficialTableColumn[]
  rows: Array<{
    key: string
    cells: string[]
    /** Destaca a linha do nível atual da ficha */
    level?: number
  }>
}

export interface ClassLore {
  summary: string
  duringCombat: string
  duringSocial: string
  whileExploring: string
  inDowntime: string
  youMight: string[]
  othersProbably: string[]
}

export interface ClassKeyTerm {
  name: string
  originalName?: string
  description: string
}

/**
 * Bloco didático de mecânica única da classe.
 * Padrão para classes oficiais (atuais e futuras): explique o que a classe
 * “faz de especial” em linguagem de mesa — não só o nome do recurso.
 */
export interface ClassMechanicsGuideEntry {
  title: string
  originalName?: string
  body: string
}

/** Opção de especialização de classe (ex.: Rogue's Racket) */
export interface ClassSubclassOption {
  id: string
  name: string
  originalName: string
  description: string
  rulesSummary: string
  /** Atributos-chave extras liberados por esta especialização */
  extraKeyAttributes?: AttributeId[]
  /** Perícias fixas concedidas */
  skillGrants?: SkillGrantRule[]
  /** Escolher 1 entre estas (ex.: Mastermind) */
  skillChoiceOptions?: SkillId[]
  skillChoiceLabel?: string
  /** Defesas extras (ex.: armadura média do Rufião) */
  defenseGrants?: DefenseProficiencyRule[]
  /** Ataques extras (ex.: armas marciais do Ceifador) */
  attackGrants?: AttackProficiencyRule[]
  /**
   * Tradição de conjuração desta especialização (patrono da bruxa, linhagem
   * do feiticeiro). Se omitido, vale a tradição da classe.
   */
  tradition?: SpellTradition
  /** Magias que esta opção coloca na ficha (currículo, linhagem, hex…) */
  grantedSpells?: GrantedClassSpell[]
  /** Escolhas que destrancam magias (elemento, lição com 2 opções…) */
  spellPicks?: ClassSpellPick[]
  /**
   * Troca o número-base de perícias adicionais da classe
   * (ex.: Vingador 3+INT no lugar de 7+INT).
   */
  additionalSkillBaseOverride?: number
  /** Perícias fixas da classe que esta opção não concede (ex.: Natureza do Vindicador). */
  omitClassSkillIds?: SkillId[]
  saveGrants?: Array<{
    save: 'fortitude' | 'reflex' | 'will'
    rank: ProficiencyRank
  }>
  /** Feito bônus ao escolher (ex.: Resistência / Diehard). */
  grantedFeat?: {
    featName: string
    originalName?: string
    featType?: string
    /** ID no catálogo — aplica o feito sem ocupar slot. */
    featId?: string
  }
  /** Recursos de classe que esta opção substitui (não aplicar). */
  replacesFeatureIds?: string[]
  sourceId?: string
  sourcePage?: number
  isLegacy?: boolean
  /**
   * Variantes que também satisfazem outra especialização
   * (ex.: Cultivo/Esporos contam como Folha).
   */
  countsAsSubclassIds?: string[]
}

export interface ClassSubclassGroup {
  id: string
  label: string
  /** Ex.: "Especialização (Racket)" */
  description?: string
  required: boolean
  options: ClassSubclassOption[]
}

/** Regras de perícias iniciais da classe */
export interface ClassSkillRules {
  /** Escolher N perícias entre estas opções */
  choiceOptions?: SkillId[]
  choiceCount?: number
  /** Perícias fixas (ex.: Furtividade do Ladino) */
  fixed?: SkillGrantRule[]
  /** Lores fixas (ex.: Conhecimento de Guerra do Comandante) */
  loreGrants?: LoreGrantRule[]
  /** Quantidade adicional treinada = base + INT (se positivo) */
  additionalBase: number
  additionalFromIntelligence: boolean
}

/** Classe jogável (Fighter, Wizard…) */
export interface CharacterClass {
  id: string
  name: string
  originalName: string
  rarity: Rarity
  provenance: Provenance
  sourceId?: string
  sourcePage?: number
  /** PV somados a cada nível (antes da CON) */
  hitPointsPerLevel: number
  /** Atributo-chave: boost de +1 em uma destas opções no 1º nível */
  keyAttributeOptions: AttributeId[]
  perceptionRank: ProficiencyRank
  saves: {
    fortitude: ProficiencyRank
    reflex: ProficiencyRank
    will: ProficiencyRank
  }
  skills: ClassSkillRules
  attacks: AttackProficiencyRule[]
  defenses: DefenseProficiencyRule[]
  classDcRank: ProficiencyRank
  features: ClassFeature[]
  levelTable: ClassLevelRow[]
  /**
   * Tabelas extras do livro (frascos do alquimista, etc.).
   * Espaços de magia e progressão de níveis são gerados na UI.
   */
  extraTables?: OfficialTable[]
  keyTerms?: ClassKeyTerm[]
  /**
   * Explicações bonitas das mecânicas únicas (fúria, sneak attack, spellbook…).
   * Obrigatório em seeds oficiais novos — a UI destaca estes blocos.
   */
  mechanicsGuide?: ClassMechanicsGuideEntry[]
  lore: ClassLore
  /** Especialização obrigatória/opcional (racket, doctrine, escola…) */
  subclass?: ClassSubclassGroup
  /**
   * Segunda escolha de 1º nível (ex.: tese arcana do mago).
   * Use quando a classe tiver duas especializações independentes.
   */
  secondarySubclass?: ClassSubclassGroup
  /**
   * Níveis em que a classe ganha feito de classe.
   * Se omitido: 1 + todos os pares (guerreiro, ladino, bárbaro…).
   * Mago Remaster: pares a partir do 2.
   */
  classFeatLevels?: number[]
  /** Grupos de arma para Fighter Weapon Mastery etc. */
  weaponGroupOptions?: Array<{ id: string; label: string; originalLabel?: string }>
  /**
   * Conjuração concedida pela classe (mago, clérigo…).
   * Ausente = classe sem magia própria.
   */
  spellcasting?: SpellcastingDefinition
  /** Magias de toda a classe (ex.: Hino Corajoso do bardo) */
  grantedSpells?: GrantedClassSpell[]
  spellPicks?: ClassSpellPick[]
  aonUrl?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Escolhas do personagem para a classe.
 * Diferente de ancestralidade: aqui entram atributo-chave, perícias de classe
 * e progressão (grupo de arma), não idiomas/tamanho/sentidos.
 */
export interface ClassChoices {
  /** Boost do atributo-chave da classe */
  keyAttribute?: AttributeId
  /**
   * Quatro boosts livres de criação (etapas do 1º nível).
   * São do personagem, mas a UI da classe é o lugar natural no fluxo PF2e.
   */
  creationFreeBoosts?: AttributeId[]
  /** Perícia escolhida entre as opções da classe (ex.: Acrobacia ou Atletismo) */
  skillChoice?: SkillId
  /** Perícias adicionais treinadas pela classe */
  additionalSkills: SkillId[]
  /** Especialização (racket, instinto, escola…) */
  subclassId?: string
  /** Escolha de perícia dentro da especialização */
  subclassSkillChoice?: SkillId
  /** Segunda especialização (tese arcana etc.) */
  secondarySubclassId?: string
  /** Grupo de arma (Fighter Weapon Mastery / Weapon Legend) — nível 5+ */
  weaponGroup?: string
  /**
   * Tradição de magia escolhida na ficha (ex.: qi do monge: divina ou oculta).
   * Sobrescreve a tradição padrão da classe quando preenchida.
   */
  spellTradition?: SpellTradition
  /**
   * Escolhas dos catálogos da classe (ícones, runas, táticas, fórmulas…).
   * Chave = id do catálogo; valor = ids das opções.
   */
  catalogPicks?: Record<string, string[]>
  /** Subconjunto do dia (táticas preparadas, infusões, aparições sintonizadas) */
  catalogPrepared?: Record<string, string[]>
  /** Escolha primária (aparição primária) */
  catalogPrimary?: Record<string, string>
  /** Detalhes avulsos (traje, arma da inovação, frascos atuais) */
  catalogDetails?: Record<string, string>
  /**
   * Escolhas de magia concedida (hex inicial, influência elemental, lição).
   * Chave = `choiceId`; valor = originalName ou id da opção do `spellPicks`.
   */
  grantedSpellPicks?: Record<string, string>
  /**
   * Escolhas de recurso de classe (Voz da Natureza, Caminho da Perfeição, bênção).
   * Chave = `choiceId` do efeito; valor = id da opção / feito / salvaguarda.
   */
  featurePicks?: Record<string, string>
}

export interface ResolvedClassProficiency {
  key: string
  label: string
  rank: ProficiencyRank
  sourceLabel: string
}

export interface ResolvedSaveStat {
  key: 'fortitude' | 'reflex' | 'will'
  label: string
  attributeId: AttributeId
  rank: ProficiencyRank
  modifier: number
  breakdown: Array<{ label: string; value: number | string }>
}
