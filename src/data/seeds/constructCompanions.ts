import type { ConstructModificationDefinition } from '@/types/companion'

const SOURCE = 'Guns & Gears (Remastered) pg. 17'

/**
 * Modificações da inovação Construto (Inventor).
 * Guns & Gears Remastered não tem companheiros animais nomeados —
 * o chassi é customizável. Clockwork Familiar (Grand Bazaar) é pré-Remaster.
 */
export const CONSTRUCT_MODIFICATIONS: ConstructModificationDefinition[] = [
  {
    id: 'construct-mod-accelerated-mobility',
    name: 'Mobilidade Acelerada',
    originalName: 'Accelerated Mobility',
    tier: 'initial',
    source: SOURCE,
    description:
      'Pernas articuladas, engrenagens eficientes ou propulsores. A Velocidade do construto aumenta para 12 m.',
  },
  {
    id: 'construct-mod-amphibious-construction',
    name: 'Construção Anfíbia',
    originalName: 'Amphibious Construction',
    tier: 'initial',
    source: SOURCE,
    description:
      'Flutuação, lemes e propulsão aquática. O construto ganha Velocidade de natação de 7,5 m.',
  },
  {
    id: 'construct-mod-increased-size',
    name: 'Tamanho Aumentado',
    originalName: 'Increased Size',
    tier: 'initial',
    source: SOURCE,
    description:
      'O construto é Grande. Se ele se tornar companheiro avançado (ou ganhar outro jeito de ser Grande), você pode trocar esta modificação por outra inicial imediatamente.',
  },
  {
    id: 'construct-mod-manual-dexterity',
    name: 'Destreza Manual',
    originalName: 'Manual Dexterity',
    tier: 'initial',
    source: SOURCE,
    description:
      'Mãos articuladas: pode usar ações de manipular com até dois membros. Como companheiro, ainda não empunha armas ou itens sem o traço companheiro, nem ativa itens.',
  },
  {
    id: 'construct-mod-projectile-launcher',
    name: 'Lançador de Projéteis',
    originalName: 'Projectile Launcher',
    tier: 'initial',
    source: SOURCE,
    description:
      'Ataque desarmado à distância: 1d4 contundente ou perfurante (escolha ao pegar a modificação), traço propulsivo, incremento de 9 m.',
  },
  {
    id: 'construct-mod-sensory-array',
    name: 'Matriz Sensorial',
    originalName: 'Sensory Array',
    tier: 'initial',
    source: SOURCE,
    description:
      'Visão na penumbra, visão no escuro e sentido sísmico impreciso de 9 m.',
  },
  {
    id: 'construct-mod-wonder-gears',
    name: 'Engrenagens Maravilha',
    originalName: 'Wonder Gears',
    tier: 'initial',
    source: SOURCE,
    description:
      'O construto fica treinado em Intimidação, Furtividade e Sobrevivência.',
  },
  {
    id: 'construct-mod-advanced-weaponry',
    name: 'Armamento Avançado',
    originalName: 'Advanced Weaponry',
    tier: 'breakthrough',
    minLevel: 7,
    source: SOURCE,
    description:
      'Escolha um ataque desarmado do construto para ganhar uma modificação inicial de arma (à qual você tenha acesso). O ataque precisa cumprir os requisitos da modificação.',
  },
  {
    id: 'construct-mod-antimagic-construction',
    name: 'Construção Antimagia',
    originalName: 'Antimagic Construction',
    tier: 'breakthrough',
    minLevel: 7,
    source: SOURCE,
    description:
      '+2 de bônus de circunstância em salvaguardas e CA contra magias.',
  },
  {
    id: 'construct-mod-climbing-limbs',
    name: 'Membros Escaladores',
    originalName: 'Climbing Limbs',
    tier: 'breakthrough',
    minLevel: 7,
    source: SOURCE,
    description:
      'O construto ganha Velocidade de escalada igual à metade da Velocidade terrestre.',
  },
  {
    id: 'construct-mod-durable-construction',
    name: 'Construção Durável',
    originalName: 'Durable Construction',
    tier: 'breakthrough',
    minLevel: 7,
    source: SOURCE,
    description:
      'Aumente os PV máximos do construto em um valor igual ao seu nível.',
  },
  {
    id: 'construct-mod-marvelous-gears',
    name: 'Engrenagens Magníficas',
    originalName: 'Marvelous Gears',
    tier: 'breakthrough',
    minLevel: 7,
    prerequisiteModificationId: 'construct-mod-wonder-gears',
    source: SOURCE,
    description:
      'Especialista em Intimidação, Furtividade e Sobrevivência (mestre se já era especialista). Com a característica de inovação revolucionária, sobe para mestre — ou lendário se já era especialista. Exige Engrenagens Maravilha.',
  },
  {
    id: 'construct-mod-turret-configuration',
    name: 'Configuração de Torre',
    originalName: 'Turret Configuration',
    tier: 'breakthrough',
    minLevel: 7,
    prerequisiteModificationId: 'construct-mod-projectile-launcher',
    source: SOURCE,
    description:
      '1 ação (manipular) para virar torre no espaço (ou voltar). Enquanto torre: imobilizado; o dado do lançador de projéteis vira 1d6 e o incremento, 18 m. Exige Lançador de Projéteis.',
  },
  {
    id: 'construct-mod-flight-chassis',
    name: 'Chassi de Voo',
    originalName: 'Flight Chassis',
    tier: 'revolutionary',
    minLevel: 15,
    source: SOURCE,
    description: 'O construto ganha Velocidade de voo de 7,5 m.',
  },
  {
    id: 'construct-mod-miracle-gears',
    name: 'Engrenagens Milagre',
    originalName: 'Miracle Gears',
    tier: 'revolutionary',
    minLevel: 15,
    prerequisiteModificationId: 'construct-mod-marvelous-gears',
    source: SOURCE,
    description:
      'INT +2; aprende um idioma que você conhece; pode usar ações que exigem mais Inteligência (Coagir, Decifrar Escrita). Lendário em duas perícias de Inteligência ou Carisma à sua escolha. Exige Engrenagens Magníficas.',
  },
  {
    id: 'construct-mod-resistant-coating',
    name: 'Revestimento Resistente',
    originalName: 'Resistant Coating',
    tier: 'revolutionary',
    minLevel: 15,
    source: SOURCE,
    description: 'Resistência 5 a todo dano (exceto adamantina).',
  },
  {
    id: 'construct-mod-runic-keystone',
    name: 'Pedra-chave Rúnica',
    originalName: 'Runic Keystone',
    tier: 'revolutionary',
    minLevel: 15,
    source: SOURCE,
    description:
      'Pode guardar uma runa de propriedade (mesmo sem ser arma ou armadura). Runa de armadura afeta o construto; runa de arma afeta os ataques desarmados, seguindo os requisitos.',
  },
  {
    id: 'construct-mod-wall-configuration',
    name: 'Configuração de Muralha',
    originalName: 'Wall Configuration',
    tier: 'revolutionary',
    minLevel: 15,
    source: SOURCE,
    description:
      'Atividade de 2 ações (manipular) para virar muralha de metal e engrenagens (até 3 m de altura e 9 m de comprimento) pelo espaço original. Enquanto muralha: só pode voltar à forma; desprevenido e −2 de status na CA. Bloqueia linha de visão/efeito até ter metade dos PV ou menos.',
  },
]

