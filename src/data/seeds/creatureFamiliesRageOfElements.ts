import type { CreatureFamily } from '@/types/creature'

function fam(partial: CreatureFamily): CreatureFamily {
  return partial
}

/**
 * Famílias AoN Monster Families ligadas às fichas de Rage of Elements (Remaster).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesRageOfElements: CreatureFamily[] = [
  fam({
    id: 'family-elemental-metal',
    name: 'Elemental de metal',
    originalName: 'Elemental, Metal',
    trait: null,
    source: 'Rage of Elements',
    sourcePage: 153,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=343',
    intro:
      'Elementais de metal podem se manifestar numa variedade enorme de formas, de amálgamas disformes de metais diferentes a monstros humanoides e bestiais.',
    sections: [
      {
        id: 'diverse-elementals',
        title: 'Elementais diversos',
        body: 'Os Planos Elementais são mais do que extensões de céu, rocha, metal, fogo, madeira e oceano. Nuvens de névoa, poeira e tempestades flutuam pelo Plano do Ar. O Plano da Terra inclui bosques verdejantes, metal e cristal brilhantes, e ermos irradiados. O Plano do Fogo traz magma, fumaça asfixiante e clarão radiante. Em meio ao mar sem fim do Plano da Água há bolsões de lodo e salmoura, além dos ambientes de outro mundo das profundezas.',
      },
      {
        id: 'elemental-wyrms',
        title: 'Serpes elementais',
        body: 'A serpe de gelo é a serpe elemental mais encontrada, mas outras existem: a serpe de fogo flamejante, a serpe-faísca esguia e um pouco menor, e a maior de todas, a imensa e ácida serpe de lodo.',
      },
      {
        id: 'metal-forms',
        title: 'Formas de metal',
        body: 'Embora elementais de metal sejam feitos quase só de metal, a maioria é composta de camadas de metais diferentes em fragmentos miúdos, tão complexas quanto um corpo de carne ou de matéria vegetal. Muitos desses metais estão enferrujados ou decompostos pela entropia lenta e natural do Plano do Metal.',
      },
    ],
  }),
  fam({
    id: 'family-elemental-wood',
    name: 'Elemental de madeira',
    originalName: 'Elemental, Wood',
    trait: null,
    source: 'Rage of Elements',
    sourcePage: 204,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=345',
    intro:
      'À primeira vista, elementais de madeira talvez não pareçam ter o mesmo potencial destrutivo dos primos dos Planos do Fogo, da Água ou do Ar — mas não se engane. A mata pode ser um lugar perigoso.\n\nEmbora alguns lembrem animais, as feras elementais apresentadas aqui ainda são plantas, e o ciclo de vida reflete isso. Cordeiros vegetais crescem em caules enraizados, dos quais não podem ser removidos até amadurecer (ou, talvez, amadurecer de vez), o que os deixa dependentes do entorno imediato para se alimentar. Preguiças de musgo não passam de montes de penugem verde no primeiro século de existência, e só ganham mobilidade limitada quando conseguem crescer as garras defensivas de madeira.',
    sections: [
      {
        id: 'a-brain-by-any-other-name',
        title: 'Um cérebro com outro nome',
        body: 'Mesmo que a Senhora Shumunue tenha ensinado os ancestrais dos elementais de madeira a imitar animais, a consciência de um elemental de madeira não fica num cérebro, e sim no sistema de raízes. Entidades como rastejantes do viveiro, bosques vivos e feras entalhadas usam isso a seu favor. O fato de o corpo de madeira poder ser entalhado e trabalhado, aparentemente sem dano duradouro, sugere que talvez não sintam dor enquanto as raízes permanecerem intactas.',
      },
      {
        id: 'diverse-elementals',
        title: 'Elementais diversos',
        body: 'Os Planos Elementais são mais do que extensões de céu, rocha, metal, fogo, madeira e oceano. Nuvens de névoa, poeira e tempestades flutuam pelo Plano do Ar. O Plano da Terra inclui bosques verdejantes, metal e cristal brilhantes, e ermos irradiados. O Plano do Fogo traz magma, fumaça asfixiante e clarão radiante. Em meio ao mar sem fim do Plano da Água há bolsões de lodo e salmoura, além dos ambientes de outro mundo das profundezas.',
      },
      {
        id: 'elemental-wyrms',
        title: 'Serpes elementais',
        body: 'A serpe de gelo é a serpe elemental mais encontrada, mas outras existem: a serpe de fogo flamejante, a serpe-faísca esguia e um pouco menor, e a maior de todas, a imensa e ácida serpe de lodo.',
      },
      {
        id: 'wild-but-unwild',
        title: 'Selvagem, mas não selvagem',
        body: 'Muitos elementais de madeira são criados por kizidhars e outras criaturas poderosas no Plano da Madeira e colocados em papéis de rotina. Povoando reservas naturais e propriedades vastas, podem não saber como se comportar se soltos no ermo. Nascem essencialmente domesticados e provavelmente agem bem diferente das criaturas selvagens que imitam, mesmo em ambientes naturais. Os predadores naturais são poucos, o que os põe em menos risco, embora ainda sejam às vezes comidos por cupins gigantes ou capturados como mascotes.',
      },
    ],
  }),
  fam({
    id: 'family-xiomorn',
    name: 'Xiomorn',
    originalName: 'Xiomorn',
    trait: null,
    source: 'Rage of Elements',
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=341',
    intro:
      'Quando Sairazul criou os xiomorns, eles eram imortais. Ela criou 65.536, todos à sua imagem, todos imbuídos de um pedaço da faísca divina. Durante o cativeiro dela, Ayrzul usou visões de uma extinção futura para manipulá-los a sacrificar o poder a ele. Esse sacrifício dividiu os xiomorns em duas classes: 32.768 construtores de cofres que guardaram a essência de Sairazul e 32.768 guardiões de cofres que não viveriam mais para sempre. Por milênios, xiomorns ergueram uma civilização mágica vasta pelo Plano da Terra e, quando não restou espaço para construir, partiram. Em cada mundo novo, xiomorns constroem os cofres e conduzem os experimentos, buscando sem fim pistas para evitar a extinção.',
    sections: [
      {
        id: 'crystal-crafters',
        title: 'Artesãos de cristal',
        body: 'Xiomorns dominaram a criação de inúmeros itens mágicos de cristal além das pedras de geração e das sementes de cofre. Incluem pilares de pedra negra chamados pedras-sussurro, que permitem a xiomorns comunicar-se telepaticamente entre cofres; orvportões, que usam funis de cristal verde em teia para teleportar entre cofres das Terras Sombrias; e um vórtice em Orv chamado Útero de Cristal, que liga a um bastião crucial no Plano da Terra.',
      },
      {
        id: 'vault-seeds',
        title: 'Sementes de cofre',
        body: 'Xiomorns criam cavernas subterrâneas mágicas usando sementes de cofre, ferramentas mágicas antigas que Ayrzul legou à espécie como recompensa pelo sacrifício. As sementes de cofre foram usadas para criar os Cofres de Orv nas Terras Sombrias de Golarion, e um acidente com uma semente de cofre fora de controle criou a misteriosa Torre Esmeralda.',
      },
    ],
  }),
  fam({
    id: 'family-elemental-air',
    name: 'Elemental do ar',
    originalName: 'Elemental, Air',
    trait: null,
    source: 'Monster Core',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=408',
    intro:
      'Vindos do Plano do Ar, esses seres aparecem em vários tamanhos e formas. São conhecidos por serem esquivos, velozes e muitas vezes difíceis de detectar, pois são compostos principalmente de ar.',
    sections: [
      {
        id: 'diverse-elementals',
        title: 'Elementais diversos',
        body: 'Os Planos Elementais são mais do que extensões de céu, rocha, metal, fogo, madeira e oceano. Nuvens de névoa, poeira e tempestades flutuam pelo Plano do Ar. O Plano da Terra inclui bosques verdejantes, metal e cristal brilhantes, e ermos irradiados. O Plano do Fogo traz magma, fumaça asfixiante e clarão radiante. Em meio ao mar sem fim do Plano da Água há bolsões de lodo e salmoura, além dos ambientes de outro mundo das profundezas.',
      },
      {
        id: 'elemental-wyrms',
        title: 'Serpes elementais',
        body: 'A serpe de gelo é a serpe elemental mais encontrada, mas outras existem: a serpe de fogo flamejante, a serpe-faísca esguia e um pouco menor, e a maior de todas, a imensa e ácida serpe de lodo.',
      },
    ],
  }),
  fam({
    id: 'family-elemental-earth',
    name: 'Elemental da terra',
    originalName: 'Elemental, Earth',
    trait: null,
    source: 'Monster Core',
    sourcePage: 142,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=409',
    intro:
      'Elementais da terra fazem excelentes guarda-costas para espeleólogos aventureiros e são protetores ideais de locais subterrâneos importantes, como cofres e tesourarias.',
    sections: [
      {
        id: 'diverse-elementals',
        title: 'Elementais diversos',
        body: 'Os Planos Elementais são mais do que extensões de céu, rocha, metal, fogo, madeira e oceano. Nuvens de névoa, poeira e tempestades flutuam pelo Plano do Ar. O Plano da Terra inclui bosques verdejantes, metal e cristal brilhantes, e ermos irradiados. O Plano do Fogo traz magma, fumaça asfixiante e clarão radiante. Em meio ao mar sem fim do Plano da Água há bolsões de lodo e salmoura, além dos ambientes de outro mundo das profundezas.',
      },
      {
        id: 'elemental-wyrms',
        title: 'Serpes elementais',
        body: 'A serpe de gelo é a serpe elemental mais encontrada, mas outras existem: a serpe de fogo flamejante, a serpe-faísca esguia e um pouco menor, e a maior de todas, a imensa e ácida serpe de lodo.',
      },
      {
        id: 'looting-earth-elementals',
        title: 'Saqueando elementais da terra',
        body: 'Elementais da terra às vezes têm gemas ou minerais valiosos incorporados ao corpo e, uma vez mortos, esses bens podem ser recolhidos como tesouro. Gemas, metais preciosos como minério de prata ou ouro, ou materiais mais raros como prata da alvorada ou adamantina podem ser colhidos dessas criaturas, embora os achados mais caros tendam a estar só nos elementais da terra mais poderosos.',
      },
    ],
  }),
  fam({
    id: 'family-elemental-fire',
    name: 'Elemental do fogo',
    originalName: 'Elemental, Fire',
    trait: null,
    source: 'Monster Core',
    sourcePage: 144,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=410',
    intro:
      'Elementais do fogo são manifestações destrutivas do escaldante Plano do Fogo. Embora a maioria se deleite com a chance de experimentar novos tipos de fogo longe do plano natal, até o elemental do fogo mais atencioso pode ser um perigo para humanoides e suas propriedades.',
    sections: [
      {
        id: 'diverse-elementals',
        title: 'Elementais diversos',
        body: 'Os Planos Elementais são mais do que extensões de céu, rocha, metal, fogo, madeira e oceano. Nuvens de névoa, poeira e tempestades flutuam pelo Plano do Ar. O Plano da Terra inclui bosques verdejantes, metal e cristal brilhantes, e ermos irradiados. O Plano do Fogo traz magma, fumaça asfixiante e clarão radiante. Em meio ao mar sem fim do Plano da Água há bolsões de lodo e salmoura, além dos ambientes de outro mundo das profundezas.',
      },
      {
        id: 'elemental-temperaments',
        title: 'Temperamentos elementais',
        body: 'Mais do que outros elementais, os do fogo tendem a visões mais extremas. Porém, afastam-se da estagnação e muitas vezes buscam mudança de uma forma ou de outra. A natureza caprichosa do fogo parece impedir que se submetam à autoridade, mas os líderes certos conseguem dirigir a natureza muitas vezes destrutiva apelando a ela.',
      },
      {
        id: 'elemental-wyrms',
        title: 'Serpes elementais',
        body: 'A serpe de gelo é a serpe elemental mais encontrada, mas outras existem: a serpe de fogo flamejante, a serpe-faísca esguia e um pouco menor, e a maior de todas, a imensa e ácida serpe de lodo.',
      },
      {
        id: 'fire-elemental-treasure',
        title: 'Tesouro de elemental do fogo',
        body: 'Muitas vezes, depois de derrotar um elemental do fogo só resta um monte de cinzas e o cheiro de fumaça se dissipando. Mas às vezes fragmentos do poder elemental ficam para trás. A critério do Mestre, um elemental do fogo pode deixar cinzas, pedaços de carvão ou brasas sempre fumegantes, componentes valiosos para itens mágicos temáticos de fogo.',
      },
      {
        id: 'flame-and-fathom-meet',
        title: 'Chama e abismo se encontram',
        body: 'Embora fogo e água classicamente se oponham, na mistura certa viram combinação perigosa. Elementais da água aquecidos a temperatura escaldante por fatores naturais como vulcões submarinos podem causar 1d6 de fogo persistente com os Golpes, enquanto elementais do fogo infundidos de umidade podem exalar nuvens de vapor que obscurecem ou até cegam.',
      },
    ],
  }),
  fam({
    id: 'family-elemental-water',
    name: 'Elemental da água',
    originalName: 'Elemental, Water',
    trait: null,
    source: 'Monster Core',
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=412',
    intro:
      'Elementais da água podem ser muito destrutivos, mas muitas vezes não de propósito; assim como a água pode trazer vida a mortais necessitados, as ondas podem bater na costa e as chuvas inundar cidades. Elementais da água são igualmente difíceis de prever.',
    sections: [
      {
        id: 'diverse-elementals',
        title: 'Elementais diversos',
        body: 'Os Planos Elementais são mais do que extensões de céu, rocha, metal, fogo, madeira e oceano. Nuvens de névoa, poeira e tempestades flutuam pelo Plano do Ar. O Plano da Terra inclui bosques verdejantes, metal e cristal brilhantes, e ermos irradiados. O Plano do Fogo traz magma, fumaça asfixiante e clarão radiante. Em meio ao mar sem fim do Plano da Água há bolsões de lodo e salmoura, além dos ambientes de outro mundo das profundezas.',
      },
      {
        id: 'elemental-wyrms',
        title: 'Serpes elementais',
        body: 'A serpe de gelo é a serpe elemental mais encontrada, mas outras existem: a serpe de fogo flamejante, a serpe-faísca esguia e um pouco menor, e a maior de todas, a imensa e ácida serpe de lodo.',
      },
      {
        id: 'flame-and-fathom-meet',
        title: 'Chama e abismo se encontram',
        body: 'Embora fogo e água classicamente se oponham, na mistura certa viram combinação perigosa. Elementais da água aquecidos a temperatura escaldante por fatores naturais como vulcões submarinos podem causar 1d6 de fogo persistente com os Golpes, enquanto elementais do fogo infundidos de umidade podem exalar nuvens de vapor que obscurecem ou até cegam.',
      },
    ],
  }),
]
