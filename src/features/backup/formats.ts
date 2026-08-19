import { APP_NAME, APP_SLUG } from '@/brand'

export const CHARACTER_FORMAT = `${APP_SLUG}.character` as const
export const CHARACTERS_FORMAT = `${APP_SLUG}.characters` as const
export const HOMEBREW_FORMAT = `${APP_SLUG}.homebrew` as const

/** Formatos de JSON exportados antes da troca de nome — ainda aceitos na importação. */
const LEGACY_CHARACTER_FORMAT = 'super-pathfinder.character'
const LEGACY_CHARACTERS_FORMAT = 'super-pathfinder.characters'
const LEGACY_HOMEBREW_FORMAT = 'super-pathfinder.homebrew'

export function isCharacterFileFormat(format: unknown): boolean {
  return format === CHARACTER_FORMAT || format === LEGACY_CHARACTER_FORMAT
}

export function isCharactersFileFormat(format: unknown): boolean {
  return format === CHARACTERS_FORMAT || format === LEGACY_CHARACTERS_FORMAT
}

export function isHomebrewFileFormat(format: unknown): boolean {
  return format === HOMEBREW_FORMAT || format === LEGACY_HOMEBREW_FORMAT
}

export function invalidBackupJsonMessage(
  kind?: 'character' | 'homebrew',
): string {
  if (kind === 'character') {
    return `Arquivo inválido. Use um JSON de personagem exportado pelo ${APP_NAME}.`
  }
  if (kind === 'homebrew') {
    return `Arquivo inválido. Use um JSON de homebrew exportado pelo ${APP_NAME}.`
  }
  return `Arquivo inválido. Use um JSON exportado pelo ${APP_NAME}.`
}
