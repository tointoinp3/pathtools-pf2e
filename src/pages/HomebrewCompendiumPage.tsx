import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useArchetypeStore } from '@/stores/archetypeStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useClassStore } from '@/stores/classStore'
import { useCompanionStore } from '@/stores/companionStore'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useFeatStore } from '@/stores/featStore'
import { useRitualStore } from '@/stores/ritualStore'
import { useSpellStore } from '@/stores/spellStore'
import { useDeityStore } from '@/stores/deityStore'
import { useCreatureStore } from '@/stores/creatureStore'
import { spellKind, spellKindLabel } from '@/features/spells/spellUi'
import { DEITY_KIND_LABELS } from '@/features/deities/localizeDeities'
import { Badge, ProvenanceBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Panel, Tip } from '@/components/ui/Panel'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { BatchSelectBar } from '@/features/backup/BatchSelectBar'
import { exportHomebrewByIds } from '@/features/backup/homebrewBackup'

const CREATE_CARDS = [
  {
    to: '/compendio/ancestralidades?criar=1',
    title: 'Ancestralidade',
    hint: 'Povo novo: PV, boosts, heranças e feitos',
  },
  {
    to: '/compendio/ancestralidades?criar=heranca',
    title: 'Herança',
    hint: 'Subtipo de um povo oficial ou homebrew',
  },
  {
    to: '/compendio/herancas-versateis?criar=1',
    title: 'Herança versátil',
    hint: 'Encaixa em quase qualquer ancestralidade',
  },
  {
    to: '/compendio/arquetipos?criar=1',
    title: 'Arquétipo',
    hint: 'Dedicação + feitos (multiclasse ou geral)',
  },
  {
    to: '/compendio/classes?criar=1',
    title: 'Classe',
    hint: 'Papel de 20 níveis: PV, proficiências, feitos',
  },
  {
    to: '/compendio/origens?criar=1',
    title: 'Origem',
    hint: 'Background: boosts, perícia e lore',
  },
  {
    to: '/compendio/feitos?criar=1',
    title: 'Feito',
    hint: 'Geral, perícia, classe, povo ou arquétipo',
  },
  {
    to: '/compendio/companheiros?criar=animal',
    title: 'Companheiro animal',
    hint: 'Ficha jovem: PV, golpes, suporte',
  },
  {
    to: '/compendio/companheiros?criar=eidolon',
    title: 'Eidolon',
    hint: 'Tipo do invocador: tradição e poderes',
  },
  {
    to: '/compendio/companheiros?criar=forma',
    title: 'Forma de familiar',
    hint: 'Aparência Tiny e habilidades inatas',
  },
  {
    to: '/compendio/companheiros?criar=especifico',
    title: 'Familiar específico',
    hint: 'Pacote de habilidades + poderes extras',
  },
  {
    to: '/compendio/equipamento?criar=arma',
    title: 'Arma',
    hint: 'Dado, grupo, mãos, alcance',
  },
  {
    to: '/compendio/equipamento?criar=armadura',
    title: 'Armadura',
    hint: 'CA, teto de DES, penalidades',
  },
  {
    to: '/compendio/equipamento?criar=escudo',
    title: 'Escudo',
    hint: 'Erguer: dureza, PV, BT',
  },
  {
    to: '/compendio/equipamento?criar=runa',
    title: 'Runa',
    hint: 'Fundamental ou propriedade',
  },
  {
    to: '/compendio/equipamento?criar=vestido',
    title: 'Item vestido',
    hint: 'Investimento, bônus de item',
  },
  {
    to: '/compendio/equipamento?criar=segurado',
    title: 'Item segurado',
    hint: 'Ocupa a mão, ativação',
  },
  {
    to: '/compendio/equipamento?criar=apice',
    title: 'Ápice',
    hint: 'Um atributo +2',
  },
  {
    to: '/compendio/equipamento?criar=cajado',
    title: 'Cajado',
    hint: 'Magias por grau',
  },
  {
    to: '/compendio/equipamento?criar=varinha',
    title: 'Varinha',
    hint: 'Uma magia, um grau',
  },
  {
    to: '/compendio/equipamento?criar=consumivel',
    title: 'Consumível',
    hint: 'Poção, óleo, pergaminho, talismã',
  },
  {
    to: '/compendio/equipamento?criar=alquimico',
    title: 'Alquímico',
    hint: 'Bomba, elixir, mutagênico, veneno',
  },
  {
    to: '/compendio/equipamento?criar=artefato',
    title: 'Artefato',
    hint: 'Peça única de alto nível — chassi à escolha',
  },
  {
    to: '/compendio/equipamento?criar=coracao',
    title: 'Coração de magia',
    hint: 'Afixa em arma ou armadura',
  },
  {
    to: '/compendio/equipamento?criar=grimorio',
    title: 'Grimório',
    hint: 'Livro estudado no dia',
  },
  {
    to: '/compendio/magias?criar=magia',
    title: 'Magia',
    hint: 'Posto 1–10, tradições, espaços',
  },
  {
    to: '/compendio/magias?criar=truque',
    title: 'Truque',
    hint: 'Posto 0, sempre à mão',
  },
  {
    to: '/compendio/magias?criar=foco',
    title: 'Magia de foco',
    hint: 'Ponto de Foco, não espaço',
  },
  {
    to: '/compendio/rituais?criar=1',
    title: 'Ritual',
    hint: 'Horas, perícia e custo — sem slot',
  },
  {
    to: '/compendio/divindades?criar=divindade',
    title: 'Divindade',
    hint: 'Deus: fonte, domínios, editos',
  },
  {
    to: '/compendio/divindades?criar=panteao',
    title: 'Panteão',
    hint: 'Um pacote, vários deuses no lore',
  },
  {
    to: '/compendio/divindades?criar=filosofia',
    title: 'Filosofia',
    hint: 'Fé sem pessoa divina',
  },
  {
    to: '/compendio/divindades?criar=pacto',
    title: 'Pacto',
    hint: 'Acordo com espíritos ou a terra',
  },
  {
    to: '/bestiario?criar=1',
    title: 'Criatura',
    hint: 'Ficha de bestiário: tabelas GM Core',
  },
] as const

