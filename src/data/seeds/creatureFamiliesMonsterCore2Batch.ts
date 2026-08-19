import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE_2 = 'Monster Core 2'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE_2, ...partial }
}

/**
 * Lore de família Remaster para o lote do Monster Core 2.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core 2). Sem Legacy.
 * Famílias já existentes (gremlin, aranha, drake, demônio, caligni, bruxa, troll)
 * não se repetem aqui — as fichas apontam os IDs antigos.
 */
export const catalogCreatureFamiliesMonsterCore2Batch: CreatureFamily[] = [
  fam({
    id: 'family-wisp',
    name: 'Fagulha',
    originalName: 'Elemental Wisp',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=592',
    intro:
      'Fagulhas são elementais miúdos que nasceram na criação dos Planos Elementais. As primeiras vagavam pela Esfera Interna em sinfonias que trocavam membros a cada encontro. Dessas ressonâncias saía música — até os Senhores Elementais perceberem o valor e capturarem sinfonias inteiras como servas.\n\nAfinam-se umas às outras e a quem as cerca, o que as torna aliadas naturais. Fagulhas livres ainda percorrem a Esfera Interna e o Universo, em geral tímidas, escondidas de estranhos. Quem as trata com bondade ganha serviço de bom grado. Encantam-se especialmente com conjuradores de magia elemental: costumam observar de longe e, se o mago parecer seguro, aproximam-se como familiar ou camarada.\n\nQuando duas fagulhas livres se encontram, a amizade é imediata. Ficam ainda mais animadas se o elemento for outro — nenhuma da animosidade que às vezes existe entre elementais de planos diferentes. Dançam juntas, emitindo ressonâncias que ecoam, fracas, as sinfonias dos dias antigos.',
    sections: [
      {
        id: 'wisp-symphonies',
        title: 'Sinfonias de Fagulhas',
        body: 'Dezenas ou até centenas de fagulhas de todos os tipos podem reunir-se numa sinfonia, em geral com um ou mais maestros. Esses grupos são raros agora que a maioria vive a serviço dos Senhores Elementais, mas algumas sinfonias livres ainda vagam pelos Planos Elementais; lendas falam das canções transcendentes que produzem juntas. Usam as regras de enxame e não podem Harmonizar Essência, mas em conjunto geram efeitos de área ou lançam certas magias.',
      },
    ],
  }),
  fam({
    id: 'family-badger',
    name: 'Texugo',
    originalName: 'Badger',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=573',
    intro:
      'O texugo escavador é comum na maioria das florestas temperadas. Feroz e tenaz por natureza, a estatura baixa esconde força e velocidade.',
    sections: [],
  }),
  fam({
    id: 'family-cockroach',
    name: 'Barata',
    originalName: 'Cockroach',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=576',
    intro:
      'Em geral vistas mais como incômodo do que como perigo pessoal, as baratas habitam quase todos os cantos do mundo. São carniceiras: vivem do detrito da natureza e de quem a habita. Sobrevivem semanas sem comer, e a maior parte das refeições é lixo orgânico que, sem elas, entupiria o ecossistema — sobretudo nas cidades, o habitat preferido. Uma barata comum quase não ameaça, mas em grupo grande viram perigo, e algumas espécies crescem demais.\n\nQuem só conhece a barata marrom se surpreende: há uma variedade enorme de cores. Há quem colecione esses insetos belos, em alfinete ou como bicho de estimação.',
    sections: [],
  }),
  fam({
    id: 'family-clockwork',
    name: 'Autômato de corda',
    originalName: 'Clockwork',
    trait: 'Clockwork',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=575',
    intro:
      'Máquinas intricadas, os autômatos de corda nascem do cuidado de engenheiros hábeis. Há magia na fabricação, mas o grosso é mecânico: engrenagens e molas afinadas trabalhando em concerto.\n\nA mola mestra precisa ser dada corda para alimentar o dispositivo. Autômatos maiores às vezes têm uma série de molas, uma por membro. O artesão cria uma chave de metal única; dar corda em geral é encaixar a chave nas costas e girar no sentido horário. Os maiores exigem mais força — e chaves maiores, às vezes uma equipe de enroladores. Programar o autômato pede a chave e o saber de como ajustar o programa, informação em geral reservada ao criador ou ao dono.\n\nTodo autômato precisa de corda para operar. Cada ficha lista a habilidade Dar Corda com os detalhes.',
    sections: [
      {
        id: 'clockwork-wind-up',
        title: 'Dar Corda',
        body: 'Para agir, o autômato precisa ser enrolado com uma chave única por outra criatura. Isso leva 1 minuto. Enrolado, permanece operacional pelo tempo listado — em geral 24 horas — depois do qual deixa de perceber o entorno e não age até receber corda de novo. Algumas habilidades gastam tempo operacional restante; o autômato não pode gastar mais do que tem e desliga no instante em que chega a 0. Se não estiver claro quando foi enrolado pela última vez, a maioria dos cuidadores dá corda a todos numa hora fixa, em geral às 8h.\n\nUma criatura pode tentar Desativar Dispositivo para desenrolar o autômato (CD listada em Dar Corda). Cada sucesso reduz 1 hora de operação (ou 2 horas num sucesso crítico). Isso vale mesmo em modo de espera.\n\nSe a ficha listar espera, o autômato tem a ação Entrar em Espera: o tempo operacional não diminui, mas percebe o entorno com −2 de circunstância em Percepção. Não age, com uma exceção: ao perceber uma criatura, pode sair da espera como reação (rolando iniciativa se couber).',
      },
      {
        id: 'clockwork-research',
        title: 'Pesquisa de Corda',
        body: 'Os autômatos de corda nasceram na antiguidade, no auge do exército de Xin, primeiro imperador da antiga Thassilon, e depois se perderam por milênios. Povos diversos redescobriram as técnicas e as aprimoraram. Hoje a Catedral de Corda em Absalom é o centro da pesquisa, com avanços também no reino de Nex e no mecanicamente sagaz Grão-Ducado de Alkenstar. A professora qadirana Hadia Al-Dannah, ex-membro da Catedral, escreveu o texto moderno mais respeitado sobre o desenho de corda — Ritmos Gloriosos na Vida e na Mecânica.',
      },
      {
        id: 'clockwork-malfunction',
        title: 'Pane!',
        body: 'Autômatos mal cuidados ou mal programados tendem a falhar. Você pode introduzir uma das panes abaixo num autômato em desuso ou muito danificado em combate (por exemplo, num acerto crítico).\n\n**Contragolpe:** no início de cada turno, o autômato faz um teste simples CD 5. Em falha, explode para trás, causando 2d6 de fogo num cone de 4,5 m, inclusive em si (Reflexos básico na CD padrão do nível), e fica Atrasado 1 naquele turno.\n\n**Propulsão danificada:** perde 1d4 horas de tempo operacional no fim de cada turno.\n\n**Parafusos frouxos:** ao sofrer dano, faz um teste simples CD 5. Em falha, uma placa de armadura cai. Recebe penalidade de status na CA igual ao número de placas perdidas (até −4).',
      },
      {
        id: 'clockwork-winding-routines',
        title: 'Rotinas de Corda',
        body: 'Manter um grupo de autômatos em operação regular pede planejamento. Uma tropa de soldados de corda de patrulha precisa ser enrolada com frequência. Em geral um ou mais servos dão corda a todos os autômatos de um lugar numa hora padrão.',
      },
    ],
  }),
  fam({
    id: 'family-house-spirit',
    name: 'Espírito da casa',
    originalName: 'House Spirit',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=601',
    intro:
      'Espíritos da casa são fey tímidos, muitas vezes úteis, às vezes irados, que moram ao lado de camponeses e fazendeiros. Habitam a casa, o quintal, o celeiro, a casa de banho — onde quer que gente construa e viva. Por essa proximidade, costumam copiar maneiras e aparência dos mortais vizinhos. O jeito recluso e a tendência a passar despercebidos renderam o apelido de “espíritos”, embora sejam fey de corpo inteiro.\n\nTomam um interesse quase parental nos “seus” mortais. Com o respeito devido, trabalham sem parar: cortam lenha, cuidam do gado, remendam roupa, varrem o chão, atendem o fogão. Ofendidos, viram praga: assustam animais ou crianças e estragam pertences. Brownies, os mais comuns deste lote, encaixam-se nesse papel: honestos até o osso, tomam o que precisam e sempre pagam o débito com trabalho ou uma oferenda deixada para trás.',
    sections: [
      {
        id: 'bound-spirits',
        title: 'Espíritos vinculados',
        body: 'Cada espírito da casa escolhe um lugar específico como responsabilidade e fonte de poder. Podem partir, temporária ou definitivamente, mas nunca é decisão trivial. Em geral um local tem um só espírito, que ganha poder se o lar for particularmente grandioso. O espírito de um palácio enorme é temível de verdade.',
      },
    ],
  }),
  fam({
    id: 'family-camel',
    name: 'Camelo',
    originalName: 'Camel',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Camel',
    intro:
      "Por gerações, nômades e mercadores dependem de camelos de passo seguro para cruzar desertos e ermos sem trilha. Prosperam onde outros animais definham: pele resistente e a capacidade de guardar nutrientes no corpo. Bem cuidados, esses “navios do deserto” aguentam semanas entre oásis.\n\nTêm três pálpebras contra areia e detritos; uma delas é transparente, e assim veem e viajam no vento forte. Na tempestade de areia, fecham as narinas por completo. A barriga tem pele espessa, que permite deitar em areia escaldante.\n\nAo contrário da crença popular, as corcovas são gordura, não água — energia para ir longe entre refeições. Herbívoros, digerim arbusto duro que outras espécies não comem. Fortes como cavalo de guerra, correm e até disparam por pouco tempo se ameaçados, mas preferem o passo lento para poupar energia.\n\nCamelos de uma corcova, também chamados dromedários, são mais comuns nos desertos do norte de Garund; os de duas corcovas são nativos das estepes secas de Casmaron. Ambos têm porte alto e esguio, cerca de 1,8 m na cernelha e uns 900 kg. Podem ficar rabugentos se maltratados, e não hesitam em morder, coicear ou até cuspir uma substância nauseante em cavaleiros que não os tratam bem.\n\nAlém de transportar gente e carga, são fonte importante de fibra para roupa e tendas, e também de leite. A carne é nutritiva e surpreendentemente saborosa, mas dada a utilidade do animal, esse uso fica para ocasiões especiais ou situações de fato desesperadas.",
    sections: [],
  }),
  fam({
    id: 'family-fox',
    name: 'Raposa',
    originalName: 'Fox',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Cunning%20Fox',
    intro:
      'Raposas aparecem no Monster Core 2 tanto como guias espirituais da astúcia — vistos por uns como os mais fracos dos guias, mas os mais numerosos e proativos, mostrando caminhos seguros ou deixando comida e água para guerreiros — quanto como raposas-brasa, canídeos elementais de pelagem em chamas que caçam de preferência elementais do Plano da Madeira.',
    sections: [],
  }),
  fam({
    id: 'family-beheaded',
    name: 'Decepado',
    originalName: 'Beheaded',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=574',
    intro:
      'Decepados são as cabeças reanimadas de vítimas de decapitação. Mortos-vivos irracionais, voam ou rolam para atacar a presa. Podem manifestar uma variedade de habilidades, como as abaixo.\n\n**Sangrento.** Coberto de sangue viscoso. O alvo de um Golpe bem-sucedido é salpicado de gore e precisa obter sucesso em Fortitude ou ficar Enjoado 1.\n\n**Emaranhador.** Cabelo longo e fibroso gruda no couro. Os Golpes ganham a habilidade Agarrar.\n\n**Profano.** (aura, divino, emoção, medo, mental) 9 m. Rosto distorcido e inquietante. Inimigos que começam o turno na área precisam obter sucesso em Vontade ou ficar Amedrontados 1.\n\n**Gigante.** Um decepado feito da cabeça de um gigante é uma criatura Média, ganhando 2 níveis e uma ou mais habilidades extras de decepado.',
    sections: [
      {
        id: 'more-beheaded-abilities',
        title: 'Mais habilidades de decepado',
        body: 'Como decepados se parecem com esqueletos ou zumbis (ou pelo menos com as cabeças dessas criaturas), você também pode customizá-los com habilidades das entradas de esqueleto e zumbi — evitando as que exigem tronco ou membros. Se der mais de uma habilidade extra, considere aumentar o nível e ajustar as estatísticas.',
      },
    ],
  }),
  fam({
    id: 'family-raven',
    name: 'Corvo',
    originalName: 'Raven',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=616',
    intro:
      'Poucas aves rivalizam a astúcia e o jeito social do corvo. Onívoros, oportunistas, resolvem quebra-cabeças simples para pegar o que querem. Reúnem-se na orla da civilização, saqueando quando não caçam no ermo. São conhecidos por trapaça, e muitos são treinados para aprofundar esse instinto.',
    sections: [],
  }),
  fam({
    id: 'family-trilobite',
    name: 'Trilobita',
    originalName: 'Trilobite',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=628',
    intro:
      'Muitas vezes desprezados como praga aquática, os trilobitas são uma classe variada de artrópodes dos mares de Golarion. Tão antigos e espalhados que fósseis aparecem tão à toa quanto exemplares vivos.\n\nVariam enormemente em tamanho e dieta; os maiores chegam a cerca de 70 cm. O registro fóssil mostra que no passado eram ainda mais diversos e numerosos; a espécie entrou em declínio com a devastação da Queda da Terra.',
    sections: [
      {
        id: 'trilobite-variety',
        title: 'Variedade enorme',
        body: 'Estudiosos do mar identificaram milhares de variedades, distintas em aparência, habitat, tamanho e dieta. Os menores medem uns poucos centímetros; indivíduos de quase 60 cm aparecem nas profundezas. Uns se escondem no limo, com pedúnculos oculares altos para avistar presa; outros têm cabeças largas, em forma de asa; certos tipos se cobrem de espinhos. Essa variedade inspirou joalheria típica em vilas costeiras, que imita as populações locais.',
      },
    ],
  }),
  fam({
    id: 'family-frog',
    name: 'Sapo',
    originalName: 'Frog',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 151,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=494',
    intro:
      'Estudiosos conhecem a adaptabilidade dessas criaturas, mas mesmo assim elas surpreendem.',
    sections: [
      {
        id: 'frog-species',
        title: 'Espécies de sapo',
        body: 'Embora todos os sapos sejam anfíbios, alguns passam mais tempo fora da água. Mesmo os que costumam ser encontrados perto de lagos e riachos são adaptados para escalar. Você pode variar encontros com sapos trocando o Deslocamento de natação de um sapo por um Deslocamento de escalada (ou até permitindo os dois). Do mesmo modo, para sapos venenosos, os efeitos específicos da toxina podem variar por espécie: a exposição a alguns venenos de sapo deixa a criatura Desajeitada ou Estupefata em vez de Enfraquecida.',
      },
    ],
  }),
  fam({
    id: 'family-poppet',
    name: 'Poppet',
    originalName: 'Poppet',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=615',
    intro:
      'Poppets são construtos simples feitos para ajudar o criador em tarefas básicas. Os atendentes estão entre as formas mais comuns; muitos trabalham em ofícios criativos, sobretudo entre alfaiates e sapateiros.',
    sections: [
      {
        id: 'poppet-assistants',
        title: 'Assistentes poppet',
        body: 'Muitos poppets nascem para um ofício específico, o que torna cada um único. O assistente de um ferreiro pode ser de material mais resistente e perder a fraqueza usual a fogo; o de um laboratório alquímico pode ser impermeabilizado, com dedos articulados para medir ingredientes com cuidado.',
      },
    ],
  }),
  fam({
    id: 'family-deep-one',
    name: 'Profundo',
    originalName: 'Deep One',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=579',
    intro:
      'Humanoides pesados, anfíbios e sem morte conhecida, os profundos habitam costas e fossas oceânicas mundo afora em Golarion. A maioria só quer ser deixada em paz; outros trabalham sem descanso para aumentar as fileiras.',
    sections: [
      {
        id: 'coastal-communes',
        title: 'Comunas costeiras',
        body: 'Comunidades religiosas de profundos, chamadas baixios, misturam profundos, híbridos e humanos mundanos a serviço de um ancião local. Esse ancião espreita nas profundezas logo ao largo, ou a serviço direto de Dagon. Quem falha em atrair conversos humanos às vezes abandona a costa e se muda para recifes ou cidades afundadas, subindo à terra só para se alimentar.',
      },
      {
        id: 'flavor-of-fear',
        title: 'O sabor do medo',
        body: 'Profundos preferem costas perto de comunidades manchadas por crenças insulares ou preconceituosas. Como seguidores de uma deidade que reina pelo medo e pela destruição, consideram mentes xenófobas mais fáceis de moldar, mais potentes no sacrifício e — ao menos no relato deles — mais saborosas.',
      },
    ],
  }),
  fam({
    id: 'family-crab',
    name: 'Caranguejo',
    originalName: 'Crab',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=577',
    intro:
      'Caranguejos são crustáceos carniceiros, famosos pela casca dura e pelo passo de lado. Usam as pinças para se defender, caçar e brigar por território. Diante de ameaças de fora da espécie, a maioria prefere fugir; quando a fuga é impossível, agarram o inimigo com toda a força.',
    sections: [
      {
        id: 'crab-species',
        title: 'Espécies de caranguejo',
        body: 'Há caranguejos em todas as costas do mundo, dos relativamente pequenos — como o-rei ou o-do-coco — a monstros de verdade, como o caranguejo do recife enorme, o que come tubarão ou o destroçador de naufrágios.',
      },
    ],
  }),
  fam({
    id: 'family-amoeba',
    name: 'Ameba',
    originalName: 'Amoeba',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Amoeba%20Swarm',
    intro:
      'Um enxame de amebas é milhares de organismos unicelulares presos por lodo de cheiro acre. Tão vorazes quanto irracionais, não usam tática nenhuma.',
    sections: [],
  }),
  fam({
    id: 'family-amphisbaena',
    name: 'Anfisbena',
    originalName: 'Amphisbaena',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Amphisbaena',
    intro:
      'A anfisbena é uma víbora venenosa enorme e agressiva, com uma cabeça em cada ponta do corpo. Move-se como a cascavel-de-lado: lança o corpo para a frente em arco e se ancora mantendo uma cabeça ou a outra no chão o tempo todo.\n\nTerritorial ao extremo, ataca quase tudo que se aproxima do covil, independente do tamanho. O veneno é potentíssimo — um anão robusto cai em minutos se não tratado — mas também entra em vários remédios, o que o torna mercadoria valiosa.\n\nDizem que a primeira anfisbena nasceu do sangue que caiu quando a cabeça de uma medusa foi decepada. A história provavelmente vem do fato de serem imunes à petrificação, o que leva algumas medusas a criá-las como companheiras. Apesar da origem lendária, anfisbenas são animais mundanos, de inteligência rudimentar e sem magia inata.',
    sections: [],
  }),
  fam({
    id: 'family-attic-whisperer',
    name: 'Sussurrante do sótão',
    originalName: 'Attic Whisperer',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Attic%20Whisperer',
    intro:
      'Cuidado com os soluços do sussurrante do sótão: carregam a ira dolorida de uma criança abandonada que morreu pela negligência ou ausência dos cuidadores. Animado pela solidão, o espírito amargo se prende ao mundo material num corpo feito de restos de infância — blocos de madeira, retalhos de cobertor, bonecas surradas, botões, tralhas talhadas, gude de vidro. Para ter jeito de cabeça, coroam o corpo de retalhos com o crânio de um animal pequeno.\n\nEspreitam com mais frequência em enfermarias velhas, orfanatos e instituições onde crianças foram esquecidas. Dormem décadas na esperança de achar um companheiro de brincadeira. Quando sentem os vivos, tentam atraí-los com a voz de uma criança. Querem só brincar — mas os impulsos sombrios drenam fôlego e voz dos vivos.',
    sections: [],
  }),
  fam({
    id: 'family-carbuncle',
    name: 'Carbúnculo',
    originalName: 'Carbuncle',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Carbuncle',
    intro:
      'Lenda e desinformação nunca se encontraram numa testa mais inglória que a do humilde carbúnculo. À primeira vista, não passam de répteis desajeitados. O que os distingue são as habilidades mágicas estranhas e o chifre como gema entre os olhos esbugalhados. Rumores atribuem milagres ao chifre; a verdade é mundana: é só um crescimento altamente reflexivo, não muito diferente de uma unha.\n\nPossuem um sentido que detecta tesouro escondido ou obscurecido. Em geral sentem compulsão de se aproximar e permanecer perto. Estranhamente, perdem o interesse quando as riquezas ficam à vista, como se a ocultação fizesse parte do fascínio. Caçadores de tesouro os seguem na esperança de achar riqueza — mas o medo do carbúnculo torna a empreitada difícil. A maioria abandona o ninho depois de um susto, mesmo quando o sentido os puxaria de volta.',
    sections: [],
  }),
  fam({
    id: 'family-bison',
    name: 'Bisão',
    originalName: 'Bison',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Bison',
    intro:
      "Bisões são bovinos grandes, de focinho curto e dois chifres; pesam até cerca de 900 kg e medem até 1,8 m na cernelha. Manadas trovejam pelas planícies gramadas de Golarion. São visão comum nas Planícies Assobiantes a leste de Taldor e nos pastos largos de Karazh, em Casmaron; também aparecem no nordeste mais frio de Avistão, nos Reinos Fluviais até Numéria, e no Reino dos Senhores dos Mamutes e no Sarkoris ocidental.\n\nComunais, reúnem-se em grande número na temporada de acasalamento do verão, antes que os touros se separem para vagar. Adaptaram-se bem aos invernos duros da pradaria: o pelo cresce mais grosso e os isola; diante de nevascas, viram-se contra o vento e abaixam-se para reduzir a exposição.\n\nO jeito de se espojar na terra ou esfregar-se em pedras grandes faz muita gente confundir docilidade com passividade. Essa presunção já arruinou muitas partidas de caça. Carne farta e peles densas são prêmio tentador, mas com o chão trovejando debaixo delas, bisões atropelam caçadores inexperientes despreparados para uma estampida. Essas partidas às vezes contratam aventureiros ousados, que somam magia, aço e ofício para garantir a caçada.\n\nOs bisões das planícies são os mais conhecidos e numerosos, mas têm primos tanto em florestas boreais densas quanto em estepes abertas. Essas variantes são mais altas, mas não igualam a velocidade e a agressão dos parentes menores da planície.",
    sections: [],
  }),
  fam({
    id: 'family-hippopotamus',
    name: 'Hipopótamo',
    originalName: 'Hippopotamus',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=600',
    intro:
      'Hipopótamos, ou hipos para os íntimos, são animais semiaquáticos que passam a maior parte do tempo em rios e lagos, mas prosperam também em terra. Adultos típicos se movem rápido em terra e atacam com furtividade na água.',
    sections: [
      {
        id: 'hippo-sweat',
        title: 'Suor de hipopótamo',
        body: 'O suor do hipopótamo tem uma cor avermelhada incomum, que os deixa ainda mais assustadores — quase um monstro coberto de sangue. Esse suor ajuda a não superaquecer e também reforça a resistência a todo tipo de doença.',
      },
    ],
  }),
  fam({
    id: 'family-kappa',
    name: 'Kappa',
    originalName: 'Kappa',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Kappa',
    intro:
      "Travessos por natureza, kappas se deleitam em pregar peças em viajantes desavisados. Raramente são maliciosos de verdade, mas viram um incômodo sério: roubam roupa de banhistas ou comida esquecida na fogueira. Também gostam de provar o valor em competições de força e, apesar da trapaça, são competidores honrados: cumprem a palavra e permanecem corteses na conversa.\n\nVariam de região para região, mas todos são humanoides anfíbios com jeito de tartaruga: bico, mãos e pés palmeados, escamas viscosas do verde-azulado ao amarelo-pálido. Muitos têm cabelo preto em anel, deixando livre a depressão no alto da cabeça. Água do lago, riacho ou rio natal enche essa tigela, dita a fonte da força deles. Kappas jovens caem fácil no truque de se curvar e esvaziar a tigela; sem a água, ficam letárgicos. Quanto mais tempo a tigela permanece vazia, mais fracos ficam — raramente fatal perto de casa, mas perigoso para o kappa aventureiro longe da água natal.\n\nNão são hostis por natureza e já fizeram amizade com crianças solitárias e ajudaram aventureiros encalhados com direções ou tratamento médico menor. Mesmo assim, muitas áreas onde kappas habitam têm placas avisando da presença e incentivando viajantes perto da água a jogar um pepino — a comida favorita deles — em troca de passagem segura. Às vezes os próprios kappas colocam essas placas para aumentar a chance de um petisco saboroso.",
    sections: [],
  }),
  fam({
    id: 'family-leprechaun',
    name: 'Leprechaun',
    originalName: 'Leprechaun',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Leprechaun',
    intro:
      'Leprechauns são trapaceiros sobretudo joviais, que preferem travessura a conflito. Enchem o dia de diversão, vinho e comida. Encontrados sobretudo em regiões florestais, respeitam a natureza e quem a protege.\n\nNão atacam à vista. Conversam, tentam encantar, bajular ou enganar quem encontram para que faça favores ou entregue um item prezado — em geral em troca de riqueza ilusória ou promessas falsas. São mestres em discernir o desejo alheio, o que os coloca em posição forte na barganha. Não se importam de virar gente uns contra os outros em benefício próprio, mas em geral não ao ponto de causar dano de verdade.\n\nNa maioria dos casos, o leprechaun não guarda o bem furtado por muito tempo. Devolve o prêmio bem a tempo de desarmar a tensão, apontando o humor da situação. Se a peça foi longe demais e a vítima se enfurece, foge em vez de lutar. Essa disposição de devolver ou fugir some com a idade. Leprechauns antigos, de milhares de anos, caem numa amargura escura e usam ilusões para empurrar quem os ofende — ou quem não ri da piada — para o perigo… ou para a morte.',
    sections: [],
  }),
  fam({
    id: 'family-nixie',
    name: 'Nixe',
    originalName: 'Nixie',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Nixie',
    intro:
      'Esses fey aquáticos costumam guardar lagoas, rios, lagos e nascentes, protegendo lares bucólicos de predadores e de colonos descuidados. Tendem a ser reclusos e a esconder a presença de humanoides, na esperança de que os invasores não lhes deem motivo para agir. Raramente ficam perto de povoados: a indústria tem o hábito de poluir as águas.\n\nHistórias de nixes que concedem desejos miúdos a quem fazem amizade incentivaram mortais a procurá-los — e, ironia, tornaram o favor ainda mais raro. Quem se aproxima com respeito, e melhor ainda com humildade descontraída, tem bem mais chance de resposta favorável. Muitas vezes a nixe pede uma tarefa primeiro: um conto, uma canção, ou algo maior, como afastar um predador ou investigar a fonte da poluição.\n\nSó recorrem à violência se não houver outra opção. Preferem magia primordial para desarmar conflitos antes do sangue. Encantam indivíduos e, se estabelecem influência, incentivam os invasores a partir em paz. Aparecem como humanoides aquáticos do tamanho de uma criança, olhos grandes, barbilhos de bagre, dedos e artelhos palmeados, pele escamada, orelhas pontudas e cabelo longo da cor e textura de alga.',
    sections: [],
  }),
  fam({
    id: 'family-mimic',
    name: 'Mímico',
    originalName: 'Mimic',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Mimic',
    intro:
      'Dizem que nasceram de um experimento falho para animar móveis, ou talvez de uma criação sinistra dos alghollthus. Mímicos são monstros astutos que assumem a forma de objetos fabricados comuns. Rumores preferem portas, mas qualquer objeto com o qual outra criatura vá interagir serve. Predadores de emboscada e comilões vorazes, surpreendem a presa com a capacidade inquietante de imitar mobília e tralha cotidiana. Permanecem disfarçados até aventureiros desavisados passarem — e então atacam.\n\nTêm mentes alienígenas complexas. Muitas vezes cruéis e egoístas, também gostam de conversar com a presa de vez em quando. Por razões desconhecidas, interessam-se especialmente por humanoides; há contos de mímicos que até firmaram parceria por objetivos maiores e compartilhados. Detestam outros da própria espécie e tendem a viver sozinhos. Podem permanecer na forma alternativa por tempo enorme — décadas numa câmara de masmorra. Independentemente da espera, permanecem vigilantes, sempre prontos a enredar a próxima vítima.',
    sections: [],
  }),
  fam({
    id: 'family-mandragora',
    name: 'Mandrágora',
    originalName: 'Mandragora',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Mandragora',
    intro:
      'Uma mandrágora parece um tubérculo recém-arrancado que cresceu na forma deformada de uma criança, com rosto grotesco e corpo hediondamente inchado. Essas plantinhas insidiosas em geral nascem quando uma raiz de mandrágora é regada com sangue de demônio. Ao absorver as propriedades de outro mundo, a raiz anima e é forçada a buscar sangue para se banquetear, senão morre de sede.\n\nSempre famintas, vivem vidas assombradas e doloridas, e cometem atos vis e desesperados para obter o sangue que anseiam. Preferem sangue infundido de magia — unicórnio, fey, feiticeiro — e podem subsistir de poções, bombas alquímicas e elixires; em último caso, aceitam o sangue de criaturas mundanas, que acham insosso e amargo, e não hesitam em reclamar para quem as alimenta.\n\nA mandrágora típica tem o tamanho de uma criança humana; algumas continuam a crescer, chegando a tamanhos comparáveis a gigantes. Às vezes, ao crescer, formam membros extras ou rostos rudimentares, virando caricaturas hediondas da forma humana.',
    sections: [],
  }),
  fam({
    id: 'family-draugr',
    name: 'Draugr',
    originalName: 'Draugr',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Draugr',
    intro:
      'Cadáveres erguidos de marinheiros que morreram no mar, os draugrs feder a podridão das profundezas salgadas. Os olhos brilham com luz verde pavorosa; algas podres, cracas e criaturas marinhas mortas grudam no corpo. Não falam, mas expressam emoções maliciosas com gorgolejos, como se afogassem para sempre com os pulmões cheios d’água. Querem pouco além de atacar os vivos, sobretudo quem navega. Mesmo em terra, muitas vezes arrastam os cadáveres de quem derrubam de volta à água, povoando as profundezas com ainda mais mortos.\n\nErguem-se nos lugares assombrados do mar, onde espíritos inquietos, marés de energia do Vazio ou tempestades sobrenaturais entregam a morte. Um cadáver pode descansar no fundo por um tempo antes de despertar. Coletando detrito e organismos, o corpo fica cada vez mais nojento até enfim se erguer. A proximidade de vida inteligente apressa o processo: um explorador submarino que topa com um naufrágio pode fazer um corpo despertar de súbito. Esses mortos-vivos não levam a intromissão na leveza, sobretudo no local da própria morte.\n\nEmbora odeiem os vivos, são suscetíveis a lembranças da vida de marinheiro. Em particular, uma canção de marinheiro bem cantada ou uma canção de trabalho de pergunta-e-resposta pode fazer o draugr se perder por um instante. Já foram vistos gorgolejando junto, incapazes de cantar as palavras, mas oferecendo acompanhamento assombrado. A calmaria raramente dura: a beleza da canção logo vira lembrança da tragédia, reafirmando o desejo de sangue e morte.',
    sections: [
      {
        id: 'draugr-captains',
        title: 'Capitães draugr',
        body: 'Draugrs mais poderosos, de olhos vermelhos em brasa, chamam-se capitães draugr. São criaturas de 3º nível com o ajuste Elite e podem lançar Névoa como magia inata divina 3 vezes por dia.',
      },
    ],
  }),
  fam({
    id: 'family-goblin-snake',
    name: 'Cobra goblin',
    originalName: 'Goblin Snake',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=597',
    intro:
      'A cobra goblin é uma criatura serpentiforme de cheiro fétido, coberta de escamas pretas gordurosas, com uma cabeça sem lábios, cheia de presas, que lembra a de um goblin. Às vezes treinam cobras como bichos ou companheiras.',
    sections: [
      {
        id: 'indolent-overlords',
        title: 'Senhores indolentes',
        body: 'A natureza exata da relação entre goblins e cobras goblin é matéria de contenda: uns veem as criaturas como semideuses menores ou almas ascendidas de heróis caídos; outros, como abominações a destruir à vista. Uma cobra goblin sortuda o bastante para achar uma comunidade do primeiro tipo trata os admiradores como inferiores, se não servos explícitos, e espera oferendas regulares de comida e objetos de valor.',
      },
    ],
  }),
  fam({
    id: 'family-trollhound',
    name: 'Cão-troll',
    originalName: 'Trollhound',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Trollhound',
    intro:
      "Cães-troll são feras baixas e babosas, trolls em forma canina. Com fome quase insaciável atiçada pelo metabolismo regenerativo, matilhas selvagens percorrem as encostas onde trolls habitam em busca de carne em quantidade. Em algumas regiões, trolls os criam como bichos, usando o faro aguçado na caçada.\n\nCobertos de feridas fétidas que choram, carregam um contágio debilitante chamado febre de sangue em brasa. Quem contrai a doença pela mordida sente dor interna profunda, como se o sangue estivesse em fogo. Sintomas extras: perda de coordenação, bolhas de pus, letargia e fadiga. Trolls e cães-troll são imunes aos efeitos maiores da doença, além da irritação da pele.\n\nSão destemidos na caça e no combate, confiando na regeneração. Nem a ameaça do fogo os repele: não reconhecem o perigo. Mesmo assim, fogo é uma das ferramentas mais eficazes contra eles; caçadores espertos queimam até o último resto de um cão-troll tido por morto, pois o poder regenerativo é de fato potente.\n\nEmbora trolls tenham grande sucesso em domesticar, treinar e até fazer amizade com cães-troll, o mesmo não se diz de outros aspirantes a dono. Seja pela exposição constante à baba doente, pela fome voraz que nunca parece saciada, ou simplesmente pelo temperamento ruim e rápido para morder, a maioria das tentativas de usá-los no lugar de guardiões mais confiáveis termina em dor, miséria e uma matilha feral fugindo para o interior.\n\nDeixados por conta própria, reproduzem-se relativamente rápido. Pode levar menos de um ano para uma matilha pequena multiplicar-se a ponto de ameaçar o campo. Melhor deixar os cães-troll para os trolls, como se diz!",
    sections: [],
  }),
  fam({
    id: 'family-kelpie',
    name: 'Kelpie',
    originalName: 'Kelpie',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Kelpie',
    intro:
      'Kelpies são fey malévolos, anfíbios e metamorfo, que atraem mortais para uma cova aquática. Esses predadores cruéis espreitam corpos d’água de qualquer tipo, com leve preferência pela doce sobre a salgada. Atraem ou arrastam a presa para debaixo d’água, afogam e devoram, deixando para trás só o coração e o fígado — as únicas partes da refeição que acham desagradáveis — jogados na margem. Gostam de se disfarçar magicamente de corcel fino ou de estranho atraente; a forma verdadeira é um equino hediondo, de carne verde viscosa que lembra planta aquática.',
    sections: [],
  }),
  fam({
    id: 'family-terror-bird',
    name: 'Ave do terror',
    originalName: 'Terror Bird',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=626',
    intro:
      'Aves do terror não são uma espécie só, e sim uma família de predadores aviários mortais e incapazes de voar. Todas são capazes de explosões de grande velocidade e têm bicos poderosos que rasgam a carne da presa. A maioria espreita pradarias e estepes abertas, competindo direto com outros predadores grandes, como grandes felinos e lobos. As comuns são caçadoras notáveis: sozinhas, usam a velocidade para pegar a presa de surpresa; em bando, podem abater bestas maiores, como auroques, pelo número avassalador.',
    sections: [
      {
        id: 'diatryma',
        title: 'Diatryma',
        body: 'Diatrymas são criaturas de 1º nível aparentadas às aves do terror, com o ajuste Fraca. Essas parentes menores têm penas escuras e medem cerca de 1,8 a 2,1 m — menores que as aves do terror, mas não menos ferozes. Encontram-se sobretudo em regiões mais secas e ostentam bicos pequenos e laranja.',
      },
    ],
  }),
]
