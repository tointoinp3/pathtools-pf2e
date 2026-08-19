import { db } from '@/db'
import type { Background, ContentSource } from '@/types'
import { createId, nowIso } from '@/utils/id'

export async function listBackgrounds(): Promise<Background[]> {
  return db.backgrounds.toArray()
}

export async function getBackground(id: string): Promise<Background | undefined> {
  return db.backgrounds.get(id)
}

export async function listContentSources(): Promise<ContentSource[]> {
  return db.contentSources.toArray()
}

export async function getContentSource(id: string): Promise<ContentSource | undefined> {
  return db.contentSources.get(id)
}

export async function saveContentSource(source: ContentSource): Promise<ContentSource> {
  const now = nowIso()
  const record: ContentSource = {
    ...source,
    updatedAt: now,
    createdAt: source.createdAt ?? now,
  }
  await db.contentSources.put(record)
  return record
}

export async function saveBackground(background: Background): Promise<Background> {
  const now = nowIso()
  const record: Background = {
    ...background,
    updatedAt: now,
    createdAt: background.createdAt ?? now,
  }
  await db.backgrounds.put(record)
  return record
}

export async function deleteBackground(id: string): Promise<void> {
  const background = await db.backgrounds.get(id)
  if (!background) return
  if (background.provenance.type === 'official') {
    throw new Error('Origens oficiais não podem ser excluídas')
  }
  await db.backgrounds.delete(id)
}

export async function duplicateBackgroundAsHomebrew(
  sourceId: string,
): Promise<Background> {
  const source = await db.backgrounds.get(sourceId)
  if (!source) throw new Error('Origem não encontrada')

  const now = nowIso()
  const copy: Background = {
    ...structuredClone(source),
    id: createId('bg'),
    name: `${source.name} (Homebrew)`,
    provenance: { type: 'homebrew' },
    createdAt: now,
    updatedAt: now,
  }

  // Garante uma fonte homebrew se a original era oficial
  if (source.provenance.type === 'official') {
    const homebrewSourceId = createId('source')
    await db.contentSources.put({
      id: homebrewSourceId,
      name: `Homebrew baseado em ${source.name}`,
      type: 'homebrew',
      createdAt: now,
      updatedAt: now,
    })
    copy.sourceId = homebrewSourceId
  }

  await db.backgrounds.put(copy)
  return copy
}

export function createEmptyHomebrewBackground(): Background {
  const now = nowIso()
  return {
    id: createId('bg'),
    name: 'Nova Origem',
    description: '',
    rarity: 'common',
    provenance: { type: 'homebrew' },
    attributeBoosts: [
      {
        id: 'restricted',
        label: 'Boost restrito',
        option: { kind: 'specific', attributes: ['strength', 'constitution'] },
      },
      {
        id: 'free',
        label: 'Boost livre',
        option: { kind: 'free', excludeAlreadyChosen: true },
      },
    ],
    skillGrants: [
      {
        id: 'skill',
        rank: 'trained',
        skillId: 'athletics',
      },
    ],
    loreGrants: [
      {
        id: 'lore',
        rank: 'trained',
        loreId: 'custom-lore',
        loreName: 'Conhecimento Personalizado',
      },
    ],
    featGrants: [
      {
        id: 'feat',
        featName: 'Feito de Perícia',
        featType: 'skill',
      },
    ],
    createdAt: now,
    updatedAt: now,
  }
}
