import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE_2 = 'Monster Core 2'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE_2, ...partial }
}

/**
 * Lore de família Remaster para o 8º lote do Monster Core 2.
 * Famílias já existentes (nefilim, strix, asura, ozthoom, sportlebore,
 * esqueleto) não se repetem.
 */
export const catalogCreatureFamiliesMonsterCore2Batch8: CreatureFamily[] = [
  fam({
    id: 'family-vishkanya',
    name: "Vishkanya",
    originalName: "Vishkanya",
    trait: "Vishkanya",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=632",
    intro:
      "De longe, vishkanyas compartilham mais que uma semelhança passageira com humanos. Porém, uma inspeção mais próxima revela olhos ofídicos de coloração dourada ou branca, uma língua bífida e escamas minúsculas e lisas dispostas em padrões serpentinos sobre a pele. Mesmo assim, a maioria dos observadores assume que esses traços indiquem herança nefilim ou magia dracônica, nunca suspeitando o quão verdadeiramente incomum é o sujeito da especulação.\n\nEntre forasteiros, pouco se sabe da ancestralidade vishkanya além de que um vishkanya carrega um veneno potente no sangue e na saliva, conhecimento que levou a medo e desconfiança generalizados. Para evitar perseguição, vishkanyas assimilam-se em silêncio às sociedades escolhidas e mantêm uma cultura de sutileza pesada. Essa vida clandestina pode atraí-los a trabalhos que lhes permitem pôr as habilidades em bom uso, e muitas vezes assumem os papéis de espião, mercenário, guarda-costas e até assassino. Algumas das guildas mais conhecidas do mundo empregam vishkanyas, inclusive os implacáveis Assassinos do Louva-a-Deus Vermelho e o famoso Conservatório Grand Sarret para cortesãos no Reino Impossível de Jalmeray. Na maioria dos casos, esses empregadores conhecem a verdadeira identidade do empregado, mas nem sempre.\n\nDevido às medidas que precisam tomar para garantir a sobrevivência, vishkanyas não se reúnem abertamente. Em vez disso, encontram-se em segredo, criando redes de apoio e órgãos consultivos. Liderando esses encontros estão as mulheres vishkanya mais respeitadas, que trabalham com diligência para manter a ancestralidade e as tradições vivas. Essas comunidades subterrâneas espalham-se devagar, e deixá-las significa abandonar o pouco de apoio social e cultural que um vishkanya tem. Como resultado, muito poucos vishkanyas emigraram das terras natais vudranas para a região do Mar Interior ou outras terras.",
    sections: [
      {
        id: "toxicity",
        title: "Toxicidade",
        body: "Embora a ideia de que vishkanyas consigam administrar o veneno com um mero toque seja um mito, alguns vishkanyas poderosos conseguem concentrar as toxinas inatas, resultando em veneno mais potente ou venenos com efeitos diferentes.",
      },
    ],
  }),
  fam({
    id: 'family-ravener',
    name: "Ravener",
    originalName: "Ravener",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=617",
    intro:
      "Embora a expectativa de vida possa medir milênios, todos os dragões devem perecer um dia. Enquanto muitos caem nas lâminas ou magias de caçadores de dragões, alguns sobrevivem aos inimigos e, com o tempo, enfrentam a verdade que espera todas as criaturas vivas no fim da vida natural. Como muitas outras criaturas, alguns dragões reagem mal a esses lembretes da mortalidade, e os particularmente orgulhosos ou irados de sua espécie muitas vezes explodem em fúria diante dessa verdade sombria. Paz e aceitação são achadas por alguns dragões, mas os mais teimosos (e invariavelmente os mais perversos) podem buscar outra resposta. Esses dragões procuram ritos sinistros que os transformam em mortos-vivos conhecidos como raveners.\n\nA carne de um ravener é arrancada como parte da transformação, restando só ossos. O que perdem em carne, porém, ganham em poder que rasga almas, pois a energia espiritual forma uma barreira protetora em torno do corpo, mantendo-o intacto e permitindo o voo com asas agora esqueléticas. Essa existência não é tão fácil de manter quanto outras formas de mortos-vivos, e o ravener precisa alimentar-se regularmente de almas vivas para alimentar o metabolismo profano. A fome é muito maior que a de um dragão vivo, então raveners são forçados a mudar de lugar com regularidade, viajando a novos terrenos de caça cada vez que esgotam a presa do lar atual.",
    sections: [
      {
        id: "ravener-lairs",
        title: "Covis de ravener",
        body: "Astutos e paranoides, raveners preferem fazer covis em lugares hostis à vida mortal: no alto de picos tão elevados que criaturas vivas lutam para respirar o ar rarefeito, submersos sob poças de magma na caldeira de um vulcão ativo, e assim por diante. Alguns raveners chegam a encher deliberadamente o covil inteiro de gases letalmente venenosos, e raveners capazes de conjuração avançada muitas vezes selam os covis por completo, acessando-os exclusivamente via magias como teletransporte ou forma de vapor. É claro que raveners precisam alimentar-se dos vivos para persistir, então nunca situam os covis tão longe de fontes de vida que morreriam de fome.",
      },
      {
        id: "ravener-minions",
        title: "Lacaios de ravener",
        body: "Raveners encaram a maioria das criaturas mortas-vivas com pouco mais respeito do que têm pelas vivas, mas muitas vezes as usam como servos. Preferem mortos-vivos incorpóreos como fantasmas e espectros a lacaios tão toscos e simples quanto esqueletos e zumbis.\n\nEmbora a maioria dos dragões seja orgulhosa demais para pedir ajuda a quem quer que seja, até mesmo aos deuses, alguns que buscam tornar-se raveners estão tão desesperados para adiar a morte que podem recorrer a patronos poderosos, como senhores demônios, deidades profanas ou necromantes poderosos, oferecendo serviço em troca da transformação.",
      },
      {
        id: "ravener-treasure",
        title: "Tesouro de ravener",
        body: "Como mudam de covil com mais frequência que dragões vivos, raveners preferem tesouro compacto e fácil de transportar. Em vez de montanhas espalhadas de moedas, tendem a preferir gemas preciosas, objetos de arte e sobretudo itens mágicos, particularmente itens mágicos que sejam capazes de usar.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-cinder',
    name: "Dragão de Cinzas",
    originalName: "Dragon, Cinder",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=582",
    intro:
      "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "Alguns dragões de cinzas queimam com mais ou menos ferocidade, ganhando habilidades diferentes da maioria da espécie. Você pode ajustar um dragão de cinzas de qualquer idade substituindo Frenesi Dracônico, Presença Aterradora ou Avivar as Chamas por qualquer uma das habilidades a seguir.\n\n**Nuvem de Cinzas** (primal) O dragão sopra uma nuvem de cinzas e fumaça pelas escamas, cercando-se numa emanação de 4,5 m que dura até o fim do próximo turno. Todas as criaturas dentro da nuvem ficam ocultas tanto à visão quanto ao faro, e todas as criaturas fora da nuvem ficam ocultas às criaturas dentro dela. Qualquer criatura que entre na área ou comece o turno nela deve tentar uma salvaguarda de Fortitude com CD igual à do Sopro da Pira do dragão. **Sucesso** A criatura não é afetada. **Falha** A criatura começa a tossir e, até o início do próximo turno, deve passar num teste simples CD 5 se tentar qualquer ação que exija falar, ou perde a ação. **Falha crítica** Como falha, mais deve gastar imediatamente a próxima ação tossindo.\n\n**Aura Inextinguível** (aura, fogo, infortúnio, primal) 27 m. Chamas queimam debaixo d'água nesta aura e não podem ser apagadas por água não mágica. Quando uma criatura nesta aura tenta um teste simples para encerrar dano de fogo persistente, deve rolar duas vezes e usar o pior resultado.\n\n**Inflamar Emoções** (aura, fogo, mental, primal) O dragão envia uma onda de calor que inflama emoções a até 27 m. Criaturas na área devem tentar uma salvaguarda de Vontade com CD igual à da Presença Aterradora do dragão. Independentemente dos resultados, ficam então imunes a Inflamar Emoções por 1 minuto. **Sucesso crítico** A criatura pode gastar uma reação para fazer um Golpe corpo a corpo contra um alvo de sua escolha. **Sucesso** A criatura não é afetada. **Falha** A criatura imediatamente faz um Golpe corpo a corpo contra um alvo da escolha do dragão. A criatura não pode usar reações até o início do próximo turno.",
      },
      {
        id: "cinder-dragon-spellcasters",
        title: "Conjuradores de dragão de cinzas",
        body: "Cinder dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragões de cinzas jovens\n**Magias primais preparadas DC** 29, ataque +21; **4º** _fire shield_, _mountain resilience_, _wall of fire_; **3º** _dispel magic_, _fireball_, _haste_; **2º** _floating flame_, _mist_, _revealing light_; **1º** _cleanse cuisine_, _fear_, _ventriloquism_; **Truques (4º)** _detect magic_, _ignition_, _message_, _read aura_, _sigil_\n\n### Dragões de cinzas adultos\n**Magias primais preparadas DC** 34, ataque +26; Como o jovem cinder dragon, mais **6º** _cursed metamorphosis_, _truesight_, _wall of fire_; **5º** _blazing bolt_, _fireball_, _toxic cloud_; **Truques (6º)** _detect magic_, _ignition_, _message_, _read aura_, _sigil_\n\n### Dragão de cinzas ancião\n**Magias primais preparadas** DC 41, ataque +33; Como o adulto cinder dragon, mais **9º** _detonate magic_, _falling stars_ (asteroids only); **8º** _desiccate_, _fireball_, _volcanic eruption_; **7º** _execute_, _fiery body_, _volcanic eruption_; **Truques (9º)** _detect magic_, _ignition_, _message_, _read aura_, _sigil_\n\n### Arquidragão de cinzas\n**Magias primais preparadas** DC 45, ataque +37; Como o ancião cinder dragon, mais **10º** _cataclysm_, _indestructibility_; **9º** _massacre_; **Truques (10º)** _detect magic_, _ignition_, _message_, _read aura_, _sigil_",
      },
      {
        id: "sheblis-and-tyrkalis",
        title: "Sheblis e Tyrkalis",
        body: "Depois de aterrorizar os orcs de Belkzen por décadas, este par acasalado de dragões de cinzas adultos alcançou uma paz provisória em troca de ouro. Em meio ao retorno de Tar-Baphon e seu interesse sinistro nos três filhotes, concentraram a fúria nas forças do Tirano Sussurrante, forjando não só um armistício mas uma aliança verdadeira para rechaçar a ameaça morta-viva. Se isso se sustentará para sempre sem a retomada dos pagamentos devastadores dos orcs, só os dragões sabem.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-coral',
    name: "Dragão de Coral",
    originalName: "Dragon, Coral",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=583",
    intro:
      "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "Alguns dragões de coral podem erguer tentáculos aquáticos maciços dos mares ao redor para espancar ou agarrar os inimigos. Para criar um dragão com esta habilidade, substitua Frenesi Dracônico pelo seguinte.\n\n**Ondas Agarradoras** (primal, água) O dragão conjura cinco tentáculos aquáticos de quadrados desocupados cheios de água de sua escolha a até 9 m e tenta um único teste de Atletismo contra a CD de Fortitude de cada criatura adjacente a um tentáculo e a no máximo 3 m acima da superfície da água. Em sucesso, a criatura fica Agarrada (CD para Escapar igual à CD do Sopro Hidráulico do dragão). Em sucesso crítico, ou em sucesso contra uma criatura já Agarrada, o alvo é puxado abaixo da superfície e começa a se afogar. Todos os tentáculos desaparecem no fim do próximo turno do dragão, a menos que o efeito seja Sustentado e um novo teste de Atletismo seja rolado para todos os tentáculos existentes.\n\nOs crescimentos que cobrem o corpo de um dragão de coral podem incluir muitas espécies diferentes, algumas das quais produzem um veneno natural potente. Para criar um dragão com esta habilidade, substitua Biomineralizar pelo seguinte.\n\n**Palitoxina** (veneno) Qualquer criatura que sofra dano do ataque de mandíbulas, garras ou cauda do dragão, ou que Golpeie e cause dano ao dragão com um ataque desarmado, sofre 1d6 de dano de veneno (2d6 para anciãos e arquidragões) e deve tentar uma salvaguarda de Fortitude (CD igual à do Sopro Hidráulico do dragão). **Sucesso** A criatura não é afetada. **Falha** A condição Enfraquecido da criatura aumenta em 1 até o fim do próximo turno, até o máximo de 3. Se a criatura já estiver Enfraquecida 3, fica Drenada 1 em vez disso. **Falha crítica** Como falha, salvo que a condição Enfraquecido aumenta em 2 em vez de 1.\n\nOs dragões de coral mais poderosos podem convocar as incontáveis criaturas minúsculas que habitam os recifes. Para criar um dragão com esta habilidade, substitua a Armadura de Recife de um ancião ou arquidragão pelo seguinte.\n\n**Maré Primal** (concentração, manipular, água) **Requisitos** O dragão está dentro dos limites do recife ou a no máximo 7,5 m dele; **Frequência** 1 vez por hora; **Efeito** O dragão chama dezenas de milhares de criaturas marinhas minúsculas das fendas do recife, que transbordam numa emanação de 15 m num enxame de garras, mordidas e ferroadas. Cada criatura na área que esteja total ou parcialmente submersa na água deve passar numa salvaguarda básica de Reflexos (CD igual à do Sopro Hidráulico do dragão) ou sofre dano perfurante igual à metade do causado pelo Sopro Hidráulico e uma quantidade equivalente de dano de veneno. O dragão pode especificar qualquer número de criaturas na área para serem poupadas. Todas as criaturas convocadas dispersam-se no fim do turno do dragão.",
      },
      {
        id: "coral-dragon-spellcasting",
        title: "Conjuração de dragão de coral",
        body: "Coral dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragão de coral jovem\n**Magias primais preparadas** DC 26, ataque +18; **4º** _hydraulic torrent_, _vapor form_, **3º** _aqueous orb_, _crashing wave_, _slow_; **2º** _mist_, _water breathing_, _water walk_; **1º** _air bubble_, _create water_, _tailwind_; **Truques (4º)** detect magic, _know the way_, _prestidigitation_, _spout_, _stabilize_\n\n### Dragão de coral adulto\n**Magias primais preparadas** DC 32, ataque +24; Como o jovem coral dragon, mais **6º** _chameleon coat_, _petrify_; **5º** _control water_, _crashing wave_, _mariner's curse_; **4º** _mirage_; **Truques (6º)** _detect magic_, _know the way_, _prestidigitation_, _spout_, _stabilize_; **Rituais** DC 32; _commune_ (nature only)\n\n### Dragão de coral ancião\n**Magias primais preparadas** DC 38, ataque +30; Como o adulto coral dragon, mais **8º** _crashing wave_, _desiccate_, _moment of renewal_; **7º** _hydraulic torrent_, _regenerate_, _unfettered pack_; **6º** _slow_; **Truques (8º)** _detect magic_, _know the way_, _prestidigitation_, _spout_, _stabilize_; **Rituais** DC 38; _commune_ (nature only), control weather\n\n### Arquidragão de coral\n**Magias primais preparadas** DC 44, ataque +36; Como o ancião coral dragon mais **10º** _nature incarnate_; **9º** _implosion_, _wrathful storm_; **Truques (10º)** _detect magic_, _know the way_, _prestidigitation_, _spout_, _stabilize_; **Rituais** DC 44; _commune (Nature only)_, _control weather_",
      },
      {
        id: "kamakanaka",
        title: "Kamakanaka",
        body: "O dragão de coral ancião Kamakanaka reina orgulhoso como o autodenominado mestre do Parapeito de Moluune, um recife colossal que se estende por quilômetros sob as águas aquecidas por lava em torno de uma ilha vulcânica maciça no oeste dos Grilhões. Viajantes que enfrentam as águas traiçoeiras muitas vezes fazem oferendas a Kamakanaka lançando moedas, flores e joias ao mar na esperança de passagem segura via orientação direta do dragão.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-despair',
    name: "Dragão do Desespero",
    originalName: "Dragon, Despair",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=584",
    intro:
      "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "Dragões do desespero podem desenvolver modos diferentes de usar o medo a seu favor. Você pode aplicar os ajustes a seguir a um dragão do desespero de qualquer idade.\n\nDragões do desespero que se especializam em atiçar histeria numa população usando lendas urbanas e medos regionais podem moldar esse terror numa forma semifísica. Para criar um dragão com esta habilidade, substitua Pensamentos Indesejados pelo seguinte.\n\n**Manifestar Medo** (auditivo, concentração, ilusão, manipular, mental, olfativo, visual) O dragão do desespero cria uma imagem ilusória de uma criatura referida na superstição local. Isto funciona como _criatura ilusória_, elevada a um círculo igual à metade do nível do dragão. O dado de dano dos Golpes da criatura ilusória aumenta para d6s contra criaturas com a condição Amedrontado. Alguns dragões do desespero podem implantar memórias falsas nas mentes alheias. Para criar um dragão com esta habilidade, substitua Ímpeto Dracônico pelo seguinte.\n\n**Memórias Amaldiçoadas** (aura, mental, infortúnio, oculto) 27 m. Criaturas perto de um dragão do desespero não podem confiar nas próprias mentes. Quando qualquer criatura na aura tenta um teste de perícia para Recordar Conhecimento, deve rolar duas vezes e usar o resultado menor.\n\nO melhor lugar para semear medo é nas sombras. Para criar um dragão com esta habilidade, substitua Frenesi Dracônico pelo seguinte.\n\n**Luzes Apagadas** (escuridão, oculto) O dragão do desespero arrota uma escuridão impenetrável que abrange uma emanação de 9 m. A luz não entra na área e quaisquer fontes de luz não mágicas, como tocha ou lanterna, não emitem luz enquanto estiverem dentro da área, mesmo que o raio de luz se estendesse além da escuridão. Isto também suprime luz mágica de círculo igual à metade do nível do dragão ou menor. A luz não atravessa, então todas as criaturas na área, salvo o dragão, não conseguem ver o lado de fora.",
      },
      {
        id: "despair-dragon-spellcasting",
        title: "Conjuração de dragão do desespero",
        body: "Despair dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragão do desespero jovem\n**Magias ocultas preparadas** DC 28, ataque +20; **4º** _darkness_, _nightmare_; **3º** _mind reading_, _noise blast_, _slow_; **2º** _paranoia_, _stupefy_, _ventriloquism_; **1º** _command_, _ill omen_, _sleep_; **Truques (4º)** _detect scrying_; **Truques (6º)** _detect magic_, _figment_, _haunting hymn_, _message_, _telekinetic projectile_\n\n### Dragão do desespero adulto\n**Magias ocultas preparadas** DC 33, ataque +25; Como o jovem despair dragon, mais **6º** _mislead_, _phantasmal calamity_; **5º** _strange geometry_, _synaptic pulse_, _wave of despair_; **4º** _detect scrying_; **Truques (6º)** _detect magic_, _figment_, _haunting hymn_, _message_, _telekinetic projectile_\n\n### Dragão do desespero ancião\n**Magias ocultas preparadas** DC 40, ataque +32; Como o adulto despair dragon, mais **8º** _canticle of everlasting grief_, _hidden mind_, _pinpoint_; **7º** _mask of terror_, _visions of danger_, wave of despair; **6º** _scrying_; **Truques (8º)** _detect magic_, _figment_, _haunting hymn_, _message_, _telekinetic projectile_o\n\n### Arquidragão do desespero\n**Magias ocultas preparadas** DC 45, ataque +37; Como o ancião despair dragon mais **10º** _fabricated truth_; **9º** _overwhelming presence_, _phantasmagoria_, _wails of the damned_; **Truques (10º)** _detect magic_, _figment_, _haunting hymn_, _message_, _telekinetic projectile_",
      },
      {
        id: "thyndred",
        title: "Thyndred",
        body: "Poucos se dão ao trabalho de perguntar o nome da discreta bibliotecária élfica nos arquivos de Pangolais, mas só uns poucos preciosos conhecem a identidade verdadeira. Quando desce à umidade do covil subterrâneo, reassume a forma do dragão do desespero Thyndred. Tem cuidado para evitar atenção na superfície, mas descobriu que um pergaminho bem colocado — ou talvez um pesadelo oportuno — pode ter bastante influência nos mecanismos já draconianos da Corte Umbral. Essa escalada gradual de aflição entre os membros é particularmente nutritiva para Thyndred.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-phase',
    name: "Dragão de Fase",
    originalName: "Dragon, Phase",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=585",
    intro:
      "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "A maestria de teletransporte de alguns dragões de fase manifesta-se de modos diferentes. Você pode aplicar os ajustes a seguir a um dragão de fase de qualquer idade.\n\nAlguns dragões de fase podem parecer estar em dois lugares ao mesmo tempo. Para criar um dragão com tal habilidade, remova cintilar das magias inatas e substitua Fora! por uma das seguintes.\n\n**Saltos de Imagem Residual** (ilusão, visual) **Frequência** 1 vez a cada 10 minutos; **Efeito** O dragão de fase teletransporta-se numa série rápida de saltos em torno da própria localização, criando três imagens ilusórias de si mesmo difíceis de distinguir da verdadeira. Qualquer inimigo que vise o dragão de fase com um ataque deve primeiro passar num teste simples CD 15. Em falha, o dragão de fase não é afetado e uma das duplicatas ilusórias é estilhaçada; a CD do próximo teste simples de Saltos de Imagem Residual é reduzida em 5. Quaisquer imagens restantes desaparecem no início do próximo turno do dragão.\n\n**Segundo Olhar** (ilusão, forma de magia, visual) Se a próxima ação do dragão de fase for usar uma habilidade ou magia com o traço teletransporte, fica invisível ao chegar no destino e deixa uma duplicata ilusória no local inicial. A invisibilidade termina e a duplicata ilusória desaparece se o dragão tomar uma ação hostil; se uma criatura interagir com a imagem falsa, inclusive tentando Golpeá-la; ou no início do próximo turno do dragão, o que ocorrer primeiro.\n\nRaramente, um dragão de fase pode sintonizar as formas para ficar ligeiramente fora de fase com a realidade. Para criar um dragão com tal habilidade, remova cintilar das magias inatas e substitua Golpe Portal pelo seguinte.\n\n**Desmaterializar** (concentração, polimorfo) **Frequência** 1 vez por hora; **Efeito** O dragão de fase torna-se incorpóreo, ganhando o traço incorpóreo, resistência a todo dano (exceto força, _toque fantasma_ e espírito) igual à metade do nível (o dobro da resistência contra dano não mágico) e imunidade a dano de precisão. Se o dragão tentar um Golpe contra uma criatura com quaisquer bônus de circunstância à CA (como de um escudo ou cobertura), reduza esse bônus em 2. Este efeito dura 1 minuto ou até o dragão de fase Dispensá-lo.",
      },
      {
        id: "phase-dragon-spellcasters",
        title: "Conjuradores de dragão de fase",
        body: "Phase dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragão de fase jovem\n**Magias arcanas preparadas** DC 28, ataque +20; **4º** _liminal doorway_, _unfettered movement_; **3º** _clairaudience_, _haste_, _safe passage_; **2º** _blur_, _dispel magic_, _humanoid form_; **1º** _ant haul_, _force barrage_, _tailwind_; **Truques (4º)** _detect magic_, _figment_, _message_, _read aura_, _telekinetic projectile_\n\n### Dragão de fase adulto\n**Magias arcanas preparadas** DC 33, ataque +25; Como o jovem phase dragon, mais **6º** _scrying_, _wall of force_; **5º** _banishment_, _dispel magic_, _sending_; **4º** _mirage_; **Truques (6º)** _detect magic_, _figment_, _message_, _read aura_, _telekinetic projectile_\n\n### Dragão de fase ancião\n**Magias arcanas preparadas** DC 40, ataque +32; Como o adulto phase dragon, mais **8º** _dispel magic_, _pinpoint_, _teleport_; **7º** _contingency_, _energy aegis_, _retrocognition_; **6º** _disintegrate_; **Truques (8º)** _detect magic_, _figment_, _message_, _read aura_, _telekinetic projectile_o\n\n### Arquidragão de fase\n**Magias arcanas preparadas** DC 45, ataque +37; Como o ancião phase dragon  mais **10º** _freeze time_, _gate_; **9º** _detonate magic_, _implosion_, _metamorphosis_; **Truques (10º)** _detect magic_, _figment_, _message_, _read aura_, _telekinetic projectile_",
      },
      {
        id: "zehanlian",
        title: "Zehanlian",
        body: "Cedo na vida em Kyonin, a jovem dragão de fase Zehanlian ficou cativada pelas _aiudaras_. Agora que são o interesse principal, investiga implacavelmente os segredos desses portões élficos. Um quadro de aventureiros e equipe reunidos a auxilia, estabelecendo acampamentos seguros em cada novo destino a que um portão élfico os leva enquanto ela e um bando de eruditos sobretudo élficos concentram-se nos estudos. As viagens de Zehanlian recentemente a levaram ao planeta Castrovel, onde estabeleceu um covil com acesso fácil ao centro de trânsito mágico Telasia.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-requiem',
    name: "Dragão do Réquiem",
    originalName: "Dragon, Requiem",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=586",
    intro:
      "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "O controle de um dragão do réquiem sobre almas manifesta-se de várias formas. Você pode aplicar os ajustes a seguir a um dragão do réquiem de qualquer idade.\n\nAlguns dragões do réquiem são rancorosos o bastante para tentar levar uma criatura viva junto quando morrem. Para criar um dragão com esta habilidade, substitua Reter a Morte pelo seguinte.\n\n**Morrer Juntos** (divino, incapacitação, vazio) **Gatilho** O dragão morre; **Efeito** O dragão ata a alma à alma de uma criatura viva a até 18 m, puxando-a junto para a morte. O alvo deve tentar uma salvaguarda de Fortitude. **Sucesso crítico** O alvo não é afetado. **Sucesso** O alvo sofre dano de vazio igual à metade do dano causado pelo Sopro Funesto do dragão. **Falha** O alvo sofre dano de vazio igual ao dano causado pelo Sopro Funesto do dragão. **Falha crítica** O alvo cai a 0 PV e fica Morrendo 1, ou aumenta a condição Morrendo em 1 se já estiver morrendo. Enquanto o alvo estiver morrendo, o dragão permanece com 1 PV e morre instantaneamente se o alvo perder a condição Morrendo.\n\nDragões do réquiem que se especializam em lutar contra e ao lado de exércitos podem soltar um rugido poderoso que amedronta os inimigos e fortalece os aliados. Para criar um dragão com esta habilidade, substitua Frenesi Dracônico pelo seguinte.\n\n**Rugido da Alma** (auditivo, emoção, medo, mental, espírito) **Frequência** 1 vez por rodada; **Efeito** O dragão solta um rugido poderoso que anima os aliados e abala as almas dos inimigos. Cada aliado numa emanação de 36 m ganha PV temporários iguais ao nível do dragão que duram 1 minuto, enquanto cada inimigo naquela área deve tentar uma salvaguarda de Vontade. **Sucesso crítico** A criatura não é afetada e fica imune a Rugido da Alma por 1 minuto. **Sucesso** A criatura fica Amedrontada 1. **Falha** A criatura fica Amedrontada 2 e Condenada 1. Se o alvo já estiver Condenado, o valor aumenta em 1 (máximo Condenado 4). **Falha crítica** A criatura ganha a condição Em Fuga por 1 rodada, fica Amedrontada 4 e Condenada 1. Se o alvo já estiver Condenado, o valor aumenta em 1 (máximo Condenado 4).",
      },
      {
        id: "requiem-dragon-spellcasters",
        title: "Conjuradores de dragão do réquiem",
        body: "Requiem dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragão do réquiem jovem\n**Magias divinas preparadas** DC 30, ataque +22; **4º** _ghostly tragedy_, _talking corpse_, _vital beacon_; **3º** _protection_, _ring of truth_, _safe passage_; **2º** _see the unseen_, _share life_, _thoughtful gift_; **1º** _protection_, _sanctuary_, _spirit link_; **Truques (4º)** _guidance_, _haunting hymn_, _message_, _sigil_, stabilize\n\n### Dragão do réquiem adulto\n**Magias divinas preparadas** DC 36, ataque +28; Como o jovem requiem dragon, mais **6º** _field of life_, _raise dead_, _vital beacon_; **5º** _banishment_, _breath of life_, _invoke spirits_; **Truques (6º)** _guidance_, _haunting hymn_, _message_, _sigil_, _stabilize_\n\n### Dragão do réquiem ancião\nMagias divinas preparadas DC 42, ataque +34; Como o adulto requiem dragon, mais **9º** _foresight_, _raise dead_, _seize soul_; **8º** _field of life_, _safe passage_, _spirit song_; **7º** _interplanar teleport_, _planar seal_, _regenerate_; **Truques (9º)** _guidance_, _haunting hymn_ , _message_, _sigil_, _stabilize_o\n\n### Arquidragão do réquiem\n**Magias divinas preparadas** DC 48, ataque +40; Como o ancião requiem dragon mais **10º** _raise dead_, _revival_; **9º** _breath of life_; **Truques (10º)** _guidance_, _haunting hymn_, _message_, _sigil_, _stabilize_",
      },
      {
        id: "roum",
        title: "Roum",
        body: "O dragão do réquiem Roum, clériga de Brigh, incumbiu-se de escoltar as almas de inventores pelo Rio das Almas. Registra as ideias finais numa vasta biblioteca que chama de Salão da Invenção Perdida. Mantém este covil escondido numa caverna nos Picos de Bronze. Dali, pode espiar as obras de inventores locais. Roum ocasionalmente pede a ressurreição de inventores infelizes que perderam a vida às próprias criações arriscadas mas promissoras — mágicas ou mundanas — se a ideia a intrigar.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-resurrection',
    name: "Dragão da Ressurreição",
    originalName: "Dragon, Resurrection",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=587",
    intro:
      "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "Alguns dragões da ressurreição podem controlar vida e morte de modos diferentes. Você pode aplicar os ajustes a seguir a um dragão da ressurreição de qualquer idade.\n\nConforme um dragão da ressurreição se cura, pode simultaneamente enfraquecer os vivos ao redor. Para criar um dragão com esta habilidade, substitua Ímpeto Dracônico pelo seguinte.\n\n**Dilacerar Almas** (divino, vazio) **Gatilho** O dragão da ressurreição termina o turno; **Requisitos** O Sopro Sifão de Almas do dragão recarregou neste turno; **Efeito** Energia de vazio excedente transborda do dragão numa emanação de 18 m. Cada criatura viva na área deve passar numa salvaguarda de Fortitude com CD igual à do Sopro Sifão de Almas do dragão ou ganha fraqueza a vazio igual à resistência a espírito do dragão por 1 rodada (ou 1 minuto em falha crítica).\n\nDragões da ressurreição que concentram o poder em matar o máximo possível de vivos podem envolver as garras em energia de vazio. Para criar um dragão com esta habilidade, substitua Frenesi Dracônico pelo seguinte.\n\n**Garra Nociva** (divino) O dragão da ressurreição canaliza uma magia divina na garra. Lança uma versão de 1 ação de _ferir_, mas os efeitos da magia não ocorrem imediatamente. O dragão então faz um Golpe de garra. Isto conta como dois ataques para a penalidade de ataques múltiplos. O ataque fica imbuído dos efeitos da magia conforme os resultados do Golpe. **Sucesso crítico** O Golpe causa dano dobrado como o normal, e o alvo deve tentar uma salvaguarda básica de Fortitude contra o dano da magia, mas trata o resultado como um grau de sucesso pior. **Sucesso** O Golpe causa dano como o normal, e o alvo tenta uma salvaguarda básica de Fortitude contra o dano da magia. **Falha** O Golpe não causa dano, mas o alvo deve tentar uma salvaguarda básica de Fortitude contra o dano da magia. **Falha crítica** O Golpe não causa dano, e o alvo não é afetado pela magia.\n\nDragões da ressurreição mais focados em necromancia gostam de criar lacaios mortos-vivos permanentes. Para criar um dragão com esta habilidade, dê ao dragão o ritual _criar morto-vivo_ e substitua Comandante Ressurgido pelo seguinte.\n\n**Servo Sem Morte** (divino, profano) Quando um dragão da ressurreição realiza o ritual _criar morto-vivo_, pode criar qualquer morto-vivo comum e não exige conjuradores secundários. Se o dragão criar uma criatura morta-viva irracional cujo nível seja pelo menos 2 menor que o dele, ela automaticamente torna-se lacaio do dragão — um servo sem morte. Este lacaio não pode ser destruído a menos que o dragão seja morto; se reduzido a 0 PV, tal lacaio volta aos PV totais 1d6 dias depois. Um dragão da ressurreição só pode ter um servo sem morte de cada vez.",
      },
      {
        id: "resurrection-dragon-spellcasting",
        title: "Conjuração de dragão da ressurreição",
        body: "Resurrection dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragão da ressurreição jovem\n**Magias divinas inatas** DC 26, ataque +18; **3º** _final sacrifice_, _sudden blight_, _vampiric feast_; **2º** _heal_, _share life_, _spirit sense_; **1º** _command_, _infuse vitality_, _grim tendrils_; **Truques (3º)** _detect magic_, _guidance_, _haunting hymn_, _read aura_, _stabilize_\n\n### Dragão da ressurreição adulto\n**Magias divinas inatas** DC 32, ataque +24; Como o jovem resurrection dragon, mais **5º** _dispel magic_, _heal_, _invoke spirits_; **4º** _harm_, _summon undead_, _talking corpse_; **Truques (5º)** _detect magic_, _guidance_, _haunting hymn_, _read aura_, _stabilize_\n\n### Dragão da ressurreição ancião\n**Magias divinas inatas** DC 38, ataque +30; Como o adulto resurrection dragon, mais **8º** _moment of renewal_, _raise dead_, _summon undead_; **7º** _execute_, _harm_, _regenerate_; **6º** _field of life_, _raise dead_, _summon undead_; **Truques (8º)** _detect magic_, _guidance_, _haunting hymn_, _read aura_, _stabilize_\n\n###  Arquidragão da ressurreição\n**Magias divinas preparadas** DC 46, ataque +38; Como o ancião resurrection dragon mais **10º** _revival_; **9º** _massacre_, _wails of the damned_; **Truques (10º)** _detect magic_, _guidance_, _haunting hymn_, _read aura_, _stabilize_",
      },
      {
        id: "revirescena-and-esurek",
        title: "Revirescena e Esurek",
        body: "Revirescena e Esurek são um par raro de mãe e filho de dragões da ressurreição localizados na costa oeste do Lago das Névoas e Véus, que mantêm um vínculo estreito tanto por afeição quanto por necessidade. Nascido doentio, Esurek não conseguia defender-se adequadamente e por fim encontrou o fim nas mãos de um grupo de aventureiros em busca de riqueza e glória. A arma de um dos aventureiros perturbou a alma de Esurek, forçando Revirescena a enviar a própria alma ao Cemitério para puxar a alma do filho de volta ao corpo, acorrentando as almas no processo. Revirescena é incapaz de restaurar por completo a alma perturbada de Esurek. Tornou-se uma progenitora mimosa e superprotetora, buscando um modo de devolver a alma do filho ao normal, mas incapaz de deixar o lado do filho o bastante para pedir ajuda.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-rune',
    name: "Dragão das Runas",
    originalName: "Dragon, Rune",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=588",
    intro:
      "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "Muitos dragões das runas acham modos alternativos de usar a maestria das runas. Qualquer uma das habilidades a seguir pode ser dominada por dragões das runas. Remova Runa Enredante e substitua-a por uma das seguintes.\n\n### Dragão das Runas Adulto:\n**Cárcere Rúnico** (arcano) O dragão das runas conjura uma prisão que promete dor a quem está dentro e a quem tenta escapar. O dragão cria um cárcere rúnico numa explosão de 3 m a até 18 m. A área é terreno difícil e criaturas fora do cárcere ficam ocultas às criaturas dentro dele. Se uma criatura usa uma ação de movimento para deixar o cárcere rúnico, ganha uma runa detonante. O cárcere rúnico dura 1 rodada, mas uma criatura adjacente ao cárcere, porém não dentro dele, pode usar uma ação Interagir para remover a runa mais cedo.\n\n**Runa Catalisadora** (arcano) O dragão cria uma runa altamente reativa numa explosão de 9 m a até 18 m. Sempre que uma criatura sofre dano de uma runa detonante enquanto estiver na área, todas as outras criaturas na área sofrem o dano da runa detonante (salvaguarda básica de Reflexos CD 34). A Runa Catalisadora dura 1 minuto, mas pode ser removida se criaturas adjacentes à runa gastarem duas ações Interagir.\n\n### Dragão das Runas Ancião:\n**Cárcere Rúnico** (arcano) Como o dragão das runas adulto, mas a área é uma explosão de 6 m.\n\n**Runa Catalisadora** (arcano) Como o dragão das runas adulto, mas a área é uma explosão de 12 m e a CD é 41.\n\n### Arquidragão das Runas:\n**Cárcere Rúnico** (arcano) Como o dragão das runas adulto, mas a área é uma explosão de 9 m.\n\n**Runa Catalisadora** (arcano) Como o dragão das runas adulto, mas a área é uma explosão de 18 m e a CD é 46.",
      },
      {
        id: "runedragon-spellcasters",
        title: "Conjuradores de dragão das runas",
        body: "If a spell the rune dragon casts would deal energy damage, it instead deals the damage type associated with its Shifting Runes. Additionally, rune dragon conjuradores know the rune trap ritual and can fulfill the role of the secondary caster themselves. Rune dragon conjuradores tend to focus on specific types of magic such as ice magic or summoning. The following represents a rune dragon with a broader array of spells.\n\n### Dragão das runas jovem\n**Magias arcanas preparadas** DC 29, ataque +21; **4º** _dispel magic_, _translate_, _wall of fire_; **3º** _fireball_, _gravity well_, _veil of privacy_; **2º** _blur_, _embed message_, _translate_; **1º** _alarm_, _fear_, _gust of wind_; **Truques (4º)** _detect magic_, _ignition_, _message_, _sigil_, _telekinetic hand_\n\n### Dragão das runas adulto\n**Magias arcanas preparadas** DC 34, ataque +26; Como o jovem rune dragon, mais **6º** _chain lightning_, _scrying_, _wall of force_; **5º** _howling blizzard_, _imaginary lockbox_, _truespeech_; **Truques (6º)** _detect magic_, _ignition_, _message_, _sigil_, _telekinetic hand_\n\n### Dragão das runas ancião\n**Magias arcanas preparadas** DC 41, ataque +33; Como o adulto rune dragon, mais **9º** _detonate magic_, _falling stars_, _foresight_; **8º** _hidden mind_, _quandary_, _unrelenting observation_; **7º** _fireball_, _planar seal_, _spell riposte_; **Truques (9º)** _detect magic_, _ignition_, _message_, _sigil_, _telekinetic hand_o\n\n###  Arquidragão das runas\n**Magias arcanas preparadas** DC 46, ataque +38; Como o ancião rune dragon mais **10º** _cataclysm_; **9º** _dispel magic_, _implosion_; **Truques (10º)** _detect magic_, _ignition_, _message_, _sigil_, _telekinetic hand_",
      },
      {
        id: "trohalix",
        title: "Trohalix",
        body: "O dragão das runas Trohalix mantém um covil escondido nos desertos de Thuvia. Garante que rumores de sua biblioteca vastamente suprida sejam bem conhecidos, mas a localização exata não. Quem busca o conhecimento dela pode acessar a biblioteca por um tempo, conforme a doação, e quem for tolo o bastante para roubar dela raramente vive para contar a história.",
      },
    ],
  }),
  fam({
    id: 'family-dragon-whisper',
    name: "Dragão do Sussurro",
    originalName: "Dragon, Whisper",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=589",
    intro:
      "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    sections: [
      {
        id: "alternate-abilities",
        title: "Habilidades alternativas",
        body: "Dragões do sussurro podem desenvolver perícias e habilidades diferentes das típicas. Você pode aplicar os ajustes a seguir a dragões do sussurro de qualquer idade.\n\nAlguns dragões do sussurro atam os segredos de um informante a contratos, obtendo a informação em troca de conceder um bônus. Para criar um dragão com esta habilidade, substitua Roubar Conhecimento pelo seguinte.\n\n**Redigir Contrato** (oculto, manipular) O dragão produz um contrato para um único mortal vivo. Este contrato pode conceder um único bônus ou habilidade, cuja extensão depende do poder do dragão, em troca de um pedaço de conhecimento que o mortal possua. O mortal deve assinar de bom grado o nome verdadeiro no contrato, bem como o conhecimento que deseja entregar. Ao assinar, o mortal esquece a informação barganhada, que não pode ser restaurada por nenhum meio aquém de um ritual de _desejo_; se restaurar este conhecimento, perde o bônus concedido pelo contrato.\n\nUm dragão do sussurro pode desenvolver vínculos fortes com os informantes que lhes permitem ver o mundo pelos sentidos deles. Para criar um dragão com esta habilidade, substitua Rede de Informações pela habilidade a seguir.\n\n**Compartilhar Visão** (concentração, oculto, vidência) O dragão declara o nome de um informante aliado a até 160 km, dando-lhe um alerta mental. O informante pode escolher se aceita o contato. Se consentir, o dragão projeta os sentidos nos do informante, permitindo perceber através do informante. Ao fazê-lo, perde toda a informação sensorial do próprio corpo. O dragão pode Sustentar este efeito por até 1 hora e Dispensá-lo como ação livre. Um dragão do sussurro pode assumir um disfarce humanoide para reunir informação sem atrair atenção. Para criar um dragão com esta habilidade, dê-lhe a habilidade a seguir.\n\n**Mudar Forma** (concentração, oculto, polimorfo) O dragão assume a aparência de um humanoide Pequeno ou Médio. A forma humanoide tem uma aparência específica e persistente. Na forma humanoide, o dragão perde os Golpes de mandíbulas, garras e cauda, mas retém os bônus de ataque com quaisquer armas que empunhe. O Deslocamento é reduzido a 7,5 m.",
      },
      {
        id: "naizraa",
        title: "Naizraa",
        body: "O dragão do sussurro Naizraa reside num palácio suntuoso no alto dos penhascos da costa de Saray, no norte de Qadira. Mantém olho atento nas intrigas da nobreza de Qadira e às vezes oferece patronagem a indivíduos talentosos em busca de informação ou influência, em troca de um segredo deles.",
      },
      {
        id: "whisper-dragon-spellcasting",
        title: "Conjuração de dragão do sussurro",
        body: "Whisper dragon conjuradores tendem a lançar as magias a seguir.\n\n### Dragão do sussurro jovem\n**Magias ocultas preparadas** DC 25, ataque +17; **3º** _hypercognition_, _ring of truth_; **2º** _clear mind_, _humanoid form_, _see the unseen_; **1º** _command_, _disguise magic_, _mindlink_; **Truques (3º)** _daze_, _detect magic_, _forbidding ward_, _message_, _telekinetic hand_\n\n### Dragão do sussurro adulto\n**Magias ocultas preparadas** DC 30, ataque +22; Como o jovem whisper dragon, mais **5º** _sending_, _synaptic pulse_; **4º** _confusion_, _detect scrying_, _rewrite memory_; **3º** _dream message_; **Truques (5º)** _daze_, _detect magic_, _forbidding ward_, _message_, _telekinetic hand_\n\n### Dragão do sussurro ancião\n**Magias ocultas preparadas** DC 37, ataque +29; Como o adulto whisper dragon, mais **7º** _interplanar teleport_, _project image_, _retrocognition_; **6º** _scrying_, _teleport_, _zealous conviction_; **5º** _scouting eye_; **Truques (7º)** _daze_, _detect magic_, _forbidding ward_, _message_, _telekinetic hand_o\n\n###  Arquidragão do sussurro\n**Magias ocultas preparadas** DC 42, ataque +34; Como o ancião whisper dragon mais **9º** _overwhelming presence_, _telepathic demand_; **8º** _disappearance_, _hidden mind_, _unrelenting observation_; **Truques (9º)** _daze_, _detect magic_, _forbidding ward_, _message_, _telekinetic hand_",
      },
    ],
  }),
  fam({
    id: 'family-titan',
    name: "Titã",
    originalName: "Titan",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=627",
    intro:
      "Criados por divindades antigas muito antes da ascensão das ancestralidades mortais, titãs uniram-se e tentaram derrubar os progenitores deíficos. A guerra resultante ainda figura com destaque nos mitos mortais, nos quais a maioria dos titãs foi derrotada e aprisionada por éons.",
    sections: [
      {
        id: "other-titans",
        title: "Outros titãs",
        body: "Titãs variam amplamente, conforme a função que as deidades pretendiam que servissem ou os métodos de travar guerra. Incluem titãs fomorianos encouraçados, titãs sashenji metamorfo e titãs citevi astutos.",
      },
      {
        id: "titan-weapons",
        title: "Armas de titã",
        body: "Alguns titãs carregam um lendário _martelo celestial_. Alguns podem usá-lo para construir, embora outros o usem para destruir. Armas semelhantes incluem o machado derribador dos titãs, um machado grande que pode ser girado para criar um efeito de ventos punitivos.",
      },
    ],
  }),
  fam({
    id: 'family-soulrider',
    name: "Soulrider",
    originalName: "Soulrider",
    trait: "Soulrider",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=620",
    intro:
      "Semelhante a uma lampreia ou peixe-bruxa com uma cauda longa como chicote, um soulrider usa a ventosa inofensiva para pegar carona na alma de uma criatura. Essa conexão aparentemente simples transcende o físico, fixando-se diretamente à alma do hospedeiro e até viajando com a alma até o destino final. Lá, o soulrider deixa o hospedeiro para absorver as energias planares ao redor, adaptando-se ao novo ambiente e crescendo o bastante para gerar crias. Porém, só pode fazê-lo no Universo mortal, então precisa achar um portal ou outro meio de voltar. Com esse ciclo, espalharam-se por todos os planos da Esfera Externa, bem como por muitos mundos mortais.\n\nEmbora cada vez mais difundidos, soulriders só apareceram há pouco mais de um século. Acredita-se que tenham sido a tentativa de um distorcedor de carne de trapacear o julgamento de Pharasma fixando várias almas inocentes à própria, e o número de soulriders cresceu de forma explosiva desde então.\n\nSoulriders precisam de pouco mais que ar para sobreviver, mas têm consciência instintiva da necessidade de uma alma mortal. Embora as ventosas sejam inofensivas, soulriders que se sentem ameaçados ou impacientes liquidam os hospedeiros ou ameaças próximas com a cauda.",
    sections: [
      {
        id: "avoiding-judgement",
        title: "Evitando o julgamento",
        body: "Embora soulriders tenham sido criados numa tentativa de inclinar a balança do julgamento de Pharasma, muitos psicopompos são adamantes de que não interferem no processo. Porém, nosois são frequentemente incumbidos de limpar infestações de soulriders, e esoboks parecem tomar a existência das criaturas como ofensa pessoal.",
      },
      {
        id: "invasive-summoning",
        title: "Convocação invasiva",
        body: "Soulriders espalharam-se pelos planos a tal ponto que a adaptação planar os qualifica para magias de convocação que exigem aqueles traços. O soulrider que responde tem os traços apropriados à magia, como celestial e sagrado para _convocar celestial_.",
      },
    ],
  }),
  fam({
    id: 'family-shade',
    name: "Sombra",
    originalName: "Shade",
    trait: "Shade",
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Shade",
    intro:
      "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    sections: [],
  }),
]
