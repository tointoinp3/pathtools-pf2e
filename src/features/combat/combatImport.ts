import type { CombatSession, CombatToken, CreaturePowerVariant } from '@/types'
import { getCreatureById } from '@/engine/bestiaryCatalog'
import { applyCreatureVariant } from '@/engine/creatureVariant'
import {
  findFreeSpot,
  footprintForSize,
  nextTokenName,
  tokenFromCreature,
} from '@/engine/combat'

export interface CreatureTokenSpec {
  creatureId: string
  variant: CreaturePowerVariant
  quantity: number
}

/**
 * Converte fichas do bestiário em tokens posicionados: aplica Elite/Fraca,
 * numera repetidas ("Zumbi", "Zumbi 2"…) e encaixa cada uma em um vão
 * livre do grid. Criaturas desconhecidas são ignoradas.
 */
export function buildCreatureTokens(
  session: CombatSession,
  specs: CreatureTokenSpec[],
): CombatToken[] {
  const placed = [...session.tokens]
  const created: CombatToken[] = []

  for (const spec of specs) {
    const base = getCreatureById(spec.creatureId)
    if (!base) continue
    const creature = applyCreatureVariant(base, spec.variant)
    const footprint = footprintForSize(creature.size)

    for (let i = 0; i < Math.max(1, spec.quantity); i++) {
      const spot = findFreeSpot(
        placed,
        session.gridCols,
        session.gridRows,
        footprint.w,
        footprint.h,
      )
      const name = nextTokenName(
        creature.name,
        placed.map((token) => token.name),
      )
      const token = tokenFromCreature(
        creature,
        spec.variant,
        spec.creatureId,
        spot,
        name,
      )
      placed.push(token)
      created.push(token)
    }
  }

  return created
}
