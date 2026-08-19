import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 7 do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core). Sem Legacy.
 */
export const catalogCreatureFamiliesMonsterCoreBatch7: CreatureFamily[] = [
  fam({
    id: 'family-vescavor',
    name: 'Vescavor',
    originalName: 'Vescavor',
    trait: null,
    sourcePage: 338,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=481',
    intro:
      'Esses vermes verdes glutões viajam das Fendas Exteriores numa busca sem fim por comida. Pelo caminho, essas vespas ácidas devoram tudo à vista. Nem o chão é poupado do apetite. Embora um único vescavor não seja problema, viajam em enxames para sobrecarregar qualquer um que tente pará-los. Numa situação verdadeiramente infeliz, vários enxames se reúnem e são liderados por uma rainha vescavor. Essas rainhas, temíveis por si, podem empurrar a ninhada a uma fúria alimentar como nenhuma outra. Enxames achados sem rainha não têm rumo, destruindo tudo à volta indiscriminadamente.\n\nQuando um enxame de vescavor não está comendo, tagarela canções entorpecentes do mundo sombrio dos capetas. Adaptados às selvas gritantes do plano natal, emitem um chamado que confunde e corrompe mortais.\n\nFilósofos que ponderam as Fendas Exteriores muitas vezes conjecturam que tipo de alma forma um vescavor. A ideia de almas de inseto enviadas às Fendas é muitas vezes rida, mas nunca inteiramente descartada. Alguns assumem que são demônios da gula, simples assim. Explicações mais criativas sustentam que todos os pedaços de alma comidos por demônios atacantes é o que se coalescem nesses enxames sem fim — o que daria conta de como esses demônios que se alimentam sem parar também parecem sem fim em número.',
    sections: [
      {
        id: 'royal-swarm',
        title: 'Enxame real',
        body: 'Depois de ver o tamanho de uma única rainha e os números intermináveis dos enxames, muitos consideraram a possibilidade de um enxame inteiro feito de rainhas vescavor. Embora nenhum tenha sido relatado, a mera ideia já foi usada para apressar o financiamento de partidas de caça.',
      },
      {
        id: 'strange-appetite',
        title: 'Apetite estranho',
        body: 'Em terras devastadas por esta praga de insetos, alguns passaram a comer vescavors. Embora o cheiro não agrade, uma vez removidas as glândulas de ácido e o inseto devidamente cozido e temperado, vescavors rendem um petisco surpreendentemente saboroso.',
      },
    ],
  }),
  fam({
    id: 'family-needler',
    name: 'Agulheiro Nóxio',
    originalName: 'Noxious Needler',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Noxious%20Needler',
    intro:
      "Este construto é um pesadelo alquímico ambulante, capaz de infligir toda sorte de ferida dolorosa. A capacidade de seguir ordens vem do cérebro humanoide sem mente que flutua na cabeça em cúpula, permitindo que sirvam de operários e guardas para os criadores.\n\nEm casos excepcionalmente raros, o cérebro usado na criação retém fragmentos de memória ou até intelecto de verdade, resultando num agulheiro nóxio com personalidade e agenda próprias. Criações relutantes muitas vezes caçam os criadores, descarregando a raiva em alvos semelhantes se a vingança for impossível. Outros replicam em branco os experimentos da última memória.",
    sections: [],
  }),
  fam({
    id: 'family-bogwid',
    name: 'Bogwid',
    originalName: 'Bogwid',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Bogwid',
    intro:
      'A combinação abominável de sapo e polvo, um bogwid arrasta o corpo verde inchado pelos pântanos em busca de refeição para as muitas larvas que carrega no dorso. Apesar da aparência absurda e do cheiro pervasivo, é caçador de emboscada: esconde-se na areia, na vegetação ou no que houver e espera até uma criatura maior se aproximar. Quando tem um cadáver grande o bastante, as larvas saltam e brigam entre si pela única chance de sobreviver. A larva restante se enterra no corpo e o devora nas semanas seguintes. Depois, um bogwid adulto emerge do que restou.',
    sections: [],
  }),
  fam({
    id: 'family-dezullon',
    name: 'Dezullon',
    originalName: 'Dezullon',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dezullon',
    intro:
      'Dezullons são plantas-jarro carnívoras perigosas que habitam florestas de dossel denso ou pântanos profundos. Caçam carne no sub-bosque quando não se aquecem ao sol nos galhos. São espertos o bastante para usar objetos brilhantes como isca. Assumir que a locomoção é lenta só porque tem raízes é erro tolo: muita aventureiro já foi esmagado por esta planta surpreendentemente ágil.\n\nUm dezullon faminto desequilibra a presa derramando sucos digestivos pútridos e psicoativos do jarro central. Além de altamente ácidos, as enzimas infligem alucinações e amnésia — o que os torna procurados por quem lida com venenos, drogas ou medicina experimental.',
    sections: [],
  }),
  fam({
    id: 'family-gimmerling',
    name: 'Gimmerling',
    originalName: 'Gimmerling',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Gimmerling',
    intro:
      'Gimmerlings são fey pequenos que mudam de forma e montam emboscadas para saciar a fome sem fim e a ganância infantil. Esses fey cruelmente curiosos se obcecam em achar e fazer armadilhas incomuns e armas sádicas, e a diversão favorita é ver as armadilhas dispararem ou as armas serem empunhadas. Em Golarion, costumam aparecer em áreas urbanas, sobretudo favelas, onde passam despercebidos — e têm vítimas à vontade.\n\nUm gimmerling típico se disfarça de criança em perigo, esperando atrair criaturas para perto o bastante para roubar. Como às vezes trocam técnicas obscuras de ferraria ou de armar armadilhas por presentes, já foram adorados como deuses menores da forja.',
    sections: [],
  }),
  fam({
    id: 'family-pukwudgie',
    name: 'Pukwudgie',
    originalName: 'Pukwudgie',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Pukwudgie',
    intro:
      'Pukwudgies têm muitos nomes em muitas regiões, mas quem os conhece concorda: desafiar a natureza travessa provoca a ira deles.\n\nEm tempos antigos, viajaram do Primeiro Mundo ao Universo, talvez na esteira da emigração gnomo. Esses fey orgulhosos se obcecam com demonstrações de respeito. Tentaram primeiro fazer amizade com mortais, mas cada tentativa acabou em tragédia, pois qualquer deslize era visto como insulto grave. Mortais passaram a vê-los como pragas perigosas; pukwudgies, por sua vez, passaram a ressentir mortais e os deuses que os favoreciam.\n\nNo melhor, pregam peças cruéis. No pior, já se soube que sequestram e até matam quem não os trata com o respeito devido. Fey violentos como twigjacks e redcaps muitas vezes se reúnem sob liderança pukwudgie.',
    sections: [],
  }),
  fam({
    id: 'family-dragon-turtle',
    name: 'Tartaruga-dragão',
    originalName: 'Dragon Turtle',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dragon%20Turtle',
    intro:
      'Esses dragões aquáticos imensos têm cascos rochosos semelhantes aos de tartarugas e nadadeiras poderosas o bastante para virar embarcações robustas. As criaturas temíveis gostam de ser consideradas tão perigosas quanto tempestades ou desastres naturais pela gente do mar. Apesar da fama, muitas tartarugas-dragão se deleitam em observar em segredo cidades marítimas crescer e evoluir ao longo das eras. Já se soube que protegem tais cidades de piratas, exércitos invasores ou até outras criaturas marinhas perigosas. Embora acumulem os tesouros dos navios que afundam, consideram a dádiva oferecida de livre vontade pela cidade protegida a mais preciosa.',
    sections: [],
  }),
  fam({
    id: 'family-oni',
    name: 'Oni',
    originalName: 'Oni',
    trait: 'Oni',
    sourcePage: 252,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=452',
    intro:
      'Onis são criaturas grandes e brutais originárias de Tian Xia, que lembram humanoides de pele vivamente colorida, presas e chifres. Embora comumente confundidos com capetas, os primeiros onis eram originalmente kami, espíritos tutelares da natureza. Esses kami sofreram um trauma terrível, perdendo os guardiões sagrados para desastres dramáticos ou para a indiferença de outros, e como resultado se transformaram nas criaturas violentas que são hoje. Alguns acreditam que onis podem ser aplacados espiritualmente por culto ritual adequado que os transforme de volta em kami, mas muitos desses pretensos salvadores caem diante da força bruta notória, dos dentes que rasgam carne e do comando das tempestades.\n\nOnis possuem a habilidade de se disfarçar de outros humanoides. Raramente são criativos nos disfarces, muitas vezes escolhendo uma aparência específica semelhante à forma de oni e ficando com ela. Essa simplicidade pega muita gente de surpresa, porém, pois as pessoas assumem que onis se limitam a uma única forma alternativa — o que de modo algum é o caso.',
    sections: [
      {
        id: 'kishin-oni',
        title: 'Onis kishin',
        body: 'Os onis mais poderosos são quasideidades conhecidas pelo título de kishin, possuindo poderes únicos e domínios mortais isolados. A mais poderosa é Inma, a Imperatriz do Mundo, mas Akuma o Rei Chifrudo, Murona a Mãe Sombria e Nataka o Rei Vermelho também são adorados.',
      },
      {
        id: 'oni-origins',
        title: 'Origens oni',
        body: 'Os primeiros onis originaram-se na nação de Minkai, no continente de Tian Xia. Seja pelos kami locais prevalentes — sobretudo na Floresta dos Espíritos envolta em névoa — ou pelas fés dos povos, Minkai é um foco de atividade oni.',
      },
      {
        id: 'other-oni',
        title: 'Outros onis',
        body: 'Onis diferentes existem pelo continente de Tian Xia. Onis de vila mascaram a pele dourada e as garras de quatro dedos em forma humana. Outros incluem onis da noite, que espreitam na escuridão e na fumaça; onis do vazio, com chamas sombrias malevolentes; e os poderosíssimos onis da tempestade.',
      },
    ],
  }),
  fam({
    id: 'family-coatl',
    name: 'Coatl',
    originalName: 'Coatl',
    trait: null,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=382',
    intro:
      'Essas serpentes emplumadas sagradas servem sem descanso os poderes do conhecimento e da justiça. Algumas operam diretamente como mensageiras e intermediárias das deidades; outras operam de forma independente ao auxiliar a causa da retidão. De qualquer jeito, velam mortais e tentam influenciá-los e auxiliá-los das sombras, mudando de plano a plano para espalhar sabedoria e cura onde forem precisas. Alguns quetz coatls são adorados como divindades em sociedades remotas ou isoladas, e embora não encorajem tal veneração, usam a confiança neles depositada para fomentar paz e cooperação com outros.',
    sections: [
      {
        id: 'coatl-deities',
        title: 'Deidades coatl',
        body: 'A maioria dos deuses bondosos usa coatls como agentes. Há, porém, três deidades coatl cujas palavras têm precedência sobre as outras no coração dos coatls. São Cihua Coatl, o deus dualista do parto, da proteção e da guerra; Pahti Coatl, a deusa da retribuição, da investigação e da reabilitação; e Tolte Coatl, o deus do conhecimento, das memórias e da migração. Ver Pathfinder Lost Omens Divine Mysteries para mais sobre o Tribunal Coatl.',
      },
      {
        id: 'coatls-and-sahkils',
        title: 'Coatls e sahkils',
        body: 'Lendas em Arcádia dizem que coatls e sahkils se ergueram à proeminência quando os primeiros mortais caminharam em Golarion. Cada um viu potencial único nos mortais: coatls viram esperança e a capacidade de se erguer a grandes feitos; sahkils viram o potencial de fomentar medo. Mortais medrosos nunca realizariam nada, tornando-se montes inúteis de carne cujas almas definhariam. Essas almas murchas não conseguiriam viajar direito pelo Rio das Almas, rompendo o equilíbrio delicado do além. Até hoje, coatls trabalham para inspirar mortais e empurrá-los a conquistas maiores, ao mesmo tempo em que se esforçam para manter o terror dos sahkils à distância.',
      },
      {
        id: 'other-coatls',
        title: 'Outros coatls',
        body: 'O quetz coatl apresentado aqui é o mais comum de sua espécie, e embora a maioria dos aventureiros e estudiosos os chame simplesmente de “coatls”, outros tipos existem também, como o feroz xiuh coatl, o nômade auwaz coatl, o sábio mix coatl, o nutriz chicome coatl e o furioso tletli coatl.',
      },
    ],
  }),
  fam({
    id: 'family-archon',
    name: 'Arconte',
    originalName: 'Archon',
    trait: 'Archon',
    sourcePage: 26,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=365',
    intro:
      'Arcontes são guardiões do Céu e inimigos da corrupção. Antes de deuses e seus servos porem os pés nos planos celestiais, arcontes já residiam no Céu, os habitantes originais do reino. Ao se encontrarem, arcontes e anjos divinos depressa descobriram que eram da mesma laia, guardando justiça e retidão no coração. Uma aliança se formou, e arcontes agora servem de aliados firmes a todos os celestiais e mortais que acham dignos.\n\nEmbora os primeiros arcontes tenham se coalescido da imensa montanha de sete andares do Céu, escolhem almas dispostas e dignas rumo ao Céu para se juntar às fileiras. Esses mortais ouvem e respondem ao chamado de uma voz misteriosa, manifestando-se no Jardim no cume da montanha. Lá juram servir para sempre a causa da justiça e se transformam nas novas formas de arconte.\n\nEmbora profundamente preocupados em defender a vida mortal e dispostos a se sacrificar em batalha contra capetas, arcontes muitas vezes parecem rotineiros e inescrutáveis aos outros, e as formas podem beirar o assustador e o bizarro. Por isso, muitas vezes têm problemas ao interagir com mortais, ou com os azatas de espírito livre. Apesar disso, arcontes tiram grande força dos outros, sobretudo dos que exemplificam virtude.\n\nAlém dos aliados celestiais, arcontes também mantêm laços antigos com aeons. As facções inescrutáveis ainda podem ser vistas trabalhando juntas para defender segredos há muito esquecidos e fazer valer regras que antecedem a vida mortal. Arcontes explicam essas missões como necessárias sem mais elaboração, deixando até os aliados angelicais frustrados com a obstinação.',
    sections: [
      {
        id: 'archon-aesthetics',
        title: 'Estética arconte',
        body: 'Embora arcontes não busquem reunir ou manter riqueza, apreciam beleza e arte, e os domínios muitas vezes são decorados com artesanato valioso e obras criativas. Eles próprios são igualmente ornamentados, e sempre reservam tempo para a manutenção adequada depois da batalha. Arcontes valorizam o cuidado — e portanto a ordem — em todas as coisas.',
      },
      {
        id: 'archon-divinities',
        title: 'Divindades arconte',
        body: 'Como com anjos e azatas, os arcontes mais poderosos contam entre um grupo de semideuses conhecidos coletivamente como senhores empíreos. Cada senhor empíreo arconte é uma criatura única e poderosa que mantém um domínio em algum lugar do Céu e é adorada em mundos mortais. Divindades arconte servem a uma variedade de metas e focam aspectos diferentes da retidão. Algumas, como Arqueros, têm influência sobre a defesa dos inocentes, enquanto outras, como Damerrich, semideus das execuções, enfatizam o castigo de malfeitores impenitentes e buscam obliterar o mal em todas as formas.',
      },
      {
        id: 'crime-and-punishment',
        title: 'Crime e castigo',
        body: 'Arcontes fazem valer lei e ordem como dever mais fundamental. Não leis terrestres — essas pouco concernem arcontes. A ordem cósmica, por outro lado, está assada no próprio ser. A maioria dos arcontes se vê incapaz de romper conscientemente leis cósmicas, embora alguns que já foram peticionários mortais possam evocar um eco da autonomia passada. Embora façam valer leis cósmicas, arcontes ainda preferem trazer infratores à redenção. Dentro da montanha do Céu, as Câmaras do Arrependimento guardam capetas e infratores que acreditam ainda poder redimir. Sempre que possível, escolhem este caminho em vez de destruir um inimigo, mesmo que a lei justificasse fazê-lo.',
      },
      {
        id: 'heavenly-mountain',
        title: 'Montanha celestial',
        body: 'Embora possam ser achados em qualquer lugar na batalha sem fim contra capetas, arcontes originam-se no Céu, um plano que aparece como uma única montanha maciça. O Céu se divide em sete andares, com a maioria dos arcontes ocupando o segundo nível, Proelera, a base de operações do exército, ou o sexto nível, Iudica, o coração administrativo do Céu.',
      },
      {
        id: 'order-and-preservation',
        title: 'Ordem e preservação',
        body: 'Embora faça parte da identidade central dos arcontes, a ordem do cosmos não é tratada como dogma inviolável. Arcontes consideram a filosofia por trás das leis e o valor de fazê-las valer. Embora permaneçam alinhados em propósito, muitas vezes debatem as leis e os papéis dentro da maquinaria celestial. Um argumento frequente afirma que um dos grandes bens de preservar a ordem é proteger os frutos da criação da entropia e das forças da destruição. Arcontes apreciam a estética e as coisas belas que mortais criam. O que capetas poderiam ver destruído ou controlado, arcontes lutam para preservar.',
      },
      {
        id: 'unknowable-bearing',
        title: 'Porte incompreensível',
        body: 'Arcontes gnokesh e exscinder têm razões frequentes de se associar a mortais. Isso desafia mortais, pois a maioria acha difícil compreender os pensamentos e desejos dos arcontes. Até um erudito que estuda o mesmo tópico que um gnokesh precisa adaptar o jeito de apresentar perguntas e informação para se comunicar com o guia arconte. Exscinders apresentam um desafio ainda mais duro, pois em geral são encontrados em serviço, com o propósito de confiscar ou destruir textos proibidos. Isso significa que alguém que encontra um exscinder pela primeira vez provavelmente está tentando convencê-lo a não destruir um tomo contendo saber raro ou até a obra de uma vida em erudição ou literatura.',
      },
    ],
  }),
  fam({
    id: 'family-dominion',
    name: 'Domínio do Negro',
    originalName: 'Dominion of the Black',
    trait: null,
    sourcePage: 104,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=394',
    intro:
      'O Domínio do Negro é uma conglomeração de conquistadores do espaço profundo com presença forte em Aucturn, o planeta mais remoto do sistema solar de Golarion. O Domínio tem postos secretos por todo Golarion; a maioria dos membros no planeta são batedores, usando as habilidades para roubar cérebros e identidades, reunindo informação sem nenhuma consideração pelos habitantes dos mundos que infiltram.',
    sections: [
      {
        id: 'doomsday-dawn',
        title: 'Alvorecer do Juízo',
        body: 'Mais batedores vêm sendo achados em Golarion nos poucos anos desde 4718 AR, data marcada para uma invasão maior conhecida como o Alvorecer do Juízo. O grosso dessa invasão foi frustrado em segredo, deixando um mistério para a maioria dos eruditos: por que o Domínio está intensificando o reconhecimento.',
      },
    ],
  }),
]
