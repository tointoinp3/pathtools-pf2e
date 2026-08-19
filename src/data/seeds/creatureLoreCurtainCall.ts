import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das criaturas de Curtain Call. */
export const CREATURE_LORE_CURTAIN_CALL: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-agadaz": {
    "description": "Diabos apostadores, também conhecidos como agadazes, lembram humanoides cornudos forjados de ouro vivo em suas formas naturais, embora as habilidades de mudança de forma lhes permitam circular entre mortais sem serem detectados. São encontrados com mais frequência em Erebus, a terceira camada de Hell, onde muitos servem Mammon como contadores. São incomumente impulsivos e distraíveis para o próprio tipo. Outros diabos costumam ver a Aura de Risco como um estorvo, por isso em geral recebem missões menos importantes. Não se importam, pois isso lhes dá mais tempo para intrometer-se com mortais.",
    "sections": [
      {
        "id": "heavy-footsteps",
        "title": "Passos Pesados",
        "body": "Mesmo quando aparece em disfarce humanoide, o corpo de um diabo apostador permanece extremamente denso e pesado, muitas vezes pesando mais de 225 kg. Causos de apostadores velhos alertam para observar os passos dos colegas de jogo e desconfiar de quem pisa de modo desproporcional ao tamanho, embora, na verdade, todos os diabos apostadores, salvo os mais descuidados, saibam pisar leve em suas formas humanoides."
      }
    ]
  },
  "creature-anguish-siktempora": {
    "description": "Nas dobras tortas da Dimensão do Tempo, emoções intensas se acumulam como destroços nas águas paradas de poços de rio. Reúnem-se ao longo das eras, colhendo sentimentos mais fortes durante tempos de grande mudança, como calamidades e o governo de déspotas tirânicos, bem como períodos de alegria e orgulho. Esses acréscimos por fim dão origem a siktemporas.\n\nA siktempora da angústia é rara, mesmo entre outras de seu tipo. Deleita-se em buscar criaturas para infligir o próprio sofrimento; as exclamações de seus uivos pavorosos aliviam a angústia — ainda que só por um instante fugaz. Com uma cabeça humana enorme e disforme, aberta no ato de gritar, os membros doentios de ponta em gancho pendem frouxos abaixo do pescoço. Quando uma siktempora da angústia morde inimigos com as mandíbulas, continua a gritar, acrescentando dano sônico ao já esmagador castigo que os inúmeros dentes trituradores infligem.",
    "sections": [
      {
        "id": "soaked-in-screams",
        "title": "Encharcada de Gritos",
        "body": "A siktempora da angústia, às vezes chamada de grito vivo, forma-se de emoções semelhantes às que geram siktemporas da miséria. Onde ocorrem desastres e devastação, essas duas criaturas também se manifestam — muitas vezes agravando a dor ambiente e inchando as siktemporas de acordo. Ocasionalmente, siktemporas da miséria e da angústia lutam entre si por território nesses momentos, literalmente arrancando os rivais membro a membro numa necessidade insaciável de alimentar fomes adjacentes."
      }
    ]
  },
  "creature-azarpal": {
    "description": "Azarpals lembram porcos bípedes com bocas de presas largas, ventres inchados e caudas longas e eriçadas. Conseguem armazenar comida nos múltiplos estômagos por longos períodos, infundindo-a aos poucos com um veneno característico que faz os atingidos suarem profusamente e sucumbirem a náusea intensa.\n\nAzarpals adoram espalhar descontentamento via comida envenenada. Deleitam-se em viajar rotas de caravana, disfarçados de mercadores, experimentando sem parar as culinárias regionais e escolhendo as favoritas para armazenamento no estômago e infusão de veneno. Então, ao chegar a uma terra onde o prato é raro ou cobiçado, acham um lugar para deixar a refeição à vista de um viajante desavisado. Também podem achar um jeito de introduzir a refeição envenenada numa taverna ou restaurante e recuar para assistir à diversão resultante.",
    "sections": [
      {
        "id": "removing-azarpal-poison",
        "title": "Removendo o Veneno de Azarpal",
        "body": "Uma vez que um item de comida ou bebida tenha sido impregnado com veneno de azarpal, pode ser desintoxicado pelo uso de uma magia _purificar culinária_ ou passando uma hora usando suprimentos alquímicos para anular o veneno. Esta última opção exige acesso a um laboratório alquímico e um teste bem-sucedido de Ofício contra a CD de salvaguarda do veneno do azarpal."
      }
    ]
  },
  "creature-echosyvne": {
    "description": "Palinthanos formados de criaturas inteligentes tendem a ser oportunistas intrigantes e invejosos que buscam possuir corpos mortais. Aparecem como vórtices de rostos retorcidos e enevoados dos quais emergem membros fantasmagóricos, independentemente da aparência em vida.",
    "sections": [
      {
        "id": "backward-speakers",
        "title": "Falantes ao Contrário",
        "body": "Quando um palinthanos vocaliza, os sons que cria estão invertidos. Para o egarhowl, isso só resulta em sons invertidos inquietantes de rugidos raivosos e ruídos bestiais, mas para os que podem falar, torna a compreensão difícil. Um palinthanos não tem dificuldade em entender qualquer idioma que possa falar, mas quando fala, ouvintes devem obter sucesso num teste de Percepção CD 30 feito como ação livre com o traço concentração a cada rodada para decifrar depressa a conversa invertida. Isso impede que um palinthanos utilize com facilidade ações linguísticas."
      }
    ]
  },
  "creature-egarhowl": {
    "description": "Almas de feras e animais que retornam como palinthanos manifestam-se como mortos-vivos bestiais e fantasmagóricos de fome e instinto puros. Aparecem como criaturas monstruosas um tanto indistintas, independentemente do que foram em vida.",
    "sections": []
  },
  "creature-furnerico": {
    "description": "Uma massa de gavinhas e nervos ondulantes, furnericos espreitam sistemas de esgoto sob grandes cidades, deleitando-se na imundície e nos detritos em apodrecimento criados por quem habita acima das latrinas e fossas que chamam de lar. Felizmente para trabalhadores de saneamento e outros servidores civis que exercem o ofício nos túneis de esgoto, furnericos são extremamente raros e solitários. Seu poder é tal que, uma vez que um se instala num sistema de esgoto, muitas vezes é mais fácil para os planejadores urbanos simplesmente abandonar aquela seção ao monstro e reconstruir ao redor. Um furnerico deixado ao domínio desse modo em geral contenta-se em permanecer — desde que a imundície continue a fluir.\n\nFurnericos são assexuais, gerando uma única prole ao expirar de causas naturais. Um que morre por violência não perpetua o tipo, apresentando uma pergunta vexatória aos sábios: de onde vêm essas criaturas, e por que não se extinguiram ao longo das eras?",
    "sections": [
      {
        "id": "cultist-creations",
        "title": "Criações de Cultistas",
        "body": "A resposta a \"de onde vêm os furnericos?\" é conhecida por poucos, pois jaz com os fiéis do deus parasita Ghlaunder. Esses cultistas usam ritos obscuros para criar furnericos da própria imundície na qual os monstros se chafurdam. Adoradores de Ghlaunder muitas vezes o fazem para criar guardiões poderosos para os templos ocultos; furnericos criados desse modo tratam instintivamente adoradores de Ghlaunder como aliados... um traço não compartilhado pelos nascidos de um furnerico anterior, e uma lição que muitos cultistas de Ghlaunder só aprendem momentos antes da morte depois de presumir o contrário de um furnerico encontrado na natureza."
      }
    ]
  },
  "creature-hellshadow": {
    "description": "Quando um grupo de diabolistas ou adoradores de um arqui-diabo chega a um fim ignominioso, as almas às vezes podem ficar presas entre a vida e a morte, incapazes ou relutantes em passar ao além devido à humilhação das mortes prematuras. Quando adoradores intimamente associados cujas almas ainda não estão reivindicadas em contratos existentes encontram tal destino em número suficiente, o \"peso\" espiritual dessa vergonha pode fazê-los fundir-se numa conglomeração de espíritos impregnados de essência infernal — uma sombra infernal.\n\nSombras infernais parecem um banco de fogo e fumaça, mas as chamas em si são feitas de corpos e rostos distorcidos. Embora feita de múltiplas almas, uma sombra infernal é uma criatura singular com uma mente e em geral um objetivo: derrotar quantos inimigos da fé puder a fim de reparar a vergonha das mortes humilhantes.",
    "sections": [
      {
        "id": "why-only-hell",
        "title": "Por Que Só Hell?",
        "body": "A natureza da adoração diabólica e as regras estritas envolvidas são grande parte da psicologia da humilhação que faz adoradores de diabos tornarem-se sombras infernais. Essa mesma mistura de condições é mais rara entre outros cultos infernais, que são mais propensos a tornar-se mortos-vivos mais comuns após tal morte. Sombras infernais de tema não diabólico são praticamente desconhecidas em consequência."
      }
    ]
  },
  "creature-mask-of-norgorber": {
    "description": "Quando um adorador poderoso chama a atenção de Norgorber, ele às vezes transforma esse adorador numa de suas máscaras — encarnações sobrenaturais que se tornam procuradores poderosos de seu deus, mas sacrificam o livre-arbítrio.",
    "sections": [
      {
        "id": "masks-and-the-afterlife",
        "title": "Máscaras e o Além",
        "body": "Quando um adorador se torna uma máscara, tecnicamente morre e viaja ao Ossário para ser julgado por Pharasma, mas neste caso o processo é quase instantâneo. Quando Norgorber escolhe alguém para tornar-se uma máscara, um embaçamento rápido e quase instantâneo da criatura é o único indício da mudança. Como a maioria dos infernais, máscaras são imortais a menos que sejam mortas por violência ou desventura. Uma vez morta, o corpo de uma máscara decompõe-se como o normal e, após um período variável, a alma retorna ao Grande Além para agregar a quintessência no reino de Norgorber, Duskfathom."
      },
      {
        "id": "other-ancestries",
        "title": "Outras Ancestralidades",
        "body": "A maioria das máscaras de Norgorber é humana, mas não todas. As estatísticas de uma máscara não mudam se for uma criatura Pequena, e ganham espaço e alcance aumentados se forem Grande ou maiores. Mude os traços de ancestralidade conforme necessário, mas Deslocamento e idiomas permanecem inalterados. Todas as máscaras de Norgorber possuem visão no escuro concedida pela deidade. Se você concede ou não a uma máscara habilidades adicionais baseadas em ancestralidade fica a seu critério."
      }
    ]
  },
  "creature-masque-mannequin": {
    "description": "Manequins de máscara são um tipo de construto alma-vinculado animado por um fragmento de uma alma outrora viva infundido numa máscara inquietante, quase sem traços, que então é afixada a um manequim ou boneco de costureira. Embora semelhante em processo à criação de uma boneca ou manequim alma-vinculado, criar um manequim de máscara exige conduzir assassinato ritualístico e extrair um estilhaço de alma durante a morte de uma vítima relutante, e só os artesãos mais vis considerariam tentar tal feito. Manequins de máscara são populares entre norgorberitas, sobretudo devotos de Father Skinsaw, bem como kuthitas que se orgulham de prolongar o ritual para obter o maior fragmento possível da alma.",
    "sections": [
      {
        "id": "malevolent-mindsets",
        "title": "Mentalidades Malevolentes",
        "body": "Manequins de máscara, mesmo os forjados de indivíduos virtuosos, tendem a ter um senso sádico de malícia. Se deixados à própria sorte, um manequim de máscara gosta de brincar de gato e rato com as vítimas escolhidas, congelando e descongelando em áreas com manequins mundanos, levando aos poucos os infelizes brinquedos à paranoia antes de ir para a matança."
      }
    ]
  },
  "creature-ockomlire": {
    "description": "Com a carne borrachuda mosqueada de verde e bronzeado, seis pernas curtas terminando em pés de duas garras e três bocas circulares dispostas equidistantes ao redor de uma cabeça em disco coroada por múltiplos olhos bulbosos, a aparência estranha do bizarro ockomlire habitante das Terras Sombrias borra a linha entre aberração e fungo.\n\nOckomlires comem magia, e seus órgãos especializados processam e liberam essa magia na forma de uma névoa que suga a força de vontade daqueles que toca. Originalmente criados por ocultistas sekmin como arma potente contra magos Azlanti, desde o colapso do império serpentino milhares de anos atrás, ockomlires espalharam-se para cima através das Terras Sombrias. Muitas vezes aninham-se em esgotos ou porões abandonados em áreas urbanas, atraídos ao uso (e desperdício) de energia mágica da sociedade.\n\nOckomlires são bastante inteligentes, mas tendem a ter personalidades sem graça. Gostam de verbalizar observações e experiências, falando em vozes agudas inquietantes por três bocas; têm uma predileção curiosa por referir-se a si mesmos na terceira pessoa. Têm pouco interesse em ter nomes pessoais e tendem a referir-se àqueles que encontram pela ancestralidade em vez de pelo nome também.",
    "sections": [
      {
        "id": "ockomlire-apathy",
        "title": "Apatia do Ockomlire",
        "body": "Porque exalam sentimentos de desesperança e desespero como \"resíduo\" da alimentação mágica, o ockomlire tornou-se uma criatura de desapego apático. Embora isso conceda ao ockomlire proteção contra efeitos baseados em emoção, aqueles que de fato os afetam tendem a atingir com força e de fato causar angústia mental. Há lendas empolgantes de ockomlires abatidos por um único bardo cuja performance cativante simplesmente agitou emoções suficientes nas criaturas normalmente distantes para fazê-las rasgarem-se por dentro."
      }
    ]
  },
  "creature-rezzelki": {
    "description": "Rezzelkis são feras de aparência curiosa nativas dos desertos de Osirion. Com 90 cm na cernelha e 1,5 m de comprimento, rezzelkis são quadrúpedes mamíferos atarracados com pelagem vermelho-fulva, caudas chatas cravejadas de cristais e focinhos preênseis semelhantes aos de tamanduá. As línguas longas e cor-de-rosa estão cobertas de centenas de cerdas minúsculas e afiadas como navalha que lhes permitem raspar a carne com facilidade inquietante, mesmo antes de levar em conta o efeito da saliva ácida.\n\nRezzelkis são ferozmente territoriais e rápidos em atacar qualquer um ou qualquer coisa que considerem invasor do território. Porém também são propensos a obsessões gastronômicas estranhas e, se alguém conseguir deduzir a comida favorita de um rezzelki em particular, é possível tornar-se aliado da criatura simplesmente fornecendo acesso regular às refeições preferidas. A comida favorita de um rezzelki específico é sempre um tipo específico de criatura — alguns até preferem jantar exclusivamente nos corpos secos de mortos-vivos como múmias — mas a maioria tem gosto por uma ancestralidade humanoide singular. Diante de uma refeição potencial, o rezzelki move-se depressa para esmagar o banquete com a cauda larga. Então alimenta-se dos restos pulverizados da criatura destruída, sorvendo carne esmagada e ossos em pó com um gosto barulhento que lhes rendeu um apelido estranho em certos círculos: \"lambedor-da-morte\".",
    "sections": [
      {
        "id": "rezzelki-hunger",
        "title": "Fome do Rezzelki",
        "body": "Embora um rezzelki possa subsistir de restos pulverizados de qualquer tipo de criatura, preferem de longe um tipo específico e conseguem farejar essas refeições potenciais com precisão alarmante. Se um encontro não especificar qual é o alimento favorito de um rezzelki, role 1d6: 1 — humano, 2 — anão, 3 — elfo, 4 — kholo, 5 — gigante do deserto, 6 — múmia. Rezzelkis encontrados em regiões que não Osirion certamente desenvolvem apetites por outros tipos de criaturas, é claro!"
      }
    ]
  },
  "creature-shanty-chanter": {
    "description": "Cantores de shanty são conhecidos por habitar ao longo das costas de Garund ou das ilhas orientais dos Shackles, vivendo em ilhas pequenas ou encostas de penhasco, mas raramente aventurando-se longe demais terra adentro. Esses fey caprichosos têm torsos humanoides e cabeças, asas e pés de gaivota, e medem cerca de 1,5 m de altura. Artistas consumados, cantores de shanty adoram música, sobretudo os cânticos marítimos cantados pelas tripulações dos navios. As canções dos ninhos desses fey podem ser ouvidas a quilômetros de distância sobre o mar aberto. Embora alguns marinheiros afirmem que essas canções intencionalmente atraem mortais a se afogar, a maioria dos cantores de shanty não é abertamente malevolente e estaria mais inclinada a investigar um navio naufragando do que a massacrar os a bordo, mesmo que tomem os objetos de valor de tal embarcação.\n\nCantores de shanty têm afinidade particular por navios piratas, e um capitão que conquista uma aliança com um ninho de cantores de shanty é considerado abençoado com boa sorte. É claro, essa atenção pode ser uma faca de dois gumes. Se um capitão falha em aplacar os cantores de shanty aliados do navio (em geral dando-lhes uma fatia justa do saque obtido enquanto estão a bordo), o fey ofendido aflige o capitão com uma maldição de marinheiro antes de partir para costas mais prósperas.",
    "sections": [
      {
        "id": "chanter-vanity",
        "title": "Vaidade do Cantor",
        "body": "Cantores de shanty são bastante vaidosos, adornando-se com joias obtidas nos ataques de seus navios aliados ou tomadas em ataques próprios. Apreciam bajulação tanto à aparência física quanto aos talentos musicais, e veem esse tipo de suborno como tão valioso quanto bens materiais. Por outro lado, o jeito mais certo de ganhar a inimizade de um cantor de shanty é insultar o canto, e só os profundamente imprudentes ousariam tal coisa."
      }
    ]
  },
  "creature-venomfist": {
    "description": "Antes de tornar-se uma deidade, Norgorber ganhou o serviço eterno de Venomfist ao dar ao faydhaan shuyookh desgraçado venenos para exercer vingança sobre aqueles que despojaram o gênio do status. A vingança transformou Venomfist no que são agora, um desfecho do qual Norgorber advertira, mas que Venomfist não se arrepende.\n\nHoje em Duskfathom, Venomfist reside no Sky Sea como o defensor perfeito das ilhas sem nome. Quando evocado a outros planos, apenas uma fração se desloca enquanto o corpo principal permanece. O corpo verde vívido de Venomfist é um testemunho a todos os acordos por venenos feitos com mortais e imortais ao longo de milênios.",
    "sections": [
      {
        "id": "spared-from-death",
        "title": "Poupado da Morte",
        "body": "Venomfist foi instrumental em ajudar Norgorber a cruzar o abismo do lado de fora da Catedral da Starstone. Numa reviravolta irônica, Venomfist advertiu que o plano proposto poderia matar o então muito mortal Norgorber. A resposta do homem? \"Não me importo.\" Até hoje, Venomfist não sabe que desespero impeliu Norgorber a buscar a Starstone. Como nunca bisbilhotou o passado, as motivações ou os negócios de Norgorber, o deus nunca sentiu necessidade de matar Venomfist após a ascensão."
      }
    ]
  },
  "creature-waxen-effigy": {
    "description": "A gosma morta-viva conhecida como efígie de cera forma-se sob um conjunto específico de circunstâncias, tornando tais criaturas bastante raras. A maioria das efígies de cera surge de rituais malogrados destinados a migrar a alma de uma criatura senciente poderosa para um corpo feito de cera, seja numa aposta por imortalidade ou um método de aprisionamento ou sacrifício. A morte — sobretudo uma morte traumática — de uma criatura senciente em proximidade estreita a uma figura de cera ou enquanto tenta forjar um construto de cera também pode resultar numa efígie de cera.\n\nUma efígie de cera parece uma versão de cera parcialmente derretida de quem era em vida. Retêm pouco da personalidade anterior, mas recordam um emaranhado de memórias da existência mortal que serve só para enfurecê-las. Muitas vezes agarram-se a objetos que lhes foram importantes em vida, como a aliança de um cônjuge ou uma ferramenta de um passatempo favorito. Exibir tal objeto a uma efígie de cera transfixa a atenção, embora muitas vezes ataquem se o objeto for levado embora antes que possam ser postas a descansar.",
    "sections": [
      {
        "id": "cruel-creations",
        "title": "Criações Cruéis",
        "body": "Poucos se propõem a criar uma efígie de cera de propósito, pois as memórias fragmentadas as fazem comportar-se de modo bastante errático e, como tal, rendem guardiãs ou assassinas ruins. Qualquer criação intencional de uma efígie de cera é unicamente um ato de rancor, pois condena a alma a uma não-vida embebida em perplexidade e medo."
      }
    ]
  },
  "creature-zimiezek": {
    "description": "Os zimiezeks, também conhecidos como aqueles-que-tecem-segredos, são uma de muitas criaturas nativas de Duskfathom. Lembram aranhas grandes com mãos humanoides em vez de pés de aranha e possuem cabeças vagamente humanoides com múltiplos olhos e presas de aranha no lugar de mandíbulas. Os rostos muitas vezes estão cobertos por um véu, máscara ou teia tanto para esconder a identidade quanto como gesto de paz, pois a mordida de um zimiezek pode transformar outros humanoides neles.\n\nDiferente dos karumzeks, os servos divinos mais comuns de Norgorber, zimiezeks quase nunca deixam Duskfathom. A maioria é cidadã comum que venera Norgorber tanto como deidade quanto como príncipe. Só alguns servem o deus dos segredos diretamente como a segurança da cidade e força de ataque de elite.",
    "sections": [
      {
        "id": "uncertain-origins",
        "title": "Origens Incertas",
        "body": "Os zimiezeks acreditam que o primeiro deles surgiu de almas que outrora foram aliadas de Norgorber em vida, que tropeçaram no maior segredo do deus e foram mortas para ocultar sua identidade. Alguns duvidam dessa afirmação, dado o anátema de Norgorber contra mostrar misericórdia. Ainda assim, existe uma conexão entre Norgorber e tanto zimiezeks quanto karumzeks que permite ao deus saber automaticamente os nomes e identidades das criaturas."
      }
    ]
  }
}
