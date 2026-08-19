import type { Heritage } from '@/types/ancestry'
import { ANCESTRY_ELF_ID } from './ancestriesElf'
import { ANCESTRY_ORC_ID } from './ancestriesOrc'
import { geniekinHeritages } from './heritagesGeniekin'
import { SOURCE_PLAYER_CORE_ID, SOURCE_PLAYER_CORE_2_ID, SOURCE_TIAN_XIA_CG_ID, SOURCE_DARK_ARCHIVES_ID, SOURCE_ANCESTRY_GUIDE_ID } from './sources'

export const HERITAGE_AIUVARIN_ID = 'heritage-aiuvarin'
export const HERITAGE_DROMAAR_ID = 'heritage-dromaar'
export const HERITAGE_NEPHILIM_ID = 'heritage-nephilim'
export const HERITAGE_DRAGONBLOOD_ID = 'heritage-dragonblood'
export const HERITAGE_CHANGELING_ID = 'heritage-changeling'
export const HERITAGE_DHAMPIR_ID = 'heritage-dhampir'
export const HERITAGE_DUSKWALKER_ID = 'heritage-duskwalker'
export const HERITAGE_HUNGERSEED_ID = 'heritage-hungerseed'
export const HERITAGE_REFLECTION_ID = 'heritage-reflection'
export const HERITAGE_BEASTKIN_ID = 'heritage-beastkin'

const LOW_LIGHT_VISION = {
  kind: 'lowLightVision' as const,
  name: 'Visão na Penumbra',
  originalName: 'Low-Light Vision',
  description:
    'Você enxerga na penumbra como se fosse luz intensa, ignorando a condição ocultado causada por penumbra.',
}

/**
 * Heranças versáteis — Player Core / Player Core 2 Remaster.
 * ancestryId = null: aparecem para qualquer ancestralidade,
 * sempre abaixo das heranças específicas na aba de herança.
 *
 * Feitos próprios usam heritageId (não ancestryId).
 * grantedAncestryIds libera feitos da ancestralidade ligada.
 */
