import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) de Prey for Death, Claws of the Tyrant, Hellfire Dispatches, Troubles in Grayce e Dawn of the Frogs. */
export const CREATURE_LORE_STANDALONE_FIVE: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-alktherisa-and-omprisgor": {
    "description": "A casta governante dos proteanos, keketars orquestram ataques contra os bastiões da lei e julgam disputas proteanas com confiança e capricho. Um keketar lembra uma criatura serpentiforme cintilante com espinhos, garras e uma cabeça de dragão. A aparência real está em fluxo constante, mas em geral ficam com cerca de 5,5 m de comprimento e uns 680 kg. Embora as formas físicas variem, duas coisas permanecem constantes: primeiro, os olhos de um keketar são sempre um tom penetrante de âmbar ou violeta. Segundo, a marca de ofício — uma coroa de símbolos mutáveis que flutua sobre a cabeça — nunca muda. Um keketar não pode remover a coroa, mas pode suprimi-la, embora a maioria relute e considere tal ato covardia ou vergonha.\n\nKeketars preenchem um papel na sociedade proteana semelhante a um sacerdócio, operando como intermediários entre os outros proteanos e os Falantes das Profundezas. Todos os outros proteanos deferem aos keketars, tratando-os de um jeito semelhante a como cidadãos de uma cidade mortal tratariam nobres respeitados; até proteanos mais poderosos deferem à vontade dos keketars. Como em muitas religiões, dogma e teologia estão sujeitos a interpretação e mudança, e entre os proteanos a situação é ainda mais pronunciada. Seja qual for a natureza e os desejos dos Falantes das Profundezas, keketars individuais muitas vezes chegam a conclusões dramaticamente diferentes quanto à vontade e à intenção. Para os proteanos, porém, essa dissonância inerente é uma força, não uma fraqueza.",
    "sections": []
  },
  "creature-automatic-butler": {
    "description": "Um mordomo automático é um construto mágico em forma de manequim humanoide de madeira, em geral vestido com um terno preto simples e gravata. Tem só o mais vago vislumbre de um rosto na cabeça redonda, embora a mandíbula se abra numa dobradiça para simular os movimentos habituais da boca quando fala. A voz costuma ser calma e medida, e fala com bastante educação. Segue as ordens dadas pelo criador (ou por qualquer um a quem o criador tenha dado permissão para emitir comandos), o que em geral envolve buscar itens, manter um aposento em ordem ou conduzir visitas para fora. Se visitas indesejadas se tornam beligerantes, um mordomo automático pode defender-se golpeando intrusos ou usando a magia inata para arremessar objetos com força mortal. Uma vez encerrada a luta, um mordomo automático em geral passa a hora seguinte ou mais limpando a bagunça deixada para trás.\n\nMordomos automáticos são construídos segundo desenhos semelhantes aos das bonecas vinculadas à alma. Como outros construtos vinculados à alma, um mordomo automático é animado por um fragmento da alma de um mortal falecido. Esse fragmento pode vir de um doador disposto ou de uma vítima relutante, que pode resistir ao processo com uma salvaguarda de Vontade bem-sucedida contra a CD de Ofício do criador. Embora resistir arruíne o construto, o processo de extração da alma muitas vezes é fatal, e a pessoa morre de qualquer forma. Diferente de outros construtos vinculados à alma, a personalidade da alma usada para criar um mordomo automático é por completo suprimida. Em vez disso, o mordomo automático comporta-se como um servo estereotipado.\n\nAlguns mordomos automáticos são criados com conjuntos de perícias um pouco diferentes. Podem ser feitos para falar mais idiomas além do de seu criador, tornando-os diplomatas familiares passáveis que talvez recebam visitas estrangeiras. Alguns são treinados para cuidar de tarefas que exigem especialização, como tutorar a juventude da casa ou alfaiatar as roupas da família. A barra lateral cobre algumas outras opções para uma equipe doméstica inteira de servos construtos.",
    "sections": [
      {
        "id": "automatic-cooks-and-gardeners",
        "title": "Cozinheiros e Jardineiros Automáticos",
        "body": "Se os desenhos para criar mordomos automáticos alcançarem o mundo mais amplo, alguém provavelmente acabaria criando variações do construto mágico. Essas criaturas usariam as mesmas estatísticas básicas de um mordomo automático, com algumas mudanças menores. Um cozinheiro automático poderia ter _purificar culinária_ como magia inata, um Golpe de faca e a habilidade de disparar um jato de água fervente. Um jardineiro automático poderia ter _espalhar cascalho_ e outras magias com os traços terra ou planta como magias inatas, um Golpe de enxada ou pá, e a habilidade de atingir os inimigos à distância com sementes."
      }
    ]
  },
  "creature-bloodfog": {
    "description": "Uma névoa de sangue é uma criatura imensa composta de névoa carmesim faminta. Rostos vagamente humanoides, muitas vezes pouco mais que caveiras escancaradas, formam-se e dissolvem-se sem parar nos corpos vaporosos. Bem mais sólidas são as gavinhas rubi que serpenteiam para fora da massa e causam feridas cortantes profundas.\n\nNévoas de sangue preferem caçar perto de áreas povoadas ou sítios de violência maciça, derivando para se alimentar e depois derivando para fora de novo. Rolam por vilas vibrantes, deixando para trás só silêncio e cadáveres ressecados. Acredita-se que névoas de sangue sejam criadas no lugar onde mais frequentemente são encontradas: os campos de matança, onde exércitos causam derramamento de sangue e morte em massa.",
    "sections": [
      {
        "id": "blood-of-the-empty-death",
        "title": "Sangue da Morte Vazia",
        "body": "Acredita-se que as névoas de sangue tenham surgido pela influência da deusa sinistra conhecida como Nhimbaloth. Voidbracken, o nome do mundo natal há muito morto de Nhimbaloth, diz-se conter ilhas inteiras, até subcontinentes, envoltos em névoas de sangue imensas. Alguns afirmam que as névoas menores encontradas em outros lugares são meros \"tentáculos de alimentação\", estendidos por portais de mão única em Voidbracken até outros planos de existência."
      }
    ]
  },
  "creature-bloody-hands": {
    "description": "Mãos Sangrentas não era agente de Gorum quando pela primeira vez se ergueu dos pântanos poluídos de um charco remoto nas Fendas Exteriores. Pelos primeiros milênios de vida, lutou pelo próprio domínio na gosma espalhada, por fim assegurando um reino do tamanho de um continente pequeno onde seu governo era inquestionável — ao menos até ser invadido por um hospedeiro de einherjar de Gorum. Mãos Sangrentas ficou pasmo com a destreza de batalha dos aesir, e gloriou-se na queda de seu império a ponto de, ao fim da invasão, estar lutando com orgulho ao lado deles, destruindo sem piedade hordas de demônios que tão recentemente o haviam servido por medo. Os einherjar admiravam sua sede de batalha, mas não sabiam bem o que fazer do demônio semelhante a um sapo, sobretudo quando ele os seguiu de volta através do Maelstrom até a Costa do Embate. Depois de vários séculos de briga ao longo das fronteiras daquele reino, cada vez menos interessado em sadismo e mais enfeitiçado pelas táticas de batalha, Mãos Sangrentas recebeu permissão de Gorum para tornar-se um de seus servidores.\n\nMãos Sangrentas aparece como um demônio vagamente humanoide semelhante a um sapo cuja postura evoca a de um gorila pesado. A pele verde viscosa passa a um vermelho sangrento ao longo dos braços, de modo que as garras parecem reluzir sem parar com sangue fresco. Tem quatro olhos miúdos e uma boca larga repleta de dentes afiados.",
    "sections": [
      {
        "id": "ex-demons",
        "title": "Ex-Demônios",
        "body": "Demônios são conhecidos pela crueldade e pelo abraço desenfreado do caos e da destruição, mas de vez em quando um demônio individual encontra algo que o afasta da própria natureza. Foi o caso de Mãos Sangrentas, que descobriu, por meio de Gorum, que a guerra em sua forma mais pura pouco interessava às preocupações dos demônios."
      }
    ]
  },
  "creature-boggard-guard": {
    "description": "Boggards são humanoides anfíbios agressivos que prosperam em pântanos, charcos e até em algumas florestas tropicais. Saem do ovo como girinos e competem ferozmente por comida — inclusive comendo os irmãos nessa briga. Em 3 anos, os sobreviventes desenvolvem braços, pernas e pulmões enquanto aprendem o rudimento da caça, dos ofícios e da guerra — tudo que precisam para sobreviver numa sociedade em que a força faz o direito. No topo da maioria das hierarquias boggard reina um vidente-do-pântano corpulento, imbuído de magia divina sinistra.",
    "sections": []
  },
  "creature-brastlewark-sapper-squad": {
    "description": "Descobertas feitas em Brastlewark desempenharam um papel tão substancial na construção da Muralha Aspodeana quanto nas batalhas que agora grassam à sua sombra, enquanto equipes de sapeadores gnômicos treinados na criação e no emprego de explosivos poderosos desenvolvidos por alquimistas aproveitam a oportunidade de pôr os estudos em uso prático.",
    "sections": []
  },
  "creature-chained-norn": {
    "description": "Antigas além da imaginação, norns são fey poderosas que seguram nas mãos a manifestação física do destino na forma de fio dourado. Velam toda a vida, intervindo com relutância quando chamadas — ou com vingança quando os fios do destino são torcidos e abusados por seres menores. Cortam figuras imponentes: cerca de 4,3 m de altura e 360 kg.\n\nA relação das norns com os Primogênitos do Primeiro Mundo é complexa. Muitas servem Magdh a Tríade, a Primogênita tríplice que algumas norns acreditam ser o primeiro triunvirato norn unido numa entidade só, pois Magdh tem três corpos: Donzela, Mãe e Matriarca. Magdh afirma vigiar os fios do destino em busca de algum cataclismo profetizado ominoso e, além de auxiliar nas adivinhações, espera que as norns que a servem sigam comandos crípticos para empurrar o futuro para longe da beira. Porém, norns são seres poderosos por direito próprio, capazes de conceder poder divino, e muitas recusam servir a semideusa enigmática. Essas norns acham os outros Primogênitos ainda mais alienígenas e desafiadores de lidar, pois acreditam que, embora os Primogênitos empunhem grande poder, nem mesmo esses seres poderosos deveriam ter licença para intrometer-se no destino tanto quanto desejam.\n\nEmbora até o mais fraco dos Primogênitos pudesse destruir com facilidade uma norn não afiliada, tendem a obedecer às proclamações e aos julgamentos das norns quando são pronunciados. Essas norns, por sua vez, usam a neutralidade percebida com parcimônia. Sabem melhor do que emitir exigências demais aos Primogênitos, para que os semideuses caprichosos não se frustrem. E assim o equilíbrio de poder permanece tênue entre norns não afiliadas e os Primogênitos, como tem sido por éons. Norns sabem que é só questão de tempo até os Primogênitos perderem o respeito por essa tradição e começarem a agir inteiramente como lhes apraz, apesar dos melhores esforços das norns para conter as ações mais disruptivas.\n\n**Seguidores do Destino**\n\nNo Universo mortal, alguns mortais adoram norns como deidades; outros, sobretudo bruxas e bardos, as admiram como patronas ou musas. Quem as eleva a deidades é conhecido como Seguidores do Destino. Norns nem desencorajam essa veneração nem se esforçam para apoiá-la. Clérigos que veneram norns podem adorar uma norn específica, um triunvirato, ou todas as norns como um todo, mas ganham os mesmos benefícios independentemente da escolha. O símbolo religioso dos Seguidores do Destino é um par de tesouras cortando um fio dourado, e suas áreas de preocupação são destino, fado e o processo de envelhecer.",
    "sections": []
  },
  "creature-chernasardo-ranger": {
    "description": "",
    "sections": []
  },
  "creature-corpselight": {
    "description": "Um fogo-fátuo que morre de fome pode erguer-se como uma esfera fria, azul e brilhante de umidade esponjosa — uma luz de cadáver. Uma luz de cadáver busca por instinto um cadáver hospedeiro para habitar, pois sua forma física deteriora-se depressa se não estiver escondida dentro de uma criatura morta.",
    "sections": []
  },
  "creature-commander-arsiella-dei": {
    "description": "Arsiella Dei nasceu para ser uma Patrulheira de Chernasardo. A filha mais nova do caçador-transformado-líder-militar Irgal Nirmath, assassinado em 4655 CA depois que os grupos desorganizados de patrulheiros que ele reuniu sob uma bandeira comum conquistaram a independência de Molthune, Arsiella cresceu ouvindo histórias das façanhas do pai numa nação nomeada em sua honra.\n\nSe tivesse sido criada em outro tempo ou lugar, Arsiella talvez tivesse sido artista, mas em vez disso começou o treinamento sob os membros do antigo exército do pai, o Machado de Irgal, desde que pôde andar. Salvo o retrato ocasional rabiscado nas margens do caderno, por toda a infância Arsiella permaneceu singularmente focada em continuar o trabalho do pai de manter Nirmathas uma nação livre. Com os tutores, aprendeu não só a empunhar machado e arco, mas também as artes do sigilo, do subterfúgio e da sabotagem. Arsiella era, por todos os relatos, considerada uma aluna excelente, não menos astuta, esperta ou perspicaz do que o próprio Irgal Nirmath.\n\nEmbora os companheiros do pai a ensinassem desde cedo, também a mimavam, muitas vezes sendo mais brandos com ela do que seriam com outro parceiro de treino. Como resultado, na adolescência Arsiella acreditava ser quase invencível. Corria riscos desproporcionais nas patrulhas, às vezes pondo em perigo não só a própria vida, mas a dos companheiros. Nesse aspecto, Arsiella diferia do pai, que sempre temperava a disposição de arriscar a própria vida com preocupação pela segurança dos que estavam sob seu comando. Arsiella sabia que, se quisesse tornar-se líder de seu povo, precisaria de sabedoria além de habilidade, mas só quando quase morreu nas mãos de uma linha avançada molthuni percebeu a importância de deixar o entorno familiar do Fangwood Meridional para ganhar experiência no estrangeiro.\n\nArsiella mudou-se para Lastwall, onde buscou tutoria sob os Cavaleiros de Ozem, uma ordem militar dedicada à deusa Iomedae. Em Vigil, então capital de Lastwall, tornou-se seguidora devota da Herdeira, admirando tanto a força da deusa quanto o senso de justiça. Nesse período, Arsiella adotou o sobrenome Dei, uma apelação destinada não só a honrar a nova deusa, mas a minimizar o tratamento especial que poderia receber como filha de um herói de guerra famoso como Irgal Nirmath.\n\nEm Lastwall, Arsiella também aprofundou a crença de longa data na importância de dominar estilos de combate diferentes. Os mestres entre os Cavaleiros de Ozem ensinaram-na a lutar contra mortos-vivos, claro, mas também a ajudaram a desenvolver a disciplina e o regime militar que tanto lhe faltaram na juventude. Em troca, Arsiella tornou-se mestra por direito próprio, instruindo cavaleiros mais jovens e inexperientes (muitos dos quais viriam a tornar-se Reivindicadores Carmesim) no valor do sigilo, da sobrevivência e da guerra de guerrilha. Até hoje, Arsiella luta usando técnicas tomadas dos Patrulheiros de Chernasardo e dos Cavaleiros de Ozem, uma combinação que a torna única entre os membros de ambas as organizações.\n\nArsiella não estava em Vigil quando a cidade foi destruída em 4719 CA, mas esteve entre as primeiras forças a retornar para fazer o balanço do dano ocorrido. Só quando ficou claro que Tar-Baphon havia escapado da prisão e que suas forças mortas-vivas estavam em processo de sobrecarregar Lastwall ela recuou, junto com os Cavaleiros de Ozem, para a cidade portuária de Vellumis. Conforme Lastwall morria e as Terras de Cascalho se erguiam para tomar o lugar, Arsiella foi vital ao restabelecimento dos Cavaleiros de Ozem, embora tenha recusado tornar-se ela mesma uma Cavaleira de Lastwall. Desse modo, os anos de treinamento de Arsiella chegaram a frutificar — embora lhe doesse deixar os camaradas de armas para trás, acreditava que seus talentos seriam melhor empregados reunindo forças estrangeiras para a batalha maior contra o Tirano Sussurrante que certamente viria.\n\nQuando voltou ao Fangwood Meridional, Arsiella tornara-se ao mesmo tempo uma guerreira endurecida pela batalha e uma estrategista formidável, e subiu depressa nas fileiras até tornar-se uma das poucas guardiãs de Chernasardo. Embora os patrulheiros continuassem a ser uma confederação frouxa de lutadores pela liberdade, Arsiella possuía uma habilidade extraordinária de coordenar operações usando uma combinação de charme, intimidação e organização meticulosa. Essa habilidade, junto com o tempo servindo com os Cavaleiros de Ozem e a devoção a Iomedae, rendeu a Arsiella o papel de comandante do Forte Ozem. Quando chegou a hora de achar um lugar de descanso para o Cálice de Ozem, o Forte Ozem foi a escolha óbvia, e Arsiella assumiu de bom grado o papel de protetora-chefe do artefato. Arsiella não é de se impressionar demais com títulos, mas vê a nomeação como um jeito de continuar o legado do pai, e usou um pouco de sua influência para lhe conceder um lugar de honra nas catacumbas sob o forte. Considera as visitas regulares ao túmulo de Irgal tanto uma honra ao pai quanto uma fonte de força que a ajuda a cumprir os deveres atuais.\n\n**Papel na campanha**\n\nArsiella Dei supervisiona o Forte Ozem enquanto os PCs infiltram o posto avançado em busca do Cálice de Ozem. De todos os defensores do forte, só Arsiella está ciente da presença do Cálice nas catacumbas. Arsiella leva o sigilo da presença do artefato no forte com a máxima seriedade. Há muito acredita que o assassinato do pai só foi possível porque alguém revelou inadvertidamente a localização dele, e jurou não deixar o conhecimento do verdadeiro propósito do forte cair em mãos malignas.\n\nNo tempo como comandante do forte, Arsiella aumentou o uso de armadilhas na seção avançada de \"espada\" do Forte Ozem. Também fez acordos com fey locais e outras criaturas para acrescentar um nível adicional de segurança por todo o forte, confiando a essas criaturas rechaçar intrusos caso os defensores humanoides falhem ou se mostrem indignos de confiança. Vê-se, porém, como a última linha de defesa do Cálice de Ozem. Se apresentada a chances imbatíveis, Arsiella abandona o forte com o Cálice. Antes disso, quem entrar no Forte Ozem sem sua permissão provavelmente enfrentará uma saraivada de flechas de seu arco ou o lado afiado de seu machado.",
    "sections": []
  },
  "creature-devastation-cavalry-brigade": {
    "description": "Apesar da influência da Cavaleira do Apocalipse da Guerra, os exércitos molthuni que avançam sobre Nirmathas permanecem unidades eficientes e disciplinadas, agindo taticamente e com propósito. O mesmo não se pode dizer das cavalarias da devastação de Szuriel, turbas caóticas de guerreiros de olhar desvairado montados em corcéis vermelho-sangue infundidos com a essência daemônica de Abaddon.",
    "sections": []
  },
  "creature-divine-warden-of-arazni": {
    "description": "",
    "sections": []
  },
  "creature-divine-warden-of-iomedae": {
    "description": "",
    "sections": []
  },
  "creature-dronuk": {
    "description": "",
    "sections": []
  },
  "creature-durtik": {
    "description": "Diferente de outros gremlins que se contentam em causar desconforto ou dor a uns poucos indivíduos, durtiks pensam grande. Gostam de planos excessivos e dispositivos complicados que muitas vezes causam caos. Durtiks vivem nos arredores de sociedades que possuem grande perícia de engenharia, colhendo conhecimento técnico e especialização. Usam essas perícias reunidas para construir armadilhas mortais elaboradas. Um durtik passará anos feliz construindo um dispositivo que vai lascando uma montanha até causar uma avalanche que destrói uma cidade.\n\nPor sorte das civilizações perto das quais espreitam, os planos de durtik quase nunca chegam a frutificar; os fey abominam simplicidade e franqueza, insistindo em complexidade e grandiosidade, o que torna os planos fáceis de interromper. Muitas vezes, esses planos ignoram um detalhe crucial ou evitam alguma verdade básica que os faz implodir no meio do caminho sem que ninguém na cidade próxima sequer saiba que havia um plano.\n\nEssa propensão à autossabotagem, porém, não torna os durtiks menos perigosos. O desejo de destruição grandiosa os torna singularmente inspiradores entre outros gremlins. É comum achar um durtik cercado de outros gremlins inspirados por sua visão, mesmo que esses seguidores não a compreendam por completo. Os gremlins ficam até perder o interesse ou os planos implodirem. Até lá, um durtik e sua equipe concentram o caos e espalham bastante infortúnio enquanto executam o esquema fadado ao fracasso.",
    "sections": [
      {
        "id": "smarter-than-you",
        "title": "Mais Esperto que Você",
        "body": "Como durtiks muitas vezes são mais espertos que outros gremlins ao redor, pensam ser a pessoa mais esperta da sala aonde quer que vão. Aventureiros astutos cientes disso podem bajulá-los com elogios grandiosos, distraindo o durtik e tornando mais provável que compartilhe informação sem querer."
      }
    ]
  },
  "creature-einherji-host": {
    "description": "Einherjar foram guerreiros poderosos em vida, selecionados pelas valquírias para continuar lutando após a morte. Suas almas são forjadas dos maiores heróis do Universo nos soldados rasos dos deuses. Embora muitos einherjar escolham lutar sozinhos, funcionando como um exército de um só, há alguns que aprendem táticas de grupo e usam as perícias combinadas endurecidas pela batalha para derrotar juntos os inimigos de seu deus. Esses hospedeiros de einherjar raramente deixam os campos de batalha dos domínios de seus comandantes divinos, onde batalham com avidez contra qualquer um que julguem digno de combate.",
    "sections": [
      {
        "id": "gorum-s-einherjar",
        "title": "Einherjar de Gorum",
        "body": "Os einherjar que servem Gorum acreditam que uma batalha grandiosa grassará por toda a existência nos últimos dias antes de a realidade chegar ao fim, e que os que sobreviverem serão elevados quando a próxima versão da realidade nascer. Enfrentam-se em batalhas simuladas sem fim para afiar as perícias e aprontar as lâminas. Cada um que cai nessas batalhas renasce de novo na Costa do Embate, pronto para continuar lutando."
      }
    ]
  },
  "creature-engerra": {
    "description": "Nascidas daqueles que sacrificaram a vida por algo maior do que si mesmos, engerras lembram enxames de vaga-lumes brilhantes e às vezes são tomadas por fogos-fátuos ou simples truques de luz. São encontradas com mais frequência nos túmulos de heróis lendários, mas podem permanecer em qualquer lugar onde tal herói tenha dado o último suspiro.\n\nEngerras acreditam que contos de sacrifício digno guardam grande poder. Reúnem as memórias daqueles que morreram a serviço de uma causa nobre e então compartilham essas memórias com mortais que possam ser inspirados ou reconfortados por elas. O brilho característico de uma engerra é um sinal de pesar e de esperança ao mesmo tempo, pois associa simultaneamente a morte de um grande herói à determinação de honrar o legado desse herói.",
    "sections": [
      {
        "id": "graveyard-guardians",
        "title": "Guardiões de Cemitério",
        "body": "Engerras são protetoras daqueles cujas memórias reúnem, usando as histórias como arma contra quem perturbaria o lugar de descanso final de seu encargo. Embora sejam encontradas com mais frequência guardando túmulos, cemitérios e outros lugares de sepultamento, algumas engerras preferem permanecer perto dos sítios reais de morte de seus encargos e assim podem ser encontradas num campo de batalha antigo, numa fortaleza abandonada, ou em qualquer lugar onde um grande herói tenha caído. Conforme o ponto de vista, engerras individuais podem honrar heróis cujas vidas não foram decididamente honradas, sobretudo se seus encargos se arrependeram das ações vilanescas só momentos antes de morrer."
      }
    ]
  },
  "creature-fangwood-sentinel-corps": {
    "description": "Esses grupos díspares de insurgentes buscam defender Nirmathas da conquista lançando uma ofensiva de guerrilha das profundezas de Fangwood contra os exércitos que marcham através da fronteira.",
    "sections": []
  },
  "creature-frost-roc": {
    "description": "Histórias de rocs imensos mergulhando para carregar o gado ou varrendo exércitos até a ruína ensanguentada são populares em tavernas, mas o que muitos não percebem é que há rocs mágicos ainda mais perigosos habitando os recantos remotos do mundo. Essas aves superdimensionadas têm habilidades sobrenaturais ligadas à região que favorecem, mas compartilham uma coisa com o roc comum — o tamanho vasto.\n\nRocs gélidos são predadores semelhantes a corujas adaptados à vida em regiões árticas. Aninham entre os picos escarpados de montanhas cobertas de neve ou em fendas de geleiras espalhadas, tratando as taigas e tundras como seus campos de caça vastos. Rocs gélidos são noturnos e tendem a caçar todas as noites por algumas semanas de cada vez, quando a lua cresce rumo à cheia ou começa a minguar. Entram em períodos curtos de hibernação nas semanas de cada lado de uma lua nova, ou durante períodos prolongados de cobertura de nuvens, como durante uma tempestade. Abandonam esses hábitos quando são treinados para trabalhar como montarias ou guardiões — algo que gigantes ou a igreja de Gorum muitas vezes fazem nos recantos remotos das Terras dos Reis Linnorm ou do Reino dos Senhores dos Mamutes.",
    "sections": [
      {
        "id": "other-bestial-rocs",
        "title": "Outros Rocs Bestiais",
        "body": "Variedades adicionais de roc evoluíram para adaptar-se a ambientes remotos e hostis e, como o roc gélido, muitas vezes possuem alguma forma de magia elemental. Os rocs do vento semelhantes a albatrozes do oeste de Azlant aninham entre os penhascos escarpados de ilhas estilhaçadas, comandando ventos poderosos com as asas. Em arquipélagos remotos de Arcadia, rocs de pântano rosa-brilhante de pernas longas caminham por zonas úmidas e usam magia aquosa para auxiliar as caçadas. Outros sem dúvida existem em recantos ainda mais remotos do mundo."
      }
    ]
  },
  "creature-frostripper": {
    "description": "Tão mortais em terra quanto na água, kokogiaks estão entre os predadores mais temidos da tundra. De longe podem ser tomados por um urso polar assustadoramente grande, mas quem for infeliz o bastante para ver um de perto notará as seis pernas adicionais da criatura e o pescoço perturbadoramente alongado antes de encontrar um fim prematuro. Essas monstruosidades ursinas perseguem a presa sem descanso pelo gelo e pela neve; também são nadadoras poderosas, espreitando sob o gelo para irromper e emboscar criaturas desavisadas na superfície ou mergulhando em busca de uma refeição marinha.\n\nComo se inúmeras garras e uma mordida brutal já não fossem preocupantes o bastante, essas criaturas de pesadelo podem ser perversamente enganosas, atraindo a presa para fora em tempestades de inverno. O kokogiak astuto imita os sons de uma criatura em apuros, enganando o alvo a abandonar a segurança do abrigo e embarcar numa tentativa de resgate fadada ao fracasso. Quem vive em reinos árticos aprendeu a responder com cautela ao ouvir gritos por ajuda numa longa noite de inverno.",
    "sections": []
  },
  "creature-garrholdion": {
    "description": "A crença é uma força poderosa. Quando indivíduos de vontade forte se reúnem sob uma bandeira comum, a convicção unificada pode ganhar vida própria. O resultado é um garrholdion, um construto espiritual que defende o lugar de encontro da facção que o criou.\n\nUm garrholdion em geral aparece como uma versão cintilante e idealizada de um membro típico da facção, embora possa em vez disso alternar a aparência entre a de indivíduos específicos, nunca se fixando em só uma. Qualquer que seja a forma que tome, um garrholdion é sempre marcado pelo símbolo de sua facção. Um garrholdion dos Firebrands, por exemplo, ostenta o símbolo de espadas cruzadas dessa facção, enquanto um garrholdion da Sociedade Pathfinder é marcado com o Glifo da Estrada Aberta.",
    "sections": [
      {
        "id": "faction-bound",
        "title": "Vinculado à Facção",
        "body": "Embora em geral vinculado a uma facção estabelecida, qualquer grupo de indivíduos pode manifestar um garrholdion, desde que todos os membros compartilhem o mesmo propósito. A destruição de uma facção em geral não tem efeito sobre o garrholdion. Membros de uma facção que mudou de propósito podem até se ver diante de um garrholdion de suas crenças passadas.\n\nSe uma facção é conhecida por empunhar um tipo particular de arma, como um sabre dente-de-serra do Louva-a-deus Vermelho ou as espadas de duelo da Academia Aldori, o garrholdion em geral aparece armado com a arma apropriada."
      }
    ]
  },
  "creature-gauntling": {
    "description": "Em lugares como as Terras de Cascalho, a mortidão permeia o próprio solo da terra. Essa poluição profana pode ter efeitos significativos na flora e na fauna regionais ao longo de gerações, fazendo plantas tornarem-se retorcidas e de aparência doentia e contaminando a vida selvagem de modo que os restos se ergam espontaneamente como mortos-vivos sem juízo.\n\nPorém, em alguns casos, sobretudo para aquelas feras que forrageiam primariamente pela ação de necrófagos, o consumo de carne morta-viva pode ter um efeito inteiramente diferente ao longo de meses. A rapidez com que um animal é afetado depende de ter comido dos restos de uma criatura morta-viva deixados após sua destruição ou tê-la consumido \"fresca\" de um morto-vivo num espasmo desesperado de inanição. Supondo que a criatura infeliz sobreviva a qualquer início de doença ou outras aflições trazidas pelo banquete hediondo, esses necrófagos às vezes sofrem uma transformação numa fera retorcida e voraz conhecida como gauntling.\n\nA maioria dos gauntlings surge de necrófagos, carnívoros ou onívoros, mas em certos casos herbívoros desesperados também podem ser transformados — essas criaturas são talvez o tipo mais perturbador de gauntling, devido à mudança significativa nos comportamentos que os empurra rumo a dietas de carne fresca. Uma vez que os animais se tornam gauntlings, essas criaturas abandonam os habitats selvagens anteriores em favor daqueles perto de regiões mais povoadas e muitas vezes escolhem esgotos ou outros locais subterrâneos como tocas das quais emergem para caçar. Na transformação em gauntling, independentemente do que as inclinações dietéticas anteriores da criatura possam ter sido, todos os gauntlings compartilham uma fome horrenda — a carne de humanoides sencientes. Um gauntling parece semelhante ao animal que era antes da transformação, mas com presas grandes e afiadas e com estruturas dolorosamente emaciadas, independentemente de quanto comam.\n\nO gauntling apresentado abaixo (como todos os encontrados em _Troubles in Grayce_) um dia foi um javali, mas você pode usar estas estatísticas para representar qualquer animal terrestre Médio que tenha sucumbido a esta transformação profana. Independentemente da forma original, todos os gauntlings compartilham uma boca cheia de presas afiadas e retorcidas.",
    "sections": [
      {
        "id": "other-gauntlings",
        "title": "Outros Gauntlings",
        "body": "O gauntling apresentado aqui vem de um animal terrestre Médio (um javali, para ser preciso), mas outros animais podem ser transformados desse modo ao consumir carne morta-viva. Para representar um originário de um animal Médio nadador ou voador, simplesmente conceda-lhe um deslocamento de natação ou de voo igual ao deslocamento-base. Para representar uma criatura menor ou maior, use as estatísticas apresentadas aqui como ponto de partida e então reconstrua as estatísticas usando as diretrizes para construir criaturas."
      }
    ]
  },
  "creature-giant-swamp-fly": {
    "description": "",
    "sections": []
  },
  "creature-golden-erinys-novitiate-circle": {
    "description": "Os conventos da Irmandade da Erinys Dourada treinam monges mulheres que estudam uma forma de artes marciais baseada nos diabos do Inferno.",
    "sections": []
  },
  "creature-gorumite-infantry": {
    "description": "A maioria das vilas e cidades em Golarion tem uma guarnição de guardas profissionais cujas tarefas incluem patrulhar as ruas, auxiliar a cidadania necessitada e agir como resposta militar rápida em tempos de crise. Guardas em geral operam em pares ou grupos pequenos, mas quando uma emergência séria ameaça, reúnem-se no forte, posto de vigia ou outro ponto de encontro mais próximo e então saem em busca da presa.\n\nAlternativamente, tropas de guarda podem estar estacionadas em locais importantes da cidade, como os portões da frente, a prisão principal ou a entrada do castelo do governante.\n\nGuardas individuais podem não ser particularmente bem treinados ou experientes, mas em grande número podem derrotar bandidos, criaturas selvagens que passaram pelos portões da cidade ou o ogro bêbado ocasional. Um grupo de guardas da cidade em geral é acompanhado e comandado por um único capitão, que faz a maior parte da conversa e dá as ordens aos guardas individuais. Os membros deste esquadrão da guarda da cidade treinam juntos para executar táticas simples, mas não manobras avançadas.",
    "sections": []
  },
  "creature-gorumite-veteran": {
    "description": "",
    "sections": []
  },
  "creature-gorumite-warpriest": {
    "description": "",
    "sections": []
  },
  "creature-hellbound-honor-guard": {
    "description": "Nobres chelaxianos, oficiais militares e outros dignitários considerados merecedores pela Casa Thrune às vezes recebem a proteção de um detalhe desses soldados de elite: campeões inabaláveis da máquina militar chelaxiana que se juraram a Asmodeus em troca de força e resiliência inigualáveis.",
    "sections": []
  },
  "creature-hellknight-retrieval-unit": {
    "description": "Esses bandos de armígeros dos Cavaleiros Infernais jurados à Ordem da Corrente são encarregados de rastrear e apreender aqueles considerados criminosos pela Casa Thrune. São treinados para capturar os alvos vivos sempre que possível, mas empregam táticas letais quando necessário.",
    "sections": []
  },
  "creature-iriatykian-outrider-band": {
    "description": "Nomeados em honra ao Senhor dos Cavalos Iriatykis, forjador da lança mítica _Shadowpiercer_ e instigador da rebelião de maior sucesso contra os senhores sombrios de Nidal na memória viva, esses cavaleiros de determinação sombria buscam resistir à autoridade brutal da Corte Umbral sobre as terras e os povos que chamam de seus. Embora os esforços até agora tenham se concentrado sobretudo em libertar comunidades rurais nas margens da nação, também começaram ataques pontuais contra bandos mercenários e caravanas de suprimento que atravessam Nidal a caminho de auxiliar o esforço de guerra chelaxiano.",
    "sections": []
  },
  "creature-knight-reclaimant": {
    "description": "",
    "sections": []
  },
  "creature-last-guard": {
    "description": "Honra e juramentos quebrados prendem uma última guarda ao lugar que falharam em defender em vida. Ali devem vigiar até que os deveres sejam cumpridos ou até que um chamado à guerra irresistível as convença a partir em marcha para a batalha.",
    "sections": []
  },
  "creature-lady-siccale": {
    "description": "",
    "sections": []
  },
  "creature-leather-cap": {
    "description": "",
    "sections": []
  },
  "creature-mantis-keeper": {
    "description": "",
    "sections": []
  },
  "creature-mirmicette": {
    "description": "Mirmicettes são fey materialistas que colecionam obsessivamente ferramentas pequenas, utensílios domésticos e quinquilharias semelhantes. Embora não sejam particularmente malévolas, mirmicettes consideram os itens que coletam mais interessantes do que as criaturas sencientes que os criam. Têm rostos cinzentos discretos e sem graça e dedos esguios que terminam em unhas semelhantes a garras, que usam para arrancar qualquer item que cobicem do lugar de descanso.\n\nMirmicettes vagueiam de lugar em lugar em busca de tesouros para acrescentar às coleções sempre crescentes. Quando uma mirmicette rouba um objeto, muitas vezes substitui o item furtado por uma cópia quase perfeita. As cópias de mirmicette são mais convincentes quando o fey está por perto, perdendo depressa o lustre conforme a distância entre a mirmicette e o objeto cresce. Embora essa troca tenha levado à decepção de mais de um aventureiro, a perda de bens materiais está longe do pior desfecho que se pode ter ao encontrar uma mirmicette. Mirmicettes detestam quem toca um de seus itens contrafeitos sem permissão, muitas vezes usando o próprio objeto como arma contra o pretenso ladrão.",
    "sections": [
      {
        "id": "household-plunderers",
        "title": "Saqueadores Domésticos",
        "body": "Mirmicettes em geral consideram tudo que não esteja pregado no chão como jogo válido, mas indivíduos podem valorizar certos itens acima de outros. Uma mirmicette pode cobiçar utensílios de cozinha, por exemplo, enquanto outra prefere colecionar dedais, alfinetes e outras ferramentas de costura. Como não têm entendimento real de dinheiro, mirmicettes muitas vezes não passam de aborrecimentos que podem ser comprados com uma concha de madeira ou um carretel de linha. Mirmicettes que vagueiam até uma cripta ou câmara do tesouro, porém, podem tornar-se um problema sério para os zeladores — e podem competir com os ladrões mortais que saqueariam aqueles lugares para si."
      }
    ]
  },
  "creature-moldering-steed": {
    "description": "Um corcel putrescente é um cavalo cuja vontade inabalável não pôde ser quebrada, nem mesmo pela morte. Drapeado em carne podre e arrastando as próprias entranhas fétidas, o corcel luta sem descanso contra o estado morto-vivo, buscando os espíritos de criaturas de vontade forte para consumir numa tentativa vã de reparar a alma fraturada. Uma vez que pega um rastro, o corcel persegue a presa até consumir o espírito da criatura ou achar presa de vontade mais forte para rastrear.\n\nOs poucos corcéis putrescentes que surgem naturalmente muitas vezes morreram tentando escapar de situações desesperadas, como enchentes ou incêndios. Com mais frequência, necromantes criam corcéis putrescentes para servir de montarias para seus exércitos mortos-vivos. Diferente de montarias vivas, corcéis putrescentes não precisam ser alimentados nem cuidados, e muitas vezes aceitam um cavaleiro morto-vivo que lhes permita caçar presas vivas. Devido à fome insaciável do corcel, porém, necromantes vivos devem cuidar para não se tornarem a próxima refeição da montaria.",
    "sections": [
      {
        "id": "ascetivores",
        "title": "Ascetívoros",
        "body": "Necromantes hábeis criaram uma variante do corcel putrescente para reduzir o risco da criatura a tratadores vivos. Em vez de consumir a vontade dos vivos, ascetívoros alimentam-se da conexão que seres sagrados compartilham com suas deidades. Em vez de afetar todas as criaturas vivas, as habilidades Caçar Vontade, Sifão de Vontade e Sentido de Vontade do corcel putrescente afetam apenas criaturas vivas com o traço sagrado."
      }
    ]
  },
  "creature-niesha": {
    "description": "Os metamorfos bizarros conhecidos como mezlans foram criados há eras como espiões e infiltradores por um ritual há muito esquecido que infunde uma gosma magicamente construída com a alma de um ser senciente excepcional. Tendo há muito sobrevivido aos criadores, mezlans na maioria das vezes habitam sozinhos entre as ruínas das civilizações antigas a que serviram como mortais.",
    "sections": []
  },
  "creature-oceanius-and-glory-arcely": {
    "description": "",
    "sections": []
  },
  "creature-omelia": {
    "description": "",
    "sections": []
  },
  "creature-oprak-firestorm-battalion": {
    "description": "Entre as tropas enviadas pela Legião Presa de Ferro de Oprak para auxiliar Nirmathas contra a invasão molthuni estão seus temidos batalhões tempestade de fogo, unidades com treinamento especial no uso tático de bombas e explosivos. Cada um desses batalhões carrega munição alquímica o bastante para banhar um campo de batalha inteiro em chamas várias vezes.",
    "sections": []
  },
  "creature-ordulf-bladecaller": {
    "description": "",
    "sections": [
      {
        "id": "insulting-ordulf",
        "title": "Insultar Ordulf",
        "body": "Um PC pode tirar proveito da arrogância de Ordulf Chamalâmina com a atividade a seguir."
      }
    ]
  },
  "creature-ort-mob": {
    "description": "Massas patéticas de carne trêmula forjadas das almas dos condenados, orts são os menores entre os diabos, o que os torna a carne de canhão perfeita tanto para diabos mais poderosos quanto para diabolistas mortais.",
    "sections": []
  },
  "creature-ossuary-warden": {
    "description": "",
    "sections": []
  },
  "creature-path-river-peeler": {
    "description": "Como muitos criptídeos, até o nome do Descascador do Rio Path é matéria de disputa. Alguns dizem que a criatura ganha o nome dos cadáveres das vítimas, muitas vezes encontrados limpos da pele mas intocados no mais. Outros afirmam que cadáveres nesse estado são a exceção à regra. Com mais frequência, nenhum vestígio das vítimas do Descascador é encontrado — talvez essas mortes sem pele tenham sido simplesmente abandonadas pelo Descascador antes que pudesse terminar a refeição. Quem subscreve essa teoria argumenta que um nome melhor seria o \"Uivador\", pelos gritos ecoantes que a fera emite na caçada. Mas que sentido faz chamá-lo de Uivador, quando todos sabem que barulhos altos são o melhor jeito de afugentar o monstro? Os argumentos giram e giram, sem fim à vista para o debate.\n\nO Descascador é encontrado com mais frequência numa área selvagem e em grande parte desocupada ao norte de Grayce chamada Falésias Tremeluzentes. A maioria das pessoas em Grayce, com a exceção dos idosos que têm contos da juventude, acha que o Descascador é só uma história para assustar crianças e explicar as ovelhas mortas e desaparecidas que caem vítimas de lobos ou outros predadores. Ainda assim, todos que cresceram em Grayce sabem cantar alguns versos de uma parlenda popular que as crianças da cidade cantam enquanto brincam.",
    "sections": [
      {
        "id": "barrow-claw",
        "title": "Garra Tumular",
        "body": "Avistamentos pretensos do Descascador do Rio Path muitas vezes coincidem com um surto de garra tumular: um fungo raro, portador de doença, frio ao toque e que devasta a vegetação próxima. Surtos de garra tumular levaram alguns eruditos entusiasmados a postular que o próprio criptídeo é a fonte do fungo. Uma teoria mais provável é que o Descascador e a garra tumular compartilham um habitat no Mundo Inferior, e que o primeiro simplesmente carrega esporos da última no pelame eriçado."
      }
    ]
  },
  "creature-priests-of-iomedae": {
    "description": "",
    "sections": []
  },
  "creature-pure-legion-regiment": {
    "description": "A Legião Pura é a agência nacional de imposição da lei responsável por impor as Leis da Mortalidade de Rahadoum, assegurando que a nação seja mantida livre de religião em qualquer forma. Isso inclui adoração ou proselitismo de deidades, bem como a posse de escrituras escritas ou parafernália religiosa.",
    "sections": []
  },
  "creature-radiant-veranallia": {
    "description": "",
    "sections": []
  },
  "creature-rage-rider": {
    "description": "",
    "sections": []
  },
  "creature-raised-cavalry": {
    "description": "Mortos-vivos são abundantes por todas as Terras de Cascalho, mas mesmo assim necromantes às vezes precisam ser criativos para organizar os mortos-vivos variados que têm à mão numa unidade militar coesa. Embora a cavalaria erguida típica seja uma mistura de esqueletos, zumbis e carniçais, muitas unidades também incorporam múmias, fantasmas e mortos-vivos mais poderosos.\n\nOs Cavaleiros de Lastwall relataram batalhões de mortos-vivos erguendo-se dos campos onde foram enterrados, presumivelmente em preparação para um assalto futuro. Um dos mais infames desses terrenos de preparação foi Fallowdeep, a rede de túneis subterrâneos sob a antiga fortaleza anã de Hammer Rock. Quando o Tirano Sussurrante atacou as nações do Mar Interior, o suprimento de mortos-vivos de Fallowdeep foi vastamente esgotado, mas depósitos de cadáveres sem dúvida permanecem ali para um necromante engenhoso explorar.",
    "sections": [
      {
        "id": "a-cavalry-without-mounts",
        "title": "Uma Cavalaria Sem Montarias",
        "body": "Equipar uma cavalaria erguida com montarias suficientes em geral envolve o abate de cavalos em escala maciça. A destruição de um haras, o desaparecimento súbito de uma manada selvagem ou um aumento de viajantes roubados das montarias pode sinalizar um plano necromântico em andamento. Sem cavalos ou outras montarias mortas-vivas para montar, uma cavalaria erguida tem lentidão 1."
      }
    ]
  },
  "creature-red-mantis-assassin": {
    "description": "",
    "sections": []
  },
  "creature-red-mantis-conspirator": {
    "description": "",
    "sections": []
  },
  "creature-rhysaphine": {
    "description": "Peris são celestiais contrários e artísticos, tão renomados pela beleza quanto pelas naturezas enganosas. Mercuriais, embora nunca maliciosos, peris esforçam-se para auxiliar mortais, embora sejam mais propensos a dispensar enigmas e missões do que a oferecer ajuda de imediato.",
    "sections": []
  },
  "creature-roc-rider": {
    "description": "Adlets habitam os recantos mais distantes e duros da Coroa do Mundo. À primeira vista, esse povo isolado parece muito com os primos humanos Erutaki; em geral têm pele terracota, cabelo liso e preto e compleição compacta e poderosa. Porém, adlets tendem a ser mais altos e de musculatura mais fibrosa que os parentes humanos. De perto, a estranheza se revela — cada um ostenta uma goela cheia de dentes semelhantes aos de lobo. As pernas e a cauda lembram as de um cão.\n\nAs lendas dos adlets dizem que há muito tempo um caçador poderoso perdeu-se longe de casa e deparou com uma casa de osso de baleia e gelo. Uma mulher vestida de peles de raposa branca o saudou, o alimentou e cuidou das geadas. Com o tempo, casaram-se e tiveram 10 filhos, cinco dos quais nasceram com as pernas e as caudas de raposas. Essas crianças ficaram com a mãe, enquanto os outros cinco — nascidos com as pernas e as caudas de lobos — viajaram com o pai de volta às terras humanas e tornaram-se os primeiros adlets.\n\nAdlets não são inerentemente maus, mas a cultura é belicosa, xenofóbica e notavelmente carente de humildade. Veem-se como os governantes naturais dos ermos árticos e encaram todos os outros como ocupantes na melhor das hipóteses e invasores na pior. Um adlet típico é mais forte e mais rápido que qualquer humano mundano, com a habilidade de andar nu numa nevasca e evocar névoas geladas. Diante disso, pouco admira que adlets tenham desenvolvido algo como um complexo de superioridade. Ainda assim, embora investidas adlet sejam um problema comum para viajantes na Coroa do Mundo, um punhado de mercadores astutos e destemidos forjou relações pacíficas com certas comunidades adlet ao longo de rotas mais comuns.",
    "sections": []
  },
  "creature-sacristan-scourge": {
    "description": "Forçadas à servidão pelos conjuradores das sombras da Corte Umbral, essas assembleias cambaleantes de carne marcada, metal dentado e escuridão encarnada seriam dignas de piedade se não representassem ameaça tão mortal a quem as encontra no campo de batalha. Cada uma dessas companhias é composta de dezenas de velstracs cujos corpos e espíritos foram completamente quebrados pelas agonias do Mundo Inferior. O horror de suas táticas de combate brutais só é superado pelos uivos gélidos que anunciam sua chegada, estilhaçando as mentes até dos soldados mais disciplinados. Uma vez concluída uma batalha, muitos membros de um flagelo sacristão buscam os que foram feridos mas ainda não estão mortos para saborear o sofrimento requintado nos momentos finais.",
    "sections": []
  },
  "creature-saint-fang": {
    "description": "Este dragão é altivo e orgulhoso, muitas vezes soando santarrão. Como a própria encarnação das guerras justas, sente que não pode possivelmente estar errado. As escamas de aço polido fazem o som distintivo de lâmina raspando contra lâmina enquanto se move, e os espinhos semelhantes a agulhas tilintam uns contra os outros a cada bater poderoso das asas largas. Presa-Santa é a guerra dada forma de dragão, com o temperamento de um mestre estrategista.\n\nUltimamente, cada vez mais seguidores de Gorum têm declarado guerra pelo bem da batalha. Deleitam-se em causar derramamento de sangue por qualquer desculpa, invocando os servos de Gorum em auxílio, mas Presa-Santa não atende a esses chamados. É mais propenso a aparecer para um grupo de aldeões que se unem para destituir um rei bandido local ou para uma população nativa defendendo os lares contra colonizadores. Acredita que a guerra é inevitável enquanto os gananciosos e sedentos de sangue receberem armas, e busca auxiliar aqueles cuja justificativa para a guerra é ter esgotado as opções pacíficas.\n\nPresa-Santa raramente aceita um cavaleiro, mas obedece aos comandos de seu Senhor de Ferro, Gorum. O deus ocasionalmente ordena que Presa-Santa leve um de seus fiéis à batalha, e ele obedece à letra do comando, muitas vezes derrubando cavaleiros que acha indignos uma vez que alcançam o campo de batalha.",
    "sections": [
      {
        "id": "saint-fang-s-past",
        "title": "O Passado de Presa-Santa",
        "body": "Muitos eruditos teológicos em Golarion buscaram a verdade por trás das origens de Presa-Santa. A explicação mais provável (e amplamente acreditada) é que um dia ele voou os céus acima de Golarion, buscando proteger mortais inocentes dos estragos da guerra, mas tornou-se tão cínico com o tempo que por fim transformou-se numa arma perfeita para Gorum."
      }
    ]
  },
  "creature-sangrist": {
    "description": "Sangrists nascem dos corpos daqueles que sangraram até o fim, muitas vezes quando são deixados insepultos sem ritos adequados em lugares maculados por energia do vazio, embora a presença forte de energia do vazio não seja um requisito. Algumas vítimas que se erguem como sangrists sofreram um acidente ou ataque numa região distante e nunca foram encontradas e devidamente deitadas ao descanso, seja um deslize de lâmina ao limpar a caça ou uma chifrada de um javali selvagem.\n\nApós erguer-se como mortos-vivos, essas criaturas trágicas são atraídas a sítios de carnificina passada onde o cheiro de sangue e morte permanece. São comumente encontradas nas terras devastadas pela guerra de Lastwall, nas ruínas assombradas de Ustalav e nos campos de batalha amaldiçoados de Geb, encarnando uma fome implacável pela vida que perderam.\n\nSangrists dependem de sigilo e emboscadas, tornando-se mais ativos à noite. Durante períodos de inatividade, caem num torpor estranho. Nesse estado, balançam para frente e para trás e se contorcem com frequência, às vezes emitindo um zumbido assombroso.\n\nAlguns sangrists são caçadores solitários, muitas vezes perseguindo um alvo solitário por horas se não dias. Outros formam matilhas, sobretudo se compartilharam um vínculo em vida. Essas matilhas exibem uma astúcia coordenada e gélida, reminiscentes de lobos à espreita. Sangrists são caçadores pacientes, às vezes rastreando as vítimas por quilômetros ou observando-as por horas antes de agir. Visam os fracos e isolados, abatendo aqueles que podem ferir com facilidade para que sangrem até o fim mesmo que consigam correr mais que os sangrists. Retendo só uma sombra de seus eus anteriores, sangrists raramente pronunciam mais do que frases de uma palavra, em geral para expressar o ódio pelos vivos, a fome sem fim, ou onde vítimas podem ser encontradas.\n\nEmbora sangrists não consigam beber sangue nem obter nutrição dele, às vezes juntam sangue nas mãos em concha e o derramam nos rostos e corpos. Também podem deitar-se ao lado do corpo de um inimigo abatido. Este ritual macabro parece ser uma tentativa desesperada de reconectar-se com a vida que um dia tiveram. Essas propensões estranhas rumo ao sangue, à atividade noturna e ao anseio por algum vislumbre das vidas anteriores levam alguns sangrists a associar-se a vampiros. Vampiros em geral não acham sangrists desagradáveis e consideram as criaturas mortas-vivas fáceis de manipular para servi-los como guardiões e atendentes.",
    "sections": [
      {
        "id": "taste-for-blood",
        "title": "Gosto por Sangue",
        "body": "Essas criaturas raras já foram tomadas por vampiros ferais ou zumbis obcecados por sangue por soldados e aventureiros que não têm entendimento firme das miríades de formas que a mortidão pode assumir. Quem está familiarizado com sangrists e visa caçá-los muitas vezes dispõe sangue, com frequência sangue de porco, como isca."
      }
    ]
  },
  "creature-saviya": {
    "description": "A associação de Saviya com o Louva-a-deus Vermelho começou nos dias em que era imediata no navio pirata _Storm Shark_, há mais de 100 anos. O infame e cruel comandante do navio era um homem chamado Capitão Dargi — tão notório pirata quanto jamais rondou os Grilhões. Como membro da tripulação, Saviya seguia as ordens do Capitão Dargi de saquear, pilhar e afundar muitos navios da Marinha Chelaxiana, tudo enquanto adorava Besmara, a Deusa Pirata, como sacerdotisa fiel. O _Storm Shark_ era muito bem-sucedido e muito brutal; orgulhavam-se de não deixar ninguém vivo após as incursões, e Saviya passou a deleitar-se no pavor que inspirava ao citar o nome do navio.\n\nComo muitos capitães piratas de longo alcance dos Grilhões, o Capitão Dargi mantinha um berço em Ilizmagorti. Sempre que o _Storm Shark_ visitava este porto, a tripulação sempre acatava as leis do Louva-a-deus Vermelho, mesmo que fazê-lo fosse um desafio para um pirata sanguinário como o Capitão Dargi, que (no mar) muitas vezes denegría os assassinos e fazia afirmações ousadas de um dia pilhar Ilizmagorti e tornar a cidade sua. Saviya a princípio achou a bravata do capitão intimidadora, até um pouco inspiradora. Mas cada vez que velejavam até Ilizmagorti e ela via o poder, o respeito e o medo concedidos ao Louva-a-deus Vermelho entre os cidadãos da cidade, seu respeito e medo do capitão fanfarrão minguavam, substituídos por derrisão. Sabia melhor do que dar voz à insatisfação crescente com o Capitão Dargi, claro, mas, conforme o interesse nas assassinas do Louva-a-deus Vermelho crescia, ela cada vez mais ficava de olho numa oportunidade de dar o golpe.\n\nUm dia, o Capitão Dargi encontrou-se com um cruzador de Rahadoum para desovar o butim roubado, como fizera muitas vezes no passado. Saviya por acaso ouviu o capitão e o cúmplice discutindo as mercadorias: segredos sobre as defesas da Ilha de Mediogalti. Saviya sabia que essa traição certamente seria descoberta e punida de forma letal na próxima vez que o navio velejasse até Ilizmagorti, então, quando o _Storm Shark_ chegou ali alguns meses depois, Saviya relatou depressa mas em segredo as faltas do capitão ao Louva-a-deus Vermelho e implorou para que lhe permitissem ajudar no assassinato. Os agentes do Louva-a-deus Vermelho ficaram impressionados e concordaram, com um requisito: insistiram que, se ela fosse junto, seria ela a matar o Capitão Dargi. Saviya aceitou com avidez e, por vários dias, reuniu-se em segredo com os contatos assassinos para aprender os modos deles o melhor que pudesse em preparação para a grande chance. Quando o momento chegou, Saviya deleitou-se na morte, golpeando o capitão com o sabre dente-de-serra que havia contrabandeado a bordo, e então usando a magia para quebrar cada osso no corpo de Dargi de modo que, quando a morte por fim veio, veio em agonia gloriosa. Daquele dia em diante Saviya foi uma devota fiel de Achaekek em vez de Besmara.\n\nSaviya poderia ter reivindicado o _Storm Shark_ como seu e servido como capitã, mas em vez disso ofereceu a toda a tripulação uma escolha — poderiam ser abandonados numa ilha longe de qualquer rota de navegação e tentar a sorte, ou poderiam voltar com ela a Ilizmagorti como servos de Aquele que Caminha no Sangue. Muitos da tripulação escolheram ser abandonados, só para aprender (para seu horror) que isso simplesmente mudava o local e o método de sua oferenda a Achaekek, pois a ilha que Saviya escolheu estava infestada de louva-a-deus imensos e mortais que deram conta rápida da tripulação condenada.\n\nSaviya serviu Aquele que Caminha no Sangue com dever pelas várias décadas seguintes, começando por converter os da tripulação do _Storm Shark_ que aceitaram a oferta. Por fim, pediram-lhe que se juntasse ao sacerdócio no Pagode do Louva-a-deus em Ilizmagorti. Nas várias décadas seguintes, subiu nas fileiras e tornou-se a atual sumo sacerdotisa. É membro dos Vernai há duas décadas — o que, como se vê, é tempo de sobra para ela reverter aos velhos modos de tramar a queda de sua comandante.\n\nHá pouco mais de 10 anos, Saviya voltou de um contrato em que usara um elixir alquímico experimental para lhe dar a habilidade de rastrear pelo cheiro como um cão de caça. Usou-o para farejar a localização do alvo e estilhaçou as colunas do prédio em que ele se escondia, expulsando-o para um golpe mortal bem público. A habilidade concedida alquimicamente persistiu quando ela se reuniu com a Senhora do Sangue Jakalyn para relatar o sucesso, durante o qual Saviya farejou algo que nunca detectara antes: sangue élfico.\n\nIsso intrigou a sumo sacerdotisa, pois embora Jakalyn fosse humana, o cheiro tênue de elfo que exalava dela era, para os sentidos aprimorados de Saviya, inconfundível. A longevidade misteriosa de Jakalyn era bem conhecida, claro, mas quanto mais Saviya observava, mais começou a pensar que, de algum modo, a Senhora do Sangue Jakalyn herdara longevidade élfica. Isso vexou Saviya profundamente, pois ela tinha desígnios sobre a posição de Jakalyn e antes pretendia tomar a rota bem élfica da paciência — simplesmente sobreviver à superior humana e então ocupar o papel vago.\n\nA percepção de que Jakalyn bem poderia sobreviver a ela forçou a mão de Saviya, e ela começou a recrutar lentamente membros para uma conspiração por fim destinada a destronar Jakalyn e assegurar o direito concedido pelo deus de governar o Louva-a-deus Vermelho de Achaekek.\n\nQuando os PCs por fim alcançam Saviya, ela está perto o bastante da meta para não só farejá-la, mas saboreá-la. Como agentes favorecidos de Jakalyn, os PCs são tanto inimigos de Saviya quanto a líder deles, mas quando os PCs a encontram no Elísio, a frustração de estar tão perto do sucesso a força a por fim cometer um erro provavelmente fatal — ela desafia os PCs diretamente.",
    "sections": []
  },
  "creature-seldeg-bhedlis-claws-of-the-tyrant": {
    "description": "O conto de Seldeg Bhedlis é um de amargura e fracasso. Outrora um Cavaleiro de Ozem orgulhoso, Seldeg lutou ao lado de Arazni, então ainda a arauta de Aroden, durante a Cruzada Reluzente. Subiu depressa nas fileiras e, em 3889 CA, foi um dos seis cavaleiros escolhidos a dedo para infiltrar a cidade de Mechitar e derrubar a nação de Geb por dentro.\n\nEssa nomeação provou ser a ruína de Seldeg. Até esse ponto, a vida de Seldeg fora de regime militar estrito. Uma vez libertado das correntes da moralidade impostas pela criação, Seldeg achou os prazeres de Geb tentadores demais para resistir. Por fim caiu nos braços de uma amante vampira, ela mesma uma serva secreta de um dos Senhores do Sangue daquela nação. Nas semanas seguintes, Seldeg revelou à nova amante tudo que sabia sobre os Cavaleiros de Ozem, causando dano irreparável à antiga ordem. Reconhecendo que suas ações seriam vistas com dureza tanto por Aroden quanto por Pharasma, Seldeg assentiu a tornar-se um cavaleiro da tumba em vez de enfrentar o julgamento dos deuses.\n\nA primeira tarefa de Seldeg como cavaleiro da tumba foi roubar o corpo de Arazni de Vigil, onde fora deitado ao descanso após a derrota nas mãos do Tirano Sussurrante. Nisso, ao menos, Seldeg teve sucesso. Com o retorno do cavaleiro da tumba, Geb transformou Arazni numa lich e designou Seldeg e seus companheiros cavaleiros caídos, agora conhecidos como o Conselho Libertino, para servir tanto de guarda-costas pessoais quanto de captores dela.\n\nSeldeg prestou séculos de serviço fiel ao Rei Fantasma, mas por fim o cavaleiro da tumba falhou de novo. Em 4719 CA, impelida por um presságio do retorno de Tar-Baphon, Arazni escapou do Conselho Libertino, fugiu da nação de Geb e voltou a Lastwall. Semanas depois, foi morta lutando contra o Tirano Sussurrante ao lado de um grupo de heróis mortais e, como consequência, recebeu a divindade. Como punição por permitir que Arazni escapasse, Geb designou Seldeg com a tarefa invejável de encobrir esse fracasso. Apesar dos melhores esforços do cavaleiro da tumba, porém, ocultar a ascensão de Arazni mostrou-se impossível. Quando Seldeg soube que Geb planejava destruir sua armadura de cavaleiro da tumba, o cavaleiro da tumba amargurado fugiu para as Terras de Cascalho e jurou serviço a um novo mestre, Tar-Baphon.\n\nAinda assombrado pelos fracassos, Seldeg desde então fixou-se em Arazni, cuja história ele acredita espelhar a sua. Como Arazni, Seldeg tornou-se morto-vivo em grande parte contra a vontade, então foi forçado a cometer atrocidades que de outro modo teria abominado se o destino não o tivesse posto num caminho sombrio. O cavaleiro caído agora pretende reparar o destino de Arazni, junto com o seu, de uma vez por todas. Para isso, concebeu um ritual que trocará a história de Arazni com a de outra deusa, Iomedae. Se bem-sucedido, Seldeg acredita que reescreverá a história de modo que Iomedae, e não Arazni, terá morrido nas mãos de Tar-Baphon.\n\n**Papel na campanha**\n\nSeldeg Bhedlis apareceu anteriormente na Trilha de Aventuras Senhores do Sangue, em que o Rei Fantasma Geb propôs matar o cavaleiro da tumba e destruir a armadura amaldiçoada. Apesar dessas maquinações, Seldeg conseguiu sobreviver, embora a armadura icônica tenha sido danificada durante a fuga. A traição de Geb, junto com o descontentamento crescente de Seldeg com o papel de mestre-espião do Rei Fantasma, inspirou o cavaleiro da tumba a desertar de Geb e viajar às Terras de Cascalho para jurar serviço ao Tirano Sussurrante.\n\nEmbora os personagens possam não perceber, Seldeg Bhedlis impulsiona a história das três aventuras apresentadas em Claws of the Tyrant. Em cada aventura, as ações de Seldeg surgem de sua crença desesperada (e discutivelmente delirante) de que, ao desfazer o destino de Arazni, de algum modo mudará o seu. A amargura de Seldeg, porém, o cega ao fato de que suas tentativas de reescrever a história o levam ainda mais longe da redenção que tão desesperadamente busca.\n\nEm \"Sobreviventes das Terras de Cascalho\", Seldeg envia um de seus agentes à vila em ruínas de Esperança de Yua para recuperar uma das Pedras de Sangue de Arazni, um artefato que Seldeg acredita vital para impulsionar o ritual. Os heróis estão entre um grupo de refugiados que devem entregar a Pedra de Sangue a mãos seguras.\n\nEm \"Cinzas para Ozem\", Seldeg encarrega os personagens de roubar outra relíquia, o Cálice de Ozem, do Forte Ozem, uma antiga fortaleza dos Cavaleiros de Ozem agora sob a tutela dos Patrulheiros de Chernasardo. Embora o Cálice não seja necessário para encenar o ritual, Seldeg acredita que um artefato tão ligado às histórias de Arazni e Iomedae emprestará poder à sua magia. A aventura final do livro, \"De Sangue e Fé\", vê Seldeg empreendendo o ritual para trocar os destinos de Arazni e Iomedae. Nesta aventura, os heróis correm contra os lacaios de Seldeg para recuperar as duas Pedras de Sangue ainda desaparecidas. No clímax da aventura, os personagens por fim têm a chance de confrontar Seldeg face a face e pôr fim às maquinações do cavaleiro da tumba de uma vez por todas.",
    "sections": []
  },
  "creature-shackles-pirate-crew": {
    "description": "As frotas de navios enviadas pelos Capitães Livres dos Grilhões mostraram-se inestimáveis aos esforços de Andoran para romper o bloqueio de Hespereth, ao mesmo tempo agindo como um espinho constante no lado de Cheliax ao conduzir incursões regulares para saquear os povoados ao longo da costa sul. Tripulações piratas às vezes ficam barulhentas quando o navio atraca e começam brigas de taverna bêbadas.",
    "sections": []
  },
  "creature-shirota": {
    "description": "",
    "sections": []
  },
  "creature-silver-saber": {
    "description": "Este construto foi construído há centenas de anos por arcanistas do Louva-a-deus Vermelho, então imbuído de inteligência como protetor divino por sacerdotes de Achaekek não muito depois de o culto assassino fugir de Rahadoum. O único propósito de Sabre Prateado é guardar os segredos da Senhora do Sangue daqueles que são indignos.\n\nQuando em descanso, Sabre Prateado aparece como um espelho ornamentado, mas quando confrontado em batalha anima-se na forma de um louva-a-deus feito de prata polida, quase líquida, com um rosto humanoide em branco.",
    "sections": [
      {
        "id": "life-as-a-mirror",
        "title": "Vida como um Espelho",
        "body": "Sabre Prateado observou os seguidores de Achaekek por séculos, sentado em silêncio na moldura dourada e fingindo ser um espelho. Sabe mais sobre as vidas secretas do Louva-a-deus Vermelho do que jamais foi registrado no Sarzari, mas o objetivo não é registrar a história, e sim funcionar como guardião — nada mais, nada menos."
      }
    ]
  },
  "creature-sister-maeri": {
    "description": "",
    "sections": []
  },
  "creature-skeletal-rat-swarm": {
    "description": "",
    "sections": []
  },
  "creature-splinter-officer": {
    "description": "Um exército de mortos-vivos sem juízo possui uma falha fatal: exige babá quase constante de seu criador. Porém, qualquer morto-vivo com sentiência o bastante para comandar tal exército corre o risco de voltar-se contra o criador. Necromantes hábeis esforçaram-se para encontrar um equilíbrio entre esses dois extremos com a criação de oficiais estilhaçados. Capazes de liderar batalhões pequenos de mortos-vivos, oficiais estilhaçados estão ao mesmo tempo singularmente vinculados ao criador — e facilmente descartados caso decidam rebelar-se.\n\nO primeiro oficial estilhaçado foi criado quando um lich separou a gaiola da alma em múltiplas partes e implantou cada fragmento num campeão morto-vivo único, sobre o qual o lich desfrutava controle completo. Por fim, o lich decidiu que o risco à gaiola da alma não valia os benefícios, mas a técnica de divisão de alma mostrou-se útil demais para abandonar. Hoje, oficiais estilhaçados são criados arrancando a alma de uma criatura inteligente das garras de Pharasma no momento da morte da criatura. A alma fresca é então estilhaçada, com o oficial estilhaçado recebendo a porção maior e os estilhaços restantes sendo implantados nos soldados mortos-vivos sem juízo que o oficial controla.",
    "sections": [
      {
        "id": "the-splintered-soul",
        "title": "A Alma Estilhaçada",
        "body": "Quão finamente uma alma pode ser dividida permanece incerto, mas até agora nenhuma foi partida em mais de 50 pedaços, incluindo o fragmento usado para erguer o oficial estilhaçado. Conforme os desejos do criador, o oficial estilhaçado pode receber os pedaços não usados da alma para erguer mortos-vivos adicionais enquanto estiver em campo. Porém, um necromante paranoico o bastante para depender de um oficial estilhaçado para comandar a legião morta-viva raramente sacrifica tal poder de bom grado."
      }
    ]
  },
  "creature-stelemora": {
    "description": "Stelemoras são fey amantes da natureza dedicados a embelezar o mundo natural ao enredar criaturas desavisadas e transformar os corpos em topiarias elaboradas de dentro para fora. Salvo as vagens de sementes bulbosas e espinhosas, stelemoras são compostas inteiramente de videiras, que podem crescer, retrair e desprender à vontade. Stelemoras regeneram videiras danificadas a um ritmo alarmante, permitindo-lhes recuperar-se de quase qualquer ferimento com o tempo.\n\nStelemoras jovens viajam o mundo em busca de um pedaço de selvageria para chamar de seu. Uma vez que escolhem um sítio adequado, usam as videiras para laçar criaturas de passagem, segurando o alvo imóvel enquanto implantam à força as sementes dentro da vítima. As sementes implantadas então criam raízes, usando a própria criatura como fertilizante e transformando aos poucos o corpo numa massa de videiras e folhas. Uma vez que concluem o trabalho, a stelemora desprende as videiras e regenera-se num local novo para começar a próxima obra-prima.\n\nEmbora stelemoras prefiram encher os jardins com criaturas que um dia viveram, enterram objetos inanimados em videiras se não conseguem capturar os sujeitos preferidos. Stelemoras também já foram conhecidas por transformar estátuas, baús de tesouro e até edifícios inteiros em topiarias a fim de atrair a presa favorecida.",
    "sections": [
      {
        "id": "royal-gardeners",
        "title": "Jardineiros Reais",
        "body": "Stelemoras às vezes servem hamadríades e outros fey nobres como jardineiros, decorando os pátios com esculturas fantásticas formadas de videiras floridas. Governantes bondosos em geral exigem que stelemoras a seu serviço limitem as criações a sujeitos inanimados, mas fey mais cruéis não impõem tais restrições à criatividade de seus jardineiros."
      }
    ]
  },
  "creature-sticky-toffee-hound": {
    "description": "Bruxas doces têm afinidade com a confeitaria e se deleitam em corromper tudo que é doce e apetitoso. Como a maioria dos confeiteiros, cada bruxa cultiva uma coleção pessoal de receitas favoritas às quais continua voltando. Para Larmine, a bruxa que ocupa a Padaria de Dalmira, as mais leais de suas especialidades são seus cães de toffee pegajoso.\n\nEmbora modelados segundo cães de caça nobres, há só tanto que a magia pode fazer para manter pão de ló e calda de toffee numa forma mais ou menos canina. Essas criações pegajosas e doces portanto têm toda a lealdade de um cão e toda a versatilidade de uma gosma, a ponto de praticamente se manterem juntas pela força pura da devoção à criadora. Porém, os cães açucarados têm pouca consciência da mortalidade da criadora; se Larmine algum dia morresse, Grayce seria serenada todas as noites por semanas pelos uivos borbulhantes de seus animais de estimação em luto. De fato, as gosmas de toffee poderiam por fim tornar-se tão desesperadas por atenção que se agarrariam a civis indefesos, até sufocando os novos (e involuntários) donos numa busca desesperada por afeição.\n\nUm cão de toffee pegajoso é uma armadilha irresistível para insetos, cuja congregação pode denunciar a presença da gosma. O corpo do cão é por fim letal, porém, prendendo animais no couro gosmento como mosquitos no âmbar.",
    "sections": [
      {
        "id": "half-baked-creations",
        "title": "Criações Meio Assadas",
        "body": "Cães de toffee pegajoso não são a única opção para bruxas doces empreendedoras que querem fazer companheiros. Criaturas como esta podem ter qualquer forma e formato, mas formas e comportamentos animais são os mais frequentemente imitados. Bruxas doces também podem fazer companheiros de pães, massas e outras confeitarias, rendendo um buffet de aliados perigosos e potencialmente saborosos."
      }
    ]
  },
  "creature-swamp-beetle": {
    "description": "",
    "sections": []
  },
  "creature-talaro": {
    "description": "",
    "sections": []
  },
  "creature-tallusian": {
    "description": "Enquanto muitos celestiais são atraídos ao que é, tallusianos importam-se com o que foi. Compelidos a proteger os remanescentes de civilizações caídas, tallusianos muitas vezes trabalham ao lado de dríades e outras criaturas da natureza, ajudando a restaurar a terra em torno das ruínas enquanto rechaçam influências malignas que buscam reivindicar as estruturas abandonadas para si. Embora poucos saibam mais sobre as civilizações antigas que protegem do que os próprios tallusianos, raramente fazem distinção entre sítios sagrados e aqueles usados para propósitos nefastos. Para um tallusiano, qualquer edifício, independentemente da história, pode ser reaproveitado em algo novo.\n\nFisicamente, tallusianos lembram pandas-vermelhos superdimensionados, salvo por terem seis pernas, olhos azuis penetrantes e espinhos de pedra afiada crescendo ao longo das costas e das caudas felpudas. Em descanso, tallusianos aparecem virtualmente indistinguíveis dos edifícios que protegem, disfarçando-se de montes de entulho até se moverem. Também possuem a habilidade de adotar uma forma humanoide, muitas vezes a de uma criança energética. Tallusianos disfarçados de crianças já foram conhecidos por levar aventureiros a civilizações que de outro modo saíram do mapa, na esperança de que os heróis ajudem a proteger as ruínas até que possam ser restauradas.",
    "sections": [
      {
        "id": "excessive-exuberance",
        "title": "Exuberância Excessiva",
        "body": "Com a habilidade de mudar de forma e a energia aparentemente ilimitada, tallusianos muitas vezes são tomados por fey pelos aventureiros que os encontram. De fato, muitos tallusianos sentem-se mais confortáveis entre criaturas do Primeiro Mundo do que entre as dos reinos celestiais. Anjos e até outras azatas às vezes acham excessiva a intensidade com que tallusianos protegem as ruínas. No fundo, porém, tallusianos são tão bondosos quanto exuberantes, irrompendo num frenesi de dente, garra e espinho só quando sentem que o território está em risco."
      }
    ]
  },
  "creature-temperbrand": {
    "description": "Marca-têmpera é um elemental de cerca de 4,3 m de altura com uma forma que lembra um anão, mas parece feita inteiramente de metal aquecido laranja e branco. Lâminas formam-se e colapsam na pele, o metal dobrando-se sobre si sem parar enquanto ela se move e luta, mas os comprimentos semelhantes a espadas que substituem as mãos permanecem no lugar o tempo todo. Ela luta com gosto feroz, fatiando inimigos enquanto os membros ou se transformam em lâminas flamejantes ou ejetam estilhaços de metal do corpo, impelidos por bolsões de vapor e ar superaquecido.\n\nMarca-têmpera foi criada por Gorum como a encarnação das armas modernas e do potencial da forja para criar qualquer instrumento de guerra. É a fusão de Forgeheart, um elemental do fogo poderoso, e Slageater, um elemental do metal poderoso. Gorum fez os dois elementais lutarem lado a lado por 300 anos antes de fundi-los numa entidade só.\n\nMarca-têmpera é muitas vezes enviada para reforçar soldados que estão em desvantagem numa tentativa de equilibrar as chances no campo de batalha, tornando a guerra mais espetacular aos olhos de Gorum. Pode aparecer diante de um intendente e fornecer tantas lâminas, escudos e trajes de armadura quantos forem necessários, criando os armamentos do próprio corpo.",
    "sections": [
      {
        "id": "temperbrand-s-corpse",
        "title": "O Cadáver de Marca-têmpera",
        "body": "Ainda não aconteceu com o elemental poderoso, mas se Marca-têmpera for abatida, o corpo colapsa depressa sobre si mesmo, transformando-se numa marreta mágica poderosa que leva o nome dela."
      }
    ]
  },
  "creature-the-first-blade": {
    "description": "O Arauto de Gorum, Deus da Guerra, diz-se ter sido formado de uma lasca de aço sem pensamento estilhaçada da lâmina de Gorum éons atrás. Como ferramenta viva de guerra, a Primeira Lâmina foi reforjada inúmeras vezes por Gorum conforme a face da guerra evolui. A Primeira Lâmina não se identifica com nenhuma ancestralidade em particular; um espelho de seu mestre, a armadura e a arma em si servem de corpo — só o vazio jaz dentro. Também como Gorum, a Primeira Lâmina identifica-se como homem.",
    "sections": []
  },
  "creature-thrune-champion-army": {
    "description": "Quando a Casa Thrune afirmou a autoridade sobre todos os Cavaleiros Infernais, os dispostos a declarar lealdade aos governantes de Cheliax uniram-se a campeões da fé asmodeana para impor a vontade de sua Majestrix Infernal.",
    "sections": []
  },
  "creature-twilight-talon-infiltrator-team": {
    "description": "Essas equipes de agentes de campo andorenos de elite possuem treinamento especializado em executar operações encobertas. Muitas foram recentemente destacadas para Isger para auxiliar os insurgentes da Liga dos Quebra-Inferno a lançar fora o jugo da opressão chelaxiana.",
    "sections": []
  },
  "creature-two-tusk": {
    "description": "O slurk é uma fera anfíbia pegajosa, com presas, encontrada em covis e cavernas subterrâneas. Tem duas presas enormes que usa para golpear presas e lutar com slurks rivais. Com a habilidade natural de escalar paredes e grudar-se sem esforço em tetos, exploradores de cavernas desatentos podem acabar do lado errado dessas presas de marfim formidáveis.\n\nSlurks exalam dois tipos muito diferentes de secreções fedorentas pela pele branco-pálida. Pústulas grandes nas costas pingam uma gosma resinosa pegajosa que endurece rápido ao contato com o ar. Ao flexionar a pele, o slurk pode estourar essas pústulas na direção de intrusos, cobrindo inimigos de gosma pegajosa e limitando muito a capacidade de resistir aos outros ataques do monstro, inclusive aos efeitos da outra secreção. Glândulas no ventre excretam uma gordura incrivelmente escorregadia e fétida, que protege o slurk dos efeitos imobilizadores da própria gosma das costas e ainda dificulta muito agarrá-lo e capturá-lo. A melhor forma de descobrir se há um slurk por perto é procurar torrões endurecidos dessa gordura, que se acumulam e secam em cantos de cavernas e entre pilhas de pedras onde slurks descansam entre as refeições.\n\nAcredita-se que slurks sejam descendentes de uma tentativa fracassada de anões de domesticar e criar sapos subterrâneos grandes como alimento e animais de trabalho. Apesar desse aparente fracasso, outros que vivem no subsolo frequentemente fazem amizade com slurks. Os anfíbios pegajosos são extremamente desejáveis para kobolds (página 210), que agora os domesticam e treinam como montarias e guardiões poderosos. Embora outras criaturas, especialmente boggards, às vezes treinem slurks como guardiões, kobolds continuam sendo quem mais os usa. Um kobold montado num slurk costuma se esconder nas bordas superiores de uma caverna, usando altura e surpresa para atormentar inimigos com ataques à distância. Cavaleiros kobold também aproveitam a capacidade de escalada do slurk e investem contra inimigos pelas paredes da caverna.",
    "sections": []
  },
  "creature-undead-murder": {
    "description": "",
    "sections": []
  },
  "creature-valkyrie-tempest": {
    "description": "Embora valquírias tendam a viajar sozinhas ou em grupos pequenos de duas ou três, não hesitam em recorrer ao velho ditado de \"a união faz a força\".",
    "sections": [
      {
        "id": "tempest-cavalry",
        "title": "Cavalaria da Tempestade",
        "body": "Uma tempestade valquíria muitas vezes entra em batalha nas costas de pégasos ou outras montarias voadoras. Nesse caso, a tropa da tempestade valquíria ganha a habilidade a seguir. **Tropa Montada** Efeitos que visam apenas animais ou apenas humanoides podem não funcionar na tempestade valquíria, a critério do Mestre."
      }
    ]
  },
  "creature-vatumledor": {
    "description": "Quando o mundo era jovem, Achaekek era o árbitro dos deuses. Agia como juiz e executor de qualquer um que se opusesse a eles. Quando pedido, também refreava a força de deuses desordeiros que ameaçavam o que as deidades haviam criado. Porém, quando uma aliança do divino se ergueu para opor-se ao deus Rovagug e aprisioná-lo no Vault Morto, Achaekek já havia perdido o caminho e recuado para o esconderijo.\n\nPassariam éons incontáveis antes que Achaekek começasse a interagir com o mundo de novo, ponto em que uma família de dragões que respeitava paz e ordem ouviu os sussurros de Achaekek. Cuidaram da deidade sofredora, tanto quanto qualquer mortal — mesmo um dragão — poderia cuidar de um deus, e a adoração e a recitação diária dos ensinamentos dele ajudaram a refocar Achaekek. Milênios passaram, e a família de dragões gerou ninhadas novas, envelheceu e morreu, e dragões mais jovens tomaram o lugar.\n\nQuando humanos, especificamente os azlanti, descobriram Achaekek, adoraram-no como o deus dos monstros e dos desastres naturais, inspirados pela forma horrenda e pela natureza violenta. Os dragões infiltraram-se em silêncio na sociedade azlanti e tentaram ensinar aos azlanti o verdadeiro propósito de Achaekek, mas eles não ouviram. E assim a família de dragões guardou o propósito original e o papel antigo para si, optando por esperar por um tempo em que esses mortais de vida curta estivessem prontos para compreender. Quando a Queda da Terra devastou Golarion, porém, essa família de dragões pereceu, e a fé de Achaekek recuou de novo à obscuridade.\n\nPor milhares de anos, a fé de Achaekek permaneceu oculta até seu legado ser descoberto por um poderoso dragão conspirador chamado Szandinal. Mais tomado pelo legado dos dragões misteriosos que mantiveram a fé do deus viva, Szandinal reviveu a adoração de Achaekek entre irmãos e filhos. Com o tempo, uma nova dinastia dracônica associada ao Deus Louva-a-deus surgiu. Observaram com diversão os assassinos do Louva-a-deus Vermelho subirem ao poder, e marcaram o modo pelo qual Achaekek e esses assassinos pareciam influenciar uns aos outros cada vez mais a cada século. Ao longo dos anos, essa família de dragões conspiradores nunca cresceu particularmente grande, mas a cada nova geração os dragões tornaram-se mais devotos a Achaekek, deleitando-se no saber oculto que só eles conheciam sobre o deus e venerando-o nos modos antigos como um deus da arbitragem em vez do assassinato.\n\nA tragédia atingiu em 4534 CA, quando a então Senhora do Sangue Behezamine descobriu a existência dessa \"conspiração de dragões heréticos\" que veneravam Achaekek em segredo. Reuniu suas assassinas melhores e mais promissoras e caçou os cinco herdeiros sobreviventes de Szandinal e os assassinou. Porém um dragão, Vatumledor, escapou à sua atenção — em não pequena parte devido a uma conspiração entre ele e uma das seguidoras mais ambiciosas de Behezamine, uma assassina talentosa mas não provada chamada Jakalyn. Em troca de sua ajuda para escapar da ira da Senhora do Sangue Behezamine, Vatumledor tornou-se um confidente próximo e aliado de Jakalyn. Com o tempo, essa aliança oculta não só ajudaria a aumentar a influência e o poder de Jakalyn — culminaria em ela destituir Behezamine, um ato que Vatumledor considerou a justiça de Achaekek pelo que ela fez à sua família. Com o talento de tecer conspirações e alterar registros históricos, Vatumledor desempenhou um papel-chave no apagamento de Behezamine da própria história por Jakalyn.\n\nVatumledor ainda serve como aliado secreto de Jakalyn e, nessa capacidade, age como guia e aliado dos PCs. Sempre ávido para participar de conspirações, o plano complicado de apanhar os traidores ocultos que tramam contra Jakalyn de dentro das fileiras dos Vernai deleita o senso de ironia do dragão. Por ora, trabalha para manter a liderança atual do Louva-a-deus Vermelho em vez de conspirar por sua mudança. Uma vez que por fim traga os PCs à sua confiança no fim do Capítulo 1, torna-se um aliado potente e uma fonte de informação a que podem recorrer.",
    "sections": []
  },
  "creature-young-monitor-lizard": {
    "description": "",
    "sections": []
  },
  "creature-zaiho": {
    "description": "",
    "sections": []
  },
  "creature-zombie-bear": {
    "description": "",
    "sections": []
  },
  "creature-zombie-desecrator": {
    "description": "",
    "sections": []
  },
  "creature-zungur": {
    "description": "Boggards são humanoides anfíbios agressivos que prosperam em pântanos, charcos e até em algumas florestas tropicais. Saem do ovo como girinos e competem ferozmente por comida — inclusive comendo os irmãos nessa briga. Em 3 anos, os sobreviventes desenvolvem braços, pernas e pulmões enquanto aprendem o rudimento da caça, dos ofícios e da guerra — tudo que precisam para sobreviver numa sociedade em que a força faz o direito. No topo da maioria das hierarquias boggard reina um vidente-do-pântano corpulento, imbuído de magia divina sinistra.",
    "sections": []
  }
}
