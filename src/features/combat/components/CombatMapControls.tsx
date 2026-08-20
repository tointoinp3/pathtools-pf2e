import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  MAP_SIZE_MAX,
  MAP_SIZE_MIN,
  centerMapOnGrid,
  mapContainInGrid,
  parseMapWidthInput,
  readImageAspect,
  setMapWidthCentered,
} from '@/engine/combatMap'
import {
  deleteMapImage,
  saveTokenImage,
} from '@/features/combat/combatImageRepository'
import { useCombatStore } from '@/stores/combatStore'

export function CombatMapButtons({
  hasMap,
  adjusting,
  onAdjustingChange,
  onImported,
}: {
  hasMap: boolean
  adjusting: boolean
  onAdjustingChange: (next: boolean) => void
  onImported: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const bumpImageVersion = useCombatStore((s) => s.bumpImageVersion)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | null | undefined) {
    if (!file) return
    const store = useCombatStore.getState()
    const current = store.current
    if (!current) return
    if (!file.type.startsWith('image/')) {
      setError('Escolha um arquivo de imagem (png, jpg, webp…).')
      return
    }
    try {
      const aspect = await readImageAspect(file)
      await saveTokenImage('map', current.id, file)
      const backdrop = mapContainInGrid(
        aspect,
        current.gridCols,
        current.gridRows,
      )
      store.mutate((session) => ({
        ...session,
        mapBackdrop: backdrop,
        gridLineOpacity: session.gridLineOpacity ?? 0.55,
      }))
      bumpImageVersion()
      setError(null)
      onImported()
      onAdjustingChange(true)
    } catch {
      setError('Não deu para ler essa imagem.')
    }
  }

  async function handleRemove() {
    const store = useCombatStore.getState()
    const current = store.current
    if (!current) return
    await deleteMapImage(current.id)
    store.mutate((session) => ({ ...session, mapBackdrop: null }))
    bumpImageVersion()
    onAdjustingChange(false)
    setError(null)
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/*"
        className="hidden"
        onChange={(event) => {
          void handleFile(event.target.files?.[0])
          event.target.value = ''
        }}
      />
      <Button
        size="sm"
        title="Imagem de fundo do tabuleiro (mapa da dungeon, taverna…)"
        onClick={() => inputRef.current?.click()}
      >
        {hasMap ? 'Trocar cenário…' : 'Cenário…'}
      </Button>
      {hasMap ? (
        <>
          <Button
            size="sm"
            variant={adjusting ? 'accent' : 'secondary'}
            aria-pressed={adjusting}
            title="Arraste os cantos no mapa ou use a barra de largura"
            onClick={() => onAdjustingChange(!adjusting)}
          >
            {adjusting ? 'Ajustando…' : 'Ajustar tamanho'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            title="Tira o cenário deste combate"
            onClick={() => void handleRemove()}
          >
            Remover
          </Button>
        </>
      ) : null}
      {error ? (
        <span className="text-[11px] text-danger">{error}</span>
      ) : null}
    </div>
  )
}

export function CombatMapAdjustBar({
  onDone,
}: {
  onDone: () => void
}) {
  const session = useCombatStore((s) => s.current)
  const map = session?.mapBackdrop
  const [widthText, setWidthText] = useState('')

  useEffect(() => {
    if (!map) return
    setWidthText(formatWidth(map.width))
  }, [map?.width, map])

  if (!session || !map) return null

  const sliderMax = Math.min(
    MAP_SIZE_MAX,
    Math.max(session.gridCols * 2, map.width, 16),
  )

  function commitWidth(next: number) {
    const store = useCombatStore.getState()
    const current = store.current?.mapBackdrop
    if (!current) return
    store.mutate((s) =>
      s.mapBackdrop
        ? { ...s, mapBackdrop: setMapWidthCentered(s.mapBackdrop, next) }
        : s,
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-info/35 bg-info/10 px-3 py-2">
      <p className="text-[11px] font-medium text-info">
        Arraste os cantos azuis no mapa até os quadradinhos baterem. Shift =
        ajuste fino.
      </p>
      <span className="text-[11px] text-text-dim">Largura</span>
      <input
        type="range"
        aria-label="Largura do cenário em quadrados"
        min={MAP_SIZE_MIN}
        max={sliderMax}
        step={0.5}
        value={Math.min(sliderMax, Math.max(MAP_SIZE_MIN, map.width))}
        className="w-40 accent-[var(--color-info)]"
        onPointerDown={() => useCombatStore.getState().beginStroke()}
        onPointerUp={() => useCombatStore.getState().endStroke()}
        onPointerCancel={() => useCombatStore.getState().endStroke()}
        onFocus={() => useCombatStore.getState().beginStroke()}
        onBlur={() => useCombatStore.getState().endStroke()}
        onChange={(event) => {
          const width = Number(event.target.value)
          const store = useCombatStore.getState()
          const current = store.current?.mapBackdrop
          if (!current) return
          store.preview((s) =>
            s.mapBackdrop
              ? { ...s, mapBackdrop: setMapWidthCentered(s.mapBackdrop, width) }
              : s,
          )
        }}
      />
      <Input
        type="text"
        inputMode="decimal"
        aria-label="Largura em quadrados"
        title="Se o mapa já tem quadradinhos, ponha quantos cabem na largura"
        className="w-16 text-center"
        value={widthText}
        onChange={(event) => {
          setWidthText(event.target.value)
        }}
        onBlur={() => {
          const parsed = parseMapWidthInput(widthText)
          if (parsed == null) {
            setWidthText(formatWidth(map.width))
            return
          }
          commitWidth(parsed)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur()
        }}
      />
      <span className="text-[11px] text-text-dim">quadrados</span>
      <Button
        size="sm"
        title="A imagem inteira cabe no tabuleiro"
        onClick={() => {
          const store = useCombatStore.getState()
          const current = store.current
          if (!current?.mapBackdrop) return
          store.mutate((s) =>
            s.mapBackdrop
              ? {
                  ...s,
                  mapBackdrop: mapContainInGrid(
                    s.mapBackdrop.aspect,
                    s.gridCols,
                    s.gridRows,
                  ),
                }
              : s,
          )
        }}
      >
        Encaixar no tabuleiro
      </Button>
      <Button
        size="sm"
        onClick={() => {
          const store = useCombatStore.getState()
          const current = store.current
          if (!current?.mapBackdrop) return
          store.mutate((s) =>
            s.mapBackdrop
              ? {
                  ...s,
                  mapBackdrop: centerMapOnGrid(
                    s.mapBackdrop,
                    s.gridCols,
                    s.gridRows,
                  ),
                }
              : s,
          )
        }}
      >
        Centralizar
      </Button>
      <Button size="sm" variant="accent" onClick={onDone}>
        Pronto
      </Button>
    </div>
  )
}

function formatWidth(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}
