import type { Feat } from '@/types/feat'
import { ANCESTRY_ELF_ID } from './ancestriesElf'
import { SOURCE_WHISPERS_DIRT_ID } from './sources'

const SRC = SOURCE_WHISPERS_DIRT_ID

function elf(opts: {
  id: string
  name: string
  originalName: string
  level: number
  description: string
  prerequisites?: Feat['prerequisites']
  traits?: string[]
  actionType?: Feat['actionType']
  trigger?: string
  frequency?: string
  requirements?: string
  sourcePage: number
  aonUrl: string
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'ancestry',
    ancestryId: ANCESTRY_ELF_ID,
    traits: opts.traits ?? ['Elfo', 'Incomum'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    description: opts.description,
    prerequisites: opts.prerequisites,
    actionType: opts.actionType,
    trigger: opts.trigger,
    frequency: opts.frequency,
    sourceId: SRC,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

/**
 * Feitos élficos de Kyonin — Pathfinder #210 Whispers in the Dirt.
 */
export const featsWhispersDirt: Feat[] = [
  elf({
    id: 'feat-elf-political-acumen',
    name: 'Perspicácia Política',
    originalName: 'Political Acumen',
    level: 1,
    prerequisites: [{ kind: 'text', label: 'treinado em Percepção' }],
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7655',
    description:
      '+2 circunstância em Percepção para Intuir Motivação contra outros elfos e na CD de Percepção contra Mentiras de agentes de Tanglebriar.',
  }),
  elf({
    id: 'feat-elf-traditional-ways',
    name: 'Caminhos Tradicionais',
    originalName: 'Traditional Ways',
    level: 1,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7656',
    description:
      '+2 circunstância em Natureza, Sociedade e Conhecimento ligados a Kyonin ou aos elfos de lá, e +1 circunstância em salvaguardas contra encantamento que o forçaria a agir contra a vontade.',
  }),
  elf({
    id: 'feat-elf-shame-the-sin',
    name: 'Envergonhar o Pecado',
    originalName: 'Shame the Sin',
    level: 5,
    actionType: 'free',
    frequency: '1/hora',
    trigger: 'Você obtém sucesso crítico num Golpe contra um demônio',
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7657',
    description:
      'Além do dano do crítico, o demônio sofre os efeitos da vulnerabilidade especial. Sem vulnerabilidade: +1d6 mental (2d6 no 13º, 3d6 no 17º).',
  }),
  elf({
    id: 'feat-elf-swamp-stealth',
    name: 'Furtividade no Pântano',
    originalName: 'Swamp Stealth',
    level: 5,
    prerequisites: [{ kind: 'skillRank', skillId: 'stealth', rank: 'expert' }],
    actionType: 'one',
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7658',
    description:
      'Exige pântano perto de um elemento que permita Abrir-se. Você Abre-se e então usa essa cobertura para Esconder-se.',
  }),
  elf({
    id: 'feat-elf-political-virtuoso',
    name: 'Virtuose Político',
    originalName: 'Political Virtuoso',
    level: 9,
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-elf-political-acumen',
        featName: 'Perspicácia Política',
      },
    ],
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7659',
    description:
      'O bônus de circunstância de Perspicácia Política passa a +4.',
  }),
  elf({
    id: 'feat-elf-demon-hunter',
    name: 'Caçador de Demônios',
    originalName: 'Demon Hunter',
    level: 9,
    prerequisites: [{ kind: 'text', label: 'perito em Religião ou em Conhecimento de Demônios' }],
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7660',
    description:
      'Ao preparar, escolha um tipo de demônio (súcubo, omox, shemhazian, Treerazer…). No resto do dia, o primeiro Golpe corpo a corpo que acertar esse tipo numa rodada causa +1d6 espírito (2d6 no 13º, 3d6 no 17º).',
  }),
  elf({
    id: 'feat-elf-anchoring-arrow',
    name: 'Flecha Âncora',
    originalName: 'Anchoring Arrow',
    level: 13,
    traits: ['Arcane', 'Elfo', 'Incomum'],
    actionType: 'one',
    frequency: '1/hora',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7661',
    description:
      'Golpe de arco contra um demônio; ele faz Vontade contra sua CD de classe.\n\n**Sucesso crítico** Sem efeito extra.\n\n**Sucesso** −1,5 m de circunstância em todos os Deslocamentos por 1 rodada.\n\n**Falha** −1,5 m por 1 minuto. Enquanto afetado, a flecha tenta contrapor teleporte ou viagem planar (posto 7, modificador +20).\n\n**Falha crítica** Como falha, −3 m por 10 minutos.',
  }),
  elf({
    id: 'feat-elf-cold-iron-stomach',
    name: 'Estômago de Ferro Frio',
    originalName: 'Cold Iron Stomach',
    level: 13,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7662',
    description:
      'Ao ganhar enjoado, reduza o valor em 1 (se chegar a 0, não fica enjoado). +2 circunstância em salvaguardas contra efeitos olfativos e veneno de demônios ou perigos ambientais das Fendas Exteriores (incluindo Tanglebriar).',
  }),
  elf({
    id: 'feat-elf-treehealer',
    name: 'Curador de Árvores',
    originalName: 'Treehealer',
    level: 13,
    traits: ['Elfo', 'Exploração', 'Cura', 'Primal', 'Incomum'],
    actionType: 'passive',
    frequency: '1/dia',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7663',
    description:
      '10 min em contato com uma árvore corrompida por demônios: restaura a saúde original (pode corromper de novo). Ou 10 min em criatura com traço planta: ela recupera 7d8+56 PV e você recupera metade; pode tentar contrapor uma maldição ou doença como _purgar aflição_ no 7º (posto 7; teste = Vontade ou ataque de magia, o maior).',
  }),
  elf({
    id: 'feat-elf-demon-slayer',
    name: 'Matador de Demônios',
    originalName: 'Demon Slayer',
    level: 17,
    traits: ['Elfo', 'Sagrado', 'Luz', 'Incomum'],
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-elf-demon-hunter',
        featName: 'Caçador de Demônios',
      },
    ],
    actionType: 'one',
    frequency: '1/dia',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7664',
    description:
      'Golpe corpo a corpo num demônio: além do dano normal, 10d6 espírito (Fortitude básico contra CD de classe). Se o demônio morrer com esse golpe, explode em luz sagrada (emanação 9 m): outros demônios na área sofrem 10d6 espírito e Fortitude. Sucesso crítico: sem dano. Sucesso: metade. Falha: dano total e ofuscado 1 rodada. Falha crítica: dano total e cego permanente.',
  }),
]