export const CONSTRUCT_MODIFICATIONS_BY_ID: Record<
  string,
  ConstructModificationDefinition
> = Object.fromEntries(CONSTRUCT_MODIFICATIONS.map((m) => [m.id, m]))

export function listConstructModifications(
  tier?: ConstructModificationDefinition['tier'],
): ConstructModificationDefinition[] {
  if (!tier) return CONSTRUCT_MODIFICATIONS
  return CONSTRUCT_MODIFICATIONS.filter((m) => m.tier === tier)
}

export function getConstructModification(
  id: string | null | undefined,
): ConstructModificationDefinition | null {
  if (!id) return null
  return CONSTRUCT_MODIFICATIONS_BY_ID[id] ?? null
}

/** PV base do chassi (não é PV de ancestralidade). */
export const CONSTRUCT_COMPANION_BASE_HP = 10

export const CONSTRUCT_COMPANION_SOURCE =
  'Guns & Gears (Remastered) pg. 32'

export const CONSTRUCT_COMPANION_IMMUNITIES = [
  'sangramento',
  'efeitos de morte',
  'doença',
  'condenado',
  'drenado',
  'fatigado',
  'cura',
  'ataques não letais',
  'paralisado',
  'veneno',
  'enjoado',
  'inconsciente',
  'vitalidade',
  'vazio',
]

export const CONSTRUCT_COMPANION_DEFAULT_SENSES = [
  'visão precisa',
  'audição imprecisa',
  'toque vago (sem olfato nem paladar)',
]
