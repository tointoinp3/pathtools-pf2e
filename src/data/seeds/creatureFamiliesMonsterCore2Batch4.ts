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
 * Lore de família Remaster para o 4º lote do Monster Core 2.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core 2 / Monster Core).
 * Famílias já existentes (grioth, zumbi, tripkee, arconte, velstrac, topiária viva,
 * urdefhan, esqueleto, elemental, cavaleiro da tumba, fantasma, gosma, sahkil,
 * arbóreo, água-viva, diabo, lagarto, proteano, div, aeon, bruxa) não se repetem aqui.
 */
export const catalogCreatureFamiliesMonsterCore2Batch4: CreatureFamily[] = [
  fam({
    id: 'family-morlock',
    name: 'Morlock',
    originalName: 'Morlock',
    trait: 'Morlock',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=608',
    intro: stripList(
      'Morlocks descendem de humanos perdidos nos túneis escuros e emaranhados das camadas superiores das Terras Sombrias há milhares de gerações. Os olhos cresceram grandes e pálidos para absorver qualquer fragmento de iluminação. Os corpos ficaram nervosos por uma dieta alterada e os braços alongaram-se, tornando-se perfeitos para o andar estranho de quatro membros que lhes permite atravessar as passagens subterrâneas. Porém, as formas escondem força e rapidez. Morlocks já não lembram as vidas que os ancestrais levavam na superfície, embora muitos habitem ruínas estilhaçadas que a terra engoliu. Alguns adoram as estátuas de humanos dessas eras passadas como deuses, mas outros agora veneram Lamashtu, Rovagug ou outras deidades violentas.\n\nMorlocks em geral medem pouco mais de 1,5 m e pesam cerca de 68 kg.',
    ),
    sections: [],
  }),
  fam({
    id: 'family-munsahir',
    name: 'Munsahir',
    originalName: 'Munsahir',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=342',
    source: 'Rage of Elements',
    sourcePage: 131,
    intro: 'Munsahirs constroem sociedades militaristas e tradicionais.',
    sections: [
      {
        id: 'munsahir-hierarchy',
        title: 'Hierarquia munsahir',
        body: 'Os três estratos da sociedade munsahir podem ser observados nas saias usadas por todos os membros. Nobres, os governantes inatacáveis, vestem saias elaboradas de latão. No meio da sociedade estão comerciantes e negociantes enfeitados de bronze. Cobre cru adorna a classe trabalhadora, que faz a maior parte da construção e do trabalho pesado. Oficialmente, não há mobilidade de classe; crimes horríveis podem mandar um nobre de latão para a prisão, mas não lhe tiram a posição.',
      },
    ],
  }),
  fam({
    id: 'family-dig-widget',
    name: 'Bugiganga Escavadora',
    originalName: 'Dig-Widget',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dig-Widget',
    intro:
      "Ladrões cobiçam as bugigangas escavadoras, construtos especializados feitos para infiltração. Cada bugiganga escavadora contém inúmeras ferramentas simples, inclusive um conjunto de dispositivos mecânicos que funcionam como ferramentas de ladrão, dois braços com brocas e dois braços com trados para prender-se e escalar superfícies. Uma vez ativadas, esses dispositivos impulsionam-se para frente. Embora tenham as faculdades típicas de um construto, em geral seguem uma rotina simples: evitar ser notado, abrir qualquer fechadura que barre o caminho, escavar obstáculos e atacar se forem pegos. Raramente são deixadas sem supervisão, pois um ladrão precisa estar por perto para seguir atrás — tanto para roubar bens quanto para impedir a bugiganga escavadora de seguir na ladroagem depois de alcançar o objetivo.\n\nA fonte de poder de uma bugiganga escavadora é tanto mecânica quanto mágica. As engrenagens e molas que lhe dão mobilidade são um aprimoramento sobre criações de corda verdadeiras mais primitivas (cujas funções exigem corda constante para permanecer móveis), mas ao custo da segurança, pois as peças móveis de uma bugiganga escavadora podem ser desmontadas depressa por ladrões e outros com o treino adequado.\n\nEmbora muitas autoridades proíbam bugigangas escavadoras, têm mais dificuldade de confiscá-las do que se esperaria. Um número considerável de quem encontra bugigangas escavadoras, de aventureiros contratados a kobolds tuneladores, está bem mais inclinado a ficar com os construtos do que entregá-los para serem desmontados. Muitas vezes, isso se deve simplesmente à novidade da bugiganga escavadora, mais do que a qualquer desejo de usá-la.",
    sections: [],
  }),
  fam({
    id: 'family-sabosan',
    name: 'Sabosan',
    originalName: 'Sabosan',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Sabosan',
    intro:
      "Sabosans são humanoides inteligentes semelhantes a morcegos que vivem em florestas quentes e bebem o sangue de outras criaturas, em particular de pessoas. Têm torsos finos e emaciados e asas largas e coriáceas que podem alcançar uma envergadura de quase 6 m. A cabeça, o pescoço, os ombros e o peito superior dos sabosans são cobertos de pelo vermelho ou marrom-escuro que oculta a carne esticada e fina. Embora as orelhas sejam grandes e pontudas como as de um morcego e possam ecolocalizar como os morcegos, a visão também é bem forte, o bastante para rastrear a presa com facilidade em luz baixa.\n\nAlguns estudiosos naturalistas acreditam que sabosans sejam descendentes distantes de humanos acometidos de vampirismo que conseguiram evitar sucumbir à morte-viva. Outros postulam que um dia foram um culto de adoradores de demônios cujos ritos sombrios os transformaram nas formas atuais. Sejam quais forem as origens verdadeiras, sabosans têm reputações infames entre vilas e cidades ao sul do equador de Golarion. Até meros rumores de sabosans numa área bastam para disparar caçadas em toda a cidade, e os verdadeiramente supersticiosos não hesitam em atear fogo perto de cada gruta, recanto e toca que encontram para defumar as criaturas noturnas.\n\nSabosans caçam nas horas do crepúsculo ou logo após o anoitecer, quando a ecolocalização lhes dá vantagem sobre a presa adormecida. São caçadores capazes, mas indiscriminados quanto às fontes de alimento; o metabolismo rápido significa que sabosans precisam comer quase 9 kg de carne e fruta por dia, suplementados, claro, com quantidades copiosas de sangue.\n\nA fé obscura dos sabosans reverencia duas deidades: o Senhor Demônio morto Vyriavaxus, Senhor das Sombras, e o deus-sol quase esquecido Easivra. Vyriavaxus tem um vínculo óbvio com as criaturas, com a aparência de um morcego gigante, mas a conexão com o deus-sol sugere uma profundidade complexa nas crenças sabosan.",
    sections: [],
  }),
  fam({
    id: 'family-skaveling',
    name: 'Skaveling',
    originalName: 'Skaveling',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Skaveling',
    intro:
      "É preciso realizar um ritual hediondo para fazer um skaveling. Embora às vezes chamados morcegos carniçais, são mortos-vivos especificamente fabricados, não carniçais verdadeiros. Os urdefhans sugadores de sangue das Terras Sombrias criam morcegos gigantes com um fungo tóxico e a carne de carniçais — especificamente os cérebros. Ao alcançar a maturidade, esses morcegos gigantes são ritualmente mortos por veneno. Embora isso faça apodrecer a carne da maioria das criaturas, os morcegos especialmente preparados erguem-se imediatamente da morte como skavelings.\n\nApesar das asas esfarrapadas e da pele flácida, skavelings são bem capazes de voo, mesmo carregando uma criatura nas costas. Urdefhans muitas vezes os usam como montarias. A inteligência é mais avançada que a de um morcego gigante típico, e em combate comportam-se mais como aliados do que como animais, capazes de tomar decisões táticas.",
    sections: [],
  }),
  fam({
    id: 'family-divine-warden',
    name: 'Guardião Divino',
    originalName: 'Divine Warden',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=581',
    intro: stripList(
      'Criados por rituais complexos realizados pelos adeptos de uma fé, os construtos conhecidos como guardiões divinos foram imbuídos com uma fração do poder que percorre um campeão ou clérigo de uma deidade em particular. Essa faísca divina permite ao guardião divino servir de protetor de um templo, santuário ou outro sítio sagrado. Tais sentinelas não estão intrínsecamente presas a um local fixo, mas raramente deixam o templo ou sítio que lhes foi dado.\n\nOs fiéis que fabricam guardiões divinos em geral os animam com um ritual especial no qual os seguidores suplicam à deidade que empodere o guardião. O mandato divino que imbui o construto com poder também permite à sentinela reconhecer inimigos de sua deidade e impede o guardião divino de atacar outros membros da fé, a menos que esses patronos o ataquem primeiro.\n\nEm casos raros ou tempos particularmente graves, uma deidade pode criar um guardião divino animando diretamente uma estátua ou ídolo existente para auxiliar seguidores fiéis. Esses guardiões divinos são os mais propensos a serem encontrados fora dos locais originais, auxiliando congregações deslocadas ou perseguindo quem possa prejudicar os fiéis.',
    ),
    sections: [
      {
        id: 'heroes-of-the-faith',
        title: 'Heróis da fé',
        body: 'Nas raras instâncias em que uma deidade cria pessoalmente um guardião divino, a deidade tende a animar representações de grandes heróis de sua fé. A imagem específica do herói serve para inspirar devotos e atuar como líder em combate. Ocasionalmente, a deidade chama o espírito do herói para de fato incorporar o guardião divino, permitindo ao herói lutar pela fé mais uma vez.',
      },
    ],
  }),
  fam({
    id: 'family-maftet',
    name: 'Maftet',
    originalName: 'Maftet',
    trait: 'Maftet',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Maftet',
    intro:
      "Maftets são humanoides de asas de falcão com corpo inferior leonino que habitam ruínas antigas e cidades tidas como perdidas, em geral em regiões de deserto ou montanha. Veem-se como guardiões e praticam uma técnica especializada de empunhar duas cimitarras tão central à cultura que as cimitarras de um maftet muitas vezes são heranças familiares prezadas. A maioria dos maftets venera os ancestrais além de várias deidades, e até uma criança consegue detalhar a linhagem familiar por várias gerações. Os bandos maftet tendem a ser matriarcais e isolacionistas, embora maftets não sejam necessariamente hostis a forasteiros que respeitem seus lares e não busquem saqueá-los.\n\nQuando um maftet jovem chega à idade adulta, recebe tatuagens rúnicas de um ancião do bando. Essas tatuagens são imbuídas de magia que permite a um maftet encantar as armas empunhadas, mas os desenhos individualizados contam dos ancestrais do maftet, das aventuras da infância e das qualidades positivas. Tais tatuagens são consideradas sagradas e nunca são dadas a não maftets.",
    sections: [],
  }),
  fam({
    id: 'family-skull-peeler',
    name: 'Descascador de Crânios',
    originalName: 'Skull Peeler',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Skull%20Peeler',
    intro:
      "Descascadores de crânios, apesar do apelido feroz e bem merecido, são considerados por muitos francamente adoráveis, sobretudo quando vistos a uma distância segura. O pelo macio, malhado de marrom, ajuda-os a esconder-se nos dosséis da floresta, e têm asas insetoides cintilantes e olhos grandes que captam os raios de luz mais tênues. À primeira vista, um descascador de crânios parece um bicho de estimação fofo ou um familiar de mago. Quaisquer ilusões de domesticar tal fera são depressa descartadas ao ver como um descascador de crânios come, porém.\n\nDescascadores de crânios evoluíram para pendurar-se imóveis nos dosséis das árvores enquanto esperam até que presa adequada apareça, em geral dinossauros de pescoço longo, mas também primatas que se balançam pelos galhos e aves grandes. O descascador de crânios então dispara a língua longa, decepando a cabeça da criatura do corpo e puxando o crânio destacado de volta às patas famintas. Então usa as garras para rachar a cavidade craniana — daí o nome — antes de lamber o interior saboroso.\n\nApesar dos hábitos alimentares macabros dos descascadores de crânios, algumas empresas e indivíduos não resistem ao impulso de acrescentar essas feras às coleções. Fey e outras criaturas com laços com o Primeiro Mundo, como gnomos, ocasionalmente conseguem persuadir um descascador de crânios a uma forma de domesticação. Embora as feras adoráveis nunca possam ser plenamente amansadas por causa dos instintos de caça hiperevoluídos, podem ser subornadas com comida e, se mantidas saciadas, exibidas num poleiro ou terrário interno como exemplo da astúcia e da letalidade do mestre. Com a mesma frequência, esses descascadores de crânios pseudodomesticados acabam devorando um convidado, um animal de estimação ou o pretenso dono, mas essa possibilidade não impede senhores do crime em ascensão de tentar amansar os predadores miúdos. Descascadores de crânios mantidos em zoológicos bem administrados saem-se um pouco melhor, mas essas criaturas espertas nem sempre ficam nas jaulas, o que levou a descascadores de crânios selvagens em lugares que viajantes talvez não esperem.",
    sections: [],
  }),
  fam({
    id: 'family-witchwyrd',
    name: 'Witchwyrd',
    originalName: 'Witchwyrd',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Witchwyrd',
    intro:
      "Witchwyrds ocultam a maior parte do rosto, deixando só os olhos sem máscara. A inescrutabilidade é um trunfo para um de seus interesses mais significativos — o mercantilismo — e muitos witchwyrds altivos deleitam-se abertamente no desconcerto inspirado pelos disfarces e maneirismos misteriosos. Witchwyrds têm olho aguçado para oportunidades e mercados novos, e quase sempre sabem quando alguém tenta enganá-los.\n\nEssas criaturas humanoides de quatro braços têm pele azul-acinzentada sem pelos, em geral têm cerca de 2 m de altura e pesam 136 kg. As mãos têm três dígitos de tamanho e espaçamento iguais numa disposição semelhante a um tripé. Quando não tentam misturar-se à comunidade local, witchwyrds favorecem roupas extravagantes e folgadas em vermelhos ou amarelos vivos e um chapéu cônico característico. Tendem a preferir as regiões mais secas e quentes das terras que visitam — talvez um indicador do mundo natal misterioso. Witchwyrds são notoriamente calados sobre detalhes desse lugar distante, e com boa razão: a maioria dos witchwyrds em Golarion nunca visitou o lar ancestral. Para esses witchwyrds, a noção de um planeta natal é um espinho constante no lado, e quando perguntados muitos escolhem ignorar a questão de vez. Outros agitam-se tanto com essas indagações que respondem com impaciência ou até violência. Alguns estudiosos teorizaram uma conexão entre witchwyrds e várias outras criaturas de quatro braços, mas como nas perguntas sobre o lugar de origem, witchwyrds têm pouco a dizer sobre o tópico.",
    sections: [],
  }),
  fam({
    id: 'family-alghollthu',
    name: 'Alghollthu',
    originalName: 'Alghollthu',
    trait: null,
    source: 'Monster Core',
    sourcePage: 12,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=358',
    intro:
      'Em milênios passados, monstros aquáticos conhecidos como alghollthus usaram poderes ocultos para conquistar e governar faixas vastas do mundo. Alghollthus moldavam servos e outras criaturas com manipulação mental e magia de transformação física. Os governantes dos alghollthus, os chamados “mestres velados”, moldavam ainda sociedades inteiras assumindo as formas daqueles que controlavam.\n\nCom o tempo, os alghollthus frustraram-se com sociedades da superfície em ascensão e deuses intrometidos. Usaram poder mágico incrível para invocar um cataclismo, na esperança de destruir as sociedades rebeldes que haviam manipulado. Porém, calcularam mal a vontade de sobreviver daqueles que tratavam como peões, e com o tempo o mundo se recuperou, desta vez livre da influência alghollthu.\n\nHoje, os alghollthus permaneceram sobretudo nos reinos aquáticos profundos onde ainda governam sem questionamento. Porém, não abandonaram os planos por completo, e o ressurgimento de servos como os perseguidores sem rosto sugere que os alghollthus voltaram os olhos odientos para a superfície.',
    sections: [
      {
        id: 'alghollthu-memory-crystals',
        title: 'Cristais de memória alghollthu',
        body: 'Com formas e colorações únicas, cristais de memória alghollthu podem ser excepcionalmente valiosos conforme as recordações armazenadas. Cristais de memória formam-se com forma e coloração que combinam com o tom, a clareza e a gravidade da memória; memórias desinteressantes tendem a aparecer como bugigangas de vidro, enquanto as mais valiosas assumem formas únicas e cores cada vez mais opacas. O valor desses cristais sobe quanto mais únicas forem na aparência, e muitas vezes são procurados por colecionadores. Entre os mais raros desses cristais de memória diz-se haver um icoságono verde-esmeralda obscurecido que supostamente contém o conhecimento da morte de Aroden. O rumor é que foi passado de nymolus a nymolus, então nunca foi absorvido.',
      },
      {
        id: 'ancient-influences',
        title: 'Influências antigas',
        body: 'Os mestres velados influenciaram os antigos azlanti, e foram eles que invocaram o apocalipse da Queda da Terra para destruir Azlant quando a humanidade ficou orgulhosa demais. Que esse ato também tenha chamado a Pedra-Estrela mágica, um artefato capaz de transformar mortais em deuses, foi uma reviravolta irônica considerando a intolerância dos alghollthus à fé.',
      },
      {
        id: 'other-alghollthus',
        title: 'Outros alghollthus',
        body: 'Embora os mestres velados sejam os governantes da sociedade alghollthu, não são os mais poderosos de sua espécie. Criaturas maiores e mais misteriosas que funcionam como redes de pensamento orgânicas, imensos motores aquáticos de guerra ou extratores especializados de segredos esquecidos habitam as cidades submersas. Enquanto isso, o mundo acima permanece infestado de criaturas que originalmente foram criadas pelos alghollthus, mas que há muito se afastaram dos progenitores aquáticos para se tornar as próprias monstruosidades sinistras.',
      },
    ],
  }),
  fam({
    id: 'family-elasmosaurus',
    name: 'Elasmosauro',
    originalName: 'Elasmosaurus',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Elasmosaurus',
    intro:
      "Elasmosauros são répteis primevos de pescoço longo que habitam oceanos e mares profundos. Embora não sejam verdadeiramente um dinossauro, elasmosauros muitas vezes são encontrados em locais semelhantes e são criaturas igualmente titânicas. Mantendo os corpos maciços debaixo d’água, elasmosauros usam os pescoços longos para pegar presa e respirar ar para os pulmões enormes enquanto permanecem em grande parte ocultos da superfície acima. Um elasmosauro tem 9 m de comprimento e pesa 2.700 kg.\n\nPor mais raros e reclusos que sejam, elasmosauros às vezes são tomados por criaturas ainda mais raras chamadas orms aquáticos, habitantes aquáticos lendários de lagos remotos conhecidos pela elusividade e pela astúcia. Enquanto elasmosauros são criaturas mundanas de inteligência animal, orms aquáticos são seres mágicos com inteligência quase humanoide e um fascínio curioso por mortais, e parecem deleitar-se em confundir observadores. Como resultado, teoriza-se que um orm aquático típico fica mais do que feliz em levar um grupo de espectadores a um elasmosauro perdido, tanto para despistar os perseguidores quanto pela hilaridade que inevitavelmente se seguirá.\n\nEmbora elasmosauros muitas vezes sejam encontrados em mundos perdidos e regiões despovoadas, os que habitam os oceanos do mundo não contêm os terrenos de caça a regiões específicas. Como resultado, não é inédito um espécime errante achar o caminho até águas costeiras. Os que o fazem muitas vezes acham os portos de vilas pequenas ou até de cidades grandes banquetes maravilhosos e em geral são caçados por guardas costeiros ou aventureiros. Quando um elasmosauro extraviado como esse acha o caminho para o sistema de esgotos ou os reservatórios de uma cidade, porém, pode tornar-se matéria de lendas urbanas.",
    sections: [],
  }),
  fam({
    id: 'family-hound-of-tindalos',
    name: 'Cão de Tindalos',
    originalName: 'Hound of Tindalos',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hound%20of%20Tindalos',
    intro:
      "Esguios e sequiosos, os cães de Tindalos são atraídos àqueles que adulteram o fluxo do tempo, viajam pelo tempo ou usam magia ou drogas alquímicas raras para enviar os pensamentos ou a percepção para trás ou para frente no tempo. Conjuradores poderosos podem puxá-los da Dimensão do Tempo por rituais raros, mas fazê-lo atrai a ira dos cães, então poucos que traficam tais rituais vivem o bastante para espalhar o conhecimento. Embora os cães possuam grande astúcia e intelecto cruel, raramente interagem com outras criaturas — a não ser para caçar e destruir aqueles que atraíram a atenção que não pisca.\n\nUma vez que um cão pega o cheiro de um mortal para caçar, chama outros da própria espécie. A matilha então persegue a vítima por todo o espaço e o tempo até pegá-la, matá-la e devorá-la. Os perseguidos só podem escapar evitando todos os ângulos, pois cães de Tindalos poderiam atravessá-los a partir do nada a qualquer momento.",
    sections: [],
  }),
  fam({
    id: 'family-narrik',
    name: 'Narrik',
    originalName: 'Narrik',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Narrik',
    intro:
      "Bem abaixo da superfície de Golarion, matilhas de narriks caçam em túneis das Terras Sombrias, buscando seres infelizes para devorar. Essas criaturas hediondas são vagamente humanoides, mas carecem de uma cabeça tradicional — dezenas de olhos em grande parte vestigiais encimam os corpos, enquanto uma boca maciça cheia de presas fende o peito. A língua longa contém órgãos olfativos, que narriks usam principalmente para caçar.\n\nA presa predileta dos narriks são seres sencientes — calignis, hryngars, gnomos umbrais, e aventureiros e comerciantes da superfície — e saboreiam o gosto que o medo acrescenta à carne crua. Entre as várias substâncias alquímicas produzidas naturalmente pelos corpos está uma saliva psicotrópica que enche as vítimas de terror, não só realçando o sabor, mas também permitindo que narriks cacem com mais facilidade.\n\nNarriks têm pouco em termos de civilização, pois passam o tempo principalmente caçando em vez de construir ou outras atividades. Estudiosos não têm certeza de como se reproduzem, pois nenhum chegou perto o bastante para estudar tais hábitos. Há, porém, registros de ataques de narriks marcadamente menos maduros ao longo da história. Tais assaltos ocorreram longe de outros narriks, então muitos acreditam que a prole narrik é forçada a criar as próprias matilhas uma vez que alcança a idade adulta.",
    sections: [],
  }),
  fam({
    id: 'family-praskith',
    name: 'Praskith',
    originalName: 'Praskith',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Praskith',
    intro:
      "Essas amálgamas estranhas de planta e fungo com tendências animais formam-se onde o mundo natural é corrompido por magia vil ou fronteiras planares desfiadas. Praskiths são predadores de emboscada instintivos que buscam trilhas florestais pouco percorridas e ficam à espera no sub-bosque. Um praskith engole a presa o mais depressa possível e deixa os sucos digestivos paralíticos terminarem a refeição, restaurando-se depressa com o nutrimento fornecido pela criatura presa. Quando coletados, neutralizados e refinados, os fluidos digestivos de um praskith formam uma laca que retém parte da resistência a ácido da criatura.\n\nUm praskith nasce com um entendimento rudimentar da língua Fey, mas em alguns casos pode manifestar-se conhecendo outra língua, como Aklo, Dracônico ou até Necril. De qualquer forma, praskiths têm pouca paciência para tagarelar com refeições potenciais, embora alguns fey determinados e conjuradores primordiais já tenham formado alianças ou até laços mais estreitos com praskiths. Fazer amizade com um praskith exige grande paciência e comida abundante — e os presentes de comida precisam estar vivos quando entregues.\n\nQuando termina de alimentar-se, um praskith entra num estado quiescente por um dia inteiro, uma das poucas vezes em que é seguro aproximar-se. Ao despertar, busca a floresta profunda para regurgitar as porções menos digeríveis da refeição. Esses restos podem conter objetos de valor que sobreviveram à digestão e indicam que os terrenos de caça de um praskith ficam por perto.\n\nPraskiths habitam bosques e selvas profundos. Praskiths bem alimentados desenvolvem corpos de frutificação que lançam milhões de esporos. Esporos que por acaso pousam em carniça crescem em praskiths novos.",
    sections: [],
  }),
  fam({
    id: 'family-sceaduinar',
    name: 'Sceaduinar',
    originalName: 'Sceaduinar',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Sceaduinar',
    intro:
      "Criaturas estranhas nascidas de cristais denteados no coração do Vazio, sceaduinars são alimentados por sua energia do Vazio e impelidos a extinguir toda vida. Lembrando gárgulas cristalinas com membros serrilhados e rostos afiados de morcego, sceaduinars têm cerca de 2,1 m de altura e pesam em torno de 45 kg.\n\nEsses seres malévolos às vezes reúnem-se em matilhas grandes da própria espécie. Apesar da inteligência, agem na maior parte como feras astutas e ferais, embora ocasionalmente construam ferramentas para ajudá-los a extinguir a vida. Sceaduinars navegam os grandes vazios do plano natal, buscando destruir quaisquer faíscas de vida que achem o caminho até aquele reino mortal — até as faíscas torcidas encontradas em criaturas mortas-vivas.\n\nQuando descobrem portais para outros planos, sceaduinars enxameiam em grande número, massacrando todos que encontram. Embora habitar fora do Vazio seja desconfortável para sceaduinars, podem existir por períodos prolongados apartados do lar. Claro, a sensação de um plano onde a energia do Vazio não é a regra não melhora a disposição dessas criaturas e, como resultado, tendem a ser particularmente cruéis e violentos quando encontrados em tais reinos.",
    sections: [],
  }),
  fam({
    id: 'family-slithering-pit',
    name: 'Fosso Serpenteante',
    originalName: 'Slithering Pit',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Slithering%20Pit',
    intro:
      "Um fosso serpenteante é uma gosma estranha, quase invisível, com um espaço extradimensional como sistema digestivo, que imita a aparência de um fosso de pedra cheio de ácido. Dissolve devagar os cativos no ácido estomacal até que possam ser digeridos. Um fosso serpenteante pode passar semanas sem alimentar-se, o que lhe dá paciência.\n\nProsperando em áreas dilapidadas, o fosso serpenteante posiciona-se entre os buracos abundantes onde pode passar facilmente por só mais uma mancha. Rasteja por ruas de paralelepípedos precárias e complexos subterrâneos úmidos, esperando que presa desavisada tropece e caia dentro.",
    sections: [],
  }),
  fam({
    id: 'family-stygira',
    name: 'Stygira',
    originalName: 'Stygira',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Stygira',
    intro:
      "Essas criaturas marcadas e sem olhos aparecem como eremitas murchos envoltos em trapos esfarrapados. Podem comandar segredos estranhos da terra e interpretar as energias fatídicas das profundezas subterrâneas. Em algumas regiões, stygiras são adoradas como videntes ou até deuses, embora careçam da habilidade de conceder magias a clérigos e muitas vezes nem estejam cientes dos adoradores. Em outras áreas, têm laços estranhos com os impérios antigos dos ciclopes, frequentemente habitando as ruínas superdimensionadas que aquelas criaturas deixaram há muito. Para muitas stygiras, gemas colhidas de mosaicos ciclópicos antigos têm propriedades mágicas ainda maiores que as de outros cristais.\n\nEmbora tecnicamente cegas, stygiras têm olhos vestigiais ocultos sob a carne pedregosa e marcada dos rostos. Capazes de sentir luzes brilhantes mesmo através das cicatrizes, stygiras ficam enjoadas e distraídas por esses vislumbres ofuscantes, então permanecem nas cavernas durante o dia e só vagueiam pelo mundo acima depois do anoitecer. Longe de benévolas, stygiras muitas vezes interceptam viajantes desavisados para reduzir as vítimas aos químicos básicos e humores sobrenaturais necessários para infundir as gemas com a capacidade de lhes dar visão e poder mágico.",
    sections: [],
  }),
  fam({
    id: 'family-totenmaske',
    name: 'Totenmaske',
    originalName: 'Totenmaske',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Totenmaske',
    intro:
      "Gerados pelas mesmas obsessões antinaturais e autodestrutivas que os impeliam quando ainda viviam, totenmaskes são os restos mortos-vivos dos mais autoindulgentes e pecaminosos entre os mortais. A necessidade de indulgência mostrou-se mais forte até do que o jugo da morte, erguendo-os das tumbas. Embora incapazes de saciar os desejos depravados, esses mortos-vivos vis podem drenar a própria carne das vítimas para envolver-se numa paródia perversa de vida que lhes permite perseguir os anseios básicos. Os anseios específicos dos totenmaskes variam — um pode obcecar-se com comida ou bebida, enquanto outro pode ser vão e desejoso de uma forma atraente para maravilhar-se num espelho, enquanto ainda outro pode simplesmente ansiar pelo cheiro de sangue.\n\nSeja qual for a sensação que o totenmaske busca, é sempre um vício levado ao extremo, pois esse pecado ajudou a condená-los à morte-viva em primeiro lugar. Um totenmaske obcecado com comida, por exemplo, pode achar-se assaltando padarias ou cervejarias, enquanto um totenmaske vão obcecado com glamour pode entediar-se depressa de cada visual novo e trocar as vítimas diariamente, ou até de hora em hora.",
    sections: [],
  }),
  fam({
    id: 'family-tupilaq',
    name: 'Tupilaq',
    originalName: 'Tupilaq',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Tupilaq',
    intro:
      "Um tupilaq é um construto artisticamente entalhado, esculpido de ossos de animais (em geral baleia ou morsa) e imbuído com o propósito expresso de eviscerar os inimigos do criador. Um tupilaq manifesta-se de magia odienta — tal coisa só pode ser criada por alguém que acredita ter sido gravemente injustiçado. Quando um crime terrível e imperdoável é cometido contra alguém com grande habilidade de entalhe e que tem conhecimento do ritual adequado, o agraviado pode canalizar o luto e o ódio por encantações sussurradas para dar vida a um tupilaq.\n\nInfelizmente, as mesmas emoções usadas para criar um tupilaq muitas vezes levam a tragédias ainda maiores. Funcionalmente imortal, mas feito para a vingança, um tupilaq carece da razão ou do discernimento para fazer qualquer coisa além de perseguir a meta imbuída pelo criador. Um desejo de destruir por completo um inimigo pode levar um tupilaq a massacrar um assentamento inteiro, matando até ter abatido todos mesmo remotamente relacionados ao ofensor original. Muitas histórias descrevem como um tupilaq acaba causando mais tragédia para o criador do que o crime que precipitou a criação. Os contos mais comuns apresentam o tupilaq por fim assassinando o cônjuge ou os membros da família do criador devido a um parentesco distante com o alvo original que ninguém conhecia.\n\nAs energias animadoras de um tupilaq não estão atadas às funções originais, e a criatura em geral sobrevive por muito tempo ao criador, às vítimas e muitas vezes a qualquer um que recorde a razão de sua criação. Pode cair numa espécie de hibernação uma vez que alcançou a vingança imediata, mas em muitos casos os construtos despertam de novo para continuar o rampage contra alvos desprevenidos ignorantes de seu envolvimento.\n\nConjuradores ocasionalmente invocam esses construtos. Um tupilaq invocado, arrancado sem cerimônia de sua vingança, torna-se um combatente quase frenético, desencadeando cada habilidade ofensiva do arsenal para libertar-se. Essas reações não são estratégicas nem ponderadas, mas uma necessidade instintiva, quase programada, de voltar ao propósito verdadeiro. Conjuradores devem ter cautela com um tupilaq empregando magias que possam ser voltadas contra o invocador, como uma bola de fogo “acidentalmente” colocada de modo que a magia incinere o conjurador e devolva as criaturas de onde vieram.",
    sections: [],
  }),
  fam({
    id: 'family-aigamuxa',
    name: 'Aigamuxa',
    originalName: 'Aigamuxa',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Aigamuxa',
    intro:
      "Aigamuxas são humanoides imponentes que espreitam desertos áridos em busca de presa. Carnívoros e vorazes, caçam qualquer coisa que se mova, mas saboreiam em especial comer criaturas sencientes. Muitos povos Mwangi referem-se incorretamente a aigamuxas como demônios, enquanto outros os descrevem com mais precisão como descendentes de gigantes. Aigamuxas lembram humanos grandes com cavidades lisas onde os olhos deveriam estar, mas os olhos estão de fato embutidos nas solas dos pés. Ostentam garras longas e afiadas e dentes que usam para dilacerar a presa uma vez que a pegam. A marcha estranha de um aigamuxa em movimento lembra mais uma dança do que um andar ou corrida típicos, mas a velocidade é alarmante, embora difícil de estimar corretamente à distância.\n\nA fisiologia única de um aigamuxa torna difícil pegar a presa, e a maioria dos aigamuxas está constantemente faminta. Ao perseguir a presa, um aigamuxa precisa parar ocasionalmente para erguer os pés a fim de retomar o rumo. A maioria fica de mãos no chão enquanto olha em volta, o que lhes permite imediatamente dar um salto mortal de volta à corrida. Os olhos de um aigamuxa são em geral resistentes às areias dos habitats nativos de deserto, mas irritantes como pimentas ou estrepes podem prejudicar seriamente a habilidade de caça, e viajantes do deserto muitas vezes carregam um saco desses para o caso de precisarem lidar com um aigamuxa.\n\nAigamuxas espertos sabem que atacar presa errante pode ser muito perigoso, e em vez disso usam as mãos poderosas para cavar fundo em dunas de areia ou terra e esperar para emboscar quem passa. Aigamuxas são particularmente bons em esconder-se nos ambientes natais, e viajantes infelizes muitas vezes não notam os olhos quase invisíveis de um aigamuxa até ser tarde demais.",
    sections: [],
  }),
  fam({
    id: 'family-animate-dream',
    name: 'Sonho Animado',
    originalName: 'Animate Dream',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Animate%20Dream',
    intro:
      "Um sonho animado coalesce de séculos de fragmentos errantes de devaneio e sonho deixados para trás enquanto mentes adormecidas derivam pela Dimensão dos Sonhos. Na maioria dos casos, esses fragmentos simplesmente se dispersam por conta própria, mas quando sonhadores fogem de pesadelos de volta ao mundo da vigília, esses fragmentos podem ganhar uma vida sobrenatural própria. Têm pouco raciocínio e intenção, salvo buscar fragmentos semelhantes, absorvê-los e crescer. Quando o bastante deles se reúne, fundem-se numa forma hedionda como um sonho animado.\n\nIndividualmente, sonhos animados podem ter uma variedade ampla de aparências, mas a maioria assume formas rudimentares semelhantes às formas vivas das mentes que os geraram. Sonhos animados que surgem de humanoides adormecidos, os mais comumente encontrados, assim aparecem humanoides, mas com formas distorcidas e de pesadelo que incorporam membros torcidos adicionais e feições aterrorizantes. Nessas formas, sonhos animados acham o caminho para fora das Terras dos Sonhos e para o mundo da vigília, só para descobrir que não têm como voltar e sofrem uma fome implacável que só pesadelos novos podem saciar.\n\nUm sonho animado prospera no terror alimentado por pesadelos e medo e usa as habilidades sobrenaturais para invocar tais sentimentos nas mentes das vítimas, amaldiçoando a presa ao criar um vínculo permanente com os sonhos daquele indivíduo. Daí em diante, a vítima é sujeita a toda sorte de pesadelos recorrentes. Conforme os pesadelos continuam, a vítima acha cada vez mais difícil permanecer acordada. No fim, a vítima mergulha num sono amaldiçoado do qual não pode voltar. Essas vítimas fornecem ao sonho animado a forma mais pura de medo e são o sustento preferido.\n\nUm sonho animado pode subsistir do medo ambiente gerado por pesadelos regulares, mas esses medos menores não são tão satisfatórios, muitas vezes empurrando o sonho animado a buscar vítimas novas. Deixado sem uma fonte de medo, um sonho animado não morrerá de fome, mas ficará cada vez mais violento e desesperado. Sonhos animados famintos são os mais frequentemente encontrados, pois foram forçados a abandonar a sutileza para perseguir métodos mais evidentes de colher medo. Porém, tais sonhos animados também tendem a ser os menos poderosos de sua espécie. Os que engordaram metafisicamente de medo em geral o fizeram ao adotar um tema específico de pesadelo, como ser enterrado vivo, ser arrastado por ondas do oceano ou ser consumido por feras selvagens. Tais sonhos animados muitas vezes têm magias inatas de tema semelhante para aumentar os poderes.",
    sections: [],
  }),
  fam({
    id: 'family-denizen-of-leng',
    name: 'Habitante de Leng',
    originalName: 'Denizen of Leng',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Denizen%20of%20Leng',
    intro:
      "Viajantes e saqueadores da dimensão fria e varrida pelo vento de Leng, essas criaturas malévolas de forma humana cruzam a realidade em navios negros ominosos capazes de navegar além das fronteiras de dimensões e planos. Embora a maioria dos habitantes de Leng busque conquista e riquezas, outros operam como autoproclamados embaixadores e mercadores, semeando discórdia com tramas de longo alcance. Embora os inescrutáveis habitantes vistam-se de robes fluidos, véus e turbantes largos para parecer humanos, a fisiologia aberrante, quando vislumbrada, é evidente desde a coroa de chifres curtos e mandíbulas tentaculares até as pernas peludas semelhantes às de uma cabra.\n\nHabitantes de Leng são muitas vezes altamente inteligentes e podem ser encontrados aconselhando ou cutucando tanto os poderosos quanto os humildes. Se há algum propósito nisso além dos interesses próprios de um habitante de Leng individual, até agora não houve sinal. A maioria parece perfeitamente genuína no conselho, embora em geral careça de qualquer coisa que se assemelhe a moral.\n\nAcima dos capitães ferozes que comandam os infames navios negros há uma casta ainda mais alta de habitantes de Leng. Esses ocultistas e músicos servem de sumos sacerdotes, labutando para aplacar os deuses pavorosos que olham para o Reino do Pesadelo com malícia fria.",
    sections: [],
  }),
  fam({
    id: 'family-girtablilu',
    name: 'Girtablilu',
    originalName: 'Girtablilu',
    trait: 'Girtablilu',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=596',
    intro: stripList(
      'Girtablilus são guardiões habitantes do deserto com o tronco de humanoides musculosos e o corpo inferior de escorpiões maciços. São encontrados com mais frequência defendendo templos antigos e artefatos religiosos com fervor zeloso. Alguns acreditam que foram criados por um deus morto há milênios para atuar como guardiões, mas girtablilus consideram o assunto da origem tabu e recusam tratar da teoria.\n\nComo girtablilus aceitam uma faixa ampla de religiões e sistemas de crença, alguns forasteiros acreditam que também adoram o próprio panteão antigo. Na verdade, girtablilus exclusivamente reverenciam e protegem sítios dedicados a deidades consideradas perdidas para a civilização. Assim, atuam como preservadores de práticas sagradas que de outro modo teriam sido esquecidas sob as areias movediças do deserto.\n\nEmbora girtablilus estejam acostumados a exploradores que buscam entrada nos sítios que defendem, podem acolher quem deseja de verdade aprender ou oferecer reverência. Alguns até compartilham com orgulho as crenças com outros, ansiosos pela oportunidade de pregar a alguém novo. Porém, não mostram misericórdia a quem tenta profanar os sítios e objetos de sua adoração, nem a quem violaria os preceitos da fé.\n\nGirtablilus são combatentes hábeis que mantêm escorpiões gigantes treinados como mascotes, e permanecem inigualáveis quando se trata de lutar no deserto. Precisam de relativamente pouca comida ou água, e confiam na resistência para superar os inimigos. Quando necessário, podem perseguir a presa por dias ou até semanas, coordenando com as mascotes para fazê-la andar em círculos. Uma vez exaustos, poucos adversários resistem ao poder físico de um girtablilu — ou ao veneno mortal.',
    ),
    sections: [
      {
        id: 'bonds-of-faith',
        title: 'Laços de fé',
        body: 'Comunidades girtablilu em geral formam-se em torno de crenças comuns em vez de laços familiares e dão mais importância à família escolhida do que a relações de sangue. Embora raro, já houve casos de membros de outras ancestralidades vivendo entre comunidades girtablilu. Quando forasteiros pedem para estudar os sítios protegidos dos girtablilus ou para se juntar a uma das comunidades, o líder divino tem a palavra final sobre quem é ou não bem-vindo.',
      },
    ],
  }),
  fam({
    id: 'family-golem',
    name: 'Golem',
    originalName: 'Golem',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Golem',
    intro:
      "Há muito tempo, os sacerdotes de religiões antigas dominaram uma técnica para aproximá-los de seu deus: a animação de argila numa criatura viva. Esses seres de argila, chamados golems, são animados ao colocar um pedaço de papel com o nome do deus do sacerdote na boca do golem (ou, em alguns casos, ao entalhar uma palavra sagrada na testa do golem). Embora sejam inteligentes como resultado da bênção divina, golems em geral não agem a menos que lhes seja ordenado, e raramente têm a capacidade de fala, um presente que os deuses concederam só às próprias criações. Em vez disso, usam a inteligência para facilitar a comunhão do criador com seu deus em ritos divinos desconhecidos fora dos mais fiéis de uma religião.\n\nEm algumas comunidades oprimidas, golems servem de protetores contra violência externa, lutando como último recurso, mas visando primeiro a desarmar situações. Outras vezes, o golem opera como guardião de um templo ou auxiliar de uma pessoa santa. Em casos raros, sabe-se que golems entram em rampages quando não lhes é permitido um dia de descanso a cada semana. Esses rampages podem ser extremamente destrutivos para as comunidades que os golems de outro modo protegem, então os criadores devem esforçar-se para cuidar bem das criações.\n\nLendas de golems são diversas e difundidas pela região do Mar Interior e além. Algumas falam de poderes ainda mais estranhos concedidos ao golem, como a habilidade de invocar os espíritos dos mortos. Golems com tais habilidades são sem dúvida criados pelos sacerdotes mais santos, afinados com seu deus além do que a maioria dos mortais poderia esperar realizar.",
    sections: [],
  }),
]
