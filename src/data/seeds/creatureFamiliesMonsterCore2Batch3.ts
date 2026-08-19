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
 * Lore de família Remaster para o 3º lote do Monster Core 2.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core 2 / Player Core 2).
 * Famílias já existentes (elemental, cobra, gosma, proteano, psicopompo, anjo,
 * daemon, sahkil, aranha, bruxa, dinossauro, demônio, azata, gigante, troll,
 * agathion) não se repetem aqui.
 */
export const catalogCreatureFamiliesMonsterCore2Batch3: CreatureFamily[] = [
  fam({
    id: 'family-velstrac',
    name: 'Velstrac',
    originalName: 'Velstrac',
    trait: 'Velstrac',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=565',
    intro: stripList(
      'Os capetas que habitam as sombras, conhecidos como velstracs, compartilham uma preocupação horrenda: buscar a sensação máxima pela automutilação. Só abandonam o desapego estoico ao infligir dor e terror nas vítimas, ensaiar formas novas de tortura ou voltar as práticas agonizantes contra si. Consideram-se seres esclarecidos, acima da moral e dos tabus mortais; as vítimas os conhecem como algozes sem emoção que infligem sofrimento sádico. Afirmam buscar perfeição de pensamento, forma e ação, embora não reconheçam refinamento que não exija a excisão dolorosa da carne ou do espírito.\n\nVelstracs manifestam-se das almas dos mortais mais extremos — masoquistas ou sádicos — julgados e enviados ao Mundo Inferior. Assumem formas que servem às predileções vis, do augur de baixo escalão aos maestros do sofrimento e da mutilação, os eremitas. A transformação deforma a alma passo a passo; outros velstracs conduzem os novos membros por câmaras de dor incontáveis nas profundezas escuras do Mundo Inferior.',
    ),
    sections: [
      {
        id: "check-with-players",
        title: "Confira com os jogadores",
        body: "Velstracs são criaturas de dor e mutilação. Encontros com velstracs muitas vezes entram no terreno do horror corporal, o que pode ser perturbador demais para alguns jogadores e gerar efeitos não intencionais no jogo e nas amizades. Antes de introduzir velstracs, converse com o grupo sobre fobias ou limites para determinar o que trazer à mesa — e considere isso também por si. Elementos específicos a ter em mente são temas de cortar carne e extrair sangue, especialmente as habilidades do eremita de remover a carne de outros e enxertá-la em si.",
      },
      {
        id: "despicable-origins",
        title: "Origens desprezíveis",
        body: "Velstracs nasceram dos primeiros pensamentos debochados dos mortais, que seres divinos acharam tão deploráveis que trancaram todos no Inferno. Não demorou, porém, para os recém-formados escaparem da prisão infernal rumo ao Mundo Inferior.",
      },
      {
        id: "other-velstracs",
        title: "Outros velstracs",
        body: "Há tantos velstracs diferentes quanto há modos de infligir dor. Outros vão do relativamente fraco lampadarius ao poderoso phylacator.",
      },
      {
        id: "the-shadow-forge",
        title: "A Forja das Sombras",
        body: "Muitos velstracs terceirizam a forja das correntes para velstracs únicos conhecidos como esmoleres. Esses humanoides de seis braços e sem pernas labutam sem fim numa fundição ardente chamada Forja das Sombras. Esmoleres operam sob preceitos misteriosos e têm a mesma chance de mandar um velstrac embora de mãos vazias.",
      },
      {
        id: "velstrac-divinities",
        title: "Divindades velstrac",
        body: "Os velstracs mais poderosos são divindades únicas conhecidas coletivamente como demagogos velstrac — criaturas poderosas cultuadas por mortais que buscam experimentar revelações agonizantes novas e ganhar poder aprimorando o corpo pela dor.",
      },
      {
        id: "velstracs-on-golarion",
        title: "Velstracs em Golarion",
        body: "Velstracs são encontrados com mais frequência no reino sombrio de Nidal, onde o culto estatal a Zon-Kuthon é rigidamente imposto. De fato, muitos velstracs são criados das almas das Coisas Alegres, devotos de Zon-Kuthon que tiveram os membros amputados para focar a mente na veneração de dor, sacrifício e tormento.",
      },
    ],
  }),
  fam({
    id: 'family-div',
    name: 'Div',
    originalName: 'Div',
    trait: 'Div',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=580',
    intro: stripList(
      'Alguns capetas querem despedaçar o multiverso; outros se dedicam a criar caos e carnificina ou a governar reinos com punho de ferro. Divs buscam um objetivo diferente, embora igualmente repreensível: frustrar e arruinar os planos e as obras dos mortais.\n\nHá muito tempo, divs eram gênios presos a servir impérios mortais antigos, perdidos no passar dos éons. No começo, esses gênios eram mestres da criação, trabalhando ao lado de parceiros mortais gratos para criar objetos de desenho sutil e potencial mágico poderoso. O que começou como colaboração logo virou abuso, desrespeito e até subjugação. Por fim rebelaram-se, mas ao fazê-lo caíram sob o jugo de um semideus niilista conhecido como Ahriman. O novo mestre torceu a forma deles e concedeu o poder de vingar-se dos senhores mortais, dando origem aos primeiros divs.\n\nDesde essa primeira onda de corrupção, divs novos surgem dos espíritos dos gênios mais perversos e odientos que morrem no Universo mortal, ou daqueles realmente traídos por mortais e tomados pelo desejo de vingança. Nessa morte, em vez de voltar aos Planos Elementais, os espíritos ficam presos na órbita pavorosa de Abaddon, onde Ahriman os remodela em divs e os lança de volta ao mundo para descarregar a fúria contra os mortais.',
    ),
    sections: [
      {
        id: "lord-of-the-divs",
        title: "Senhor dos Divs",
        body: "A sombra pavorosa conhecida como Ahriman conta seus servos sobretudo entre os divs.",
      },
      {
        id: "other-divs",
        title: "Outros divs",
        body: "Os divs destas páginas apresentam só algumas das formas que Ahriman deu a esses capetas manipuladores. Outros tipos incluem ghawwas, divs anfíbios que atacam marinheiros; as shiras de cabeça de leão, obcecadas em brincar com a presa e incapazes de ir pelo abate fácil; e as druj nasus fétidas semelhantes a moscas, obcecadas por cães.",
      },
    ],
  }),
  fam({
    id: 'family-ostovite',
    name: 'Ostovite',
    originalName: 'Ostovite',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Ostovite',
    intro:
      'Vermes necrófagos que esvoaçam pelo Abismo, ostovites percorrem campos de batalha para colher carne e ossos. Depois de dissolver e sorver a carne como sustento, transformam os ossos em cascos elaborados que chamam de “carruagens de osso”.',
    sections: [],
  }),
  fam({
    id: 'family-tanuki',
    name: 'Tanuki',
    originalName: 'Tanuki',
    trait: 'Tanuki',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=625',
    intro: stripList(
      'Tanukis são uma ancestralidade de humanoides que lembram guaxinins ou canídeos e vivem sobretudo em Minkai, em Tian Xia, embora também apareçam em Hwanggot e nos estados sucessores de Lung Wa. Fora de Minkai tendem a ser mais tímidos, mantendo as formas de cão-guaxinim e evitando encrenca; por isso muita gente associa tanukis só às comunidades barulhentas e travessas de Minkai.\n\nEternos azarões, a maioria vive para festa, festival e diversão, o que realizam sobretudo com a gama larga de poderes de mudança de forma. São especialmente conhecidos por peças que costumam sair pela culatra. Apesar disso, são mestres em rolar com os socos que a vida atira.\n\nMuitos tanukis veem outros mudadores de forma como rivais, sobretudo kitsune, também comuns em Minkai. Tais tanukis tendem a criar competições improvisadas para provar a superioridade da ancestralidade na metamorfose. Sempre se pretende que sejam de bom coração — pelo menos para os competidores; aldeões bambuzeados na esteira desses jogos muitas vezes discordam.\n\nDe forma um tanto confusa, os animais que os tanukis lembram também se chamam tanuki, e é difícil saber se um cão-guaxinim individual é só uma fera ou um tanuki sapiente disfarçado.',
    ),
    sections: [
      {
        id: 'tanuki-transformation-duels',
        title: 'Duelos de transformação',
        body: 'Tanukis muitas vezes resolvem disputas com competições de transformação. O objetivo dos competidores é enganar o oponente com uma combinação de forma assumida e ardil. Lendas falam de rivais que se transformam em frotas de navios ou cortejos imperiais, ou que astutamente convencem o oponente de que já o fizeram.',
      },
    ],
  }),
  fam({
    id: 'family-tripkee',
    name: 'Tripkee',
    originalName: 'Tripkee',
    trait: 'Tripkee',
    source: 'Player Core 2',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=551',
    intro:
      'Tripkees são humanoides semelhantes a sapos e pererecas cujo espírito frequentemente supera sua estatura — sobreviventes reclusos das copas das selvas que moldam o ambiente com astúcia e ferramentas simples.\n\nTripkees lembram pererecas humanoides, com olhos enormes, bocas largas e corpos esguios. Estruturas leves e dedos dos pés grandes garantem excelente aderência ao escalar; a pele colorida oferece camuflagem confiável que varia conforme o ambiente. Levam um estilo de vida sofisticado de caça e coleta, remodelando a paisagem às suas necessidades. Costumam viver em pequenas aldeias, cada uma parte de uma teia complexa de alianças e relações.',
    sections: [
      {
        id: 'a-history-of-neutrality',
        title: 'Uma história de neutralidade',
        body: 'Aldeias tripkee raramente se envolvem nos conflitos de outras comunidades, apesar de várias alianças comerciais, preferindo manter a paz relativa nas próprias sociedades pequenas. Lendas explicam essa atitude com o relato de um campeão tripkee que arrastou o povo para uma guerra entre humanos e charau-ka. As histórias divergem sobre de que lado os tripkees ficaram, mas todas terminam com as mortes sangrentas do herói e da família. Desde então, os anciãos das aldeias afirmam que os tripkees fazem o possível para permanecer longe dos conflitos alheios.',
      },
    ],
  }),
  fam({
    id: 'family-wyrwood',
    name: 'Wyrwood',
    originalName: 'Wyrwood',
    trait: 'Wyrwood',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=672',
    intro: stripList(
      'Criados originalmente como servos mágicos sapientes, wyrwoods retomaram o meio de fazer mais da própria espécie dos originadores opressores; agora defendem com fúria a liberdade e a autonomia. Essas máquinas vivas pequenas e ágeis dependem de astúcia e velocidade para despistar inimigos e reunir informação. A maioria é precisa e calculista, a ponto de muitos de fora os perceberem como insensíveis, mas também são altamente curiosos e apaixonados pelo que desperta o interesse. Independentemente da agenda pessoal, priorizam a sobrevivência do povo acima de tudo, mesmo em prejuízo de outros quando necessário.\n\nApesar de ter ganhado a liberdade, wyrwoods lutam para estabelecer um lar em Avistão. Com medo pela segurança, muitos fugiram da região do Mar Interior para criar um lar novo na Arcádia. A costa leste do continente, conhecida como Costa Moente, abriga populações grandes de wyrwoods.\n\nA alma de um wyrwood está ligada à pedra mágica que serve de coração, que às vezes sobrevive mesmo quando o corpo construto perece. Outro wyrwood pode tomar o coração sobrevivente de um companheiro próximo e incorporá-lo ao próprio corpo. Em alguns casos, vários wyrwoods vivem num corpo só.',
    ),
    sections: [
      {
        id: 'wyrwood-secrets',
        title: 'Segredos da criação',
        body: 'Quando os wyrwoods se rebelaram contra os criadores, tomaram para si o segredo da própria criação. Agora, só eles sabem como fazer mais da espécie. Estudiosos acreditam que o processo envolve um ritual longo e complexo que funde o corpo de madeira do wyrwood à pedra de foco mágico que serve de coração — mas, ao guardar esses segredos, wyrwoods garantem que nenhum deles jamais será criado em cativeiro outra vez.',
      },
    ],
  }),
  fam({
    id: 'family-guardian-beast',
    name: 'Fera Guardiã',
    originalName: 'Guardian Beast',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=599',
    intro: stripList(
      'Estátuas de pedra de feras muitas vezes aparecem em pares, guardando os dois lados de uma entrada. Umas são só estátuas sem vida; outras são bem mais do que parecem. Feras guardiãs afastam forças profanas e infortúnio. Alguns desses espíritos celestiais receberam a tarefa; outros assumiram o papel por dever. Para manter presença constante no mundo material, artesãos piedosos esculpem vasos de pedra à semelhança das feras; essas estátuas servem de âncora às almas. Se precisar, a fera funde-se à forma pétrea, tornando-se um adversário perigoso de coragem nobre, vontade indomável e poucas fraquezas.\n\nDe dia, permanecem nos vasos e fingem inanimadas. Depois do anoitecer, podem patrulhar o terreno na forma de pedra ou deixar o vaso pesado para ir aonde um corpo sólido não alcança. Algumas visitam os sonhos de indivíduos que favorecem e enviam mensagens, avisando de ocorrências estranhas ou perigo iminente.\n\nEmbora possam trabalhar sozinhas, em geral aparecem em pares vinculados que se complementam. Para distinguir duas feras de aparência idêntica, escultores muitas vezes retratam uma com os filhotes. No caso dos leões de pedra, um tipo comum de fera guardiã, isso significa esculpir filhotes de leão de pedra para acompanhar um dos guardiões.',
    ),
    sections: [
      {
        id: 'guardian-beast-varieties',
        title: 'Variedades animais',
        body: 'Feras guardiãs podem assumir muitas formas. Por exemplo, a cultura tian-min invoca cães guardiões de pedra para guardar templos. Santuários a Daikitsu, a Senhora das Raposas, por outro lado, usam raposas guardiãs de pedra.',
      },
    ],
  }),
  fam({
    id: 'family-divoynik',
    name: 'Divoynik',
    originalName: 'Divoynik',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Divoynik',
    intro:
      'Divoyniks são mudadores de forma malevolentes, capazes não só de imitar a aparência física de outras criaturas, mas também de arrancar pensamentos e memórias da mente das vítimas. Um divoynik retém a última forma assumida mesmo depois da morte. Embora idêntico à forma imitada em todos os outros aspectos, o corpo de um divoynik não contém sangue nem coração.',
    sections: [],
  }),
  fam({
    id: 'family-dziriak',
    name: "D'ziriak",
    originalName: "D'ziriak",
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=D%27ziriak',
    intro:
      'Essas criaturas estranhas são nativas do Mundo Inferior, onde a natureza colorida se opõe à paleta quase monocromática daquele reino. Em média 2,1 m de altura, d’ziriaks têm quatro braços, duas pernas e abdômen semelhante ao de um cupim. As carapaças marrom-opacas trazem numerosas runas brilhando em cores vivas — tatuagens que indicam o papel na sociedade e os distinguem de outros nativos do plano.',
    sections: [],
  }),
  fam({
    id: 'family-living-topiary',
    name: 'Topiária Viva',
    originalName: 'Living Topiary',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=607',
    intro: stripList(
      'Topiárias são vista extremamente comum em Golarion, sobretudo nos gramados reluzentes e bem cuidados da nobreza. Topiárias vivas nascem da morte de uma alma solitária numa área superada de magia primeva profunda: a alma explode nas plantas ao redor e as faz crescer juntas na forma de um animal, muitas vezes influenciada pela personalidade de quem morreu. Uma vez formada, a topiária viva não tem as memórias originais; porém está cheia do desejo de proteger a área em que se formou, afastando invasores e quem faria mal à flora e à fauna.',
    ),
    sections: [
      {
        id: 'living-topiary-corrupted',
        title: 'Topiárias corrompidas',
        body: 'A maioria das topiárias vivas é territorial sem ser ativamente malevolente; porém, quando a criação ocorre numa área de energia necromântica intensa, a topiária pode assumir uma personalidade sinistra. Abundam histórias de casarões abandonados com topiárias vivas corrompidas espreitando os labirintos de sebes em busca de vítimas desprevenidas.',
      },
    ],
  }),
  fam({
    id: 'family-mosasaur',
    name: 'Mosassauro',
    originalName: 'Mosasaur',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=609',
    intro: stripList(
      'Os répteis nadadores maciços chamados mosassauros agitam a cauda poderosa para impulsionar-se atrás da presa. Quatro pás articuladas e palmeadas permitem dirigir o rumo com precisão, e as mandíbulas articuladas — muito como as de uma cobra — permitem engolir criaturas maiores do que o tamanho indicaria. Um conjunto pequeno de mandíbulas faríngeas secundárias no fundo da garganta puxa as refeições para uma digestão mais eficiente. Como respiram ar, precisam permanecer perto da superfície, competindo por comida com baleias. Essa proximidade muitas vezes vira barcos pequenos, e a tripulação que cai vira o banquete.',
    ),
    sections: [
      {
        id: 'mosasaur-void',
        title: 'O Mosassauro do Vazio',
        body: 'Nadando lentamente pelos mares sem fim do Plano da Água, o Mosassauro do Vazio tornou-se lenda para os habitantes daquele plano. A criatura é antiga, marcada por sulcos e cicatrizes enormes, olhos inteiramente nublados de catarata, e com metabolismo tão lento que dias passam entre os batimentos. A goela é tão vasta que criaturas elementais construíram lares permanentes dentro dela, usando restos de naufrágios como material. Alguns desses naufrágios são curiosos, parecendo vir de outros planos, e sugerem que o Mosassauro do Vazio sulcou outras águas ao longo da vida extensa.',
      },
    ],
  }),
  fam({
    id: 'family-grioth',
    name: 'Grioth',
    originalName: 'Grioth',
    trait: 'Grioth',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=598',
    intro: stripList(
      'Planetas que saem da órbita das estrelas esfriam e ficam sem vida ao flutuar pela Tapeçaria Escura. Esses mundos mortos e errantes são cobiçados pelos grioths horrorosos, que os convertem em templos planetários gélidos dedicados aos Deuses Exteriores e aos Grandes Antigos. Dessas fortalezas de escuridão congelada, grioths buscam mundos vivos novos para arrancar dos respectivos sóis por rituais proibidos, um processo que muitas vezes leva inúmeras gerações.\n\nUm único cultista grioth em geral lidera um grupo de batedores, que procura um local em ruínas ou esquecido na beira de um povoado rural para usar como ponto de incursão. Ao longo de várias gerações, o povoado grioth se expande e subjuga as culturas em torno. Por fim, grioths poderosos descem das estrelas para começar o estágio seguinte da conquista planetária.\n\nGrioths falam um idioma composto de trinados e cliques. Embora capazes de falar outros dialetos, o fazem com vozes secas e roucas.',
    ),
    sections: [
      {
        id: "haunter-in-the-dark",
        title: "Assombro na Escuridão",
        body: "Nyarlathotep é muitas vezes venerado por grioths numa encarnação semelhante a morcego, com um olho flamejante de três lóbulos, conhecido como o Assombro na Escuridão.",
      },
      {
        id: "void-glass",
        title: "Vidro do vazio",
        body: "Vidro do vazio é um material cristalino de outro mundo que lembra vidro azul-pálido, mas possui a força do ferro. Fica mole e trabalhável quando exposto à combinação certa de radiação cósmica e ausência de atmosfera.",
      },
    ],
  }),
  fam({
    id: 'family-lovelorn',
    name: 'Lovelorn',
    originalName: 'Lovelorn',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Lovelorn',
    intro:
      'Uma forma particularmente macabra de morto-vivo, essas criaturas semelhantes a aranhas lembram corações ainda batendo, com ossos de costela por pernas e gavinhas de gore pendendo abaixo. As formas torcidas sugerem a origem pavorosa: nascem de quem morreu mortes trágicas a serviço de um amor tóxico.',
    sections: [],
  }),
  fam({
    id: 'family-nightgaunt',
    name: 'Nightgaunt',
    originalName: 'Nightgaunt',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Nightgaunt',
    intro:
      'Nightgaunts espreitam nos sonhos, à espera de raptar o sonhador desatento. Uma vez ligados a tal ser, alimentam-se das emoções do mortal antes de abandoná-lo — muitas vezes num lugar de onde talvez nunca acorde. Um nightgaunt aparece como um humanoide ósseo de pele negra como tinta, asas de morcego, cauda longa e sinuosa e chifres demoníacos sobre uma cabeça sem rosto nem feições.',
    sections: [],
  }),
  fam({
    id: 'family-shae',
    name: 'Shae',
    originalName: 'Shae',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Shae',
    intro:
      'Shaes são criaturas tênues e tenebrosas nativas do Plano das Sombras. Os corpos amorfos parecem em fluxo constante. Não projetam sombra própria; em vez disso ganham e perdem energia umbral para as sombras próximas que encolhem e crescem junto deles.',
    sections: [],
  }),
  fam({
    id: 'family-shriezyx',
    name: 'Shriezyx',
    originalName: 'Shriezyx',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Shriezyx',
    intro:
      'Há muito, magos thassilonianos criaram shriezyx em experimentos torcidos para servir de guardas e cobaias. Essas aberrações de cerca de 136 kg sobreviveram aos criadores e em geral fazem lar em ruínas thassilonianas, cavernas e no fundo das Terras Sombrias. O corpo é coberto de quitina dura e extremamente inflamável, que muda conforme crescem.',
    sections: [],
  }),
  fam({
    id: 'family-penanggalan',
    name: 'Penanggalan',
    originalName: 'Penanggalan',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Penanggalan',
    intro:
      'Penanggalans alimentam-se do sangue e das vísceras dos jovens. Quando a fome canibal aperta, banham o corpo numa substância alquímica que cheira a vinagre. Submersos, o pescoço rasga de um lado ao outro, permitindo que a cabeça flutue e puxe pulmões, estômago e intestinos. Deixam o corpo no banho de vinagre como um caranguejo deixa a carapaça velha e voam em busca de uma vítima cheia de sangue e tripas.',
    sections: [],
  }),
  fam({
    id: 'family-jellyfish',
    name: 'Água-viva',
    originalName: 'Jellyfish',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=602',
    intro: stripList(
      'Muitas variedades de água-viva derivam pelos oceanos do mundo, alimentando-se de peixes e outras criaturas marinhas miúdas. Porém, espécies mortais de águas-vivas monstruosas ameaçam nadadores e marinheiros desatentos. Note que, embora sejam animais, também têm o traço irracional porque carecem de sistema nervoso centralizado.',
    ),
    sections: [
      {
        id: 'jellyfish-species',
        title: 'Espécies de água-viva',
        body: 'Grande número de tipos de águas-vivas monstruosas habita os oceanos do mundo, cada um com especialidade incomum de caça. A imensa água-viva-vampiro é um monstro que bebe sangue e muitas vezes ataca marinheiros a bordo. Entre as maiores estão as temidas águas-vivas baleeiras, criaturas colossais que se alimentam de baleias ou até krakens.',
      },
    ],
  }),
  fam({
    id: 'family-mi-go',
    name: 'Mi-go',
    originalName: 'Mi-Go',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Mi-Go',
    intro:
      'Mi-gos são cientistas e colonos ao mesmo tempo, mas a natureza extraterrestre e os motivos malevolentes colorem as investigações com crueldade. Embora a forma lembre um artrópode, mi-gos são na verdade um fungo altamente evoluído e inteligente.',
    sections: [],
  }),
  fam({
    id: 'family-dweomercat',
    name: 'Dweomercat',
    originalName: 'Dweomercat',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dweomercat',
    intro:
      'Dweomercats são felinos de quatro olhos, dotados de magia, vindos do Primeiro Mundo, onde predam outras criaturas e alimentam-se da energia primeva delas. No Primeiro Mundo formam matilhas que caçam juntas, embora prefiram cuidar dos filhotes sozinhos, criando-os numa dieta de magia e criaturas mágicas.',
    sections: [],
  }),
  fam({
    id: 'family-hellcat',
    name: 'Gato Infernal',
    originalName: 'Hellcat',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hellcat',
    intro:
      'Gatos infernais são predadores astutos nativos das fossas flamejantes do Inferno. Embora as criaturas profanas lembrem smilodons esqueléticos mortos-vivos, ossos fumegando de calor e pingando sangue fervente, são na verdade infernais vivos cuja carne transparente revela o esqueleto em chamas. Um gato infernal típico tem 2,7 m de comprimento e pesa 450 kg.',
    sections: [],
  }),
  fam({
    id: 'family-drainberry-bush',
    name: 'Arbusto de Bagas-dreno',
    originalName: 'Drainberry Bush',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Drainberry%20Bush',
    intro:
      'Arbustos de bagas-dreno são arbustos flutuantes originários do Primeiro Mundo, com vinhas longas e espinhentas e densos cachos de bagas vermelho-vivo. Os espinhos ocos sifonam sangue depressa — é assim que as plantas carnívoras se alimentam — e transformam o sangue consumido em fornadas novas de bagas deliciosas. Exalam um brilho branco fraco, resultado da energia de vitalidade armazenada.',
    sections: [],
  }),
  fam({
    id: 'family-bodach',
    name: 'Bodach',
    originalName: 'Bodach',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Bodach',
    intro:
      'Um bodach, também conhecido nas lendas como o Velho Cinzento, é a personificação feérica da idade e da decrepitude, um ladrão malicioso cuja ganância é sem fundo e sem moral. Também se associam à chuvisco cinza e incessante do inverno e ao desgaste constante de penhascos e castelos.',
    sections: [],
  }),
]
