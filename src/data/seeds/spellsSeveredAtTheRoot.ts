import type { Spell } from '@/types/spell'
import { SOURCE_SEVERED_AT_THE_ROOT_ID } from './sources'

/**
 * Magias Remaster de Pathfinder #202: Severed at the Root.
 * Sem legado. Resumos curtos em pt-BR — o texto completo está no livro / AoN.
 */
export const severedAtTheRootSpells: Spell[] = [
  {
    id: 'spell-mushroom-patch',
    name: 'Mancha de Cogumelos',
    originalName: 'Mushroom Patch',
    rank: 1,
    traditions: ['primal'],
    traits: ['Druid', 'Focus', 'Fungus'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    focus: true,
    summary:
      'Alcance 18 m, explosão de 3 m, 1 minuto. Terreno difícil; ao conjurar e no início de cada rodada, esporos (Fortitude: ofuscado; falha crítica também lento 1). Altura 3º, 6º, 9º.',
    description: "Você faz com que os cogumelos brotem na área. A área torna-se terreno difícil. Quando a magia é lançado e no início de cada rodada, o cogumelo libera uma nuvem de esporos irritantes. As criaturas na área devem tentar uma salvaguarda de Fortitude.\n\n**Sucesso crítico** A criatura não é afetada.\n\n**Sucesso** A criatura fica ofuscada por 1 rodada. Caso a criatura se mova para área externa, ela poderá gastar 1 ação para esfregar os olhos, removendo a condição ofuscado.\n\n**Falha** A criatura fica ofuscada por 1 rodada.\n\n**Falha crítica** A criatura fica ofuscada e lenta 1 por 1 rodada.\n\n**Altura (3º)** O alcance aumenta para 27 m e a área aumenta para um raio de rajada de 6 m.\n\n**Altura (6º)** O alcance aumenta para 36 m e a área aumenta para um raio de rajada de 9 m.\n\n**Altura (9º)** O alcance aumenta para 45 m, a área aumenta para um raio de explosão de 12 m, e quando uma criatura ficaria ofuscado, ela se tornaria cega.",
    duration: "1 minuto",
    targets: "raio de 3 m burst",
    range: "18 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2442',
    sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
  },
  {
    id: 'spell-fungal-exhalation',
    name: 'Exalação Fúngica',
    originalName: 'Fungal Exhalation',
    rank: 3,
    traditions: ['primal'],
    traits: ['Druid', 'Focus', 'Fungus'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    focus: true,
    summary:
      'Cone de 4,5 m: 6d4 veneno (Reflexos básico). Falha: enjoado 1; falha crítica: enjoado 2. Quem não respira é imune. Altura +1: +2d4.',
    description: "Você exala esporos de fungos tóxicos que preenchem a área. Você causa 6d4 dano de veneno às criaturas na área. Falha: uma criatura também recebe enjoado 1, ou enjoado 2 em caso de falha crítica. Uma criatura que não respira é imune a este efeito.\n\n**Altura (+1)** O dano aumenta em 2d4.",
    targets: "**Saving Throw**\nReflexos básico",
    area: "cone de 4,5 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2440',
    sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
  },
  {
    id: 'spell-hedge-prison',
    name: 'Prisão de Sebe',
    originalName: 'Hedge Prison',
    rank: 3,
    traditions: ['primal'],
    traits: ['Druid', 'Focus', 'Plant'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    focus: true,
    summary:
      'Alcance 9 m, 1 criatura Média ou menor, sustentada 1 min. Cubo de sebes (CA 5, Dureza 5, 20 PV). Reflexos decide se escapa ou fica presa. Altura 4º–9º.',
    description: "Você conjura uma intrincada prisão para prender uma criatura, encerrando-a completamente em um cubo oco de arbustos densos. A cobertura possui CA 5, Dureza 5 e 20 PV. É imune a acertos críticos e dano de precisão.\n\n**Sucesso crítico** A criatura escapa da cerca viva antes de se formar completamente.\n\n**Sucesso** A criatura fica presa dentro da cerca, mas o PV da cerca é reduzido pela metade.\n\n**Falha** A criatura está presa dentro da sebe.\n\n**Falha crítica** A criatura fica presa dentro da cerca e o PV da cerca é aumentado pela metade.\n\n**Altura (4º)** A dureza da sebe aumenta para 7 e o PV aumenta para 30.\n\n**Altura (5º)** A dureza da sebe aumenta para 9 e seu PV aumenta para 40. Você pode mirar em uma criatura de tamanho Grande ou menor.\n\n**Altura (6º)** A dureza da sebe aumenta para 11 e seu PV aumenta para 50. Você pode mirar em uma criatura de tamanho Grande ou menor.\n\n**Altura (7º)** A dureza da sebe aumenta para 13 e seu PV aumenta para 60. Você pode mirar em uma criatura de tamanho Enorme ou menor\n\n**Altura (8º)** A dureza da sebe aumenta para 15 e seu PV aumenta para 70. Você pode atingir uma criatura de tamanho Enorme ou menor.\n\n**Altura (9º)** A dureza da sebe aumenta para 17 e seu PV aumenta para 80. Você pode atingir uma criatura de tamanho Enorme ou menor.",
    duration: "sustentada até 1 minuto",
    targets: "1 criatura média ou menor",
    range: "9 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2441',
    sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
  },
]
