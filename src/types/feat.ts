import type {
  AttackProficiencyCategory,
  DefenseProficiencyCategory,
} from './class'
import type { AttributeId, Provenance, Rarity, SkillId, ProficiencyRank } from './core'
import type {
  SpellcastingFeatures,
  SpellcastingStyle,
  SpellTradition,
} from './spell'

/** Categoria de feito (tipo de slot) */
export type FeatCategory =
  | 'ancestry'
  | 'class'
  | 'skill'
  | 'general'
  | 'archetype'
  | 'mythic'
  | 'other'

/** Pré-requisito estruturado (filtrável) */
export type FeatPrerequisite =
  | { kind: 'level'; min: number }
  | { kind: 'feat'; featId: string; featName?: string }
  | { kind: 'ancestry'; ancestryId: string }
  | { kind: 'class'; classId: string }
  | { kind: 'heritage'; heritageId: string }
  | { kind: 'archetype'; archetypeId: string }
  | { kind: 'attribute'; attributeId: AttributeId; min: number }
  | { kind: 'skillRank'; skillId: SkillId; rank: ProficiencyRank }
  | { kind: 'text'; label: string }

/** Acesso a magia concedido por um feito (Dedicação de mago, etc.). */
export interface FeatSpellcastingAccess {
  id: string
  label: string
  style: SpellcastingStyle
  tradition: SpellTradition
  /**
   * Se definido, o jogador escolhe a tradição (ex.: patrono da bruxa).
   * Até escolher, a conjuração e a perícia associada não são aplicadas.
   */
  traditionChoiceId?: string
  /**
   * Com `traditionChoiceId`: só estas tradições entram no seletor
   * (ex.: Bloodrager = arcana ou divina). Sem isto, as quatro.
   */
  traditionOptions?: SpellTradition[]
  /**
   * Com `traditionChoiceId`: também treina a perícia da tradição (bruxa).
   * Feiticeiro usa `false` — as perícias vêm da linhagem, escolhidas à parte.
   */
  grantTraditionSkill?: boolean
  /** Texto do seletor de tradição. */
  traditionChoiceHint?: string
  /**
   * Se definido, o jogador escolhe o atributo-chave (ex.: psíquico INT ou CAR).
   * Até escolher, a conjuração não é aplicada.
   */
  attributeChoiceId?: string
  attributeOptions?: AttributeId[]
  attributeChoiceHint?: string
  attributeId: AttributeId
  proficiencyRank: ProficiencyRank
  cantripsPerDay?: number
  features?: SpellcastingFeatures
  /** Traço de classe no catálogo de foco (Wizard, Ranger…). */
  classOriginalName?: string
}

/**
 * Efeito mecânico aplicado automaticamente quando o feito está num slot já
 * ganho (não vale reserva de nível futuro).
 */
