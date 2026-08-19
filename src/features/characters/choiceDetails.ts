import type { Feat } from '@/types'
import { findFeatInCatalog, listSpells } from '@/engine'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'

export interface ChoiceDetailOption {
  id: string
  name: string
  subtitle?: string
  description?: string
  actionType?: Feat['actionType']
  traits?: string[]
}

type RawChoice = {
  id: string
  name?: string
  label?: string
  originalName?: string
  originalLabel?: string
  description?: string
}

function spellIndex() {
  const byKey = new Map<string, ReturnType<typeof listSpells>[number]>()
  for (const spell of listSpells()) {
    byKey.set(spell.id.toLowerCase(), spell)
    byKey.set(spell.originalName.toLowerCase(), spell)
    byKey.set(spell.name.toLowerCase(), spell)
  }
  return byKey
}

function looksLikePlaceholder(value: string): boolean {
  const n = value.trim().toLowerCase()
  return (
    n === 'other' ||
    n.startsWith('outro') ||
    n.includes('anotar nas notas')
  )
}

const CLASS_DEDICATION_OPTION_IDS = new Set([
  'alchemist',
  'barbarian',
  'bard',
  'champion',
  'cleric',
  'druid',
  'fighter',
  'investigator',
  'magus',
  'monk',
  'oracle',
  'psychic',
  'ranger',
  'rogue',
  'sorcerer',
  'summoner',
  'swashbuckler',
  'thaumaturge',
  'witch',
  'wizard',
  'kineticist',
  'inventor',
  'gunslinger',
])

/**
 * Completa nome e texto da opção com feito/magia do catálogo, quando der.
 */
export function enrichChoiceOptions(
  options: RawChoice[],
  feats?: Feat[] | Map<string, Feat>,
): ChoiceDetailOption[] {
  const spells = spellIndex()
  return options.map((opt) => {
    const label = (opt.name ?? opt.label ?? opt.id).trim()
    const original = (opt.originalName ?? opt.originalLabel ?? '').trim()
    const seeded = opt.description?.trim()

    if (looksLikePlaceholder(opt.id) || looksLikePlaceholder(label)) {
      return {
        id: opt.id,
        name: label,
        description:
          seeded ||
          'Anote a escolha nas notas da ficha — não está nesta lista curta.',
      }
    }

    if (feats) {
      const feat = findFeatInCatalog(feats, {
        featId: opt.id.startsWith('feat-') ? opt.id : undefined,
        originalName: original || undefined,
        featName: label,
      })
      const dedicationId =
        !opt.id.startsWith('feat-') && CLASS_DEDICATION_OPTION_IDS.has(opt.id)
          ? `feat-${opt.id}-dedication`
          : undefined
      const resolved =
        feat ??
        (dedicationId
          ? findFeatInCatalog(feats, {
              featId: dedicationId,
              originalName: original ? `${original} Dedication` : undefined,
              featName: original ? `Dedicação de ${label}` : undefined,
            })
          : undefined)
      if (resolved) {
        const view = withLocalizedFeatName(resolved)
        const isDedicationPick = Boolean(dedicationId)
        return {
          id: opt.id,
          name: isDedicationPick ? label : view.name,
          subtitle: isDedicationPick
            ? view.name
            : view.originalName && view.originalName !== view.name
              ? view.originalName
              : undefined,
          description: seeded || view.description,
          actionType: view.actionType,
          traits: view.traits,
        }
      }
    }

    const spell =
      spells.get(opt.id.toLowerCase()) ??
      (original ? spells.get(original.toLowerCase()) : undefined) ??
      spells.get(label.toLowerCase())
    if (spell) {
      const view = withLocalizedSpell(spell)
      return {
        id: opt.id,
        name: view.name,
        subtitle:
          view.originalName && view.originalName !== view.name
            ? view.originalName
            : undefined,
        description: seeded || view.summary || view.description,
        actionType: view.actionType,
        traits: view.traits,
      }
    }

    return {
      id: opt.id,
      name: label,
      subtitle: original && original !== label ? original : undefined,
      description: seeded,
    }
  })
}

export function choiceOptionsHaveText(options: ChoiceDetailOption[]): boolean {
  return options.some((opt) => Boolean(opt.description?.trim()))
}
