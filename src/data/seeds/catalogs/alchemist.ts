import type { ClassCatalogDefinition, ClassCatalogOption } from '@/types/class'
import { CLASS_ALCHEMIST_ID } from '../ids'
import { SOURCE_PLAYER_CORE_2_ID } from '../sources'
import { ITEM_DEFINITIONS } from '../equipment'
import { catalogOption } from './helpers'

const KIND_LABEL: Record<string, string> = {
  bomb: 'Bomba',
  elixir: 'Elixir',
  mutagen: 'Mutagênico',
  poison: 'Veneno',
  tool: 'Ferramenta',
}

function formulaCategory(item: (typeof ITEM_DEFINITIONS)[number]): string {
  const kind = item.alchemical?.kind ?? 'tool'
  if (kind === 'elixir' && item.traits.some((t) => t.toLowerCase() === 'healing')) {
    return 'healing-elixir'
  }
  return kind
}

export function alchemistFormulaOptions(): ClassCatalogOption[] {
  return ITEM_DEFINITIONS.filter(
    (item) => item.category === 'alchemical' && item.rarity === 'common',
  )
    .map((item) => {
      const kind = item.alchemical?.kind ?? 'tool'
      const cat = formulaCategory(item)
      return catalogOption({
        id: item.id,
        name: item.name,
        originalName: item.originalName,
        category: cat,
        level: item.level,
        description: item.description,
        rulesSummary: `${KIND_LABEL[kind] ?? kind} de ${item.level}º nível. ${item.description}`,
        traits: item.traits,
        sourcePage: undefined,
      })
    })
    .sort((a, b) => {
      const lv = (a.level ?? 0) - (b.level ?? 0)
      if (lv !== 0) return lv
      return a.name.localeCompare(b.name, 'pt-BR')
    })
}

const CATEGORY_LABELS: Record<string, string> = {
  bomb: 'Bomba',
  elixir: 'Elixir',
  'healing-elixir': 'Elixir de cura',
  mutagen: 'Mutagênico',
  poison: 'Veneno',
  tool: 'Ferramenta',
}

export function buildAlchemistCatalogs(): ClassCatalogDefinition[] {
  const options = alchemistFormulaOptions()
  const catalogs: ClassCatalogDefinition[] = [
    {
      id: 'alchemist-field-formulas',
      classId: CLASS_ALCHEMIST_ID,
      label: 'Fórmulas do campo',
      originalName: 'Research Field Formulas',
      description:
        '2 fórmulas comuns de 1º do seu campo: bombas (bombardeiro), elixires de cura (cirurgião), mutagênicos (mutagênico) ou venenos (toxicólogo).',
      kind: 'repertoire',
      unique: true,
      filterBySubclass: true,
      slotsByLevel: [{ minLevel: 1, count: 2 }],
      constraints: [{ kind: 'requireSubclass', message: 'Escolha o campo de pesquisa' }],
      categoryLabels: CATEGORY_LABELS,
      searchPlaceholder: 'Buscar fórmula do campo…',
      options: options
        .filter((o) => (o.level ?? 99) <= 1)
        .map((o) => {
          const field =
            o.category === 'bomb'
              ? 'field-bomber'
              : o.category === 'healing-elixir'
                ? 'field-chirurgeon'
                : o.category === 'mutagen'
                  ? 'field-mutagenist'
                  : o.category === 'poison'
                    ? 'field-toxicologist'
                    : null
          if (!field) return { ...o, subclassIds: ['__none__'] }
          return { ...o, subclassIds: [field] }
        }),
    },
    {
      id: 'alchemist-formulas',
      classId: CLASS_ALCHEMIST_ID,
      label: 'Livro de fórmulas',
      originalName: 'Formula Book',
      description:
        '4 fórmulas comuns de 1º no começo (Alquimia). A cada nível, +2 fórmulas comuns de item de nível ≤ o seu. Nas preparações você infunde até 4 + INT desses itens.',
      kind: 'repertoire',
      unique: true,
      slotsByLevel: Array.from({ length: 20 }, (_, i) => ({
        minLevel: i + 1,
        count: 4 + 2 * i,
      })),
      preparedSlotsByLevel: [{ minLevel: 1, count: 4 }],
      preparedAddIntelligence: true,
      preparedFromPicks: true,
      preparedFromCatalogIds: ['alchemist-field-formulas'],
      allowPreparedDuplicates: true,
      preparedLabel: 'Itens infundidos do dia',
      preparedDescription:
        'Alquimia Avançada: até 4 + INT consumíveis do livro, de nível ≤ o seu, infundidos até a próxima preparação. Pode repetir a mesma fórmula.',
      categoryLabels: CATEGORY_LABELS,
      searchPlaceholder: 'Buscar fórmula…',
      details: [
        {
          id: 'versatileVials',
          label: 'Frascos versáteis atuais',
          description:
            'Máximo e quantidade da manhã: 2 + INT. Abaixo do máximo, 10 min de exploração recuperam 2 (3 a partir do 9º). Servem de bomba ou de combustível para Alquimia Rápida.',
          kind: 'counter',
          counterKind: 'versatileVials',
        },
      ],
      options,
    },
  ]
  return catalogs.map((c) => ({
    ...c,
    options: c.options.map((o) => ({ ...o, sourceId: SOURCE_PLAYER_CORE_2_ID })),
  }))
}