export const aiuvarinHeritage: Heritage = {
  id: HERITAGE_AIUVARIN_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Aiuvarin',
  originalName: 'Aiuvarin',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 82,
  grantedAncestryIds: [ANCESTRY_ELF_ID],
  traits: ['Aiuvarin', 'Elfo'],
  description:
    'Filhos de elfos com outras ancestralidades — e os filhos desses filhos — são chamados aiuvarin, palavra élfica de um poema sobre folhas que caem cedo demais. Os mais conhecidos em Golarion nascem de elfo e humano, ou de dois aiuvarins; esses costumam ser chamados de “meio-elfos”.\n\nA vida aiuvarin costuma ser marcada pela busca de um lugar. Não há pátria própria, e as tradições variam demais para formar um povo único. Muitos tentam ser aceitos nas culturas dos pais. Têm orelhas pontudas e traços élficos misturados aos da outra ancestralidade; faltam os olhos quase alienígenas dos elfos. Muitos viram artistas ou artistas de palco. Apesar da sociabilidade, é difícil formar laços duradouros com qualquer um dos povos dos pais.\n\nAiuvarins herdam parte da longevidade élfica: com um pai humano, vivem em torno de 150 anos. Alguns temem amizade e romance com humanos, sabendo que provavelmente os sobreviverão.\n\nVocê pode… ignorar, abraçar ou enfrentar de frente os estereótipos sobre aiuvarins; buscar um lugar em ambas as culturas dos pais; virar artista ou viajante para não ficar preso a nenhum dos dois mundos.\n\nOutros provavelmente… subestimam você em círculos élficos; assumem que você é “meio-elfo” mesmo que nenhum dos pais seja humano; acham difícil entender a sua busca por pertencimento.\n\nVocê ganha os traços elfo e aiuvarin, e visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos aiuvarin e élficos além dos da sua ancestralidade. (Os traços aiuvarin e meio-elfo são intercambiáveis para acesso a opções.)',
  rulesSummary:
    'Traços elfo e aiuvarin; visão na penumbra; feitos élficos e aiuvarin liberados.',
  senses: [
    {
      id: 'aiuvarin-low-light-vision',
      ...LOW_LIGHT_VISION,
    },
  ],
  specialAbilities: [
    {
      id: 'aiuvarin-elf-feats',
      name: 'Herança Élfica',
      originalName: 'Elven Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos aiuvarin e élficos além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=281',
}

export const dromaarHeritage: Heritage = {
  id: HERITAGE_DROMAAR_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Dromaar',
  originalName: 'Dromaar',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 83,
  grantedAncestryIds: [ANCESTRY_ORC_ID],
  traits: ['Dromaar', 'Orc'],
  description:
    'Com os orcs de Belkzen na vanguarda da guerra contra o Tirano Sussurrante — às vezes lutando ao lado de aliados de outras ancestralidades — cresceu o número de filhos com herança orc misturada à de outro povo (em geral humano). Muitos desses “meio-orcs” se chamam dromaars, palavra órquica para os tamborileiros cuja música manda as hordas marchar para a guerra: veem-se como arautos de uma nova era para os orcs no Mar Interior.\n\nHumanoides intolerantes tratam orcs mais como monstros do que como pessoas, odiando e temendo-os só pela linhagem. Isso empurra dromaars para a margem: trabalho braçal, mercenários ou crime. Muitos que não aguentam as humilhações da sociedade humana encontram lar entre os parentes orcs ou partem para o ermo. Alguns humanos assumem que dromaars são menos inteligentes ou “incivilizados”, e raramente há aceitação em sociedades cheias desse preconceito.\n\nNuma hold orc, um dromaar costuma ser visto como acréscimo valioso: o que falta em força física pura, compensam com dons da outra linhagem. Alguns lutam para fazer nome nas hierarquias implacáveis das holds; outros descobrem que a sociedade orc é bem mais tolerante e abre caminho para subir alto. Um dromaar com pai humano vive em torno de 70 anos.\n\nVocê pode… ignorar, abraçar ou enfrentar de frente os estereótipos sobre dromaars; tirar o máximo do seu tamanho e força, no corpo ou no convívio; manter distância da maioria dos povos, caso rejeitem você pelos ancestrais orcs.\n\nOutros provavelmente… assumem que você gosta e se destaca em luta, mas não em magia ou estudos; lastimam as “circunstâncias trágicas” que imaginam no seu nascimento; saem do seu caminho em vez de encarar a sua raiva.\n\nA força órquica anima o seu sangue. Você tem um tom esverdeado na pele e outros sinais da herança orc. Você ganha os traços orc e dromaar, e visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos dromaar e orc além dos da sua ancestralidade. (Os traços dromaar e meio-orc são intercambiáveis para acesso a opções.)',
  rulesSummary:
    'Traços orc e dromaar; visão na penumbra; feitos orc e dromaar liberados.',
  senses: [
    {
      id: 'dromaar-low-light-vision',
      ...LOW_LIGHT_VISION,
    },
  ],
  specialAbilities: [
    {
      id: 'dromaar-orc-feats',
      name: 'Herança Órquica',
      originalName: 'Orcish Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos dromaar e orc além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=282',
}

export const nephilimHeritage: Heritage = {
  id: HERITAGE_NEPHILIM_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Nephilim',
  originalName: 'Nephilim',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 78,
  traits: ['Nephilim'],
  description:
    'Lendas falam de mortais que lidaram com imortais — e dos filhos desses encontros. Esses filhos, os ciontes planares, herdam a essência sobrenatural de outro plano, visível em traços físicos e poderes de outro mundo. Nephilim são ciontes que rastreiam a herança extraplanar até celestiais, infiéis, monitores e outras entidades que se metem nos assuntos religiosos dos mortais.\n\nUm sacerdote fiel de Erastil recebe a visita de um anjo na juventude e, anos depois, gera um filho com cabeça de alce e uma marca em forma de arco e flecha. Uma feiticeira impede uma incursão das Fendas Exteriores, mas um fiapo de poder demoníaco infunde a criança que ela carrega, nascida com presas e dois chifrinhos. Uma caravana planar viaja o Multiverso até encher as fileiras de filhos com cascos diabólicos e halos angélicos.\n\nNephilim herdam a ambição e a capacidade de mudança dos ancestrais mortais, e também um pedaço do poder e da aparência de uma entidade imortal. São difíceis de classificar: alguns têm traços demoníacos e angélicos ao mesmo tempo; outros desafiam as gavetas dos eruditos. Muitos, porém, apontam com clareza a linhagem — arautos da lei (archons) com olhos dourados ou auras flamejantes; crias do Inferno (hellspawn) com pele vermelha e pés de casco. Algumas culturas chamam de empíreo ou câmbio os nephilim de influência celestial ou infiel. Outros ganham os nomes de aforita ou ganzi.\n\nVocê pode… ter uma confiança forte por causa do poder ou da influência da herança extraplanar; abraçar ou rebelar-se contra a natureza planar que os outros veem em você; achar difícil construir relações, mas guardar quem o valoriza por quem — e não pelo que — você é.\n\nOutros provavelmente… assumem que você enfrentou desafios ou ganhou vantagens injustas por causa da herança; confundem você com agente de uma organização sagrada ou profana; acham que você tem laços com criaturas extraplanares poderosas e tentam barganhar poder com você.\n\nSua natureza é influenciada por celestiais, infiéis ou monitores. Isso aparece como traços que denunciam a herança: olhos dourados, halo, chifres ou cauda. Você ganha o traço nephilim, além dos da sua ancestralidade. Você ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos nephilim além dos da sua ancestralidade. (O traço nephilim é intercambiável com aasimar ou tiefling — mas aasimar e tiefling não são intercambiáveis entre si.)',
  rulesSummary:
    'Traço nephilim; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos nephilim liberados.',
  upgradeLowLightToDarkvision: true,
  senses: [
    {
      id: 'nephilim-low-light-vision',
      ...LOW_LIGHT_VISION,
    },
  ],
  specialAbilities: [
    {
      id: 'nephilim-planar-feats',
      name: 'Herança Planar',
      originalName: 'Planar Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos nephilim além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=280',
}

export const dragonbloodHeritage: Heritage = {
  id: HERITAGE_DRAGONBLOOD_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Dragonblood',
  originalName: 'Dragonblood',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 44,
  traits: ['Dragonblood'],
  additionalLanguageOptions: ['Dracônico'],
  description:
    'Há muitos jeitos de um mortal receber poder dracônico, mas dragonbloods têm afinidade natural. Filhos de linhagem dracônica ou abençoados por um deus-dragão ficam no limiar entre mortal e dragão, muitas vezes com aparência dracônica e personalidade forte.\n\nDragões se metem fundo na vida de outros povos: alguns são reverenciados como protetores ou quase deuses; outros assumem forma humanóide para viver como iguais, às vezes escondendo a identidade. Seja qual for a intenção, deixam marca indelével. Uma criança nascida dessa influência é um dragonblood — de qualquer ancestralidade, em quase qualquer região de Golarion, pois dragões vão aonde querem.\n\nAlguns têm traços óbvios — mãos com garras, asas de couro, cauda reptiliana — sempre à semelhança do antepassado (o herdeiro de um dragão adamantino pode ter escamas espessas no peito). Outros se parecem mais com dragões do que com a outra metade da herança, e são confundidos com kobolds, iruxis ou outros povos reptilianos. Há ainda os de aparência quase mortal, com só um brilho na pele ou nódulos de chifre, mas personalidade desproporcional ou magia inata. Tian Xia, as Terras dos Reis Linnorm e comunidades de Apsu ou Dahak veem mais dragonbloods.\n\nVocê pode… considerar-se bastante corajoso por causa da herança dracônica; deleitar-se com a deferência que alguns povos lhe prestam; sentir o peso de estar à altura do legado dos ancestrais.\n\nOutros provavelmente… acreditam que você trabalha para um dragão ou é um dragão disfarçado, e querem o mapa de algum tesouro; assumem que você cospe fogo ou outro elemento; pensam, por engano, que tocar suas escamas, chifres ou asas traz sorte.\n\nVocê descende de algum modo de um dragão. Os traços podem aparecer por fora — chifres, manchas de escamas, cauda — ou como reserva interna de poder. Você ganha o traço dragonblood, além dos da sua ancestralidade. Some Dracônico à lista de idiomas adicionais da ancestralidade (pode escolhê-lo se o modificador de Inteligência for positivo). Quando obtém sucesso em uma salvaguarda contra um efeito de medo, o resultado vira sucesso crítico. Ao ganhar um feito de ancestralidade, pode escolher feitos dragonblood além dos da sua ancestralidade.\n\nAlgumas habilidades citam o seu exemplar dracônico — o tipo de dragão de cujo sangue você tira poder. Pode escolhê-lo na criação, mas só é obrigatório quando um feito ou opção exigir (ex.: Sopro do Dragão). Até lá, a natureza dracônica pode ser um mistério. A tabela do Monster Core está nas escolhas da herança; dragões de outras fontes exigem combinado com o mestre.',
  rulesSummary:
    'Traço dragonblood; Dracônico nas opções de idioma; sucesso contra medo vira crítico; feitos dragonblood; exemplar opcional até um feito exigir.',
  specialAbilities: [
    {
      id: 'dragonblood-fearless-heart',
      name: 'Coração Dracônico',
      originalName: 'Draconic Heart',
      actionType: 'passive',
      description:
        'Quando você obtém sucesso em uma salvaguarda contra um efeito de medo, o resultado vira sucesso crítico.',
    },
    {
      id: 'dragonblood-feats',
      name: 'Herança Dracônica',
      originalName: 'Draconic Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos dragonblood além dos da sua ancestralidade. Some Dracônico às opções de idioma da ancestralidade.',
    },
  ],
  choices: [
    {
      id: 'draconic-exemplar',
      label: 'Exemplar dracônico',
      required: false,
      hint: 'Só é obrigatório se um feito exigir (ex.: Sopro do Dragão). A tabela abaixo é a do Monster Core; “Outro” cobre dragões de outras fontes, com o mestre.',
      options: [
        {
          id: 'adamantine',
          label: 'Adamantina — primal · escavação · cone contundente (Reflexos)',
          originalLabel: 'Adamantine',
        },
        {
          id: 'conspirator',
          label: 'Conspiradora — oculta · escalada · cone de veneno (Fortitude)',
          originalLabel: 'Conspirator',
        },
        {
          id: 'diabolic',
          label: 'Diabólica — divina · cone de fogo (Reflexos)',
          originalLabel: 'Diabolic',
        },
        {
          id: 'empyreal',
          label: 'Empírea — divina · cone de espírito (Reflexos)',
          originalLabel: 'Empyreal',
        },
        {
          id: 'fortune',
          label: 'Fortuna — arcana · cone de força (Reflexos)',
          originalLabel: 'Fortune',
        },
        {
          id: 'horned',
          label: 'Cornífera — primal · natação · cone de veneno (Fortitude)',
          originalLabel: 'Horned',
        },
        {
          id: 'mirage',
          label: 'Miragem — arcana · escalada · cone mental (Vontade)',
          originalLabel: 'Mirage',
        },
        {
          id: 'omen',
          label: 'Presságio — oculta · cone mental (Vontade)',
          originalLabel: 'Omen',
        },
        {
          id: 'other',
          label: 'Outro (combinar com o mestre)',
          originalLabel: 'Other',
        },
      ],
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=368',
}

export const changelingHeritage: Heritage = {
  id: HERITAGE_CHANGELING_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Changeling',
  originalName: 'Changeling',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 76,
  traits: ['Changeling'],
  upgradeLowLightToDarkvision: true,
  description:
    'Lendas de crianças roubadas e trocadas por monstros existem em inúmeras culturas — mas os verdadeiros monstros são as bruxas (hags) que trazem essas crianças ao mundo, seja como mães de sangue ou quando a magia do coven atinge bebês nas aldeias vizinhas. A vida costuma começar como órfão ou excluído.\n\nUm changeling em geral se parece com um membro comum da outra ancestralidade, mas os olhos — cada um de uma cor — o denunciam. Um olho segue a linhagem do pai; o outro, a da mãe hag, muitas vezes em tom antinatural (violeta ou verde vivo). Nem todo heterocromático é changeling, mas esse traço dificulta esconder a natureza e pode levar ao banimento. Ao amadurecer, surgem outros dons da mãe: visão no escuro, unhas como garras e magia inata são os mais comuns.\n\nChangelings podem ser de qualquer gênero, mas mulheres em especial são vulneráveis ao Chamado: uma influência psíquica que urge abandonar a vida mortal, juntar-se ao coven e, no fim, tornar-se hag. Quem conhece a herança costuma temer o Chamado e resistir; quem ignora a origem pode sofrer uma compulsão terrível sem saber por quê.\n\nVocê pode… proteger amigos e família que o aceitam como é; buscar entender a mãe hag e os dons que ela deu, para o bem ou o mal, ou se afastar da herança; temer o dia em que ouvirá o Chamado — ou já lutar contra ele todos os dias.\n\nOutros provavelmente… assumem que você pratica magia oculta ou primal, ou que participa de um coven; temem que você seja um monstro em segredo, ou que se torne um, e virem contra você; notam e especulam sobre os seus olhos distintos.\n\nSua mãe era uma hag. A heterocromia é o sinal mais óbvio, mas você provavelmente também tem corpo mais esbelto, pele mais pálida e cabelo mais escuro do que a maioria da outra ancestralidade. Você ganha o traço changeling. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos changeling além dos da sua ancestralidade.',
  rulesSummary:
    'Traço changeling; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos changeling liberados.',
  senses: [
    {
      id: 'changeling-low-light-vision',
      ...LOW_LIGHT_VISION,
    },
  ],
  specialAbilities: [
    {
      id: 'changeling-feats',
      name: 'Herança da Hag',
      originalName: 'Hag Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos changeling além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=279',
}

export const dhampirHeritage: Heritage = {
  id: HERITAGE_DHAMPIR_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Dhampir',
  originalName: 'Dhampir',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 42,
  traits: ['Dhampir'],
  upgradeLowLightToDarkvision: true,
  description:
    'Muitos chamam vampiros de filhos da noite, mas são os dhampirs que realmente podem reivindicar o título. Filhos mortais de vampiros caminham entre vida e morte-não-vida — no corpo, no convívio e na visão de mundo. As circunstâncias do nascimento são raras, complexas e muitas vezes envolvidas em rumores horríveis: um pai mortal e um vampírico; alguém transformado em vampiro durante a gravidez; ou rituais ocultos que impõem uma maldição vampírica a um recém-nascido.\n\nA vida costuma ser difícil: poucos pais vampiros têm disposição para criar um filho mortal, e comunidades mortais acham a pele amarelada, os olhos penetrantes e a presença inquietante no mínimo desagradáveis. Apesar de vivos, dhampirs reagem a vitalidade e vazio como se fossem mortos-vivos — mal-vindos em muitas comunidades sagradas, muitas vezes empurrados às artes necromânticas. Não são imortais, mas envelhecem tão devagar quanto um elfo. Têm dificuldade em gerar filhos, e os poucos nascidos de um dhampir nunca são dhampirs. Em geral se parecem com a ancestralidade não-vampírica, com palidez fantasmagórica e olhos tão claros que parecem só pupila. Todos têm incisivos alongados; muitos comandam graça, beleza e charme apesar da aparência inquietante.\n\nVocê pode… se afastar da herança tentando se misturar ou até caçando mortos-vivos; tomar precauções para não ser exposto a magia de cura “útil”; sentir-se fascinado pela visão, cheiro ou gosto de sangue.\n\nOutros provavelmente… se inquietam com a palidez e os dentes afiados; imaginam ou até romantizam as suas origens; sentem-se estranhamente atraídos pela sua graça, charme e aparência.\n\nVocê é herdeiro de um vampiro, meio vivo e meio morto-vivo, com charme sobrenatural, palidez sem sangue e incisivos alongados. Você ganha o traço dhampir, além dos da sua ancestralidade. Você tem cura de vazio: dano de vitalidade o fere, e efeitos de vazio o curam como se fosse morto-vivo. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos dhampir além dos da sua ancestralidade.',
  rulesSummary:
    'Traço dhampir; cura de vazio (vitalidade fere, vazio cura); visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos dhampir.',
  senses: [
    {
      id: 'dhampir-low-light-vision',
      ...LOW_LIGHT_VISION,
    },
  ],
  specialAbilities: [
    {
      id: 'dhampir-void-healing',
      name: 'Cura de Vazio',
      originalName: 'Void Healing',
      actionType: 'passive',
      description:
        'Você é ferido por dano de vitalidade e curado por efeitos de vazio, como se fosse morto-vivo.',
    },
    {
      id: 'dhampir-feats',
      name: 'Herança Vampírica',
      originalName: 'Vampiric Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos dhampir além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=367',
}

export const duskwalkerHeritage: Heritage = {
  id: HERITAGE_DUSKWALKER_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Duskwalker',
  originalName: 'Duskwalker',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 48,
  traits: ['Duskwalker'],
  upgradeLowLightToDarkvision: true,
  description:
    'Um duskwalker não nasce: é criado, manifestando-se como criança mortal num lugar ligado à morte. Encarnam o poder sóbrio dos psicopompos, guardiões e pastores dos mortos, e mantêm fascínio e compreensão profunda da morte. Mais singulares que outras heranças versáteis, não têm linhagens diferentes.\n\nOs primeiros surgiram de um acordo entre dois psicopompos poderosos. Um achava que almas que preservaram o ciclo da vida e da morte — mas tiveram a própria vida cortada — mereciam reencarnação; o outro via nisso uma violação do mesmo ciclo. A concessão: tais renascimentos podem ocorrer, mas em número limitado. Só existe uma quantidade finita de duskwalkers ao mesmo tempo.\n\nQuando um duskwalker perece e enfrenta o julgamento final, um novo se encarna em até um ano a partir de uma alma merecedora, em geral longe do nascimento do anterior. Manifestam-se em locais santificados ligados à morte — cemitérios, templos — e começam a vida na adolescência. Nenhum é capaz de gerar filhos biológicos, o que não impede famílias, em geral por adoção. Têm compreensão inata do ciclo da vida e da morte, na maioria das vezes como respeito profundo por esse ciclo.\n\nVocê pode… tratar a morte com seriedade e respeito, sem a temer; sentir-se responsável por guiar outros no luto ou no fim da vida; buscar um lugar no mundo mortal apesar de não ter sido “nascido” nele.\n\nOutros provavelmente… acham sua calma diante da morte inquietante; perguntam se você é um espírito ou um morto-vivo; esperam que você saiba o que acontece depois da morte.\n\nGraças a um acordo antigo, sua alma renasceu como duskwalker, cionte planar ligado a psicopompos e ao Ossário. Você ganha o traço duskwalker. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Nem o corpo nem o espírito podem jamais se tornar mortos-vivos. Ao ganhar um feito de ancestralidade, pode escolher feitos duskwalker além dos da sua ancestralidade.',
  rulesSummary:
    'Traço duskwalker; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; nunca se torna morto-vivo; feitos duskwalker.',
  senses: [
    {
      id: 'duskwalker-low-light-vision',
      ...LOW_LIGHT_VISION,
    },
  ],
  specialAbilities: [
    {
      id: 'duskwalker-no-undead',
      name: 'Além da Não-Vida',
      originalName: 'Never Undead',
      actionType: 'passive',
      description:
        'Nem o seu corpo nem o seu espírito podem jamais se tornar mortos-vivos.',
    },
    {
      id: 'duskwalker-feats',
      name: 'Herança do Ossário',
      originalName: 'Boneyard Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos duskwalker além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=369',
}

export const hungerseedHeritage: Heritage = {
  id: HERITAGE_HUNGERSEED_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Hungerseed',
  originalName: 'Hungerseed',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 36,
  traits: ['Hungerseed', 'Oni'],
  description:
    'Oni em Tian Xia costumam ser vistos como criaturas malignas saciadas só por sangue e carnificina. Nem todos têm fomes tão violentas, e mesmo os piores não estão tão longe dos mortais mais glutões ou ambiciosos. Histórias de humanos que tomam uma noiva oni circulam em vilarejos rurais e, de vez em quando, nasce uma criança com chifres delatores ou um terceiro olho. Chamados de meio-oni ou onispawn, esses hungerseeds — nomeados pelos apetites lendários dos oni — costumam ser jovens difíceis, com o temperamento adolescente maior que o bom senso.\n\nA aparência é incrivelmente diversa. Pele, chifres, pés e cabelo seguem o pai oni; muitos herdam o porte enorme, outros são esguios ou até mais baixos que ambos os pais. Caminham na linha entre mortal e sobrenatural, um pé garrado em cada mundo.\n\nChu Ye, nação controlada por oni, tem a maior população de hungerseeds em Tian Xia. Ocupam quase todas as profissões, mas muitos escolhem papéis de combate. Alguns se sentem mais seguros em Chu Ye, longe dos preconceitos; outros se sentem deslocados por não serem oni de fato e viram andarilhos ou bandos mercenários.\n\nPersonagens de origem Tian têm acesso a esta herança incomum.\n\nVocê pode… ser atraído a soluções físicas; lutar contra fome voraz e raiva relâmpago; envolver-se no mundo espiritual, do qual você faz parte queira ou não.\n\nOutros provavelmente… assumem que você é um combatente poderoso; focam a herança oni acima do passado mortal; temem você e o consideram malévolo.\n\nUm dos seus pais era oni ou hungerseed. Você tem um par de chifres, de nódulos cônicos a protuberâncias longas. Pode ter outros sinais — pele colorida, presas e garras, ou um terceiro olho na testa. Você ganha o traço oni. Você ganha um ataque desarmado de chifres que causa 1d6 de dano perfurante e está no grupo briga. Ao ganhar um feito de ancestralidade, pode escolher feitos hungerseed além dos da sua ancestralidade.',
  rulesSummary:
    'Traço oni; ataque desarmado de chifres (1d6 perfurante, briga); feitos hungerseed.',
  specialAbilities: [
    {
      id: 'hungerseed-horns',
      name: 'Chifres',
      originalName: 'Horns',
      actionType: 'passive',
      description:
        'Você ganha um ataque desarmado de chifres que causa 1d6 de dano perfurante. O ataque está no grupo briga.',
    },
    {
      id: 'hungerseed-feats',
      name: 'Herança Oni',
      originalName: 'Oni Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos hungerseed além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=371',
}

export const reflectionHeritage: Heritage = {
  id: HERITAGE_REFLECTION_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Reflexo',
  originalName: 'Reflection',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_DARK_ARCHIVES_ID,
  sourcePage: 120,
  traits: ['Reflection'],
  description:
    'Histórias de duplicatas malévolas assustam companheiros à fogueira: o duplo surge após ritual falho ou artefato misterioso e quer substituir quem copiou. A maioria acha que é só conto — mas reflexos são reais. Alguns querem substituir o progenitor; outros só querem forjar uma vida nova onde ninguém saiba da origem.\n\nOs métodos de criação variam, mas todo reflexo é duplicata de alguém que existe no mundo. Alguns saem de espelhos literais, ganhando vida ao se libertar do Pálido Ecoante. Rituais ou magias focados em espelhos podem criar reflexos independentes, de propósito ou por acidente, assim como o perigo mágico chamado espelho do lado sombrio, que troca quem olha por duplicatas maliciosas. Alguns são clones mágicos de conjuradores, que se voltam contra o criador ou ficam à deriva; outros nascem de magia de polimorfia que deu errado.\n\nA aparência quase coincide com a do progenitor. Nos surgidos do espelho, os detalhes estão invertidos (cicatrizes do outro lado). Outros têm uma marca em redemoinho, como tatuagem ou sinal de nascença. Em geral são indistinguíveis de um membro comum da ancestralidade. Não têm sociedade própria; muitos carregam angústia existencial e buscam um lugar onde não sejam “falsos”. O laço mais forte (nem sempre o melhor) costuma ser com o progenitor.\n\nVocê pode… sentir-se uma imitação deslocada; querer guardar a natureza em segredo, salvo de companheiros de confiança; ser extremamente dedicado a quem lhe dá senso de comunidade.\n\nOutros provavelmente… não percebem que você é uma cópia; esperam que você planeje um destino nefasto para o progenitor; desconfiam ou se intrigam com as suas habilidades incomuns.\n\nVocê foi criado como duplicata de outra criatura, de propósito ou por acidente, embora possa não saber da origem. Além de uma marca ou duas, você é igual ao progenitor. Você ganha o traço reflection, além dos da sua ancestralidade. Você não precisa de testes de Enganação para Fingir ser o progenitor, a menos que interaja com quem o conhece pessoalmente ou faça algo fora do caráter dele. O mestre pode exigir teste em outras circunstâncias (por exemplo, se você for surgido do espelho e alguém tiver visto um retrato fiel). Ao ganhar um feito de ancestralidade, pode escolher feitos de reflexo além dos da sua ancestralidade.',
  rulesSummary:
    'Traço reflection (raro); Fingir ser o progenitor sem teste, salvo quem o conhece de perto; feitos de reflexo.',
  specialAbilities: [
    {
      id: 'reflection-impersonate',
      name: 'Cópia Fiel',
      originalName: 'Perfect Duplicate',
      actionType: 'passive',
      description:
        'Você não precisa de testes de Enganação para Fingir ser o seu progenitor, a menos que interaja com pessoas que o conhecem pessoalmente ou faça algo conhecido como fora do caráter dele. O mestre pode exigir um teste em outras circunstâncias (por exemplo, se você for surgido do espelho e alguém tiver visto um retrato fiel, notando um detalhe invertido).',
    },
    {
      id: 'reflection-feats',
      name: 'Herança de Reflexo',
      originalName: 'Reflection Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos de reflexo além dos da sua ancestralidade.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=428',
}

export const beastkinHeritage: Heritage = {
  id: HERITAGE_BEASTKIN_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Beastkin',
  originalName: 'Beastkin',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_ANCESTRY_GUIDE_ID,
  sourcePage: 79,
  traits: ['Beastkin', 'Besta'],
  requiredAncestryTraits: ['Humanoide'],
  description:
    'Beastkin é o nome para quem consegue se transformar, em parte ou por completo, num animal — e ainda assim equilibra o lado humanoide. A maioria nasce de licantropos ou tem um na linhagem: a maldição não se manifesta por inteiro, e fica a natureza transformadora sem fraqueza a prata nem perda de controle na lua cheia. Licantropos costumam ter esses descendentes em alta conta: herdam muitas forças e nenhuma das fraquezas.\n\nHá outros caminhos. Uma divindade ou espírito da natureza pode conceder o poder. Truques feéricos ou reações estranhas a magia de polimorfia também criam beastkin. Há rumores de animais metamorfos que ganharam forma de uma ancestralidade sapiente, e não o contrário.\n\nNa forma humanoide, a maioria é indistinguível da ancestralidade-base. Na forma híbrida — a forma natural da herança — dentes se destacam, a pele endurece como couro, o cabelo cresce e os olhos mudam. Quem se transforma em animal de verdade costuma manter um traço humanoide, como a cor dos olhos.\n\nMuitos se misturam às sociedades dos pais, escondendo a natureza quando preciso. Fronteiras e povos nômades aceitam melhor a forma preferida. Comunidades de beastkin e licantropos do mesmo animal costumam viver perto do habitat daquela espécie. Quem não conhece a diferença trata beastkin como licantropo na lua cheia; o apelido “skinwalker” vem de rumores ignorantes, e beastkin o rejeitam.\n\nEntre os ulfen, a habilidade é honra, não maldição — sobretudo urso, lince e lobo. Guerreiros rezam a Yrmidar, o Velho Urso.\n\nVocê pode… preferir um círculo íntimo de amigos; buscar o animal inerente para se entender melhor; isolar-se de quem não compreende o lado animal.\n\nOutros provavelmente… acham que você pratica magia primal ou fala com a natureza; assumem que você ama animais, sobretudo o seu; temem que o instinto feral tome conta.\n\nSó criaturas com o traço humanoide podem pegar esta herança. Escolha um tipo de animal (morcego, águia, tubarão, aranha, tiranossauro, vespa, lobo…). Esse é o seu animal inerente. Você ganha os traços beast e beastkin, além dos da sua ancestralidade. Você ganha Mudar Forma. A forma híbrida é a forma natural. Ao ganhar um feito de ancestralidade, pode escolher feitos beastkin além dos da sua ancestralidade.',
  rulesSummary:
    'Raro; só ancestralidades humanoides; escolha um animal inerente; traços beast e beastkin; Mudar Forma (híbrida = natural) com mandíbulas 1d4 P (ágil, finura); feitos beastkin.',
  specialAbilities: [
    {
      id: 'beastkin-change-shape',
      name: 'Mudar Forma',
      originalName: 'Change Shape',
      actionType: 'one',
      description:
        'Você muda para a forma humanoide ou híbrida. Cada forma tem aparência fixa; a maioria permanece na híbrida por padrão. Na forma híbrida você parece uma mistura da ancestralidade com o animal inerente e ganha um Golpe desarmado de mandíbulas (presas, bico, mandíbulas de inseto etc.): 1d4 perfurante, traços ágil, finura e desarmado, grupo briga. Na forma humanoide você retém a aparência da ancestralidade original. (Concentrar, polimorfia, primal.)',
    },
    {
      id: 'beastkin-feats',
      name: 'Herança Bestial',
      originalName: 'Beastkin Ancestry',
      actionType: 'passive',
      description:
        'Ao ganhar um feito de ancestralidade, você pode escolher feitos beastkin além dos da sua ancestralidade.',
    },
  ],
  choices: [
    {
      id: 'inherent-animal',
      label: 'Animal inerente',
      hint: 'Define a aparência da forma híbrida e quais sentidos/deslocamentos os feitos podem conceder. “Outro” cobre qualquer animal com o mestre.',
      options: [
        { id: 'bat', label: 'Morcego', originalLabel: 'Bat' },
        { id: 'bear', label: 'Urso', originalLabel: 'Bear' },
        { id: 'boar', label: 'Javali', originalLabel: 'Boar' },
        { id: 'cat', label: 'Felino', originalLabel: 'Cat' },
        { id: 'crocodile', label: 'Crocodilo', originalLabel: 'Crocodile' },
        { id: 'eagle', label: 'Águia', originalLabel: 'Eagle' },
        { id: 'fox', label: 'Raposa', originalLabel: 'Fox' },
        { id: 'frog', label: 'Sapo', originalLabel: 'Frog' },
        { id: 'horse', label: 'Cavalo', originalLabel: 'Horse' },
        { id: 'lizard', label: 'Lagarto', originalLabel: 'Lizard' },
        { id: 'owl', label: 'Coruja', originalLabel: 'Owl' },
        { id: 'rat', label: 'Rato', originalLabel: 'Rat' },
        { id: 'raven', label: 'Corvo', originalLabel: 'Raven' },
        { id: 'shark', label: 'Tubarão', originalLabel: 'Shark' },
        { id: 'snake', label: 'Serpente', originalLabel: 'Snake' },
        { id: 'spider', label: 'Aranha', originalLabel: 'Spider' },
        { id: 'tyrannosaurus', label: 'Tiranossauro', originalLabel: 'Tyrannosaurus' },
        { id: 'wasp', label: 'Vespa', originalLabel: 'Wasp' },
        { id: 'wolf', label: 'Lobo', originalLabel: 'Wolf' },
        { id: 'other', label: 'Outro (combinar com o mestre)', originalLabel: 'Other' },
      ],
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=119',
}

export const versatileHeritages: Heritage[] = [
  aiuvarinHeritage,
  dromaarHeritage,
  nephilimHeritage,
  dragonbloodHeritage,
  changelingHeritage,
  dhampirHeritage,
  duskwalkerHeritage,
  hungerseedHeritage,
  reflectionHeritage,
  beastkinHeritage,
  ...geniekinHeritages,
]
