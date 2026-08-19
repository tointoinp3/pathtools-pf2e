import type { CharacterClass, ClassCatalogDefinition } from '@/types/class'
import { CLASS_THAUMATURGE_ID } from '../ids'
import { SOURCE_DARK_ARCHIVES_ID } from '../sources'
import { catalogOption } from './helpers'

export function buildThaumaturgeCatalog(
  classDef: CharacterClass,
): ClassCatalogDefinition {
  const implements_ = (classDef.subclass?.options ?? []).map((opt) =>
    catalogOption({
      id: opt.id,
      name: opt.name,
      originalName: opt.originalName,
      category: 'implement',
      description: opt.description,
      rulesSummary: opt.rulesSummary,
      sourcePage: opt.sourcePage,
    }),
  )

  return {
    id: 'thaumaturge-implements',
    classId: CLASS_THAUMATURGE_ID,
    label: 'Implementos adicionais',
    originalName: 'Additional Implements',
    description:
      'O 1º implemento é a especialização acima. No 5º você escolhe o 2º (tipo diferente) e no 15º o 3º. Troca o objeto do mesmo tipo com 1 dia de intervalo.',
    kind: 'progression',
    unique: true,
    slotsByLevel: [
      { minLevel: 5, count: 1 },
      { minLevel: 15, count: 2 },
    ],
    categoryLabels: { implement: 'Implemento' },
    constraints: [
      {
        kind: 'excludeSubclassId',
        message: 'O 2º e o 3º implemento precisam ser tipos diferentes do 1º',
      },
    ],
    searchPlaceholder: 'Buscar implemento…',
    emptyHint: 'O 2º implemento entra no 5º nível; o 3º no 15º.',
    details: [
      {
        id: 'wandDamageType',
        label: 'Dano da varinha',
        description: 'Se um dos implementos for Varinha, escolha frio, eletricidade ou fogo.',
        kind: 'choice',
        options: [
          { id: 'cold', name: 'Frio', originalName: 'Cold' },
          { id: 'electricity', name: 'Eletricidade', originalName: 'Electricity' },
          { id: 'fire', name: 'Fogo', originalName: 'Fire' },
        ],
        showWhenOptionIds: ['implement-wand'],
      },
    ],
    options: implements_.map((o) => ({
      ...o,
      sourceId: o.sourceId ?? SOURCE_DARK_ARCHIVES_ID,
    })),
  }
}
