import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #222: Hellbreakers', ...partial }
}

/**
 * Famílias AoN Monster Families de Pathfinder #222: Hellbreakers.
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesHellbreakers: CreatureFamily[] = [
  fam({
    id: 'family-fumecrux',
    name: 'Fumecrux',
    originalName: 'Fumecrux',
    trait: null,
    source: 'Pathfinder #222: Hellbreakers',
    sourcePage: 229,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=681',
    intro: `Ao estudar os fenômenos das coroas-infernais e dos decapitados, magos chelaxianos criaram uma fusão dos dois. Anos de experimentação culminaram na criação dos fumecruxes, espectros de enxofre coroados com as cabeças decepadas e em decomposição de grandes feras. O processo está sendo tentado com mais frequência como mais uma arma para a guerra contra Andoran.`,
    sections: [
      {
        id: 'fumecrux-variants',
        title: 'Variantes de Fumecrux',
        body: 'Por mais devastadores que sejam os fumecruxes dracônicos, são visões incomuns. Fumecruxes comuns são feitos de cavalos, aves grandes e outras feras mundanas. Todos os fumecruxes demonstram apatia em relação a criaturas vivas, inclusive seus criadores, o que os torna difíceis de controlar. Um necromante que solta um fumecrux feito de algo tão indomável quanto um dragão é incrivelmente poderoso ou incrivelmente tolo.',
      },
    ],
  }),
  fam({
    id: 'family-hellbreaker-troops',
    name: 'Tropas Quebra-Inferno',
    originalName: 'Hellbreaker Troops',
    trait: null,
    source: 'Pathfinder #222: Hellbreakers',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=679',
    intro: `A Liga dos Quebra-Inferno começou com apenas alguns recrutas espalhados por Isger, realizando pequenos atos de rebelião contra Cheliax e demonstrações de apoio aos isgerianos comuns. Durante esta Trilha de Aventuras, a organização cresce até se tornar o centro da revolução, reunindo aliados de todos os cantos do país. Quando chegar a hora de ir plenamente à guerra, os Quebra-Inferno podem, espera-se, contar com muitos cidadãos isgerianos para se erguer e dar tudo pela causa. As tropas a seguir são apenas quatro dos muitos aliados que os PCs podem recrutar para seus encontros de escaramuça contra Cavaleiros Infernais e pior.`,
    sections: [
      {
        id: 'hellbreaker-troops-as-enemies',
        title: 'Tropas Quebra-Inferno como Inimigas',
        body: 'Embora as quatro tropas apresentadas aqui se destinem a aliar-se aos PCs nesta Trilha de Aventuras, o mestre pode usá-las fora desta campanha como combatentes inimigos. Uma aldeia goblin poderia colocar em campo um coro de cantores de guerra para se proteger ou para reforçar um bando de saqueadores, representado pelos sabotadores de guerra. O clero de Swiftrun poderia facilmente representar um grupo hostil que só se importa com a própria comunidade. Os fala-feras gnomos poderiam representar um círculo de druidas mais interessados em punir a civilização do que em proteger a natureza.',
      },
    ],
  }),
  fam({
    id: 'family-hellcrown',
    name: 'Coroa-Infernal',
    originalName: 'Hellcrown',
    trait: null,
    source: 'Pathfinder #222: Hellbreakers',
    sourcePage: 232,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=682',
    intro: `Quem é versado na arte de lutar contra Cavaleiros Infernais avisa os camaradas para evitar decapitar os inimigos. Isso porque a lealdade sobrenatural de um Cavaleiro Infernal às vezes pode imbuir o elmo com energia do vazio, resultando num espírito inquieto chamado coroa-infernal. Coroas-infernais flutuam pelo ar, seus corpos fantasmagóricos lembrando aparições fumacentas da armadura que usavam em vida e, embora retenham a lealdade distorcida à sua causa, pouco mais resta da humanidade e do senso de si que tinham.

Coroas-infernais não se unem às contrapartes vivas em exércitos ou regimentos, preferindo assombrar os campos de batalha ensanguentados onde originalmente caíram. A força de uma coroa-infernal varia conforme o poder do soldado vivo que caiu e a potência da inimizade contra a causa da morte. Em alguns casos, coroas-infernais particularmente poderosas têm acesso a magias e até formam enxames fantasmagóricos para buscar vingança contra qualquer um que considerem responsável por suas mortes.`,
    sections: [],
  }),
  fam({
    id: 'family-sarcovalt',
    name: 'Sarcovalt',
    originalName: 'Sarcovalt',
    trait: null,
    source: 'Pathfinder #222: Hellbreakers',
    sourcePage: 234,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=680',
    intro: `Há poucas criaturas no multiverso mais bizarramente revoltantes que o sarcovalt, um infame com corpo de mosca e cabeça de crânio de abutre sem carne. Embora uma criatura de pouco mais de 60 cm possa não parecer ameaçadora, enxames de sarcovalt podem soterrar aldeias inteiras. As cabeças dos sarcovalts quase parecem entidades totalmente separadas dos corpos e vomitam horas depois, como lodo pútrido e coagulado, o que quer que capturem nos bicos.`,
    sections: [
      {
        id: 'servants-of-urgathoa',
        title: 'Servos de Urgathoa',
        body: 'Sarcovalts existem só para servir Urgathoa e seus seguidores, com pouca capacidade de pensar ou raciocinar além do desejo de ver a vontade da senhora cumprida. São uma convocação favorita de urgathoanos poderosos para auxiliar em seus planos, pois os sarcovalts são vistos como a vontade da deusa tornada manifesta.',
      },
    ],
  }),
  fam({
    id: 'family-skeletal-hellknight',
    name: 'Cavaleiro Infernal Esquelético',
    originalName: 'Skeletal Hellknight',
    trait: null,
    source: 'Pathfinder #222: Hellbreakers',
    sourcePage: 233,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=683',
    intro: `Os corpos de Cavaleiros Infernais ocasionalmente se erguem para continuar a luta. Este é apenas um exemplo de um soldado morto-vivo do Inferno.`,
    sections: [],
  }),
]
