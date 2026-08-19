import { db } from '@/db'
import type { ContentSource, Spell } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { getSpellById as getOfficialSpell } from '@/data/seeds/spells'
import { setHomebrewSpells } from '@/engine/spellRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.spells
    .filter((spell) => spell.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewSpells(rows)
}

export async function listHomebrewSpells(): Promise<Spell[]> {
  return db.spells
    .filter((spell) => spell.provenance?.type === 'homebrew')
    .toArray()
}

export async function getStoredSpell(id: string): Promise<Spell | undefined> {
  return db.spells.get(id)
}

export async function saveSpell(spell: Spell): Promise<Spell> {
  if (spell.provenance?.type === 'official') {
    throw new Error('Magias oficiais não são gravadas neste banco')
  }
  const updated: Spell = {
    ...spell,
    provenance: { type: 'homebrew' },
    updatedAt: nowIso(),
    createdAt: spell.createdAt ?? nowIso(),
  }
  await db.spells.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteSpell(id: string): Promise<void> {
  const spell = await db.spells.get(id)
  if (!spell) return
  if (spell.provenance?.type === 'official') {
    throw new Error('Magias oficiais não podem ser excluídas')
  }
  await db.spells.delete(id)
  await refreshHomebrewRegistry()
}

async function ensureHomebrewSource(label: string): Promise<string> {
  const now = nowIso()
  const sourceId = createId('source')
  const source: ContentSource = {
    id: sourceId,
    name: label,
    type: 'homebrew',
    createdAt: now,
    updatedAt: now,
  }
  await saveContentSource(source)
  return sourceId
}

export async function duplicateSpellAsHomebrew(sourceId: string): Promise<Spell> {
  const stored = await db.spells.get(sourceId)
  const source = stored ?? getOfficialSpell(sourceId)
  if (!source) throw new Error('Magia não encontrada')

  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const now = nowIso()
  const copy: Spell = {
    ...structuredClone(source),
    id: createId('spell'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    source: 'Homebrew',
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }
  await db.spells.put(copy)
  await refreshHomebrewRegistry()
  return copy
}
