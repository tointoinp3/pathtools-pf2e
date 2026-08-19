import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE_2 = 'Monster Core 2'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE_2, ...partial }
}

/**
 * Lore de família Remaster para o 7º lote do Monster Core 2.
 * Famílias já existentes (kami, daemon, anjo, darvakka, azata, aeon,
 * andarilho-enxame, diabo, psicopompo, arconte, sahkil, demônio, ninfa,
 * asura, agathion, velstrac, proteano) não se repetem.
 */
export const catalogCreatureFamiliesMonsterCore2Batch7: CreatureFamily[] = [
  fam({
    id: 'family-totum-font',
    name: "Fonte Totum",
    originalName: "Totum Font",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Totum%20Font",
    intro:
      "Antes de mortais, fey ou até gênios, totum fonts foram as primeiras criaturas nascidas de seis elementos indivisos e harmoniosos. Das fontes brotaram novos filhos elementais, e elas auxiliaram os deuses nos muitos atos de criação que viriam a seguir.",
    sections: [],
  }),
  fam({
    id: 'family-wemmuth',
    name: "Wemmuth",
    originalName: "Wemmuth",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Wemmuth",
    intro:
      "Fertilizados por grandes quantidades de sangue derramado, como o encontrado em campos de batalha manchados de sangue ou nas regiões devastadas pela guerra ao redor de cidades sitiadas, wemmuths são faixas vis de vinhas que extraem sustento do sofrimento mortal, lambendo sangue como água. Possuem inteligência rudimentar e sede inextinguível por sangue, ficando à espreita durante a maior parte de suas vidas e crescendo a tamanho incrível no solo ensanguentado de seus lares macabros. O corpo de um wemmuth compreende vinhas escassamente mais grossas que uma corda, e um único sistema adulto de wemmuth consiste em seis toneladas de vinhas, o bastante para se estender por 1.800 m se dispostas de ponta a ponta numa única linha reta. Wemmuths nunca se orientam dessa forma, porém, preferindo em vez disso envolver-se em montes maciços com aproximadamente 4,5 m de largura e igual espessura. A criatura condensa toda sua massa numa esfera de espinhos afiados e vinhas açoiteantes, parecendo um arbusto roliço odioso do tamanho de um elefante. Wemmuths comumente desenterram pedras maciças ou árvores inteiras do chão e as incorporam à sua massa roliça, usando esses objetos para reforçar sua defesa contra muitas formas de ataque ou para arremessá-los contra inimigos distantes com precisão aterradora.\n\nAlguns especulam que wemmuths são uma forma de corrupção diabólica solta sobre Golarion pela Casa Thrune de Cheliax, talvez como tática de terra arrasada contra seus rivais. Nobres influentes de Nirmathas e Molthune apontam um para o outro como responsáveis pela criação do wemmuth, Nirmathas citando os laços estreitos de Molthune com a infernal Cheliax e Molthune culpando a magia primal comumente empregada pelos muitos druidas e patrulheiros de Nirmathas. Vários contos varisianos descrevem criaturas que correspondem de perto à descrição do wemmuth tentando prender um famoso trapaceiro folclórico, enquanto cruzados de Mendev aderem à crença de que os wemmuths foram uma praga desencadeada sobre Golarion por Deskari, antigo senhor demônio dos gafanhotos, antes de sua derrota nas mãos de heróis mortais.",
    sections: [],
  }),
  fam({
    id: 'family-sumbreiva',
    name: "Sumbreiva",
    originalName: "Sumbreiva",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Sumbreiva",
    intro:
      "Sumbreivas são os caçadores imparáveis do Vazio, rastreando e destruindo outras criaturas em seu plano por esporte e prática. Ocasionalmente, passam por uma fissura ou são trazidos ao Universo via um círculo de vinculação, onde colecionam almas vivas para exibir como troféus.\n\nSumbreivas se reúnem em Pavilhões Noturnos, onde treinam e exibem seus troféus de almas, que aparecem como volutas flutuantes de energia azul. Quanto mais formidável a alma, mais intensa a luz azul que emana dela. Sumbreivas em pavilhões periodicamente invadem o Universo numa Caçada Noturna e competem para ver quem consegue trazer de volta os troféus de almas mais brilhantes. O vencedor da Caçada Noturna lidera o pavilhão até a próxima caçada. Pavilhões Noturnos são classificados uns contra os outros pelos feitos dos caçadores dentro deles. Todos os sumbreivas desejam capturar uma alma poderosa o bastante para lhes garantir colocação no Pavilhão Crepuscular, reservado às almas e caçadores verdadeiramente de elite.",
    sections: [],
  }),
  fam({
    id: 'family-radiant-warden',
    name: "Guardião Radiante",
    originalName: "Radiant Warden",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Radiant%20Warden",
    intro:
      "Os enigmáticos e estranhos guardiões radiantes foram construídos há milhares de anos para proteger observatórios e eruditos contra a incursão de agressores alienígenas do Domínio do Negro. Com o tempo, seus papéis como guardiões se expandiram para incluir vigiar qualquer região onde as leis do tempo e do espaço se desgastaram, particularmente perto de portais e portões permanentes entre planetas, planos ou dimensões.\n\nNomeados tanto pela natureza radial dos anéis concêntricos que compõem seus corpos quanto pelo brilho radiante de seus ataques, guardiões radiantes continuam suas ordens, defendendo sítios de invasão com propósito inabalável.",
    sections: [],
  }),
  fam({
    id: 'family-vaspercham',
    name: "Vaspercham",
    originalName: "Vaspercham",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Vaspercham",
    intro:
      "Vasperchams são horrores aquáticos que deleitam-se com a violência, espreitando nas águas rasas perto de costas. Uma vez que um vaspercham se instala num lar, permanece teimosamente ali, independentemente de quaisquer comunidades que habitem por perto. A força física e as habilidades de distorção mágica de um vaspercham tornam-no incrivelmente difícil de desalojar uma vez instalado. Vasperchams respondem apenas à força, então é preciso vencê-los em combate para obter sua cooperação relutante. Mas uma vez que um vaspercham recupera sua força, inevitavelmente trai qualquer aliança temporária.",
    sections: [],
  }),
  fam({
    id: 'family-adamant-sentinel',
    name: "Sentinela de Adamantina",
    originalName: "Adamant Sentinel",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Adamant%20Sentinel",
    intro:
      "Forjadas de um metal quase indestrutível de grande raridade, sentinelas de adamantina não podem ser destruídas exceto pelos inimigos mais poderosos. Forjar uma sentinela de adamantina requer uma quantidade de adamantina tão massiva que coletá-la geralmente exige montar uma expedição de mineração a um planeta distante, ao Plano da Terra ou a um Plano Exterior.",
    sections: [],
  }),
  fam({
    id: 'family-shoggoth',
    name: "Shoggoth",
    originalName: "Shoggoth",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Shoggoth",
    intro:
      "Enquanto fanáticos delirantes e profetas apocalípticos afirmam desesperadamente que o monstruoso shoggoth não passa de uma visão induzida por drogas ou pesadelo irreal, a verdade é bem mais grave. Shoggoths existem, mas tendem a permanecer nas trincheiras oceânicas mais profundas ou nas cavernas e ruínas mais remotas, emergindo apenas para espalhar caos e destruição em seus rastros viscosos.\n\nOs primeiros shoggoths foram criados por uma espécie alienígena para servir como bestas de carga insensatas. Seu vasto volume e natureza amorfa os tornaram úteis para muitos tipos de trabalho, e sua habilidade de formar espontaneamente novos olhos, bocas ou outros órgãos os tornou incrivelmente versáteis. Eventualmente, desenvolveram inteligência suficiente para se rebelar contra seus mestres, e agora espreitam nas profundezas sem luz.\n\nUm shoggoth tem objetivos insondáveis para seres humanoides. Lembram seus eons de servidão, e comparados a seus mestres misteriosos, outros seres sencientes são meros pontos que rastejam sobre a superfície, indistinguíveis de animais. Quando rolam seu corpo hediondo sobre um bando de exploradores, engolindo-os numa prensa gelatinosa de dentes roedores, não é tanto maldade quanto indiferença.\n\nShoggoths podem tornar-se objeto de culto para seitas dedicadas ao caos e à entropia. Não respondem a essa adoração, mas podem-se contar com eles para consumir qualquer vítima que a seita sacrifique. Rumores de shoggoths com intelectos ainda maiores são, espera-se, apenas isso, pois o dano que um capaz de raciocínio superior poderia causar ao mundo é perturbador, para dizer o mínimo.",
    sections: [],
  }),
  fam({
    id: 'family-tzitzimitl',
    name: "Tzitzimitl",
    originalName: "Tzitzimitl",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Tzitzimitl",
    intro:
      "Devido à sua afinidade com a escuridão e o terror apocalíptico, tzitzimitls são amplamente temidos como arautos da morte e da destruição. Um eclipse solar marca sua chegada, e extraem estranhos poderes de escuridão e eletricidade desses fenômenos. Alguns sábios acreditam que tzitzimitls são instrumentos dos deuses, convocados para destruir mundos cujo tempo chegou, enquanto outros afirmam que são os restos mortos-vivos de exilados de uma civilização distante de gigantes viajantes do espaço. Tais lendas são antigas e fragmentadas, mas algumas falam de tzitzimitls derrotados por grandes heróis e selados — embora esses contos impliquem que os enormes mortos-vivos agora jazem enterrados e à espera, em breve a devastar de novo se suas tumbas forem violadas.",
    sections: [],
  }),
  fam({
    id: 'family-baomal',
    name: "Baomal",
    originalName: "Baomal",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Baomal",
    intro:
      "Poucos monstros marinhos são tão temidos quanto o baomal de duas cabeças. Esses predadores massivos tipicamente habitam as águas mais profundas, competindo com krakens e outros colossos por comida. Subsistem de baleias e outras grandes criaturas marinhas, muitas vezes seguindo-as até a superfície da água durante uma caçada. Perto da superfície, baomals que encontram navios aprendem rapidamente que contêm uma variedade de petiscos saborosos. As enormes feras usam seus espinhos devastadores para rasgar os cascos dos navios, depois se alimentam com calma dos marinheiros indefesos.",
    sections: [],
  }),
  fam({
    id: 'family-spawn-of-rovagug',
    name: "Proles de Rovagug",
    originalName: "Spawn of Rovagug",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=621",
    intro:
      "Embora o deus destruidor Rovagug jaz preso no núcleo do planeta como uma mosca em âmbar, aprisionado desde a Era da Criação por uma coalizão de divindades, sua jaula enfraqueceu com o passar do tempo, permitindo que sua influência vaze e tome forma como calamidades vivas conhecidas como Proles de Rovagug. Essas criaturas colossais assolam Golarion há eras; seus rompantes são responsáveis por montanhas despedaçadas, desertos devastados e oceanos que agora enchem crateras na terra, e suas habilidades regenerativas garantem que sejam uma ameaça eterna, nunca totalmente mortas. O fato de criaturas de destruição absoluta manterem um domínio tão inextinguível sobre a vida é um paradoxo que estudiosos lutam para resolver. Alguns acreditam que cada Prole possui o menor fragmento das bênçãos de seu progenitor divino; outros sustentam que sua imortalidade vem da destruição que causam, ganhando um futuro eterno por cada um roubado de suas vítimas.\n\n Relatos dos ataques das Proles ao longo da história compartilham um fio condutor estranho: cada ataque é seguido por uma era dourada notável, ainda que breve, para a região. Enquanto a maioria atribui isso à cooperação necessária para repelir ou, no mínimo, sobreviver às depredações de uma Prole, alguns veem nisso um sinal retorcido de que as criaturas são portadoras de uma paz \"verdadeira\". Esses crentes frequentemente lideram cultos empenhados em convocar ou reviver qualquer Prole recentemente abatida.\n\n Embora muitas das Proles não sejam vistas há anos, a morte do deus Gorum — um dos arquitetos originais do Cofre Morto — enfraqueceu o selo mais uma vez, enviando uma ondulação da vontade de Rovagug por toda Golarion. Como em resposta, muitas de suas Proles começaram a ressurgir, alarmando líderes, estudiosos e guerreiros de Golarion. Afinal, se uma única Prole é um desastre que define uma geração, exigindo o sacrifício de exércitos apenas para minimizar o dano que pode causar, que destruição inimaginável ocorreria se todas despertassem de uma vez?\n\n As Proles de Rovagug são diversas em forma e capacidades destrutivas, mas todas possuem as seguintes habilidades.\n\n **Regeneração Absoluta** Funciona como regeneração, embora exija ações muito específicas para ser desativada. A regeneração de uma Prole de Rovagug é poderosa o bastante para revivê-la mesmo se abatida por um efeito de morte. Se a Prole falhar em uma salvaguarda contra um efeito que a mataria instantaneamente, ela se ergue da morte 3 rodadas depois com 1 PV. Uma Prole ainda pode ser banida, aprisionada ou transportada para longe como meio de salvar uma região, ou mantida em estado de morrendo por um efeito que cause dano constante.\n\n **Armagedom Adormecido** Proles de Rovagug podem dormir por séculos em uma hibernação regenerativa. Enquanto adormecida, uma Prole não precisa comer, beber ou mesmo respirar, e suas resistências dobram de valor. Ela não pode ser localizada por efeitos de detecção, revelação ou vidência, e para qualquer salvaguarda usa o resultado um grau de sucesso melhor que o obtido. Sem saída enquanto a Prole dorme, suas energias destrutivas colossais se voltam para fora e infectam os arredores, fazendo com que desastres naturais de um tipo correspondente à Prole ocorram com mais frequência e maior severidade em uma emanação de 1,6 km do local de repouso da Prole, aumentando o raio em aproximadamente 1,6 km a cada década em que a Prole permanece adormecida.",
    sections: [
      {
        id: "lesser-spawn-of-rovagug",
        title: "Proles Menores de Rovagug",
        body: "A história de Golarion inclui relatos de criaturas colossais que, embora não sejam comprovadamente Proles de Rovagug, ganharam o título de \"proles menores\" por sua ferocidade e habilidades regenerativas semelhantes. Lendas dizem que o Velho Jatembe, a Leoparda Azul e mais de 100 Magos do Sol da Tempestade aprisionaram o insetoide Agohbindi, a Criança Estilhaçada, em uma floresta de raízes retorcidas perto do rio Vanji antes de liquefazer o corpo da criatura. Cultistas de Rovagug libertaram um behemoth trovejante chamado Djakobu contra o jovem Império Shory; a magia inventada para sua derrota trouxe uma era de prosperidade ao império. O Devorador do Cervo Cinzento, semelhante a um caranguejo de muitas cabeças, aterrorizou a área que se tornaria Irrisen e foi expulso pelo Cervo Branco Sombrio, arauto de Erastil.",
      },
      {
        id: "other-spawn",
        title: "Outras Proles",
        body: "Contos e mitos detalham outras Proles de Rovagug que apareceram em Golarion. Chemnosit, o Verme Monarca, é temido por toda a Escuridão. Kothogaz, a Dança da Desarmonia, supostamente matou um milhão de vudranos em Casmaron antes de ser derrotado por um psíquico poderoso. Depois que o besouro titânico Ulunat, o Primeiro Profano, foi finalmente frustrado, os antigos osirianos formaram a cidade de Sothis em torno de sua carapaça. O cadáver de Xotani, o Sangrador de Fogo, repousa nas profundezas do Monte Pálido, em Katapesh, aparentemente ainda impregnado do mais tênue vislumbre de vida.",
      },
      {
        id: "spawn-in-your-campaigns",
        title: "Proles em Suas Campanhas",
        body: "Derrotar (ou mesmo apenas sobreviver a) uma Prole de Rovagug deve ser um evento importante em qualquer campanha. Pode até ser a culminação de várias aventuras, enquanto os personagens pesquisam maneiras de impedir que a Prole ressurja imediatamente após ser abatida e reúnem aliados necessários para o combate. Ao longo do caminho, os PJs também podem ter de lidar com desastres naturais precipitados pela aproximação da Prole e com sacerdotes de Rovagug que acreditam que o rompante da Prole libertará seu deus.",
      },
      {
        id: "verex-that-was",
        title: "Verex-Que-Foi",
        body: "Nem mesmo os deuses são imunes à influência funesta de Rovagug. Enquanto buscava meios de maior poder, o deus orc Verex, o Saqueador, foi capturado pelas energias corruptoras do Cofre Morto e quase foi destruído em sua fuga. Entretanto, quando uma gota do sangue de Gorum caiu sobre seu corpo quebrado, ele foi transformado em uma Prole de Rovagug horrível e retorcida. Leia mais sobre essa ameaça mítica em _Pathfinder War of Immortals_.",
      },
    ],
  }),
  fam({
    id: 'family-green-man',
    name: "Homem Verde",
    originalName: "Green Man",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Green%20Man",
    intro:
      "Homens verdes são deidades menores antigas e enigmáticas das florestas primevas, encarnações vivas da natureza e do reino vegetal. Quando uma floresta ou outro terreno arborizado gera espíritos da natureza suficientes, seres com o mesmo tipo de essência vital que encarna leshies ou responde ao chamado de uma comunhão naturalmente se coalescem e se apoteosam num homem verde. Homens verdes não se preocupam com todos os processos multifacetados da natureza como Gozreh ou muitas outras deidades da natureza. Em vez disso, concentram quase toda sua atenção nas plantas de seu lar, preocupando-se com animais, minerais e similares apenas na medida em que afetam as plantas. Apesar do nome, homens verdes não são necessariamente masculinos; como criaturas de puro poder natural, para muitos deles o conceito de gênero não tem significado, e para aqueles que o têm, podem ser de qualquer gênero.\n\nA maioria dos homens verdes tende a ignorar animais, que para eles incluem criaturas sencientes como humanos. Porém, homens verdes que se envolvem nos assuntos de tais criaturas existem. Esses indivíduos são bem mais propensos a tentar espalhar sua influência longe e amplamente, seja para o bem ou para o mal. Homens verdes virtuosos proporcionam socorro a todos que entram em seu lar, não apenas às plantas, oferecendo sabedoria como um pai ou mãe acolhedor. Homens verdes perversos, porém, permitem que plantas raras e perigosas prosperem em seus domínios espalhando medo e devastação a todos que possam ameaçar a vida vegetal, embora possam manter alguns animais por perto para caçar por esporte.",
    sections: [],
  }),
  fam({
    id: 'family-fetchling',
    name: "Fetchling",
    originalName: "Fetchling",
    trait: "Fetchling",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=593",
    intro:
      "O povo conhecido hoje como fetchlings é uma ancestralidade distinta descendente de gerações de humanos que ficaram presos há eras no Mundo Inferior. Já não são humanos de forma alguma; essas pessoas, que se chamam kayals, tornaram-se monocromáticas na coloração, com tons de pele e cores de cabelo variando entre branco, preto e todos os matizes de cinza. Seus membros são esguios e flexíveis, e seus olhos são geralmente amarelo sólido, amarelo-esverdeado ou brancos, embora raros tenham um brilho roxo ou azul. Fetchlings desenvolveram suas próprias sociedades complexas no Mundo Inferior, frequentemente sob a tolerância ou em servidão às estranhas criaturas malignas dali, como sinistros velstracs ou enigmáticos d'ziriaks. Embora fetchlings individuais tenham suas próprias moralidades e códigos, todos são sobreviventes em um ambiente hostil, o que leva a uma tendência ao pragmatismo. A vestimenta fetchling imita as regiões em que habitam, com cores sóbrias tendendo a tons mais escuros. Quando negociam com humanos ou outras sociedades no Universo, frequentemente usam máscaras ou roupas que ocultam a aparência.\n\n Comunidades fetchling típicas são insulares e fecham fileiras rapidamente diante de um intruso. Embora fetchlings individuais não se importem de viajar e se misturar a outras sociedades para facilitar o comércio, frequentemente se escondem ou até reagem defensivamente se recebem visitantes. Quando se considera a natureza dos outros habitantes do Mundo Inferior, porém, essa tendência de presumir o pior dos intrusos pode fazer sentido. Comunidades fetchling no Universo são raras, mas existem em pequenos bolsões. Essas comunidades tendem a ser um pouco mais abertas que as do Mundo Inferior. Muitos aventureiros fetchling originam-se desses enclaves, pois a curiosidade de ver o mundo além das sombras é frequentemente difícil de saciar.",
    sections: [
      {
        id: "masters-of-adaptation",
        title: "Mestres da Adaptação",
        body: "Kayals entendem que muitas culturas no Universo os veem com suspeita ou até medo, e se esforçam para se adaptar às culturas com as quais desejam estabelecer comércio. Infelizmente, a maestria dos kayals em adaptação cultural frequentemente sai pela culatra, alimentando temores de que os chamados \"fetchlings\" sejam uma força invasora que busca duplicar e substituir aqueles com quem apenas desejam fazer negócios.",
      },
    ],
  }),
  fam({
    id: 'family-geniekin',
    name: "Geniekin",
    originalName: "Geniekin",
    trait: "Geniekin",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=595",
    intro:
      "Geniekins são mortais cuja ancestralidade se entrelaçou com o sangue de gênios ou outras criaturas elementais, fazendo com que manifestem poderes elementais extraídos dos Planos Elementais. Embora os geniekins apresentados aqui sejam todos de descendência humana, geniekins e outros crios planares podem descender de outras ancestralidades.",
    sections: [
      {
        id: "extraplanar-humanoids",
        title: "Humanoides Extraplanares",
        body: "Existe uma distinção importante entre crios planares e humanoides extraplanares, como fetchlings. Fetchlings e outros humanoides extraplanares representam grupos ancestrais verdadeiros, com identidades físicas e culturais e tradições próprias. Crios planares são membros de ancestralidades diversas que compartilham uma herança semelhante de seres extraplanares e, com exceção das undines, tipicamente se integram a outras sociedades humanoides em vez de construir as suas.",
      },
      {
        id: "geniekin-on-golarion",
        title: "Geniekins em Golarion",
        body: "Embora a maioria dos crios planares geniekin viva no plano ancestral de seu genie progenitor, fontes raras de poder elemental ou atividade de gênios às vezes dão origem a geniekins em Golarion. De longe, geniekins são encontrados com mais frequência em Katapesh, pois gênios são mais prevalentes lá que em outras regiões devido à história da nação de vincular gênios.",
      },
      {
        id: "other-planar-scions",
        title: "Outros Crios Planares",
        body: "Crios planares descendentes de habitantes da Esfera Exterior são conhecidos como nephilim e incluem aphorites ordenados e ganzis amantes do caos, ambos apresentados nas páginas seguintes. Além disso, kjosas têm o sangue de einherjars e valquírias em suas veias, e asuras demoníacas podem gerar um nephilim faultspawn.",
      },
    ],
  }),
  fam({
    id: 'family-samsaran',
    name: "Samsaran",
    originalName: "Samsaran",
    trait: "Samsaran",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=619",
    intro:
      "Uma conexão única com o ciclo de vida e morte define as vidas mortais dos samsarans. Com tendência ao reclusivismo, samsarans têm constituição delicada, olhos enigmáticos e sem pupilas, e sangue tão límpido quanto água. Quando um samsaran morre, seu corpo desaparece e sua alma reencarna instantaneamente em uma criança recém-nascida em outro lugar do mesmo plano: geralmente outro samsaran, mas ocasionalmente um humanoide de ancestralidade diferente.\n\n Embora todos os samsarans tenham compreensão inata de sua natureza, lembram conscientemente pouco de suas vidas anteriores. Alguns, porém, são ocasionalmente atingidos por memórias fragmentadas ou lampejos de déjà vu ligados a uma existência passada, o que pode render-lhes reputação de sabedoria e perspicácia sobrenaturais. A maioria dos samsarans prefere levar vidas estudiosas repletas de momentos de reflexão profunda. Seu olhar permanece no eterno e na iluminação, reduzindo o apelo de ganhos materiais de curto prazo. Um samsaran cessa seu ciclo de reencarnação apenas ao atingir um estado perfeito de iluminação — ou ao se afastar tanto da harmonia que segue para uma vida após a morte condenada.\n\n O lar ancestral dos samsarans fica em Zi Ha, uma nação montanhosa remota em Tian Xia. Essas montanhas traiçoeiras ajudam a garantir a solidão que a maioria dos samsarans prefere, e são ainda protegidas por ilusões desorientadoras, proteções defensivas e fortificações seguras.",
    sections: [
      {
        id: "the-eternal-cycle",
        title: "O Ciclo Eterno",
        body: "Samsarans raramente têm filhos, mas quando o fazem, essa prole compartilha a mesma ancestralidade mortal da primeira encarnação dos pais. Crianças samsaranas são enviadas para serem criadas na sociedade mortal, onde vivem vidas muito parecidas com as de seus parentes adotivos. Essa prole frequentemente reencarna como samsarans. Esse influxo de novas almas equilibra aqueles que, após levar uma existência aperfeiçoada ou falhar em alcançar a iluminação, finalmente seguem para o Rio das Almas.",
      },
    ],
  }),
  fam({
    id: 'family-vanara',
    name: "Vanara",
    originalName: "Vanara",
    trait: "Vanara",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=631",
    intro:
      "Vanaras são humanoides semelhantes a macacos que habitam vilas nas copas das árvores, bem alto nas copas de selvas exuberantes e florestas verdejantes. Como os macacos a que se assemelham, vanaras manifestam uma grande variedade de cores de pelagem, tipos corporais e traços faciais, mas todos compartilham dedos e dedos dos pés longos e ágeis, além de mentes ágeis e curiosas. Muitos aprendem a usar as caudas para manipular objetos com destreza.\n\n Vanaras têm uma cultura amigável, com a maioria dos indivíduos buscando equilíbrio ou iluminação em suas vidas. Sua propensão à travessura e história de combate ao mal lhes renderam muitos inimigos ancestrais e, por isso, geralmente fazem seus lares longe de áreas urbanas. A maioria dos assentamentos vanara fica no sudeste de Casmaron, entre as selvas exuberantes onde se originaram. A devoção ao treinamento monástico e ao estudo religioso levou a populações secundárias no Impossível Reino de Jalmeray, no leste de Katapesh, em Tian Xia e no nordeste de Nex. Ainda assim, jovens vanaras tomados pela vontade de viajar podem percorrer grandes distâncias pelo mundo, e viajantes de terras distantes podem, por sua vez, visitar comunidades vanara em busca da sabedoria de seus anciãos e sábios.\n\n A cultura vanara frequentemente coloca seu desejo inato por travessuras em tensão com o desejo de transcender tais origens, levando muitos vanaras a estudar práticas monásticas. Também valorizam contos de vanaras heroicos do passado, buscando nesses ícones inspiração para suas próprias vidas. A maioria dos vanaras é rápida em oferecer ajuda a quem está em perigo e raramente hesita diante do mal, não importa o perigo que este represente. Os líderes das vilas vanara tendem a ser figuras religiosas ou, ocasionalmente, outros com valores e experiência semelhantes. Vanaras veneram Ragdya, o Sábio da Montanha, que encoraja buscar a iluminação por meio da ação no mundo e vê virtude em pegadinhas e humor.",
    sections: [
      {
        id: "the-hero-and-the-king",
        title: "O Herói e o Rei",
        body: "A lenda diz que um herói humano suplicou a um exército vanara que ajudasse a derrotar um rakshasa imortal. Depois que o inimigo caiu, o herói fez um pacto com o rei dos vanaras de que, se qualquer um de seus povos fosse ameaçado novamente por rakshasas, o outro viria em seu auxílio.",
      },
    ],
  }),
  fam({
    id: 'family-wayang',
    name: "Wayang",
    originalName: "Wayang",
    trait: "Wayang",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=633",
    intro:
      "Em tons baixos, pessoas supersticiosas contam às crianças histórias de wayangs — sombras vivas que saem à noite para devorar crianças malcriadas. Na maior parte, essas histórias são apenas ficções de mentes temerosas, mas é verdade que os wayangs eram originalmente criaturas de sombra, à beira entre luz e escuridão. Os ancestrais dos wayangs de hoje embarcaram em um grande êxodo há cerca de 10.000 anos, deixando seu Mundo Inferior nativo em busca de um novo lar. Em Golarion, encontraram uma grande catástrofe que havia bloqueado o sol atrás de uma nuvem de fumaça e cinzas, envolvendo o planeta em uma noite aparentemente sem fim, e ali fizeram seu novo lar. Quando a luz retornou, os wayangs recuaram para os lugares sombrios que puderam encontrar, evitando contato com humanos e outros povos da luz, que viam os pequenos seres magros como lembretes suspeitos de tempos difíceis.\n\n Muitos grupos wayang são nômades, embora outros tenham comunidades estabelecidas. Alguns vivem em casas escavadas em cavernas naturais, onde criam obras de arte a partir de estalagmites e outras formações naturais. Outros vivem em vilas nas copas das árvores em florestas tropicais onde a luz do sol mal penetra o dossel espesso da floresta. Wayangs são mais numerosos no sudeste de Tian Xia, especialmente no arquipélago de Minata, também conhecido como Ilhas Errantes, mas suas viagens às vezes os levam a terras ainda mais distantes.\n\n Apesar da reputação sinistra e da natureza reservada, wayangs são criaturas alegres que contam histórias e expressam emoções por meio de canto-sussurro, dança e teatro de sombras, aprimorando apresentações com magia de sombra. Da mesma forma, tecem magia de sombra em seus estilos de luta mortais, mas wayangs não são um povo violento, geralmente lutando apenas para proteger o que é seu. Wayangs decoram os cabelos espessos com contas e a pele escura com pontos brancos tatuados que formam imagens, cada imagem contando silenciosamente histórias sobre a história da família ou sua devoção a várias divindades da sombra.",
    sections: [
      {
        id: "wayang-whisper-song",
        title: "Canto-Sussurro Wayang",
        body: "Wayangs estão acostumados a viver escondidos, e suas artes e cultura se adaptaram de acordo. Como consequência, wayangs preferem apresentações silenciosas a barulhentas. Mesmo assim, adoram cantar e, por isso, criaram uma forma de arte conhecida como canto-sussurro wayang. Músicos wayang são habilidosos em cantar em frequências e registros que variam de tons suaves que o público pode sentir apenas como vibrações na pele a sussurros ressonantes audíveis a até 90 metros de distância.",
      },
    ],
  }),
  fam({
    id: 'family-jotunborn',
    name: "Jotunborn",
    originalName: "Jotunborn",
    trait: "Jotunborn",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=603",
    intro:
      "Jotunborn são humanoides grandes com conexões indiretas com gigantes antigos como titãs. Nos dias antigos, jotunborn serviram aos deuses como guardiões de novos mundos. Viviam em um reino subplanar entre o Universo mortal e o Plano Etéreo conhecido como Fray, e emergiam conforme necessário para cuidar dos mundos que vigiavam. Essas associações planares concederam aos jotunborn habilidades únicas, incluindo a capacidade de viajar entre planos e moldar os aspectos físicos do Universo. Atualmente, muitos jotunborn tiveram suas habilidades planares diminuídas ou interrompidas, e agora são mais comuns no Universo. As habilidades originais dos jotunborn diminuíram de poder com o tempo. O que antes era um povo capaz de teletransporte a grandes distâncias ou de remodelar cordilheiras montanhosas é agora um grupo com habilidades mágicas menores. Essas habilidades podem crescer em poder, porém, geralmente à medida que um jotunborn envelhece, se torna mais sintonizado com energias planares ou tece mais seda de iivlar em sua pele. Magos e guerreiros jotunborn particularmente habilidosos são capazes de façanhas que rivalizam com as de seus antepassados.\n\n Jotunborn que vivem no Universo mortal tendem a levar vidas reclusas. Muitas outras ancestralidades confundem jotunborn com gigantes do gelo ou gigantes das nuvens devido ao tamanho e à coloração da pele de um jotunborn. Essa confusão pode levar a medo ou hostilidade, reação que a maioria dos jotunborn prefere evitar. Devido às dificuldades de viver no Fray, muitos jotunborn são ferozmente leais àqueles em quem confiam. Essas lealdades ajudam a manter outros jotunborn vivos, e esses sentimentos se estendem a qualquer pessoa que faça amizade com um jotunborn.",
    sections: [
      {
        id: "iivlars-and-jotunborn",
        title: "Iivlars e Jotunborn",
        body: "Ao viver no Fray, jotunborn fazem uso de uma fauna local conhecida como iivlars. Essas criaturas insetoides produzem sedas especiais que brilham com luz. Jotunborn tecem essas sedas em sua pele tanto para ajudar a localizar uns aos outros na escuridão do Fray quanto como sinais de status ou habilidade. Iivlars são particularmente importantes para a cultura jotunborn, e prejudicar intencionalmente um iivlar é uma ofensa grave.",
      },
    ],
  }),
  fam({
    id: 'family-kitsune',
    name: "Kitsune",
    originalName: "Kitsune",
    trait: "Kitsune",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=605",
    intro:
      "Kitsunes são humanoides semelhantes a raposas e metamorfos abençoados pelos espíritos. Podem mudar da forma de um humanoide com cabeça de raposa para uma forma alternativa específica única de cada kitsune, geralmente uma forma sem cauda — como um corpo humanoide sem quaisquer traços de raposa (tipicamente da ancestralidade prevalente onde cresceram) — ou uma forma de raposa. Kitsunes se deleitam com alegria e beleza, frequentemente praticando narrativa, dança e outras artes criativas. Porém, também têm predileção por pregar pegadinhas nos sem alegria e nos autoconfiantes, o que lhes rendeu reputação de trapaceiros. Favorecidos pela deusa Daikitsu, kitsunes parecem ter sorte quase sobrenatural, escapando do perigo por margens estreitas.\n\n Embora existam assentamentos kitsune, a maioria é incrivelmente curiosa e frequentemente deixa o lar em idade jovem para encontrar pessoas e lugares novos. Alguns kitsunes passam anos em sua forma sem cauda, vivendo disfarçados entre humanoides em sociedades urbanas ou rurais cujos habitantes não têm ideia de sua verdadeira natureza. Outros vão ao extremo oposto, passando a maior parte da vida na forma de raposa, revelando-se apenas no momento mais oportuno. Para muitos kitsunes, revelar a forma verdadeira a alguém é sinal de grande confiança, mas também não é incomum que kitsunes exibam abertamente sua natureza dual.\n\n A conexão dos kitsunes com o mundo espiritual lhes concede várias habilidades mágicas. Além dos poderes inatos de metamorfose, kitsunes naturalmente desenvolvem magia mais potente à medida que amadurecem e parecem aprender sem esforço habilidades que rivalizariam com os conjuradores mais praticados. Aqueles que realmente se dedicam a aprimorar sua magia geralmente se tornam notáveis em sua arte.\n\n Um kitsune nasce com uma cauda, mas à medida que seus poderes mágicos crescem, também cresce o número de caudas. Anciãos abençoados com grande sabedoria mágica podem ter até nove, embora, segundo a lenda popular, esse nível de poder possa levar até mil anos para ser alcançado.",
    sections: [
      {
        id: "the-lady-of-foxes",
        title: "A Senhora das Raposas",
        body: "Daikitsu, uma divindade venerada em Tian Xia como patrona da agricultura e do artesanato, é diretamente responsável pela criação dos kitsunes. Os primeiros kitsunes descenderam dos atendentes de Daikitsu enviados ao Universo. Kitsunes de nove caudas serviram como arautos de Daikitsu ao longo da história.",
      },
    ],
  }),
  fam({
    id: 'family-munavri',
    name: "Munavri",
    originalName: "Munavri",
    trait: "Munavri",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=611",
    intro:
      "Embora a Escuridão subterrânea seja conhecida pelas civilizações cruéis e dominadoras lideradas por povos adoradores de demônios que habitam aquelas cavernas sinistras, nem toda sociedade subterrânea é governada assim. Munavris são talvez o melhor exemplo de um povo que tende a tratar novos visitantes em seus territórios da Escuridão com bom humor, justiça e respeito.\n\n Esses humanoides são descendentes de humanos que sobreviveram à catástrofe que quase destruiu o mundo chamada Queda dos Meteoros — marinheiros que foram raptados por algholthos e arrastados pelas profundezas oceânicas até emergirem do outro lado do fundo do mar, em meio ao Mar Sem Vista no reino sem luz de Orv.\n\n Gradualmente, os corpos dos munavris se adaptaram ao novo lar: começaram a demonstrar poderes telecinéticos e desenvolveram visão altamente sensível e belos crescimentos cristalinos ao longo da pele, que se diz representar suas habilidades psíquicas. Esses munavris primitivos eventualmente se estabeleceram em um misterioso arquipélago de ilhas de jade — formações terrestres verdes místicas que pareciam ressoar com estranhas e poderosas energias psíquicas que repeliam seus captores algholthos. A salvo de seus raptores e nutridos pelos estranhos poderes de suas ilhas de jade, munavris permaneceram livres para aprimorar suas habilidades telecinéticas em notável proeza psíquica.\n\n Todo munavri tem a capacidade de concentrar energia psíquica em um objeto e imediatamente discernir o que é e como usá-lo da melhor forma. Essa incrível intuição natural, porém, não vem facilmente. Usar esse poder exige que munavris gastem grande parte de sua energia psíquica limitada, e o sono é a única maneira de reabastecer esse reservatório psíquico.\n\n Hoje, quase todos os munavris ainda habitam o arquipélago de jade e navegam pelas águas do Mar Sem Vista. Sua cultura predominante promove nobreza de ação e de coração, e muitos munavris dedicam suas vidas a guerrear contra aqueles que semeiam discórdia na Escuridão.",
    sections: [
      {
        id: "a-light-in-the-darkness",
        title: "Uma Luz na Escuridão",
        body: "Munavris podem desempenhar um papel importante em aventuras na Escuridão, atuando como aliados em um ambiente onde abrigo e suprimentos são difíceis de obter.",
      },
    ],
  }),
  fam({
    id: 'family-nagaji',
    name: "Nagaji",
    originalName: "Nagaji",
    trait: "Nagaji",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=612",
    intro:
      "Nagajis são bípedes esguios, porém musculosos, com figuras humanoides e cabeças serpentinas. Seus corpos são cobertos por escamas firmemente sobrepostas que variam amplamente em cor, de verdes e marrons camuflados a azuis ou vermelhos chamativos. Olhos ofídicos conferem aos nagajis uma aparência imperiosa, com íris em todas as cores do arco-íris. Nagajis não piscam, o que já causou desconforto em outras ancestralidades, queira ou não o nagaji.\n\n A fisiologia nagaji varia um pouco. Alguns possuem pescoços mais longos que outros, alguns exibem presas impressionantes capazes de injetar veneno, e alguns são tão únicos que se assemelham mais a lâmias que a outros nagajis. Como serpentes, nagajis são de sangue frio e trocam de pele periodicamente; como resultado, territórios nagaji raramente se sobrepõem aos de humanoides mamíferos, pois suas necessidades ambientais divergem amplamente. São mais conhecidos por sua força esmagadora, semelhante à de serpentes, mas seus laços estreitos com nagas significam que muitos nagajis têm potencial para magia poderosa também.\n\n Há muito tempo, a deusa naga Nalinivati criou os primeiros nagajis como espinha dorsal de uma sociedade que respeitava nagas. Mas os nagajis nunca foram vassalos sem mente, e a deusa os presenteou com livre-arbítrio. Muitos nagajis servem nagas de bom grado até hoje, honrando alguns como divindades absolutas. Embora forasteiros possam inicialmente ver nagajis como servos lavados cerebralmente, nagajis contestam essa afirmação. Claro que há soberanos naga cruéis e injustos, mas há tantos governantes naga justos e equânimes, e a história nagaji lembra várias rebeliões e revoluções para apoiar as reivindicações de governo de uma nova naga quando uma matriarca ultrapassou seus limites. Nagajis observam corretamente que sua longa história com nagas não é assunto simples e afirmam que a parceria funciona nos dois sentidos: nagas dependem tanto dos nagajis para administrar seus impérios quanto nagajis dependem de nagas para conduzir seu povo à prosperidade.\n\n Embora nagajis possam ser encontrados em cidades diversas e centros urbanos, suas comunidades concentram-se em ambientes que se adequam à sua biologia, nomeadamente selvas e florestas tropicais. Onde muitas espécies definhariam no calor e na umidade, nagajis aproveitam o calor e prosperam.",
    sections: [
      {
        id: "nagajor",
        title: "Nagajor",
        body: "Em Golarion, sociedades nagaji podem ser encontradas nas florestas do sul de Tian Xia, especialmente na nação de Nagajor. Apesar da governança aparentemente unificada da Primeira Mãe, Nagajor não é um monólito — seus muitos territórios variam tanto quanto as matriarcas naga que os governam, desde feudos despóticos até utopias exuberantes.",
      },
    ],
  }),
  fam({
    id: 'family-strix',
    name: "Strix",
    originalName: "Strix",
    trait: "Strix",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=623",
    intro:
      "Strix, chamados itarii em sua própria língua, são humanoides aviários com asas amplas de penas escuras e garras grandes. Possuem traços angulares e olhos penetrantes voltados para a frente.",
    sections: [
      {
        id: "strix-storytelling",
        title: "Narrativa Strix",
        body: "A história e a mitologia strix são transmitidas por tradição oral. Todo strix, mesmo os de tribos diferentes, conhece contos quase idênticos de sua história ancestral e sermões espirituais. Sempre apresentando os contos em sua própria língua, strix só compartilham essas histórias ancestrais com aqueles que consideram parentes. Mesmo entre forasteiros, strix valorizam muito a habilidade de narrar e apreciam narrativas faladas bem executadas.",
      },
    ],
  }),
]