export type FeatEffect =
  | { kind: 'hpFlat'; value: number }
  | { kind: 'hpPerLevel'; value: number }
  | {
      kind: 'hpPerArchetypeFeat'
      perFeat: number
      archetypeId: string
    }
  | {
      kind: 'skillRank'
      skillId: SkillId
      rank: ProficiencyRank
      minLevel?: number
      /**
       * Se a perícia já vem treinada de outra fonte (classe, origem…),
       * o feito pede outra perícia no lugar.
       */
      replaceIfTrained?: boolean
      /**
       * Se já estiver neste posto, sobe um grau (ex.: treinado → perito).
       * Não sobe além disso (perito continua perito).
       */
      bumpIfAlready?: boolean
    }
  | {
      kind: 'skillRankChoice'
      choiceId: string
      rank: ProficiencyRank
      /** Vazio = qualquer perícia */
      skillOptions?: SkillId[]
      replaceIfTrained?: boolean
      hint?: string
      /**
       * Só lista perícias que já estão neste posto (ex.: perito → mestre).
       * O jogador escolhe qual; o motor não escolhe.
       */
      requireRank?: ProficiencyRank
      /** Se a perícia escolhida já estiver no posto `rank`, sobe um grau. */
      bumpIfAlready?: boolean
    }
  | {
      kind: 'lore'
      loreName: string
      rank?: ProficiencyRank
      /**
       * Se já estiver neste posto (mesmo nome), sobe um grau
       * (ex.: treinado → perito).
       */
      bumpIfAlready?: boolean
    }
  | {
      kind: 'attackRank'
      categories: AttackProficiencyCategory[]
      rank: ProficiencyRank
    }
  | {
      kind: 'defenseRank'
      categories: DefenseProficiencyCategory[]
      rank: ProficiencyRank
    }
  | {
      kind: 'defenseRankIfAlready'
      check: DefenseProficiencyCategory[]
      then: { categories: DefenseProficiencyCategory[]; rank: ProficiencyRank }
    }
  | {
      kind: 'saveRank'
      save: 'fortitude' | 'reflex' | 'will'
      rank: ProficiencyRank
    }
  | {
      kind: 'saveRankChoice'
      choiceId: string
      rank: ProficiencyRank
      /** Só aplica se a salvaguarda escolhida já estiver neste posto (ex.: perito → mestre). */
      requireRank?: ProficiencyRank
      saveOptions?: Array<'fortitude' | 'reflex' | 'will'>
      hint?: string
    }
  | { kind: 'perceptionRank'; rank: ProficiencyRank }
  | {
      kind: 'classDc'
      rank: ProficiencyRank
      label: string
      attributeId: AttributeId
      /** Se houver mais de um, usa o modificador mais alto (ex.: FOR ou DES do monge). */
      attributeIds?: AttributeId[]
      minLevel?: number
    }
  | { kind: 'spellcasting'; access: FeatSpellcastingAccess }
  | {
      kind: 'spellcastingTier'
      sourceId: string
      tier: 'basic' | 'expert' | 'master'
    }
  | { kind: 'spellSlotBreadth'; sourceId: string }
  | { kind: 'focusPool'; points?: number }
  /** Magia de foco que entra na ficha ao selecionar o feito (ex.: magia de ordem). */
  | { kind: 'grantedFocusSpell'; originalName: string; label?: string }
  | {
      kind: 'specialAbility'
      name: string
      description: string
      actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
    }
  | { kind: 'language'; name: string }
  | {
      kind: 'speedBonus'
      value: number
      unarmoredOnly?: boolean
      /**
       * Feitos de ancestralidade (Elfo Ágil, Ligeiro…) não somam entre si:
       * vale o maior bônus do grupo.
       */
      stackGroup?: 'ancestry'
    }
  /** Ferro Desimpedido: ignora a penalidade de deslocamento da armadura. */
  | { kind: 'ignoreArmorSpeedPenalty' }
  /**
   * Reduz outras penalidades de deslocamento (sobrecarga, magia) em pés.
   * Ferro Desimpedido = 5.
   */
  | { kind: 'reduceOtherSpeedPenalties'; value: number }
  | { kind: 'familiarAbilitySlots'; extra: number }
  | {
      kind: 'weaponFamiliarity'
      weapons?: string[]
      traits?: string[]
      groups?: string[]
      martialAsSimple?: boolean
      advancedAsMartial?: boolean
      critSpecAtLevel?: number
      accessUncommonTrait?: string
    }
  | {
      kind: 'circumstanceBonus'
      value: number
      appliesTo: string
    }
  /** Escolha de perícia já treinada — não concede posto (ex.: Garantia). */
  | {
      kind: 'skillSelect'
      choiceId: string
      /** Vazio = qualquer perícia */
      skillOptions?: SkillId[]
      /** Mínimo de posto (treinada ou melhor). */
      minRank?: ProficiencyRank
      hint?: string
      /** Texto da habilidade depois da escolha. `{skill}` = nome da perícia. */
      abilityName?: string
      abilityDescription?: string
    }
  /** O jogador nomeia um Conhecimento. */
  | {
      kind: 'loreChoice'
      choiceId: string
      rank?: ProficiencyRank
      /** Níveis em que o Conhecimento sobe sozinho (aumentos só daquela lore). */
      increaseAtLevels?: number[]
      hint?: string
    }
  /** O jogador escolhe idioma(s). */
  | {
      kind: 'languageChoice'
      choiceId: string
      count?: number
      extraAtRank?: Partial<Record<ProficiencyRank, number>>
      skillId?: SkillId
      hint?: string
    }
  /** O jogador escolhe uma ancestralidade (Ancestralidade Adotada). */
  | {
      kind: 'ancestryChoice'
      choiceId: string
      hint?: string
    }
  /** Slot extra de feito de ancestralidade (Paragon Ancestral). */
  | {
      kind: 'extraAncestryFeatSlot'
      maxFeatLevel: number
    }
  /** Fortitude, Reflexos, Vontade ou Percepção — o jogador escolhe. */
  | {
      kind: 'saveOrPerceptionChoice'
      choiceId: string
      rank: ProficiencyRank
      rankAtLevel?: { level: number; rank: ProficiencyRank }
      hint?: string
    }
  /** Lista fechada de opções de texto (terreno, especialidade…). */
  | {
      kind: 'textChoice'
      choiceId: string
      options: Array<{ id: string; label: string }>
      hint?: string
      abilityName?: string
      abilityDescription?: string
    }
  /** Próximo tipo de armadura na sequência leve → média → pesada. */
  | { kind: 'nextArmorTraining' }
  /**
   * Treina marciais; se já for treinado, o jogador escolhe uma arma avançada.
   */
  | {
      kind: 'martialOrAdvancedChoice'
      choiceId: string
      expertAtLevel?: number
      hint?: string
    }
  /** Morrendo máximo (Difícil de Matar: 5 em vez de 4). */
  | { kind: 'dyingMax'; value: number }
  /** Bônus de proficiência em perícias destreinadas (Improvisação Destreinada). */
  | { kind: 'untrainedProficiency' }
  /** Aumenta o limite de carga. */
  | { kind: 'bulkLimitBonus'; value: number }
  /**
   * Magias emblemáticas extras (Expansão de Magia Emblemática).
   * Cada uma deve ter posto base ≤ maxRank (padrão 3).
   */
  | { kind: 'extraSignatureSpells'; count: number; maxRank?: number }
  /**
   * O jogador escolhe um feito de classe (Manobra Básica / Avançada).
   * `maxLevel: 'halfCharacterLevel'` = nível de classe = metade do nível.
   */
  | {
      kind: 'grantedFeatChoice'
      choiceId: string
      classId: string
      category?: FeatCategory
      maxLevel: number | 'halfCharacterLevel'
      minLevel?: number
      excludedTraits?: string[]
      hint?: string
    }
  /** Concede um feito específico (ex.: Repreensão Cortante → Gracejo). */
  | { kind: 'grantedFeat'; featId: string; minLevel?: number }
  /** Desloca o tamanho (ex.: Dragonete Poderoso: Minúsculo → Pequeno). */
  | { kind: 'sizeShift'; value: number }

