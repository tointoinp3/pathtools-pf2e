import type { Feat, FeatEffect } from '@/types'
import { localizeFeatName } from '@/data/i18n/featNamesPt'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'
import { spellViewForRules } from './deity'

export function spellcastingTierBlurb(
  tier: 'basic' | 'expert' | 'master',
): string {
  if (tier === 'basic') {
    return 'Espaços deste arquétipo (1 em cada posto): 1º quando você pega este feito, 2º no 6º nível, 3º no 8º. Cada espaço serve para magia daquele posto ou menor deste arquétipo.'
  }
  if (tier === 'expert') {
    return 'Sua proficiência de ataque e CD de magia deste arquétipo sobe para perito. Espaços extras: 4º no 12º nível, 5º no 14º, 6º no 16º — além dos espaços básicos (1º–3º).'
  }
  return 'Sua proficiência de ataque e CD de magia deste arquétipo sobe para mestre. Espaços extras: 7º no 18º nível, 8º no 20º — além dos espaços básicos e peritos (1º–6º).'
}

function catalogFeat(
  catalog: Feat[] | Map<string, Feat> | undefined,
  id: string,
): Feat | undefined {
  if (!catalog) return undefined
  return catalog instanceof Map
    ? catalog.get(id)
    : catalog.find((feat) => feat.id === id)
}

function alreadyHas(haystack: string, needle: string): boolean {
  const snippet = needle.replace(/\s+/g, ' ').trim().slice(0, 48)
  if (snippet.length < 12) return false
  return haystack.replace(/\s+/g, ' ').includes(snippet)
}

function effectBlocks(
  effects: FeatEffect[] | undefined,
  catalog?: Feat[] | Map<string, Feat>,
): string[] {
  if (!effects?.length) return []
  const blocks: string[] = []
  for (const effect of effects) {
    if (effect.kind === 'specialAbility') {
      const body = effect.description.trim()
      if (!body) continue
      blocks.push(`**${effect.name}**\n${body}`)
      continue
    }
    if (effect.kind === 'spellcastingTier') {
      blocks.push(spellcastingTierBlurb(effect.tier))
      continue
    }
    if (effect.kind === 'grantedFeat') {
      const child = catalogFeat(catalog, effect.featId)
      if (!child) continue
      const body = (child.description ?? '').trim()
      if (!body) continue
      const name = localizeFeatName(child.name, child.originalName)
      blocks.push(`**${name}**\n${body}`)
      continue
    }
    if (effect.kind === 'grantedFocusSpell') {
      const view = spellViewForRules(effect.originalName)
      const title = effect.label ?? view.name ?? localizeSpellName(effect.originalName)
      const body = [view.meta, view.body].filter(Boolean).join('\n')
      if (!body) continue
      blocks.push(`**${title}**\n${body}`)
    }
  }
  return blocks
}

/**
 * Completa a descrição do feito com reações/recursos, conjuração de
 * arquétipo, feitos concedidos e magias de foco — para a carta não ficar
 * só “você ganha X”.
 */
export function enrichFeatDescription(
  feat: {
    description?: string
    effects?: FeatEffect[]
  },
  catalog?: Feat[] | Map<string, Feat>,
): string {
  const base = (feat.description ?? '').trim()
  const extras = effectBlocks(feat.effects, catalog).filter(
    (block) => !alreadyHas(base, block),
  )
  return [base, ...extras].filter(Boolean).join('\n\n')
}
