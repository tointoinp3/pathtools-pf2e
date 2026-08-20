import { db } from '@/db'
import { tokenImageId, type TokenImageRecord } from '@/types'
import { nowIso } from '@/utils/id'

export type TokenImageScope = TokenImageRecord['scope']

export async function getTokenImage(
  scope: TokenImageScope,
  ownerId: string,
): Promise<TokenImageRecord | undefined> {
  return db.tokenImages.get(tokenImageId(scope, ownerId))
}

/** Imagem exibida no grid: a da própria ficha vence a da criatura. */
export async function resolveTokenImage(
  tokenId: string,
  creatureId: string | null,
): Promise<TokenImageRecord | null> {
  const own = await getTokenImage('token', tokenId)
  if (own) return own
  if (!creatureId) return null
  return (await getTokenImage('creature', creatureId)) ?? null
}

export async function saveTokenImage(
  scope: TokenImageScope,
  ownerId: string,
  blob: Blob,
): Promise<void> {
  await db.tokenImages.put({
    id: tokenImageId(scope, ownerId),
    scope,
    ownerId,
    blob,
    mimeType: blob.type || 'image/png',
    updatedAt: nowIso(),
  })
}

export async function deleteTokenImage(
  scope: TokenImageScope,
  ownerId: string,
): Promise<void> {
  await db.tokenImages.delete(tokenImageId(scope, ownerId))
}

/** Ctrl+V / duplicar: a cópia leva junto a imagem exclusiva da original. */
export async function copyTokenImage(
  fromTokenId: string,
  toTokenId: string,
): Promise<boolean> {
  const source = await getTokenImage('token', fromTokenId)
  if (!source) return false
  await saveTokenImage('token', toTokenId, source.blob)
  return true
}

export async function copyMapImage(
  fromSessionId: string,
  toSessionId: string,
): Promise<boolean> {
  const source = await getTokenImage('map', fromSessionId)
  if (!source) return false
  await saveTokenImage('map', toSessionId, source.blob)
  return true
}

export async function deleteMapImage(sessionId: string): Promise<void> {
  await deleteTokenImage('map', sessionId)
}

/** Limpeza ao excluir um combate inteiro. */
export async function deleteTokenImagesFor(
  tokenIds: string[],
): Promise<void> {
  if (tokenIds.length === 0) return
  await db.tokenImages.bulkDelete(
    tokenIds.map((id) => tokenImageId('token', id)),
  )
}