/** Feito do compêndio */
export interface Feat {
  id: string
  name: string
  originalName: string
  level: number
  category: FeatCategory
  traits: string[]
  rarity: Rarity
  provenance: Provenance
  description: string
  prerequisites?: FeatPrerequisite[]
  /**
   * Se definido, só personagens desta ancestralidade podem selecionar.
   * Elfo não pega feito de anão, etc.
   */
  ancestryId?: string | null
  /** Se definido, só esta classe pode selecionar (feitos de classe). */
  classId?: string | null
  /** Restrito a uma herança específica (ex.: Ancient-Blooded). */
  heritageId?: string | null
  /**
   * Heranças que também qualificam, no lugar da ancestralidade
   * (ex.: feitos de planta para leshy **ou** ardande).
   */
  altHeritageIds?: string[]
  /** Arquétipo ao qual este feito pertence (Dedicação e feitos do arquétipo). */
  archetypeId?: string | null
  /** Feito de Dedicação (Player Core) — porta de entrada do arquétipo. */
  isDedication?: boolean
  /**
   * Slots extras em que este feito de arquétipo pode entrar.
   * O slot de classe já é o padrão do motor; use isto p.ex. para perícia.
   */
  allowedSlotKinds?: FeatCategory[]
  /**
   * Multiclasse: bloqueado se a classe do personagem for esta.
   * Preferir `multiclassClassId` no registro do arquétipo; isto é fallback.
   */
  blockedClassId?: string | null
  /**
   * Esta Dedicação ignora o bloqueio das 2 feitos de *qualquer*
   * arquétipo incompleto (caso raro; preferir a lista abaixo).
   */
  ignoresDedicationLock?: boolean
  /**
   * Ignora o bloqueio só se o arquétipo incompleto for um destes
   * (ex.: Legionário Dourado vs Cavaleiro Águia).
   */
  ignoresDedicationLockFromArchetypeIds?: string[]
  sourceId?: string
  sourcePage?: number
  /** Efeitos numéricos aplicados na ficha quando o slot já foi ganho. */
  effects?: FeatEffect[]
  /** Pode ocupar mais de um slot (Garantia, Conhecimento Adicional…). */
  repeatable?: boolean
  /** Player Core: alguns feitos não podem ser retreinados. */
  cannotRetrain?: boolean
  actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
  frequency?: string
  trigger?: string
  aonUrl?: string
  createdAt?: string
  updatedAt?: string
}

/** Slot de feito que o personagem ganha por nível/classe */
export interface FeatSlot {
  id: string
  kind: FeatCategory
  /** Nível em que o slot é concedido */
  gainedAtLevel: number
  label: string
  /**
   * false = o personagem ainda não alcançou este nível (preview / reserva).
   * A ficha só aplica o feito quando earned.
   */
  earned?: boolean
  /**
   * Se definido, o feito precisa ter todos estes traços
   * (ex.: Impulse + Air no portão do cinético).
   */
  requiredTraits?: string[]
}

/** Seleção persistida: um feito ocupando um slot */
export interface FeatSelection {
  slotId: string
  featId: string
}

export interface FeatAvailability {
  feat: Feat
  available: boolean
  reasons: string[]
}

/** Um pré-requisito do feito, com se o personagem cumpre. `null` = o motor não confere sozinho. */
export interface FeatPrerequisiteCheck {
  key: string
  label: string
  met: boolean | null
  current?: string
}
