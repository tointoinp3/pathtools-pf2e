import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { Tip } from '@/components/ui/Panel'
import {
  CharacterJsonButtons,
} from '@/features/backup/JsonExchangeButtons'
import { BatchSelectBar } from '@/features/backup/BatchSelectBar'
import {
  runCharacterExportMany,
  runCharacterExportOne,
} from '@/features/backup/characterBackup'
import { CharacterPortraitThumb } from '@/features/characters/components/CharacterPortraitThumb'
import { GroupsPanel, CharacterGroupSelect } from '@/features/groups/GroupsPanel'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useCharacterStore } from '@/stores/characterStore'
import { useClassStore } from '@/stores/classStore'
import { useGroupStore } from '@/stores/groupStore'

type SortMode = 'updated' | 'name' | 'level'

const SORT_LABELS: Record<SortMode, string> = {
  updated: 'Atualizado recentemente',
  name: 'Nome (A–Z)',
  level: 'Nível (maior primeiro)',
}

/** Normaliza para busca sem acento e sem caixa */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

export function CharactersPage() {
  const navigate = useNavigate()
  const { characters, loading, loadAll, createNew, remove, duplicate } =
    useCharacterStore()
  const loadAncestries = useAncestryStore((s) => s.loadAll)
  const getAncestryById = useAncestryStore((s) => s.getAncestryById)
  const loadBackgrounds = useBackgroundStore((s) => s.loadAll)
  const getBackgroundById = useBackgroundStore((s) => s.getById)
  const loadClasses = useClassStore((s) => s.loadAll)
  const getClassById = useClassStore((s) => s.getById)
  const groups = useGroupStore((s) => s.groups)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const moveCharacters = useGroupStore((s) => s.moveCharacters)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortMode>('updated')
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [exportBusy, setExportBusy] = useState(false)

  useEffect(() => {
    void loadAll()
    void loadAncestries()
    void loadBackgrounds()
    void loadClasses()
    void loadGroups()
  }, [loadAll, loadAncestries, loadBackgrounds, loadClasses, loadGroups])

  async function handleCreate() {
    const character = await createNew()
    navigate(`/personagens/${character.id}`)
  }

  /** Busca por nome do personagem, jogador, ancestralidade, origem e classe */
  const visible = useMemo(() => {
    const q = normalize(query.trim())
    const matches = q
      ? characters.filter((c) => {
          const haystack = [
            c.name,
            c.playerName ?? '',
            c.ancestryId ? (getAncestryById(c.ancestryId)?.name ?? '') : '',
            c.backgroundId ? (getBackgroundById(c.backgroundId)?.name ?? '') : '',
            c.classId ? (getClassById(c.classId)?.name ?? '') : '',
          ].join(' ')
          return normalize(haystack).includes(q)
        })
      : characters

    const sorted = [...matches]
    if (sort === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    } else if (sort === 'level') {
      sorted.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name, 'pt-BR'))
    }
    // 'updated' já vem ordenado do repositório
    return sorted
  }, [
    characters,
    query,
    sort,
    getAncestryById,
    getBackgroundById,
    getClassById,
  ])

  const sections = useMemo(() => {
    if (groups.length === 0) {
      return [{ id: 'all', title: null as string | null, items: visible }]
    }
    const grouped = groups.map((group) => ({
      id: group.id,
      title: group.name,
      items: visible.filter((c) => c.groupId === group.id),
    }))
    const orphans = visible.filter((c) => !c.groupId)
    return [
      ...grouped.filter((section) => section.items.length > 0),
      ...(orphans.length > 0
        ? [{ id: 'orphan', title: 'Sem grupo', items: orphans }]
        : []),
    ]
  }, [groups, visible])

  useEffect(() => {
    const ids = new Set(characters.map((c) => c.id))
    setSelected((prev) => {
      const next = new Set([...prev].filter((id) => ids.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [characters])

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function exportSelected() {
    const chosen = visible.filter((c) => selected.has(c.id))
    setExportBusy(true)
    try {
      await runCharacterExportMany(chosen)
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Falha ao exportar o lote.',
      )
    } finally {
      setExportBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl animate-fade-up p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Meus Personagens
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Fichas locais de Pathfinder 2e — salvas neste navegador. Agrupe
            campanhas e ative um grupo para filtrar saque e inventário da mesa.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CharacterJsonButtons />
          <Button variant="accent" onClick={() => void handleCreate()}>
            + Criar Personagem
          </Button>
        </div>
      </div>

      <Tip>
        Na ficha, o ícone de <strong>dado</strong> ao lado das perícias rola com
        modificadores prontos. A bandeja no canto inferior direito serve para
        dados livres. Marque várias fichas para exportar um único JSON, movê-las
        de grupo, ou importe vários arquivos de uma vez.
      </Tip>

      <div className="mt-4">
        <GroupsPanel characters={characters} selectedIds={[...selected]} />
      </div>

      {characters.length > 0 && (
        <div className="mt-4">
          <BatchSelectBar
            selectedCount={visible.filter((c) => selected.has(c.id)).length}
            totalCount={visible.length}
            nounOne="personagem"
            nounMany="personagens"
            onSelectAll={() =>
              setSelected(new Set(visible.map((c) => c.id)))
            }
            onClear={() => setSelected(new Set())}
            onExport={() => void exportSelected()}
            exportBusy={exportBusy}
          >
            {groups.length > 0 && selected.size > 0 ? (
              <Select
                className="w-48"
                defaultValue=""
                aria-label="Mover selecionados para grupo"
                onChange={(e) => {
                  const value = e.target.value
                  e.target.value = ''
                  if (!value) return
                  void moveCharacters(
                    [...selected],
                    value === '__none__' ? null : value,
                  ).then(() => loadAll())
                }}
              >
                <option value="">Mover para grupo…</option>
                <option value="__none__">Sem grupo</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
            ) : null}
          </BatchSelectBar>
        </div>
      )}

      {characters.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, jogador, ancestralidade, origem ou classe…"
            aria-label="Buscar personagens"
            className="max-w-md flex-1"
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            aria-label="Ordenar personagens"
            className="w-56"
          >
            {(Object.keys(SORT_LABELS) as SortMode[]).map((mode) => (
              <option key={mode} value={mode}>
                {SORT_LABELS[mode]}
              </option>
            ))}
          </Select>
          <span className="text-[11px] text-text-dim">
            {visible.length} de {characters.length}
          </span>
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-text-dim">Carregando fichas…</p>
        ) : characters.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-14 text-center">
            <div className="font-display text-lg text-accent">Comece sua lenda</div>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
              Ainda não há personagens. Crie o primeiro e escolha uma origem —
              a ficha já calcula atributos, perícias e conhecimentos.
            </p>
            <Button
              className="mt-5"
              variant="accent"
              onClick={() => void handleCreate()}
            >
              Criar Personagem
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-10 text-center">
            <p className="text-sm text-text-muted">
              Nenhum personagem encontrado para “{query}”.
            </p>
            <Button className="mt-4" size="sm" onClick={() => setQuery('')}>
              Limpar busca
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.id}>
                {section.title ? (
                  <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent/85">
                    {section.title}
                    <span className="ml-2 font-sans text-[11px] font-normal normal-case tracking-normal text-text-dim">
                      {section.items.length}
                    </span>
                  </h2>
                ) : null}
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((c) => {
              const ancestryName = c.ancestryId
                ? getAncestryById(c.ancestryId)?.name
                : null
              const backgroundName = c.backgroundId
                ? getBackgroundById(c.backgroundId)?.name
                : null
              const className = c.classId
                ? getClassById(c.classId)?.name
                : null

              return (
                <li
                  key={c.id}
                  className={`interactive-lift group rounded-xl border bg-surface-1/90 p-4 hover:border-accent/40 ${
                    selected.has(c.id)
                      ? 'border-accent/60'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <label className="mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-[var(--color-accent)]"
                        checked={selected.has(c.id)}
                        onChange={() => toggleSelected(c.id)}
                        aria-label={`Selecionar ${c.name}`}
                      />
                    </label>
                    <CharacterPortraitThumb
                      portraitId={c.portraitId}
                      name={c.name}
                    />
                    <div className="min-w-0 flex-1">
                    <Link
                      to={`/personagens/${c.id}`}
                      className="block truncate font-display text-base font-semibold text-text transition-colors group-hover:text-accent"
                    >
                      {c.name}
                    </Link>
                    <div className="mt-1.5 text-xs text-text-dim">
                      Nível {c.level}
                      {c.playerName ? ` · ${c.playerName}` : ''}
                    </div>
                    <dl className="mt-2.5 space-y-1 text-[11px]">
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-text-dim">
                          Ancestralidade
                        </dt>
                        <dd className="min-w-0 truncate font-medium text-text-muted">
                          {ancestryName ?? '—'}
                        </dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-text-dim">Origem</dt>
                        <dd className="min-w-0 truncate font-medium text-text-muted">
                          {backgroundName ?? '—'}
                        </dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-text-dim">Classe</dt>
                        <dd className="min-w-0 truncate font-medium text-text-muted">
                          {className ?? '—'}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-2 text-[11px] text-text-dim">
                      Atualizado{' '}
                      {new Date(c.updatedAt).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </div>
                    <CharacterGroupSelect
                      characterId={c.id}
                      groupId={c.groupId}
                      groups={groups}
                    />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => navigate(`/personagens/${c.id}`)}
                    >
                      Abrir ficha
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/personagens/${c.id}/sessao`)}
                    >
                      Ficha de sessão
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        void duplicate(c.id)
                          .then((copy) => navigate(`/personagens/${copy.id}`))
                          .catch((error) =>
                            window.alert(
                              error instanceof Error
                                ? error.message
                                : 'Falha ao duplicar o personagem.',
                            ),
                          )
                      }}
                    >
                      Duplicar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        void runCharacterExportOne(c).catch((error) =>
                          window.alert(
                            error instanceof Error
                              ? error.message
                              : 'Falha ao exportar o personagem.',
                          ),
                        )
                      }}
                    >
                      Exportar JSON
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Excluir o personagem "${c.name}"? Esta ação não pode ser desfeita.`,
                          )
                        ) {
                          void remove(c.id)
                        }
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                </li>
              )
            })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
