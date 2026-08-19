import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das criaturas de Rage of Elements. */
export const CREATURE_LORE_RAGE_OF_ELEMENTS: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-abysium-horror": {
    "description": "Composta do metal-céu radioativo abísio, esta criatura monstruosa semelhante a uma aranha é um predador mortal que contamina tudo que toca.",
    "sections": []
  },
  "creature-anemos": {
    "description": "A verdade da vida no Universo é que o clima controla o mundo. A água que dá vida e corre por Golarion, a manutenção das florestas saudáveis e as neves, degelos e chuvas que fazem as colheitas florescerem dependem todos do clima — clima moldado aos caprichos dos ventos. Anemoi são seres poderosos do Plano do Ar, incumbidos por deuses antigos de guardar os céus e pastorear os ventos de cada mundo pelos planos. Guiam os ventos por seus caminhos naturais e, embora não sejam malevolentes nem maliciosos, um anemos pouco se importa com o modo como uma tempestade possa afetar qualquer criatura pega em seu caminho.\n\nAnemoi podem assumir várias formas e transitar entre elas com a mesma facilidade com que escorregam entre as brisas. Vestem disfarces humanoides para caminhar entre mortais sem chamar atenção indevida, e se transformam em grandes cavalos trovejantes feitos de nuvens de tempestade e chuva quando precisam atravessar os céus com rapidez. Sua forma verdadeira, porém, é vento coalecido numa silhueta humanoide, muitas vezes com cabelos encaracolados e asas emplumadas feitas de nuvens suaves e à deriva.\n\nEm Golarion, cada um dos quatro ventos cardinais é criado e dirigido por um quarteto de anemoi cardinais. Os ventos frios do norte são guiados por Boreal, portador do inverno. Austral pastoreia ventos quentes do sul. Eural traz ventos tempestuosos do leste. Por fim, os ventos suaves da primavera vêm ao chamado de Zéfiro, do oeste. Esses quatro anemoi cardinais, ao lado de seus conselhos de anemoi menores, moldam e controlam os ventos por todo Golarion. Pelo que se sabe, os anemoi cardinais não respondem a uma autoridade maior. Há anemoi máximos ainda mais poderosos vivendo no Plano do Ar, mas parecem contentes em deixar o Universo fora de seus planos.\n\nEmbora os anemoi cardinais tentem manter certo afastamento dos assuntos mortais, anemoi menores ocasionalmente tomam interesse mais próximo. Alguns vigiam um único povoado ou condado, protegendo-o, nutrindo-o ou até destruindo-o com rancor. Cada um tem o próprio conjunto de interesses. Muitos são vaidosos ou mesquinhos. Ainda mais mudam de atitude com a mesma rapidez dos ventos que guiam. Agradar um anemoi não é questão de seguir uma fórmula fixa, e sim de mudar de rumo repetidamente para dar-lhes o que desejam para seus interesses volúveis do momento ou necessidades percebidas.",
    "sections": [
      {
        "id": "the-cardinal-anemoi",
        "title": "Os Anemoi Cardinais",
        "body": "Anemoi particularmente antigos e poderosos muitas vezes têm capacidades únicas. Além das habilidades padrão, os anemoi cardinais de Golarion possuem as seguintes magias inatas adicionais.\n\n **Austral**, o vento sul: **8º** _vortex de chamas_; **5º** _gêiser_ **Boreal**, o vento norte: **8º** _rajada gélida_; **5º** _nevasca uivante_ **Eural**, o vento leste: **8º** _relâmpago em cadeia_; **5º** _zona de pressão_ **Zéfiro**, o vento oeste: **8º** _campo de vida_; **4º** _tempestade de pétalas_, _falar com plantas_"
      },
      {
        "id": "the-shape-of-the-air",
        "title": "A Forma do Ar",
        "body": "Anemoi no Plano do Ar em geral não têm gênero, enquanto os que passam tempo no Universo às vezes experimentam ou desenvolvem preferências por um dos gêneros dos mortais que observam ou junto aos quais vivem."
      }
    ]
  },
  "creature-ardande-gardener": {
    "description": "Ardandes são descendentes de gênios cuja herança elemental os liga ao Plano da Madeira. A conexão elemental pode tomar muitas formas diferentes, todas expressões dos tipos e permutações da madeira elemental. Podem encarnar a vida e o viço de uma muda, cheia de potencial e pronta para crescer. Ou podem ser fortes e flexíveis, como os galhos e as raízes de árvores antigas, interligados e todos crescendo juntos. Também podem possuir poder sobre a morte e a decomposição, como troncos em decomposição prontos para fertilizar e alimentar a próxima geração.\n\nComuns no Plano da Madeira, incomuns no Primeiro Mundo e só no limiar de um ressurgimento no Universo, os ardandes muitas vezes se sentem deslocados no multiverso, nascidos no lugar errado ou na época errada. Muitos passam a vida vasculhando os planos em busca de respostas sobre si e sua herança.\n\nArdandes encontram-se em todas as grandes cidades e civilizações do Plano da Madeira, embora a maioria viva em Nodollin, o Infinito Reluzente, uma metrópole controlada pelos poderosos kizidhars. Alguns ardandes dizem que a vida em Nodollin é repleta de infantilização e menosprezo da parte dos kizidhars, os gênios da madeira que governam a terra e boa parte do plano. Os kizidhars em geral veem os ardandes como gênios como eles, mas uma forma menor de gênio que se situa abaixo dos kizidhars comuns do mesmo modo que estes são menores que os shuyookhs. Embora alguns ardandes se rebelem contra essa ordem social, o peso da cultura lhes diz que hierarquias são naturais ao elemento da madeira, e que devem aceitar o próprio lugar mesmo que isso os irrite.\n\nMuitos ardandes planares mudaram-se para Shodokar quando a cidade nova foi fundada, na esperança de que o influxo de portais saindo do Plano da Madeira lhes permitisse visitar o restante do multiverso e aprender sobre a herança mortal perdida. Deleitam-se em encontrar visitantes e mostrar a beleza e as maravilhas do plano natal. Alguns até se mudaram para o Universo, e tornam-se mentores inestimáveis para os novos ardandes que só agora descobrem o potencial elemental por Golarion.",
    "sections": [
      {
        "id": "first-world-ardande",
        "title": "Ardande do Primeiro Mundo",
        "body": "Alguns ardandes nascem no Primeiro Mundo, filhos de dríades que tomam amantes mortais. Esses ardandes têm pouco contato com outros mortais e se veem como feéricos elementais em vez de herdeiros planares — uma perspectiva razoável quando a vida no Primeiro Mundo significa o rompimento com o Rio das Almas."
      }
    ]
  },
  "creature-asp-of-grief": {
    "description": "No Plano do Metal, um sussurro suave e um tilintar gentil muitas vezes acompanham os ventos tempestuosos, enquanto o que parecem fitas de ouro se torcem e se contorcem pelo ar. Na verdade, são áspides da mágoa — criaturas inteligentes semelhantes a serpentes, atraídas por emoções fortes. As íris de ferro dos olhos lhes permitem ver os campos magnéticos em constante mudança do Plano do Metal, que as áspides usam para velejar pelos céus.\n\nÁspides da mágoa alimentam-se de tristeza e angústia, e tempos de perda, luto e pesar as atraem. Usando sinos de ferro delicados para anunciar a chegada a funerais, campos de batalha e os columbários tradicionais erguidos para os mortos do plano, as áspides da mágoa sacodem a cabeça, fazendo os sinos tilintar e alertando os enlutados de sua presença. “Compartilharão a mágoa comigo?”, perguntam, as vozes suaves baixas e sibilantes.\n\nSe o enlutado concorda, as línguas das áspides se projetam, saboreando a angústia dos vivos, sorvendo tristeza e medo, e oferecendo um alívio temporário do sofrimento. Embora as áspides estejam associadas à morte, a maioria dos habitantes do Plano do Metal as vê como bons presságios.\n\nCriaturas intensamente curiosas, as áspides da mágoa anseiam por informação sobre magia e o multiverso. Podem se apegar a grupos de aventureiros ou pedir a andarilhos que encontram qualquer conhecimento arcano obscuro que tenham encontrado nas jornadas. Em troca, as áspides da mágoa oferecem ajudar esses viajantes a trabalhar qualquer angústia ou trauma que carreguem — ou ao menos aliviar a dor emocional por um tempo.",
    "sections": [
      {
        "id": "calling-the-asps",
        "title": "Chamar as Áspides",
        "body": "No Plano do Metal, ritos fúnebres muitas vezes incluem colocar o falecido sobre torres altas cercadas de vasilhas de água. Pedaços de sódio, um metal alcalino branco-prateado, dançam pela superfície da água e pegam fogo, enviando plumas de gás hidrogênio ao ar. Enquanto as áspides da mágoa deslizam sobre os campos magnéticos, percebem esse anúncio de morte e mágoa e seguem o rastro de volta aos enlutados."
      }
    ]
  },
  "creature-avalanche-legion": {
    "description": "Elementais do Plano da Terra podem ser ferozmente territoriais. Alguns elementais mais solitários protegem os covis sozinhos, mas ocasionalmente outros se unem para defender regiões maiores que servem de território compartilhado. Destacam-se entre essas alianças as legiões da avalanche, que patrulham o perímetro desses territórios compartilhados, afastando intrusos que ousem transpor o chão natal.",
    "sections": [
      {
        "id": "familial-instincts",
        "title": "Instintos Familiares",
        "body": "Embora elementais não se reproduzam como criaturas típicas, deslizamentos vivos às vezes desenvolvem laços com elementais da terra menores ou mais fracos, como fagulhas da terra, pedregulhos vivos e cães de relva. Quando vários desses elementais menores se reúnem num só lugar, deslizamentos vivos que cuidaram das criaturas muitas vezes continuam a vigiar os protegidos. Legiões da avalanche às vezes se formam a partir desses ajuntamentos, quando vários deslizamentos vivos unem forças para proteger os elementais menores."
      }
    ]
  },
  "creature-blustering-gale": {
    "description": "Vendavais fanfarrões estão entre os menores dos elementais do ar: espíritos das brisas miúdas que às vezes surgem na esteira de criaturas mais poderosas, como a corrente descendente da asa de uma andorinha ou a expulsão brusca de uma tosse vigorosa. Incapazes ou relutantes em agir com eficácia sozinhos, formam-se em “vendavais”, coleções de elementais fracos que usam o poder combinado para lançar insultos e espancar quem os desafia, numa tentativa equivocada de elevar-se acima das origens humildes.\n\nJuntos, forçam outras criaturas a cumprir as ordens e depois seguem adiante quando se entediam. Embora a maioria dos vendavais afirme que os lacaios abandonados eram inúteis, na verdade os vendavais fanfarrões carecem da presença imponente e da confiança para reter vassalos por muito tempo.",
    "sections": [
      {
        "id": "lackeys",
        "title": "Lacaios",
        "body": "Vendavais fanfarrões às vezes servem de arautos ou executores para outras criaturas (incluindo dragões das nuvens, jaathooms e outros elementais do ar poderosos), intimidando e amedrontando outros a mando de um suserano mais influente. Embora vendavais fanfarrões muitas vezes se sintam seguros e confiantes nesses papéis, irritam-se com a subserviência e raramente se contentam com tal arranjo por muito tempo."
      }
    ]
  },
  "creature-boiling-spring": {
    "description": "Muitas vezes confundida com um elemental do ar devido à forma enevoada e quase imperceptível, uma nascente fervente é um elemental da água humanoide feito de vapor escaldante e água borbulhante. Quando invocada ao Universo, eleva a temperatura ambiente ao redor, tornando o clima circundante úmido e abafado. Parece apreciar o desconforto que causa, embora algumas vejam isso como mero trote divertido enquanto outras de fato se deleitam na miséria e buscam modos de causar mais.",
    "sections": []
  },
  "creature-brass-bastion": {
    "description": "Bastiões de latão são sentinelas formidáveis forjadas de fogo elemental e latão extraplanar. Embora possam ser moldados em muitas formas, a maioria retrata guerreiros musculosos com chifres curvos e expressões severas ou zombeteiras. Dentro de cada casca de latão há um inferno em fúria — a fonte do calor incessante.\n\nEmbora ifrits originalmente criassem bastiões de latão para agir como servos e guardas, o conhecimento de como forjá-los espalhou-se pelo Plano do Fogo. Podem até ser encontrados no Plano da Terra graças ao comércio interplanar. Em Medina Mudii'a, bastiões de latão andam pelas ruas, cuidam de lojas e montam guarda. Bastiões de latão sob encomenda são passados como heranças de família ou oferecidos a sócios e aliados. Herdeiros das linhagens ifrit mais ricas nunca viajam sem um séquito de bastiões de latão vestidos na libré da família. Destruir o bastião de latão de um ifrit rival é um jeito rápido de corroer o status político, embora quem for pego em tal sabotagem enfrente retribuição imediata.\n\nA maioria dos bastiões de latão exibe com destaque o sigilo do dono ou do fabricante, embora métodos mágicos também possam determinar quem forjou um construto específico. Bastiões de latão forjados por artesãos favorecidos são um símbolo de status em muitas comunidades ifrit. Ifrits consideram um bastião de latão forjado por um não ifrit inerentemente inferior, mal valendo o custo dos materiais. Bastiões de latão obedecem à programação mágica impressa no momento da criação ou seguem comandos dos donos. A maioria não fala, mas alguns têm vozes mágicas e podem repetir frases simples, recitar poesia ou contar histórias de ninar ao gosto do criador.",
    "sections": [
      {
        "id": "brass-scraps",
        "title": "Sucata de Latão",
        "body": "No Plano do Fogo, bastiões de latão destruídos são vendidos como sucata a ifrits empreendedores, que reforjam os restos em bastiões de latão novos. Muitos ifrits pagam mais pelos restos de um bastião de latão forjado por rivais, mas reagem com violência quando lhes oferecem restos de um bastião de latão que eles mesmos criaram. Assim, identificar o forjador original de um bastião de latão é uma habilidade valorizada. Poucos não ifrits ousam negociar sucata de bastião de latão, salvo em mercados extralegais."
      }
    ]
  },
  "creature-brochmaw": {
    "description": "Com corpos de argila queimada, brochmaws parecem fornos cilíndricos ambulantes fendidos ao meio pelas mandíbulas que lhes dão o nome, as quais rugem com os fogos da perfeição culinária. Atrás da boca queima um forno interno poderoso, onde as criaturas elementais assam a presa. Brochmaws são movidos unicamente pelos apetites vorazes, só saindo dos covis para adquirir refeições novas. Tentativas iniciais de forçá-los ao serviço resultaram nos pretensos captores reduzidos a nada além de cinza num prato, acompanhados de uma resenha escrita de como sabiam. Agora, brochmaws são empregados por todos os Planos, atraídos pela doce promessa de carne nova e fresca.\n\nEmbora brochmaws não tenham uso para dinheiro, trocam presentes por serviços. A única coisa que têm a oferecer é carne cozida das próprias bocas, que consideram extremamente valiosa. Surpreendentemente, todos que provaram carne de brochmaw afirmam ser um deleite assado e saboroso. Como brochmaws não oferecem nada além de carne cozida e não desejam nada além de carne crua, negociar com eles é um assunto simples, embora um pouco perigoso, que muitas vezes se resume à quantidade e à raridade da carne oferecida.\n\nBrochmaws odeiam ver carne ir para o lixo. Se um descobre uma carcaça de qualquer tipo, chama outros da espécie para juntar-se a um churrasco festivo, com dança e banquete inevitavelmente acompanhados de elogios ou queixas sobre a qualidade da comida.",
    "sections": [
      {
        "id": "planar-delicacies",
        "title": "Iguarias Planares",
        "body": "Embora brochmaws adorem devorar coisas novas, ainda têm refeições favoritas que gostam de ter à mão. Brochmaws amam carne de anfíbio, embora a origem desse apelo seja um mistério. Consomem com avidez descendentes de gênios de todos os tipos porque o sangue mágico produz um efeito psicodélico. Brochmaws acham celestiais tão perigosos quanto deliciosos, exigindo um processo de cozimento preciso para evitar matar o consumidor. A maioria dos brochmaws é bem impaciente demais para preparar carne celestial direito, muitas vezes com resultados desastrosos."
      }
    ]
  },
  "creature-capritellix": {
    "description": "O Plano do Metal pode parecer imprevisível a ponto da crueldade, e capritellixes encarnam isso perfeitamente. Com uma cabeça formada de discos que cada um retrata uma porção do rosto, um capritellix remodela a personalidade com um giro rápido. Apesar dos rostos diferentes, cada capritellix tem uma identidade unificada, com uma memória e um nome. Cada humor que cicla pelas peças do rosto é uma faceta massivamente amplificada da personalidade, em vez de um indivíduo completamente diferente. As diferenças são sutis para a maioria dos observadores, mas um capritellix pode exibir inúmeras combinações de humor — em geral 64 para um com quatro faces por disco ou 125 para um com cinco faces por disco. Não importa quanto mudem o rosto, porém, capritellixes não conseguem suprimir o ego altivo nem sacudir o desespero incessante que sentem. As prioridades conflitantes de cada humor dentro de um capritellix tornam difícil para qualquer uma dessas criaturas fazer planos de longo prazo ou formar relações sólidas. O que um rosto constrói, outro mina, amaldiçoado o tempo todo com pleno conhecimento das intenções anteriores que nunca cumprirá e dos planos bem traçados que abandonará.",
    "sections": [
      {
        "id": "recycled-remains",
        "title": "Restos Reciclados",
        "body": "Quando horrivelmente danificados ou exaustos, capritellixes viajam a uma necrópole comunitária, muito semelhante a um lendário cemitério de elefantes. Milhares de mãos metálicas erguem-se da paisagem, garrando o céu, e discos decepados que outrora compunham capritellixes amontoam-se em pilhas sem fim. Outros elementais às vezes salvam essas partes díspares e as montam num capritellix novo — um indivíduo único com uma identidade completamente nova."
      }
    ]
  },
  "creature-carved-beast": {
    "description": "Um número incontável de tocos entalhados em formas animais toscas vagueia pelo Plano da Madeira. A porção estátua dessas feras entalhadas é incapaz de movimento articulado, embora a madeira viva na base seja plenamente animada. Quando deixadas à própria sorte, feras entalhadas preferem imitar de modo tosco os comportamentos dos animais que lembram, como crianças brincando com brinquedos inarticulados.",
    "sections": [
      {
        "id": "carved-treasures",
        "title": "Tesouros Entalhados",
        "body": "Se um aventureiro for cuidadoso ao derrotar uma fera entalhada, a estátua pode ser recuperada intacta do corpo derrotado e vendida como um objeto de arte menor. Com um teste de perícia apropriado ao nível, um personagem treinado em Ofício pode potencialmente elevar a qualidade da estátua a moderada ou reaproveitá-la em algo completamente diferente, como entalhar uma forma de pássaro pequeno num apito decorativo."
      }
    ]
  },
  "creature-coldmire-pond": {
    "description": "Lagoas de lodo frio muitas vezes são confundidas com poças rasas de água, mas esses corpos sencientes de água viva na verdade rastejam pelo chão ou flutuam por outros líquidos. Lagoas de lodo frio são predadoras de emboscada perigosas, afogando criaturas que se aproximam demais ou, de modo ainda mais arriscado, ficam de pé ou nadam dentro das águas.",
    "sections": []
  },
  "creature-comozant-wyrd": {
    "description": "Plasma zunindo e crepitando compõe um wyrd comozante, ondas eletricamente carregadas de verdes, azuis e roxos em cascata em chama sem calor. Dotados de mente e de um semblante de rosto, wyrds comozantes precisam de uma superfície da qual possam crepitar e contorcer-se. Uma vez seguros, buscam companhia de quem estiver por perto. No Universo, podem ser encontrados em muitos lugares: amarrando-se a navios, dançando pelos edifícios ou ancorando-se às pedras de uma cadeia de montanhas. Nas vastidões do Plano do Ar, porém, wyrds comozantes muitas vezes passam a sentir-se extremamente solitários. Uns poucos sortudos tornam-se animais de estimação de jaathooms que vivem nas cidades do plano, mas muitos esperam em ilhas flutuantes isoladas por um navio aéreo ao qual possam se prender ou, mais tragicamente, esforçam-se em vão para alcançar uma costa distante antes de extinguir-se.",
    "sections": [
      {
        "id": "comozant-communication",
        "title": "Comunicação Comozante",
        "body": "Criaturas de emoção e instinto, wyrds comozantes usam imagens e conceitos simples para transmitir significados profundos e em camadas. São bastante perspicazes, capazes de saltar a conclusões sólidas com a mesma rapidez com que saltam por superfícies sólidas. A maioria de quem “conversa” com um wyrd comozante acha o processo esclarecedor, mas tem pouco desejo de torná-lo uma experiência regular."
      }
    ]
  },
  "creature-crystal-strider": {
    "description": "Cada perna longa e fina de um andarilho de cristal é um único cristal enorme, em geral quartzo ou selenita. O andarilho usa esse aparato de pernas e uma estrutura física flutuante para mover-se com rapidez por cavernas cristalinas, sem ser impedido pelo terreno.",
    "sections": []
  },
  "creature-cullitox": {
    "description": "Cullitoxes habitam cavernas profundas do Plano da Terra, repletas de cristais que brilham sob a própria energia interna. A fome de gemas de um cullitox o levará a viajar quase a qualquer lugar, até por rasgos planares. Ocasionalmente, até estabelecem colônias em planos que não o natal, caso o território recém-encontrado se prove repleto de cristais.\n\nO corpo semelhante a um escorpião de um cullitox reluz de cristal. Conforme a luz se refrata entre as facetas, concentram-na e a absorvem, energizando o cullitox e, dizem alguns, alimentando a magia da criatura.\n\nCullitoxes formam comunidades pequenas em locais onde cristais são abundantes, trabalhando lado a lado para rastrear qualquer coisa, de um quartzo comum a rubis e safiras preciosos. Partidas de reconhecimento usam a magia inata para comunicar-se uns com os outros via luz e som sem palavras, bem como para buscar mais cristais. Porém, quando os recursos de pedra preciosa rareiam, cullitoxes tornam-se independentes e territoriais quanto ao suprimento, tomando cristais de onde puderem, até arrebatando-os de outras criaturas.\n\nO impulso de um cullitox de reunir cristais é semelhante ao impulso de reproduzir-se. Conforme um cullitox reúne pedras, armazena-as dentro do corpo. Uma vez que o cullitox tenha material armazenado suficiente, o progenitor funde os estoques numa réplica minúscula de si e extruda o cullitox infante, às vezes chamado de fragmentinho, para o mundo. O processo deixa o progenitor enfraquecido por um tempo curto, até que possa reunir cristal suficiente para reparar o corpo e recomeçar o processo. Cullitoxes infantes consomem cristais de modo semelhante. Processam o material bruto ao longo de alguns meses para crescer até o tamanho adulto. Daí em diante, um cullitox “come” pedra só para curar ferimentos.",
    "sections": [
      {
        "id": "internal-gems",
        "title": "Gemas Internas",
        "body": "Quando um cullitox morre, o corpo se quebra em fragmentos de cristal. Algumas dessas peças são valiosas, mas potencialmente mais lucrativas são as gemas que o cullitox armazenou dentro do corpo para produzir prole. São necessárias pedras semipreciosas e preciosas no valor de 500 po para produzir um cullitox infante, embora a maioria dos cullitoxes mortos tenha só uma fração dessa quantidade armazenada. Uma vez que as pedras se tornam um cullitox novo, transformam-se no cristal do corpo do infante, não mais o material tesouro que um dia foram."
      }
    ]
  },
  "creature-despairing-pall": {
    "description": "Mantos da desolação são nuvens pequenas e escuras que flutuam sem rumo pelo Plano do Ar, lançando sombras literais e emocionais por onde passam. Trocistas e elementalistas travessos muitas vezes os invocam para chover no desfile de um rival.",
    "sections": []
  },
  "creature-dewdrop-jelly": {
    "description": "Geleias de orvalho são elementais da água pequenos que lembram águas-vivas feitas de bolhas gelatinosas. Em geral viajam em cardumes pequenos, flutuando pelo ar ou nadando pelos mares sem fim do plano natal. Quando ameaçadas, as geleias se descorporificam numa névoa fina e vaporosa, reconstituindo-se na forma de bolha só depois que o perigo passou. A elusividade esperta as torna difíceis de encontrar, levando alguns a afirmar que geleias de orvalho são fantasias míticas contadas para entreter crianças.",
    "sections": []
  },
  "creature-elder-outcrop": {
    "description": "Um afloramento de pedra densa que passa eras erodindo pode ganhar sapiência e despertar lentamente com a sabedoria da natureza. Tais seres elementais são lentos para agir e difíceis de irar, impelidos só por ameaças imediatas.",
    "sections": [
      {
        "id": "wisdom-of-stone",
        "title": "Sabedoria da Pedra",
        "body": "Afloramentos anciãos aprendem uma lição para cada grão de rocha erodido, cada temporal e geada que moldou os corpos escarpados. Como conselheiros e tutores sábios, têm o respeito e o afeto de outros elementais, bem como de criaturas naturais. Druidas da ordem da pedra reverenciam a sabedoria dos afloramentos anciãos, sempre felizes em receber a perspectiva ampla, literal e filosófica."
      }
    ]
  },
  "creature-elemental-thicket": {
    "description": "No Universo, o crescimento vegetal procede numa escala de dias, semanas, anos e décadas. Por outro lado, um matagal elemental cresce constantemente e em segundos. Essas massas contorcidas de madeira viva são a encarnação elemental do próprio crescimento, inchando quando menos se espera para consumir tudo em seu caminho.",
    "sections": []
  },
  "creature-faydhaan-shuyookh": {
    "description": "Shuyookhs faydhaan são faydhaans poderosos venerados como líderes, diplomatas e negociadores. Como representantes do povo faydhaan, observam regras estritas de etiqueta e hospitalidade e têm as artes literárias e performáticas em alta estima. Um shuyookh faydhaan deleita-se em cumprimentar hóspedes, e ser cumprimentado em troca, para ver quantas saudações diferentes consegue demonstrar. Hóspedes que se envolvem de modo criativo nesse jogo costumeiro de saudações impressionarão um shuyookh faydhaan e receberão hospitalidade magnífica.",
    "sections": [
      {
        "id": "shazathared",
        "title": "Shazathared",
        "body": "Shazathared é uma das maiores contadoras de histórias do povo gênio, e sua linhagem nobre remonta a padishás faydhaan há muito depostos. Recentemente libertada de um longo cativeiro, “a Joia do Padishá” pode ser encontrada desfrutando de calorosa acolhida entre faydhaans. Quando a musa a toma, ela encena contos morais empolgantes das _Canções de Shazathared_ para honrar ou esclarecer os anfitriões e deleitar a plateia."
      }
    ]
  },
  "creature-ferrous-butterfly": {
    "description": "Bela mas mortal, a borboleta ferrosa é uma criatura insetoide do tamanho de um peru, eriçada de dezenas de lâminas reluzentes de gume de navalha. Considerada inofensiva pela maioria dos habitantes do Plano do Metal, ainda assim representa uma ameaça significativa a criaturas orgânicas, cujo sangue rico em ferro acham irresistível.",
    "sections": []
  },
  "creature-gennayn": {
    "description": "Gennayns são gênios menores que muitas vezes servem de emissários e mensageiros para seres elementais maiores. Embora muitos encontrem propósito nessa missão humilde, o verdadeiro chamado e interesse está nas artes.\n\nMuitas vezes aparecem como humanoides minúsculos e atléticos com fios de energia elemental dissipando-se continuamente dos corpos. Essas energias elementais muitas vezes refletem as emoções e o elemento afinado. Gennayns também são afeitos a anéis, amuletos e braceletes ostentosos.\n\nGennayns ajudam com avidez seres poderosos que os recompensam e os tratam bem, mas são igualmente rápidos em abandonar quem consideram tedioso, mesquinho ou abusivo. Seres que destroem obras de arte ou maltratam artistas ganharão a ira eterna.",
    "sections": [
      {
        "id": "artistic-inspiration",
        "title": "Inspiração Artística",
        "body": "Indivíduos talentosos muitas vezes afirmam ter sido inspirados por forças de outro mundo. Como gennayns são conhecidos por compartilhar inspiração e desenvolver talento, muitos estudiosos e artistas acreditam que a aptidão se beneficiou, sem que soubessem, da atenção de um gennayn. Outros especulam que estar nas graças de um gennayn pode afastar crises de tédio artístico — ou que irar um gennayn é um caminho direto para a marasmo criativo. Os próprios gennayns não se dizem musas, apenas seres atraídos pelo talento."
      }
    ]
  },
  "creature-gluttonous-geode": {
    "description": "As vastas fileiras de elementais da terra foram lentas em responder ao retorno dos senhores elementais e dos Planos do Metal e da Madeira. Esses eventos não quebraram as montanhas, nem sopraram as areias embora.\nEmoções Terrosas\nElementais da terra falam ainda menos que a maioria dos elementais. São ponderosos, sopesando decisões tão devagar que podem esmagar a energia de uma discussão. A preocupação primordial é se uma situação pode ser suportada. Embora um tesouro raro ou resplandecente possa tentá-los, é difícil despertar qualquer senso de urgência neles sem a presença de uma ameaça imediata.",
    "sections": []
  },
  "creature-harvest-regiment": {
    "description": "Grandes árvores frutíferas crescem em fileiras maciças e ordenadas numa região do Plano da Madeira chamada Bosque do Arsenal. Ao longo de décadas, os galhos de uma árvore de regimento ficam pesados, carregados de frutos de forma estranhamente humana. São cultivados por guerreiros aposentados cujo trabalho incansável assegura que esses frutos cresçam numa forma adequada à batalha. Os esforços instilam conhecimento tático nesses guerreiros-fruto para que estejam prontos a lutar assim que caem da árvore — o que fazem simultaneamente, formando uma unidade pronta para o combate. Cada soldado é igual em habilidade e semelhante na forma, com uma casca de madeira externa que se fende em porções conforme a polpa do fruto interior amadurece. Um guerreiro morto contém sementes no corpo que podem germinar lentamente em solo rico com água suficiente — ou sangue. Cada campo de batalha pode tornar-se um jardim novo.",
    "sections": [
      {
        "id": "out-of-season",
        "title": "Fora de Época",
        "body": "O bloco de estatísticas do regimento da colheita representa a tropa quando é colhida exatamente no momento certo. Um regimento “verde”, ou verde demais, pode ser pressionado ao serviço antes de estar pronto, e uma versão passada pode cair da árvore parcialmente podre. Ambos usam os ajustes fracos e têm 126 PV com limiares de 84 e 42 PV. Um regimento verde perde banho de suco e fraqueza a fogo, e o banho de suco de um regimento podre deixa a criatura enjoada 1 se falhar numa salvaguarda de Fortitude CD 25, em vez do efeito normal."
      }
    ]
  },
  "creature-ifrit-shuyookh": {
    "description": "Os líderes e luminares dos ifrits vêm dos shuyookhs sábios, mas cruéis. Esses manipuladores rancorosos impõem o poder sobre outros gênios e distorcem a ganância mortal em luto. Shuyookhs ifrit guiam o Domínio da Chama com caprichos vis e crença inabalável na supremacia ifrit.",
    "sections": [
      {
        "id": "hot-gossip",
        "title": "Fofoca Quente",
        "body": "Herdeira da família nobre, mas desonrada, Mishalq, a corretora de informações ifrit Qalkami Mishalq saiu do exílio e voltou ao Domínio da Chama após a morte do Sultão Suleiman XXII. Qalkami usou contatos na Sociedade Pathfinder para eliminar as rivais da família Cinderfury e ocupar um vácuo de poder de sua própria criação, expandindo o controle e a influência entre a grande nobreza de Medina Mudii'a."
      }
    ]
  },
  "creature-jaathoom-shuyookh": {
    "description": "Shuyookhs jaathoom exaltados são provedores ostentosos de sonhos e pesadelos. Podem permanecer invisíveis como qualquer jaathoom, mas preferem tornar-se visíveis para melhor comunicar-se e expressar a individualidade por meio de tecidos brilhantes, joias caras e exibições espalhafatosas de excesso.",
    "sections": [
      {
        "id": "lady-dariya-s-dazzling-emporium",
        "title": "Empório Deslumbrante da Lady Dariya",
        "body": "A reclusa joalheira e ourives jaathoom Lady Dariya forja joias encantadas a partir de materiais planares raros e incomuns. Opera o Empório Deslumbrante da Lady Dariya em Absalom das Sombras. Também está em péssimos termos com Armun Kelisk e há rumores de que esteja no exílio do Plano do Ar agora que Ranginori retornou."
      }
    ]
  },
  "creature-jabali-shuyookh": {
    "description": "Um gênio jabali de grande poder e alta patente social é chamado de shuyookh. Fortes de corpo e mente, shuyookhs jabali valorizam habilidade física, artesanato fino e exibições de força. Incrivelmente orgulhosos, ofendem-se com facilidade e irritam-se depressa, mas só revidam depois de sopesar as consequências. Shuyookhs veem os próprios desejos como maiores que os de quem os cerca, o que os leva a prestar auxílio com a maior rapidez e eficiência possíveis, cumprindo os termos das barganhas de modo expedito e à letra.\n\nShuyookhs jabali são industriosos e têm muitos interesses, incluindo competições atléticas, engenharia, joalheria, alvenaria, metalurgia e escultura. Gostam de jogos de azar e de barganha, seja num salão de jogos, numa arena ou num mercado. Alguns misturam os interesses gerindo organizações ou guildas ligadas a tais assuntos. Muitos shuyookhs colhem a riqueza do Plano da Terra para venda em outros lugares e especulam sobre o valor de tais mercadorias.",
    "sections": [
      {
        "id": "industry-titans",
        "title": "Titãs da Indústria",
        "body": "Os impérios mercantis dos shuyookhs jabali estendem-se pelo Plano da Terra e a outros planos. Jabalis gostam especialmente de negociar em regiões do Universo e pelo Plano do Fogo. Muitos clientes valorizam gemas, metais e outros materiais preciosos extraídos no Plano da Terra. Assim, os recursos do Plano da Terra alimentam a indústria pelos planos."
      }
    ]
  },
  "creature-jann-shuyookh": {
    "description": "Tidos como os progenitores do povo gênio, janns ocupam uma posição de estima acima dos gênios ligados a planos específicos. Possuem uma habilidade inata de conceder desejos, da qual os outros ramos do povo gênio carecem e invejam profundamente. Shuyookhs jann nômades raramente mantêm corte, preferindo reunir-se só quando a necessidade surge de realizar grandes feitos. Janns menores respeitam e veneram esses líderes pela sabedoria e pela dedicação total a preservar a honra e a reputação do povo. Um shuyookh jann lê presságios e agouros ao lidar com mortais duplicitosos.",
    "sections": [
      {
        "id": "evolving-essence",
        "title": "Essência em Evolução",
        "body": "Com o retorno dos planos elementais do metal e da madeira, janns encontraram magia elemental nova brotando dentro dos seres. Isso causou mudanças físicas rápidas, e janns antecipam que eventualmente poderia até mudar os humores e os pensamentos. Embora a maioria dos janns agora sinta a amplitude plena do poder elemental, alguns ainda se veem limitados só aos elementos de ar, terra, fogo e água, ou têm influência diminuída sobre metal e madeira em comparação com os outros quatro elementos."
      }
    ]
  },
  "creature-kinzaruk": {
    "description": "Em seu estado natural, o kinzaruk lembra uma folha perfeitamente quadrada, fina como papel, de metal branco-prateado leve, com cerca de 4,5 m de lado. Quase nunca é encontrado nessa forma, porém, sendo bem mais conhecido pela habilidade de dobrar o corpo de modo intrincado milhares de vezes num instante para reconfigurar-se numa variedade de formas mortais semelhantes a animais.",
    "sections": []
  },
  "creature-kizidhar": {
    "description": "Kizidhars parecem árvores ambulantes, com média de 3 a 3,6 m de altura, com galhos que se torcem para formar os braços, os rostos e outros traços. Um kizidhar pode remodelar o corpo para criar qualquer objeto de madeira.",
    "sections": [
      {
        "id": "patrons-of-art",
        "title": "Patronos da Arte",
        "body": "Kizidhars são grandes patronos e seres a introduzir numa campanha usando regras de fabricação da natureza. São orgulhosos, vaidosos e felizes em ostentar a superioridade criando armas e armaduras de madeira para quem lhes prestar um serviço. Kizidhars sempre buscam obter a vantagem em tais acordos, porém, e personagens jogadores que troquem serviços por bens kizidhar devem fazê-lo cientes de que um kizidhar raramente fecha um trato se não acreditar que está ficando com o lado melhor da barganha."
      }
    ]
  },
  "creature-kizidhar-shuyookh": {
    "description": "Shuyookhs kizidhar são os governantes poderosos do Infinito Reluzente no Plano da Madeira. Veem outros gênios, inclusive outros kizidhars, como subservientes à própria grandeza, manipulando-os como se fossem forasteiros sempre que isso ajuda a alcançar as metas. Diplomatas shuyookh kizidhar são enviados como emissários do Plano da Madeira ao Universo, representando a metrópole de Nodollin e a Grã-Sultana Eshal Muazzam Rayadii do Infinito Reluzente, Senhora de Tudo que Cresce e Decai.",
    "sections": [
      {
        "id": "wishcrafters",
        "title": "Artesãos de Desejos",
        "body": "Shuyookhs kizidhar consideram-se artistas da forja de desejos, plantando e nutrindo as sementes de uma ideia e guiando o crescimento até o desejo que por fim dão vida. Shuyookhs têm grande orgulho em aprimorar um desejo enquanto conduzem o ritual _desejo_, muitas vezes acrescentando elementos de assinatura únicos aos desejos, semelhantes a uma marca de fabricante."
      }
    ]
  },
  "creature-lava-otter": {
    "description": "Essas lontras flamejantes brincam e caçam nos riachos de lava do Plano do Fogo. São conhecidas por serem altamente territoriais, instigando brigas com famílias rivais de lontras para competir por território. Cautelosamente curiosas com estranhos, matilhas inteiras já se lançaram sobre quem ataca ou mesmo acidentalmente ameaça um membro da família.",
    "sections": [
      {
        "id": "familiar-poaching",
        "title": "Caça a Familiares",
        "body": "Muitos magos do fogo gananciosos desejam domesticar lontras de lava para que atuem como familiares, um sentimento odiado pela maioria dos habitantes do Plano do Fogo. Embora as pelagens ardentes das lontras sirvam de dissuasão para pretensos caçadores furtivos, numerosos naari (descendentes de gênios do fogo) ainda tomam para si patrulhar os habitats das lontras de lava para protegê-las da caça furtiva."
      }
    ]
  },
  "creature-lithic-locus": {
    "description": "Civilizações morrem, soterradas pelo tempo, mas a memória ainda pode persistir em cerâmica estilhaçada, edifícios desabados e obras de arte destruídas, comprimidas e clarificadas sob o peso de rocha e solo. Alguns sítios escavados ainda podem guardar um fiapo de consciência nos materiais de base, que caminha de novo como um avatar de um povo extinto quando despertado. Esses lócus líticos representam os triunfos e a loucura da sociedade. Falar com um é falar com uma testemunha de um tempo arcaico. A persona do lócus lítico expressa a cultura em todas as dimensões, e assim as atitudes dos lócus líticos variam muito. As aparências mostram a estética e a tecnologia da época, suspensas numa nuvem de terra escavada.\n\nPor mais abundantes que sejam os sítios arqueológicos no Universo, o Plano da Terra guarda incontáveis outros de proveniência bem mais antiga. Alguns de seus habitantes até encontraram lócus líticos de povos bem mais velhos que eles mesmos, vendo diretamente o que restaria caso definhassem para fora da memória viva. Isso levou algumas civilizações a até planejar o próprio declínio deixando um legado na rocha viva.",
    "sections": [
      {
        "id": "ancient-finds",
        "title": "Achados Antigos",
        "body": "Lócus líticos muitas vezes contêm itens importantes e valiosos. Nenhum desses construtos elementais é propenso a concordar em ser saqueado, mas alguns lócus conferem as antiguidades a sucessores dignos, orgulhosos de ver as criações da cultura postas a uso eficaz nos dias de hoje. Lócus líticos também podem dirigir buscadores sinceros a outros tesouros perdidos, ajudando a restaurar o conhecimento de uma sociedade extinta."
      }
    ]
  },
  "creature-living-grove": {
    "description": "Um bosque vivo é uma entidade singular conectada, com dezenas de troncos geneticamente idênticos unidos no mesmo sistema de raízes. Em repouso, um bosque vivo não lembra nada tanto quanto um pequeno arboreto de bétulas e álamos, embora existam variedades de carvalho e sequoia significativamente maiores e mais resistentes.",
    "sections": [
      {
        "id": "slumbering-giants",
        "title": "Gigantes Adormecidos",
        "body": "Muito antes da civilização mortal, bosques vivos chegaram ao Universo, enterraram as raízes fundo em busca de segurança e caíram em dormência. Um punhado desses elementais antigos sobrevive até hoje, contando-se entre as entidades não imortais mais velhas ainda vivas no plano. A longa separação do Plano da Madeira enviou a maioria a uma hibernação profunda, mas uma infusão de energia planar ou magia primal poderosa poderia potencialmente despertá-los."
      }
    ]
  },
  "creature-living-lodestone": {
    "description": "Esta esfera giratória de metal escuro e brilhante flutua a cerca de 1,5 m do chão, constantemente cercada por um frenesi rodopiante de objetos metálicos menores presos em seu poderoso campo magnético.",
    "sections": [
      {
        "id": "lodestone-loot",
        "title": "Espólio da Magnetita",
        "body": "O ciclone de objetos metálicos que orbita constantemente uma magnetita viva muitas vezes contém itens de valor, que vão de simples moedas e pedaços de metal precioso a armas há muito perdidas, joias e às vezes até bugigangas metálicas encantadas. A própria magnetita não tem conceito do valor de tais coisas, e é tão propensa a arremessar um desses itens valiosos contra um inimigo quanto qualquer outro objeto."
      }
    ]
  },
  "creature-living-magma": {
    "description": "Magmas vivos podem jazer dormentes por séculos sob a terra antes de despertar do sono numa erupção vulcânica flamejante. Isso é especialmente perigoso quando colônias inteiras dos elementais fundidos se erguem ao mesmo tempo.",
    "sections": []
  },
  "creature-lomori-sprout": {
    "description": "Brotos lomori são jardineiros apaixonados que cuidam de perto do crescimento novo no Plano da Madeira. Incrivelmente industriosos, guiam com carinho plantas jovens a construções e padrões elaborados, formando túneis de árvores, campos espiralados de flores, labirintos complexos de sebes, tapeçarias altaneiras de bambu entrelaçado e outras criações vertiginosas. Brotos lomori coletam com meticulosidade as aparas, as sementes e os detritos da flora sob seus cuidados. Plantam as sementes para render crescimento novo e entrelaçam freneticamente o restante em ninhos, esferas e outros objetos simples. São tímidos e assustadiços, muitas vezes perdendo-se nos labores, mas sempre amistosos com quem trata os jardins com respeito.\n\nLomoris são espíritos aeon despachados aos planos elementais há muito tempo para perseguir o ato da criação. Embora a maioria dos aeons despachados aos outros planos elementais tenha cumprido os deveres e se reunido aos irmãos aeon, os do Plano da Madeira permaneceram, ficando presos conforme o plano recuava. Ao longo das eras, adaptaram-se e evoluíram em lomoris. Hoje, lomoris têm mais em comum com os outros habitantes do Plano da Madeira do que com os ancestrais aeon.\n\nBrotos lomori, muito como conrasus, têm uma esfera negra central, conhecida como o núcleo de um lomori, que funciona como corpo primário e consciência. Onde conrasus forjam um exoesqueleto robusto, lomoris cultivam um monte alto de capim-pradaria em torno do núcleo, que facilmente cresce a 2–3 vezes a altura do núcleo. O lomori molda o monte conforme cresce, criando camadas protetoras para guardar o núcleo e formando outros apêndices úteis. A maioria dos lomoris tem seis pernas intricadamente detalhadas, semelhantes às de caranguejo, de madeira que emergem da metade inferior do núcleo, permitindo-lhes correr com rapidez pelo chão ou escalar árvores.",
    "sections": [
      {
        "id": "get-off-my-lawn",
        "title": "Sai do Meu Jardim!",
        "body": "Brotos lomori são industriosos, porém assustadiços, interrompendo o trabalho só para esconder-se de intrusos — se puderem dar-se ao trabalho de parar. São incessantes nos esforços, muitas vezes trabalhando juntos em grupos grandes para cuidar de vastas faixas de terra. Nada desperta um broto lomori à violência mais depressa do que danificar o jardim ou outras criações."
      }
    ]
  },
  "creature-melomach": {
    "description": "Melomachs são elementais maciços, vagamente humanoides, compostos de detritos metálicos. Têm grande orgulho em decorar e aumentar os corpos metálicos com espinhos, lâminas, crânios humanoides ou bestiais e outros adornos semelhantes colocados ao acaso, quanto mais ostentosos melhor. Quando dois melomachs se encontram, os contornos resultantes de poder físico e proeza vocal podem durar dias, muitas vezes deixando a paisagem devastada por quilômetros em todas as direções.",
    "sections": [
      {
        "id": "music-of-mass-destruction",
        "title": "Música de Destruição em Massa",
        "body": "O apetite de um melomach por carnificina só se iguala ao amor por barulhos altos, em particular o estrondo de explosões e o grito de metal rasgando. Além do som das próprias vozes, melomachs são afeitos ao rasgueado rápido e discordante e aos uivos poderosos que tipificam os estilos musicais típicos do Plano do Metal. Apresentações barulhentas muitas vezes atraem a atenção de melomachs."
      }
    ]
  },
  "creature-mercurial": {
    "description": "Alguns dos habitantes mais populosos do Plano do Metal, mercuriais são criaturas estranhas de metal líquido conhecidas por mudar os traços, as composições químicas e os temperamentos com igual frequência. Excitáveis, curiosos e amistosos, mercuriais são rápidos em oferecer assistência a seres extraplanares, mas as personalidades voláteis podem torná-los aliados pouco confiáveis.",
    "sections": [
      {
        "id": "many-faces-many-names",
        "title": "Muitos Rostos, Muitos Nomes",
        "body": "Como seres imortais com intervalos de atenção comparativamente curtos, mercuriais invariavelmente se entediam com as identidades atuais mais cedo ou mais tarde e buscam uma mudança adotando um rosto e uma persona novos. Para evitar confusão entre amigos e conhecidos, o nome de um mercurial em geral consiste não só no apelido atual, mas numa lista dos últimos nomes usados, apresentados em ordem cronológica até onde o mercurial consegue lembrar."
      }
    ]
  },
  "creature-metal-scamp": {
    "description": "Os caprichosos e destrutivos diabretes do metal são forças autoproclamadas da entropia e deleitam-se em destruir indiscriminadamente tudo ao redor, às vezes até em prejuízo próprio. Diabretes do metal têm uma aparência severa, com traços faciais pontiagudos e membros angulosos, e a pele pode ser da cor de qualquer metal, muitas vezes fortemente oxidada como se por anos de exposição aos elementos.",
    "sections": []
  },
  "creature-metal-wisp": {
    "description": "Uma fagulha do metal é uma esfera revoluta de partículas de ferrugem e fragmentos de metal afiados, todos orbitando com fúria um núcleo de metal líquido que lembra o crânio de uma criatura mortal — em geral um humanoide, mas crânios de animais e até mais fantásticos não são incomuns. Não formam laços com a mesma facilidade que fagulhas de outros planos elementais, que tendem a ver as fagulhas do metal como sombrias demais, embora retenham certa curiosidade desde o retorno da cisão planar.",
    "sections": []
  },
  "creature-moss-sloth": {
    "description": "Essas colônias de musgo coalescem ao longo de um século no fac-símile tosco de uma preguiça grande, até imitando a estrutura única da pelagem do animal que atrai fungos adicionais e insetos polinizadores. A menos que sejam invocadas ou atacadas, raramente deixam as árvores sobre as quais se formaram primeiro.",
    "sections": []
  },
  "creature-munsahir-gatecrasher": {
    "description": "Em geral membros da nobreza, os arrombadores de portais usam armadura motorizada avançada.",
    "sections": []
  },
  "creature-munsahir-trooper": {
    "description": "Soldados altamente hábeis vêm em sua maioria da classe bronze.",
    "sections": []
  },
  "creature-murajau": {
    "description": "Murajaus, uma de muitas criaturas nômades do Plano da Água, parecem humanoides da cintura para cima, mas lembram um caranguejo-ermitão grande da cintura para baixo, inclusive um par de pinças fortes. Comunidades murajau muitas vezes são multilíngues, e muitos indivíduos estão dispostos a trabalhar como tradutores e guias para aventureiros se devidamente compensados. Em vez de moeda, murajaus preferem negociar bugigangas como talismãs, em particular os que protegem viajantes. Para murajaus, tais itens significam a sinceridade e o desejo inabalável de proteger os outros. Trocam entre si contos de tesouros perigosos demais para explorar com facilidade. Em vez de guardar essa informação só para si, compartilham-na de bom grado com pessoas confiáveis que encontram em troca de uma pequena parte.\n\nFaydhaans contam histórias condescendentes de murajaus, descrevendo a origem como servos reais que falharam em cumprir um decreto real. A própria história de criação dos murajaus, por outro lado, afirma que o decreto real em questão pedia que viajassem as terras para oferecer abrigo e hospitalidade a visitantes, uma missão que carregam desde então por gerações. Têm grande orgulho em tratar bem os hóspedes, especialmente em oferecer comida, bebida e presentes adequados.",
    "sections": [
      {
        "id": "more-than-a-mere-shell",
        "title": "Mais que uma Simples Concha",
        "body": "Para murajaus, a concha significa lar, status, identidade e herança cultural. Anciãos e líderes da comunidade muitas vezes usam conchas passadas por uma longa linhagem de sucessores, que carregam modificações e marcas que denotam as conquistas e os fracassos dos predecessores. Na ocasião em que o número da comunidade excede o de conchas disponíveis, uma temporada de caça pode ser declarada. Participantes que voltam com troféus adequados são reverenciados pela contribuição e pela bravura."
      }
    ]
  },
  "creature-nanoshard-swarm": {
    "description": "Esta entidade bizarra é na verdade um coletivo maciço consistindo de dezenas de milhares de partes constituintes, cada uma uma esfera metálica minúscula mal do tamanho de um seixo. Controlado por um único espírito elemental, o enxame é capaz de fluir como líquido pelas aberturas mais estreitas antes de moldar-se num combatente poderoso, numa muralha sólida ou em qualquer outra forma que as circunstâncias possam exigir.",
    "sections": [
      {
        "id": "some-reassembly-required",
        "title": "Alguma Remontagem Necessária",
        "body": "Enxames de nanoestilhaços são notoriamente difíceis de desmantelar de modo permanente. Se até um único constituinte de um enxame conseguir escapar à destruição, o elemental minúsculo imediatamente busca a fonte mais próxima de metal bruto e começa a extrair material a fim de criar o maior número possível de duplicatas exatas de si. Cada duplicata subsequente então repete diligentemente o mesmo comportamento, dobrando o número de constituintes a cada poucos minutos, até que o enxame inteiro tenha sido plenamente reconstituído."
      }
    ]
  },
  "creature-nightwood-guardian": {
    "description": "As matas noturnas são partes do Plano da Madeira permanentemente banhadas em escuridão devido à ausência de plantas fluorescentes. Aqui, a flora e a fauna exigem escuridão, não luz, para prosperar. Criaturas semelhantes a trolls conhecidas como guardiões da mata noturna patrulham esses bosques para assegurar que permaneçam em sombra perpétua. Considerando-se jardineiros justos, pouco se importam com as desculpas de qualquer outro — intrusos ou residentes. Os guardiões absolutamente detestam a luz, embora ela não os prejudique como faz a algumas variedades de criaturas. Embora desconfiados tanto da luz quanto de quaisquer formas de vida intrometidas no habitat natural, o medo de um guardião da mata noturna vira com facilidade ira, tornando o guardião uma força de fúria que busca expulsar os intrusos.",
    "sections": [
      {
        "id": "rare-gentleness",
        "title": "Gentileza Rara",
        "body": "Embora a maioria dos encontros com guardiões da mata noturna termine em violência, o Plano da Madeira tem muitos contos folclóricos sobre essas criaturas gigantes escoltando jovens perdidos nas matas noturnas em segurança para fora da escuridão. Se essas histórias são verdadeiras ou pensamento desejoso é debatido, com alguns argumentando que um guardião da mata noturna só faria tal gentileza a ordens de outra criatura."
      }
    ]
  },
  "creature-nursery-crawler": {
    "description": "A energia elemental vibrante do Plano da Madeira imbui até a mais podre das árvores caídas, dando-lhes poder para viajar em busca dos melhores locais para a próxima geração lançar raízes. Este toco podre de um só olho lança sementes que começam a brotar no instante em que são enterradas, seja no solo ou na pele de uma criatura viva.",
    "sections": []
  },
  "creature-olobigonde": {
    "description": "Embora o Plano da Água seja em sua maioria líquido, contém sua parcela de material sólido, seja na forma de plantas aquáticas flutuantes livres, pedaços de coral ou até detritos de cidades submersas perdidas. Destroços e detritos flutuantes acumulam-se pelo plano, e olobigondes são só uma das muitas criaturas que evoluíram para viver entre e consumir esses detritos. Esses peixes chatos e redondos são cobertos de uma pele semelhante a musgo que os torna excepcionalmente difíceis de avistar enquanto se colam aos lados dos destroços, alimentando-se do lixo que deriva para as bocas largas e abertas.\n\nEmbora olobigondes sejam primariamente detritívoros, já se soube que ficam à espreita numa floresta de sargaço ou contra uma pedra musgosa para emboscar criaturas menores, como diabretes da água ou tritões solitários de passagem. Os peixes lançam-se do esconderijo para dar grandes mordidas na presa surpresa, então agarram a vítima enquanto ela tenta fugir. Apesar do tamanho e da forma desajeitada, olobigondes podem mover-se depressa na água, embora as explosões de velocidade em geral sejam de curta duração. Além de manter um aperto firme na presa, as bocas dos olobigondes estão repletas de uma toxina única que enfraquece e decompõe carne viva. O peixe faminto engole com facilidade a pasta resultante.\n\nOlobigondes antigos crescem verdadeiramente imensos, e a aparência externa evolui. Parece não haver limite para o tamanho. A pele até se separa em placas com canais profundos onde a água pode acumular-se, dando-lhes a aparência de um trecho inteiro de detritos em vez de uma só peça.",
    "sections": [
      {
        "id": "olobigonde-toxin",
        "title": "Toxina de Olobigonde",
        "body": "Alquimistas que viajam os planos descobriram com que prontidão a toxina de um olobigonde pode decompor carne, e alguns descobriram modos de incorporá-la às criações. O cadáver de um olobigonde rende aproximadamente 1 po em matérias-primas quando colhido com um teste de Ofício ou Sobrevivência CD 16 bem-sucedido (2 po num sucesso crítico). Este material só pode ser usado para fabricar bombas alquímicas com o traço veneno."
      }
    ]
  },
  "creature-ore-louse": {
    "description": "Piolhos de minério são criaturas insetoides de seis pernas que se empoleiram logo abaixo ou acima da superfície da água. São altamente territoriais tanto com estranhos quanto uns com os outros, capazes de detectar um intruso pelas ondulações na água. Devido à dieta, piolhos de minério têm quitina incrivelmente dura infundida de metal. Canibalismo entre piolhos de minério é comum quando não conseguem localizar outra presa.\n\nEmbora haja ambientes bem mais adequados para piolhos de minério bordando o Plano do Ar, as criaturas muitas vezes são encontradas onde o Plano da Terra encontra o Plano da Água. Isso era um mistério que intrigava muitos — até o Plano do Metal retornar entre os Planos da Terra e da Água. Pesquisadores planares perceberam que piolhos de minério devem ter caçado aqui antes da cisão planar. No Plano do Metal, piolhos de minério muitas vezes aparecem em histórias de horror perseguindo elementais do metal e devorando-os com ferocidade. A conexão com Ferrumnestra acrescenta à infâmia.",
    "sections": [
      {
        "id": "ore-louse-boots",
        "title": "Botas de Piolho de Minério",
        "body": "Devido à habilidade de caminhar sobre a água, inúmeras tentativas foram feitas de usar pernas de piolho de minério para produzir calçados. Técnicas testadas até agora incluem ocar a quitina ou colher e refinar os espinhos finos das pernas. Nenhuma dessas tentativas teve sucesso até o momento."
      }
    ]
  },
  "creature-oregorger": {
    "description": "Oregorgers são brutamontes corpulentos de quatro membros com corpos de metais primais brutos acrescidos em camadas. Movidos inteiramente por um impulso insaciável de consumir metal, um oregorger não para diante de nada para devorar com avidez tanto metal quanto puder e expeli-lo como ferrugem cáustica.",
    "sections": []
  },
  "creature-painted-stag": {
    "description": "À distância, cervos pintados parecem construídos na forma geral de veados machos, os flancos e os chifres decorados com padrões únicos e coloridos. Mas, embora retenham (e de fato aumentem) os projetos que Shumunue lhes conferiu, cervos pintados rejeitam os limites da arte de mímica da Senhora Entalhada. Hoje, os cascos fendidos de madeira dura podem esmagar osso e aplicar tinta com igual habilidade, e os chifres se fecham juntos numa morsa mortal. Os torsos giram livremente para navegar as árvores entrelaçadas do plano natal — tanto melhor para perseguir a presa até a morte inevitável.",
    "sections": [
      {
        "id": "artistic-exchange",
        "title": "Intercâmbio Artístico",
        "body": "Embora poucos o saibam, cervos pintados pintam as próprias marcas — tornando as aparições esporádicas na arte e nas tatuagens élficas, em particular nas culturas descendentes da nação perdida de Mierani em Varisia, ainda mais apropriadas. Muitas representações modernas, porém, retratam-nos erroneamente como protetores benevolentes da floresta. Só as culturas de tatuagem das Terras Sombrias os retratam de modo consistente como os predadores implacáveis que realmente são."
      }
    ]
  },
  "creature-pelegox-cube": {
    "description": "Pelegoxes são seres de energia magnética condensada que fabricam corpos para si usando o entorno. Embora a forma verdadeira de um pelegox seja um núcleo esférico, ele puxa fragmentos de metal de várias formas e tamanhos para formar uma casca poliédrica. Embora pelegoxes possam desenvolver preferências por uma forma particular quando em repouso, continuam a buscar configurações novas para chamar de próprias, mais felizes quando podem experimentar com possibilidades sem fim, mesmo que isso signifique desmantelar outras entidades metálicas.\n\nEssas criaturas de retalhos movem-se por uma combinação de levitação magnética e propulsão e, quando isso não funciona, perfurando continuamente o chão e deslocando o peso para frente, parecendo quase estrepes móveis. Com o tempo, a assinatura magnética de um pelegox torna-se visível, gravada no corpo em padrões de linhas concêntricas. Esses desenhos únicos tornam possível distinguir pelegoxes individuais mesmo quando a superfície se erodiu.\n\nPelegoxes são rápidos em formar relações com outros da espécie. Deleitam-se em combinar os corpos individuais em estruturas e padrões cada vez maiores e mais elaborados. Assim, é raro encontrar um pelegox sozinho — preferem viajar numa forma aglomerada.",
    "sections": [
      {
        "id": "refined-tastes",
        "title": "Gostos Refinados",
        "body": "Menos interessados em atribuições arbitrárias de valor monetário, pelegoxes preferem metais que exibam formas ou cores novas. São tão propensos a trocar uma esfera pura de prata da aurora por um pedaço irregular de cobre corroído quanto a guardar para sempre um entalhe inestimável de djezet. Porém, até pelegoxes atribuem grande valor ao oricalco, pois as propriedades restauradoras que dobram o tempo do metal-céu concedem a liberdade de moldar configurações novas sem ficar refém de um resultado insatisfatório."
      }
    ]
  },
  "creature-picture-in-clouds": {
    "description": "As formas mutáveis das nuvens no céu cativaram as imaginações de crianças mortais por séculos. Figuras nas nuvens representam essa possibilidade pura do ar, transformando-se em qualquer coisa que o Universo as imagine ser.",
    "sections": []
  },
  "creature-pine-pangolin": {
    "description": "Essas criaturas dormem penduradas de cabeça para baixo pelas caudas parcialmente enroladas e dependem das escamas de madeira grossas para protegê-las do perigo. Um desses perigos que as escamas anulam é o dano de queda de enrolar-se de propósito e cair na cabeça de um oponente desavisado, que é uma das estratégias de combate favoritas. Sob as escamas, os corpos dos pangolins de pinho secretam um alcatrão grosso e grudento que serve de linha secundária de defesa.",
    "sections": [
      {
        "id": "more-wooded-origins",
        "title": "Mais Origens Arborizadas",
        "body": "Pangolins de pinho crescem em agrupamentos de dois a cinco indivíduos em árvores gigantes, protegidos por uma camada aconchegante de alcatrão até que as escamas endureçam o bastante para a primeira queda. Snapdrakes são feitos à mão para a nobreza kizidhar, muitas vezes servindo de guardas leais. Ninguém sabe de onde vêm os cervos pintados, pois todos que tentaram investigar foram comidos."
      }
    ]
  },
  "creature-quickiron-plasm": {
    "description": "Parecendo muito uma gosma, um plasma de ferro-rápido é uma massa do metal-céu líquido vermelho-ferrugem conhecido como djezet, valorizado no Universo por suas propriedades de aprimorar magia. Plasmas de ferro-rápido alimentam-se das energias residuais deixadas por grandes dispêndios de poder mágico, que podem detectar a quilômetros de distância.",
    "sections": [
      {
        "id": "djezet-extraction",
        "title": "Extração de Djezet",
        "body": "Quando um plasma de ferro-rápido morre, a maior parte do djezet que compõe o corpo torna-se inerte e inútil. Porém, um alquimista hábil às vezes consegue extrair quantidades vestigiais do valioso metal-céu dos restos. Este é um processo de 10 minutos que exige o feito Criação Alquímica, um posto de proficiência de especialista ou melhor em Ofício, e um teste de Ofício CD 20 bem-sucedido. Uma tentativa bem-sucedida produz uma única _dose de djezet_ que permanece potente por 1 hora antes de decompor-se numa gosma de cheiro fétido. O item não tem valor se vendido devido à natureza temporária."
      }
    ]
  },
  "creature-rakkatak": {
    "description": "Órgãos pulsantes e tumores se contorcem frouxos dentro de um saco de pele, tudo formando o nódulo disforme que é o corpo de um rakkatak. Os olhos do predador varrem a área, reluzindo na fumaça como pontos brilhantes. Pernas insetoides retorcendo-se — variando em número de um rakkatak a outro — pendem do corpo bulboso. Esses membros agitam-se caoticamente enquanto um rakkatak luta, só acalmando-se quando é hora de comer ou descansar.\n\nA maioria dos rakkataks voa sozinha, abatendo refeições em golpes súbitos em picada, mas ocasionalmente formam um bando. Apesar de terem pouca faculdade para comunicar-se com outras criaturas, rakkataks têm um certo gênio voraz para caçar com parentes. Em geral, uma vez que um agarra a presa, os outros mergulham para prender-se também, ingerindo a refeição com bocas semelhantes a sanguessugas.\n\nRakkataks possuem apetites insaciáveis para ajudá-los a resistir aos longos períodos de fome entre as refeições infrequentes enquanto viajam as expansões do Plano do Fogo. Como resultado, facilmente superconsomem se levados a algum lugar com fauna mais abundante, como o Universo. Um único rakkatak pode conter uma quantidade surpreendente de vísceras, até crescendo de tamanho conforme o corpo se expande. Torna-se mais desajeitado quanto maior fica, o que biólogos planares acreditam ser uma tática de sobrevivência para impedir que um rakkatak se entregue à fome até literalmente estourar.",
    "sections": [
      {
        "id": "ashen-hunting-grounds",
        "title": "Terrenos de Caça Cinzentos",
        "body": "Evitando o caos flamejante e o domínio ifrit que tipificam boa parte do Plano do Fogo, rakkataks preferem ermos de cinza como terrenos de caça. Cavam tocas simples logo abaixo da superfície, chamadas colinas de rakkatak. Dentro, podem cochilar e digerir em paz ou pôr e cuidar dos ovos horrendos."
      }
    ]
  },
  "creature-rust-scarab": {
    "description": "Esses elementais lembram besouros enormes, com cascas externas grossas compostas de múltiplas camadas de placas enferrujadas e fortemente crivadas de buracos, protegendo um esqueleto metálico irregular.",
    "sections": [
      {
        "id": "ancient-remnants",
        "title": "Remanescentes Antigos",
        "body": "Nenhum espécime de escaravelho da ferrugem livre de deterioração foi documentado, levando a debate entre estudiosos sobre se esse estado de corrosão é a condição natural, ou se as criaturas são espetacularmente antigas até pelos padrões de seres elementais imortais."
      }
    ]
  },
  "creature-saltborn-stalkers": {
    "description": "As profundezas salobras do Mar Ilimitado às vezes distorcem grupos grandes de tritões em enxames com fileiras vis de dentes e garras afiadas conhecidos como perseguidores nascidos do sal. Perseguidores nascidos do sal caçam em grupos, usando os apêndices caídos semelhantes a tentáculos como iscas bioluminescentes, posando-os como fagulhas ou bolhas de energia planar para atrair presa desavisada a emboscadas espertas.",
    "sections": [
      {
        "id": "the-rite-of-salt-and-stone",
        "title": "O Rito do Sal e da Pedra",
        "body": "Quando um tritão se junta às fileiras dos nascidos do sal, passa por um rito secreto conhecido só por outros nascidos do sal e pelos dragões de salmoura de Kelizandrika. Os recrutas são encapsulados em túmulos de sal e gelo e deixados no leito do Mar Ilimitado para abrir caminho à força. Os que superam a prova nunca se livram de verdade do sal dos túmulos, que cobre o corpo de cada perseguidor nascido do sal."
      }
    ]
  },
  "creature-skymetal-striker": {
    "description": "Um golpeador de metal-céu lembra uma serpente — ou, mais precisamente, a serpente de duas cabeças conhecida como anfisbena — feita de um longo cordão de dezenas de lâminas de serra circular giratórias de dentes afiados. Essas lâminas se alinham ao longo do corpo da criatura como contas numa corda invisível de força magnética. Embora as lâminas que compõem a criatura em geral sejam compostas de muitos metais e ligas diferentes, ela é mais conhecida, temida e nomeada pelas lâminas de oricalco e inúbrix que formam as “cabeças” em cada extremidade do corpo serpentino.",
    "sections": [
      {
        "id": "strange-metals",
        "title": "Metais Estranhos",
        "body": "Inúbrix e oricalco são tipos de metal-céu — um termo coletivo usado no Universo para referir-se a metais extremamente raros, a maioria possuindo propriedades mágicas, encontrados em planetas distantes e estrelas caídas. Metal-céu pode ser encontrado em abundância no Plano do Metal, porém, e muitos elementais do metal contêm ao menos um pouco de um tipo ou outro. Inúbrix, coloquialmente chamado ferro-fantasma, é valorizado pela habilidade de atravessar outros metais em fase, enquanto as propriedades místicas do oricalco podem distorcer o próprio fluxo do tempo ao redor."
      }
    ]
  },
  "creature-snapdrake": {
    "description": "Magos e jardineiros kizidhar hábeis fazem essas criaturas encantadoras à mão tanto para o prazer estético de seus shuyookhs quanto para a proteção. Criar um snapdrake exige primeiro construir com esmero uma armação de madeira viva na forma de um dragão menor antes de entrelaçar milhares de flores coloridas de boca-de-leão em padrões intricados para formar o corpo e as escamas. Uma vez completo, snapdrakes muitas vezes servem kizidhars como uma combinação de guardas, animais de estimação e decorações enquanto forem bem alimentados.",
    "sections": []
  },
  "creature-solar-crow": {
    "description": "Esses elementais enormes de três pernas lembram corvos com penas flamejantes, ditos brilhar tão intensos quanto o sol. Aninham na fumegante Floresta dos Carvões de Amoreira, vivendo em bandos de oito a uma dúzia, sendo dez o mais comum.",
    "sections": [
      {
        "id": "story-of-infamy",
        "title": "História de Infâmia",
        "body": "Contos antigos da Tian Xia governada por dragões falam de um bando de corvos solares que devastou o Plano da Madeira, levando à extinção uma erva que podia conceder imortalidade antes de vir aterrorizar a própria Tian Xia. Todos os corvos menos um foram então abatidos por um arqueiro lendário."
      }
    ]
  },
  "creature-sootsoldiers": {
    "description": "Deidades e senhores da guerra poderosos lutam pela dominância sobre o Plano do Fogo e o restante da Esfera Interna a fim de provar a supremacia do fogo. Exércitos de soldados flamejantes vão à guerra uns contra os outros em campos de batalha de fumaça e carvão fumegante, todos incapazes de trazer o poder pleno a recair. Ymeri, a vis e vitoriosa Rainha do Inferno, comanda legiões de soldados de fuligem: elementais capazes de enfrentar os exércitos de seus inimigos e, mesmo quando destruídos, erguer-se das cinzas da Fornalha Eterna, chamuscados e triunfantes.",
    "sections": [
      {
        "id": "the-radiant-host",
        "title": "A Hoste Radiante",
        "body": "Soldados de fuligem que servem o outro Senhor do Fogo, o Rei Cintilante Atreia, são cobertos de brasas brilhantes em vez de carvão negro. No lugar dos efeitos normais da fumaça cinzenta, qualquer criatura na área deve tentar uma salvaguarda de Reflexos CD 29. Numa falha, por 1 minuto essa criatura fica ofuscada e sua invisibilidade é anulada."
      }
    ]
  },
  "creature-talos-gadgeteer": {
    "description": "Os descendentes de gênios chamados taloses descendem primariamente de gênios zuhra, elementais do metal e outros habitantes do Plano do Metal. Muitos taloses moldam o talento natural para o trabalho em metal em carreiras como funileiros, mineradores ou ferreiros, embora igualmente muitos aproveitem o lustre de metais preciosos numa busca por fama e fortuna.\n\nTaloses estão entre os mais metropolitanos dos descendentes de gênios, muitas vezes nascidos em ou atraídos a cidades de vários tamanhos, especialmente as com ofícios avançados de metalurgia ou tecnologia. Metal muitas vezes precisa ser trabalhado para encontrar forma e função, o que pode explicar por que muitos taloses parecem gostar de viver entre pessoas, se não necessariamente socializar com elas. Muitas vezes se veem tropeçando em empregos em algum ponto da linha de produção da tecnologia, seja minerando o minério bruto da terra, trabalhando-o em fios e engrenagens, ou construindo os próprios dispositivos. Alguns taloses ressentem-se e rejeitam as expectativas de que preencham tais papéis, mas muitos abraçam o fascínio pela tecnologia, muitas vezes seguindo para tornar-se inventores especialistas. Taloses são portanto bem mais propensos que outros descendentes de gênios a fazer uso de mecanismos de corda nas comunidades.\n\nApesar de há muito habitarem Golarion, embora em números pequenos, taloses só raramente foram reconhecidos como descendentes de gênios. O maior número deles, e também o maior número cuja natureza verdadeira é conhecida, habita Tian Xia. As tradições do metal como elemento viveram bem mais tempo ali. Taloses muitas vezes se veem atraídos a discussões e estudo do metal elemental no instante em que ouvem o conceito. Registros históricos falam de cortesãos e diplomatas renomados com pele de prata ou bronze impecável. No Porto de Marfim de Goka, os ferreiros da Forja de Ferro do Dragão, de propriedade familiar, forjam lâminas e armas de fogo com técnicas magnéticas transmitidas da ancestral xeica zuhra.\n\nUm funileiro talos é um funileiro de mecanismos de corda. Quando confrontado, a tática preferida é atrair oponentes a armadilhas usando as minas explosivas menores antes de tentar o combate direto.",
    "sections": [
      {
        "id": "traveling-tinkerers",
        "title": "Funileiros Viajantes",
        "body": "Embora não haja assentamentos permanentes conhecidos de talos no Universo, há uma comunidade nômade pequena conhecida como a Caravana dos Funileiros. Originalmente fundada em Vudra e inspirada por clãs semelhantes de janns e sulis, a caravana agora viaja pela maior parte do mundo oriental, oferecendo a todos os taloses que desejem viajar com ela um senso de comunidade e pertencimento que talvez não encontrem em nenhum outro lugar."
      }
    ]
  },
  "creature-tantriog": {
    "description": "Onde quer que culinária requintada seja consumida, canções incríveis sejam apresentadas ou ondas épicas se ergam, ali esperam tantriogs. Com as pinças dianteiras de um caranguejo, o casco de uma tartaruga e nadadeiras traseiras, tantriogs estão entre os elementais da água mais únicos. Sulcam o Mar Ilimitado buscando constantemente experiências novas, seja a próxima grande onda para surfar, uma iguaria saborosa para provar ou uma peça de arte para colecionar. Anseiam por sensações novas e muitas vezes as buscam à custa dos outros.\n\nSe alguém possui arte rara, saber perdido ou habilidades fantásticas de surfe ou culinária, um tantriog pode ser um companheiro maravilhoso. São encantadores e amistosos com quem acham interessante, mas o interesse pode ser altamente precário, abandonado no segundo em que alguém os entedia. Tantriogs até podem trair conhecidos se isso lhes der outra história interessante para contar. Isso torna fazer amizade com um uma proposição traiçoeira, pois nada pode ser dado como certo.\n\nÉ um mistério como tantriogs vieram a vestir as formas atuais. Alguns dizem que, nos primeiros dias dos planos elementais, tantriogs eram assassinos de gelo e névoa que cometeram um crime tão grande que estão sendo punidos por ele até hoje. Outros afirmam que tantriogs assumiram a forma após perder uma aposta cósmica bizarra. Uma das teorias mais populares sobre a forma atual do tantriog é que no passado conseguiam mudar de forma com a mesma facilidade com que a água se molda ao recipiente. No tédio sem fim, experimentavam uma variedade de formas quando uma maldição súbita (possivelmente lançada por faydhaans) fez com que perdessem a habilidade enquanto se transformavam de tartaruga em caranguejo, deixando-os presos entre os dois. Diz-se que quem puder ensinar a um tantriog como reaprender a habilidade de metamorfose poderia ganhar a amizade eterna do elemental. Seja qual for o caso, o jeito mais certo de irar um tantriog é perguntar sobre a aparência.\n\nPor outro lado, o jeito mais certo de fazer amizade com um tantriog é com elogios sobre a aparência ou as habilidades. Não seja demasiado bajulador, porém. Tantriogs não gostam de ser enganados ou feitos de tolos.",
    "sections": [
      {
        "id": "impressing-a-tantriog",
        "title": "Impressionar um Tantriog",
        "body": "Um tantriog adora ver uma vista nova ou uma exibição impressionante de habilidade. Quem quiser permanecer nas graças de um tantriog precisa manter as experiências novas fluindo. Por essa razão, muitos tantriogs formaram amizades improváveis com gnomos, cuja necessidade de buscar experiências novas oferece terreno comum."
      }
    ]
  },
  "creature-twins-of-rowan": {
    "description": "Gêmeos de sorveira estão entre os elementais mais poderosos do Plano da Madeira, feitos especialmente para patrulhar uma ampla gama de natureza selvagem e manter a ordem cuidadosamente construída do plano. Apesar de ter duas cabeças e dois torsos, cada gêmeos de sorveira é uma criatura singular; como todos os elementais da madeira, a verdadeira consciência não está nas cabeças, e sim nas raízes, e o verdadeiro corpo é o tronco da árvore, não os membros estendidos.",
    "sections": [
      {
        "id": "scions-of-life",
        "title": "Herdeiros da Vida",
        "body": "Árvores de sorveira têm uma longa associação com proteção; Shumunue por isso escolheu a sorveira como base para os poderosos gêmeos guardiões. As armas e as máscaras protetoras são cultivadas separadamente a partir de mudas mais jovens alimentadas com magia rica em minerais que torna a madeira tão forte e afiada quanto o aço."
      }
    ]
  },
  "creature-vault-builder": {
    "description": "Os guardiões do cofre perderam a faísca de Sairazul e têm esperanças de vida de dois a três milênios. Mantêm e protegem os muitos experimentos dos xiomorns.",
    "sections": []
  },
  "creature-vault-keeper": {
    "description": "Os guardiões do cofre perderam a faísca de Sairazul e têm esperanças de vida de dois a três milênios. Mantêm e protegem os muitos experimentos dos xiomorns.",
    "sections": []
  },
  "creature-vegetable-lamb": {
    "description": "Cordeiros vegetais estão ganhando popularidade como o primeiro elemental a ser invocado por conjuradores em treinamento, pois são dóceis até serem provocados e fáceis de controlar. Conjuradores devem ter cuidado, porém, para não deixá-los germinar no Universo; são uma espécie altamente invasiva que pode devorar uma floresta inteira em uma década.\n\nA comida curativa e nutritiva que cresce dos cordeiros vegetais é atraente tanto para aventureiros quanto para estudiosos mágicos sedentários. O sabor é semelhante ao das plantas do mesmo tipo que crescem em Golarion, mas não por completo. Muitos notaram que há uma semelhança leve com carne — um pouco de sabor umami que não se encontraria numa flor comum.",
    "sections": []
  },
  "creature-veiled-current": {
    "description": "Muitas vezes consideradas primas das phades, correntes veladas são véus frouxos de vento que capturam a presa dentro das dobras.",
    "sections": []
  },
  "creature-veldenar": {
    "description": "Alguns perigos à espreita no Céu Infinito podem condenar a presa antes mesmo que ela perceba; tais são as táticas de emboscada dos elementais de 6 m de altura conhecidos como veldenars. A invisibilidade inerente e as formas pálidas, quase translúcidas, os tornam entre as criaturas mais mortais a chamar o Plano do Ar de lar.\n\nVeldenars lembram anfíbios do Universo, embora com miríades de olhos vermelhos e uma afinidade pelo frio. Caçando nas bordas de tempestades eternas, nos horizontes de eventos de zonas mortas e nas margens de correntes celestes, veldenars predam os habitantes menores do plano natal. Muitas vezes podem ser encontrados usando a flutuabilidade natural para derivar entre os grandes blocos de gelo mágico que cruzaram para o Plano do Ar a partir da antiga fronteira com o Plano da Água. Ali, estendem as línguas para aprisionar insetos voadores desavisados ou aventureiros que por acaso flutuem por perto. Os múltiplos olhos vigiam a próxima refeição mesmo enquanto devoram a presa atual.\n\nO frio intenso do estômago de um veldenar incapacita rapidamente as vítimas, permitindo ao predador focar em voltar à invisibilidade e achar um local isolado para digerir. Vítimas que escapam do estômago do veldenar muitas vezes sentem-se geladas até os ossos por dias.\n\nVeldenars não são criteriosos sobre quem ou o que inalam. Como resultado, todo tipo de sucata pode acumular-se nos estômagos, especialmente material inorgânico. Quem caça veldenars muitas vezes espera até o elemental precisar regurgitar detritos, pois esta é uma das poucas vezes em que um veldenar pode ser pego numa posição comprometida, incapaz de capturar qualquer coisa devido ao esôfago entupido.",
    "sections": [
      {
        "id": "paired-predators",
        "title": "Predadores Emparelhados",
        "body": "Veldenars unem-se em parceria para a vida, que pode durar bem mais de um século. Utilizando as táticas de matilha de emboscada, um veldenar muitas vezes conduz presa potencial às garras do parceiro. Visitantes do Plano do Ar devem ter em mente que, se por acaso avistarem um veldenar, outro provavelmente está por perto."
      }
    ]
  },
  "creature-whipping-willow": {
    "description": "Essas figuras altas e finas são árvores demais para ser dríades, mas humanoides demais para ser arbóreos. Os rostos em branco e os troncos finos carregam só a mais leve sugestão de traços humanoides. Em vez de mãos, os braços longos semelhantes a galhos eventualmente se fendem em dígitos igualmente proporcionados semelhantes a galhos, que os salgueiros usam tanto para lutar quanto para balançar pelo plano natal.",
    "sections": []
  },
  "creature-wood-scamp": {
    "description": "Essas colônias de musgo coalescem ao longo de um século no fac-símile tosco de uma preguiça grande, até imitando a estrutura única da pelagem do animal que atrai fungos adicionais e insetos polinizadores. A menos que sejam invocadas ou atacadas, raramente deixam as árvores sobre as quais se formaram primeiro.",
    "sections": []
  },
  "creature-wood-wisp": {
    "description": "Como outras fagulhas, fagulhas da madeira percorrem o plano e afinam-se a outras fagulhas, vagando com elas em sinfonias. Devido à disposição de vincular-se, fagulhas da madeira aparecem fora do plano natal mais que outros elementais da madeira, embora ainda sejam relativamente raras em comparação com outras fagulhas.\n\nFagulhas da madeira lembram cocos seguidos de ninhos densos de galhos que cobrem e ocultam teias ainda mais profundas de videiras espinhosas. Infelizmente, não têm consciência da dor que esses espinhos podem causar a criaturas de carne e são muito afetuosas fisicamente em seu entusiasmo de oferecer assistência.",
    "sections": []
  },
  "creature-zuhra": {
    "description": "Zuhras, os gênios do Plano Elemental do Metal, são ousados e imponentes, afeitos a ser o centro das atenções e a atrair uma plateia com apresentações espalhafatosas, exibições de habilidade e contos de suas vitórias pessoais. Apesar das personalidades grandes, as relações de longo prazo tendem a ser frias e um tanto distantes; zuhras muitas vezes fazem alianças, mas raramente formam amizades, e a confiança exigida para relações mais profundas é ainda mais rara. Os poucos mortais que chegaram a conhecer um zuhra muitas vezes os descrevem como bombásticos, mas emocionalmente distantes.\n\nDesde a reconexão com outros planos, zuhras buscaram e formaram laços com outros gênios. Acham os primos jabali parceiros capazes de forja, se um tanto sisudos e tediosos. Zuhras raramente dedicam a elementais que não sejam gênios mais que um olhar de passagem, achando até os inteligentes pouco interessantes para comunicar-se ou difíceis de relacionar.",
    "sections": [
      {
        "id": "distant-thunder",
        "title": "Trovão Distante",
        "body": "Zuhras favorecem a música acima de todas as outras artes. Dado o longo isolamento, porém, as preferências são bem diferentes das de outros gênios ou da maioria dos músicos do Universo. Valorizam volume, intensidade e combinações discordantes de sons. Partes vocais principais incorporam zumbido e gritos, muitas vezes com um coro fornecendo um contraponto melódico."
      },
      {
        "id": "skimming-along",
        "title": "Deslizando",
        "body": "Zuhras alcançam o voo usando magnetismo para erguer os próprios corpos no ar. Como isso se torna mais difícil quanto mais alto sobem, o método de movimento preferido de muitos zuhras não é caminhar nem voar, e sim deslizar pelas superfícies lisas do plano natal do modo como mortais cruzam o gelo em patins, com só uma camada fina de eletromagnetismo entre eles e o chão."
      }
    ]
  },
  "creature-zuhra-shuyookh": {
    "description": "Os zuhras mais poderosos atraem seguidores e metal elemental com força de personalidade avassaladora e magnetismo literal. Quando chamados a conduzir rituais de desejo, usam o longo isolamento dos outros planos como desculpa para interpretar pedidos de modo extravagante, alegando diferenças linguísticas.",
    "sections": []
  },
  "creature-austral-the-south-wind": {
    "description": "A verdade da vida no Universo é que o clima controla o mundo. A água que dá vida e corre por Golarion, a manutenção das florestas saudáveis e as neves, degelos e chuvas que fazem as colheitas florescerem dependem todos do clima — clima moldado aos caprichos dos ventos. Anemoi são seres poderosos do Plano do Ar, incumbidos por deuses antigos de guardar os céus e pastorear os ventos de cada mundo pelos planos. Guiam os ventos por seus caminhos naturais e, embora não sejam malevolentes nem maliciosos, um anemos pouco se importa com o modo como uma tempestade possa afetar qualquer criatura pega em seu caminho.\n\nAnemoi podem assumir várias formas e transitar entre elas com a mesma facilidade com que escorregam entre as brisas. Vestem disfarces humanoides para caminhar entre mortais sem chamar atenção indevida, e se transformam em grandes cavalos trovejantes feitos de nuvens de tempestade e chuva quando precisam atravessar os céus com rapidez. Sua forma verdadeira, porém, é vento coalecido numa silhueta humanoide, muitas vezes com cabelos encaracolados e asas emplumadas feitas de nuvens suaves e à deriva.\n\nEm Golarion, cada um dos quatro ventos cardinais é criado e dirigido por um quarteto de anemoi cardinais. Os ventos frios do norte são guiados por Boreal, portador do inverno. Austral pastoreia ventos quentes do sul. Eural traz ventos tempestuosos do leste. Por fim, os ventos suaves da primavera vêm ao chamado de Zéfiro, do oeste. Esses quatro anemoi cardinais, ao lado de seus conselhos de anemoi menores, moldam e controlam os ventos por todo Golarion. Pelo que se sabe, os anemoi cardinais não respondem a uma autoridade maior. Há anemoi máximos ainda mais poderosos vivendo no Plano do Ar, mas parecem contentes em deixar o Universo fora de seus planos.\n\nEmbora os anemoi cardinais tentem manter certo afastamento dos assuntos mortais, anemoi menores ocasionalmente tomam interesse mais próximo. Alguns vigiam um único povoado ou condado, protegendo-o, nutrindo-o ou até destruindo-o com rancor. Cada um tem o próprio conjunto de interesses. Muitos são vaidosos ou mesquinhos. Ainda mais mudam de atitude com a mesma rapidez dos ventos que guiam. Agradar um anemoi não é questão de seguir uma fórmula fixa, e sim de mudar de rumo repetidamente para dar-lhes o que desejam para seus interesses volúveis do momento ou necessidades percebidas.",
    "sections": [
      {
        "id": "the-cardinal-anemoi",
        "title": "Os Anemoi Cardinais",
        "body": "Anemoi particularmente antigos e poderosos muitas vezes têm capacidades únicas. Além das habilidades padrão, os anemoi cardinais de Golarion possuem as seguintes magias inatas adicionais.\n\n **Austral**, o vento sul: **8º** _vortex de chamas_; **5º** _gêiser_ **Boreal**, o vento norte: **8º** _rajada gélida_; **5º** _nevasca uivante_ **Eural**, o vento leste: **8º** _relâmpago em cadeia_; **5º** _zona de pressão_ **Zéfiro**, o vento oeste: **8º** _campo de vida_; **4º** _tempestade de pétalas_, _falar com plantas_"
      },
      {
        "id": "the-shape-of-the-air",
        "title": "A Forma do Ar",
        "body": "Anemoi no Plano do Ar em geral não têm gênero, enquanto os que passam tempo no Universo às vezes experimentam ou desenvolvem preferências por um dos gêneros dos mortais que observam ou junto aos quais vivem."
      }
    ]
  },
  "creature-boreal-the-north-wind": {
    "description": "A verdade da vida no Universo é que o clima controla o mundo. A água que dá vida e corre por Golarion, a manutenção das florestas saudáveis e as neves, degelos e chuvas que fazem as colheitas florescerem dependem todos do clima — clima moldado aos caprichos dos ventos. Anemoi são seres poderosos do Plano do Ar, incumbidos por deuses antigos de guardar os céus e pastorear os ventos de cada mundo pelos planos. Guiam os ventos por seus caminhos naturais e, embora não sejam malevolentes nem maliciosos, um anemos pouco se importa com o modo como uma tempestade possa afetar qualquer criatura pega em seu caminho.\n\nAnemoi podem assumir várias formas e transitar entre elas com a mesma facilidade com que escorregam entre as brisas. Vestem disfarces humanoides para caminhar entre mortais sem chamar atenção indevida, e se transformam em grandes cavalos trovejantes feitos de nuvens de tempestade e chuva quando precisam atravessar os céus com rapidez. Sua forma verdadeira, porém, é vento coalecido numa silhueta humanoide, muitas vezes com cabelos encaracolados e asas emplumadas feitas de nuvens suaves e à deriva.\n\nEm Golarion, cada um dos quatro ventos cardinais é criado e dirigido por um quarteto de anemoi cardinais. Os ventos frios do norte são guiados por Boreal, portador do inverno. Austral pastoreia ventos quentes do sul. Eural traz ventos tempestuosos do leste. Por fim, os ventos suaves da primavera vêm ao chamado de Zéfiro, do oeste. Esses quatro anemoi cardinais, ao lado de seus conselhos de anemoi menores, moldam e controlam os ventos por todo Golarion. Pelo que se sabe, os anemoi cardinais não respondem a uma autoridade maior. Há anemoi máximos ainda mais poderosos vivendo no Plano do Ar, mas parecem contentes em deixar o Universo fora de seus planos.\n\nEmbora os anemoi cardinais tentem manter certo afastamento dos assuntos mortais, anemoi menores ocasionalmente tomam interesse mais próximo. Alguns vigiam um único povoado ou condado, protegendo-o, nutrindo-o ou até destruindo-o com rancor. Cada um tem o próprio conjunto de interesses. Muitos são vaidosos ou mesquinhos. Ainda mais mudam de atitude com a mesma rapidez dos ventos que guiam. Agradar um anemoi não é questão de seguir uma fórmula fixa, e sim de mudar de rumo repetidamente para dar-lhes o que desejam para seus interesses volúveis do momento ou necessidades percebidas.",
    "sections": [
      {
        "id": "the-cardinal-anemoi",
        "title": "Os Anemoi Cardinais",
        "body": "Anemoi particularmente antigos e poderosos muitas vezes têm capacidades únicas. Além das habilidades padrão, os anemoi cardinais de Golarion possuem as seguintes magias inatas adicionais.\n\n **Austral**, o vento sul: **8º** _vortex de chamas_; **5º** _gêiser_ **Boreal**, o vento norte: **8º** _rajada gélida_; **5º** _nevasca uivante_ **Eural**, o vento leste: **8º** _relâmpago em cadeia_; **5º** _zona de pressão_ **Zéfiro**, o vento oeste: **8º** _campo de vida_; **4º** _tempestade de pétalas_, _falar com plantas_"
      },
      {
        "id": "the-shape-of-the-air",
        "title": "A Forma do Ar",
        "body": "Anemoi no Plano do Ar em geral não têm gênero, enquanto os que passam tempo no Universo às vezes experimentam ou desenvolvem preferências por um dos gêneros dos mortais que observam ou junto aos quais vivem."
      }
    ]
  },
  "creature-eural-the-east-wind": {
    "description": "A verdade da vida no Universo é que o clima controla o mundo. A água que dá vida e corre por Golarion, a manutenção das florestas saudáveis e as neves, degelos e chuvas que fazem as colheitas florescerem dependem todos do clima — clima moldado aos caprichos dos ventos. Anemoi são seres poderosos do Plano do Ar, incumbidos por deuses antigos de guardar os céus e pastorear os ventos de cada mundo pelos planos. Guiam os ventos por seus caminhos naturais e, embora não sejam malevolentes nem maliciosos, um anemos pouco se importa com o modo como uma tempestade possa afetar qualquer criatura pega em seu caminho.\n\nAnemoi podem assumir várias formas e transitar entre elas com a mesma facilidade com que escorregam entre as brisas. Vestem disfarces humanoides para caminhar entre mortais sem chamar atenção indevida, e se transformam em grandes cavalos trovejantes feitos de nuvens de tempestade e chuva quando precisam atravessar os céus com rapidez. Sua forma verdadeira, porém, é vento coalecido numa silhueta humanoide, muitas vezes com cabelos encaracolados e asas emplumadas feitas de nuvens suaves e à deriva.\n\nEm Golarion, cada um dos quatro ventos cardinais é criado e dirigido por um quarteto de anemoi cardinais. Os ventos frios do norte são guiados por Boreal, portador do inverno. Austral pastoreia ventos quentes do sul. Eural traz ventos tempestuosos do leste. Por fim, os ventos suaves da primavera vêm ao chamado de Zéfiro, do oeste. Esses quatro anemoi cardinais, ao lado de seus conselhos de anemoi menores, moldam e controlam os ventos por todo Golarion. Pelo que se sabe, os anemoi cardinais não respondem a uma autoridade maior. Há anemoi máximos ainda mais poderosos vivendo no Plano do Ar, mas parecem contentes em deixar o Universo fora de seus planos.\n\nEmbora os anemoi cardinais tentem manter certo afastamento dos assuntos mortais, anemoi menores ocasionalmente tomam interesse mais próximo. Alguns vigiam um único povoado ou condado, protegendo-o, nutrindo-o ou até destruindo-o com rancor. Cada um tem o próprio conjunto de interesses. Muitos são vaidosos ou mesquinhos. Ainda mais mudam de atitude com a mesma rapidez dos ventos que guiam. Agradar um anemoi não é questão de seguir uma fórmula fixa, e sim de mudar de rumo repetidamente para dar-lhes o que desejam para seus interesses volúveis do momento ou necessidades percebidas.",
    "sections": [
      {
        "id": "the-cardinal-anemoi",
        "title": "Os Anemoi Cardinais",
        "body": "Anemoi particularmente antigos e poderosos muitas vezes têm capacidades únicas. Além das habilidades padrão, os anemoi cardinais de Golarion possuem as seguintes magias inatas adicionais.\n\n **Austral**, o vento sul: **8º** _vortex de chamas_; **5º** _gêiser_ **Boreal**, o vento norte: **8º** _rajada gélida_; **5º** _nevasca uivante_ **Eural**, o vento leste: **8º** _relâmpago em cadeia_; **5º** _zona de pressão_ **Zéfiro**, o vento oeste: **8º** _campo de vida_; **4º** _tempestade de pétalas_, _falar com plantas_"
      },
      {
        "id": "the-shape-of-the-air",
        "title": "A Forma do Ar",
        "body": "Anemoi no Plano do Ar em geral não têm gênero, enquanto os que passam tempo no Universo às vezes experimentam ou desenvolvem preferências por um dos gêneros dos mortais que observam ou junto aos quais vivem."
      }
    ]
  },
  "creature-zephyr-the-west-wind": {
    "description": "A verdade da vida no Universo é que o clima controla o mundo. A água que dá vida e corre por Golarion, a manutenção das florestas saudáveis e as neves, degelos e chuvas que fazem as colheitas florescerem dependem todos do clima — clima moldado aos caprichos dos ventos. Anemoi são seres poderosos do Plano do Ar, incumbidos por deuses antigos de guardar os céus e pastorear os ventos de cada mundo pelos planos. Guiam os ventos por seus caminhos naturais e, embora não sejam malevolentes nem maliciosos, um anemos pouco se importa com o modo como uma tempestade possa afetar qualquer criatura pega em seu caminho.\n\nAnemoi podem assumir várias formas e transitar entre elas com a mesma facilidade com que escorregam entre as brisas. Vestem disfarces humanoides para caminhar entre mortais sem chamar atenção indevida, e se transformam em grandes cavalos trovejantes feitos de nuvens de tempestade e chuva quando precisam atravessar os céus com rapidez. Sua forma verdadeira, porém, é vento coalecido numa silhueta humanoide, muitas vezes com cabelos encaracolados e asas emplumadas feitas de nuvens suaves e à deriva.\n\nEm Golarion, cada um dos quatro ventos cardinais é criado e dirigido por um quarteto de anemoi cardinais. Os ventos frios do norte são guiados por Boreal, portador do inverno. Austral pastoreia ventos quentes do sul. Eural traz ventos tempestuosos do leste. Por fim, os ventos suaves da primavera vêm ao chamado de Zéfiro, do oeste. Esses quatro anemoi cardinais, ao lado de seus conselhos de anemoi menores, moldam e controlam os ventos por todo Golarion. Pelo que se sabe, os anemoi cardinais não respondem a uma autoridade maior. Há anemoi máximos ainda mais poderosos vivendo no Plano do Ar, mas parecem contentes em deixar o Universo fora de seus planos.\n\nEmbora os anemoi cardinais tentem manter certo afastamento dos assuntos mortais, anemoi menores ocasionalmente tomam interesse mais próximo. Alguns vigiam um único povoado ou condado, protegendo-o, nutrindo-o ou até destruindo-o com rancor. Cada um tem o próprio conjunto de interesses. Muitos são vaidosos ou mesquinhos. Ainda mais mudam de atitude com a mesma rapidez dos ventos que guiam. Agradar um anemoi não é questão de seguir uma fórmula fixa, e sim de mudar de rumo repetidamente para dar-lhes o que desejam para seus interesses volúveis do momento ou necessidades percebidas.",
    "sections": [
      {
        "id": "the-cardinal-anemoi",
        "title": "Os Anemoi Cardinais",
        "body": "Anemoi particularmente antigos e poderosos muitas vezes têm capacidades únicas. Além das habilidades padrão, os anemoi cardinais de Golarion possuem as seguintes magias inatas adicionais.\n\n **Austral**, o vento sul: **8º** _vortex de chamas_; **5º** _gêiser_ **Boreal**, o vento norte: **8º** _rajada gélida_; **5º** _nevasca uivante_ **Eural**, o vento leste: **8º** _relâmpago em cadeia_; **5º** _zona de pressão_ **Zéfiro**, o vento oeste: **8º** _campo de vida_; **4º** _tempestade de pétalas_, _falar com plantas_"
      },
      {
        "id": "the-shape-of-the-air",
        "title": "A Forma do Ar",
        "body": "Anemoi no Plano do Ar em geral não têm gênero, enquanto os que passam tempo no Universo às vezes experimentam ou desenvolvem preferências por um dos gêneros dos mortais que observam ou junto aos quais vivem."
      }
    ]
  },
  "creature-sootsoldiers-the-radiant-host": {
    "description": "Deidades e senhores da guerra poderosos lutam pela dominância sobre o Plano do Fogo e o restante da Esfera Interna a fim de provar a supremacia do fogo. Exércitos de soldados flamejantes vão à guerra uns contra os outros em campos de batalha de fumaça e carvão fumegante, todos incapazes de trazer o poder pleno a recair. Ymeri, a vis e vitoriosa Rainha do Inferno, comanda legiões de soldados de fuligem: elementais capazes de enfrentar os exércitos de seus inimigos e, mesmo quando destruídos, erguer-se das cinzas da Fornalha Eterna, chamuscados e triunfantes.",
    "sections": [
      {
        "id": "the-radiant-host",
        "title": "A Hoste Radiante",
        "body": "Soldados de fuligem que servem o outro Senhor do Fogo, o Rei Cintilante Atreia, são cobertos de brasas brilhantes em vez de carvão negro. No lugar dos efeitos normais da fumaça cinzenta, qualquer criatura na área deve tentar uma salvaguarda de Reflexos CD 29. Numa falha, por 1 minuto essa criatura fica ofuscada e sua invisibilidade é anulada."
      }
    ]
  }
}
