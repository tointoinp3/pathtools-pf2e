import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'
const HOWL = 'Howl of the Wild'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote extra do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core).
 */
export const catalogCreatureFamiliesMonsterCoreBatch: CreatureFamily[] = [
  fam({
    id: 'family-animated-object',
    name: 'Objeto animado',
    originalName: 'Animated Object',
    trait: null,
    sourcePage: 18,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=360',
    intro:
      'Rituais e magia estranha dão vida aparente a objetos. Tomam muitas formas e servem a muitos usos. Uns guardam tesouros e atacam quem se aproxima de surpresa; outros são distração de ricos, criados simples para tarefas miúdas e afins.',
    sections: [
      {
        id: 'animating-objects',
        title: 'Animando Objetos',
        body: 'A maioria dos objetos animados que aventureiros encontram é permanente, criada por rituais. Espíritos inquietos, certos fantasmas e outras influências de mortos-vivos também podem dar origem a objetos animados — embora, como no caso do poltergeist, o que parece objeto vivo às vezes seja só uma força maligna arremessando mobília como arma.',
      },
      {
        id: 'choosing-to-animate',
        title: 'Conveniência e Vaidade',
        body: 'A maior parte é feita por conveniência ou vaidade. Conjuradores animam vassouras e louça para limpar, livros e pergaminhos para pesquisa, carroças e carruagens para transporte. A maioria é animada sem a intenção de servir de guardião, e muitos existem sem o mundo notar. Só quem tem dinheiro e poder escolhe animar objetos como guardiões — e são esses que costumam aparecer em aventuras.',
      },
      {
        id: 'guarded-treasures',
        title: 'Tesouros Guardados',
        body: 'Objetos animados são construtos irracionais. Não têm conceito do valor de tesouro, mas costumam guardar cofres ou depósitos. Nesses casos o tesouro varia muito, mas deve ter valor adequado ao nível do objeto.',
      },
      {
        id: 'losing-control',
        title: 'Perdendo o Controle',
        body: 'O processo de animar varia de objeto para objeto e conforme o ritual. Alguns rituais designam um controlador a quem o objeto obedece. Sem ordens, muitos recorrem a táticas defensivas. Em outros casos o ritual foi malfeito ou falhou depois de muitos anos, e o objeto entra num estado incontrolável, atacando tudo o que vê.',
      },
    ],
  }),
  fam({
    id: 'family-ankhrav',
    name: 'Ankhrav',
    originalName: 'Ankhrav',
    trait: 'Ankhrav',
    sourcePage: 20,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Ankhrav',
    intro:
      'Ankhravs são predadores insetoides imensos que cavam. No campo, viram praga: surgem debaixo da terra, cospe ácido e somem de novo sob a areia.',
    sections: [
      {
        id: 'ankhrav-hives',
        title: 'Colmeias',
        body: 'A ficha comum é o caçador solitário. A mãe da colmeia é bem mais perigosa: organiza a ninhada, defende o ninho e transforma um trecho de estrada em campo de caça.',
      },
    ],
  }),
  fam({
    id: 'family-ant',
    name: 'Formiga',
    originalName: 'Ant',
    trait: null,
    sourcePage: 21,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Giant%20Ant',
    intro:
      'Formigas são insetos laboriosos que ajudam a decomposição e a renovação da natureza. As gigantes, e os enxames de formiga-do-exército, viram ameaça quando o formigueiro cresce demais perto de gente.',
    sections: [
      {
        id: 'ant-nests',
        title: 'Ninhos',
        body: 'Operárias carregam comida e inimigos para o ninho. O ferrão injeta veneno que enfraquece; a mandíbula segura a presa enquanto o bando chega.',
      },
    ],
  }),
  fam({
    id: 'family-bat',
    name: 'Morcego',
    originalName: 'Bat',
    trait: null,
    sourcePage: 40,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=369',
    intro:
      'Há morcegos mundo afora. A maioria desses animais noturnos é insetívora e inofensiva; raças mortais de morcego-vampiro e exemplares do tamanho de um cavalo são outra história para aventureiros.',
    sections: [
      {
        id: 'bat-roosts',
        title: 'Abrigos de Morcego',
        body: 'Enxames de morcegos-vampiros se abrigam em colônias onde encontram proteção contra clima, luz e predadores, preferindo cavernas, árvores e gargantas estreitas. Morcegos gigantes preferem viver em número menor, em cavernas profundas, minas abandonadas ou sótãos de prédios esquecidos. Espécies ainda maiores habitam as regiões mais profundas das Terras Sombrias, onde muitas vezes servem de montaria ou, às vezes, são abatidas em ritual e depois animadas como guardiãs mortas-vivas especializadas de cidades e nações subterrâneas sinistras.',
      },
    ],
  }),
  fam({
    id: 'family-boar',
    name: 'Javali',
    originalName: 'Boar',
    trait: null,
    sourcePage: 43,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=372',
    intro:
      'Enquanto porcos domésticos são da fazenda, javalis selvagens são bem mais perigosos. Javalis-de-guerra de mau humor são relativamente comuns; as bestas primevas e desajeitadas conhecidas como daeodons, menos. Javalis vorazes podem devastar o campo em que vivem, o que os torna um estorvo particular para fazendeiros. Reproduzem-se à vontade, e um casal vira família grande depressa.',
    sections: [
      {
        id: 'boar-territory',
        title: 'Território de Javali',
        body: 'Javalis aparecem em quase qualquer ambiente, de florestas a desertos, quente ou frio, inclusive regiões montanhosas de alta altitude. Tendem a preferir florestas, pântanos e prados. Daeodons também ocupam essas regiões, mas em geral preferem recantos remotos, longe da civilização.',
      },
      {
        id: 'meat-and-hide',
        title: 'Carne e Couro',
        body: 'A carcaça de um javali em geral rende carne para 100 refeições ou mais, além de couro e cerdas úteis para Ofício.',
      },
    ],
  }),
  fam({
    id: 'family-bugbear',
    name: 'Bugbear',
    originalName: 'Bugbear',
    trait: 'Bugbear',
    sourcePage: 47,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=374',
    intro:
      'Esses goblinoides furtivos e cruéis se deleitam em espalhar medo e atormentar as vítimas. Bugbears são o monstro no armário e debaixo da cama. Atacam fazendas isoladas e revelam a presença com batidas à noite ou tábuas rangendo, para construir pavor crescente, suspeita e medo.',
    sections: [
      {
        id: 'bugbear-lairs',
        title: 'Covis de Bugbear',
        body: 'Bugbears vivem em gangues pequenas que muitas vezes espreitam juntas, trabalhando em grupo para semear tormento. Guardam o covil em lugares difíceis de achar, bem no fundo da floresta ou das colinas.',
      },
      {
        id: 'bugbear-treasure',
        title: 'Tesouro de Bugbear',
        body: 'Embora não se preocupem muito com tesouro, tendem a guardar troféus macabros. Joias valiosas às vezes ainda estão nesses prêmios horripilantes.',
      },
    ],
  }),
  fam({
    id: 'family-big-cat',
    name: 'Grande felino',
    originalName: 'Cat',
    trait: null,
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=376',
    intro:
      'Poucos predadores do mundo natural rivalizam o felino em espreita e furtividade. Grandes gatos aparecem em quase qualquer ambiente, em geral longe de povoados. Quando a civilização invade o território de caça, o animal muitas vezes é levado a atacar viajantes descuidados.',
    sections: [
      {
        id: 'cat-lairs',
        title: 'Covis de Felino',
        body: 'Leopardos são excepcionalmente adaptáveis, capazes de sobreviver em qualquer pastagem, floresta ou selva, e até na orla de desertos.\n\nLeões vivem em planícies gramadas e savanas, embora também existam espécies adaptadas a ambientes temperados que habitam montanhas. Leões-da-montanha machos não têm a juba dos parentes um pouco maiores das pastagens, mas não são menos perigosos.\n\nTigres são mais comuns em florestas, mas também habitam pastagens e savanas desde que a vegetação seja densa, e os covis muitas vezes ficam em cavernas.\n\nSmilodons vivem em áreas arborizadas e de pastagem.',
      },
      {
        id: 'domesticating-big-cats',
        title: 'Domesticando Grandes Felinos',
        body: 'É prática comum ter um gato de casa para afastar roedores indesejados; ter um grande felino como animal de estimação é outra história. Ainda assim, mercadores em ascensão, príncipes e princesas impetuosos e nobres obcecados por status já tentaram exatamente isso, em geral resultando só em criadagem aterrorizada e estofado arruinado. Muitos ociosos ricos pagam de bom grado pelos serviços de um druida ou ranger inescrupuloso que promete realizar o sonho de um amigo felino superdimensionado, mas os riscos graves dessa empreitada bastam para dissuadir até os treinadores de animais mais gananciosos de sequer tentar.',
      },
    ],
  }),
  fam({
    id: 'family-centipede',
    name: 'Centopeia',
    originalName: 'Centipede',
    trait: null,
    sourcePage: 59,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=380',
    intro:
      'Caçadoras e carniceiras que vivem entre esterco e detrito, centopeias são uma ameaça relativamente comum e muitas vezes odiada que aventureiros enfrentam. Disparam com velocidade surpreendente nas dezenas de pernas do corpo longo e segmentado, e golpeiam com mandíbulas envenenadas para atrasar e atormentar a presa com uma toxina cruel antes de se instalar para se alimentar com calma nojenta.',
    sections: [
      {
        id: 'centipede-species',
        title: 'Espécies de Centopeia',
        body: 'Centopeias tomam quase incontáveis formas em quase todo clima, com traços e habilidades específicos que variam enormemente entre espécies. Florestas emaranhadas, desertos áridos, esgotos fétidos, cavernas profundas e prédios abandonados são covis comuns, de exemplares superdimensionados capazes de derrubar presa significativa sozinhos a tapetes de vermes em frenesi reunidos num enxame perigoso. Centopeias maiores e mais especializadas que as duas apresentadas aqui existem, como a centopeia-chicote gigante esguia ou a imensa centopeia titã.',
      },
    ],
  }),
  fam({
    id: 'family-cockatrice',
    name: 'Cocatriz',
    originalName: 'Cockatrice',
    trait: 'Cockatrice',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Cockatrice',
    intro:
      'Feia e agressiva, a cocatriz vasculha lixões e encostas em busca de presa que o bico petrifica — para depois comer pedaço a pedaço. Parece galo doente com asas de morcego e cauda de serpente; raramente passa de 60 cm de altura e o dobro de comprimento.',
    sections: [
      {
        id: 'cockatrice-origin',
        title: 'Origem suja',
        body: 'Dizem que a primeira nasceu de ovo de galo chocado por um sapo num monturo. O cacarejar distraído avisa a presa esperta; com raiva, o grito é de galo. A bicada libera toxina mágica que calcifica a carne — bicadas repetidas viram estátua.',
      },
    ],
  }),
  fam({
    id: 'family-crocodile',
    name: 'Crocodilo',
    originalName: 'Crocodile',
    trait: null,
    sourcePage: 69,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=384',
    intro:
      'Poderosos e de aparência primeva, crocodilos são predadores naturais perigosos que habitam pântanos, leitos de rio, charcos e outras terras alagadas.',
    sections: [
      {
        id: 'prowling-the-waters',
        title: 'Espreitando as Águas',
        body: 'Crocodilos muitas vezes vivem em áreas quentes e tropicais, em água doce ou salgada. Jacarés aparecem em climas mais variados, mas só em água doce. Deinosuchuses, sobretudo os maiores e mais perigosos, preferem estuários, baías ou outros corpos de água salobra ligados tanto a rio quanto ao mar.',
      },
      {
        id: 'reptilian-resources',
        title: 'Recursos Reptilianos',
        body: 'A pele do crocodilo serve de couro, e a carne é fibrosa e suave, embora mesmo um crocodilo grande em geral não renda mais que 22 kg de carne aproveitável.',
      },
    ],
  }),
  fam({
    id: 'family-imp',
    name: 'Diabrete',
    originalName: 'Imp',
    trait: null,
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Imp',
    intro:
      'Diabos são mestres da corrupção e da conquista: tentam mortais a se juntar à busca do profano e espalham tirania. O diabrete é o infiltrador miúdo dessa máquina — não nasce de alma mortal, e sim dos próprios Planos Exteriores, fora da hierarquia, livre para especializar-se.',
    sections: [
      {
        id: 'imp-bargain',
        title: 'O acordo',
        body: 'O diabrete finge lealdade por anos só para matar o mestre ou condenar a alma. Tem pouco mais de 60 cm, voa, fica invisível e foge quando a conversa vira briga. A tentação oferece sorte — com o preço cobrado na morte.',
      },
    ],
  }),
  fam({
    id: 'family-dog',
    name: 'Cão',
    originalName: 'Dog',
    trait: null,
    sourcePage: 102,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=392',
    intro:
      'Cães são companheiros confiáveis e leais que servem de guardiões, rastreadores e animais de estimação. A capacidade de detectar presa ou predador pelo faro e a predileção por acompanhar humanoides os tornam companheiros ideais para a maioria dos aventureiros. Há centenas de raças no mundo — de cães de colo minúsculos que cobrem o dono de afeto a cães robustos que chegam a quase 1,20 m na cernelha — e aparecem em quase qualquer lugar onde haja gente. Raças maiores até servem de montaria para aventureiros menores, e algumas culturas usam cães como bestas de carga capazes de puxar trenós carregados de suprimentos pela tundra gelada. Seja como for, muitos aventureiros acham valor em ter um cão.',
    sections: [
      {
        id: 'rabies',
        title: 'Raiva',
        body: `Muitas sociedades adoram cães e os valorizam pela lealdade como animais de estimação. Para esses donos, talvez não haja aflição mais horrível que a raiva. Embora muitos animais possam ser acometidos por essa doença debilitante, a ideia de um animal de família leal virar feral e violento a torna ainda mais temida.

**Raiva** (doença) Salvaguarda: Fortitude CD 17. Estágio 1: enjoado 1 (1 dia). Estágio 2: enjoado 2 (1 dia). Estágio 3: confuso (1 dia). Estágio 4: morto.`,
      },
    ],
  }),
  fam({
    id: 'family-ghost',
    name: 'Fantasma',
    originalName: 'Ghost',
    trait: 'Ghost',
    sourcePage: 160,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=418',
    intro:
      'Quando alguns mortais morrem em tragédia ou sem fechamento, a alma pode ficar e assombrar um lugar importante em vida.',
    sections: [
      {
        id: 'creating-a-ghost',
        title: 'Criando um Fantasma',
        body: `Você também pode usar as diretrizes abaixo para transformar criaturas vivas em fantasmas. Aumente o nível em 2 e mude as estatísticas assim:
• Aumente CA, salvaguardas, Percepção, CDs e modificadores de perícia em 2. Aumente o modificador de ataque corpo a corpo mais adequado em 4 para virar mão fantasma (abaixo) e os demais modificadores de ataque em 2.
• Um fantasma tem modificador de Força −5 e de Constituição +0.
• Não ajuste os PV por causa do novo nível.

O fantasma ganha os traços fantasma, incorpóreo, espírito e morto-vivo. Muitos se tornam profanos. A criatura-base perde traços que representavam a vida (humano, humanoide etc.) e qualquer habilidade que dependa de ser viva e corpórea. Ajuste o que conflitar com o tema. Todos os fantasmas ganham as habilidades abaixo.`,
      },
      {
        id: 'ghost-abilities',
        title: 'Habilidades de Fantasma',
        body: `**Visão no Escuro**

**Preso ao Sítio** Um fantasma típico só se afasta uma curta distância de onde morreu ou do lugar que assombra. O limite usual é 36 m. Alguns ficam presos a um cômodo, prédio, item ou criatura especial, em vez de a um local.

**Rejuvenescimento** (divino) Quando é destruído, o fantasma se recompõe em 2d4 dias no local ao qual está preso, totalmente curado. Só pode ser destruído de forma permanente se alguém corrigir o que impede o espírito de descansar.

**Cura do Vazio**

**Imunidades** sangramento, efeitos de morte, doença, paralisado, veneno, precisão, inconsciente. Resistências: todo dano 5 (exceto força, toque fantasma, espírito ou vitalidade; resistência dobrada a não mágico). Essa resistência sobe para 10 no 9º nível e 15 no 16º.

**Deslocamento de voo** igual ao Deslocamento.

**Mão Fantasma** Todo fantasma tem um ataque desarmado de mão fantasma que causa dano de vazio. Em geral tem os traços ágil, finura e mágico. Alguns empunham lembranças fantasmagóricas de armas que tinham em vida, mas o efeito é o mesmo.`,
      },
      {
        id: 'ghost-special-abilities',
        title: 'Habilidades Especiais',
        body: `Escolha uma ou duas das habilidades abaixo, ou até três se o fantasma for de 9º nível ou mais. Devem se relacionar à morte ou à história dele. Você também pode criar habilidades novas ou adaptar as de monstros e classes. Para CDs, use a CD de magia alta do nível do fantasma.

**Olhar Corruptor** O fantasma fita uma criatura que possa ver a até 9 m. O alvo sofre 1d6 de dano de vazio mais 1d6 a cada 2 níveis, com salvaguarda básica de Vontade. Quem falha também fica estupefato 1 por 1 minuto.

**Toque Drenante** (1 ação) Com um toque, tenta drenar a força vital de uma criatura viva. Faz um Golpe de mão fantasma, mas não causa dano se acertar. Em vez disso, o alvo fica drenado 1 por 1 dia e o fantasma recupera PV iguais à metade do próprio nível.

**Gemido Aterrador** (1 ação; auditivo, divino, emoção, medo, mental) O fantasma lamenta o destino, forçando cada criatura viva a até 9 m a tentar uma salvaguarda de Vontade. Falha: amedrontado 2 (amedrontado 3 em falha crítica). Sucesso: imune temporariamente ao gemido aterrador deste fantasma por 1 minuto.

**Habitar Objeto** (1 ação) O fantasma possui um objeto Grande ou menor a até 6 m, tornando-o um objeto animado. O nível desse objeto não pode ser maior que o do fantasma − 2. Se o objeto estiver nas mãos de uma criatura, o portador pode tentar uma salvaguarda de Vontade para impedir a posse. A posse termina quando o objeto é destruído ou o fantasma o deixa. Nesse ponto, o fantasma reaparece no espaço do objeto e não pode Habitar Objeto de novo por 1d4 rodadas.

**Possessão Malevolente** (2 ações) O fantasma tenta possuir uma criatura corpórea adjacente. Tem o mesmo efeito da magia Possessão, exceto que, como não tem corpo físico, não sofre aquela restrição da magia.

**Assalto Telecinético** (2 ações, divino) O fantasma grita de dor enquanto objetos pequenos e detritos voam numa emanação de 9 m. Criaturas na área sofrem 1d6 de dano de concussão + 1d6 a cada 2 níveis, com salvaguarda básica de Reflexos.`,
      },
    ],
  }),
  fam({
    id: 'family-ghoul',
    name: 'Carniçal',
    originalName: 'Ghoul',
    trait: 'Ghoul',
    sourcePage: 162,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=419',
    intro:
      'Poucas criaturas são tão onipresentes em cemitérios solitários e criptas ruídas quanto os mortos-vivos comedores de carne chamados carniçais.',
    sections: [
      {
        id: 'ghoulish-society',
        title: 'Sociedade Carniçal',
        body: 'Carniçais são bem inteligentes e, mais que quase qualquer outro morto-vivo, tendem a formar sociedades e culturas (ainda que vis e repugnantes, centradas em comer carne e outros atos de depravação) em tocas emaranhadas sob ossários, ou até cidades inteiras escondidas nas profundezas das Terras Sombrias.',
      },
      {
        id: 'creating-ghouls',
        title: 'Criando Carniçais',
        body: `Os monstros desta seção são construídos do zero. O ideal, se houver tempo, é criar carniçais sob medida, usando as habilidades especiais listadas aqui e montando o resto das estatísticas para o que você quiser. Também dá para transformar uma criatura viva num carniçal com os passos abaixo. Primeiro, aumente o nível em 1 e mude as estatísticas assim:
• Aumente CA, bônus de ataque, CDs, salvaguardas, Percepção e modificadores de perícia em 1.
• Aumente o dano dos Golpes e de outras ofensivas em 1. Se a criatura usa uma habilidade com limite de vezes (como sopro de dragão), aumente o dano dessa habilidade em 2.

O carniçal ganha os traços morto-vivo e carniçal, e em geral se torna profano. Se a criatura-base tinha habilidades de ser vivo, perde-as. Também perde traços da vida (humano, humanoide etc.). Ajuste o que conflitar com o tema. Todos os carniçais ganham as habilidades abaixo. A CD de todas as habilidades usa a CD de magia alta do nível do carniçal.`,
      },
      {
        id: 'ghoul-abilities',
        title: 'Habilidades de Carniçal',
        body: `**Visão no Escuro.** Cura do Vazio. Imunidades: sangramento, efeitos de morte, doença, paralisado, veneno, inconsciente.

**Fedor** (aura, olfativo) 3 m. Use a CD de magia moderada para o nível do carniçal.

**Escavar** Ganha Deslocamento de escavar 1,5 m.

**Garras** Se a criatura tinha mãos, ganha um Golpe de garra (ataque desarmado ágil que causa dano cortante mais Agarrar). Se já tinha ataques ágeis, o dano das garras deve ser mais ou menos o desses ataques. Se só tinha ataques não ágeis, as garras devem causar cerca de três quartos desse dano.

**Mandíbulas** Se a criatura tinha boca, ganha um Golpe de mandíbulas (ataque desarmado que causa dano cortante). O dano deve ser o dos ataques não ágeis da criatura.

**Consumir Carne** (1 ação, manipular) Requisitos: o carniçal está adjacente ao cadáver de uma criatura que morreu na última hora. Efeito: devora um pedaço do cadáver e recupera 1d6 PV mais 1d6 a cada 2 níveis. Só pode recuperar PV de um mesmo cadáver uma vez.

**Sussurros de Carniçal** (1 ação; auditivo, linguístico, oculto) Requisitos: uma criatura agarrada, paralisada, imobilizada ou inconsciente está no alcance. Efeito: o carniçal sussurra pensamentos sombrios e desejos vis nos ouvidos. A criatura deve se salvar contra a maldição desejos proibidos.

**Desejos Proibidos** (maldição) A criatura ainda pode comer e beber enquanto estiver enjoada por esta maldição. Salvaguarda: Vontade, CD de magia alta do nível. Estágio 1: portador sem efeito adverso (1 dia). Estágio 2: 2d6 de dano de vazio e enjoado 1 até consumir carne crua (1 dia). Estágio 3: como o 2. Estágio 4: como o 2, a menos que tenha comido carne crua nas últimas 24 horas — então sofre 4d6 de dano de vazio e fica enjoado 2 até consumir carne crua. Estágio 5: se comeu carne crua nas últimas 24 horas, morre e se ergue como carniçal; se não, volta ao estágio 4.

**Saber da Cova** (oculto) Frequência: 1 vez por hora. Efeito: o carniçal recorre ao conhecimento de uma criatura que consumiu nos últimos 7 dias. Tenta um teste de perícia na qual a criatura consumida era treinada (se não estiver claro, o Mestre decide). Trata-se como treinado e usa o modificador de perícia alto para o nível. Leva o mesmo número de ações ou tempo do teste usual.

Em vez disso, pode aprender automaticamente algo específico conhecido por uma criatura consumida nos últimos 7 dias, como o local de um tesouro escondido ou o nome de um ente querido. Só pode fazer isso uma vez por criatura, não importa quanto da carne tenha comido.

**Salto Veloz** (1 ação, movimento) O carniçal salta até metade do Deslocamento. Esse movimento não dispara reações.`,
      },
    ],
  }),
  fam({
    id: 'family-goblin-dog',
    name: 'Cão goblin',
    originalName: 'Goblin Dog',
    trait: null,
    sourcePage: 174,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=422',
    intro:
      'Não é cão de verdade: uma fera rasteira, fedida, que goblins tratam como montaria e companheira de saque. O resto do mundo acha o jeito goblin difícil de entender — odeiam cães comuns, mas dividem o covil com estes.',
    sections: [
      {
        id: 'goblin-dog-pox',
        title: 'Varíola goblin',
        body: 'A caspa irritante espalha varíola goblin em quem toca o animal. Goblins e os próprios cães goblin são imunes; quase ninguém mais.',
      },
    ],
  }),
  fam({
    id: 'family-gremlin',
    name: 'Gremlin',
    originalName: 'Gremlin',
    trait: 'Gremlin',
    sourcePage: 180,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=424',
    intro:
      'Gremlins são fey cruéis, trapaceiros e sabotadores, plenamente aclimatados à vida no Universo, onde encontram nichos distintos para a destrutividade inventiva. Quase todos se deleitam em estragar coisas, seja algo físico como um dispositivo ou veículo, seja algo intangível como uma aliança ou um relacionamento. A maior alegria de um gremlin é ver uma criação complexa desabar, de preferência depois do empurrão mais leve e certeiro. Gremlins tendem a rebaixar, intimidar ou até massacrar os parentes menores, sobretudo mitflits, a quem gremlins mais fortes chamam com desprezo de “mites”.',
    sections: [
      {
        id: 'gremlin-treasure',
        title: '“Tesouro” de Gremlin',
        body: 'Todos os gremlins são acumuladores, e os ninhos ficam abarrotados de objetos valiosos e sem valor. Vasculhar um ninho pode revelar tesouros inesperados, como joias ou itens mágicos menores, mas também é preciso cuidado para não se cortar em lascas de metal enferrujado, pegar itens amaldiçoados ou perturbar um ninho escondido de vermes venenosos.',
      },
      {
        id: 'gremlin-bells',
        title: 'Sinos de Gremlin',
        body: 'Sociedades supersticiosas às vezes penduram sinos minúsculos de metais semipreciosos na crença de que dissuadem gremlins de destruir um objeto afixado ou infestar uma casa. Estranhamente, a maioria dos gremlins também acredita nessa superstição, e mesmo quando o sino não foi encantado, um gremlin em geral não arrisca mexer em objetos protegidos desse jeito.',
      },
    ],
  }),
  fam({
    id: 'family-griffon',
    name: 'Grifo',
    originalName: 'Griffon',
    trait: 'Griffon',
    sourcePage: 182,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Griffon',
    intro:
      'Grifos são feras régias, símbolo de liberdade e força em muitas culturas. Quarto traseiro de leão; cabeça, asas e patas dianteiras de ave de rapina — em geral águia, às vezes gavião, falcão, águia-pescadora ou abutre. Raros têm quarto de leopardo ou tigre, conforme o ambiente.',
    sections: [
      {
        id: 'griffon-mounts',
        title: 'Montarias',
        body: 'Treinadores há muito criam grifos para exércitos e poderosos: fortes, bravos, leais. Estão entre os animais mais inteligentes; muita gente acha que o grifo escolhe o cavaleiro tanto quanto o contrário. Treinar um para voo com piloto é longo e caro — estábulo de grifos é motivo de inveja.',
      },
    ],
  }),
  fam({
    id: 'family-hobgoblin',
    name: 'Hobgoblin',
    originalName: 'Hobgoblin',
    trait: 'Hobgoblin',
    sourcePage: 198,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=430',
    intro:
      'Aos olhos de fora, hobgoblins podem parecer os goblinoides mais civilizados, mas a civilização deles não é de bondade e igualdade — em vez disso, deleitam-se em tudo que é militarista, tirânico, cruel e destrutivo. São singularmente devotos da guerra, e a cultura inteira se constrói em fomentar e manter conflito ao mesmo tempo em que provam superioridade na batalha. São altamente organizados e trabalham com eficiência e eficácia em grupo, seja uma pequena partida de saque, uma banda de guerra itinerante ou um exército plenamente regimentado. Governantes hobgoblin precisam de pouca provocação para declarar guerra, e na maioria das vezes essas guerras visam recursos ou território. Fisicamente, hobgoblins têm mais ou menos a altura de humanos e pele cinzenta.\n\nA sociedade hobgoblin se organiza em linhas militares, e todo hobgoblin é, na prática, membro do exército. Cada um na comunidade tem posto na hierarquia, e os indivíduos são naturalmente ambiciosos e obcecados por promoção. Esperam-se deles, o tempo todo, provas de que são destemidos, impiedosos, astutos e fortes. Demonstrar essas aptidões à liderança militar é a melhor esperança de um hobgoblin de subir de posto, mas o fracasso leva só à exploração cruel nas mãos dos superiores.\n\nEmbora brutal, a sociedade hobgoblin é uma meritocracia de verdade, e todos — independentemente de idade, gênero ou nascimento — exercem autoridade e ganham respeito dos pares com base na habilidade em batalha. Mesmo quem serve em papéis não combatentes — ferreiros, construtores, cozinheiros, mensageiros, intendentes e afins — sabe que cumpre trabalhos vitais que sustentam o exército maior, embora raramente subam acima do posto de soldado comum. Todos contribuem para o todo, garantindo que a sociedade seja a mais forte e eficiente possível, e quem falha é eliminado do exército e, portanto, da sociedade hobgoblin, como peso morto. Hobgoblins em geral não comerciam com outras ancestralidades, nem mesmo com outras tribos hobgoblin, preferindo tomar o que querem pela força.',
    sections: [
      {
        id: 'growing-pains',
        title: 'Dores do Crescimento',
        body: 'Como nação nascente, Oprak teve de achar jeitos de vestir e alimentar os cidadãos neste tempo de paz relativa. Embora hobgoblins não sejam estranhos a se esforçar por uma guerra, a maioria dos ex-soldados está se ajustando aos poucos a ofícios civis, como agricultura e mineração. Cometeram alguns erros na transição, o pior dos quais foi acordar acidentalmente um monstro adormecido das Terras Sombrias sob as Montanhas Mindspin.',
      },
      {
        id: 'hobgoblins-and-magic',
        title: 'Hobgoblins e Magia',
        body: 'Hobgoblins em geral desconfiam de magia, sobretudo a arcana, a que chamam com desprezo de “magia élfica”. Na ausência de magia, abraçam de coração a alquimia, combinando-a com o jeito natural para engenharia a efeito destrutivo. Aceitam magia divina com cautela, por um respeito relutante ao poder da magia de cura em tempos de guerra.',
      },
      {
        id: 'living-with-hobgoblins',
        title: 'Vivendo com Hobgoblins',
        body: 'Com poucas exceções, a sociedade hobgoblin não tem lugar para quem não compartilha o sangue. Ocasionalmente usam bugbears como assassinos ou espiões, e a maioria das tribos inclui um grupo pequeno de goblins que tira uma existência mísera nas margens da sociedade hobgoblin.',
      },
    ],
  }),
  fam({
    id: 'family-homunculus',
    name: 'Homúnculo',
    originalName: 'Homunculus',
    trait: 'Homunculus',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Homunculus',
    intro:
      'Construto minúsculo criado para espionar, explorar, levar recado ou ajudar. Quem começa a estudar construtos costuma fazer um homúnculo primeiro: o processo é simples e barato porque usa o próprio sangue do criador. Isso liga mestre e servo — intelecto, valores e um pouco da personalidade passam.',
    sections: [
      {
        id: 'homunculus-link',
        title: 'Sem o mestre',
        body: 'Na maioria dos casos, o homúnculo não sobrevive muito à morte do criador: perde o foco e se autodestrói. Raro é o que atravessa o trauma com a mente intacta e se vê como herdeiro do morto.',
      },
    ],
  }),
  fam({
    id: 'family-kobold',
    name: 'Kobold',
    originalName: 'Kobold',
    trait: 'Kobold',
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=435',
    intro:
      'Kobolds são humanoides reptilianos pequenos. Espreitam no escuro, em geral em túneis e minas sob a terra, em tocas próprias ou em complexos descobertos e colonizados depois que os construtores originais partiram. Embora sejam bem mais pragmáticos que corajosos, usam cada palmo de astúcia para equilibrar o jogo contra criaturas mais fortes. Atacam da escuridão e à distância, e artífices e engenheiros kobold dominam a arte de armadilhas simples mas eficazes, com as quais protegem o covil. Trabalham juntos por necessidade e costumam montar emboscadas ou golpes de bater-e-correr que causam o máximo de dano sem se expor.\n\nKobolds são diligentes e trabalhadores. Alguns vivem em coletivos que mantêm relações neutras com os vizinhos, mas é fácil convencê-los a servir poderes malevolentes ou líderes megalomaníacos. Parte disso é pragmatismo nato: preferem conceder a servidão a arriscar a morte; parte é reverência pelo poder que em geral lhes falta. Notavelmente, ovos kobold deixados perto de criaturas ou lugares mágicos tendem a absorver traços semelhantes. As mudanças físicas marcam a aparência de cada tribo, e alguns poucos nascem com poder mágico que reflete o patrono da tribo.',
    sections: [
      {
        id: 'kobold-neighbors',
        title: 'Vizinhos Kobold',
        body: 'Alguns kobolds vivem ao lado de outros humanoides, em vilas pequenas e cidades grandes. Muitos povoados precisaram criar leis claras para dissuadir os vizinhos kobold de obras improvisadas (sobretudo no meio da noite). Um kobold que transforma o jeito de construir em ofício vendável pode se tornar dono de negócio próspero e pilar da comunidade.',
      },
      {
        id: 'kobold-magically-morphic',
        title: 'Morfologia Mágica',
        body: 'Ovos kobold podem absorver traços de criaturas mais poderosas, e pais astutos tiram proveito disso para dar aos filhos a melhor chance. Dragões são o alvo preferido — hábito que os dragões parecem tolerar —, mas muitos kobolds encontram outros patronos por escolha ou por força. Fiends, elementais ou fey funcionam como alternativas. Alguns usam artefatos antigos, embora isso atraia ladrões. Kobolds das Terras Sombrias em geral buscam dragões subterrâneos; os que absorvem só a energia ambiente emergem com formas distorcidas e poderes psíquicos aterradores.',
      },
      {
        id: 'kobold-societal-dabblers',
        title: 'Vida Urbana',
        body: 'Várias tribos foram atraídas para cidades grandes, por colégios de magia ou pela simples conveniência urbana. Costumam manter a preferência por moradias subterrâneas, espreitando em esgotos ou ruínas. Em Avistão isso as coloca numa zona cinzenta: kobolds da cidade são em geral aceitos, mas têm poucos direitos no papel. Os de Absalom começaram a questionar isso, e outros podem seguir o exemplo.',
      },
    ],
  }),
  fam({
    id: 'family-leshy',
    name: 'Leshy',
    originalName: 'Leshy',
    trait: 'Leshy',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=437',
    intro:
      'Leshys são plantas inteligentes que guardam trechos de selva primeva ou poder telúrico. No começo, fey poderosos os criavam; hoje um praticante hábil de magia primal — em geral um druida — une um espírito da natureza a um corpo cultivado com cuidado da vegetação local. Os ritos e materiais mudam conforme o tipo. Costumam ganhar vida numa área de grande significado natural: bosque de arbóreo, círculo druídico, anel de fadas ou uma grande maravilha da terra.',
    sections: [
      {
        id: 'appeasing-leshy-guardians',
        title: 'Agradando Guardiões Leshy',
        body: 'Quando um viajante cauteloso encontra um círculo de pedras druídico, uma clareira pacífica ou uma árvore alta e antiga que parece desprotegida, deve ter cuidado: pode haver um ou dois leshys escondidos logo fora da vista. Diferente de outras entidades, esses guardiões não pedem oferendas de comida ou bebida. O melhor jeito de mantê-los satisfeitos é simplesmente deixar a área no estado natural. Quem precisa passar ou acampar perto é avisado a não acender fogueiras nem deixar nada para trás.',
      },
      {
        id: 'dead-leshies',
        title: 'Leshys Mortos',
        body: 'Quando um leshy morre, o corpo explode numa onda de vegetação e o espírito volta ao mundo natural. Espíritos chamados a corpos novos depois da morte em geral guardam só lembranças vagas do passado, mas retêm muitos dos valores e hábitos da vida anterior.',
      },
      {
        id: 'friends-in-the-forest',
        title: 'Amigos na Floresta',
        body: 'Por causa da fragilidade relativa, leshys das folhas costumam atuar como intermediários e convocar guardiões florestais mais poderosos quando o domínio é ameaçado. Ninfas, sprites e outros fey bondosos podem responder ao chamado, assim como arbóreos e outras plantas.',
      },
      {
        id: 'phytoremediation',
        title: 'Fitorremediação',
        body: 'Leshys e outras plantas podem limpar o ambiente de poluição — pesticidas, óleo e até radiação. Curam a terra simplesmente ao fundar um povoado e viver ali com o tempo. Leshys mais ambiciosos combatem a corrupção do jeito que melhor lhes cabe: um pode unir-se aos Recuperadores Sarkorianos para libertar a terra de influências demoníacas; outro pode venerar Sarenrae e lutar contra a legião de mortos-vivos do Tirano Sussurrante.',
      },
      {
        id: 'plant-allies',
        title: 'Aliados Vegetais',
        body: 'Alguns leshys se alinham (ou até são chamados) a outras plantas sencientes, muitas das quais também tomam formas vagas de humanoide. Embora arbóreos poderosos tendam a não se associar a quem não vive tanto quanto eles, compartilham o desejo de proteger as florestas. Dríades sentem o mesmo, ligadas a uma árvore específica que pode precisar de guarda. Leshys mais maliciosos ou cruéis, porém, podem achar parentesco em sprigjacks e twigjacks, que querem afastar invasores do mundo natural.',
      },
      {
        id: 'terrors-of-arenway',
        title: 'Terrores de Arenway',
        body: 'A Ilha de Arenway é infame pelos leshys territoriais. Embora eles e os membros da Loge do Bosque Selvagem se deixem em paz, invasores podem acabar presos em redes de cipós vivos e atirados no rio Sellen — se não forem mortos e compostados sob as árvores titânicas da ilha. Dizem que esses leshys antecedem a ocupação humana, talvez surgidos da mesma magia que assombra a ilha.',
      },
    ],
  }),
  fam({
    id: 'family-lizardfolk',
    name: 'Povo-lagarto',
    originalName: 'Lizardfolk',
    trait: 'Lizardfolk',
    sourcePage: 226,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=441',
    intro:
      'Predadores capazes e adaptáveis, os reptilianos conhecidos como povo-lagarto herdam civilizações verdadeiramente ancestrais. A tradição oral cobre milhares de anos, e reverenciam os ossos dos antepassados. Fósseis de iruxi entram nas paredes das cidades de pedra e vidro, para que esses predecessores vigiem os parentes. Também têm tradições longas de culto e astrologia, com os olhos no passado, no futuro e nas estrelas sempre que tomam uma decisão grande. A história longa os ensinou a ter paciência em tudo — embora isso os tenha feito perder terreno para povos mais apressados nos tempos modernos.\n\nChamam-se “iruxi”, mas aceitam de bom grado o apelido comum entre outros povos. A maioria dos povoados é inteiramente comunal, com filhotes criados por quem tiver tempo e jeito. Iruxis habitam e prosperam em todos os biomas tropicais e temperados, mas estão mais em casa em pântanos, costas e terras de rio. São nadadores talentosos, e muitas cidades principais ficam parcialmente submersas — o que faz muita gente passar batido. Peixe e plantas aquáticas formam grande parte da dieta preferida.',
    sections: [
      {
        id: 'lizardfolk-relations',
        title: 'Relações do Povo-lagarto',
        body: 'O orgulho típico do iruxi nas tradições, a suspeita dos outros e a necessidade de proteger os parentes podem fazê-los parecer distantes ou até agressivos no primeiro encontro. Também não emitem emoção de um jeito que muitos povos entendam, o que gera mal-entendidos. Ainda assim, a maioria está ansiosa para aprender com visitantes, trocar histórias e equipamento e forjar alianças.',
      },
      {
        id: 'lizardfolk-society',
        title: 'Sociedade Iruxi',
        body: 'Como regra geral, iruxis são bem religiosos. Quem venera deidades em geral olha para Gozreh, mas alguns acham os ensinamentos de Desna convincentes. A maioria, porém, segue tradições druídicas, culto aos ancestrais e filosofias astrológicas em particular.',
      },
      {
        id: 'other-divinations',
        title: 'Outras Adivinhações',
        body: 'Embora observar as estrelas seja o meio principal de adivinhação, iruxis não dependem só delas. Clãs do deserto têm rabdomantes potentes que buscam água com fúrculas de aves de rapina. Clãs subterrâneos leem entranhas e depois comem o animal sacrificial cru — prática que alimentou os contos exagerados de aventureiros sobre cavernas cheias de povo-lagarto canibal. Iruxis urbanos compensam o céu poluído da cidade rolando dados de osso marcados com pips de estrela e as fases da lua.',
      },
    ],
  }),
  fam({
    id: 'family-minotaur',
    name: 'Minotauro',
    originalName: 'Minotaur',
    trait: null,
    sourcePage: 232,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=444',
    intro:
      'Um minotauro é um humanoide grande com traços bovinos: chifres, cascos e uma camada de pelo que cobre o corpo inteiro. A cabeça também lembra a de um touro ou vaca, embora com olhos que transbordam curiosidade ou fúria, conforme o temperamento. Embora muitas vezes tomados por brutos agressivos por causa do tamanho e da reputação, muitos minotauros são artesãos hábeis que passam boa parte da vida aperfeiçoando o ofício. Comunidades minotauro tendem a ser fechadas e ficam no coração de um labirinto astuto ou num emaranhado de cavernas subterrâneas.\n\nO mito que muitos minotauros gostam de contar sobre a origem envolve um pedreiro da antiga Iblydos. Depois de insultar acidentalmente um herói-deus, foi amaldiçoado a se tornar o primeiro minotauro. Recuou então para uma série de cavernas sob um templo que havia construído, mas continuou o trabalho, esculpindo estátuas de pedra para quem ousasse enfrentar as passagens subterrâneas.\n\nÀs vezes, um minotauro solitário é compelido, exilado ou escolhe viver sozinho num labirinto, numa toca ou em ruínas antigas. Esse isolamento o leva a se tornar um atormentador monstruoso que se deleita em caçar quem tropeça no covil. Fecha o cerco aos poucos, deleitado com o terror da presa perdida em corredores que o minotauro conhece de cor. Só então investe para matar, cortando inimigos com golpes poderosos ou empalando-os nos chifres afiados. Infelizmente, o mundo tende a julgar todos os minotauros pelas histórias desses caçadores solitários e cruéis.',
    sections: [],
  }),
  fam({
    id: 'family-ooze',
    name: 'Gosma',
    originalName: 'Ooze',
    trait: 'Ooze',
    sourcePage: 256,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=453',
    intro:
      'Limos, mofos e outras gosmas aparecem em masmorras úmidas e florestas sombrias. Embora não sejam necessariamente malignas, algumas crescem a tamanhos enormes e têm apetite insaciável.',
    sections: [
      {
        id: 'oozing-acid',
        title: 'Ácido de Gosma',
        body: 'Muitas gosmas têm ataques ácidos que degradam depressa carne, madeira e até materiais mais fortes. Alguns acreditam que gosmas são o resultado de experimentação alquímica ou mágica que saiu do controle; outros postulam que simplesmente emergiram dos processos naturais da evolução.',
      },
      {
        id: 'other-oozes',
        title: 'Outras Gosmas',
        body: 'Muitas variedades desses predadores quase irracionais existem mundo afora. Algumas são meras variantes, com pudins, geleias e gosmas de cores diferentes que pouco as diferenciam das apresentadas aqui além do habitat e da dieta.\n\nOutras gosmas são mais especializadas no papel, ou perigosamente inteligentes. A variedade mais lendária dessas gosmas mortais e poderosas é a praga, felizmente rara: uma criatura composta de protoplasma e olhos que amaldiçoa regiões inteiras com a presença.',
      },
    ],
  }),
  fam({
    id: 'family-orc',
    name: 'Orc',
    originalName: 'Orc',
    trait: 'Orc',
    sourcePage: 258,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=454',
    intro:
      'Muitos orcs são forjados no fogo da violência e do conflito, muitas vezes desde o nascimento. Como a vida costuma ser cortada de forma brutal e cedo, deleitam-se em testar a força contra rivais dignos: desafiar um membro de posto mais alto da comunidade pelo domínio, domar uma fera poderosa ou abater um monstro temível.\n\nAltos e poderosos, de braços longos e pernas musculosas, muitos passam de 2,1 m. Os membros pesados e a postura larga, quase arqueada, somados à tendência de curvar-se para frente, criam um contraste: um orc pode sobressair aos outros humanoides e ao mesmo tempo fitar-lhes os olhos. Essas feições, mais a facilidade de cicatrizar, os tornam intimidadores.\n\nOs meio-orcs dromaars, em geral nascidos de uniões entre orcs e humanos, costumam ser testados ainda mais duramente que os parentes de sangue pleno, mas quem resiste pode subir a posições de autoridade. “Orc tem o que orc segura” é um ditado que vale tanto para o destino e o posto de cada um quanto, provavelmente, para a origem de chamar as comunidades de “holdas”.',
    sections: [
      {
        id: 'beyond-the-holds',
        title: 'Além das Holdas',
        body: 'Orcs são instrumentos dinâmicos de mudança. Nas viagens, aprendem sobre outras comunidades. Podem ensinar a história orc para construir pontes e trazer ideias novas às holdas, inaugurando uma era de inclusão e troca cultural. Orcs viajantes costumam ser curiosos até o excesso, dispostos a tentar qualquer coisa pelo menos uma vez. Fora da holda, vivem da generosidade alheia e não hesitam em retribuir a bondade.',
      },
      {
        id: 'dromaars',
        title: 'Dromaars',
        body: 'Filhos de humanos e orcs, a fisiologia dos dromaars varia de um humano com presas a um orc de cabelo loiro e cacheado. O pai ou a mãe orc em geral ensina a empunhar arma e falar Orcish, mas não se espera que virem soldados nem que vivam do combate. Dromaars são livres para explorar interesses e viver como quiserem, dentro ou fora da holda. Orcs aceitam os parentes dromaar e os recebem nas comunidades.',
      },
      {
        id: 'gods-of-war',
        title: 'Deuses da Guerra',
        body: 'Embora existam deidades orc, o culto é surpreendentemente incomum. Orcs acreditam que se uma criatura tem rosto e nome, pode ser morta — então as próprias deidades são alvos, não objetos de reverência.',
      },
      {
        id: 'megafauna-mounts',
        title: 'Montarias de Megafauna',
        body: 'Orcs são conhecidos por montar feras estranhas e temíveis, sobretudo megafauna como lobos hediondos e smilodons. Dada a oportunidade, também aliciam drakes, mantícoras e qualquer coisa grande e assustadora o bastante.',
      },
      {
        id: 'orc-faith',
        title: 'Fé Orc',
        body: 'Com tantas rupturas súbitas no panteão orc, os fiéis vivem um tempo confuso de mudança. Adoradores fervorosos de Lanishra, Sezelrian e Zagresh não gostam particularmente das novas deidades que usurparam os deuses antigos. Alguns zelotes se agarram às fés velhas, e muitos ainda guardam um fragmento do poder da deidade caída, o que só aumenta a confusão.',
      },
      {
        id: 'respect-your-elders',
        title: 'Respeite os Anciãos',
        body: 'Guerreiros anciãos (como o mestre veterano orc) em geral estão na meia-idade ou além, passados do auge. Raramente entram em batalha: são reverenciados como a maior fonte de saber de combate. Passam os dias nas holdas, treinando jovens guerreiros e aventureiros que trazem mercadorias valiosas.',
      },
      {
        id: 'salvage',
        title: 'Sucata',
        body: 'Orcs são especialistas em reaproveitar materiais. Belkzen não tem solo rico nem depósitos abundantes de metais e minerais valiosos. Artesãos orc dependem de sucata de batalhas ou de comércio com forasteiros. É comum uma ferramenta básica, como faca ou panela, ser muito antiga e ainda assim estar em perfeito estado. Mesmo quando quebra, encontram jeito de reusar o máximo possível.',
      },
    ],
  }),
  fam({
    id: 'family-rat',
    name: 'Rato',
    originalName: 'Rat',
    trait: null,
    sourcePage: 288,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Giant%20Rat',
    intro:
      'Ratos são praga onipresente: esgoto e rua de quase todo povoado. O rato comum assusta quem passa; o gigante e o enxame são perigo de verdade.',
    sections: [
      {
        id: 'rat-disease',
        title: 'Doença',
        body: 'Têm fama de agressivos e de espalhar peste. São imunes aos piores efeitos da própria peste pútrida, mas a doença os deixa imprevisíveis. Algumas populações carregam males ainda piores.',
      },
    ],
  }),
  fam({
    id: 'family-scorpion',
    name: 'Escorpião',
    originalName: 'Scorpion',
    trait: null,
    sourcePage: 298,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=466',
    intro:
      'Flagelo quitinoso de desertos, florestas, savanas e ermos, escorpiões são aracnídeos mortais com pinças poderosas e ferrão doloroso. Aparecem em quase qualquer clima, onde caçam a presa com uma mistura de furtividade paciente e força bruta. A maioria vive em tocas subterrâneas, como caçadores solitários ou parte de uma colônia maior. São tão temidos e perigosos que, em muitas culturas, os tratam como deidades ou símbolos dualistas tanto da morte quanto da proteção contra essa morte.',
    sections: [
      {
        id: 'scorpion-venom',
        title: 'Veneno de Escorpião',
        body: 'Embora escorpiões muitas vezes sejam símbolos de morte ou mal, o veneno pode ser extraído e usado numa variedade ampla de aplicações médicas. Um personagem pode ordenhar um escorpião gigante incapacitado para extrair veneno cru, que serve de matéria-prima para fabricar veneno de escorpião gigante ou antipeste menor. Para determinar o valor dos ingredientes ganhos a cada dia e a CD do teste adequado de Medicina ou Conhecimento, use a entrada de tarefa de 3º nível na tabela Renda Obtida.',
      },
    ],
  }),
  fam({
    id: 'family-shadow',
    name: 'Sombra',
    originalName: 'Shadow',
    trait: 'Shadow',
    sourcePage: 306,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=469',
    intro:
      'Os misteriosos mortos-vivos conhecidos como sombras espreitam em lugares escuros e se alimentam de quem se afasta demais da luz.',
    sections: [
      {
        id: 'shadowy-dwellings',
        title: 'Moradas Sombrias',
        body: 'Sombras podem espreitar em qualquer área pouco iluminada — um canto numa ruína desmoronando, um cômodo à luz de velas tremeluzentes ou uma floresta sombreada ao crepúsculo. Viajam de e para o Submundo, embora não esteja claro se o fazem por magia própria ou alinhando-se a um ser mais poderoso capaz desse deslocamento planar.',
      },
    ],
  }),
  fam({
    id: 'family-skeleton',
    name: 'Esqueleto',
    originalName: 'Skeleton',
    trait: 'Skeleton',
    sourcePage: 312,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=472',
    intro:
      'Esqueletos animados estão entre os mortos-vivos mais comuns.',
    sections: [
      {
        id: 'skeleton-abilities',
        title: 'Habilidades de Esqueleto',
        body: `A maioria dos esqueletos tem uma destas habilidades. Se der mais, considere aumentar o nível e ajustar as estatísticas.

**Ossos Aquáticos** O esqueleto tem ossos de criaturas aquáticas, o que lhe permite nadar com cauda simples, pás ou apêndice similar. Ganha Deslocamento de natação de 6 m, o traço aquático e a habilidade Emboscada Aquática.

**Labareda** O esqueleto está envolto em fogo, que não consome ossos nem equipamento. Ganha imunidade a fogo e fraqueza 5 a frio, perde a resistência a frio, e seus Golpes causam dano persistente de fogo adicional igual à metade do nível (mínimo 1).

**Sangrento** Um revestimento de sangue dá cura acelerada igual ao nível.

**Míssil Ósseo** (1 ação) O esqueleto arranca uma costela para usar como flecha ou azagaia. Perde PV iguais ao nível (mínimo 1) e faz um Golpe à distância. Usa o bônus de ataque do Golpe com maior bônus e causa dano perfurante igual ao dano daquele Golpe mais o nível (mínimo 1).

**Pó de Osso** Quando o esqueleto sofre dano físico de um acerto crítico, um osso vira pó fino. Todas as criaturas numa emanação de 1,5 m que respiram sofrem 1d6 de dano persistente de veneno (mais 1d6 a cada 6 níveis do esqueleto).

**Tempestade de Ossos** (2 ações) Frequência: 1 vez por dia. O esqueleto vira um ciclone de ossos, ocupando o mesmo espaço, mas com o dobro da altura. Depois Avança até o dobro do Deslocamento. Pode atravessar espaços ocupados, e esse movimento não dispara reações. Criaturas por cujo espaço passa sofrem 1d6 de dano cortante a cada 2 níveis, com salvaguarda básica de Reflexos contra a CD alta para o nível. Um esqueleto de nível 1 ou menor só se move; não causa dano. Cada criatura tenta a salvaguarda só uma vez, mesmo se o ciclone atravessar o espaço várias vezes. Ao fim do movimento, o esqueleto se recompõe.

**Desabar** (reação) Gatilho: o esqueleto sofre um acerto crítico. Efeito: desaba num monte de ossos e o ataque causa só dano normal. Pode reerguer-se como ação, mas até então fica imobilizado e desprevenido.

**Ossos Desfazendo** Os ossos se desfazem em nuvens de poeira. O esqueleto tem Deslocamento de voo 6 m, mas precisa terminar o turno a no máximo 1,5 m do chão, senão cai e sofre dano normalmente. Além disso, pode passar por qualquer espaço em que caiba o crânio.

**Morte Explosiva** Quando é destruído, os ossos estilhaçam e explodem. Criaturas adjacentes sofrem 1d6 de dano cortante a cada 2 níveis (mínimo 1d6), com salvaguarda básica de Reflexos contra a CD de magia moderada para o nível.

**Congelado** Os ossos estão cobertos de uma fina camada de gelo. Ganha imunidade a frio e fraqueza 5 a fogo, e perde a resistência a fogo. Está cercado por uma aura de frio que causa dano de frio igual à metade do nível a todas as criaturas adjacentes no início do turno dele (salvaguarda básica de Reflexos com CD padrão para o nível).

**Erupção da Cova** (1 ação) Requisitos: o esqueleto está não detectado e enterrado em terra, cascalho ou material solto. Efeito: irrompe do chão, Levanta-se e faz um Golpe corpo a corpo. O alvo está desprevenido contra esse Golpe. Se acertar, o alvo fica amedrontado 1 (ou amedrontado 2 em acerto crítico).

**Laqueado** Na criação, recebeu várias camadas de laca alquímica, que dão tom dourado e proteção extra. Ganha resistência 5 a ácido e +2 de status em salvaguardas contra efeitos que envelhecem ou erodem o alvo.

**Ágil** É particularmente rápido. O Deslocamento terrestre sobe 3 m e ganha Deslocamento de escalada 6 m. Também ganha a reação Esquiva Ágil.

**Podre** (aura, olfativo) Os ossos estão pretos e podres, depois de anos em água poluída ou outra imundície. Perde a resistência a dano perfurante e cortante e emite um fedor horrendo numa aura de 3 m. Uma criatura que entra ou começa o turno na aura deve obter sucesso numa salvaguarda de Fortitude contra a CD padrão do nível ou fica enjoada 1 (e atrasada 1 enquanto estiver enjoada, em falha crítica). Enquanto estiver na aura, sofre −2 de circunstância em salvaguardas contra doença e para se recuperar de enjoado. Quem obtém sucesso fica imune temporariamente por 1 minuto. O fedor permanece 1 hora depois que o esqueleto podre é destruído.

**Crânio Gritante** (auditivo, emoção, medo, mental) O esqueleto tira o crânio e o arremessa, fazendo um ataque de mandíbulas com alcance 6 m. Depois tenta Desmoralizar cada inimigo a até 3 m do alvo. A cabeça quica, rola ou até voa de volta no início do próximo turno. Até então, o esqueleto está cego.

**Esqueleto de Rosas** Espinheiros cresceram pelos ossos, cobrindo-o de rosas vermelhas com espinhos de 2,5 cm. Os Golpes desarmados corpo a corpo causam dano perfurante adicional igual a um terço do nível (mínimo 1). No fim de cada turno, se causou dano perfurante com os espinhos, recupera PV iguais ao nível (mínimo 1). Cada vez que recupera PV assim, outra rosa floresce.`,
      },
      {
        id: 'creating-skeletons',
        title: 'Criando Esqueletos',
        body: 'Comece com um esqueleto do tamanho adequado. (Esqueletos Gargântuos podem usar o colosso esquelético com ajustes Elite, tamanho Gargântuo e +1,5 m de alcance.) Acrescente Golpes, Deslocamentos ou outras habilidades da forma. Por exemplo, um esqueleto de quimera pode ter ataque de chifre com a cabeça de bode e ataques de mandíbula com as de dragão e leão, mas não um ataque de punho.',
      },
      {
        id: 'patchwork-skeletons',
        title: 'Esqueletos de Retalho',
        body: 'A ligação de um esqueleto com os restos mortais é tênue. Um danificado troca com relativa facilidade um osso quebrado por outro semelhante, catado de outra criatura. Com o tempo, o corpo inteiro pode ser substituído, osso a osso. Esqueletos não têm muita identidade, então fica em aberto se ainda é a mesma criatura.',
      },
      {
        id: 'radiant-rebirth',
        title: 'Renascimento Radiante',
        body: 'Quando o poderoso lich chamado Tirano Sussurrante voltou do cativeiro, disparou o Fogo Radiante que devastou várias vilas e cidades em torno de sua prisão em Gallowspire. A maioria dos mortos ficou onde caiu, embebendo-se aos poucos em energia necromântica. Nos primeiros dias depois dos ataques, zumbis percorriam a área; com os anos, esqueletos se tornaram cada vez mais numerosos.',
      },
      {
        id: 'skeleton-origins',
        title: 'Origens de Esqueleto',
        body: 'Necromantes às vezes acrescentam um extra aos esqueletos que animam, mas às vezes o ambiente também deixa marca. Esqueletos que passam séculos numa caverna com lago de lava costumam acabar em labareda. Cadáveres cujo túmulo é tomado por espinheiros às vezes se erguem com espinhos que drenam vida, e esqueletos em terra infestado de vermes levam parte da praga quando são animados.',
      },
      {
        id: 'unlife-without-flesh',
        title: 'Não-vida Sem Carne',
        body: 'As energias necromânticas que infundem esqueletos animados dão visão sem olhos e movimento sem músculos. Embora sem mente, o instinto de fazer o mal vem da essência vital corrupta, que perverte energia do vazio para criar em vez de destruir.',
      },
    ],
  }),
  fam({
    id: 'family-spider',
    name: 'Aranha',
    originalName: 'Spider',
    trait: null,
    sourcePage: 320,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=474',
    intro:
      'Poucos vermes do dia a dia inspiram tanto pavor quanto a infame aranha.',
    sections: [
      {
        id: 'other-giant-spiders',
        title: 'Outras Aranhas Gigantes',
        body: 'Existe uma quantidade estonteante de espécies de aranha gigante no mundo. Algumas, como a aranha dos sonhos, cujo veneno cria alucinações estranhas, são relativamente pequenas. Outras, como a aranha ogro desajeitada, são maiores que um cavalo.',
      },
      {
        id: 'spider-allies',
        title: 'Aliados Aranha',
        body: 'Embora sejam vermes incapazes de formar alianças de verdade, aranhas aparecem ao lado de muitos tipos de criatura, e às vezes até aninham dentro de esqueletos ou outros mortos-vivos ocos. Conjuradores às vezes chamam aranhas com Conjurar Animal, e enxames de aranha têm o jeito de surgir em quase qualquer lugar na pior hora possível.',
      },
    ],
  }),
  fam({
    id: 'family-troll',
    name: 'Troll',
    originalName: 'Troll',
    trait: 'Troll',
    sourcePage: 330,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=478',
    intro:
      'Babando, cruéis, invencíveis: este é o retrato de aldeão para os monstros temidos conhecidos como trolls. As raízes dessas histórias são, sem dúvida, verdadeiras. A carne dos trolls regenera sem parar, chegando a brotar membros aberrantes ou cabeças extras se não for podada, e é preciso uma fome sem fundo para alimentar esse crescimento desenfreado. Mesmo no processo de se empanturrar, porém, trolls acham oportunidades de zombar da presa e infligir crueldades miúdas.\n\nA capacidade de um troll de sobreviver é tão forte que acreditam que até o menor pedaço de carne se regenera aos poucos numa forma nova, sofrendo enquanto todos os poderes da terra se reúnem para revivê-los. Apesar da dor, trolls falam dessa vitalidade inatacável como uma bênção do criador. Poucos ouviram o riso de demônios que afirmam que esse criador amaldiçoou os trolls e os lançou de alturas elevadas, prendendo-os para que nunca mais se erguessem. Trolls preferem permanecer solitários, guardando cada migalha de comida para si.\n\nEm raras instâncias, um troll velho e poderoso passa a liderar grupos. Esses líderes de guerra têm astúcia bastante para conduzir as hordas em saques e massacres devastadores, e a presença altera de forma permanente o ecossistema ao redor. Esse vínculo com o ambiente é um aspecto muitas vezes mal compreendido da espécie, e fica mais agudo com a idade e o poder do troll. Isso não quer dizer que trolls sejam protetores valorosos da natureza. São cruéis e territoriais, e devastam o próprio território para sempre se isso significar mais comida por um dia.',
    sections: [
      {
        id: 'other-trolls',
        title: 'Outros Trolls',
        body: 'Há uma variedade ampla de trolls em climas diferentes, às vezes mal se parecendo uns com os outros, mas compartilhando uma resiliência amaldiçoada. Como os trolls da floresta, estão ligados aos ambientes em que vivem, o que muda como regeneram e como podem ser mortos. Trolls de caverna se escondem da luz petrificante do sol, e trolls de musgo assombram pântanos de cipó. Outros simplesmente mutam, acumulando braços desengonçados ou até várias cabeças funcionais ao longo dos anos.',
      },
      {
        id: 'troll-augurs',
        title: 'Áugures Troll',
        body: 'Um grupo curioso de trolls afirma possuir o “dom da visão”. Esses áugures praticam um método perturbador de adivinhação, rasgando o próprio abdômen e puxando as entranhas para interpretar as profecias. Na cidade varisiana de Kaer Maga, áugures exercem o ofício na rua por moedas, deixando visitantes com mais perguntas que respostas.',
      },
    ],
  }),
  fam({
    id: 'family-unicorn',
    name: 'Unicórnio',
    originalName: 'Unicorn',
    trait: 'Unicorn',
    source: HOWL,
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Unicorn',
    intro:
      'O unicórnio mais conhecido é o cavalo prateado de um só chifre, mas há muita variedade — alguns bem mais raros.',
    sections: [
      {
        id: 'unicorn-grove',
        title: 'Bosque',
        body: 'Guardião de bosques puros. O chifre é sagrado e toca o incorpóreo; cura aliados e persegue o profano. Fala com animais e resiste a efeitos mentais.',
      },
    ],
  }),
  fam({
    id: 'family-warg',
    name: 'Warg',
    originalName: 'Warg',
    trait: null,
    sourcePage: 341,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=482',
    intro:
      'O warg é um lobo inteligente e maligno que vive entre goblins, hobgoblins, orcs e humanoides violentos.',
    sections: [
      {
        id: 'warg-legends',
        title: 'Lendas de Warg',
        body: 'Wargs são tema de muitos contos sombrios e histórias de fogueira. Relatos assustadores de wargs engolindo crianças inteiras têm uma base perturbadora na realidade: essas criaturas vorazes têm mandíbulas que se desencaixam como as de uma serpente para engolir presa pequena enquanto a vítima ainda vive.',
      },
    ],
  }),
  fam({
    id: 'family-werecreature',
    name: 'Homem-fera',
    originalName: 'Werecreature',
    trait: 'Werecreature',
    sourcePage: 344,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=484',
    intro:
      'Homens-fera são humanoides condenados a transformar-se em animais e híbridos de animal e humanoide sob a luz da lua cheia. São o resultado de uma maldição primal antiga, que por sua vez transmitem pela própria mordida. A capacidade de espreitar invisíveis no ermo e no meio da gente, somada ao contágio da condição, faz deles causa perene de pânico e suspeita.',
    sections: [
      {
        id: 'creating-werecreatures',
        title: 'Criando Homens-fera',
        body: `Você pode criar um homem-fera com as regras de construção de criaturas do GM Core (como as fichas desta seção) ou transformar um humanoide vivo existente nos passos abaixo. A segunda opção serve bem para um NPC recorrente que se torna homem-fera no meio da campanha. Essas mudanças refletem a forma híbrida.

Aumente o nível da criatura em 1 e mude as estatísticas assim:
• Ganha os traços fera e homem-fera.
• Aumente o tamanho em uma categoria se o animal for maior que o humanoide-base.
• Aumente CA, bônus de ataque, CDs, salvaguardas e modificadores de perícia em 1.
• Aumente o dano dos Golpes e de outras ofensivas em 1. Se a habilidade tiver limite de usos (como sopro mágico), aumente o dano em 2.
• Aumente os PV conforme a tabela. O aumento é maior que o usual para compensar a fraqueza a prata.
• Ganha fraqueza a prata conforme a tabela.

Nível inicial → aumento de PV / fraqueza a prata
4 ou menos → +25 / 5
5–7 → +35 / 7
8–14 → +50 / 10
15+ → +75 / 15`,
      },
      {
        id: 'werecreature-abilities',
        title: 'Habilidades de Homem-fera',
        body: `Todos os homens-fera ganham as habilidades abaixo, algumas das quais combinam com o animal em que se transformam. Ajuste o que conflitar com o tema.

**Sentidos** Ganha todos os sentidos do animal.

**Empatia Animal** Pode fazer perguntas, receber respostas e usar Diplomacia com animais do tipo geral.

**Garras** Ganha um Golpe de garra (ataque desarmado ágil que causa dano cortante). Se já tinha ataques ágeis, o dano das garras deve ser mais ou menos o desses ataques. Se só tinha ataques não ágeis, as garras devem causar cerca de três quartos desse dano.

**Mandíbulas** Ganha um Golpe de mandíbulas (ataque desarmado que causa dano perfurante) que inflige a maldição do homem-fera. Se já tinha ataques não ágeis, o dano das mandíbulas deve ser mais ou menos o desses ataques. Se só tinha ataques ágeis, as mandíbulas devem causar cerca de um terço a mais.

**Mudar Forma** (1 ação; concentrar, polimorfo, primal) Muda para a forma humanoide, híbrida ou animal. Cada forma tem aparência específica e persistente. A forma natural de um homem-fera verdadeiro é a híbrida. Na forma humanoide, usa o tamanho humanoide original, perde os Golpes de mandíbulas e garras e ganha um Golpe de punho que causa dano de concussão igual ao cortante da garra. Na forma animal, Deslocamento e tamanho passam aos do animal; ganha quaisquer efeitos especiais de Golpe do animal que ainda não tivesse (como Agarrar) e perde os Golpes de arma.

**Maldição do Homem-fera** (maldição, primal) Afeta só humanoides. Salvaguarda: Fortitude, CD de magia moderada para o novo nível. A cada lua cheia, a criatura amaldiçoada deve obter sucesso em outra salvaguarda de Fortitude ou vira o mesmo tipo de homem-fera até o amanhecer. Fica sob controle do Mestre e sai em devastação por metade da noite, depois cai inconsciente até o amanhecer.

**Frenesi Lunar** (polimorfo, primal) Quando a lua cheia aparece no céu noturno, o homem-fera deve entrar na forma híbrida, não pode Mudar Forma depois disso, fica uma categoria de tamanho maior, aumenta o alcance em 1,5 m e aumenta o dano das mandíbulas em 2. Quando a lua se põe ou o sol nasce, volta à forma humanoide e fica fatigado por 2d4 horas.`,
      },
    ],
  }),
  fam({
    id: 'family-wight',
    name: 'Wight',
    originalName: 'Wight',
    trait: 'Wight',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Wight',
    intro:
      'Wights são mortos-vivos inteligentes nascidos de ciclos inescapáveis de rancor. O rancor pode ser da própria vontade em vida, ou instilado por rituais necromânticos — em geral profanação de sepultura. Assombram cemitérios, catacumbas e outros lugares dos mortos. A fome mira os vivos: coração batendo e calor rosado inspiram ódio visceral.',
    sections: [
      {
        id: 'wight-spite',
        title: 'Rancor',
        body: 'Há tantos tipos de wight quantos tipos de gente. O ambiente também muda defesas: o da geada surge onde exposição é morte comum. Sustentados por energia do vazio, duram décadas em passagem selada ou fundo de lago até um viajante acordá-los. Quem morre sob o rancor corruptor se ergue como prole.',
      },
    ],
  }),
  fam({
    id: 'family-zombie',
    name: 'Zumbi',
    originalName: 'Zombie',
    trait: 'Zombie',
    sourcePage: 356,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=487',
    intro:
      'O único desejo de um zumbi é consumir os vivos. Sem pensamento, sempre cambaleando, só param quando são destruídos.',
    sections: [
      {
        id: 'zombie-abilities',
        title: 'Habilidades de Zumbi',
        body: `Você pode modificar zumbis com as habilidades abaixo. A maioria tem uma delas; se der mais, considere aumentar o nível e ajustar as estatísticas.

**Mordedor de Tornozelo** Este zumbi luta tão bem no chão quanto em pé. Enquanto caído, não fica desprevenido, ignora a penalidade de status nos testes de ataque e ganha +2 de circunstância em testes de Atletismo para Derrubar. Também pode mover-se até metade do Deslocamento quando Rasteja.

**Pústulas Nojentas** (doença) O zumbi está coberto de pústulas que se rompem quando sofre qualquer dano perfurante ou qualquer acerto crítico. Criaturas adjacentes são atingidas por fluido vil e ficam enjoadas 1, a menos que obtenham sucesso numa salvaguarda de Fortitude contra a CD de magia moderada para o nível do zumbi.

**Banquete** (2 ações, manipular) Se o zumbi estiver adjacente a uma criatura imobilizada ou inconsciente, ou a um cadáver que morreu na última hora, pode banquetear-se na carne. Isso restaura uma quantidade de PV igual ao nível do zumbi. Se a criatura estiver viva, o zumbi causa dano igual ao de suas mandíbulas, punho ou garra.

**Portador de Peste** (doença) O zumbi carrega uma peste que pode criar mais da sua espécie. Funciona como a podridão zumbi do zumbi da peste, exceto que no estágio 5 a vítima se ergue como outro zumbi do mesmo tipo do portador, em vez de um zumbi da peste. Use a CD de magia alta para o nível do zumbi.

**Membros Persistentes** Na primeira vez que o zumbi sofre um acerto crítico com um Golpe corpo a corpo ou à distância, um membro cai do corpo e continua atacando. O membro age na iniciativa do zumbi; a cada rodada pode Avançar até metade do Deslocamento do zumbi e fazer um Golpe. O membro usa e contribui para a penalidade de ataque múltiplo do zumbi.

**Fedor Pútrido** (aura, olfativo) 4,5 m. A carne podre é particularmente fétida. Uma criatura que entra na área deve tentar uma salvaguarda de Fortitude com CD moderada ou alta para o nível do zumbi. Falha: enjoado 1. Falha crítica: também sofre −1,5 m de penalidade de status nos Deslocamentos por 1 rodada. Enquanto estiver na aura, a criatura sofre −2 de circunstância nas salvaguardas para se recuperar de enjoado. Quem obtém sucesso fica imune temporariamente a todos os fedores pútridos de zumbis por 1 minuto.

**Aura de Podridão** (aura, doença, vazio) O zumbi emite uma aura de podridão e doença que faz feridas festerem. Qualquer criatura viva que começa o turno a até 3 m do zumbi e não está com PV máximos sofre 1d6 de dano de vazio. Esse dano aumenta em 1d6 a cada 6 níveis do zumbi.

**Imortal** Este zumbi é quase impossível de matar. Perde a fraqueza a cortante e ganha resistência contra todo dano igual ao nível (mínimo 3), e ganha fraqueza igual ao dobro do nível (mínimo 6) a acertos críticos. Aumente o nível do zumbi em 1 se der esta habilidade.

**Velocidade Profana** O zumbi ganha +3 m de bônus de status em todos os Deslocamentos.`,
      },
      {
        id: 'creating-zombies',
        title: 'Criando Zumbis',
        body: 'Para criar uma criatura zumbi, comece com um zumbi do tamanho adequado. Depois acrescente quaisquer Golpes, Deslocamentos ou outras habilidades que ganharia pela forma. Para criar um zumbi Gargântuo, comece com o colosso zumbi, aplique os ajustes Elite, mude o tamanho para Gargântuo e aumente o alcance em 1,5 m.',
      },
      {
        id: 'disposable-legions',
        title: 'Legiões Descartáveis',
        body: 'Com o lich ancião Tar-Baphon solto de seu encarceramento de eras, os mortos-vivos de suas legiões foram reaproveitados de propósito. Zumbis como os desta página cumprem papéis específicos, e necromantes malignos os empregam como se fossem tropas vivas ou mortos-vivos inteligentes. Experimentos necromânticos buscam produzir várias habilidades e misturar energias, com resultados horrendos que não dissuadem os criadores.',
      },
      {
        id: 'risen-from-the-grave',
        title: 'Erguidos da Cova',
        body: 'Zumbis costumam ser criados com rituais necromânticos nefastos. Entre os mortos-vivos, são usados sobretudo como carne de canhão: desgastam defesas e consomem recursos antes que mortos-vivos mais poderosos cheguem para o golpe final. Zumbis não falam nem pensam de verdade por conta própria, mas podem ser comandados por outros mortos-vivos aliados e por necromantes poderosos.',
      },
    ],
  }),
]
