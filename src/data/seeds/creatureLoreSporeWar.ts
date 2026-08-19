import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das criaturas de Spore War. */
export const CREATURE_LORE_SPORE_WAR: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-briargeist": {
    "description": "Briargeists são verdorites exclusivos de Tanglebriar. Milênios embebidos na influência corruptora de Treerazer concederam-lhes força bem maior ao mesmo tempo que distorceram as formas, afastando-as do vagamente humanoide rumo a um emaranhado animado de videiras espinhosas, raízes e crescimentos fúngicos.",
    "sections": []
  },
  "creature-crowded-veil": {
    "description": "Só existe um véu apinhado, mas ele existe como entidades separadas em muitos corpos diferentes. Como cada membro \"individual\" compartilha uma essência extraplanar central com os demais, a comunicação entre eles move-se sem respeito a fronteiras planares ou às limitações da distância, permitindo transmissão rápida de informação por Tanglebriar e além.",
    "sections": [
      {
        "id": "the-many-are-one",
        "title": "Os Muitos São Um",
        "body": "Uma colônia de hospedeiros do véu apinhado parece desconectada a um observador casual. Como fungos inteligentes e móveis, podem afastar-se longe dos irmãos clonais, mas não conseguem ir além das regiões que sustentam o crescimento. Em Golarion, isso limita o véu apinhado a Tanglebriar apenas."
      }
    ]
  },
  "creature-degholau": {
    "description": "Degholaus formam-se de almas miseráveis que traíram as sociedades para fins malignos ou por ganho pessoal. Esses infernais lembram humanoides bestiais e inchados com rostos sem olhos semelhantes a toupeiras. Têm cinco caudas, todas com olhos vermelho-sangue.",
    "sections": [
      {
        "id": "high-crimes",
        "title": "Crimes Hediondos",
        "body": "Aqueles cujas almas se tornam degholaus abusaram de posições de autoridade na nação por ganho pessoal ou simplesmente por uma necessidade de crueldade. Podem ter vendido segredos, enfraquecido instituições ou iniciado ação militar contra o próprio povo. Alguns a princípio se iludiram acreditando que as ações eram justas ou sem vítimas, mas por fim abraçaram o papel destrutivo, danificando a alma tão completamente que se transformam nesses demônios após o julgamento."
      }
    ]
  },
  "creature-devasance": {
    "description": "Devasances em geral são sentidas antes de serem vistas, pois constantemente extraem vitalidade das criaturas ao redor. No Vazio, a aura de uma devasance pode ser facilmente confundida com um bolsão de energia planar particularmente potente, sobretudo quando se fundem à escuridão ao redor. Sem pernas e incorpóreas, com olhos vermelhos brilhantes, essas criaturas vagamente humanoides costumam ser confundidas com sombras, espectros ou outras formas de mortos-vivos incorpóreos.",
    "sections": [
      {
        "id": "summoned-to-the-netherworld",
        "title": "Evocadas ao Mundo Inferior",
        "body": "Devasances podem ser encontradas no Mundo Inferior, onde às vezes são evocadas para servir. A habilidade de drenar luz as torna aliadas poderosas entre os planos. Porém, o Mundo Inferior nem sempre está preparado para controlar a essência do vazio, e devasances raramente compreendem o conceito de diplomacia planar."
      }
    ]
  },
  "creature-eshmok": {
    "description": "Eshmoks são prova de que a raiva consome uma criatura. Formados de almas iradas, esses demônios lembram vespas humanoides gigantes que caíram vítimas de fungos parasitários. O material fibroso de aparência fétida do fungo é uma manifestação física da ira. Gavinhas dele irrompem dos corpos de eshmok, emitindo esporos indutores de fúria, enquanto treliças de crescimentos semelhantes a ninhos nos torsos abrigam infestações de vespas.",
    "sections": [
      {
        "id": "wrathful-parasites",
        "title": "Parasitas da Ira",
        "body": "Os enxames que infestam um eshmok não são seus aliados, e sim encarnações da raiva que servem para assediar e agonizar a criatura sem cessar. Alguns sustentam que essas vespas são manifestações da vingança de Calistria, mas seus fiéis acreditam em algo mais próximo da verdade — que essas vespas representam um escárnio da vingança e uma corrupção da fúria dirigida que sua deusa ensina e encarna. Eshmoks são particularmente odiados por adoradores de Calistria em consequência."
      }
    ]
  },
  "creature-grizzer": {
    "description": "Esses lagartos fey desengonçados são conhecidos por dois traços. Primeiro, parecem ridículos quando correm, disparando nas pernas traseiras enquanto agitam as dianteiras desvairadamente no ar. Segundo, são ladrões inveterados com a habilidade de armazenar uma quantidade extraordinária de bens no estômago. Muitos grizzers apareceram nos Reinos Fluviais há pouco mais de 10 anos, mas várias caçadas coordenadas os empurraram mais para o sudoeste, onde começaram a prosperar nas florestas de Razmiran.",
    "sections": [
      {
        "id": "strange-fey-appetites",
        "title": "Apetites Fey Estranhos",
        "body": "O apetite estranho de um grizzer não é único entre fey. Azarpals, por exemplo, conseguem armazenar comida nas panças e infundi-las com venenos que devastam festins e banquetes. Histórias de baleias nadando em mares de outro mundo que engoliram vilarejos inteiros, ou de fey serpentinos dúplices que assumem as formas daqueles que consomem, sugerem que fey com apetites estranhos não são tão incomuns no Primeiro Mundo."
      }
    ]
  },
  "creature-imvath": {
    "description": "Alguns demônios encarnam métodos sutis na busca de tentar mortais a cair em pecado para que as almas sejam condenadas às Fendas Exteriores. Outros abraçam brutalidade e devastação e buscam, em vez disso, arruinar vidas e realizações mortais. O imvath é as duas coisas, pois seus sussurros encorajam mortais a buscar não só a própria destruição, mas também a destruição de seus mundos, para que o imvath possa desfrutar o espetáculo da extinção. Felizmente raros, imvaths surgem das almas de mortais cujos atos chegaram perto de extinguir mundos — ou de fato os extinguiram.\n\nUm imvath aparece como um humanoide andrógino, imponente e pálido com quatro olhos vermelhos, uma boca desproporcional repleta de presas e dezenas de esporões vermelho-sangue. Um braço é musculoso, enquanto o outro é magro. As pernas terminam em cascos flamejantes, enquanto uma cauda de leão e asas de morcego completam o corpo.",
    "sections": [
      {
        "id": "imvath-goals",
        "title": "Metas do Imvath",
        "body": "Seja como generais entre exércitos demoníacos ou como assassinos e sabotadores de nações, imvaths sabem que a destruição de um mundo exige tempo e dedicação. Quando não estão ativamente desfrutando a devastação planetária, emprestam os talentos de ruína àqueles cujo trabalho pode colocar um mundo exatamente nesse caminho rumo à perdição."
      }
    ]
  },
  "creature-invidiak": {
    "description": "Um invidiak não tem corpo físico e nasce de um profundo senso de inveja por essa falta. Um invidiak só se sente propriamente \"vivo\" quando está possuindo um hospedeiro. Em muitos casos, um invidiak permanece dormente nesse hospedeiro, passando meses, até anos, observando de dentro e construindo a influência sobre o hospedeiro aos poucos, de modo a causar o máximo de desespero duradouro e trauma emocional aos amigos e à família do hospedeiro.",
    "sections": [
      {
        "id": "lengthy-possessions",
        "title": "Possessões Prolongadas",
        "body": "Um invidiak pode possuir um hospedeiro favorecido por um tempo ilimitado e, ao longo de anos, sua influência pode resultar em o hospedeiro ganhar poderes sobrenaturais novos e únicos que crescem dessa corrupção espiritual. Tais poderes só funcionam enquanto a possessão dura; se o invidiak for forçado para fora do corpo, esses poderes desaparecem e não retornam, mesmo que o invidiak mais tarde repossua o mesmo hospedeiro. Esses invidiaks únicos são em geral bem mais poderosos do que o típico apresentado aqui."
      }
    ]
  },
  "creature-klacktel": {
    "description": "Em lugares onde os mortos são descartados em volumes tão grandes que os restos começam a parecer mais terreno do que corpos, em reinos onde a energia do vazio flui forte e busca qualquer fragmento de outrora-vida para infundir, em áreas tão saturadas de emoções negativas e agonia como a Amaranthine Oubliette, não surpreende que os restos descartados de prisioneiros ao longo das eras tenham se tornado monstros.\n\nAo longo das eras, carcereiros passados da Oubliette permitiram que alguns desses enxames letais escapassem para outros planos por razões inescrutáveis próprias. Uma vez encalhado em outro lugar no Grande Além, a dor de ser cortado do Vazio impele o klacktel a um massacre implacável que só para quando é destruído.",
    "sections": [
      {
        "id": "cursed-treasure",
        "title": "Tesouro Amaldiçoado",
        "body": "Conforme um klacktel rola sobre qualquer coisa que cruze o caminho, entulho e itens descartados inevitavelmente são tragados para a massa, acrescentando-se ao emaranhado de ossos. Quando um klacktel é morto, os ossos apodrecem depressa num piche fétido, mas aqueles itens ainda restantes na massa que não foram moídos a pó tombam ao chão. Itens mágicos que permaneceram tempo demais dentro de um klacktel podem tornar-se corrompidos e amaldiçoados."
      }
    ]
  },
  "creature-miastrilek": {
    "description": "Quando em sua forma verdadeira, miastrileks têm aparência semelhante a aranha. Porém, preferem formas humanoides ao interagir com mortais, posando como figuras ricas ou influentes como nobres, mercadores ou líderes de organizações criminosas.",
    "sections": [
      {
        "id": "polluters-of-flesh",
        "title": "Poluidores da Carne",
        "body": "Miastrileks são demônios associados à poluição e à corrupção, mas diferente do omox (um demônio que surge de almas que rotineiramente sujavam e poluíam o entorno ambiental em vida), o pecado do miastrilek está mais focado na poluição e corrupção da carne — como aqueles que em vida dirigiam teias complexas de corrupção na sociedade que fabricavam e distribuíam drogas que arruinavam comunidades, ou usavam poluição e toxinas para torturar e transformar as vítimas."
      }
    ]
  },
  "creature-mugrisant": {
    "description": "Mugrisants são manifestações da capacidade das Fendas Exteriores para transformação destrutiva. O ciclo de transformação sem fim desse qlippoth lhes dá um apetite insaciável. Embora um mugrisant possa derivar nutrição de qualquer carne, não precisa comer para sobreviver, e favorece presas fortes o bastante para oferecer um pouco de luta antes de serem devoradas, quase virando os corpos do avesso para engolir criaturas quase tão grandes quanto eles.",
    "sections": [
      {
        "id": "constant-horrific-change",
        "title": "Mudança Constante e Horrenda",
        "body": "O corpo de um mugrisant está sempre consumindo a si mesmo e gerando órgãos novos. Embora alguns desses novos membros do corpo apareçam em locais funcionais, o resto é puxado rumo ao saco de crescimento central do mugrisant, um órgão composto que jaz dentro da maior goela e é usado para distorcer os corpos dos expostos a ele. Raros poucos que são consumidos por um mugrisant não morrem de fato, mas são em vez disso transformados em corpo, mente e alma num qlippoth novo."
      }
    ]
  },
  "creature-rift-pulper": {
    "description": "O triturador da fenda rói a estrutura planar da realidade, comendo quintessência para construir as colmeias hediondas. Essas estruturas bulbosas parecem colmeias de vespa parcialmente derretidas, com a aparência de rostos, braços e pernas distorcidos pressionando as paredes de dentro.",
    "sections": []
  },
  "creature-riftweasel": {
    "description": "Riftweasels têm gavinhas longas e finas ao longo dos focinhos que funcionam como bigodes ao sentir movimento; essas concedem às riftweasels o sentido de tremor preciso para localizar larvas deliciosas e outros catadores enquanto se escondem dentro de cadáveres maiores.",
    "sections": [
      {
        "id": "sadistic-scavengers",
        "title": "Catadores Sádicos",
        "body": "Como catador, a riftweasel é bastante inteligente, embora também encontre grande deleite em atormentar criaturas. Não hesita em arranjar vítimas em encenações desagradáveis, e particularmente gosta de alimentar-se de criaturas paralisadas, comendo partes do corpo que não matam depressa. Uma vez que uma vítima morre, gostam de usar _cadáver falante_ para zombar e interrogar as refeições enquanto as terminam. Os submetidos a uma visão da morte por uma riftweasel em geral veem a si mesmos comidos e zombados após a morte pela criatura cruel."
      }
    ]
  },
  "creature-root-rotter": {
    "description": "Apodrecedores-de-raiz são tudo o que resta dos infelizes residentes élficos de Greengold. Alguns morreram nas explosões iniciais de esporos de Jeharlu, enquanto outros sucumbiram à infestação por sinmolds. Fungo agora criva os corpos, envolvendo-se em torno dos cérebros e nervos para reanimá-los.",
    "sections": [
      {
        "id": "corruption-spreaders",
        "title": "Espalhadores de Corrupção",
        "body": "Um apodrecedor-de-raiz que permanece no lugar por 24 horas faz uma emanação de 1,5 m ficar coberta de fungo desagradável e fétido. Essa expansão aumenta em 1,5 m para cada 24 horas adicionais que o apodrecedor-de-raiz permanece imóvel, até uma área máxima de uma emanação de 18 m após 12 dias de espreita imóvel. Esse fungo é permanente enquanto tiver uma fonte de nutrição, mas pode ser destruído com a mesma facilidade que qualquer mancha de fungo mundano."
      }
    ]
  },
  "creature-second-spawn": {
    "description": "O corpo de madeira de um segundo engendro racha a cada movimento, como se a própria estrutura protestasse contra a mobilidade abominável. Cultivados de arbóreos nativos do Plano da Madeira, o maior dos segundos engendros — na prática, o \"Primeiro Engendro\" — é a fortaleza móvel de Treerazer, o Witchbole.",
    "sections": []
  },
  "creature-shroud-moss": {
    "description": "Musgos-mortalha muitas vezes são confundidos com fantasmas, pois aparecem como uma impressão cintilante e insubstancial de uma criatura falecida. Na verdade, nada do falecido permanece dentro de um musgo-mortalha. Em vez disso, o que parece um fantasma é uma imagem criada por nuvens de esporos cintilantes envolvendo as gavinhas tênues do próprio musgo. Quando não disfarçado por uma forma roubada, um musgo-mortalha aparece como uma massa de gavinhas de musgo cinza-verde capazes de mudar a forma no arcabouço básico de uma criatura, parecendo não diferente de um sistema nervoso humanoide autônomo com uma massa de emaranhados onde um cérebro estaria.",
    "sections": [
      {
        "id": "grayshroud-sufferers",
        "title": "Sofrentes de Mortalha-Cinzenta",
        "body": "Os que se infectam com mortalha-cinzenta podem a princípio presumir que só sofrem de excesso de esforço ou falta de sono, mas uma vez que fiquem drenados pela doença, a carne torna-se cada vez mais cinza e crivada de lâminas escamadas conforme a pele assume a aparência de casca descascando. Os que morrem de mortalha-cinzenta seguem ao além como o normal, mas os restos geram um musgo-mortalha novo que acrescenta a forma às formas roubadas."
      }
    ]
  },
  "creature-sinmold": {
    "description": "Sinmolds surgem da corrupção forjada pelas maquinações de Treerazer. Conforme a terra se transforma, atrai almas destinadas aos Reinos Exteriores. Essas almas coalescem corpos de lodo fúngico, gerando infernais amorfos que caçam vorazmente mais matéria biológica usando pseudópodes semelhantes a clavas ou gavinhas semelhantes a chicotes que cortam com facilidade carne e osso igualmente.",
    "sections": [
      {
        "id": "demonic-transformation",
        "title": "Transformação Demoníaca",
        "body": "Um sinmold que devorou muitas criaturas ao longo de um período de 1 a 2 semanas endurece o exterior num casulo e se metamorfoseia num demônio. Essa transformação leva 3 dias, durante os quais o sinmold está inconsciente, aumenta a CA para 37 e os PV máximos para 400, e ganha Dureza 10. Sinmolds procuram um lugar seguro para transformar-se, como um abrigo subterrâneo ou um dossel denso no alto das árvores, embora alguns simplesmente comam até se encasular. Os pecados que a alma cometeu em vida determinam o demônio que um sinmold se torna, de modo que a forma resultante pode ficar de nível mais alto ou mais baixo, conforme determinado pelo Mestre."
      }
    ]
  },
  "creature-spawn-of-jeharlu": {
    "description": "Engendros de Jeharlu em geral pairam nos céus acima do reino de Jeharlu, contentes em desfrutar sonhos e fantasias blasfemas e horrendas enquanto vigiam o mundo fúngico abaixo em busca de intrusos. Não está longe da marca igualar um engendro de Jeharlu a um glóbulo branco, exceto que neste caso o corpo que defendem é Jeharlu. Encontrado além deste reino, o papel de um engendro se inverte — agora desempenham a parte de agentes infecciosos, buscando espalhar corrupção pelo solo, vegetação e vida carnuda por onde passam.",
    "sections": [
      {
        "id": "from-jeharlu-spores",
        "title": "De Esporos de Jeharlu",
        "body": "Treerazer usa Esporos de Jeharlu como lance de abertura contra Kyonin numa tentativa de espalhar pragas fúngicas de modo súbito e explosivo. Esses mesmos esporos, deixados a germinar nas Fendas Exteriores, em vez disso desenvolvem-se em engendros de Jeharlu."
      }
    ]
  },
  "creature-swamp-blight": {
    "description": "Uma praga do pântano aparece como uma bolha trêmula de lama râncida marrom e verde da qual dezenas de olhos vermelhos odientos espreitam.",
    "sections": [
      {
        "id": "swampy-undead",
        "title": "Mortos-Vivos Pantanosos",
        "body": "Embora uma praga do pântano possa dominar mortos-vivos em seu domínio amaldiçoado, prefere usar esse poder para reunir e controlar mortos-vivos que prosperariam num ambiente pantanoso. Ao montar um encontro com uma praga do pântano, considere ajustar mortos-vivos existentes para combinar mais tematicamente com o ambiente de pântano, e evite usar mortos-vivos que não fariam sentido em tal região. Ajustar as magias inatas de uma criatura morta-viva para magias primais associadas a regiões pantanosas é um ótimo jeito de alcançar essa personalização."
      }
    ]
  },
  "creature-tithekeeper": {
    "description": "Os sacerdotes mais poderosos de Razmir destacam cobradores-de-dízimo para garantir que seus seguidores não desenvolvam dedos leves. Esses construtos semelhantes a zigurates têm mais de duas dúzias de pernas e uma boca semelhante a uma armadilha. No topo, uma máscara com uma fita colorida anexada denota o posto simbólico na Igreja de Razmir.",
    "sections": [
      {
        "id": "instruments-of-terror",
        "title": "Instrumentos de Terror",
        "body": "Embora a função primária do cobrador-de-dízimo seja coletar moedas, são capazes de grande violência. Sacerdotes que determinam que um vilarejo está atrasado demais nos pagamentos podem fazer o cobrador-de-dízimo espetar múltiplos residentes e agitar os corpos das vítimas no ar enquanto desfila pelas ruas. Os que sobrevivem à provação ficam altamente motivados a evitar uma experiência repetida."
      }
    ]
  },
  "creature-vansidieth": {
    "description": "Vansidieths erguem-se das almas de políticos ou generais cujo orgulho resultou em grande sofrimento social e tragédia.",
    "sections": [
      {
        "id": "demonic-generals",
        "title": "Generais Demoníacos",
        "body": "Embora alguns considerem demônios monstros briguentos conhecidos mais por lutas internas do que por unir-se num único exército, a história da Ferida do Mundo ensina uma lição importante. Um demônio poderoso pode organizar hordas demoníacas numa máquina de guerra incrivelmente destrutiva, e vansidieths muitas vezes lideram esses exércitos como generais, extraindo cooperação da ralé infernal."
      }
    ]
  }
}
