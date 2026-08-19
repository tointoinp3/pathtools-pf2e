import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 6 do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core). Sem Legacy.
 */
export const catalogCreatureFamiliesMonsterCoreBatch6: CreatureFamily[] = [
  fam({
    id: 'family-gnome',
    name: 'Gnomo',
    originalName: 'Gnome',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Gnome%20Bard',
    intro:
      'Gnomos são criativos e curiosos. Medem cerca de 90 cm, e a personalidade vívida combina com cabelo e olhos naturalmente coloridos. Têm ligação nata com o lar ancestral, o Primeiro Mundo. Buscam aventura e experiências novas para combater uma aflição de toda a ancestralidade conhecida como o Desbotamento: gnomo que deixa de sonhar e inovar perde a cor aos poucos e cai em depressão profunda.\n\nUm subgrupo notável, os gnomos umbrais, em geral tem pele cinza ou marrom de textura pedregosa e cabelo fino e pálido — ou a cabeça raspada. São mais numerosos nas Terras Sombrias, onde se chamam drathnelar.',
    sections: [
      {
        id: "bet-on-it",
        title: "Aposte nisso",
        body: "Muitos gnomos amam o friozinho na barriga de apostar. As apostas não precisam ser de dinheiro para um gnomo curtir. Podem colocar na mesa itens interessantes, ensinar habilidades novas ou até constrangimento público.",
      },
      {
        id: "bleachlings",
        title: "Desbotados",
        body: "Sobreviver à pior aflição conhecida da espécie gnomo não é pouco, e quem passa pelo Desbotamento sai mudado. Você pode adicionar a habilidade a seguir a qualquer bloco de gnomo para representar um gnomo desbotado.\n\n**Imperturbável** Quando o gnomo desbotado rola uma falha crítica num teste com o traço emoção, obtém uma falha em vez disso.",
      },
      {
        id: "few-friends-below",
        title: "Poucos amigos abaixo",
        body: "A maioria das criaturas que habita as Terras Sombrias é sinistra e implacável. Embora gnomos umbrais não o sejam, quem busca sua ajuda deve lembrar que não recebem estranhos de braços abertos. Nas Terras Sombrias brutais, esses traços são tomados pelos habitantes tanto como fraquezas quanto como forças.",
      },
      {
        id: "gnome-animal-companions",
        title: "Companheiros animais gnomos",
        body: "Muitos gnomos, sobretudo conservacionistas, têm laços estreitos com animais escavadores, e alguns chegam a aventurear ao lado deles. Tais animais incluem texugos, glutões e outros mustelídeos, mas alguns gnomos fizeram amizade com escavadores mais incomuns, incluindo pangolins e insetos gigantes conhecidos como abelhas-mineiras. Um gnomo com interesse no Plano da Terra pode até viajar com um cão de relva.",
      },
      {
        id: "gnome-pranks",
        title: "Peças gnomos",
        body: "Muitos gnomos são trocistas consumados, tentando tirar reação de quem cruzam. Uns o fazem para compartilhar o senso de capricho que esperam permear a própria vida; outros simplesmente gostam da cara de confusão da vítima. Porém, peças gnomos nunca são fisicamente prejudiciais, e só levemente injuriosas ao orgulho. Clássicos incluem fingir estar congelado no tempo quando alguém entra no cômodo, colocar um pouco de tempero extra (ou outro sabor incomum) na comida de um amigo e remover as maçanetas de um quarto enquanto alguém está dentro.",
      },
    ],
  }),
  fam({
    id: 'family-halfling',
    name: 'Halfling',
    originalName: 'Halfling',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Halfling%20Troublemaker',
    intro:
      'Apesar da estatura pequena, um halfling pode ser um inimigo formidável se você cair do lado errado da frigideira. Muitos viajam, comerciam e se metem em encrenca com um sorriso — a bravata às vezes passa do ponto, e a peça vira problema de verdade.',
    sections: [
      {
        id: "halfling-communities",
        title: "Comunidades halfling",
        body: "Além das próprias vilas e caravanas, muitos halflings se instalam nas cidades de humanos e outras ancestralidades. Encontram nichos, muitas vezes como criados e equipe de restaurante. Prosperam especialmente em metrópoles por onde passa gente de muitas origens. Costumam lastimar que o ambiente não foi feito para eles, e precisam treinar subir em prateleiras ou carregar ferramentas para operar trincos altos e afins.",
      },
      {
        id: "illicit-imports",
        title: "Importações ilícitas",
        body: "Onde houver mercadoria que a gente queira, sempre haverá quem se disponha a obtê-la e contrabandeá-la. Exemplos incluem:\nTecnologias raras de Alkenstar e Numéria.\nFlora e fauna exóticas para coleção particular.\nSegredos mágicos do Arcanamirium em Absalom ou saber dos Ermos de Mana de Nex.\nEntorpecentes.\nPessoas — sobretudo oprimidos sendo levados à segurança.",
      },
      {
        id: "kitchen-weaponry",
        title: "Armamento de cozinha",
        body: "Halflings amam objetos que servem a vários propósitos práticos, sobretudo se o propósito inclui comer. Poucos objetos servem para mais atividades do que uma frigideira, e muitos halflings adoram contar todos os usos que acharam para a panela se alguém perguntar.",
      },
    ],
  }),
  fam({
    id: 'family-rakshasa',
    name: 'Rakshasa',
    originalName: 'Rakshasa',
    trait: 'Rakshasa',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Raktavarna',
    intro:
      'Rakshasas são seres primordiais e divinos, encarnações de tudo que é sórdido na criação, nascidos no instante em que os conceitos de bem e mal foram concebidos. Seu propósito divino é exemplificar o profano — assassinando parentes, comendo carne de seres sencientes e cometendo mil outras atrocidades — para que mortais saibam que esses atos são crimes aos olhos do sagrado. É um papel que precisam desempenhar, como uma peça precisa de um vilão, e esse papel condenou todos os rakshasas desde a gênese.\n\nA maioria gosta do papel, como um ator gosta de uma interpretação magistral, mas há tragédia na existência: estão fadados a servir só de contraste, a corromper o indigno e cair diante do herói, nunca livres para forjar o próprio caminho.',
    sections: [
      {
        id: "rakshasa-immortals",
        title: "Imortais rakshasa",
        body: "Acima de todos os rakshasas governam os imortais rakshasa, entidades poderosas manifestadas dos conceitos mais horrendos que já piscaram à existência. Esses seres incluem Aksha do Segundo Sopro, Bundha o Açougueiro Canoro, Dradjit o Mata-Deuses, Kunkarna o Guerreiro dos Sonhos, Mursha o Senhor das Feras, Otikaya o Arqueiro Espiritual, Surpa o Vingador, Zabha o Profanador, e incontáveis outros.",
      },
      {
        id: "rakshasas-in-society",
        title: "Rakshasas na sociedade",
        body: "A maioria dos rakshasas vive em áreas urbanas onde humanoides se reúnem, o que lhes fornece uma variedade de mortais para predar e achar insuficientes, além de todos os luxos que muitas vezes levam sociedades humanoides à corrupção.",
      },
    ],
  }),
  fam({
    id: 'family-dhampir',
    name: 'Dhampir',
    originalName: 'Dhampir',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dhampir%20Wizard',
    intro:
      'Como prole mortal de um vampiro e um progenitor vivo, dhampirs ocupam um lugar incomum entre os vivos. A herança vampírica empresta incisivos alongados, beleza e graça sobrenaturais, palidez espectral e um olhar penetrante. O traço mais distintivo é a ligação com a energia do Vazio, que os cura e os deixa tão vulneráveis à energia vital quanto qualquer morto-vivo.\n\nMuitos crescem órfãos: o progenitor mortal morreu no parto ou abandonou a criança por achar amaldiçoada. A desconfiança da ancestralidade complica a vida em sociedade. Em regiões como Nidal, Geb e Ustalav, onde vampiros são vistos com certo respeito, a herança pode até empoderar. A criança de um moroi é a mais comum: o svetocher.',
    sections: [],
  }),
  fam({
    id: 'family-serpentfolk',
    name: 'Serpentfolk',
    originalName: 'Serpentfolk',
    trait: 'Serpentfolk',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Zyss%20Serpentfolk',
    intro:
      'Antes do choque antigo com a humanidade devastar a civilização, o povo-serpente mandava num império subterrâneo vasto. O poder se desfez e o deus Ydersius foi decapitado — embora não exatamente morto. A astúcia, a inteligência e a magia inata diminuíram desde o auge. Parte disso veio de interferência cruel na linhagem: a classe dominante, os zyss, nasce com magia inata, mas o sangue é ralo e os deixa suscetíveis a feridas. Vistos como falhas do experimento, os aapophs são fortes, propensos a mutação e sem magia inata.\n\nO reino central das Terras Sombrias ainda leva o nome antigo do império — Sekamina — e o título em Aklo, sekmin, aparece em textos antigos. Os números são tão baixos que reconquistar o domínio parece um sonho distante: a gestação dura até uma década, e não há como saber se a cria será zyss ou aapoph.',
    sections: [
      {
        id: "above-the-surface",
        title: "Acima da superfície",
        body: "Um número pequeno de povoados serpentfolk pontilha a superfície de Golarion, a maioria em selvas úmidas e remotas, ilhas distantes ou na boca de cavernas. É raro um assentamento desses ter mais que algumas dezenas. Contam sobretudo com aapophs para construir as bases de poder, defendê-los e executar praticamente todas as funções práticas da sociedade — inclusive prover comida, fabricar bens e atender a cada necessidade dos zyss.",
      },
      {
        id: "serpentfolk-magic",
        title: "Magia serpentfolk",
        body: "Alguns serpentfolk podem ter magias inatas inteiramente diferentes. Essas alternativas são em geral ilusões, magias mentais ou magia divinatória. Exemplos, listados pelo círculo mínimo, incluem: **6º** _despistar_, _convicção zelosa_; **5º** _sondar a mente_; **4º** _palavras melífluas_; **3º** _mensagem onírica_, _enfeitiçar_, _ler mentes_; **2º** _invisibilidade_ (somente a si); **1º** _elo mental_, _dor fantasma_. Serpentfolk aapoph não têm magias inatas.",
      },
      {
        id: "zyss-strife",
        title: "Discórdia zyss",
        body: "Um conclave serpentfolk com só alguns zyss funciona; um com número grande vira faccioso. Cultos e sociedades se formam, cada um perseguindo as próprias paixões e políticas, com tramoias e traições à solta. Um sacerdote poderoso pode trazer outros zyss à linha, mas muitos questionam por que um sacerdote deveria mandar se o deus está morto. Florescendo na decadência, zyss anseiam receber presentes caros, empanturrar-se em banquetes enormes e cultivar artes como música, poesia ou escultura.",
      },
    ],
  }),
  fam({
    id: 'family-soulbound-doll',
    name: 'Boneca de Alma',
    originalName: 'Soulbound Doll',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Soulbound%20Doll',
    intro:
      'Bonecas de alma são manequins ou brinquedos sinistros imbuídos de um pedaço pequeno da alma de um mortal falecido. Servem de companhia ou criado, mas o livre-arbítrio faz a obediência ao criador não ser garantia. Seguidores de Pharasma em geral as abominam como perversão do ciclo natural das almas.\n\nSão as mais simples duma série de construtos de alma. O fragmento reside numa gema de foco (Solidez 10), em geral cravada no pescoço ou no peito. Não impede a ressurreição nem o progresso da alma ao além, mas o processo costuma ser letal para doadores vivos relutantes. Apesar do tamanho miúdo, o fragmento torna o punho mais perigoso do que parece — e concede uma única magia desproporcional à estatura.',
    sections: [],
  }),
  fam({
    id: 'family-pipefox',
    name: 'Raposa-cachimbo',
    originalName: 'Pipefox',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Pipefox',
    intro:
      'Raposa-cachimbos são cobras felpudas pequenas com cabeça de raposa. Passam o dia escondidas em cantos escuros, penduradas em árvores, enroladas em canos — onde der para observar algo interessante em paz. Não são praga nem animal de estimação: espreitam, acumulam saber e procuram um erudito digno de receber as observações.\n\nTratam o conhecimento como moeda e o protegem a qualquer custo. Se se revelam, é depois de muito estudo, e nunca de graça: saber se troca por saber. Muitas instituições de conhecimento fingem não notar a espionagem — um cache de backup na forma de uma cobrinha felpuda.',
    sections: [],
  }),
  fam({
    id: 'family-sinspawn',
    name: 'Cria do Pecado',
    originalName: 'Sinspawn',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Wrathspawn',
    intro:
      'Crias do pecado foram feitas por um dos sete senhores das runas antigos — cada um abraçando e personificando um dos sete pecados. A primeira nasceu do Senhor das Runas da Ira, com técnicas que depois influenciaram a deformação de carne. Não demorou para o método cair nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos demais, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas. A cabeça é alongada, o maxilar inferior se parte no queixo, e palpos terminam em mãos minúsculas emoldurando uma língua comprida.',
    sections: [
      {
        id: "born-of-sin",
        title: "Nascidos do pecado",
        body: "Crias do pecado recuaram do mundo por muitos séculos após o colapso do império dos senhores das runas, mas nos anos recentes emergiram de masmorras antigas, poças mágicas estranhas e outras ruínas esquecidas. Não podem procriar, mas em certos casos artefatos incrivelmente poderosos forjados pelos senhores das runas, conhecidos como poços rúnicos, podem sugar fragmentos de memórias e emoções pecaminosas — ligadas aos pecados associados aos poços — das almas de gente morrendo por perto, alimentando a criação espontânea de novas crias. Quando energia pecaminosa suficiente se acumula num poço rúnico, ele vomita uma cria adulta sem lealdade prévia a um senhor das runas há muito perdido. Todas entendem por instinto o papel dos poços na propagação da espécie e muitas vezes estabelecem vilarejos pequenos perto de poços despertos, caçando seres sencientes que possam usar para proliferar as comunidades.",
      },
      {
        id: "sinspawn-locations",
        title: "Locais das crias",
        body: "Crias do pecado aparecem em regiões onde fontes para sua criação permanecem enterradas em ruínas antigas — em Golarion, isso hoje as limita às terras de fronteira de Varísia. Mas conforme se espalham, espalha-se também o saber potencial de como fabricar mais, e distorcedores de carne mundo afora esperam um dia criar crias do pecado próprias.",
      },
    ],
  }),
  fam({
    id: 'family-nephilim',
    name: 'Nefilim',
    originalName: 'Nephilim',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Pitborn%20Adept',
    intro:
      'Muitos imortais habitam os outros planos do Grande Além. Não é raro mortais e imortais se envolverem, e os filhos dessas uniões carregam um elemento sobrenatural na linhagem por gerações. Depois da primeira, a influência em geral dorme — até se manifestar forte em descendentes muitos anos depois. Esses herdeiros de legados extraplanares são os descendentes planares.\n\nNefilins são descendentes planares com ligação aos planos da Esfera Externa. Uns estão claramente atados a Céu ou Inferno; outros são amálgamas crípticos de traços metafísicos. Os nascidos do Fosso carregam corrupção demoníaca no sangue mortal; os legisladores descem de arcontes.',
    sections: [],
  }),
  fam({
    id: 'family-athamaru',
    name: 'Athamaru',
    originalName: 'Athamaru',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Athamaru%20Hunter',
    intro:
      'No fundo do mar, cardumes de athamarus — humanoides pisciformes armados de lanças e bestas especializadas — perseguem tubarões, serpentes marinhas e lulas gigantes nas costas de moreias gigantes. Os primeiros a atacar usam arpões farpados que abrem leques de alga, atrasando a presa. Desenvolveram a tradição de caça para forjar guerreiros e dissuadir agressores, em parte por séculos de opressão de outras culturas aquáticas.\n\nRaramente caçam quem vive em terra: preferem trocar serviço de guia por metal, cerâmica e tubérculos, que consideram iguaria terrestre. Comunidades — em geral vilas de 200 ou menos — são matriarcais. A soberana também é a principal poedeira, e cada geração nasce com laços familiares fortes.',
    sections: [
      {
        id: "xidao",
        title: "Xidao",
        body: "Em Tian Xia, a nação submersa de Xidao fica no golfo raso entre Minkai e o continente. Embora os Estados que a compõem sejam independentes, athamarus são a maioria da população e mandam para todos os efeitos práticos. Obeliscos de pedra chamados agulhas de comércio sobem acima da superfície do golfo para recolher oferendas de viajantes. Athamarus as monitoram e guiam ou negociam com quem doa.",
      },
    ],
  }),
  fam({
    id: 'family-duskwalker',
    name: 'Duskwalker',
    originalName: 'Duskwalker',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Duskwalker%20Ghost%20Hunter',
    intro:
      'Duskwalkers são infundidos com as mesmas energias dos psicopompos. Esses herdeiros cinzentos renascem no Universo mortal para guardar o ciclo de vida e morte. Como outros descendentes planares, carregam um legado do Grande Além — no caso, o Ossário e o dever de manter as almas no rumo certo.',
    sections: [],
  }),
  fam({
    id: 'family-ofalth',
    name: 'Ofalth',
    originalName: 'Ofalth',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Larval%20Ofalth',
    intro:
      'Encontrados em esterqueiras de castelo, lixões e esgotos, ofalths são amálgamas vivas de detrito molhado, esgoto e lixo. Carregam uma doença chamada sangrias miseráveis, que faz o sangue da vítima vazar pelos poros. Reproduzem-se assexuadamente: ao sair do ovo coriáceo, a larva lembra um tendão de carne sobre pernas finas, e logo se envolve num casulo de lixo que serve de armadura e camuflagem.',
    sections: [
      {
        id: "violent-transformation",
        title: "Transformação violenta",
        body: "Depois de vários anos, o ofalth larval se prepara para a transformação final descascando toda a armadura de lixo e se arremessando contra uma superfície dura até o casulo rachar, permitindo que o ofalth adulto irrompa numa erupção violenta de lodo e gore.",
      },
    ],
  }),
  fam({
    id: 'family-poracha',
    name: 'Poracha',
    originalName: 'Poracha',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Poracha',
    intro:
      'Porachas são feras felinas nativas da mística Floresta dos Espíritos em Tian Xia. Na forma natural, essas criaturas graciosas de oito pernas têm pelagem cinza malhada com faixas verde-oliva — mas raramente são vistas assim. Até as mais jovens se escondem dentro de objetos, o que as torna elusivas e só visíveis nos próprios termos.\n\nO traço mais icônico é dobrar a realidade para se teleportar — o salto — distâncias curtas. Também descansam dentro de objetos, onde o tempo passa muito devagar. Gostam de marcos à beira da estrada, para maximizar a chance de encontrar viajantes. São aliadas ideais de caçadores e caçadores de tesouro perdidos na mata densa, mas caprichosas: tentativas de coação saem caro, pois têm muitos amigos entre os kami.',
    sections: [],
  }),
  fam({
    id: 'family-ugothol',
    name: 'Ugothol',
    originalName: 'Ugothol',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Ugothol',
    intro:
      'Entre as criações mais sutis dos alghollthus estavam os ugothols — também chamados perseguidores sem rosto. Esses seres torcidos usam mudança de forma para infiltrar povoados e assassinar alvos-chave. Semearam discórdia e substituíram líderes, fazendo organizações indesejadas implodirem e pessoas incômodas perderem a face — e depois desaparecerem.\n\nHá milênios os alghollthus moldaram servos e sociedades com magia mental e transformativa. Frustrados com sociedades rebeldes, chamaram um cataclismo — e erraram a vontade de sobreviver de seus peões. Hoje a maioria permanece nos reinos aquáticos profundos, mas o reaparecimento de servos como os ugothols sugere que voltaram os olhos odiados à superfície.',
    sections: [],
  }),
  fam({
    id: 'family-rhinoceros',
    name: 'Rinoceronte',
    originalName: 'Rhinoceros',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Rhinoceros',
    intro:
      'Esse animal robusto é fácil de reconhecer pelo chifre distintivo que aponta para cima no focinho. São herbívoros e, apesar do tamanho, correm com velocidade considerável. Têm audição boa e faro agudo, mas a vista é relativamente fraca. Temperamentais, territoriais e fáceis de assustar: o instinto natural quando perturbados é atacar — investir de frente e golpear com o chifre poderoso.',
    sections: [
      {
        id: "rhinoceros-horns",
        title: "Chifres de rinoceronte",
        body: "Embora algumas espécies tenham só um chifre, muitos rinocerontes — inclusive os lanudos — têm um segundo, menor, na testa logo atrás do maior. Apesar da aparência e da durabilidade, chifres de rino não são osso nem marfim, e sim a mesma substância de cascos e unhas. O chifre continua a crescer com a idade, permitindo que um rino recupere aos poucos um chifre quebrado. Alguns valorizam os chifres como troféu, mas eles mesmos não têm valor intrínseco.",
      },
    ],
  }),
  fam({
    id: 'family-devil',
    name: 'Diabo',
    originalName: 'Devil',
    trait: 'Devil',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Vordine',
    intro:
      'Mestres da corrupção e arquitetos da conquista, diabos buscam tentação mortal para o profano e a tirania em todos os mundos. As tentações vão de poderes concedidos por contrato infernal a favores torcidos após um juramento sussurrado a um patrono diabólico. Quem sucumbe encontra um além de tormento sem fim nos fossos do Inferno, onde a única esperança de escape é a chance de ser promovido a diabo nas fileiras infernais.\n\nCada diabo tem um papel na máquina burocrática implacável do Inferno: soldados, eruditos, inquisidores, advogados, juízes e carrascos. Orts inferiores servem diabos mais poderosos; nessaris comandam exércitos. Asmodeus está no ápice da estrutura que criou, mas as camadas abaixo são disputa constante por posição.',
    sections: [
      {
        id: "archdevils",
        title: "Arquidiabos",
        body: "Oito arquidiabos governam as oito camadas superiores do Inferno; a mais profunda é governada por Asmodeus. Barbatos é o porteiro da camada mais alta, enquanto Dispater manda na maior cidade do Inferno. Mammon guarda os tesouros, e Belial projeta armas novas para as legiões. Geryon é o arquidiabo mais antigo e guardião de muitos segredos, enquanto Moloch lidera os exércitos. Baalzebul é um arquidiabo sombrio que caiu do favor de Asmodeus, e Mephistopheles foi formado do próprio plano do Inferno.",
      },
      {
        id: "diabolic-divinities",
        title: "Divindades diabólicas",
        body: "Numerosos diabos únicos e poderosos ocupam posições de poder no Inferno. Os mais numerosos desses são os duques infernais, muitos promovidos a esse posto a partir da estatura já impressionante de nessaris. O governante supremo do Inferno é Asmodeus, o Príncipe das Trevas. Entre esses dois degraus mandam os oito arquidiabos.",
      },
      {
        id: "diabolic-locations",
        title: "Locais diabólicos",
        body: "As nove camadas do Inferno são o lar planar de todos os diabos, e eles preferem de longe o entorno tiranicamente ordenado a qualquer outro lugar do multiverso. Ainda assim, diabos podem ser encontrados onde quer que mortais possam ser tentados por barganhas infernais ou a buscar auxílio diabólico. Em Golarion, a nação de Cheliax está particularmente alinhada ao Inferno. O governo se baseia na organização infernal, e a igreja de Estado é a de Asmodeus.",
      },
      {
        id: "fiendish-relations",
        title: "Relações entre capetas",
        body: "Diabos veem a caçada constante dos daemons por almas como desperdício míope de potencial, e a destruição egoísta de sociedade e carne pelos demônios como incivilizada e irritante, mas não odeiam os equivalentes. De fato, a maioria está mais do que disposta a tirar proveito de daemons e demônios para avançar as próprias maquinações.",
      },
      {
        id: "fire-and-ice",
        title: "Fogo e gelo",
        body: "A imagem clássica do Inferno é de um ermo em chamas de magma e vulcões, uma paisagem abrasadora repleta dos gritos das almas condenadas. Quem visitou o Inferno sabe a verdade terrível: os tormentos não cessam na queima eterna. Algumas regiões são extensões perpetuamente congeladas de gelo afiado e vento que varre a carne; outras, pântanos miasmáticos de veneno e doença. O Inferno não limita a caixa de ferramentas de tortura só ao fogo pelo qual é tão conhecido.",
      },
      {
        id: "other-devils",
        title: "Outros diabos",
        body: "Os diabos destas páginas são uma amostra pequena dos tormentos que o Inferno tem a oferecer. Outros, como os diabos belicistas mecânicos, os acusadores de cara de querubim e corpo de mosca, e os diabos algozes a serviço das Rainhas da Noite, são só alguns exemplos dessas criaturas imortais espalhadas.",
      },
      {
        id: "the-hierarchy-of-hell",
        title: "A hierarquia do Inferno",
        body: "O Inferno é um plano duro de lei, com pouco uso para compaixão ou empatia. Como tal, existe inteiramente dentro de uma hierarquia estrita, e essa ordem se estende aos habitantes. Enquanto tipos diferentes de demônios correspondem a pecados variados e daemons se associam a modos de morte mortal, os tipos diferentes de diabos existem só para cumprir papéis particulares na máquina infernal. Às vezes um diabo específico pode transcender o papel para o qual foi literalmente moldado, mas isso muitas vezes o transforma fisicamente no tipo adequado à função nova.",
      },
    ],
  }),
  fam({
    id: 'family-elananx',
    name: 'Elananx',
    originalName: 'Elananx',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Elananx',
    intro:
      'Esses felinos feéricos estranhos lembram linces largos à distância, mas de perto algo está errado. A forma ondula com calor, os olhos brilham como se tivessem chamas miúdas dentro, e o cheiro pungente de folhas podres numa fogueira gruda no pelo. Quem os vê caçar percebe que não são meros predadores: agem com crueldade esperta, deleitando-se na dor que infligem.\n\nCaçam sozinhos ou em matilhas chamadas baforadas. Como muitos gatos, não se contentam em rastrear e devorar: preferem brincar com a vítima. Têm afinidade estranha com incêndios florestais — imunes às chamas, capricham e uivam pelas ruínas fumegantes. Redcaps os estimam como companheiros de caça, mas o elananx odeia ser montado.',
    sections: [],
  }),
  fam({
    id: 'family-sargassum',
    name: 'Monte de Sargaço',
    originalName: 'Sargassum Heap',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Sargassum%20Heap',
    intro:
      'Um monte de sargaço é uma massa de alga semi-inteligente que flutua pelo oceano, atraindo vítimas com esporos alucinógenos. Os afetados são puxados em direção ao monte, vendo o desejo mais íntimo: um ente querido perdido, uma criança em perigo, uma sereia encantadora, a promessa de terra seca. Quando a presa chega perto o bastante, o monte golpeia com tendões de alga e esmaga até a morte.',
    sections: [
      {
        id: "sargassum-bulbs",
        title: "Bulbos de sargaço",
        body: "O amontoado de sargaço é salpicado de bulbos produtores de esporos. São eles que liberam os esporos alucinógenos. Muitos colecionadores ou artífices de poções mágicas e alquímicas estranhas se interessam por esses bulbos quando colhidos direito. Um bulbo bem colhido pode durar até um mês em boas condições; um mal colhido murcha em horas.",
      },
    ],
  }),
  fam({
    id: 'family-krooth',
    name: 'Krooth',
    originalName: 'Krooth',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Krooth',
    intro:
      'Krooths, às vezes chamados comedores de crocodilo, são caçadores rápidos e vis de pântano e alagado. Caçam crocodilos, jacarés e praticamente qualquer coisa com carne, mas a presa favorita são homens-lagarto, boggards e dinossauros.\n\nMachos são solitários e territoriais; fêmeas se reúnem em matilhas para criar os filhotes vulneráveis. O acasalamento é um espetáculo grotesco: a matilha caça um macho, e depois o mata e devora a carne rica em nutrientes. Têm dentes ocos e venenosos: na mordida, um dente se quebra e faz a vítima sangrar em jorro pelo canal oco. Carne de goblinoides — sobretudo bugbears — os repele.',
    sections: [],
  }),
  fam({
    id: 'family-nuckelavee',
    name: 'Nuckelavee',
    originalName: 'Nuckelavee',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Nuckelavee',
    intro:
      'Quando a poluição estraga um curso d’água natural, puxa o temido nuckelavee do Primeiro Mundo. Esse espírito de ira é um espetáculo hediondo: uma monstruosidade equina com o tronco retorcido de um humanoide crescendo direto do dorso. Para piorar, não há um pedaço de pele no corpo disforme — como se tivesse sobrevivido à própria esfola.\n\nQuando cavalga para fora do domínio, deixa um rastro de destruição. Está entre os fey mais cruéis: alguns veem neles o castigo de quem polui as águas, mas o nuckelavee não distingue poluidor de quem só estava no lugar errado. Apesar da fama vil entre humanoides, em geral respeitam outros fey; quando a poluição é limpa e naiades voltam, o nuckelavee se retira em paz.',
    sections: [],
  }),
  fam({
    id: 'family-roc',
    name: 'Roca',
    originalName: 'Roc',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Roc',
    intro:
      'Essas rapinas lendárias, capazes de carregar elefantes como presa, medem em geral uns 9 m do bico à cauda e têm envergadura de 24 m ou mais. O bico é curvo para rasgar carne do osso, mas a tática de caça é agarrar a presa nas garras poderosas e deixá-la cair de grande altura antes de se alimentar. Isso cria uma quantidade enorme de carniça, e bandos de necrófagos — corvos, urubus — seguem a roca.\n\nEm geral aninham em cimos e penhascos inacessíveis. São predadoras de longo alcance, caçam terra e mar, e são antissociais: competem em batalhas aéreas ferozes pelo território. Cerca de uma vez por década, um casal se junta para criar os filhotes — e depois cada um volta à caça solitária.',
    sections: [],
  }),
]
