import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 5 do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core). Sem Legacy.
 */
export const catalogCreatureFamiliesMonsterCoreBatch5: CreatureFamily[] = [
  fam({
    id: 'family-dolphin',
    name: 'Golfinho',
    originalName: 'Dolphin',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Bottlenose%20Dolphin',
    intro:
      'Golfinhos abrangem uma faixa ampla de mamíferos aquáticos, todos sociais, inteligentes e espalhados pelos oceanos do mundo. Caçam em grupos familiares e muitos povos marítimos os consideram presságio de boa viagem — ou aliados contra tubarões.',
    sections: [
      {
        id: "dolphins-to-the-rescue",
        title: "Golfinhos ao resgate",
        body: "Golfinhos têm um traço um tanto incomum: muitas vezes vêm em auxílio de outras criaturas em apuros — salvar alguém de afogar ou protegê-lo de um ataque de tubarão. Nem todo monstro deste livro quer ferir os personagens; considere um golfinho resgatando um PC em perigo se a situação pedir.",
      },
    ],
  }),
  fam({
    id: 'family-hippocampus',
    name: 'Hipocampo',
    originalName: 'Hippocampus',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hippocampus',
    intro:
      'As bestas estranhas conhecidas como hipocampos lembram cavalos terrestres da cabeça ao meio do corpo, mas nas pernas têm nadadeiras abertas em vez de cascos, e no lugar da garupa, caudas poderosas de peixe. As escamas coloridas vão do branco-pérola ao verde-alga, e as crinas são barbatanas dorsais brilhantes e raiadas. Nos oceanos selvagens, a maioria se reúne em águas rasas perto de leitos de algas que dão comida e abrigo. Formam cardumes enormes para ter segurança no número, como cavalos formam manadas.\n\nSão muito cobiçados por sociedades submarinas e por quem vive na superfície: tão fáceis de treinar quanto cavalos, servem das mesmas funções — carga, montaria de guerra, transporte ou animal de estimação. Embora possam usar barda, ela os atrapalha bastante, então a maioria dos tratadores escolhe as opções mais leves. Com mais frequência, são treinados a puxar bigas ou trenós subaquáticos. Não gostam de sair da água: no chão são desajeitados, não suportam cavaleiro enquanto se debatem e não respiram ar por muito tempo.',
    sections: [],
  }),
  fam({
    id: 'family-catfolk',
    name: 'Catfolk',
    originalName: 'Catfolk',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Catfolk%20Pouncer',
    intro:
      'Ágeis e esguios, com traços felinos e caudas longas, os amurruns são andarilhos, exploradores e extrovertidos que compartilham um jeito gregário e uma curiosidade sem freio. Essa última os mete em encrenca, mas vem acompanhada de um talento para a boa fortuna que compensa boa parte do perigo autoinfligido. Aceitam o termo “catfolk” com graça e um toque de diversão.\n\nSempre ansiosos para explorar e aprender, espalharam-se pelo mundo a partir das nações natais nos trópicos do sul, mas nunca em grupos grandes. Um amurrun sozinho pode aparecer em qualquer lugar; um povoado além das fronteiras tradicionais é raro. A inquietação nata e o assombro insaciável explicam: “Moro com o meu povo a vida toda, mas você? É novo e diferente! Tem tanto a aprender!”\n\nLendas antigas afirmam que os catfolk foram criados como guardiões, encarregados de proteger o mundo das forças sinistras nas franjas. Muitas vezes isso se manifesta como oposição a cultistas de senhores demoníacos, arquidiabos e outros semideuses capetas. Muitos adoram os espíritos da criação; outros seguem um panteão pequeno próprio. Viajantes muitas vezes acham conforto no culto a Desna, cujos ensinamentos batem com as predileções deles.',
    sections: [
      {
        id: "lucky-souvenirs",
        title: "Souvenirs da sorte",
        body: "A maioria dos povo-gato exibe com orgulho amuletos da sorte de viagens pessoalmente significativas ou da ocasião em que ganharam o nome. Pode ser um pingente feito de uma pedra achada no topo de uma montanha, um tufo de cabelo de um amante há muito separado, um cajado entalhado de uma árvore derrubada por uma tempestade histórica, uma corrente de prata da aurora de uma ruína élfica ou uma pena colorida de uma selva sem trilhas.",
      },
      {
        id: "the-catfolk-nation",
        title: "A nação povo-gato",
        body: "Povo-gato afirma vir de uma nação distante chamada Murraseth, no sul de Garund. É uma nação da qual se rumora guardar um segredo sombrio no centro, cujos detalhes os habitantes discretos não revelam de bom grado a forasteiros. De fato, poucos aventureiros da região do Mar Interior conseguiram entrar em Murraseth, que dirá descobrir algum de seus mistérios.",
      },
    ],
  }),
  fam({
    id: 'family-elf',
    name: 'Elfo',
    originalName: 'Elf',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Elf%20Ranger',
    intro:
      'Elfos são misteriosos e inteligentes, graciosos e astutos em batalha. Muitos aprendem o arco antes da primeira lâmina, e a vida longa permite passar décadas como patrulheiro, estudioso ou ambos.',
    sections: [
      {
        id: "a-forlorn-outlook",
        title: "Um olhar forlorn",
        body: "Como elfos vivem tanto, muitas vezes preferem manter certo afastamento de quem tem vida mais curta. Os que não o fazem entram em longos períodos de luto, seguidos de um descontentamento geral com o ciclo atual de morte sem fim. São chamados de Forlorn.",
      },
      {
        id: "aiuvarin",
        title: "Aiuvarin",
        body: "Nascidos de uniões de humanos e elfos, aiuvarins têm expectativa de vida maior que a humana, mas bem menor que a élfica. Costumam ser esguios, com orelhas pontudas que não têm a mesma fineza ou comprimento das élficas. Muitos os chamam de “meio-elfos”, termo que vários acham redutivo ou até um pouco ofensivo. Com a dificuldade de se encaixar em qualquer das culturas, grande número de aiuvarins segue o próprio caminho. A natureza sociável pode levá-los a virar artistas, enviados e performers.",
      },
      {
        id: "alien-origins",
        title: "Origens alienígenas",
        body: "Desconhecido para a maioria — até para a maioria dos elfos — o lar original élfico não fica em Golarion, e sim no planeta-selva Castrovel, o segundo a partir do sol. Com a devastação da Queda da Terra, muitos elfos fugiram pelos portais _aiudara_ para o refúgio lendário de Sovyrian, embora poucos percebessem que era um continente noutro planeta.",
      },
      {
        id: "ilduliel",
        title: "Ilduliel",
        body: "Um elfo que acredita ter sido insultado pode declarar ilduliel. Essa rixa intensa marca os dois como nêmeses, desencadeando uma série de lances e contragolpes enquanto as partes se vigiam de perto e põem planos em movimento para impedir o outro de alcançar seus desejos. Quanto maior a dor emocional, mais satisfatório. De fora da cultura élfica, ilduliel pode parecer mesquinho e arrastado, embora elfos considerem 100 anos um prazo razoável.",
      },
    ],
  }),
  fam({
    id: 'family-tengu',
    name: 'Tengu',
    originalName: 'Tengu',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Tengu%20Sneak',
    intro:
      'Tengus são um povo adaptável de Tian Xia cujas viagens os levaram por todo Golarion. Como diáspora, quase sempre aparecem dentro de reinos e comunidades de outros povos, com exceção da nação natal de Kwanlai. Reúnem-se em grupos unidos e coletam palavras e costumes de outras culturas como um pássaro coleta treco para o ninho.\n\nTêm traços bem de ave: bico forte, garras afiadas, penas do marrom-escuro ao preto brilhante. Ossos ocos os deixam leves, e alguns até voam. Há um foco cultural no céu e nos deuses da natureza e das tempestades. Tradições de artes marciais e forja são motivo de orgulho, e a magia gira em torno de leques de penas que comandam vento e relâmpago — alguns até “comem” infortúnio.',
    sections: [
      {
        id: "jinx-eaters",
        title: "Come-azar",
        body: "No arquipélago controlado por piratas das Grilhetas, tengus ocupam um nicho social único: muitos piratas acreditam que a presença de um tengu a bordo afasta o azar. Conhecidos como “come-azar”, são tratados como mascotes pelas tripulações. Não se importam: isso os livra de boa parte da labuta do navio. Quando um tengu navega com piratas com medo de má fortuna, a afirmação de que “fome traz azar” garante conforto e respeito com mais eficácia do que qualquer suborno.",
      },
      {
        id: "storm-surge-blade-style",
        title: "Estilo da lâmina da maré de tempestade",
        body: "Esse estilo de luta popular foi originalmente desenvolvido por um mestre da lâmina da ventania tengu. Há duas disciplinas principais. Ventos Rajada abrange golpes rápidos, fintas e desarmes. Ondas que Quebram foca em técnicas de derrubar e agarrar. Quem alcança o nível mais alto de treino parece canalizar o vento para aprimorar o trabalho de lâmina, manipulando o ar ao redor a cada golpe.",
      },
    ],
  }),
  fam({
    id: 'family-ratfolk',
    name: 'Homem-rato',
    originalName: 'Ratfolk',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Ratfolk%20Grenadier',
    intro:
      'Fiéis ao nome, homens-rato são humanoides semelhantes a roedores, bem adaptados a viver na margem da sociedade dominante. Apesar da ideia errada de que são sujos ou doentes, os ratfolk — ou ysoki, como se chamam — mantêm-se impecavelmente limpos. Às vezes são confundidos com homens-rato licantropos e tratados com medo até poderem corrigir o engano — se tiverem a chance.\n\nEm geral têm entendimento agudo das ciências patológicas e alquímicas, que empregam no comércio e na defesa. São alquimistas e inventores hábeis, e muitas vezes protegem as tocas com armadilhas, bombas e outras criações. Mercadores despacham caravanas grandes que viajam por um ano ou mais antes de voltar, aprendendo com os povos que encontram e coletando materiais interessantes para as tocas.\n\nNas tocas, na estrada e nas cidades, são extremamente comunais, prosperando na proximidade uns dos outros mesmo em espaços apertados. Também lutam bem em recintos estreitos ao lado dos parentes. Ameaçar um ysoki ou os aliados é o jeito mais certo de reunir a comunidade inteira.',
    sections: [
      {
        id: "vast-warrens-and-hidden-homes",
        title: "Tocas vastas e lares ocultos",
        body: "Em Golarion, ysoki são mais numerosos nas Terras Sombrias sob o continente de Tian Xia, onde governam um império vasto, mas também aparecem na região do Mar Interior — sobretudo nos ermos e colinas de Numéria, onde vasculham e colecionam com avidez maravilhas tecnológicas estranhas e armas.",
      },
      {
        id: "ysoki-snares",
        title: "Armadilhas ysoki",
        body: "Embora não tão afeitos a elas quanto kobolds, é comum povo-rato usar laços e armadilhas para defender as tocas. A colocação e os gatilhos de armadilhas permanentes são pensados com cuidado para evitar ysoki à deriva, sobretudo crianças. Laços ou até simples estrepes muitas vezes são preferidos como alternativa, armados quando a toca está ameaçada.",
      },
    ],
  }),
  fam({
    id: 'family-azarketi',
    name: 'Azarketi',
    originalName: 'Azarketi',
    trait: 'Azarketi',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Azarketi',
    intro:
      'Azarketis, também conhecidos como homens-guelra, podem ser encontrados por todo Golarion, com concentração particularmente alta em torno de Absalom e do Mar Interior. Descendentes dos antigos azlanti, sobreviveram ao cataclismo da Queda da Terra fugindo para o oceano, onde os alghollthu os deformaram em formas anfíbias. Precisam se hidratar com regularidade; a pele e as guelras sofrem fora d’água.',
    sections: [],
  }),
  fam({
    id: 'family-sedacthy',
    name: 'Sedacthy',
    originalName: 'Sedacthy',
    trait: 'Sedacthy',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Sedacthy',
    intro:
      'Sedacthies são humanoides anfíbios semelhantes a peixes que espreitam nos oceanos de Golarion e são conhecidos por levar servos animais à terra para devorar quem respira ar. Quando uma aldeia de pesca desaparece da noite para o dia, são os primeiros suspeitos. Orgulham-se de líderes naturais, com ambição limitada só pela adesão estrita à hierarquia. A posição de um sedacthy é determinada pela força dos servos animais que pressiona ao serviço e pela têmpera que prova em caçadas e batalhas contra forasteiros.',
    sections: [
      {
        id: "ancient-wish",
        title: "Desejo antigo",
        body: "A história mais importante da tradição oral sedacthy conta que impressionaram um poderoso gênio faydhaan num jogo de trocadilhos e ganharam a habilidade de falar com todas as criaturas dignas de sabedoria. Por isso, faydhaans são tidos em especial consideração e estão entre os poucos que conseguem mediar paz com sedacthies.",
      },
      {
        id: "fleshwarping",
        title: "Distorção de carne",
        body: "O impulso constante dos sedacthies de fortalecer seus servos animais levou a gerações de experimentos em distorção de carne e modificação corporal. Os mais vistos por quem vive em terra incluem glândulas de muco que mantêm as guelras úmidas, permitindo respirar no ar, e pernas de caranguejo implantadas, concedendo Deslocamento terrestre de 4,5 m.",
      },
    ],
  }),
  fam({
    id: 'family-dero',
    name: 'Dero',
    originalName: 'Dero',
    trait: 'Dero',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dero',
    intro:
      'Deros são humanoides baixos e ossudos, de olhos branco-leitosos, pele cinza-azulada e cabeleira selvagem off-white ou cinza. Descendentes de um tipo misterioso de fey abandonado nas cavernas mais profundas e escuras de Golarion, são assunto de lendas temerosas para a maioria dos povos da superfície. Espreitam sob grandes cidades, realizando experimentos cruéis e torcidos em alvos involuntários.\n\nOs magísteres, em especial, são obcecados em curar a alergia à luz do sol. Para entender como os da superfície resistem, fazem raids noturnas, sequestram vítimas e as submetem a procedimentos terríveis. Quem sobrevive muitas vezes volta com a memória apagada e o corpo marcado de cicatrizes misteriosas.\n\nOs maiores povoados dero se erguem em torno de máquinas esotéricas de cristais flutuantes. Enquanto os cristais se rangem e zumbem com energia azul doentia, flocos e pó se acumulam sob a maquinaria. Magísteres recolhem esses produtos, criando ferramentas e reaproveitando os cristais para alimentar itens mágicos.',
    sections: [
      {
        id: "cytillesh",
        title: "Cytillesh",
        body: "Deros cultivam e ingerem um fungo venenoso chamado cytillesh, também conhecido como mofo cerebral. O cytillesh emite um brilho azul-pálido e pode causar defeitos de nascimento e vários efeitos adversos. Deros não se abalam com esses detrimentos: a exposição prolongada também pode retardar o envelhecimento e, em casos raros, conceder poderes ocultos a certos indivíduos conhecidos como “magísteres”. Também destilam esporos de cytillesh em veneno de letargia, junto de muitas toxinas alucinógenas.",
      },
      {
        id: "cytillesh-toolkits",
        title: "Kits de cytillesh",
        body: "Esses kits de curandeiro são coleções de bisturis cristalinos e pomadas ásperas feitas de cytillesh. Todos brilham no mesmo azul doentio. Enquanto o kit está fora do recipiente opaco, emite luz fraca num raio de 1,5 m. Qualquer não-dero usando ou vestindo o kit fica Enjoado 1 até 1 hora depois de parar, e essa condição não pode ser reduzida nesse período.",
      },
    ],
  }),
  fam({
    id: 'family-changeling',
    name: 'Cambiante',
    originalName: 'Changeling',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Changeling',
    intro:
      'Como filhos de bruxas, talvez destinados a se tornar bruxas eles mesmos, cambiantes enfrentam uma vida de conflito. Nascidos de criaturas sobrenaturais que em geral matam e consomem o pai da criança, são depositados na sociedade paterna para serem criados. Parecem membros da ancestralidade paterna e já foram encontrados entre anões, gnomos, orcs, goblins e outros, mas cambiantes de ancestralidade humana são de longe os mais comuns. Tendem a ser mais esguios, de cabelo mais escuro e pele pálida; o traço mais comum é a heterocromia quase universal, o que alimenta superstição sobre quem tem olhos de cores diferentes.\n\nAo amadurecer, às vezes manifestam dons da herança da bruxa: visão no escuro, unhas longas o bastante para servir de garras, ou poderes mais estranhos específicos da mãe. Filhas de bruxa-cuco, às vezes chamadas dream mays, podem ganhar resistência extra à magia de sonho e sono.\n\nPor volta da mesma época, muitas cambiantes — mulheres em particular — começam a ouvir o Chamado, um apelo psíquico da mãe bruxa que as atrai para longe das comunidades que as criaram. Se seguido, o Chamado eventualmente leva ao coven, onde são torcidas em bruxas. Algumas resistem e seguem a vida mortal.',
    sections: [
      {
        id: "changeling-exiles",
        title: "Exilados changeling",
        body: "Changelings que resistem ao Chamado e abandonam a sociedade que os criou tornam-se exilados como o apresentado nesta página — criaturas que vivem vidas solitárias no ermo e muitas vezes são levadas a medidas desesperadas para sobreviver, adotando o estilo de salteadores de estrada ou de guias de natureza de alto risco.",
      },
    ],
  }),
  fam({
    id: 'family-aeon',
    name: 'Aeon',
    originalName: 'Aeon',
    trait: 'Aeon',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Arbiter',
    intro:
      'Aeons sempre foram os zeladores da realidade e defensores da ordem natural do equilíbrio. Cada tipo assume alguma forma de dualidade e trabalha para moldar o multiverso dentro desses aspectos, ou para corrigir desequilíbrios na ordem perfeita da existência. As maquinações podem erguer uma nação, arrasá-la ou restaurá-la das ruínas. Os motivos são só deles, e raramente compartilham as motivações: pela comunicação estranha de visões, simplesmente criam os resultados que insistem ser necessários para manter o equilíbrio.\n\nComo resultado de mudanças recentes na realidade, aeons começaram a reafirmar presença na cidade planar perfeita de Axis. Para eles, isso é só o mais recente de um ciclo recorrente, embora mortais ainda não o tenham testemunhado. Têm um nome para esse retorno cíclico, no qual recebem de volta os irmãos axiomitas industriosos: a Convergência.',
    sections: [
      {
        id: "aeon-divinities",
        title: "Divindades aeon",
        body: "Se os aeons servem uma divindade de verdade, um conceito filosófico ou apenas uma “unidade suprema” é tema acalorado entre estudiosos planares. Os próprios aeons calam, referindo-se a esse ser ou conceito como o Monad, uma “condição de tudo”. Independentemente do que o Monad de fato seja, existe outra categoria de aeons poderosos — os Árbitros, cada um um semideus único com poderes e objetivos próprios.",
      },
      {
        id: "axiomite-constructs",
        title: "Construtos axiomitas",
        body: "Axiomitas constroem uma gama vertiginosa de construtos, cada um dedicado a um único papel na cidade planar de Axis, de carregar encomendas a farejar espiões. Só alguns modelos são enviados com frequência para fora da cidade, embora as grandes legiões de soldados especializados em construção façam observadores temer que isso não dure.",
      },
      {
        id: "other-aeons",
        title: "Outros aeons",
        body: "Aeons estão entre as criaturas imortais menos compreendidas do Grande Além, e têm uma faixa ampla de poderes. Existem bem mais aeons do que os apresentados aqui, incluindo guardiões do tempo como o bythos de quatro braços e o theletos de simetria estranha, que modera a dualidade entre liberdade e destino.",
      },
      {
        id: "tools-of-creation",
        title: "Ferramentas da criação",
        body: "Embora os registros sejam obviamente escassos, aeons estiveram profundamente envolvidos na criação do Universo. Um punhado de ferramentas intactas desse empreendimento monumental permanece na posse de poderes planares, mas até os fragmentos quebrados são tesouro para mortais como _pedras de aeon_.",
      },
    ],
  }),
  fam({
    id: 'family-dragonet',
    name: 'Dragonete',
    originalName: 'Dragonet',
    trait: null,
    source: 'Draconic Codex',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=640',
    intro:
      'Embora dragonetes sejam menores e careçam do poder bruto dos grandes dragões, são tão variados e fascinantes quanto os parentes maiores. Como os dragões, dragonetes têm laços fortes com a magia. Esses laços influenciam as naturezas contrastantes exibidas pelos diferentes tipos de dragonete. Por exemplo, dragonetes feéricos e dracos-domésticos (Monster Core 2, p. 137) tornam-se bichos de estimação e companheiros fascinantes, e assim são familiares populares para conjuradores. Dragonetes de poça, por outro lado, são arrogantes e indomáveis.\n\nAssumir que dragonetes são inofensivos devido ao tamanho, ou ao fato de que muitas vezes vivem perto de pessoas, é perigoso. Dracos-praga, por exemplo, são fracos e tímidos individualmente, mas inclinados a formar enxames perigosos quando perturbados. Em contraste, dragonetes-pérola são extravagâncias gentis que parecem naturalmente amigáveis.\n\nDragonetes variam em tamanho de pouco maiores que pássaros canoros a não maiores que gatos domésticos. Diferente da maioria dos grandes dragões, param de crescer ao alcançar a maturidade. Variam enormemente em inteligência; dragonetes feéricos são conhecidos pelos truques e pelo engenho, enquanto dracos de corrida ferais têm a capacidade média de resolver problemas de um pombo. Cada tipo de dragonete tem os próprios hábitos de covil e de tesouro, e habilidades únicas que revelam a natureza mágica.',
    sections: [],
  }),
  fam({
    id: 'family-qlippoth',
    name: 'Qlippoth',
    originalName: 'Qlippoth',
    trait: 'Qlippoth',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Cythnigot',
    intro:
      'Muito antes das criaturas conhecidas como demônios se tornarem a força dominante nas Fendas Exteriores, qlippoths governavam as incontáveis fendas da Esfera Externa. São uma forma de mal primordial e alienígena que antecede a vida mortal — e a maioria da imortal também. Desde a ascensão do pecado mortal e da expansão demoníaca, foram empurrados às profundezas e fervem de rancor pela perda dos reinos. Em vez de se opor diretamente aos demônios, voltam-se à fonte — o pecado mortal — e travam uma guerra sem fim para erradicar todas as criaturas capazes de atos pecaminosos, na esperança de reverter a maré demoníaca. Para não engrossar as fileiras do inimigo, infligem transformações horrendas nas vítimas, convertendo-as em seres incapazes de distinguir certo de errado: assim não podem ser julgadas pelos tribunais de Pharasma e não viram capetas. A maioria dos mortais considera os cuidados de um qlippoth bem piores do que qualquer destino no além.',
    sections: [
      {
        id: "qlippoth-and-demons",
        title: "Qlippoths e demônios",
        body: "Qlippoths governaram as Fendas Exteriores por éons e ainda se veem como seus governantes de direito. Quando as Fendas começaram a gerar demônios das almas de humanoides pecadores, os reinos mergulharam numa guerra brutal que durou milênios incontáveis. Embora mais poderosos e estabelecidos, os qlippoths foram lenta mas certamente empurrados para trás pelas hordas demoníacas sem fim, que se reproduziam bem mais depressa do que os qlippoths jamais poderiam igualar. Hoje foram relegados aos cantos mais fundos e escuros das Fendas, onde se agarram aos restos desmoronando de seu território.",
      },
      {
        id: "qlippoth-and-mortals",
        title: "Qlippoths e mortais",
        body: "Conforme perdiam território para os rivais demoníacos, perceberam que o único jeito de estancar a maré era privá-los das almas pecadoras que as Fendas usam para gerar demônios novos. Não têm conceito de como impedir o pecado mudando o jeito dos mortais agirem, mas entendem que exterminar a vida mortal também resolveria o problema.",
      },
      {
        id: "qlippoth-lords",
        title: "Senhores qlippoth",
        body: "Os qlippoths mais poderosos são quase-deidades, entidades antigas raramente cultuadas por quem não é qlippoth. Dessas divindades monstruosas, a Praga Polimorfa, Yamasoth, é bem conhecida como criadora dos gongorinans. Outros incluem Chavazvug, o Inferno Rastejante; Isph-Aun-Vuln, o Banquete Interior; e Thuskchoon, o Sempre-Glutão.",
      },
      {
        id: "qlippoth-realms",
        title: "Reinos qlippoth",
        body: "Embora seja aceito que qlippoths perderam território incalculável nas Fendas Exteriores para a demoniada, esses capetas ainda controlam regiões vastas nas profundezas daquele plano. Alguns sábios sugerem a possibilidade inquietante de que talvez ainda detenham mais território do que os demônios, mas, como demônios se preocupam mais com a vida mortal, simplesmente interagimos mais com as fendas que eles controlam. Pelo que sabemos, postulam esses sábios sombrios, as Fendas fervilham de enxames sem fim de qlippoths que ainda não moveram peça contra a vida mortal.",
      },
    ],
  }),
  fam({
    id: 'family-globster',
    name: 'Globster',
    originalName: 'Globster',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Globster',
    intro:
      'A maré lava à praia todo tipo de detrito. O globster muitas vezes é confundido com um cadáver de baleia — e a suposição não é de todo errada: essas massas sem mente são compostas de criaturas marinhas em decomposição, fundidas num monte nauseante de lodo gorduroso. Embora sem mente, são predadores que buscam presa viva, no fundo do mar ou na costa. Consistem em tanta gordura e tecido oleoso que podem ser coletados para azeite de candeia, graxa e gordura de cozinha — se der para aguentar o cheiro.\n\nConsomem criaturas vivas, mas só digerem uma parte. O resto se acumula até o globster, inchado, vomitar um globster novo. Um globster com dross suficiente para criar outro o faz automaticamente como ação livre disparada ao sofrer dano. Pelo que os estudiosos sabem, esse é o único jeito de a espécie se reproduzir.',
    sections: [],
  }),
  fam({
    id: 'family-mantis',
    name: 'Louva-a-deus',
    originalName: 'Mantis',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Giant%20Mantis',
    intro:
      'Esses predadores têm patas dianteiras relâmpago e uma mordida que quebra osso. Os primos enormes dos louva-a-deus comuns são mais altos que um humano médio e emboscam com o mesmo golpe súbito dos insetos menores.',
    sections: [],
  }),
  fam({
    id: 'family-elephant',
    name: 'Elefante',
    originalName: 'Elephant',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Elephant',
    intro:
      'Imediatamente reconhecíveis pela tromba preênsil longa e pelas presas impressionantes, elefantes têm características diferentes conforme o lugar. São usados como besta de carga em muitas regiões, mas são extremamente espertos e precisam ser tratados com grande cuidado. Quem vive perto aprendeu a ter cautela ao irritá-los: até um único elefante enfurecido é devastador, e uma manada assustada pode destruir uma aldeia.',
    sections: [
      {
        id: "ivory",
        title: "Marfim",
        body: "As presas de elefante são tesouro muito cobiçado: o marfim de uma só presa pode valer centenas de peças de ouro. Quem valoriza a presença majestosa do elefante é defensor apaixonado das criaturas, tornando a caça ao marfim perigosa.",
      },
    ],
  }),
  fam({
    id: 'family-orca',
    name: 'Orca',
    originalName: 'Orca',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Orca',
    intro:
      'Embora muita gente as conheça como “baleias assassinas”, orcas são a maior espécie de golfinho. Esses animais poderosos caçam juntos em pods para derrubar focas, tubarões e até baleias. Adultas em geral medem 4,5–7,5 m e pesam várias toneladas.',
    sections: [],
  }),
  fam({
    id: 'family-phantom',
    name: 'Fantasma',
    originalName: 'Phantom',
    trait: 'Phantom',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Phantom%20Knight',
    intro:
      'A trajetória típica das almas rumo ao além é relativamente direta, segundo a maioria dos teólogos: o mortal morre, a alma entra no Rio das Almas e chega ao Ossário, onde Pharasma julga. A alma julgada segue ao domínio de descanso final e vira um shade.\n\nComplicações surgem quando uma alma na fila do julgamento sai cedo do Rio e é empurrada ao Plano Etéreo — por daemons, bruxas, magia planar maligna ou até o destino. Essas almas saem da ordem natural da vida e da morte e ficam num tipo de purgatório. Diferente de peticionários, esses fantasmas etéreos retêm memórias da vida; diferente de espíritos como fantasmas mortos-vivos, não estão tingidos das influências vis da morte-viva — pelo menos no começo, embora a ameaça de corrupção pese sobre a existência. Alguns sucumbem; outros eventualmente reentram no Rio. Até lá, são um povo sem lar, agenda ou propósito verdadeiros, e precisam achar o caminho de volta ao Rio para serem julgados.',
    sections: [
      {
        id: "finding-the-way-home",
        title: "Achando o caminho de casa",
        body: "Fantasmas que buscam escapar da não-vida mas ainda não estão prontos para seguir em frente podem formar laços com invocadores, usando a força de personalidade do invocador como porto seguro para a própria alma. Um fantasma ligado a um invocador e manifestado por ele mantém forma ectoplásmica, mas em última instância corpórea.",
      },
      {
        id: "passionate-souls",
        title: "Almas apaixonadas",
        body: "Muitos fantasmas se manifestam como resultado de ondas literais no Rio das Almas, causadas pelas próprias emoções poderosas que os lavam à margem. Isso leva a muitos com habilidades de tema emocional. As mais comuns são raiva, dedicação, medo, ódio, ciúme, miséria e zelo.",
      },
    ],
  }),
  fam({
    id: 'family-genie',
    name: 'Gênio',
    originalName: 'Genie',
    trait: 'Genie',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Jann',
    intro:
      'Antes da história mortal, gênios foram algumas das primeiras criações do cosmos a possuir livre-arbítrio. Formados de matéria elemental, atravessaram o Universo e os seis planos elementais de ar, terra, fogo, metal, água e madeira. Os que permaneceram em cada plano tiveram a matéria substituída por aqueles elementos. Gênios de metal e madeira aparecem em Rage of Elements.\n\nGênios mais velhos, sábios e poderosos ganham o título de shuyookh (em geral “sheikha” se for mulher ou “sheikh” se for homem). Em geral pelo menos 5 níveis acima do exemplo típico da estirpe, um shuyookh ganha magias extras. O mais maravilhoso dos poderes é conceder desejos três vezes por ano — não uma habilidade inata, mas uma prática ritual passada adiante na tentativa de replicar as capacidades dos janns.',
    sections: [],
  }),
]
