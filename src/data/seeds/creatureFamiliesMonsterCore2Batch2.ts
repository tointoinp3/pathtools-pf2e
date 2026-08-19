import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE_2 = 'Monster Core 2'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE_2, ...partial }
}

function stripList(intro: string) {
  return intro.replace(/\n+[A-ZÁÂÃÉÊÍÓÔÕÚÜ][^\n]*\(Creature -?\d+\)[^\n]*$/s, '').trim()
}

/**
 * Lore de família Remaster para o segundo lote do Monster Core 2.
 * Famílias já existentes (objeto animado, dinossauro, lagarto, cobra, caligni,
 * ninfa, demônio, drake, esqueleto, zumbi, gosma, elemental, espírito da casa,
 * poppet, corvo, trilobita, caranguejo, ameba, cobra goblin, ave do terror, aranha)
 * não se repetem aqui.
 */
export const catalogCreatureFamiliesMonsterCore2Batch2: CreatureFamily[] = [
  fam({
    id: 'family-agathion',
    name: 'Agathion',
    originalName: 'Agathion',
    trait: 'Agathion',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=674',
    intro: stripList(
      'Esses celestiais vêm de Nirvana, o plano da santidade pura. Agathions nascem das almas de mortais que alcançaram o esclarecimento que buscavam em vida — às vezes até depois da morte. Como todos começaram como mortais recompensados por determinação, autoconsciência e pureza de coração, são mais propensos que outros celestiais a intervir sem violência contra a crueldade no Universo. Serviram de mediadores entre azatas e arcontes, e sabem o quanto a comunicação com mortais importa para unir diferenças e impedir que forças profanas vençam.\n\nTodos os agathions têm aspectos animais. Uns são mais antropomórficos; outros passam a maior parte do tempo em formas quase indistinguíveis de animais de verdade. Outros ainda preferem mudar de forma ou parecer humanoides na companhia de mortais humanoides.\n\nCada tipo serve a um papel em Nirvana. Deveres e formas em geral refletem os valores que cultivaram em vida e os levaram ao esclarecimento. Como recebem as formas animais como recompensa, ofendem-se com a insinuação de que são só feras mágicas falantes — ou, pior, que a forma é uma maldição.',
    ),
    sections: [],
  }),
  fam({
    id: 'family-asura',
    name: 'Asura',
    originalName: 'Asura',
    trait: 'Asura',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=571',
    intro: stripList(
      'Asuras afirmam lembrar um tempo antes de qualquer coisa existir: simplicidade, paz e inocência perfeitas. O ato da criação também foi uma tragédia inimaginável — um multiverso corrompido, cheio de sofrimento e promessas quebradas. Por isso são bastiões imóveis de uma verdade desconfortável: a existência é falha, irremediavelmente cruel, e precisa ser destruída. Enquanto outras criaturas aceitam a realidade que lhes foi imposta ou buscam domínio sobre circunstâncias imperfeitas, asuras trabalham para desfazer essa injustiça. Rejeitam consolo, felicidade, orgulho, prazer e amor na missão, pois essas coisas nascem do que querem desfazer. Até o poder só serve como ferramenta para dissolver a todos e a tudo.\n\nApesar do objetivo, não são necessariamente beligerantes com os habitantes do Universo mortal. Não são niilistas, embora muita gente os confunda com isso: acreditam fortemente na virtude, pois é a virtude que os impulsiona na tarefa terrível. Alguns praticam atos justos mesmo enquanto planejam obliterar os beneficiários da caridade, e muitos mortais os consideram protetores divinos dignos de culto.',
    ),
    sections: [
      {
        id: "asura-ranas",
        title: "Asura Ranas",
        body: "Os asuras mais poderosos são semideuses por direito próprio e, apesar de saberem que o poder divino é forjado numa mentira corrompida, não recusam culto. Ganhar a força da divindade oferece o poder de desfazer a realidade, e a adoração dos seguidores permite aos asura ranas revelar as falhas da existência aos mortais.",
      },
      {
        id: "asura-realms",
        title: "Reinos asura",
        body: "Asuras comandam impérios vastos nos cantos do Inferno. Embora os reinos sejam minúsculos comparados à hierarquia maciça de Asmodeus e da diabralha, existem num acordo tácito de coexistência com os vizinhos diabólicos.",
      },
      {
        id: "asura-recruits",
        title: "Recrutas asura",
        body: "Muitos asuras foram antes rakshasas ou yakshas, persuadidos à causa asura e transformados por votos quebrados ou deveres falhos. Residentes dos Planos Exteriores são bem menos propensos a ser convencidos, mas às vezes também se tornam asuras — celestiais quando perdem a fé no sistema que um dia apoiaram, e capetas atraídos pela promessa de que foram julgados, condenados e sentenciados por um sistema falho.",
      },
      {
        id: "geryon",
        title: "Geryon",
        body: "Um antigo asura rana, Geryon juntou-se às fileiras do Inferno, traindo os irmãos asura para provar lealdade a Asmodeus. Ainda assim, alguns acreditam que isso foi só um ardil para Geryon chegar mais perto da divindade verdadeira, para ganhar o poder necessário para desfazer a realidade — inclusive todas as obras do Inferno.",
      },
    ],
  }),
  fam({
    id: 'family-automaton',
    name: 'Autômato',
    originalName: 'Automaton',
    trait: 'Automaton',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=572',
    intro: stripList(
      'Autômatos são construtos mágicos que abrigam a alma e a mente de uma pessoa. Com técnicas hoje quase perdidas, artesãos antigos criaram corpos mecânicos alimentados por núcleos mágicos, com potencial de vida quase ilimitada. A maioria nasceu milênios atrás e permanece ativa graças a corpos quase imortais e fontes de poder sem fim.\n\nOs primeiros autômatos nasceram no Império Jistka. O império estava em guerra e usou o saber mágico para criar construtos-soldados. Por fim, os grandes artífices dominaram a última técnica: a transmigração de almas. Aprenderam a arrancar mente e alma do ninho de órgãos e tendões e replantá-las em cilindros de metal e cristal, implantados em corpos de construção arcana — autômatos.\n\nDepois da guerra, os que restaram, sem lar nem meio de morrer, espalharam-se. Uns vagaram em busca de propósito; outros sumiram; outros ainda viram as faculdades degradarem após séculos sozinhos. Relatos de autômatos aparecem na história: um construto chega a uma batalha, luta, e some quando acaba.\n\nHoje artesãos recriaram a maior parte das técnicas, mas o processo ainda é imperfeito e a fabricação em massa continua fora de alcance. Eihlona, no sul de Garund, segue os estudos; Nex também busca aprendê-los.',
    ),
    sections: [
      {
        id: "automaton-cores",
        title: "Núcleos de Autômato",
        body: "Por mais impressionantes que sejam os corpos, a maravilha de verdade são os núcleos, que ao mesmo tempo abrigam as almas e fornecem energia sobrenatural praticamente eterna. O núcleo de um autômato pode ser colocado no corpo de outro, mas não é recomendado: alma e mente se espalham pelo corpo e pelo núcleo. Introduzir um núcleo estranho causa choque de personalidades, em geral com uma dominando a outra.",
      },
      {
        id: "the-artificer-conclave",
        title: "O Conclave dos Artífices",
        body: "Os artífices que desenharam os autômatos ainda estão por aí — não eram tolos, e construíram corpos para si também, autômatos magistrais feitos para sobreviver à passagem do mundo. Os nomes ecoam pelas margens da história até hoje: Enoh dos Sete, o Impostor Inperantike, o Sábio Alcaeste e mais.",
      },
    ],
  }),
  fam({
    id: 'family-fly',
    name: 'Mosca',
    originalName: 'Fly',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=594',
    intro: stripList(
      'Moscas gigantes são insetos do tamanho de um pônei, com olhos compostos enormes e corpos eriçados de pelos curtos e rígidos. Os covis são notórios pela carne podre que acumulam para pôr ovos. Os ninhos de larvas também são terreno fértil para doenças virulentas.',
    ),
    sections: [
      {
        id: 'fly-species',
        title: 'Espécies de Mosca',
        body: 'A mosca gigante apresentada aqui é só a mais comum dessas pragas desproporcionais. Outras crescem bem mais, como a mosca-glutona que bebe sangue, a mosca-praga tóxica e de cheiro horrível, e a mosca-peste inchada — criatura nauseante que, ironia, não voa, engorda com carne de morto-vivo e carrega um monte de doenças ruins.',
      },
    ],
  }),
  fam({
    id: 'family-leech',
    name: 'Sanguessuga',
    originalName: 'Leech',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=606',
    intro: stripList(
      'Embora valorizadas por boticários e socorristas para reduzir inchaço ou drenar sangue, as sanguessugas são detestadas por quase quem as encontra. As jovens são as mais procuradas porque o tamanho as torna mais fáceis de controlar na medicina. Quem topa caçá-las e capturá-las cobra caro — o risco justifica o preço.',
    ),
    sections: [
      {
        id: 'leech-species',
        title: 'Espécies de Sanguessuga',
        body: 'A sanguessuga-gancho-pintada aparece em áreas frequentadas por trolls, que às vezes as usam como enfeite horrendo, confiando na regeneração para controlar o sangramento. A gigantesca sanguessuga-elefante se alimenta de bestas imensas de pântano ou selva, como elefantes e dinossauros, atacando de longe. Mas é a relativamente pequena sanguessuga-intestinal que mais alimenta pesadelos, pelo hábito de se alimentar de dentro da vítima.',
      },
    ],
  }),
  fam({
    id: 'family-mosquito',
    name: 'Mosquito',
    originalName: 'Mosquito',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=610',
    intro: stripList(
      'O mosquito comum é uma praga capaz de espalhar doenças mortais; os parentes gigantes e as nuvens vorazes de enxame são ainda mais perigosos.',
    ),
    sections: [
      {
        id: 'malaria-strains',
        title: 'Cepas de Malária',
        body: 'A versão mais comum da malária — doença perniciosa associada a mosquitos — está no GM Core; as variantes infligidas por enxames e mosquitos gigantes são mais letais, mas não têm chance de recidivar após 1d4 meses. A malária pirética também causa fraqueza e febre; a malária séptica forma lesões dolorosas e infectadas. Qualquer que seja a cepa, você não pode reduzir Enjoado enquanto estiver com malária.',
      },
    ],
  }),
  fam({
    id: 'family-sportlebore',
    name: 'Sportlebore',
    originalName: 'Sportlebore',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=622',
    intro: stripList(
      'O terror de aventureiros famintos mundo afora, sportlebores são vermes nefastos que imitam petiscos. Perto de ração de trilha — fruta ou carne seca — o sportlebore imita esses alimentos com perfeição, flexionando, contorcendo e mudando a cor do abdômen, e depois recolhendo tórax, cabeça e pernas dentro do corpo apetitoso. Uma vez ingerido, reproduz-se num enxame faminto que o comedor regurgita, já adoentado, e ataca qualquer criatura que ache que pode consumir.',
    ),
    sections: [
      {
        id: 'other-sportlebores',
        title: 'Outros Sportlebores',
        body: 'O apresentado aqui é o mais comum, mas o sportlebore é na verdade uma família inteira de insetos especializados em imitar objetos do dia a dia. Outras variedades incluem o wartlebore, esguio e devorador de madeira; o sportlegore, que come cadáveres; e o sportleglug, tão pequeno que fura odres de couro e bebe o conteúdo sem o saco pingar uma gota. Como o sportlebore, a maioria desses vermes não é muito perigosa sozinha, mas vira problema de verdade se o número crescer sem controle.',
      },
    ],
  }),
  fam({
    id: 'family-kami',
    name: 'Kami',
    originalName: 'Kami',
    trait: 'Kami',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=604',
    intro: stripList(
      'Kami são espíritos da natureza divinos das terras de Tian Xia, a leste da região do Mar Interior. Servem de guardiões dos objetos e lugares naturais que protegem — seus protegidos — e são inimigos antigos dos oni. Podem fundir-se aos protegidos, observando em segredo quem pisa no chão sagrado. Deixam em paz quem julgam inofensivo, mas lutam com vigor para afastar quem percebem como ameaça.',
    ),
    sections: [
      {
        id: 'kami-allies',
        title: 'Aliados dos Kami',
        body: 'Kami são amigos de arbóreos, dríades e outros seres com laços espirituais com o mundo natural. Entre mortais, druidas são os destinatários mais comuns da ajuda kami, embora esses espíritos possam ajudar qualquer um cuja missão envolva proteger o respectivo protegido.',
      },
      {
        id: 'kami-worship',
        title: 'Culto aos Kami',
        body: 'Embora kami não sejam deuses, as pessoas às vezes cultuam ou rezam numa árvore ou lugar onde se sabe que um kami reside. Kami encaram isso como um tique curioso dos mortais e não tentam dissuadir nem incentivar o tratamento reverente, desde que não ameace a segurança dos protegidos.',
      },
    ],
  }),
  fam({
    id: 'family-owb',
    name: 'Owb',
    originalName: 'Owb',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=614',
    intro: stripList(
      'Esses antigos habitantes do Mundo Inferior aparecem como torsos humanoides acinzentados cobertos por véus fúnebres translúcidos de sombra. Silenciosos e misteriosos, flutuam sem pernas que os sustentem. Nunca falam em voz alta: penetram as mentes das criaturas próximas para sussurrar maldições, ameaças e fragmentos estranhos de augúrio desolado.\n\nCalignis os reverenciam como procuradores dos Abandonados — um conjunto estranho de semideuses ancestrais que muitos calignis cultuam. Alguns até acreditam que os owbs são os Abandonados manifestos, capazes de manipular criaturas no Mundo Inferior sem deixar indício.\n\nUma infinidade de owbs visita e até permanece para aconselhar comunidades caligni, tão variados de personalidade quanto os Abandonados. Todos compartilham ódio à luz e à cor, salvo o brilho oscilante da magia de frio abrasador que arremessam como arma. Owbs que vivem entre calignis tendem a proibir luz e cor, usando a maldição da escuridão para apagar infratores se preciso. A outra semelhança entre todos é o desejo enraizado de manipular os subordinados com leitura da mente e engano — sutil ou aberto.',
    ),
    sections: [],
  }),
  fam({
    id: 'family-sahkil',
    name: 'Sahkil',
    originalName: 'Sahkil',
    trait: 'Sahkil',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=618',
    intro: stripList(
      'Há eras, quando este ciclo do multiverso ainda era adolescente, um grupo de psicopompos que se sentia entediado e preso no papel de conduzir almas ao descanso se rebelou. Foi essa violação do ciclo das almas que transformou os antigos psicopompos nos primeiros sahkils.\n\nEsses capetas mudaram drasticamente dos predecessores dedicados. Ambivalentes à ordem prescrita do multiverso e odiosos a todos os mortais, sahkils se deleitam em espalhar medo e inquietação, entupindo o ciclo metafísico com mortais tomados de ansiedade, assustados demais para alcançar o próprio potencial. São criaturas de rancor e tormento, medo e nojo. Exploram tanto os medos mais comuns quanto os mais raros, o que for mais eficaz para a vítima do momento. Querem assustar mortais até um estado abatido e miserável, em que questionem a própria razão de existir, e usam todas as ferramentas à disposição.\n\nA maioria espreita no Plano Etéreo, mas invade o Universo com frequência para atormentar alvos mortais e espalhar terror. Usam a habilidade inata de atravessar os véus entre o Etéreo e o Universo sem esforço, muitas vezes seguindo a presa por dias ou semanas antes de pôr o plano em prática.',
    ),
    sections: [
      {
        id: "check-with-players",
        title: "Confira com os jogadores",
        body: "Sahkils são criaturas de medo e terror. Encontros com sahkils podem ser perturbadores para alguns jogadores, e aprofundar os tipos de trauma que eles se deleitam em desencadear pode ter efeitos não intencionais no jogo e nas amizades. Antes de introduzir sahkils, converse com o grupo sobre fobias ou limites para determinar o que trazer à mesa — e considere isso também por si. Elementos específicos a ter em mente são as habilidades do ximtal em torno de privação sensorial e isolamento social, além das habilidades e temas de trauma do kimenhul.",
      },
      {
        id: "feeding-on-fear",
        title: "Alimentar-se do medo",
        body: "Sahkils são seres planares imortais e não precisam de sustento material, mas parecem tirar algum alimento do medo que espalham. Se isso é psicológico ou biológico ainda se discute, mas a obsessão em assustar outras criaturas é clara. Reconhecem que já são temidos; talvez estejam só cumprindo o que acreditam ser o propósito final.",
      },
      {
        id: "planar-relations",
        title: "Relações planares",
        body: "Sahkils colaboram com divs para corromper mortais. Velstracs, que apreciam as depredações, às vezes trabalham com esses capetas para encenar horrores terríveis. Niilistas e desafetados, daemons toleram sahkils mas os veem como provocadores inúteis.",
      },
      {
        id: "sahkil-tormentors",
        title: "Algozes sahkil",
        body: "Os mais poderosos entre os sahkils são os algozes sahkil. Esses seres deíficos governam os sahkils como um todo, e muitos dirigem pessoalmente as ações dos primos menores. Outros caem em rotinas ambivalentes, focando mais em atos pessoais de tormento do que em lançar depredações ambiciosas e espalhadas sobre mortais desprevenidos.",
      },
      {
        id: "war-against-hope",
        title: "Guerra contra a esperança",
        body: "Sahkils e coatls são inimigos eternos. Cada um disputa as almas dos mortais, mas de lados diferentes da mesma moeda ideológica. Sahkils querem instilar só medo nos corações mortais, tentando reduzi-los a pilhas inúteis de carne que realizam pouco. Coatls trabalham para acender as chamas da esperança, inspirando mortais a se erguer e alcançar o potencial.",
      },
      {
        id: "xibalba",
        title: "Xibalba",
        body: "No reino espectral do Plano Etéreo, sahkils habitam um domínio aterrorizante chamado Xibalba. A Terra do Pavor é um reino de pesadelos feitos carne. No centro desse demiplano fica uma estrutura em terraços conhecida como a Pirâmide Negra, de onde os algozes sahkil governam os irmãos e semeiam medo no reino mortal.",
      },
    ],
  }),
  fam({
    id: 'family-urdefhan',
    name: 'Urdefhan',
    originalName: 'Urdefhan',
    trait: 'Urdefhan',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=629',
    intro: stripList(
      'Os belicistas, ocultistas e envenenadores violentos conhecidos como urdefhans habitam as Terras Sombrias. Foram criados em éons passados pelos misteriosos primeiros Cavaleiros do Apocalipse para servir como agentes do fim dos tempos do Universo. Continuam a honrar os criadores cultuando os seres miseráveis que governam o plano de Abaddon e, como os senhores capetas, existem por um motivo só: matar. Embora sejam humanoides e vivam juntos em grupos grandes, as semelhanças com outras ancestralidades param aí. A visagem é horrenda: pele e musculatura translúcidas exibem vísceras brilhantes, ossos reluzentes e, talvez o pior, os olhos vermelhos malignos. Essa aparência, somada à boca escancarada cheia de presas, cria a impressão falsa de que urdefhans são algum tipo de morto-vivo vampírico, não criaturas de carne e sangue. Quando a vida de um urdefhan acaba, a carne coalha depressa e estoura numa onda de corrupção que se espalha à carne de outras criaturas na área. O urdefhan típico vê a morte eventual como decepção: uma vez morto, as chances de matar enfim acabam.\n\nO corpo translúcido deixa ver órgãos e fluidos; o sangue azul muitas vezes sinaliza o humor e telegrafa perigos. O sangue de um urdefhan excitado, pronto para atacar, fica mais vibrante e até brilha com luz fraca. Quando está preparado para a morte e a detonação iminente da alma, o sangue escurece, quase negro como piche.\n\nA preocupação principal é a morte e como infligi-la das formas mais sangrentas, dolorosas e abrangentes. Fora esse ethos de violência, só se ocupam de passagem com modos formais de guerra ou aspectos da religião condenável. Quando não está em violência ativa, a crueldade eufórica é temperada só pelo instinto de preservação que garante sobreviver o bastante para espalhar as “bênçãos” dos patronos daemônicos. Entre guerras, passam o tempo inventando armas novas, desenvolvendo doenças novas e pesquisando magia horrenda, tudo em preparação para o próximo conflito inevitável.',
    ),
    sections: [
      {
        id: "minos-pashat",
        title: "Minos-Pashat",
        body: "Os primeiros urdefhans foram soltos nas profundezas das Terras Sombrias de Golarion no cofre de Minos-Pashat, uma caverna do tamanho de uma nação crivada de emaranhados de labirinto de estalactites, estalagmites e fissuras.",
      },
      {
        id: "rhoka-swords",
        title: "Espadas Rhoka",
        body: "A espada rhoka é a arma preferida dos urdefhans, e todos os de sua espécie sabem empunhá-la.",
      },
    ],
  }),
  fam({
    id: 'family-opossum',
    name: 'Gambá',
    originalName: 'Opossum',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=613',
    intro:
      'Poucas criaturas sobreviveram tanto tempo e em tantos ambientes quanto os gambás.',
    sections: [],
  }),
  fam({
    id: 'family-moose',
    name: 'Alce',
    originalName: 'Moose',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Moose',
    intro:
      'Alces são um tipo grande e solitário de cervo. Majestosos, territoriais e extremamente mal-humorados — traços que os tornam perigosos para viajantes desatentos e predadores pretensos. Os machos são reconhecíveis de imediato, com cerca de 2,1 m na cernelha, cabeças grandes e pescoços grossos para sustentar a galhada palmeada impressionante. Perdem os chifres no inverno e crescem um jogo novo a cada ano, depressa.',
    sections: [],
  }),
  fam({
    id: 'family-betobeto-san',
    name: 'Betobeto-san',
    originalName: 'Betobeto-san',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Betobeto-san',
    intro:
      "Um betobeto-san vagueia estradas e atalhos do Plano Material em busca de companheiros de viagem relutantes para sustentar o apetite por medo. Invisível no escuro ou na sombra, à luz aparece como uma massa sombria sem forma, com dois pés de sandália. As sandálias de madeira ou osso fazem o som distinto “beto beto” de onde tira o nome. Uma boca larga e denteada sorri no meio da massa sem feições, e pode manifestar membros longos com garras.\n\nBetobeto-san seguem viajantes noturnos, compelidos a acompanhar até que as criaturas ofereçam verbalmente passagem. A compulsão em geral não é maliciosa: nasce mais de um desejo distorcido de companhia e cortesia; infelizmente, falta a eles entender como o comportamento assusta. Não atacam quem seguem, mas muitas vezes acabam em combate porque a conduta indesejada faz o outro atacar primeiro.",
    sections: [],
  }),
  fam({
    id: 'family-tikbalang',
    name: 'Tikbalang',
    originalName: 'Tikbalang',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Tikbalang',
    intro:
      "Tikbalangs são criaturas da floresta que se deleitam em desviar viajantes. Enganam e desencaminham com magia formidável, saltando de árvore em árvore enquanto riem ou relincham sem controle. Não são maliciosos, mas também não sentem empatia pelas vítimas. Preferem esquecer quem enganaram e deixá-los morrer a reconduzi-los ao caminho por altruísmo culposo.\n\nA magia oculta dos tikbalangs nasce do mistério esotérico de acreditar numa mentira. No instante de criar ilusões ou conjurar espaços extradimensionais, eles mesmos acreditam que o que criam é real. Essa convicção torna as magias mais difíceis de resistir e também os torna mentirosos muito eficazes. Mas a disposição a acreditar os deixa suscetíveis a enganos e ilusões por sua vez.\n\nDiferente de alguns ilusionistas, tikbalangs também podem contar com a força física. Têm pernas incomumente longas que terminam em cascos fendidos e, em pé, são tão altos quanto ogros. Escaladores e saltadores hábeis, também são mestres da luta corpo a corpo, em que os membros longos lhes dão vantagem.",
    sections: [],
  }),
  fam({
    id: 'family-ahuizotl',
    name: 'Ahuizotl',
    originalName: 'Ahuizotl',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Ahuizotl',
    intro:
      'O ahuizotl é um predador semiaquático cruel que lembra um cruzamento horrendo de texugo e lontra, com patas de dedos palmeados perturbadores e uma quinta mão na ponta de uma cauda serpentina. Caçador astuto e furtivo, atrai a presa para a ruína imitando gritos de gente em apuros. A mão da cauda é surpreendentemente forte, e a criatura tende a usá-la para emboscar.',
    sections: [],
  }),
  fam({
    id: 'family-hodag',
    name: 'Hodag',
    originalName: 'Hodag',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hodag',
    intro:
      'Como costumam ser descritos em causos disparatados de lenhadores e mineiros, hodags são tidos por muitos como lenda local. Alguns, porém, os encontraram de verdade — e ainda menos viveram para contar. São criaturas reptilianas do tamanho de touros, com garras capazes de despedaçar em segundos e dezenas de espinhos nas costas, do focinho à cauda poderosa.',
    sections: [],
  }),
  fam({
    id: 'family-grodair',
    name: 'Grodair',
    originalName: 'Grodair',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Grodair',
    intro:
      "Grodairs são peixes bizarros nativos do Primeiro Mundo. A fisiologia sobrenatural inclui um órgão com um espaço extradimensional capaz de guardar milhares de galões de água. Isso lhes permite criar um ambiente adequado em qualquer lugar, soltando a água e transformando a terra em torno num brejo raso. Quando querem ir embora, simplesmente sugam a água de volta. Se preciso, também andam em terra sobre o emaranhado de tentáculos longos e carnudos que pendem da barriga.\n\nTêm dois pares de olhos que funcionam de forma independente. Isso os torna difíceis de surpreender, mas também fáceis de distrair. Em conversa, perdem o foco depressa e têm dificuldade de lembrar coisas. Ainda assim, são conversadores ávidos e gostam de ouvir histórias do mundo. Essa qualidade os torna simpáticos, mas não confiáveis. Têm dificuldade de seguir planos ou horários, e só guardam um segredo se por acaso o esquecerem primeiro.",
    sections: [],
  }),
  fam({
    id: 'family-festrog',
    name: 'Festrog',
    originalName: 'Festrog',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Festrog',
    intro:
      "Espocados de cadáveres de quem morreu de doença ou fome e foi torcido por energia de vazio, festrogs exibem uma ferocidade que rivaliza outros mortos-vivos. Lembram humanoides em decomposição, mas com braços alongados, dentes e espinhos ósseos saindo das costas. A tendência de correr de quatro lhes valeu o apelido de cães-carniçais, o que faz o desavisado tomá-los por predadores irracionais.\n\nFestrogs são de fato inteligentes, perseguindo vítimas em matilha e escolhendo terrenos de caça que sirvam às habilidades. Encontram-se muitas vezes em fazendas, florestas abertas ou planícies largas, onde a velocidade quadrúpede alcança a presa. Desmentindo a aparência irracional, usam táticas semelhantes às de caçadores com cães: o líder do bando muitas vezes faz a presa sair da cobertura para que o restante a derrube.",
    sections: [],
  }),
  fam({
    id: 'family-incutilis',
    name: 'Incutilis',
    originalName: 'Incutilis',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Incutilis',
    intro:
      'Incutilises são criaturas marinhas inteligentes, semelhantes a náutilos, que atacam o cérebro das vítimas para tomar o corpo, criando marionetes para trabalho, combate ou o próprio divertimento malevolente. Um adulto é um pouco menor que a cabeça de um humano, e a concha traz um padrão de listras carmesim que lembram os sulcos de um cérebro.',
    sections: [],
  }),
  fam({
    id: 'family-myceloid',
    name: 'Miceloide',
    originalName: 'Myceloid',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Myceloid',
    intro:
      "Os fungos ambulantes chamados miceloides são notórios por espalhar a peste púrpura mortal, controlar mentes e devorar carne humanoide. Para uma colônia, qualquer batalha com humanoides é motivo de animação: a forragem nova apresenta tantas possibilidades deliciosas.\n\nMiceloides consideram que humanoides têm um ciclo de vida ideal de quatro passos simples. Na infância, vagueiam ingênuos e com medo, alheios às colônias. Na vida adulta, descobrem o verdadeiro propósito ao provar a peste púrpura e ficar escravizados pelos esporos. Depois morrem, dando origem a um miceloide novo. Por fim seguem para o além ao virar refeição. Comer carne humanoide não é necessidade — um miceloide sobrevive de qualquer matéria em decomposição — mas é um prazer.\n\nA maioria tem chapéus roxos-escuros cravejados de caroços esbranquiçados. Pescoco e corpo lembram os estipes de fungos duros e coriáceos. Cogumelos menores muitas vezes crescem no corpo, vistos como enfeite ou lanche conveniente. Têm mais ou menos a altura de um anão, com constituição igualmente robusta.",
    sections: [],
  }),
]
