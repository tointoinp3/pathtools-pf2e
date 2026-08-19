import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Field, Input } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import {
  CharacterJsonButtons,
  HomebrewJsonButtons,
} from '@/features/backup/JsonExchangeButtons'
import { useSettingsStore } from '@/stores/settingsStore'
import { ThemePicker } from '@/features/settings/ThemePicker'
import {
  DEFAULT_DICE_TOAST_DURATION_SECONDS,
  DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
  SOURCE_TOOLTIP_DELAY_MAX,
  SOURCE_TOOLTIP_DELAY_MIN,
  UI_SCALE_DEFAULT,
  UI_SCALE_MAX,
  UI_SCALE_MIN,
  UI_SCALE_STEP,
  clampSourceTooltipDelaySeconds,
  clampUiScale,
} from '@/types'

const SCALE_PRESETS = [
  { label: 'Menor', value: 0.9 },
  { label: 'Padrão', value: UI_SCALE_DEFAULT },
  { label: 'Maior', value: 1.15 },
  { label: 'Grande', value: 1.3 },
] as const

export function SettingsPage() {
  const { settings, load, update } = useSettingsStore()

  useEffect(() => {
    void load()
  }, [load])

  if (!settings) {
    return <div className="p-4 text-sm text-text-muted">Carregando…</div>
  }

  const duration = settings.diceToastDurationSeconds
  const scalePct = Math.round(settings.uiScale * 100)

  return (
    <div className="mx-auto max-w-xl animate-fade-up space-y-3 p-5">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Preferências da interface e regras da mesa — seus dados continuam
          locais.
        </p>
      </div>

      <Tip>
        Ative “Detalhar modificadores” para ver, ao passar o mouse, de onde vem
        cada bônus (atributo, proficiência, origem…). Nas configurações você
        escolhe se aparece na hora, depois de alguns segundos, ou se some. Use
        Ctrl + scroll para mudar o tamanho do texto na hora.
      </Tip>

      <Panel title="Tamanho do texto">
        <Field
          label={`Escala da interface · ${scalePct}%`}
          hint={`Letras, números e a maior parte da UI (entre ${Math.round(UI_SCALE_MIN * 100)}% e ${Math.round(UI_SCALE_MAX * 100)}%).`}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {SCALE_PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  size="sm"
                  variant={
                    Math.abs(settings.uiScale - preset.value) < 0.001
                      ? 'accent'
                      : 'secondary'
                  }
                  onClick={() => void update({ uiScale: preset.value })}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="h-8 w-8 rounded-lg border border-border text-sm hover:border-accent/50"
                aria-label="Diminuir texto"
                onClick={() =>
                  void update({
                    uiScale: clampUiScale(settings.uiScale - UI_SCALE_STEP),
                  })
                }
              >
                A−
              </button>
              <input
                type="range"
                min={UI_SCALE_MIN}
                max={UI_SCALE_MAX}
                step={UI_SCALE_STEP}
                value={settings.uiScale}
                onChange={(e) =>
                  void update({
                    uiScale: clampUiScale(Number(e.target.value)),
                  })
                }
                className="h-2 w-full cursor-pointer accent-[var(--color-accent)]"
              />
              <button
                type="button"
                className="h-8 w-8 rounded-lg border border-border text-sm hover:border-accent/50"
                aria-label="Aumentar texto"
                onClick={() =>
                  void update({
                    uiScale: clampUiScale(settings.uiScale + UI_SCALE_STEP),
                  })
                }
              >
                A+
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-text-dim">
              <span className="tabular-nums">{scalePct}%</span>
              {settings.uiScale !== UI_SCALE_DEFAULT && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => void update({ uiScale: UI_SCALE_DEFAULT })}
                >
                  Resetar 100%
                </Button>
              )}
            </div>
          </div>
        </Field>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Ctrl + scroll do mouse</div>
            <div className="text-xs text-text-dim">
              Ajusta a escala na hora (⌘ + scroll no Mac). Enquanto estiver
              ligado, o zoom do navegador fica desativado neste atalho.
            </div>
          </div>
          <Button
            size="sm"
            variant={
              settings.ctrlScrollZoomEnabled ? 'accent' : 'secondary'
            }
            onClick={() =>
              void update({
                ctrlScrollZoomEnabled: !settings.ctrlScrollZoomEnabled,
              })
            }
          >
            {settings.ctrlScrollZoomEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>
      </Panel>

      <Panel title="Interface">
        <Field label="Idioma">
          <div className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-sm text-text-muted">
            Português (Brasil)
          </div>
        </Field>
        <div className="mt-3">
          <Field
            label="Tema"
            hint="Padrão: igual ao claro/escuro do sistema. Você pode travar em um dos dois."
          >
            <ThemePicker />
          </Field>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium">Detalhar modificadores</div>
              <div className="text-xs text-text-dim">
                Mostra de onde veio cada número ao passar o mouse na ficha
                (atributos, PV, CA, perícias…).
              </div>
            </div>
            <Button
              size="sm"
              variant={settings.showModifierBreakdown ? 'accent' : 'secondary'}
              onClick={() =>
                void update({
                  showModifierBreakdown: !settings.showModifierBreakdown,
                })
              }
            >
              {settings.showModifierBreakdown ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          <div
            className={`mt-3 border-t border-border/60 pt-3 ${
              settings.showModifierBreakdown ? '' : 'opacity-50'
            }`}
          >
            <Field
              label={`Espera para aparecer · ${
                settings.sourceTooltipDelaySeconds <= 0
                  ? 'instantâneo'
                  : `${settings.sourceTooltipDelaySeconds}s`
              }`}
              hint={
                settings.showModifierBreakdown
                  ? settings.sourceTooltipDelaySeconds <= 0
                    ? 'Aparece na hora. Padrão: 3 segundos.'
                    : `O mouse precisa ficar parado ${settings.sourceTooltipDelaySeconds}s. Padrão: 3 segundos.`
                  : 'Ligue acima para o tooltip voltar a aparecer.'
              }
            >
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      { label: 'Instantâneo', value: 0 },
                      { label: '3s', value: DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS },
                      { label: '10s', value: SOURCE_TOOLTIP_DELAY_MAX },
                    ] as const
                  ).map((preset) => (
                    <Button
                      key={preset.label}
                      size="sm"
                      disabled={!settings.showModifierBreakdown}
                      variant={
                        settings.showModifierBreakdown &&
                        settings.sourceTooltipDelaySeconds === preset.value
                          ? 'accent'
                          : 'secondary'
                      }
                      onClick={() =>
                        void update({
                          sourceTooltipDelaySeconds: preset.value,
                        })
                      }
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={SOURCE_TOOLTIP_DELAY_MIN}
                    max={SOURCE_TOOLTIP_DELAY_MAX}
                    step={1}
                    disabled={!settings.showModifierBreakdown}
                    value={settings.sourceTooltipDelaySeconds}
                    onChange={(e) =>
                      void update({
                        sourceTooltipDelaySeconds:
                          clampSourceTooltipDelaySeconds(
                            Number(e.target.value),
                          ),
                      })
                    }
                    className="h-2 w-full cursor-pointer accent-[var(--color-accent)] disabled:cursor-not-allowed"
                    aria-label="Espera do tooltip de fontes, em segundos"
                  />
                  <span className="w-16 shrink-0 text-right text-xs tabular-nums text-text-dim">
                    {settings.sourceTooltipDelaySeconds <= 0
                      ? 'na hora'
                      : `${settings.sourceTooltipDelaySeconds}s`}
                  </span>
                </div>
              </div>
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title="Regras da mesa">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Arquétipos grátis</div>
            <div className="text-xs text-text-dim">
              Variante do GM Core (pág. 84): no 2º nível e em todos os pares
              (4, 6… 20), o personagem ganha um feito extra que só serve para
              feitos de arquétipo. Os feitos de classe normais continuam
              iguais. Desligar remove os feitos desses slots extras.
            </div>
          </div>
          <Button
            size="sm"
            variant={settings.freeArchetypeEnabled ? 'accent' : 'secondary'}
            onClick={() =>
              void update({
                freeArchetypeEnabled: !settings.freeArchetypeEnabled,
              })
            }
          >
            {settings.freeArchetypeEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>

        <div
          className={`mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3 ${
            settings.freeArchetypeEnabled ? '' : 'opacity-60'
          }`}
        >
          <div>
            <div className="text-sm font-medium">
              Ignorar bloqueio entre Dedicações
            </div>
            <div className="text-xs text-text-dim">
              Opcional da mesma regra: se o grupo compartilha um arquétipo (ou
              uma lista limitada), o GM Core sugere não exigir os 2 feitos
              extras antes de outra Dedicação. Só vale com Arquétipos grátis
              ligado.
            </div>
          </div>
          <Button
            size="sm"
            disabled={!settings.freeArchetypeEnabled}
            variant={
              settings.freeArchetypeEnabled &&
              settings.freeArchetypeIgnoreDedicationLock
                ? 'accent'
                : 'secondary'
            }
            onClick={() =>
              void update({
                freeArchetypeIgnoreDedicationLock:
                  !settings.freeArchetypeIgnoreDedicationLock,
              })
            }
          >
            {settings.freeArchetypeIgnoreDedicationLock
              ? 'Ativado'
              : 'Desativado'}
          </Button>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-text-dim">
          Com Arquétipos grátis, o bônus de feitos que somam PV por feito de
          arquétipo (Resiliência de multiclasse) conta no máximo metade do
          nível do personagem. A ficha já aplica esse teto nos PV.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Ancestralidade paragon</div>
            <div className="text-xs text-text-dim">
              GM Core: 2 feitos de ancestralidade no 1º nível e mais um em
              cada ímpar (3–19). São 11 feitos no total, no lugar dos 5
              normais.
            </div>
          </div>
          <Button
            size="sm"
            variant={settings.ancestryParagonEnabled ? 'accent' : 'secondary'}
            onClick={() =>
              void update({
                ancestryParagonEnabled: !settings.ancestryParagonEnabled,
              })
            }
          >
            {settings.ancestryParagonEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Classe dupla</div>
            <div className="text-xs text-text-dim">
              GM Core: o personagem tem duas classes — recursos, feitos e PV
              das duas. Proficiências iguais ficam no posto mais alto. Na
              ficha aparece um segundo seletor de classe.
            </div>
          </div>
          <Button
            size="sm"
            variant={settings.dualClassEnabled ? 'accent' : 'secondary'}
            onClick={() =>
              void update({
                dualClassEnabled: !settings.dualClassEnabled,
              })
            }
          >
            {settings.dualClassEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Aumentos graduais</div>
            <div className="text-xs text-text-dim">
              GM Core: em vez de 4 aumentos nos níveis 5, 10, 15 e 20, você
              recebe 1 aumento nos níveis 2–5, 7–10, 12–15 e 17–20. Não
              repete o mesmo atributo no mesmo bloco de quatro.
            </div>
          </div>
          <Button
            size="sm"
            variant={
              settings.gradualAbilityBoostsEnabled ? 'accent' : 'secondary'
            }
            onClick={() =>
              void update({
                gradualAbilityBoostsEnabled:
                  !settings.gradualAbilityBoostsEnabled,
              })
            }
          >
            {settings.gradualAbilityBoostsEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">
              Progressão automática de bônus
            </div>
            <div className="text-xs text-text-dim">
              GM Core pág. 83: a ficha ganha potência de ataque, defesa,
              percepção, salvaguardas e perícias no lugar de runas
              fundamentais. Ápice automático no 17º. Runas de propriedade
              continuam iguais.
            </div>
          </div>
          <Button
            size="sm"
            variant={
              settings.automaticBonusProgressionEnabled
                ? 'accent'
                : 'secondary'
            }
            onClick={() =>
              void update({
                automaticBonusProgressionEnabled:
                  !settings.automaticBonusProgressionEnabled,
              })
            }
          >
            {settings.automaticBonusProgressionEnabled
              ? 'Ativado'
              : 'Desativado'}
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Proficiência sem nível</div>
            <div className="text-xs text-text-dim">
              GM Core pág. 85: o bônus de proficiência não soma o nível.
              Destreinado vale −2; treinado +2, perito +4, mestre +6,
              lendário +8. Combate fica mais perigoso em níveis altos.
            </div>
          </div>
          <Button
            size="sm"
            variant={
              settings.proficiencyWithoutLevelEnabled ? 'accent' : 'secondary'
            }
            onClick={() =>
              void update({
                proficiencyWithoutLevelEnabled:
                  !settings.proficiencyWithoutLevelEnabled,
              })
            }
          >
            {settings.proficiencyWithoutLevelEnabled
              ? 'Ativado'
              : 'Desativado'}
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/50 px-3 py-3">
          <div>
            <div className="text-sm font-medium">Regras míticas</div>
            <div className="text-xs text-text-dim">
              War of Immortals: cada personagem escolhe um chamado, ganha
              Reescrever o Destino, Pontos Míticos (3, no lugar dos pontos de
              herói) e um feito mítico extra nos níveis pares. No 12º o extra
              é a Dedicação de um destino mítico. Desligar some os slots extras
              e volta os pontos de herói.{' '}
              <Link
                to="/compendio/guias?id=mythic-rules"
                className="text-accent hover:underline"
              >
                Guia completo
              </Link>
              .
            </div>
          </div>
          <Button
            size="sm"
            variant={settings.mythicRulesEnabled ? 'accent' : 'secondary'}
            onClick={() =>
              void update({
                mythicRulesEnabled: !settings.mythicRulesEnabled,
              })
            }
          >
            {settings.mythicRulesEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>
      </Panel>

      <Panel title="Dados">
        <Field
          label="Tempo do resultado na tela"
          hint={
            duration <= 0
              ? 'Só some quando você apertar o X.'
              : `Some sozinho após ${duration}s (ou no X). Padrão: ${DEFAULT_DICE_TOAST_DURATION_SECONDS}s.`
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="number"
              min={0}
              max={300}
              className="w-24"
              value={duration}
              onChange={(e) => {
                const value = Math.max(
                  0,
                  Math.min(300, Number(e.target.value) || 0),
                )
                void update({ diceToastDurationSeconds: value })
              }}
            />
            <span className="text-xs text-text-muted">segundos</span>
            <Button
              size="sm"
              variant={duration === 0 ? 'accent' : 'secondary'}
              onClick={() => void update({ diceToastDurationSeconds: 0 })}
            >
              Só no X
            </Button>
            <Button
              size="sm"
              variant={
                duration === DEFAULT_DICE_TOAST_DURATION_SECONDS
                  ? 'accent'
                  : 'secondary'
              }
              onClick={() =>
                void update({
                  diceToastDurationSeconds: DEFAULT_DICE_TOAST_DURATION_SECONDS,
                })
              }
            >
              30s
            </Button>
          </div>
        </Field>
      </Panel>

      <Panel title="Persistência">
        <p className="text-sm text-text-muted">
          Dados salvos localmente via IndexedDB (Dexie). Personagens, retratos,
          origens homebrew e fontes permanecem após fechar o navegador.
        </p>
        <p className="mt-2 text-xs text-text-dim">
          Versão do seed: {settings.seedVersion}
        </p>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-border bg-surface-2/50 px-3 py-3">
            <div className="text-sm font-medium">Personagens</div>
            <p className="mt-1 text-xs text-text-dim">
              Cópia de segurança das fichas (com retrato). Dá para marcar
              várias na lista de personagens ou importar vários JSON de uma
              vez. Se o ID já existir, pergunta se substitui ou cria cópia.
            </p>
            <div className="mt-2">
              <CharacterJsonButtons />
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-2/50 px-3 py-3">
            <div className="text-sm font-medium">Homebrew</div>
            <p className="mt-1 text-xs text-text-dim">
              Classes, ancestralidades, feitos e o resto que você criou. Marque
              um lote na página Homebrew, ou importe vários JSON de uma vez. O
              conteúdo oficial do livro nunca é sobrescrito.
            </p>
            <div className="mt-2">
              <HomebrewJsonButtons kind="all" />
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}
