import { Button } from '@/components/ui/Button'
import {
  actsInInitiative,
  advanceTurn,
  effectiveInitiativeBonus,
  endCombatReset,
  hpTone,
  initiativeOrder,
  restartCombat,
  rollAllInitiatives,
  startCombat,
  stopCombat,
  type HpTone,
} from '@/engine/combat'
import { useCombatStore } from '@/stores/combatStore'

/** Centraliza a ficha do turno na área visível do tabuleiro. */
export function scrollTokenIntoView(tokenId: string) {
  requestAnimationFrame(() => {
    document
      .querySelector(`[data-token-id="${tokenId}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  })
}

const HP_DOT: Record<HpTone, string> = {
  ok: 'bg-success',
  hurt: 'bg-accent',
  critical: 'bg-danger',
  down: 'bg-danger',
}

export function InitiativePanel() {
  const session = useCombatStore((s) => s.current)
  const selectedTokenId = useCombatStore((s) => s.selectedTokenId)
  const selectToken = useCombatStore((s) => s.selectToken)
  const mutate = useCombatStore((s) => s.mutate)
  const updateToken = useCombatStore((s) => s.updateToken)

  if (!session) return null
  const combatants = session.tokens.filter(actsInInitiative)
  const order = initiativeOrder(combatants)
  const missingInitiative = combatants.some(
    (token) => token.initiative == null && !token.defeated,
  )
  const started = session.turnTokenId != null
  const anyInitiative = combatants.some((token) => token.initiative != null)

  function focusTurnToken() {
    const turnId = useCombatStore.getState().current?.turnTokenId
    if (turnId) {
      selectToken(turnId)
      scrollTokenIntoView(turnId)
    }
  }

  function handleNextTurn() {
    mutate((s) => advanceTurn(s))
    focusTurnToken()
  }

  function handleStart() {
    mutate(startCombat)
    focusTurnToken()
  }

  function handleRestart() {
    mutate(restartCombat)
    focusTurnToken()
  }

  function handleStop() {
    mutate(stopCombat)
  }

  function handleRollMissing() {
    mutate((s) => rollAllInitiatives(s, { onlyMissing: true }))
  }

  function handleRollAll() {
    mutate((s) => rollAllInitiatives(s))
  }

  function handleEndCombat() {
    mutate(endCombatReset)
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface-1">
      <div className="border-b border-border/70 px-3 py-2.5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
            Iniciativa
          </h2>
          <span className="text-xs text-text-muted">
            Rodada{' '}
            <span className="font-display text-sm font-semibold text-text">
              {session.round}
            </span>
          </span>
        </div>
        <div className="mt-2 flex gap-1.5">
          <Button
            size="sm"
            variant="accent"
            className="flex-1"
            disabled={combatants.every((token) => token.defeated)}
            title={
              started
                ? 'Passa para a próxima ficha na ordem'
                : 'Rola iniciativa de quem falta e já entra na ordem'
            }
            onClick={started ? handleNextTurn : handleStart}
          >
            {started ? 'Próximo turno' : '▶ Começar'}
          </Button>
          <Button
            size="sm"
            disabled={!missingInitiative}
            title="Rola d20 + bônus para quem ainda não tem iniciativa"
            onClick={handleRollMissing}
          >
            Rolar
          </Button>
        </div>
        {!started && anyInitiative ? (
          <Button
            size="sm"
            variant="ghost"
            className="mt-1.5 w-full"
            title="Rerola d20 + bônus para todos os combatentes (sem começar)"
            onClick={handleRollAll}
          >
            Rerolar tudo
          </Button>
        ) : null}
        {started ? (
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="px-1"
              title="Volta para a rodada 1 e o primeiro da ordem, mantendo as iniciativas"
              onClick={handleRestart}
            >
              Reiniciar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="px-1"
              title="Volta para antes da rodada 1, mantendo as iniciativas"
              onClick={handleStop}
            >
              Parar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="px-1"
              title="Zera rodada, turno, iniciativas e ações"
              onClick={handleEndCombat}
            >
              Encerrar
            </Button>
          </div>
        ) : anyInitiative ? (
          <Button
            size="sm"
            variant="ghost"
            className="mt-1.5 w-full"
            title="Zera rodada, turno, iniciativas e ações"
            onClick={handleEndCombat}
          >
            Encerrar combate
          </Button>
        ) : null}
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto p-1.5">
        {order.length === 0 ? (
          <li className="px-2 py-4 text-center text-xs text-text-dim">
            Sem fichas no tabuleiro.
          </li>
        ) : (
          order.map((token) => {
            const selected = token.id === selectedTokenId
            const active = token.id === session.turnTokenId
            const tone = hpTone(token.currentHp, token.maxHp)
            const effBonus = effectiveInitiativeBonus(token)
            const bonusHint =
              effBonus !== token.initiativeBonus
                ? `d20 ${effBonus >= 0 ? '+' : ''}${effBonus} (base ${token.initiativeBonus >= 0 ? '+' : ''}${token.initiativeBonus}, condições)`
                : `d20 ${token.initiativeBonus >= 0 ? '+' : ''}${token.initiativeBonus}`
            return (
              <li key={token.id}>
                <div
                  className={`group flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${
                    selected
                      ? 'bg-info/15'
                      : active
                        ? 'bg-accent/12'
                        : 'hover:bg-surface-2'
                  }`}
                >
                  <span
                    className={`w-3 shrink-0 text-center text-[10px] ${
                      active ? 'text-accent' : 'text-transparent'
                    }`}
                    aria-hidden
                  >
                    ▶
                  </span>
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => selectToken(token.id)}
                  >
                    <span
                      className={`block truncate text-xs font-medium ${
                        token.defeated
                          ? 'text-text-dim line-through'
                          : 'text-text'
                      }`}
                    >
                      {token.name}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-text-dim">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${HP_DOT[tone]}`}
                      />
                      PV {token.currentHp}/{token.maxHp}
                    </span>
                  </button>
                  <input
                    type="number"
                    aria-label={`Iniciativa de ${token.name}`}
                    title={`Iniciativa (${bonusHint})`}
                    className="field-control w-11 shrink-0 rounded-md border border-border bg-surface-2 px-1 py-0.5 text-center text-xs text-text outline-none"
                    value={token.initiative ?? ''}
                    placeholder="—"
                    onChange={(event) => {
                      const raw = event.target.value
                      updateToken(token.id, {
                        initiative:
                          raw.trim() === '' ? null : Math.round(Number(raw)),
                      })
                    }}
                  />
                </div>
              </li>
            )
          })
        )}
      </ul>
    </aside>
  )
}