export function HomebrewCompendiumPage() {
  const { ancestries, heritages, loadAll: loadAncestries } = useAncestryStore()
  const { backgrounds, loadAll: loadBackgrounds } = useBackgroundStore()
  const { classes, loadAll: loadClasses } = useClassStore()
  const { archetypes, loadAll: loadArchetypes } = useArchetypeStore()
  const { homebrew: homebrewCompanions, loadAll: loadCompanions } =
    useCompanionStore()
  const { homebrew: homebrewItems, loadAll: loadItems } = useEquipmentStore()
  const { homebrew: homebrewSpells, loadAll: loadSpells } = useSpellStore()
  const { homebrew: homebrewRituals, loadAll: loadRituals } = useRitualStore()
  const { homebrew: homebrewDeities, loadAll: loadDeities } = useDeityStore()
  const { homebrew: homebrewCreatures, loadAll: loadCreatures } =
    useCreatureStore()
  const { feats, loadAll: loadFeats } = useFeatStore()

  useEffect(() => {
    void loadAncestries()
    void loadBackgrounds()
    void loadClasses()
    void loadArchetypes()
    void loadCompanions()
    void loadItems()
    void loadSpells()
    void loadRituals()
    void loadDeities()
    void loadCreatures()
    void loadFeats()
  }, [
    loadAncestries,
    loadBackgrounds,
    loadClasses,
    loadArchetypes,
    loadCompanions,
    loadItems,
    loadSpells,
    loadRituals,
    loadDeities,
    loadCreatures,
    loadFeats,
  ])

  const homebrewAncestries = useMemo(
    () => ancestries.filter((a) => a.provenance.type === 'homebrew'),
    [ancestries],
  )
  const homebrewHeritages = useMemo(
    () =>
      heritages.filter(
        (h) => aIsHomebrew(h) && !h.isVersatile && h.ancestryId != null,
      ),
    [heritages],
  )
  const homebrewVersatile = useMemo(
    () => heritages.filter((h) => aIsHomebrew(h) && (h.isVersatile || h.ancestryId == null)),
    [heritages],
  )
  const homebrewClasses = useMemo(
    () => classes.filter((c) => c.provenance.type === 'homebrew'),
    [classes],
  )
  const homebrewArchetypes = useMemo(
    () => archetypes.filter((a) => a.provenance.type === 'homebrew'),
    [archetypes],
  )
  const homebrewBackgrounds = useMemo(
    () => backgrounds.filter((b) => b.provenance.type === 'homebrew'),
    [backgrounds],
  )
  const homebrewAnimals = useMemo(
    () => homebrewCompanions.filter((c) => c.catalogKind === 'animal'),
    [homebrewCompanions],
  )
  const homebrewEidolons = useMemo(
    () => homebrewCompanions.filter((c) => c.catalogKind === 'eidolon'),
    [homebrewCompanions],
  )
  const homebrewForms = useMemo(
    () => homebrewCompanions.filter((c) => c.catalogKind === 'familiarForm'),
    [homebrewCompanions],
  )
  const homebrewSpecifics = useMemo(
    () =>
      homebrewCompanions.filter((c) => c.catalogKind === 'specificFamiliar'),
    [homebrewCompanions],
  )
  const homebrewRankedSpells = useMemo(
    () => homebrewSpells.filter((s) => spellKind(s) === 'spell'),
    [homebrewSpells],
  )
  const homebrewCantrips = useMemo(
    () => homebrewSpells.filter((s) => spellKind(s) === 'cantrip'),
    [homebrewSpells],
  )
  const homebrewFocus = useMemo(
    () => homebrewSpells.filter((s) => spellKind(s) === 'focus'),
    [homebrewSpells],
  )
  const homebrewFeats = useMemo(
    () =>
      feats
        .filter((f) => f.provenance.type === 'homebrew')
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [feats],
  )

  const total =
    homebrewAncestries.length +
    homebrewHeritages.length +
    homebrewVersatile.length +
    homebrewClasses.length +
    homebrewArchetypes.length +
    homebrewBackgrounds.length +
    homebrewAnimals.length +
    homebrewEidolons.length +
    homebrewForms.length +
    homebrewSpecifics.length +
    homebrewItems.length +
    homebrewRankedSpells.length +
    homebrewCantrips.length +
    homebrewFocus.length +
    homebrewRituals.length +
    homebrewDeities.length +
    homebrewCreatures.length +
    homebrewFeats.length

  const allIds = useMemo(
    () => [
      ...homebrewAncestries.map((a) => a.id),
      ...homebrewHeritages.map((h) => h.id),
      ...homebrewVersatile.map((h) => h.id),
      ...homebrewClasses.map((c) => c.id),
      ...homebrewArchetypes.map((a) => a.id),
      ...homebrewBackgrounds.map((b) => b.id),
      ...homebrewAnimals.map((c) => c.id),
      ...homebrewEidolons.map((c) => c.id),
      ...homebrewForms.map((c) => c.id),
      ...homebrewSpecifics.map((c) => c.id),
      ...homebrewItems.map((item) => item.id),
      ...homebrewRankedSpells.map((s) => s.id),
      ...homebrewCantrips.map((s) => s.id),
      ...homebrewFocus.map((s) => s.id),
      ...homebrewRituals.map((r) => r.id),
      ...homebrewDeities.map((d) => d.id),
      ...homebrewCreatures.map((c) => c.id),
      ...homebrewFeats.map((f) => f.id),
    ],
    [
      homebrewAncestries,
      homebrewHeritages,
      homebrewVersatile,
      homebrewClasses,
      homebrewArchetypes,
      homebrewBackgrounds,
      homebrewAnimals,
      homebrewEidolons,
      homebrewForms,
      homebrewSpecifics,
      homebrewItems,
      homebrewRankedSpells,
      homebrewCantrips,
      homebrewFocus,
      homebrewRituals,
      homebrewDeities,
      homebrewCreatures,
      homebrewFeats,
    ],
  )

  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [exportBusy, setExportBusy] = useState(false)

  useEffect(() => {
    const ids = new Set(allIds)
    setSelected((prev) => {
      const next = new Set([...prev].filter((id) => ids.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [allIds])

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectIds(ids: string[]) {
    setSelected((prev) => {
      const next = new Set(prev)
      for (const id of ids) next.add(id)
      return next
    })
  }

  async function exportSelected() {
    setExportBusy(true)
    try {
      await exportHomebrewByIds([...selected])
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Falha ao exportar o lote.',
      )
    } finally {
      setExportBusy(false)
    }
  }

  const groupProps = {
    selected,
    onToggle: toggleSelected,
    onSelectGroup: selectIds,
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-5 animate-fade-up">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Homebrew
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Central das suas criações. Nada vem pronto — você inventa, a ficha
            usa no mesmo lugar do conteúdo oficial. Marque várias para exportar
            um lote, ou importe vários JSON de uma vez.
          </p>
          <p className="mt-2 text-xs text-text-dim">
            Custo de ação nos editores: os mesmos ícones do conteúdo oficial (1
            ação, 2 ações, reação, livre). Clique no ícone ao lado do nome ou
            dentro da descrição.
          </p>
        </div>
        <HomebrewJsonButtons kind="all" />
      </div>

      {total > 0 ? (
        <BatchSelectBar
          selectedCount={selected.size}
          totalCount={allIds.length}
          nounOne="item"
          nounMany="itens"
          onSelectAll={() => setSelected(new Set(allIds))}
          onClear={() => setSelected(new Set())}
          onExport={() => void exportSelected()}
          exportBusy={exportBusy}
        />
      ) : null}

      <Panel title="Criar" subtitle="Abre o editor com o guia de design">
        <div className="grid gap-2 sm:grid-cols-2">
          {CREATE_CARDS.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="rounded-xl border border-border bg-surface-2 px-3 py-3 transition-colors hover:border-accent/50 hover:bg-accent/10"
            >
              <div className="text-sm font-semibold text-text">{card.title}</div>
              <div className="mt-0.5 text-[11px] text-text-dim">{card.hint}</div>
            </Link>
          ))}
        </div>
      </Panel>

      {total === 0 && homebrewFeats.length === 0 ? (
        <Panel title="Suas criações" quiet>
          <p className="text-sm text-text-muted">
            Ainda não há homebrew neste dispositivo. Comece por uma
            ancestralidade (o caminho mais curto) ou duplique uma classe
            oficial e troque o lore.
          </p>
          <Tip>
            Duplicar uma oficial é o jeito mais seguro de ficar no mesmo
            orçamento do Remaster. Nos editores, o custo de ação usa os{' '}
            <strong>ícones oficiais</strong> (1 ação, reação, livre…) — iguais
            aos do compêndio. Clique no ícone para gravar no feito, na arma ou
            na magia.
          </Tip>
        </Panel>
      ) : (
        <>
          <CreationGroup
            {...groupProps}
            title="Ancestralidades"
            empty="Nenhuma ancestralidade homebrew."
            items={homebrewAncestries.map((a) => ({
              id: a.id,
              name: a.name,
              hint: a.originalName,
              to: `/compendio/ancestralidades?edit=${a.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Heranças"
            empty="Nenhuma herança específica homebrew."
            items={homebrewHeritages.map((h) => ({
              id: h.id,
              name: h.name,
              hint:
                ancestries.find((a) => a.id === h.ancestryId)?.name ??
                'Povo vinculado',
              to: `/compendio/ancestralidades?editHeritage=${h.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Heranças versáteis"
            empty="Nenhuma herança versátil homebrew."
            items={homebrewVersatile.map((h) => ({
              id: h.id,
              name: h.name,
              hint: h.originalName,
              to: `/compendio/herancas-versateis?edit=${h.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Classes"
            empty="Nenhuma classe homebrew."
            items={homebrewClasses.map((c) => ({
              id: c.id,
              name: c.name,
              hint: `${c.originalName} · PV ${c.hitPointsPerLevel}/nível`,
              to: `/compendio/classes?edit=${c.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Arquétipos"
            empty="Nenhum arquétipo homebrew."
            items={homebrewArchetypes.map((a) => ({
              id: a.id,
              name: a.name,
              hint: a.kind === 'multiclass' ? 'Multiclasse' : 'Geral',
              to: `/compendio/arquetipos?edit=${a.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Origens"
            empty="Nenhuma origem homebrew."
            items={homebrewBackgrounds.map((b) => ({
              id: b.id,
              name: b.name,
              hint: b.originalName ?? 'Origem',
              to: `/compendio/origens?edit=${b.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Companheiros animais"
            empty="Nenhum companheiro animal homebrew."
            items={homebrewAnimals.map((c) => ({
              id: c.id,
              name: c.name,
              hint: c.originalName,
              to: `/compendio/companheiros?edit=${c.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Eidolons"
            empty="Nenhum eidolon homebrew."
            items={homebrewEidolons.map((c) => ({
              id: c.id,
              name: c.name,
              hint: c.originalName,
              to: `/compendio/companheiros?edit=${c.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Formas de familiar"
            empty="Nenhuma forma homebrew."
            items={homebrewForms.map((c) => ({
              id: c.id,
              name: c.name,
              hint: c.originalName,
              to: `/compendio/companheiros?edit=${c.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Familiares específicos"
            empty="Nenhum familiar específico homebrew."
            items={homebrewSpecifics.map((c) => ({
              id: c.id,
              name: c.name,
              hint: c.originalName,
              to: `/compendio/companheiros?edit=${c.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Equipamento"
            empty="Nenhum item homebrew."
            items={homebrewItems.map((item) => ({
              id: item.id,
              name: item.name,
              hint: `${item.originalName} · ${item.subcategory ?? item.category}`,
              to: `/compendio/equipamento?edit=${item.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Magias"
            empty="Nenhuma magia homebrew de posto 1–10."
            items={homebrewRankedSpells.map((s) => ({
              id: s.id,
              name: s.name,
              hint: `${s.originalName} · ${spellKindLabel('spell')} ${s.rank}`,
              to: `/compendio/magias?edit=${s.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Truques"
            empty="Nenhum truque homebrew."
            items={homebrewCantrips.map((s) => ({
              id: s.id,
              name: s.name,
              hint: s.originalName,
              to: `/compendio/magias?edit=${s.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Magias de foco"
            empty="Nenhuma magia de foco homebrew."
            items={homebrewFocus.map((s) => ({
              id: s.id,
              name: s.name,
              hint: `${s.originalName} · posto ${s.rank}`,
              to: `/compendio/magias?edit=${s.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Rituais"
            empty="Nenhum ritual homebrew."
            items={homebrewRituals.map((r) => ({
              id: r.id,
              name: r.name,
              hint: `${r.originalName} · posto ${r.rank}`,
              to: `/compendio/rituais?edit=${r.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Divindades e fés"
            empty="Nenhuma fé homebrew."
            items={homebrewDeities.map((d) => ({
              id: d.id,
              name: d.name,
              hint: `${d.originalName} · ${DEITY_KIND_LABELS[d.kind]}`,
              to: `/compendio/divindades?edit=${d.id}`,
            }))}
          />
          <CreationGroup
            {...groupProps}
            title="Criaturas"
            empty="Nenhuma criatura homebrew."
            items={homebrewCreatures.map((c) => ({
              id: c.id,
              name: c.name,
              hint: `${c.originalName} · nível ${c.level}`,
              to: `/bestiario?edit=${c.id}`,
            }))}
          />
          <Panel
            title="Feitos homebrew"
            subtitle="Catálogo único — Compêndio → Feitos"
            actions={
              homebrewFeats.length > 0 ? (
                <Button
                  size="sm"
                  onClick={() => selectIds(homebrewFeats.map((f) => f.id))}
                >
                  Selecionar grupo
                </Button>
              ) : undefined
            }
          >
            {homebrewFeats.length === 0 ? (
              <p className="text-sm text-text-muted">
                Nenhum feito homebrew. Crie no Compêndio → Feitos, ou junto da
                ancestralidade, classe ou arquétipo.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {homebrewFeats.map((f) => {
                  const parentAncestry = ancestries.find(
                    (a) => a.id === f.ancestryId,
                  )
                  const parentClass = classes.find((c) => c.id === f.classId)
                  const parentArchetype = archetypes.find(
                    (a) => a.id === f.archetypeId,
                  )
                  const parentName =
                    parentClass?.name ??
                    parentAncestry?.name ??
                    parentArchetype?.name ??
                    (f.category === 'class'
                      ? 'Classe'
                      : f.category === 'archetype'
                        ? 'Arquétipo'
                        : f.category === 'ancestry'
                          ? 'Ancestralidade'
                          : f.category === 'skill'
                            ? 'Perícia'
                            : f.category === 'mythic'
                              ? 'Mítico'
                              : 'Geral')
                  const parentTo = parentClass
                    ? `/compendio/classes?edit=${parentClass.id}`
                    : parentAncestry
                      ? `/compendio/ancestralidades?edit=${parentAncestry.id}`
                      : parentArchetype
                        ? `/compendio/arquetipos?edit=${parentArchetype.id}`
                        : null
                  return (
                    <li
                      key={f.id}
                      className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${
                        selected.has(f.id)
                          ? 'border-accent/60 bg-accent/10'
                          : 'border-border bg-surface-2'
                      }`}
                    >
                      <label className="shrink-0">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-[var(--color-accent)]"
                          checked={selected.has(f.id)}
                          onChange={() => toggleSelected(f.id)}
                          aria-label={`Selecionar ${f.name}`}
                        />
                      </label>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-medium text-text">
                            {f.name}
                          </span>
                          <ProvenanceBadge type="homebrew" />
                          <Badge>nv. {f.level}</Badge>
                        </span>
                        <span className="mt-0.5 block text-[11px] text-text-dim">
                          {parentName}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {parentTo && (
                          <Link to={parentTo}>
                            <Button size="sm">Editar no pai</Button>
                          </Link>
                        )}
                        <Link to={`/compendio/feitos?edit=${f.id}`}>
                          <Button size="sm" variant="accent">
                            Editar
                          </Button>
                        </Link>
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </Panel>
        </>
      )}
    </div>
  )
}

function aIsHomebrew(item: { provenance: { type: string } }): boolean {
  return item.provenance.type === 'homebrew'
}

function CreationGroup({
  title,
  empty,
  items,
  selected,
  onToggle,
  onSelectGroup,
}: {
  title: string
  empty: string
  items: Array<{ id: string; name: string; hint: string; to: string }>
  selected: Set<string>
  onToggle: (id: string) => void
  onSelectGroup: (ids: string[]) => void
}) {
  return (
    <Panel
      title={title}
      subtitle={`${items.length} criação(ões)`}
      actions={
        items.length > 0 ? (
          <Button size="sm" onClick={() => onSelectGroup(items.map((i) => i.id))}>
            Selecionar grupo
          </Button>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <p className="text-sm text-text-muted">{empty}</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <div
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors ${
                  selected.has(item.id)
                    ? 'border-accent/60 bg-accent/10'
                    : 'border-border bg-surface-2'
                }`}
              >
                <label className="shrink-0">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[var(--color-accent)]"
                    checked={selected.has(item.id)}
                    onChange={() => onToggle(item.id)}
                    aria-label={`Selecionar ${item.name}`}
                  />
                </label>
                <Link
                  to={item.to}
                  className="flex min-w-0 flex-1 items-center justify-between gap-2 hover:text-accent"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium text-text">
                        {item.name}
                      </span>
                      <ProvenanceBadge type="homebrew" />
                    </span>
                    <span className="mt-0.5 block text-[11px] text-text-dim">
                      {item.hint}
                    </span>
                  </span>
                  <span className="text-[11px] text-accent">editar</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
