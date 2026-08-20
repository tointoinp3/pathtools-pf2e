import type { CombatToken, TokenFacing } from '@/types'
import {
  hpTone,
  oppositeFacing,
  tokenConditionEffects,
  tokenKind,
  type HpTone,
} from '@/engine/combat'
import { useTokenImage } from '@/features/combat/useTokenImage'

/** Seta na borda da FRENTE da ficha (triângulo apontando para fora). */
const FRONT_MARKER: Record<TokenFacing, string> = {
  up: 'top-[1px] left-1/2 -translate-x-1/2',
  down: 'bottom-[1px] left-1/2 -translate-x-1/2 rotate-180',
  left: 'left-[1px] top-1/2 -translate-y-1/2 -rotate-90',
  right: 'right-[1px] top-1/2 -translate-y-1/2 rotate-90',
}

/** Faixa vermelha na borda das COSTAS (bônus de backstab entra aqui). */
const BACK_STRIP: Record<TokenFacing, string> = {
  up: 'top-0 inset-x-0 h-[3px]',
  down: 'bottom-0 inset-x-0 h-[3px]',
  left: 'left-0 inset-y-0 w-[3px]',
  right: 'right-0 inset-y-0 w-[3px]',
}

const HP_BAR_COLOR: Record<HpTone, string> = {
  ok: 'bg-success',
  hurt: 'bg-accent',
  critical: 'bg-danger',
  down: 'bg-danger',
}

export function TokenTileContent({
  token,
  cellSize,
  active,
}: {
  token: CombatToken
  cellSize: number
  active: boolean
}) {
  const { url } = useTokenImage(token.id, token.creatureId)
  const kind = tokenKind(token)
  const isLoot = kind === 'loot'
  const tone = hpTone(token.currentHp, token.maxHp)
  const hpFraction =
    token.maxHp > 0 ? Math.max(0, Math.min(1, token.currentHp / token.maxHp)) : 0
  const back = oppositeFacing(token.facing)
  const compact = cellSize * Math.min(token.w, token.h) < 40

  const framed = Boolean(url)
  const baseStyle = framed
    ? 'border-0 bg-transparent'
    : active
      ? 'border border-accent bg-surface-3'
      : isLoot
        ? 'border border-accent/70 bg-accent/15'
        : kind === 'character'
          ? 'border border-info/70 bg-info/10'
          : 'border border-border-strong bg-surface-3'

  return (
    <div
      className={`relative h-full w-full select-none overflow-hidden rounded-md ${baseStyle} ${
        token.defeated ? 'opacity-55 grayscale' : ''
      }`}
    >
      {url ? (
        <img
          src={url}
          alt={token.name}
          draggable={false}
          className="h-full w-full object-contain"
        />
      ) : null}

      {/* Nome: centralizado sem imagem; etiqueta na base com imagem */}
      {url ? (
        <div className="absolute inset-x-0 bottom-[6px] flex justify-center px-0.5">
          <span
            className={`max-w-full truncate rounded bg-black/65 px-1 font-medium leading-tight text-white ${
              compact ? 'text-[8px]' : 'text-[10px]'
            }`}
          >
            {token.name}
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-0.5">
          <span
            className={`line-clamp-3 break-words text-center font-medium leading-tight text-text ${
              compact ? 'text-[8px]' : 'text-[11px]'
            }`}
          >
            {token.name}
          </span>
        </div>
      )}

      {/* Barra de PV (baús não têm vida) */}
      {!isLoot && token.maxHp > 0 ? (
        <div className="absolute inset-x-1 bottom-[3px] h-[3px] overflow-hidden rounded-full bg-black/40">
          <div
            className={`h-full ${HP_BAR_COLOR[tone]}`}
            style={{ width: `${hpFraction * 100}%` }}
          />
        </div>
      ) : null}

      {/* Frente (seta) e costas (faixa vermelha) — irrelevante para baús */}
      {!isLoot ? (
        <>
          <div
            aria-hidden
            className={`absolute z-10 h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-accent drop-shadow-[0_0_2px_rgba(0,0,0,0.7)] ${FRONT_MARKER[token.facing]}`}
          />
          <div
            aria-hidden
            className={`absolute z-10 bg-danger/85 ${BACK_STRIP[back]}`}
          />
        </>
      ) : null}

      {/* Ações restantes da ficha com o turno ativo (Acelerado = 4 pontos) */}
      {active && !token.defeated ? (
        <div className="absolute right-1 top-1 flex gap-0.5">
          {(() => {
            const total = 3 + tokenConditionEffects(token).extraActions
            return Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full border border-black/40 ${
                  i < total - token.actionsUsed ? 'bg-accent' : 'bg-black/35'
                }`}
              />
            ))
          })()}
        </div>
      ) : null}

      {/* Contador de condições (o tooltip do token lista quais são) */}
      {!isLoot && token.conditions.length > 0 && !token.defeated ? (
        <span
          aria-label={`${token.conditions.length} condições`}
          className={`absolute left-1 top-1 z-10 flex items-center justify-center rounded-full border border-black/40 bg-info font-bold text-white ${
            compact
              ? 'h-3 w-3 text-[7px]'
              : 'h-3.5 min-w-3.5 px-0.5 text-[9px]'
          }`}
        >
          {token.conditions.length}
        </span>
      ) : null}

      {token.defeated ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-bold text-danger drop-shadow-[0_0_3px_rgba(0,0,0,0.9)]">
            ✕
          </span>
        </div>
      ) : null}
    </div>
  )
}
