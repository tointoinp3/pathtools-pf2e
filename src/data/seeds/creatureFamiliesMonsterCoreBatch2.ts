import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'
const HOWL = 'Howl of the Wild'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 2 do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core). Sem Legacy.
 */
export const catalogCreatureFamiliesMonsterCoreBatch2: CreatureFamily[] = [
  fam({
    id: 'family-crawling-hand',
    name: 'Mão rastejante',
    originalName: 'Crawling Hand',
    trait: null,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=383',
    intro:
      'Em geral, mãos rastejantes surgem quando apêndices decepados recebem uma consciência tosca de energias necromânticas e viram assassinas incansáveis. Também podem nascer sozinhas, em geral quando uma criatura perde um membro num lugar saturado de necromancia ou com ligação ao Vazio.',
    sections: [
      {
        id: 'crawling-hand-origins',
        title: 'Origens da Mão Rastejante',
        body: 'Um conto popular entre necromantes fala de um mago antigo que traficava magia maligna. Durante um ritual de conjuração que deu errado, a mão do mago ficou possuída e mais tarde o estrangulou enquanto dormia. A mão arrastou o cadáver pelos cômodos até a bancada, encostou uma faca num torno e se decepou do resto do corpo. Segundo a história, a mão cometeu vários assassinatos a mais e desapareceu nos esgotos de uma metrópole, para nunca mais ser vista. Alguns necromantes acreditam que essa mão rastejante original ainda se arrasta pelas sombras daquela cidade, matando como lhe apraz.',
      },
    ],
  }),
  fam({
    id: 'family-snake',
    name: 'Cobra',
    originalName: 'Snake',
    trait: null,
    sourcePage: 316,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=473',
    intro:
      'Cobras vêm em muitas formas: constritoras da selva que enrolam a presa e víboras venenosas de bote mortal. Seja como for, todas consomem a presa inteira, desencaixando a mandíbula e usando músculos poderosos para empurrar a comida goela abaixo até o estômago.',
    sections: [
      {
        id: 'eating-habits',
        title: 'Hábitos Alimentares',
        body: 'Cobras de todos os tipos comem engolindo a presa inteira. Depois de incapacitá-la, desencaixam a mandíbula e a consomem por completo, mesmo que tenha mais que o dobro do diâmetro do corpo da cobra. Uma cobra pode consumir uma criatura do mesmo tamanho que ela ou menor, mas a maioria fica lenta enquanto a refeição digere.',
      },
      {
        id: 'snake-resources',
        title: 'Recursos de Cobra',
        body: 'O padrão distintivo da pele de cobra e a variedade ampla de usos a tornam um recurso cobiçado, e os couros de cobras extra-grandes como anacondas gigantes podem alcançar um belo preço no mercado certo. Couros superdimensionados servem para fabricar roupas de couro de cobra, incluindo botas e luvas, além de outros itens como bainhas, mochilas e até tendas ou barcos improvisados. A pele pode ser retirada limpa com sucesso num teste de Ofício ou de Conhecimento adequado.',
      },
      {
        id: 'snakes-in-mythology',
        title: 'Cobras na Mitologia',
        body: 'Cobras aparecem com frequência e destaque nos mitos e lendas de muitas culturas da região do Mar Interior. No Osirion antigo, eram reverenciadas e associadas tanto ao deus-serpente Apep quanto à deusa Wadjet, a Imperatriz Verde. Talvez o exemplo mais conhecido de cobras nas lendas de Golarion sejam os povo-serpente, humanoides serpentinos que governaram vastas faixas do mundo em tempos pré-históricos e veneravam uma deidade-serpente vil chamada Ydersius.',
      },
    ],
  }),
  fam({
    id: 'family-beetle',
    name: 'Besouro',
    originalName: 'Beetle',
    trait: null,
    sourcePage: 42,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Flash%20Beetle',
    intro:
      'Nem todo besouro se esmaga sob o pé. Os gigantes e vorazes aparecem em regiões temperadas e tropicais. Muitos são pacíficos — até se sentirem ameaçados. Mandíbulas poderosas e exoesqueleto duro viram um combate difícil.',
    sections: [
      {
        id: 'beetle-flash',
        title: 'Besouro-relâmpago',
        body: 'O menor da família brilha. O clarão ofusca quem está perto e apaga o próprio lume por um dia.',
      },
    ],
  }),
  fam({
    id: 'family-merfolk',
    name: 'Povo-marinho',
    originalName: 'Merfolk',
    trait: 'Merfolk',
    sourcePage: 231,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=443',
    intro:
      'Elegantes, misteriosos e graciosos: tudo isso e mais se diz do povo-marinho. Esse povo enigmático lembra humanoides de traços delicados da cintura para cima, mas com as nadadeiras e a cauda de um peixe enorme da cintura para baixo. Encontrados em quase todos os oceanos de Golarion, são tão variados na aparência quanto humanos, a pele indo do pálido ao umber e todos os tons no meio, enquanto as escamas reluzem com a majestade do mar.',
    sections: [
      {
        id: 'fish-out-of-water',
        title: 'Peixe Fora d’Água',
        body: 'Embora o povo-marinho em geral se mantenha nos oceanos, mercadores e diplomatas isolados — além do ocasional membro curioso das maravilhas da superfície — passam algum tempo perto da costa. Para se mover com mais facilidade em terra seca, muitos usam dispositivos de mobilidade. No mais simples, podem ser tinas grandes de água sobre rodas, embora versões mais sofisticadas incluam tampas para a água não respingar, vigias de vidro e até magia. As versões usadas por embaixadores ou mercadores muitas vezes parecem banheiras de porcelana ricamente decoradas, ou até aquários de vidro inteiros sobre pernas encantadas.',
      },
    ],
  }),
  fam({
    id: 'family-caligni',
    name: 'Caligni',
    originalName: 'Caligni',
    trait: 'Caligni',
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=375',
    intro:
      'Calignis espreitam em cidades subterrâneas, e cada um cresce num papel e numa forma determinados por influências sobrenaturais da própria sociedade. Independentemente do tamanho ou do papel, todos são esguios, de carne pálida e olhos brancos. Muitos se deleitam na chance de subir à superfície à noite para roubar.',
    sections: [
      {
        id: 'caligni-faiths',
        title: 'Fés Caligni',
        body: 'Alguns calignis abandonaram a fé tradicional em favor de deidades mais ativas; indivíduos malignos preferem Norgorber ou Zon-Kuthon, enquanto os menos malevolentes podem seguir Nocticula ou Pharasma. Talvez de forma inesperada, Desna também tem um pequeno séquito caligni, sobretudo entre quem viaja com frequência.',
      },
      {
        id: 'darkening-poison',
        title: 'Veneno Escurecedor',
        body: `Muitos calignis carregam várias doses de veneno escurecedor, um veneno de ferimento incomum feito de peçonha de aranha das Terras Sombrias, à mão para incapacitarem inimigos. Uma dose custa 5 po, tem Carga leve, é empunhada com 2 mãos e tem as estatísticas abaixo.

**Salvaguarda** Fortitude CD 16; **Duração Máxima** 6 rodadas; **Estágio 1** 1d6 de veneno (1 rodada); **Estágio 2** 1d6 de veneno e criaturas que você só consegue ver com visão no escuro ficam ocultas para você (1 rodada); **Estágio 3** 1d6 de veneno e criaturas que você só consegue ver com visão no escuro ficam escondidas para você (1 rodada)`,
      },
      {
        id: 'the-caligni-legacy',
        title: 'O Legado Caligni',
        body: 'Os calignis são descendentes de humanos que, milênios atrás, fugiram para o subterrâneo para escapar de um cataclismo devastador e imploraram salvação a semideuses sombrios e malevolentes conhecidos só como os Abandonados. Os Abandonados distorceram os refugiados em sobreviventes duros, mas a um preço: todo caligni que morre se transforma em energia enquanto um farrapo da alma alimenta os Abandonados. Os próprios Abandonados mais tarde desapareceram apesar dessas oferendas, deixando procuradores sombrios para moldar os calignis e a cultura deles.',
      },
    ],
  }),
  fam({
    id: 'family-xulgath',
    name: 'Xulgath',
    originalName: 'Xulgath',
    trait: 'Xulgath',
    sourcePage: 352,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=486',
    intro:
      'Humanoides reptilianos que vivem nas camadas mais altas das Terras Sombrias, xulgaths (conhecidos como trogloditas para muita gente da superfície) muitas vezes atacam invasores no território à vista. Vivem em comunidades familiares simples chamadas ninhadas, lutando contra grupos rivais e outros habitantes agressivos das Terras Sombrias para sobreviver. Ocasionalmente saqueiam povoados da superfície, em geral a mando de líderes cruéis e sedentos de sangue que muitas vezes estão eles mesmos sob o jugo de criaturas mais poderosas, como nagas ou demônios. Um xulgath típico tem escamas cinza-opaco, cinza-escuro ou cor de cinzas, com uma cauda longa e protuberâncias ósseas que correm o comprimento da coluna. Um xulgath típico tem 1,50 m de altura e pesa 68 kg.\n\nEmbora hoje os xulgaths sejam brutais e dispersos, foram um dos primeiros humanoides inteligentes a surgir no mundo primevo, um dia governando um império poderoso que se estendia pelas Terras Sombrias. Hoje, tudo que resta dessa era são ruínas de zigurates de pedra maciços e cidades desmoronando encontradas em algumas das cavernas maiores. Alguns grupos continuam a viver entre essas ruínas, venerando as conquistas dos ancestrais, enquanto outros consideram essas áreas tabu e as deixam infestar de vermes das Terras Sombrias. Sábios não concordam sobre por que a civilização xulgath antiga caiu. Alguns suspeitam que foi o resultado de perder várias guerras contra o povo-serpente; outros sugerem que a influência corruptora do culto a demônios apodreceu a cultura de dentro.\n\nCom certeza, muitos povoados xulgath continuam a venerar demônios até hoje, prestando homenagem e oferecendo sacrifícios vivos a demônios ou outras criaturas terríveis das Fendas Exteriores. Ocasionalmente, um místico xulgath consegue chamar e prender um demônio menor para servir o grupo, mas quem se aprofunda demais no ocultismo pode conjurar um fiend mais poderoso que ou despedaça os xulgaths ou toma o controle do povoado.',
    sections: [
      {
        id: 'rudimentary-gear',
        title: 'Equipamento Rudimentar',
        body: 'A sociedade xulgath declinou de forma aguda sob o domínio demoníaco. Em geral dependem de ferramentas de pedra e de armas catadas da superfície, que podem replicar a maioria das armas simples e algumas marciais corpo a corpo, além de armas simples arremessadas. Uma ninhada avançada talvez consiga fabricar talismãs mágicos de nível baixo, como um cristal de potência ou um espigão salvador.',
      },
      {
        id: 'xulgath-society',
        title: 'Sociedade Xulgath',
        body: 'Xulgaths respeitam a força, e o líder de uma ninhada em geral é o mais forte de todos. O domínio raramente é questionado até que um xulgath potencialmente mais forte acredite que é hora de mudar o governo. Os dois então se enfrentam numa luta até a morte, com o vencedor reivindicando o comando.',
      },
    ],
  }),
  fam({
    id: 'family-hyena',
    name: 'Hiena',
    originalName: 'Hyena',
    trait: null,
    sourcePage: 205,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=433',
    intro:
      'Hienas são carniceiras de matilha, famosas pelo grito inquietante que parece risada. As mais conhecidas são as hienas-manchadas, socialmente gregárias, que viajam em bando e trabalham juntas para caçar ou expulsar criaturas maiores. Em geral são criaturas noturnas que se alimentam de carniça, insetos e fruta, embora não recusem presa fresca para completar a dieta de carniça.',
    sections: [
      {
        id: 'hyena-legends',
        title: 'Lendas de Hiena',
        body: 'A astúcia intensa da hiena, somada à risada inquietante, fez com que hienas fossem associadas a toda sorte de mal — dizem que roubam túmulos, sequestram crianças e empunham poderes sobrenaturais sinistros. Embora hienas comuns não sejam mais maliciosas que qualquer outro predador natural, a reputação imerecida muitas vezes leva bruxas, senhores da guerra e criaturas de índole ruim a buscá-las como animais de estimação ou de guarda. O fato de kholos em particular terem preferência especial por hienas, considerando os animais parentes próximos, pouco faz para melhorar a reputação já ruim do animal.',
      },
    ],
  }),
  fam({
    id: 'family-slurk',
    name: 'Slurk',
    originalName: 'Slurk',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Slurk',
    intro:
      'O slurk é um sapo cavernoso coberto de gosma. A barriga deixa o chão escorregadio; o jato prende quem tenta fugir. Montaria tosca de humanoides das profundezas — e predador quando ninguém está no lombo.',
    sections: [
      {
        id: 'slurk-slime',
        title: 'Gosma',
        body: 'A graxa ventral vira o piso num campo irregular. Quem leva o jato fica desajeitado até raspar a gosma com calma — três ações, no total.',
      },
    ],
  }),
  fam({
    id: 'family-boggard',
    name: 'Boggard',
    originalName: 'Boggard',
    trait: 'Boggard',
    sourcePage: 44,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=373',
    intro:
      'Boggards são humanoides anfíbios agressivos que prosperam em pântanos, charcos e até em algumas florestas tropicais. Saem do ovo como girinos e competem ferozmente por comida — inclusive comendo os irmãos nessa briga. Em 3 anos, os sobreviventes desenvolvem braços, pernas e pulmões enquanto aprendem o rudimento da caça, dos ofícios e da guerra — tudo que precisam para sobreviver numa sociedade em que a força faz o direito. No topo da maioria das hierarquias boggard reina um vidente-do-pântano corpulento, imbuído de magia divina sinistra.',
    sections: [
      {
        id: 'boggard-villages',
        title: 'Vilas Boggard',
        body: 'Boggards preferem habitar pântanos e charcos. Embora estejam em casa na água, preferem passar a maior parte da vida em terra e constroem vilas de cabanas de lama. Muitas vezes mantêm feras guardiãs, como crocodilos, sapos gigantes ou outros animais ferais amansados (ainda que só por um fio) para servir de protetores.',
      },
      {
        id: 'gogunta',
        title: 'Gogunta',
        body: 'Gogunta é a padroeira do povo boggard, muitos dos quais a veneram como deusa.',
      },
    ],
  }),
  fam({
    id: 'family-hippogriff',
    name: 'Hipogrifo',
    originalName: 'Hippogriff',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hippogriff',
    intro:
      'O hipogrifo mistura a frente de uma ave de rapina com o corpo de um cavalo. Voa baixo sobre pastos e encostas, raspa com as garras e sai do alcance. Dá para montar — se o bicho aceitar o cavaleiro e o cavaleiro aguentar o corcoar.',
    sections: [
      {
        id: 'hippogriff-strafe',
        title: 'Rajada voadora',
        body: 'No ar, o hipogrifo passa em linha e golpeia duas presas diferentes no mesmo voo.',
      },
    ],
  }),
  fam({
    id: 'family-hell-hound',
    name: 'Cão infernal',
    originalName: 'Hell Hound',
    trait: null,
    sourcePage: 194,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hell%20Hound',
    intro:
      'Cães infernais são canídeos fiends extraplanares do Fosso. Farejam a presa e cospem labaredas sobrenaturais. São temperamentais e rápidos em mostrar agressão.',
    sections: [
      {
        id: 'hell-hound-breath',
        title: 'Fogo do Fosso',
        body: 'O sopro recarrega se o cão leva fogo. Em matilha, cada mordida dói mais.',
      },
    ],
  }),
  fam({
    id: 'family-nymph',
    name: 'Ninfa',
    originalName: 'Nymph',
    trait: 'Nymph',
    sourcePage: 244,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=449',
    intro:
      'Ninfas são uma família de fey profundamente ligadas ao mundo natural. Costumam tomar a forma de humanoides belos, de traços élficos que combinam com o lar. As mais comuns são as dríades: espíritos que encarnam grandes árvores. Há muitas outras, inclusive náiades, que velam corpos d’água. Toda ninfa é guardiã de algum elemento da natureza — muitas vezes uma só árvore ou lagoa. No caso das rainhas ninfas, podem velar florestas inteiras ou massas d’água enormes.',
    sections: [
      {
        id: 'nymph-queens',
        title: 'Rainhas Ninfas',
        body: `Rainhas ninfas são ninfas poderosas que governam regiões inteiras de ermo intocado, não só uma árvore ou lagoa. Toda variedade de ninfa pode ter uma rainha. Rainhas náiades estão entre as mais proeminentes e interagem mais com mortais próximos. Por isso alguns estudiosos chamam rainhas náiades simplesmente de “ninfas”.

Uma rainha ninfa tem 6 a 10 níveis a mais que uma ninfa comum do mesmo tipo, com estatísticas numéricas reforçadas e Golpes melhorados. O domínio dela é uma região significativa, que fortalece e vivifica com a presença. Rainhas ninfas não dependem do vínculo (perdem a habilidade correspondente, como Dependente da Árvore da dríade); em vez disso ganham Ligada à Terra, abaixo. Também ganham a aura Beleza da Ninfa e a ação Focar Beleza, com efeitos que variam conforme o tipo original. Ganha Inspiração, permitindo presentear quem lhe chama a atenção, e Mudar Forma. Por fim, conjura magias primais preparadas como uma druida do seu nível.

**Ligada à Terra** A rainha está ligada a uma região específica. Enquanto estiver saudável, o ambiente é excepcionalmente resiliente: ela tenta automaticamente contrariar qualquer magia que prejudique o ambiente (como o ritual Praga), usando a CD de magia com posto de contrariar igual à magia de druida de posto mais alto que ela possa conjurar. Quando fica física ou psicologicamente doente, porém, a região velada acaba distorcida ou doente também. Restaurar a rainha cura a região depressa.

**Beleza da Ninfa** (aura, emoção, mental, primal, visual) 9 m. Criaturas que começam o turno na aura devem obter sucesso numa salvaguarda de Vontade ou sofrem um efeito descrito na ficha da rainha.

**Mudar Forma** (polimorfo, primal) A rainha alterna entre a forma original, parecida com uma ninfa típica do tipo, e qualquer forma humanoide Pequena ou Média, em geral uma versão mais humanoide da forma natural.

**Focar Beleza** (emoção, mental, primal, visual) A rainha foca a beleza num alvo, que deve tentar uma salvaguarda contra a aura. Se falhar e já estiver afetado pela aura, sofre um efeito maior descrito na ficha. Só pode Focar Beleza numa criatura dada uma vez por turno.

**Inspiração** (emoção, mental, primal) A rainha inspira uma criatura inteligente ao dar um token de favor — em geral uma mecha de cabelo, mas pode ser outro objeto significativo. Enquanto a criatura carregar o token e permanecer em bons termos, ganha +1 de status em todos os testes de Ofício, Atuação e salvaguardas de Vontade. Se o token for dado a um bardo e ela for a musa dele, a rainha escolhe um benefício extra: +1 de status em todos os testes de Conhecimento; +2 de status em Atuação ao determinar efeitos de composições; +4 de status em testes de perícia sem treino; ou +2 de status em salvaguardas de Vontade contra fey.`,
      },
      {
        id: 'artistic-treasures',
        title: 'Tesouros Artísticos',
        body: 'Ninfas preferem arte a qualquer outro bem material: colecionam as melhores peças que conseguem e tentam criar as próprias. Às vezes carregam bugigangas mágicas ou usam roupa e joias encantadas, mas o maior tesouro que uma rainha pode compartilhar costuma ser a inspiração para quem busca uma musa.',
      },
      {
        id: 'dual-guardians',
        title: 'Guardiãs Duplas',
        body: 'Embora todas as ninfas protejam áreas de beleza natural, hesperides muitas vezes guardam outros tesouros mais literais, às vezes incluindo itens há muito dados como perdidos. O temperamento estável e a lealdade atemporal fazem delas confiáveis para manter o que protegem a salvo.',
      },
      {
        id: 'harmonious-landscapes',
        title: 'Paisagens Harmoniosas',
        body: 'Ninfas tendem a estar ligadas a trechos específicos de esplendor natural — bosques para dríades, rios para náiades. Áreas onde ninfas habitam sempre parecem mais pristine, de tirar o fôlego e cênicas do que seriam sem elas.',
      },
      {
        id: 'inspirations-for-art',
        title: 'Inspirações para a Arte',
        body: 'Ninfas são manifestações vivas de beleza e graça, e por isso costumam ser tema de arte — sobretudo escultura e pintura. Prometer imortalizar uma ninfa numa obra pode ser um ótimo jeito de conquistar o favor dela, mas é preciso cuidar para que admire e se orgulhe do resultado, senão a ofensa a faz reagir com magia poderosa.',
      },
      {
        id: 'other-nymphs',
        title: 'Outras Ninfas',
        body: 'Náiades e dríades são as mais conhecidas, mas há outras. Hesperides, por exemplo, velam o pôr do sol e a luz dourada, e podem ser encontradas em falésias costeiras ou ilhas remotas. Lâmpades, por outro lado, são ninfas sombrias e de humor instável, em cavernas maravilhosas forradas de cristal bem no subterrâneo.',
      },
    ],
  }),
  fam({
    id: 'family-bear',
    name: 'Urso',
    originalName: 'Bear',
    trait: null,
    sourcePage: 41,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Grizzly%20Bear',
    intro:
      'Ursos são predadores ferozes, típicos de bosques e colinas frias ou temperadas. Há muitas espécies além das duas mais vistas: o urso-preto, menor, e o polar, do Ártico.',
    sections: [
      {
        id: 'bear-maul',
        title: 'Abraço mortal',
        body: 'O pardo espanca quem já agarrou. O das cavernas é pior: o bônus de dano sobe, e a investida cobre mais chão.',
      },
    ],
  }),
  fam({
    id: 'family-pegasus',
    name: 'Pégaso',
    originalName: 'Pegasus',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Pegasus',
    intro:
      'O pégaso é um cavalo alado, orgulhoso e seletivo. Só aceita cavaleiro que considere digno — e, no ar, ajuda o aliado a montar no meio do voo. O galope cobre terra e céu no mesmo fôlego.',
    sections: [
      {
        id: 'pegasus-mount',
        title: 'Montaria celeste',
        body: 'Sem cavaleiro, o pégaso pode oferecer o lombo no meio do voo. Quem quiser montar gasta uma reação.',
      },
    ],
  }),
  fam({
    id: 'family-twigjack',
    name: 'Twigjack',
    originalName: 'Twigjack',
    trait: null,
    sourcePage: 332,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=479',
    intro:
      'Habitantes desajustados da floresta, twigjacks nascem da mistura cruel e brincalhona de fey com o próprio bosque em que residem. O corpo é sarça espinhosa entrelaçada de cipós. Um tufo de musgo, não muito diferente de cabelo, cobre a cabeça. A boca é um cânion de gravetos lascados e quebrados que bissecta o rosto. Folhas e brotos saem ao acaso do corpo. Muitas florestas densas de Golarion têm pelo menos um punhado de twigjacks no sub-bosque.\n\nEmbora truculentos e violentos, twigjacks se importam profundamente com o que consideram suas florestas. Assediam forasteiros que se aprofundam nos domínios arborizados, forçando de volta até os exploradores, madeireiros e viajantes mais determinados, sobretudo quando esses invasores abrem estradas pela floresta. Não são, porém, particularmente territoriais com outras criaturas da mata. Quando criaturas silvestres, sobretudo fey, se unem contra uma ameaça externa, os twigjacks da área chegam ansiosos para lutar, mesmo que não tenham sido convidados.',
    sections: [
      {
        id: 'twigjack-brambles',
        title: 'Sargas de Twigjack',
        body: 'Às vezes grupos de twigjacks se reúnem e formam comunidades temporárias chamadas “sargas”, em geral para ajudar em tempos de necessidade da floresta ou para executar alguma vingança grande. Esses grupos podem ter de três a 30 twigjacks. Concluída a tarefa, cada um segue o próprio caminho.',
      },
    ],
  }),
  fam({
    id: 'family-hag',
    name: 'Bruxa',
    originalName: 'Hag',
    trait: 'Hag',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=425',
    intro:
      'Bruxas são predadoras malévolas que usam magia e manipulação para atrair crianças e jovens. A forma verdadeira é eldritch e horrenda, mas passam boa parte da vida disfarçadas de mulheres comuns. Procuram alvos infelizes, inocentes ou vulneráveis, exploram a fraqueza e os arrebatam. A bruxa típica é abusiva, controladora e narcisista. Bruxas menos maliciosas talvez existam, mas raramente revelam a forma verdadeira, o que as torna quase impossíveis de encontrar.',
    sections: [
      {
        id: 'hag-covens',
        title: 'Covens de Bruxa',
        body: 'Bruxas já são perigosas sozinhas, mas quando se reúnem em três para formar um coven, ficam bem mais poderosas.',
      },
      {
        id: 'hags-and-children',
        title: 'Bruxas e Crianças',
        body: 'Bruxas são conhecidas por trocar bebês humanoides pelos próprios filhos. Essas crianças são changelings e podem se tornar bruxas. Embora as bruxas se baseiem nas vilãs dos contos de fadas, também podem tocar no comportamento real demais de adultos abusivos. Considere e converse se bruxas cabem no seu grupo e na sua mesa antes de usá-las. Pathfinder é para todo mundo, e não é fraqueza nem egoísmo evitar memórias traumáticas num jogo feito para ser divertido.',
      },
      {
        id: 'other-hags',
        title: 'Outras Bruxas',
        body: 'Os quatro tipos apresentados aqui são só os mais notórios. Outras — como a bruxa de sangue, a da lua, a da tempestade e a do inverno — afligem a sociedade em outras regiões do mundo.',
      },
      {
        id: 'hag-supporting-characters',
        title: 'Personagens de Apoio',
        body: 'Bruxas não precisam ser a ameaça principal da aventura. Heróis às vezes precisam buscar saber ou poder de alguém conhecido por ser perigoso ou traiçoeiro — papel que as bruxas preenchem bem. Quando não estão aterrorizando humanoides, exploram magia proibida de fontes que gente decente nunca consideraria.',
      },
      {
        id: 'the-nature-of-hags',
        title: 'A Natureza das Bruxas',
        body: 'Ninguém tem certeza do que as bruxas são nem de onde vieram. O fato de não existirem bruxas masculinas conhecidas também intriga estudiosos ocultos. Muitos acreditam que são um tipo de fey, pois a maioria tem aversão a ferro frio. Ainda assim, não se encontrou origem no Primeiro Mundo. Alguns contos dizem que as bruxas foram criaturas que fizeram uma série de barganhas poderosas com diabos. Embora tenham enganado os fiends, ainda assim acabaram corrompidas.',
      },
    ],
  }),
  fam({
    id: 'family-gargoyle',
    name: 'Gárgula',
    originalName: 'Gargoyle',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Gargoyle',
    intro:
      'Gárgulas são caçadoras monstruosas de pedra elemental. Usam a semelhança com estátuas decorativas para se esconder à vista, nas cidades, de dia, e descer sobre pedestres azarados à noite. A forma mais comum é a de um humanoide cornudo com asas de morcego, mas há muita variação.',
    sections: [
      {
        id: 'gargoyle-statue',
        title: 'Pedra que espera',
        body: 'Até agir, passa por estátua. Na cidade, a face muda aos poucos para combinar com a arquitetura local. Caçam sozinhas ou em asas.',
      },
    ],
  }),
  fam({
    id: 'family-satyr',
    name: 'Sátiro',
    originalName: 'Satyr',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Satyr',
    intro:
      'Para um sátiro, a vida é festa e todo mundo está convidado. Famosos pelo hedonismo, esses fey acham que não há beleza maior que canção, bebida, banquete e prazer carnal. Usam música encantadora e charme natural para soltar as pessoas das regras da sociedade — em geral, para puxá-las a uma farra ou a um encontro no claro da lua.',
    sections: [
      {
        id: 'satyr-pipes',
        title: 'Flautas e vinho',
        body: 'As flautas conjuram Encantar, Medo, Sono ou Sugestão numa emanação. O vinho do odre aguça a Vontade — sobretudo contra medo.',
      },
    ],
  }),
  fam({
    id: 'family-scarecrow',
    name: 'Espantalho',
    originalName: 'Scarecrow',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Scarecrow',
    intro:
      'Um amontoado tosco de materiais em forma humana: o construto espantalho é indistinguível do espantalho comum até ranger e se erguer. A cabeça de abóbora ou pano explode em chama eldritch, e o medo se espalha no ar. Cada um é feito à mão — madeira, pano, corda, palha, sabugo — vestido com farrapos de lavoura.',
    sections: [
      {
        id: 'scarecrow-leer',
        title: 'Olhar no campo',
        body: 'O olhar impede o medo de baixar. Aves sofrem mais. No primeiro round, o brilho funesto deixa desprevenido quem ainda não agiu.',
      },
    ],
  }),
  fam({
    id: 'family-barghest',
    name: 'Barghest',
    originalName: 'Barghest',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Barghest',
    intro:
      'Barghests são feras caninas que se deliciam com a caçada. Espreitam perto de povoados em busca de presa que dê desafio. Mesmo no ermo mais fundo, escolhem o alvo mais esperto ou difícil: gigantes, ninfas, unicórnios. Mais que a vitória ou a refeição, gostam da perseguição e do medo que plantam.',
    sections: [
      {
        id: 'barghest-hunt',
        title: 'Caçada e ferida',
        body: 'Muda entre humanoide, cão e a forma verdadeira. A garra deixa uma ferida que só magia fecha. Se a presa se move, o barghest salta o espaço no encalço.',
      },
    ],
  }),
  fam({
    id: 'family-arboreal',
    name: 'Arbóreo',
    originalName: 'Arboreal',
    trait: null,
    sourcePage: 24,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=364',
    intro:
      'Arbóreos são guardiões da floresta e representantes das árvores. Longevos como os bosques que velam, se veem como pais e pastores das árvores, não como jardineiros. Por isso, embora tendam a ser lentos e metódicos, são aterradoramente rápidos quando forçados a lutar em defesa da mata. Raramente buscam a companhia de povos de vida curta — mesmo elfos são fugazes aos olhos dos arbóreos — e desconfiam por natureza da mudança, mas já se soube que toleram quem busca aprender com os monólogos longos e errantes, sobretudo se esses pupilos também expressam o desejo de proteger as terras arborizadas. Contra quem ameaça o domínio, como madeireiros ansiosos por colher madeira ou colonos que querem estabelecer lavouras ou uma vila, a ira dos arbóreos é inabalável e devastadora. Talvez de forma irônica, arbóreos são talentosos em derrubar o que outros constroem — um traço que serve bem aos membros vingativos da espécie.',
    sections: [
      {
        id: 'felled-arboreals',
        title: 'Arbóreos Derrubados',
        body: 'Arbóreos têm grande respeito pelos membros mortos da espécie. Os rituais elaborados de enterro envolvem deitar o arbóreo caído num leito de musgo no centro de um bosque de mudas. O arbóreo em decomposição nutre as mudas, garantindo o crescimento de uma nova geração de árvores.',
      },
      {
        id: 'fungus-networks',
        title: 'Redes de Fungo',
        body: 'Regentes arbóreos particularmente velhos e outros arbóreos poderosos podem se ligar à rede extensa de fungo que conecta as raízes de todas as árvores da floresta. Assim, o arbóreo fica sabendo de ameaças em toda a mata, mesmo a quilômetros de distância.',
      },
      {
        id: 'late-bloomers',
        title: 'Floração Tardia',
        body: 'Embora cresçam mais rápido que árvores, arbóreos levam décadas para alcançar a maturidade. Passam os primeiros anos enraizados no lugar, desenvolvendo afinidade com a flora da terra natal e sintonizando-se com seus ritmos, enquanto arbóreos adultos vigiam o progresso. Depois do primeiro século, os jovens ficam mais móveis, muitas vezes aprendendo com arbóreos seniores do território enquanto aprendem a assumir o manto de guardiões da floresta.',
      },
    ],
  }),
  fam({
    id: 'family-sprite',
    name: 'Sprite',
    originalName: 'Sprite',
    trait: 'Sprite',
    sourcePage: 322,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=475',
    intro:
      'Elusivos, volúveis e efervescentes, sprites são o que muita aldeia imagina ao ouvir “fey” ou “fada”. Embora o temperamento varie, todos compartilham a ligação com a magia e o tamanho diminuto. Essa família de fey compartilha o nome com o membro mais leve e numeroso: o sprite comum.',
    sections: [
      {
        id: 'sprite-pranks',
        title: 'Peças de Sprite',
        body: 'As peças de sprite tendem a ser de natureza bondosa: podem usar as habilidades para constranger um fanfarrão ou para enganá-lo numa trama convoluta que o faça notar um admirador que esteve ali o tempo todo. Os planos muitas vezes saem pela metade: a natureza mercurial dos sprites faz com que se distraiam facilmente com algo novo antes de concluir o plano anterior.',
      },
    ],
  }),
  fam({
    id: 'family-hydra',
    name: 'Hidra',
    originalName: 'Hydra',
    trait: null,
    source: HOWL,
    sourcePage: 164,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hydra',
    intro:
      'A hidra mais vista tem cinco cabeças que atacam em uníssono. Pelo Mar Interior há raças mais fantásticas, cada uma com evolução e caça próprias. São serpentes de mau humor e apetite voraz, temidas pela regeneração.',
    sections: [
      {
        id: 'hydra-heads',
        title: 'Cabeças que voltam',
        body: 'Decepar sem cauterizar (ácido ou fogo) faz nascer duas no lugar de uma. Cada cabeça extra é mais uma reação para Golpe Reativo. Se todas forem cauterizadas, a hidra morre.',
      },
    ],
  }),
  fam({
    id: 'family-drake',
    name: 'Drake',
    originalName: 'Drake',
    trait: null,
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=404',
    intro:
      'Vorazes, bestiais e guiados pelo instinto, drakes são monstros dracônicos que carregam uma fração do poder aterrorizante dos dragões primais com os quais compartilham raízes evolutivas. Embora sejam mais fracos, mais lentos e menos inclinados à razão que os dragões, drakes ainda assim são uma ameaça às criaturas e aos povoados à sua volta. A tendência de formar bandos de saque — pequenos grupos sociais chamados, com propriedade, de “devastações” — os torna ainda mais perigosos: uma única devastação de drakes-do-rio pode arrasar depressa uma vila ribeirinha, e devastações errantes de drakes-do-deserto são praga para caravaneiros.\n\nDrakes compartilham certas características físicas que os unem como uma só espécie, apesar da variedade de habitats e habilidades. Por exemplo, não têm antebraços: no combate corpo a corpo restam as mandíbulas formidáveis e a cauda de escamas espessas. A maioria preferiria evitar isso, contudo, e usa o sopro mágico para semear destruição em faixas largas, à distância confortável, enquanto voa. Por fim, todos os drakes têm pequenos reservatórios do poder dracônico ancestral, que podem explorar para feitos incríveis de velocidade.\n\nEspécies diferentes de drakes raramente entram em conflito. Parte disso são os habitats distintos, mas drakes aceitam negociar acordos simples entre devastações. Essa cortesia não se estende a dragonetes, que os drakes tomam de bom grado como presa. Drakes domesticados solitários também ficam de fora desses acordos e são considerados caça livre se o domador não for forte o bastante para protegê-los.',
    sections: [
      {
        id: 'drake-eggs',
        title: 'Ovos de Drake',
        body: 'Embora o couro de drake não valha mais que o de criaturas de tamanho parecido, ovos de drake são mercadoria cobiçada. Servem de componente em magias poderosas e também são comida em várias culturas, mas o uso mais comum é chocar e criar drakes como montaria e guardiões.\n\nUm drake típico põe uma ninhada de 2d4 ovos a cada 5 anos. Os ovos chocam em 3 a 6 semanas, e nesse período precisam ser mantidos em condições adequadas ao ambiente natural da espécie — talvez o aspecto mais difícil da criação. Em geral é fácil para criadores incubar ovos de drakes-do-deserto ou da selva (que precisam de calor brando) ou de drakes-do-rio (que devem ficar submersos em água corrente); já os ovos de drakes de chama e de geada exigem temperaturas extremas para chocar, o que pode ser difícil de reproduzir com segurança.\n\nUm ovo de drake é um objeto com Solidez 3, 5 PV e sem limiar de quebrado. A cor varia só um pouco de uma espécie para outra. Uma criatura precisa obter sucesso num teste de Natureza CD 20, ou de Conhecimento relevante CD 20, para identificar a espécie de um ovo específico.\n\nQuando o drake choca, apega-se à primeira criatura que vê. Quem recebe esse apego pode usar Natureza para Treinar Animal e Comandar um Animal com aquele drake. O preço de mercado do ovo varia conforme o tipo de drake e a situação legal. Como drakes são criaturas perigosas e inteligentes, muitas sociedades não aprovam o comércio de ovos e criminalizam quem o pratica. Leva 2 anos para um filhote crescer até o tamanho adulto. Um drake bem treinado pode ser montaria ou guardião temível, mas muitos aspirantes a treinador descuidados acabam devorados pelos próprios pupilos.'
      },
      {
        id: 'drake-hunters',
        title: 'Caçadores de Drake',
        body: 'A tentação de caçar um dragão é difícil de resistir para muitos aventureiros, mas a tarefa é cheia de perigo. Aventureiros inescrupulosos às vezes caçam drakes e usam troféus dessas criaturas para enganar os moradores locais.'
      },
      {
        id: 'drake-resources',
        title: 'Recursos de Drake',
        body: 'Todo aventureiro sabe que o couro de dragão vira armadura ou armas potentes; o couro de drake não tem esse valor intrínseco. Mesmo assim, escamas e chifres de drake impressionam fisicamente e, para o comprador desinformado, podem parecer legítimos à primeira vista. Coureiros inescrupulosos já usaram couro de drake para fabricar e vender armadura de couro de dragão falsificada — quem compra deve ficar atento a golpes.',
      },
      {
        id: 'drake-treasure',
        title: 'Tesouro de Drake',
        body: 'Drakes compartilham o interesse dos dragões por tesouro, mas não o gosto refinado. Um tesouro de drake com certeza terá moedas, joias, gemas, equipamento e até um item mágico ou outro, mas o grosso invariavelmente é armas quebradas, pedras brilhantes, sucata e outros restos duvidosos.',
      },
      {
        id: 'drake-other',
        title: 'Outros Drakes',
        body: 'Os drakes destas páginas estão longe de ser os únicos que existem. Drakes-da-floresta têm couro verde, cospem nuvens venenosas e vivem em bosques temperados. Drakes-da-fenda, entre os mais poderosos da espécie, cospem vapores cáusticos aderentes e habitam ermos e regiões marcadas por desastres mágicos devastadores. Drakes-do-mar aparecem em oceanos mundo afora; drakes-de-lava, em fendas vulcânicas; drakes-da-névoa, em costas e pântanos salgados; e drakes-do-pináculo, em colinas rochosas e irregulares. Sem dúvida, muitos outros tipos de drake espreitam nos cantos distantes do mundo.',
      },
    ],
  }),
  fam({
    id: 'family-will-o-wisp',
    name: 'Fogo-fátuo',
    originalName: "Will-o'-Wisp",
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Will-o%27-Wisp',
    intro:
      'Bolas malévolas de luz colorida, fogos-fátuos assombram pântanos e florestas solitários e atraem viajantes para o perigo. Variam cor e brilho, e gostam de imitar lanternas ou fogueiras distantes para tirar gente perdida da trilha segura. Podem apagar de vez e ficar invisíveis — sobretudo quando a vítima já percebeu que a luz não levava a lugar nenhum.',
    sections: [
      {
        id: 'wisp-fear',
        title: 'Medo como alimento',
        body: 'Sob o brilho, o corpo é uma bola esponjosa de uns 30 cm. Imune a quase toda magia. Alimenta-se do terror e, se apagou, o medo reacende o lume.',
      },
    ],
  }),
  fam({
    id: 'family-redcap',
    name: 'Redcap',
    originalName: 'Redcap',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Redcap',
    intro:
      'Redcaps são fey sádicos e caprichosos que se deliciam com sangue e assassinato. O mais famoso é o velhinho barbado, mas redcaps de outros gêneros não são menos cruéis. No fundo são valentões covardes, intimidados por qualquer coisa mais forte — o que os leva a temer e odiar símbolos de divindades.',
    sections: [
      {
        id: 'redcap-hat',
        title: 'Gorro e bota de ferro',
        body: 'O gorro só dá poder depois de banho de sangue fresco. Sem ele, a cura acelerada some e o dano cai. As botas de ferro soam no pedregulho — quem conhece o barulho já sabe o que vem.',
      },
    ],
  }),
  fam({
    id: 'family-harpy',
    name: 'Harpia',
    originalName: 'Harpy',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Harpy',
    intro:
      'Harpias misturam humano e ave: humanoides ferais com asas, garras e dentes afiados. Usam o domínio ancestral do vento para atrair a presa ou puxá-la direto para a refeição. Gostam de causar confusão e medo antes do bote — acham que isso tempera a carne. Comem quase tudo, mas preferem presas sápientes, sobretudo humanos e elfos.',
    sections: [
      {
        id: 'harpy-aerie',
        title: 'Ninho e fedor',
        body: 'O ninho fede a gore e guano. Viajantes espertos associam o cheiro a perigo. O vento puxa a presa para a mandíbula; a peste pútrida segue a mordida.',
      },
    ],
  }),
  fam({
    id: 'family-basilisk',
    name: 'Basilisco',
    originalName: 'Basilisk',
    trait: null,
    sourcePage: 39,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Basilisk',
    intro:
      'O basilisco é um réptil de mau gênio cujo olhar transforma criaturas em pedra. O folclore diz que, como a cocatriz, os primeiros nasceram de ovos coriáceos de cobra chocados por galos — mas quase nada na anatomia confirma isso.',
    sections: [
      {
        id: 'basilisk-gaze',
        title: 'Olhar e sangue',
        body: 'Prefere carne já petrificada: mastiga o fóssil e deixa o ácido do estômago terminar o trabalho. A digestão é tão lenta que o bicho parece no meio de se petrificar. Sangue fresco de basilisco devolve carne a quem virou pedra.',
      },
    ],
  }),
  fam({
    id: 'family-poltergeist',
    name: 'Poltergeist',
    originalName: 'Poltergeist',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Poltergeist',
    intro:
      'Quando uma criatura morre e, por qualquer motivo, o espírito não consegue ou não quer deixar o local da morte, pode se manifestar como poltergeist: um espírito inquieto, invisível, ainda capaz de mexer em objetos físicos. Muitos morreram de um jeito que nasceu de — ou levou a — trauma emocional extremo.',
    sections: [
      {
        id: 'poltergeist-site',
        title: 'Preso ao sítio',
        body: 'Não vai longe do lugar onde nasceu. Só fica visível para amedrontar; no turno seguinte some de novo. Destruído, volta em dias — a menos que alguém acerte a conta que o prende.',
      },
    ],
  }),
  fam({
    id: 'family-mummy',
    name: 'Múmia',
    originalName: 'Mummy',
    trait: 'Mummy',
    sourcePage: 234,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=445',
    intro:
      'Embora muitas culturas pratiquem a mumificação por razões benignas, múmias mortas-vivas são criadas por rituais brutais, em geral para servir de guardiãs eternamente vigilantes. Bem mais raro: um corpo mumificado sem esses ritos especiais se ergue de novo pelo ódio aos vivos.',
    sections: [
      {
        id: 'faithful-preservation',
        title: 'Preservação Fiel',
        body: 'Poucas fés apoiam a mumificação como meio de criar mortos-vivos. Certas seitas irorianas, por exemplo, praticam a automumificação, e fiéis do antigo deus osiriano Set deixaram muitas múmias nas terras daquele império. A fé de Urgathoa, porém, abraça de coração a mumificação dos dispostos e dos relutantes, produzindo a maioria das múmias dos tempos modernos.',
      },
      {
        id: 'into-eternity',
        title: 'Para a Eternidade',
        body: 'Múmias mortas-vivas são um escárnio da preservação de corpos após a morte, prendendo almas em cascas estáticas em vez de permitir que entrem no Grande Além. Seguidores de Pharasma as consideram uma afronta à deusa em muitos níveis, e alguns até recusam os ritos tradicionais que a deusa apoia.',
      },
    ],
  }),
]
