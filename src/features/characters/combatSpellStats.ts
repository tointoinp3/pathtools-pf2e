import type { Spell } from '@/types'

export interface SpellCombatHints {
  isAttack: boolean
  saveLabel: string | null
  damageFormula: string | null
}

const SAVE_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\b(fortitude|fort)\b/i, label: 'Fortitude' },
  { re: /\b(reflexos|reflex)\b/i, label: 'Reflexos' },
  { re: /\b(vontade|will)\b/i, label: 'Vontade' },
]

function traitKey(trait: string): string {
  return trait.trim().toLowerCase()
}

/** Usa o catálogo canônico (traços em inglês). Não passa magia já traduzida. */
export function inferSpellCombat(spell: Spell): SpellCombatHints {
  const traits = spell.traits.map(traitKey)
  const text = `${spell.summary ?? ''} ${spell.description ?? ''}`
  const isAttack =
    traits.includes('attack') || /ataque de magia/i.test(text)
  let saveLabel: string | null = null
  for (const pattern of SAVE_PATTERNS) {
    if (pattern.re.test(text)) {
      saveLabel = pattern.label
      break
    }
  }
  const dice = text.match(/(\d+)\s*d\s*(4|6|8|10|12|20)\b/i)
  const damageFormula = dice ? `${dice[1]}d${dice[2]}`.toLowerCase() : null
  return { isAttack, saveLabel, damageFormula }
}

export function resolveWandSpellId(item: {
  wandSpellId?: string | null
}, wand?: { fixedSpellId?: string } | null): string | null {
  return wand?.fixedSpellId ?? item.wandSpellId ?? null
}
