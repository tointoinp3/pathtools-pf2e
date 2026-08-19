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
 * Lore de família Remaster para o 5º lote do Monster Core 2.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core 2 / Howl of the Wild).
 * Famílias já existentes (elemental, coatl, vampiro, agathion, troll, mosassauro,
 * objeto animado, gigante, ninfa, gambá, demônio, sahkil, psicopompo, anjo,
 * esqueleto, espectro, hipopótamo, autômato, proteano, bruxa, alghollthu, velstrac,
 * kami, asura, topiária viva, daemon, azata, dinossauro) não se repetem aqui.
 */
export const catalogCreatureFamiliesMonsterCore2Batch5: CreatureFamily[] = [
  fam({
    id: 'family-hadrinnex',
    name: 'Hadrinnex',
    originalName: 'Hadrinnex',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Hadrinnex',
    intro:
      "Os bizarros hadrinnexes lembram mais sistemas defensivos do que criaturas vivas. Evoluem a um ritmo acelerado, mas só contra ataques específicos contra eles, o que sugere que foram criados por tecnologia avançada ou magia. O casco que envolve um hadrinnex — flocos de metal suspensos numa carapaça orgânica maleável — se remodela em resposta ao dano. O mesmo pode fazer uma glândula brilhante no tórax da criatura, que coleta energia e reestrutura a biologia para protegê-la dessa energia. Esse órgão é frágil e se rompe logo depois que um hadrinnex é morto.\n\nHadrinnexes têm só um intelecto rudimentar e em geral seguem aberrações mais inteligentes. Como guarda-costas ou peões, executam tarefas simples com diligência. Embora fracos em resolução de problemas e improvisação, a confiabilidade e a fisiologia adaptativa dos hadrinnexes os tornam ideais para tarefas perigosas em ambientes hostis.",
    sections: [],
  }),
  fam({
    id: 'family-swarm-strider',
    name: 'Andarilho-enxame',
    originalName: 'Swarm Strider',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=624',
    intro: stripList(
      'Toda criatura viva acaba virando comida de verme. Porém, se uma criatura perece tomada por emoção avassaladora ou assunto inacabado, a carne pode infundir-se com essas obsessões ou com uma recusa simples de perecer, infectando quaisquer detritívoros que se alimentem do corpo. Conforme se alimentam, os invertebrados despertam para um tipo de inteligência coletiva, inclusive algumas memórias e motivações da criatura morta. Quando o corpo é despido até o osso, os vermes se reúnem e se entrelaçam para recriar a forma da criatura morta a partir de milhares de corpos contorcidos. Esses renascidos são conhecidos como andarilhos-enxame.\n\nEmbora muitos andarilhos-enxame sejam criações acidentais, alguns mortais raros se transformam de propósito em andarilhos-enxame por rituais poderosos. Na maioria das vezes, esse processo envolve preparar especialmente uma cova com necrófagos abundantes e encantar o sítio com magia oculta para ancorar a alma até que possa viver no enxame. Pela transformação, esses andarilhos-enxame intencionais buscam o poder de esgueirar-se por qualquer defesa ou reivindicar a imortalidade virtual de uma horda que se regenera sem fim, pois um andarilho-enxame pode reconstituir a forma até de um único verme. Porém, a transformação inevitavelmente marca a criatura — muitas vezes causando desapego emocional, a desintegração de tabus antigos e um senso de si dissociado agora que uma mente se tornou mil. No estado transformado, até o andarilho-enxame de melhor intenção pode abraçar a vilania e perder qualquer semelhança com o eu anterior ao longo de muitos anos.',
    ),
    sections: [
      {
        id: 'a-swarm-s-hoard',
        title: 'O tesouro de um enxame',
        body: 'Um andarilho-enxame muitas vezes embala um sortimento de bugigangas e talismãs dentro do corpo ondulante, junto com roupas e armadura flexíveis o bastante para caber por frestas quando a criatura se descorporifica. Quaisquer outros bens de valor ficam enterrados, muitas vezes escondidos sob vários metros de solo no covil do andarilho-enxame. Assim, recuperar a riqueza da criatura muitas vezes exige uma pá, determinação e horas de trabalho braçal.',
      },
      {
        id: 'fantastical-feasts',
        title: 'Banquetes fantásticos',
        body: 'Seres de outro mundo e ambientes mágicos podem gerar andarilhos-enxame verdadeiramente fantásticos. O solo da Sarkoris Scar imprime traços capetas e impulsos malevolentes, sobretudo a andarilhos-enxame que se alimentam de carne demoníaca. Seres compostos inteiramente de mariposas sugadoras de sangue não são inéditos na sociedade de Geb. Há até andarilhos-enxame de aves camaleônicas ditos viver perto de fendas do Primeiro Mundo.',
      },
      {
        id: 'split-personality',
        title: 'Personalidade dividida',
        body: 'Embora um andarilho-enxame tenha uma inteligência coletiva e muitas memórias da vida passada, a natureza dessa inteligência pode mudar com o tempo. Cada uma das criaturas constituintes age como um neurônio específico num cérebro e, conforme se perdem ou são substituídas, as facetas associadas da personalidade do andarilho-enxame podem mudar. Destruir a maior parte de um andarilho-enxame pode deixar o todo regenerado com amnésia. Da mesma forma, se dois ou mais andarilhos-enxame esgotados se combinam, as personalidades muitas vezes se fundem numa identidade inteiramente nova.',
      },
      {
        id: 'swarms-of-different-forms',
        title: 'Enxames de formas diferentes',
        body: 'Nos ambientes certos — sobretudo onde outros invertebrados são mais comuns — andarilhos-enxame podem ser compostos de bichos improváveis. Seguem-se várias variantes possíveis.\n\n**Broca-de-livro:** Estudantes natos presos em bibliotecas labirínticas, esses andarilhos-enxame consomem vorazmente conhecimento — inclusive os grimórios e pergaminhos de quem sofre dano do Abraço Contorcido!\n\n**Cigarra:** Esses andarilhos-enxame barulhentos muitas vezes hibernam por anos a fio, e o chiado é conhecido por contrariar efeitos auditivos.\n\n**Lampreia:** O cadáver de um kraken ou uma queda de baleia despertada pode vazar inteligência nas lampreias que se alimentam da carne, criando andarilhos-enxame aquáticos de tamanho e alcance prodigiosos.\n\n**Sanguessuga:** Este andarilho-enxame sugador de sangue em geral forma-se de um cadáver fresco exsanguinado num pântano infestado de sanguessugas, ganhando tanto a habilidade de nadar quanto de causar sangramento persistente em vez de dano perfurante.\n\n**Vespa:** Picando e zumbindo, um andarilho vespa voa, movendo-se bem mais depressa no ar do que no chão.',
      },
    ],
  }),
  fam({
    id: 'family-adlet',
    name: 'Adlet',
    originalName: 'Adlet',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Adlet',
    intro:
      'Adlets habitam os recantos mais distantes e duros da Coroa do Mundo, com alguns viajando além para regiões igualmente gélidas em outros continentes. À primeira vista, esse povo isolado parece muito com os primos humanos Erutaki; em geral têm cabelo negro e liso e compleições compactas e poderosas. Porém, adlets tendem a mover-se com mais graça que os parentes humanos. De perto, a estranheza se revela: cada um tem um rosto peludo e ostenta uma boca cheia de dentes de lobo. As pernas e as caudas lembram as de cães.',
    sections: [],
  }),
  fam({
    id: 'family-blood-painter',
    name: 'Pintor de Sangue',
    originalName: 'Blood Painter',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Blood%20Painter',
    intro:
      'Simultaneamente enamorados do mundo natural e demais alienígenas para sobreviver nele, pintores de sangue são artistas de oito membros que espreitam, matam e desmembram em busca de pigmento e sustento. A fisiologia do pintor de sangue não consegue digerir comida típica, então as criaturas alimentam-se colhendo sangue e usando-o para pintar e animar algo comestível.',
    sections: [],
  }),
  fam({
    id: 'family-garuda',
    name: 'Garuda',
    originalName: 'Garuda',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Garuda',
    intro:
      'Garudas são humanoides alados criados para servir deuses sagrados e outros seres celestiais poderosos. Originalmente nascidos entre os planos celestiais, garudas por fim se espalharam além, e muitos fizeram o caminho até o Universo mortal. Como servos divinos, os papéis primários das garudas são de protetores, defendendo sítios sagrados e figuras divinas importantes como sumos sacerdotes.',
    sections: [],
  }),
  fam({
    id: 'family-jyoti',
    name: 'Jyoti',
    originalName: 'Jyoti',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Jyoti',
    intro:
      'Jyotis às vezes são chamados de “fênixes falsas” (um termo que acham insultuoso) pelos ignorantes ou obstinados. Esses humanoides aviários são nativos da Forja da Criação, onde são os zeladores das flores cristalinas do tamanho de árvores no Jardim da Forja da Criação. Essas manifestações físicas de almas mortais que ascenderam à divindade são protegidas e veneradas pelos jyotis. Raramente deixam esse reino enigmático e veem visitantes de outros planos como manchas na pureza do lar.',
    sections: [],
  }),
  fam({
    id: 'family-aesir',
    name: 'Aesir',
    originalName: 'Aesir',
    trait: 'Aesir',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=570',
    intro: stripList(
      'Aesir são tanto guerreiros quanto monitores que buscam sem parar afiar as habilidades de campo de batalha. Empolgam-se com o desafio do combate e consideram covardes quem busca resoluções diplomáticas para o conflito. Muitas vezes falam com carinho de um tempo no futuro distante em que o multiverso inteiro será arrastado para uma batalha gloriosa pelo destino da criação.',
    ),
    sections: [],
  }),
  fam({
    id: 'family-spirit-guide',
    name: 'Guia Espiritual',
    originalName: 'Spirit Guide',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 182,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=502',
    intro: stripList(
      'Muitos dos defensores mais ferozes de Sarkoris entre os guias espirituais da terra morreram nos primeiros embates do conflito contra os demônios que transbordavam do Worldwound. As poderosas serpentes de escamas solares da família dos guias-guardiões costumavam derramar a luz sobre a terra, mas as asas estavam entre as primeiras luzes enegrecidas pelas hordas do senhor demoníaco dos gafanhotos. Os guias velozes foram os primeiros à refrega, e os primeiros a cair. Com o Worldwound fechado e os demônios em retirada, alguns desses guias retornaram mais uma vez, ajudando a assegurar as fronteiras da Sarkoris Scar contra o ressurgimento demoníaco.',
    ),
    sections: [
      {
        id: 'permanent-bonds',
        title: 'Laços permanentes',
        body: 'Um guia espiritual pode formar um laço permanente e estreito com um mortal, concedendo a ambos habilidades novas. Tais pares vinculados podem ver pelos olhos um do outro, coordenar as ações a um grau inigualável e acudir um ao outro num instante. Lendas afirmam que um par assim ligado pode até compartilhar essência vital, crescendo e aprendendo juntos ao longo da vida do mortal.',
      },
      {
        id: 'spirit-guide-companions',
        title: 'Companheiros guia espiritual',
        body: 'Um jeito de ganhar o auxílio de um guia espiritual é tomar o arquétipo dos herdeiros de Domora. Esse arquétipo permite ao personagem escolher um guia espiritual para acompanhá-lo nas aventuras — desde que primeiro prove ser digno da honra.',
      },
      {
        id: 'strength-and-adversity',
        title: 'Força e adversidade',
        body: 'Na região das Terras Quebradas conhecida como Sarkoris Scar, guias espirituais prestam auxílio crucial na luta contra os demônios que ainda infestam a terra envenenada. Cavaleiros testados em batalha e recobradores sarkorianos igualmente contam inúmeras histórias de resgate, como quando um urso em carga, coberto de penas, arrancou demônios da ira dos céus, ou como uma águia fantasma com escamas de dragão mergulhou para salvá-los da lâmina descendente de um demônio do orgulho. Outros falam de descobrir estoques de comida segura, água limpa e cobertores deixados por raposas ou martas fantasmais justo quando toda esperança parecia perdida.',
      },
      {
        id: 'the-sarkoris-scar',
        title: 'A Sarkoris Scar',
        body: 'Alguns guias espirituais encontrados nos ermos assombrados agora conhecidos como Sarkoris Scar são restos da invocação de deuses, uma tradição antiga praticada por muitas culturas sarkorianas. Cortados dos invocadores pela guerra demoníaca que devastou a terra por mais de um século, tais deuses agora vagueiam a paisagem devastada, ocasionalmente ajudando quem acham digno.',
      },
    ],
  }),
  fam({
    id: 'family-gug',
    name: 'Gug',
    originalName: 'Gug',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Gug',
    intro:
      "A feição mais horrenda de um gug é a cabeça em forma de barril, que se fende na vertical para revelar inúmeras fileiras de dentes amarelos e afiados e uma garganta aberta. Os olhos de cada lado da cabeça-mandíbula são pequenos, mas aguçados. Cristas ósseas protegem os olhos do debater frenético da presa, pois prefere refeições de carne crua e contorcida a fungos e mofos. Agarra essa presa com braços poderosos que se fendem no cotovelo num par de antebraços, dando-lhe quatro patas garradas. Esses brutos monstruosos são cobertos de pelo negro e eriçado, muitas vezes incrustado de sangue e vísceras.\n\nEmbora gugs possam parecer bestiais, têm intelectos aguçados e vis. Gugs fazem covil bem no subterrâneo, mas às vezes vêm à superfície para caçar durante noites escuras, sozinhos ou em grupos pequenos. Como possuem apetites vorazes, a maioria dos gugs consome as criaturas que pega, mas alguns em vez disso sequestram as vítimas e recuam abaixo da superfície, deixando só um fedor persistente e pegadas estranhas de patas garradas. As vítimas são levadas a covis râncidos marcados com runas estranhas e sacrificadas aos deuses vis dos gugs de sangue, escuridão e pesadelos. Rumores pavorosos falam de cidades de gug sem luz feitas de blocos titânicos de pedra bem no subterrâneo, onde líderes gug poderosos pregam as doutrinas vis a multidões de gugs uivantes.\n\nGugs têm um relacionamento estranho com carniçais, que parece datar da origem compartilhada num mundo subterrâneo distante. Gugs vivem com medo de carniçais, apesar de se erguerem sobre eles; porém, esse medo estranho não se aplica a ghasts, a quem gugs consomem tão vorazmente quanto fazem com outras criaturas.\n\nGugs têm 4,8 m de altura e pesam 900 kg, embora tenham um andar inquietante e gracioso que desmente o tamanho imenso. O passo leve e a habilidade de espremer-se por frestas muito pequenas fazem dos gugs bichos-papões comuns em contos de desaparecimentos estranhos ou massacres sangrentos.\n\nAlguns gugs particularmente sedentos de sangue ganham poderes pavorosos como dons dos patronos arcanos estranhos. Esses monstros são conhecidos como savants, nunca têm menos que 12º nível de poder, e ganham várias magias inatas ocultas. Embora a mistura precisa de magias de cada savant varie, normalmente essas magias concedem invisibilidade, oferecem poder para manipular e mudar rocha, ou invocam energias pavorosas e destrutivas sobre carne viva.",
    sections: [],
  }),
  fam({
    id: 'family-mobogo',
    name: 'Mobogo',
    originalName: 'Mobogo',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Mobogo',
    intro:
      'Mobogos são monstruosidades maciças habitantes de pântano que combinam os piores aspectos de sapos gigantes e dragões maus. Preguiçosos, cruéis e gananciosos, esses seres vis fazem covil nos pântanos mais antigos e primordiais. Os boggards que chamam tais lugares de lar adoram mobogos como semideuses vivos, trazendo regularmente sacrifícios de comida e bens de valor para não se tornarem as próximas vítimas dos apetites sem fundo dos mobogos.',
    sections: [],
  }),
  fam({
    id: 'family-swordkeeper',
    name: 'Guardião da Espada',
    originalName: 'Swordkeeper',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Swordkeeper',
    intro:
      'Colecionadores que querem guardar os arsenais mágicos procuram ou constroem guardiões da espada. Esses construtos de múltiplos braços são em partes iguais vitrine e sistema de segurança, cada um guardando uma única arma dentro do corpo e projetando cópias da arma armazenada para dissuadir pretensos ladrões.',
    sections: [],
  }),
  fam({
    id: 'family-water-orm',
    name: 'Orm Aquático',
    originalName: 'Water Orm',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Water%20Orm',
    intro:
      'Essas criaturas lendárias que espreitam lagos remotos sempre parecem achar o caminho até os causos de taverna das comunidades à beira d’água. Para alguns viajantes, todo lago de tamanho respeitável parece cercado de vilas cheias de pescadores que afirmam ter avistado um orm aquático. Essas criaturas elusivas habitam lagos sobretudo em regiões frias e sombrias. Alguns afirmam que orms aquáticos são um desdobramento de serpentes marinhas e linnorms, mas nenhum vínculo crível entre essas criaturas foi encontrado.',
    sections: [],
  }),
  fam({
    id: 'family-argorth',
    name: 'Argorth',
    originalName: 'Argorth',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Argorth',
    intro:
      'Um argorth é uma criatura enorme, semelhante a um verme, com três mandíbulas maciças e cravadas cercando a goela triturante. Move-se sobre uma série de ossos em forma de gancho que saem da barriga, suplementados por um empurrão ocasional com a metade traseira dos 9 m de comprimento. O argorth irracional e sem olhos não conhece nada além de raiva e destruição, tornando-o mais como um desastre natural do que qualquer fera conhecida do mundo natural.',
    sections: [],
  }),
  fam({
    id: 'family-atrixyl',
    name: 'Atrixyl',
    originalName: 'Atrixyl',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Atrixyl',
    intro:
      'Muito raramente, quando sinspawns sacrificam seres sencientes a poços de runas, em vez de sinspawn surge um tipo de aberração de todo diferente. Atrixyls são guerreiros humanoides insetoides cujos poderes são semelhantes, porém mais fortes, que os de sinspawns comuns, e que se dedicam a destruir poços de runas e artefatos semelhantes de distorção da carne. Alguns atrixyls buscam destruir poços de runas por uma impressão de dor e sofrimento que ocorre durante a criação, buscando impedir sofrimento futuro. Outros buscam quebrar um poço de runas e sacar as energias mágicas para ganhar poder pessoal.',
    sections: [],
  }),
  fam({
    id: 'family-brainchild',
    name: 'Brainchild',
    originalName: 'Brainchild',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Brainchild',
    intro:
      'Um rumor pode tornar-se tão vívido e persistente que ganha vida, criando um brainchild — uma ilusão viva que eclode da crença intensa num assassino implacável e sem remorso. Muitas vezes, esses rumores nascem de vítimas de uma magia. As capacidades de um brainchild crescem quando perseguem um crente, mas murcham contra céticos, tornando-os só tão perigosos quanto se acredita que sejam.',
    sections: [],
  }),
  fam({
    id: 'family-larabay',
    name: 'Larabay',
    originalName: 'Larabay',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Larabay',
    intro:
      'Larabays são fey de olhos brilhantes, aparência humanoide, asas coloridas e dentes semelhantes a agulhas que em geral residem ao longo de regiões costeiras quentes e ilhas. Como outros fey, deleitam-se com trotes extravagantes e ilusões fantásticas que criam confusão. O desejo de um larabay por uma piada às vezes pode chegar a extremos graves, como empregar ilusões para atrair navios contra rochas e viajantes para fora de penhascos.',
    sections: [],
  }),
]
