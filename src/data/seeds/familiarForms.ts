import type { FamiliarFormDefinition } from '@/types/companion'

const PC = 'Player Core pg. 212'

function form(
  id: string,
  name: string,
  originalName: string,
  innateAbilityIds: string[],
  description: string,
  traits?: string[],
): FamiliarFormDefinition {
  return {
    id,
    name,
    originalName,
    description,
    source: PC,
    innateAbilityIds,
    traits,
  }
}

/**
 * Formas Tiny de familiar / mascote (Player Core).
 * O familiar usa as stats de familiar, não as da criatura; a forma trava
 * habilidades inatas que contam nos 2 slots (ou mais, com slots extras).
 */
export const FAMILIAR_FORMS: FamiliarFormDefinition[] = [
  form(
    'form-custom',
    'Outra forma',
    'Other',
    [],
    'Aparência livre (qualquer criatura Minúscula). Marque na lista o que for inato da forma.',
  ),
  form(
    'form-bat',
    'Morcego',
    'Bat',
    ['fam-flier', 'fam-echolocation'],
    'Asas membranosas e audição precisa. Voa e usa ecolocalização.',
    ['animal'],
  ),
  form(
    'form-beetle',
    'Besouro',
    'Beetle',
    ['fam-climber'],
    'Carapaça Minúscula; sobe paredes e tetos com facilidade.',
    ['animal'],
  ),
  form(
    'form-cat',
    'Gato',
    'Cat',
    ['fam-climber', 'fam-scent'],
    'Felino Minúsculo (gato, gatinho). Escala e fareja.',
    ['animal'],
  ),
  form(
    'form-crow',
    'Corvo',
    'Crow',
    ['fam-flier'],
    'Ave negra esperta. Voa; muitos mestres também escolhem Fala.',
    ['animal'],
  ),
  form(
    'form-dog',
    'Cão',
    'Dog',
    ['fam-scent'],
    'Cão Minúsculo ou filhote. Faro afiado.',
    ['animal'],
  ),
  form(
    'form-fish',
    'Peixe',
    'Fish',
    ['fam-amphibious'],
    'Peixe Minúsculo. Respira ar e água; nata na mesma Velocidade terrestre.',
    ['animal'],
  ),
  form(
    'form-fox',
    'Raposa',
    'Fox',
    ['fam-scent', 'fam-fast-movement'],
    'Raposa Minúscula. Faro e deslocamento rápido.',
    ['animal'],
  ),
  form(
    'form-frog',
    'Rã',
    'Frog',
    ['fam-amphibious', 'fam-climber'],
    'Anfíbia saltadora. Nata e escala.',
    ['animal'],
  ),
  form(
    'form-hawk',
    'Falcão',
    'Hawk',
    ['fam-flier'],
    'Ave de rapina Minúscula. Voa.',
    ['animal'],
  ),
  form(
    'form-leshy',
    'Leshy',
    'Leshy',
    ['fam-plant'],
    'Espírito vegetal Minúsculo. Troca o traço animal por planta. (Só familiar, não mascote.)',
    ['planta'],
  ),
  form(
    'form-leshy-fungus',
    'Leshy fungo',
    'Fungus Leshy',
    ['fam-fungus'],
    'Espírito fúngico Minúsculo. Troca o traço animal por fungo. A ordem dos Esporos exige esta forma. (Só familiar, não mascote.)',
    ['fungo'],
  ),
  form(
    'form-lizard',
    'Lagarto',
    'Lizard',
    ['fam-climber'],
    'Réptil Minúsculo. Escala.',
    ['animal'],
  ),
  form(
    'form-mole',
    'Toupeira',
    'Mole',
    ['fam-burrower', 'fam-scent'],
    'Cava túneis Minúsculos e fareja no escuro.',
    ['animal'],
  ),
  form(
    'form-monkey',
    'Macaco',
    'Monkey',
    ['fam-climber', 'fam-manual-dexterity'],
    'Primata Minúsculo. Escala e usa as mãos para manipular.',
    ['animal'],
  ),
  form(
    'form-moth',
    'Mariposa',
    'Moth',
    ['fam-flier'],
    'Inseto alado Minúsculo. Voa.',
    ['animal'],
  ),
  form(
    'form-mouse',
    'Camundongo',
    'Mouse',
    ['fam-climber', 'fam-scent'],
    'Roedor Minúsculo. Escala e fareja.',
    ['animal'],
  ),
  form(
    'form-octopus',
    'Polvo',
    'Octopus',
    ['fam-amphibious', 'fam-manual-dexterity'],
    'Polvo Minúsculo. Anfíbio, com tentáculos hábeis.',
    ['animal'],
  ),
  form(
    'form-owl',
    'Coruja',
    'Owl',
    ['fam-flier', 'fam-darkvision'],
    'Ave noturna. Voa e enxerga no escuro.',
    ['animal'],
  ),
  form(
    'form-parrot',
    'Papagaio',
    'Parrot',
    ['fam-flier', 'fam-speech'],
    'Ave falante. Voa e fala. (Fala é habilidade de familiar, não de mascote.)',
    ['animal'],
  ),
  form(
    'form-rabbit',
    'Coelho',
    'Rabbit',
    ['fam-scent', 'fam-fast-movement'],
    'Coelho ou lebre Minúsculo. Faro e deslocamento rápido.',
    ['animal'],
  ),
  form(
    'form-rat',
    'Rato',
    'Rat',
    ['fam-climber', 'fam-scent'],
    'Rato urbano ou de masmorra. Escala e fareja.',
    ['animal'],
  ),
  form(
    'form-raven',
    'Corvo-grande',
    'Raven',
    ['fam-flier', 'fam-speech'],
    'Ave maior que o corvo, ainda Minúscula nas stats de familiar. Voa e fala. (Fala só no familiar.)',
    ['animal'],
  ),
  form(
    'form-scorpion',
    'Escorpião',
    'Scorpion',
    ['fam-climber'],
    'Aracnídeo Minúsculo. Escala superfícies.',
    ['animal'],
  ),
  form(
    'form-snake',
    'Cobra',
    'Snake',
    ['fam-climber', 'fam-scent'],
    'Serpente Minúscula. Escala e fareja com a língua.',
    ['animal'],
  ),
  form(
    'form-spider',
    'Aranha',
    'Spider',
    ['fam-climber'],
    'Aranha Minúscula. Escala paredes e tetos.',
    ['animal'],
  ),
  form(
    'form-squirrel',
    'Esquilo',
    'Squirrel',
    ['fam-climber'],
    'Roedor arborícola. Escala.',
    ['animal'],
  ),
  form(
    'form-toad',
    'Sapo',
    'Toad',
    ['fam-amphibious'],
    'Anfíbio robusto. Respira ar e água.',
    ['animal'],
  ),
  form(
    'form-turtle',
    'Tartaruga',
    'Turtle',
    ['fam-amphibious'],
    'Quelônio Minúsculo. Anfíbio.',
    ['animal'],
  ),
  form(
    'form-weasel',
    'Doninha',
    'Weasel',
    ['fam-climber', 'fam-scent'],
    'Mustelídeo Minúsculo. Escala e fareja.',
    ['animal'],
  ),
]

export const FAMILIAR_FORMS_BY_ID = Object.fromEntries(
  FAMILIAR_FORMS.map((f) => [f.id, f]),
) as Record<string, FamiliarFormDefinition>

export function listFamiliarForms(): FamiliarFormDefinition[] {
  return [...FAMILIAR_FORMS].sort((a, b) => {
    if (a.id === 'form-custom') return -1
    if (b.id === 'form-custom') return 1
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

export function getFamiliarForm(
  id: string | null | undefined,
): FamiliarFormDefinition | null {
  if (!id) return null
  return FAMILIAR_FORMS_BY_ID[id] ?? null
}
