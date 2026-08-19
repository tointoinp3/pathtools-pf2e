import type { Feat } from '@/types/feat'
import type { SpecialAbilityDefinition } from '@/types/ancestry'
import type { MythicCalling } from '@/types/mythic'
import { MYTHIC_POINTS_MAX, MYTHIC_POINTS_START } from '@/types/mythic'
import { getOfficialMythicCalling } from '@/data/seeds/mythicCallings'
import { calculateMythicProficiencyBonus } from './proficiency'

export { MYTHIC_POINTS_MAX, MYTHIC_POINTS_START, calculateMythicProficiencyBonus }

const MYTHIC_TRAITS = new Set(['Mítico', 'Mythic'])

export function hasMythicTrait(feat: Pick<Feat, 'traits'>): boolean {
  return feat.traits.some((trait) => MYTHIC_TRAITS.has(trait))
}

export function isMythicDestinyDedication(feat: Feat): boolean {
  return Boolean(
    feat.isDedication && hasMythicTrait(feat) && feat.level >= 12,
  )
}

export function isGeneralMythicFeat(feat: Feat): boolean {
  return feat.category === 'mythic'
}

export function getMythicFeatLevels(maxLevel = 20): number[] {
  const levels: number[] = []
  for (let level = 2; level <= maxLevel; level += 2) levels.push(level)
  return levels
}

export function resolveMythicCalling(
  callingId: string | null | undefined,
): MythicCalling | null {
  if (!callingId) return null
  return getOfficialMythicCalling(callingId) ?? null
}

/** Chamado escolhido + regras da mesa ligadas. */
export function isMythicCharacter(opts: {
  mythicRulesEnabled?: boolean
  mythicCallingId?: string | null
}): boolean {
  return Boolean(opts.mythicRulesEnabled && opts.mythicCallingId)
}

export function mythicAbilitiesForCalling(
  calling: MythicCalling,
): SpecialAbilityDefinition[] {
  return [
    {
      id: 'mythic-rewrite-fate',
      name: 'Reescrever o Destino',
      originalName: 'Rewrite Fate',
      actionType: 'free',
      trigger:
        'Você rola um teste de perícia ou salvaguarda e não gosta do resultado.',
      frequency: 'Gasta 1 Ponto Mítico',
      description:
        'Gaste 1 Ponto Mítico e rerrole o teste com proficiência mítica (nível + 10). Fique com o novo resultado. Fortuna.',
    },
    {
      id: 'mythic-death-and-dying',
      name: 'Morte e morrer (mítico)',
      originalName: 'Death and Dying as a Mythic Character',
      actionType: 'passive',
      description:
        'Quando o valor de morrendo chegaria ao suficiente para matar (em geral 4), em vez disso o condenado sobe 1 e você estabiliza com 0 PV. Só morre de fato quando o condenado chega a 4. Como o normal, o condenado cai 1 após uma noite completa de descanso.',
    },
    {
      id: 'mythic-points-recover',
      name: 'Recuperar Pontos Míticos',
      originalName: 'Gaining Mythic Points',
      actionType: 'passive',
      description: [
        'Você começa a sessão com 3 Pontos Míticos (máximo 3). Sem Pontos de herói enquanto tiver Pontos Míticos. Recupera durante o jogo: matar um inimigo mítico (2 para quem desferiu o golpe, 1 para os outros PCs míticos); completar um feito mítico (3 para o grupo); seguir os editais do chamado (1); ou um momento épico (o MJ decide). Não passa de 3.',
        `Editais de ${calling.name}:`,
        ...calling.edicts.map((item) => `• ${item}`),
      ].join('\n'),
    },
    {
      id: 'mythic-anathema',
      name: 'Anátema mítico',
      originalName: 'Mythic Anathema',
      actionType: 'passive',
      description: [
        'Quebrar um anátema do chamado faz você perder todos os Pontos Míticos atuais. É um revés da sessão, não uma perda permanente do chamado.',
        `Anátema de ${calling.name}:`,
        ...calling.anathema.map((item) => `• ${item}`),
      ].join('\n'),
    },
    {
      id: `mythic-calling-spend-${calling.id}`,
      name: `${calling.name} · gastar ponto`,
      originalName: calling.originalName,
      actionType: 'free',
      description: calling.mythicSpend,
    },
    {
      id: `mythic-calling-regain-${calling.id}`,
      name: `${calling.name} · recuperar ponto`,
      originalName: calling.originalName,
      actionType: 'passive',
      description: calling.mythicRegain,
    },
  ]
}
