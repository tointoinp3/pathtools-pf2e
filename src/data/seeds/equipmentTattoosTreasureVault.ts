import { tattooItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

function t(opts: Parameters<typeof tattooItem>[0]): ItemDefinition {
  return tattooItem({ sourceBook: 'Treasure Vault (Remastered)', ...opts })
}

/**
 * Tatuagens mágicas — Treasure Vault (Remastered). Não é o Treasure Vault legado.
 */
export const TREASURE_VAULT_TATTOOS: ItemDefinition[] = [
  t({
    id: 'tattoo-2202',
    aonId: 2202,
    name: 'Geometria ancestral',
    originalName: 'Ancestral Geometry',
    level: 2,
    priceGp: 30,
    page: 119,
    rarity: 'uncommon',
    description:
      'Ângulos anões e histórias da família. Nas preparações diárias, uma visitação: role 2d20 e guarde o maior; 1d6 define Fortitude (1–2), Reflexos (3–4) ou Vontade (5–6). +1 de item numa perícia Saber ligada ao ancestral. Ativar (concentrar, fortuna): 1 vez ao dia, ao rolar essa salvaguarda, troque pelo d20 guardado.',
  }),
  ...bewitchingBlooms(),
  t({
    id: 'tattoo-2204',
    aonId: 2204,
    name: 'Garrafa bêbada',
    originalName: 'Boozy Bottle',
    level: 5,
    priceGp: 140,
    page: 119,
    description:
      'Tatuagem de garrafa. Ativar (concentrar): 1 vez ao dia. Você ou um aliado a 9 m fica eufórico 1 minuto: +1 de status em salvaguardas contra mental, −1 em Percepção e Acrobacia.',
  }),
  t({
    id: 'tattoo-2205',
    aonId: 2205,
    name: 'Guardião da fauna',
    originalName: 'Fauna Guardian',
    level: 9,
    priceGp: 675,
    page: 119,
    description:
      'Animal totem. +1 de item em Natureza. Ativar (concentrar): 1 vez ao dia, convoca um animal do totem (como convocar animal de 4º posto) por 1 minuto.',
  }),
  ...grades(2206, 'Corte no olho', 'Eye Slash', 119, [
    { key: '', name: '', original: '', level: 1, price: 20, extra: 'Quando um inimigo a 9 m falha um ataque contra você, fica ofuscado até o início do próximo turno dele.' },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 4, price: 100, extra: 'Como o básico, e você ganha visão na penumbra.' },
    { key: '-major', name: ' máximo', original: ' (Major)', level: 9, price: 700, extra: 'Como o maior, e visão no escuro 18 m.' },
    { key: '-true', name: ' verdadeiro', original: ' (True)', level: 17, price: 15000, extra: 'Como o máximo, e visão no escuro maior 18 m.' },
  ], 'Cicatriz ritual no rosto. '),
  ...grades(2207, 'Tatuagem da fé', 'Faith Tattoo', 120, [
    { key: '', name: '', original: '', level: 4, price: 80, extra: 'Símbolo da sua divindade. +1 de item em Religião. Ativar: 1 vez ao dia, canalizar o vocábulo da divindade (como o feito).' },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 8, price: 425, extra: 'Como a básica, e +1 de status em salvaguardas contra efeitos da divindade oposta.' },
    { key: '-major', name: ' máxima', original: ' (Major)', level: 12, price: 1700, extra: 'Como a maior. O canal é mais forte (como o feito avançado).' },
    { key: '-true', name: ' verdadeira', original: ' (True)', level: 16, price: 8000, extra: 'Como a máxima, com o canal lendário da fé.' },
  ]),
  t({
    id: 'tattoo-2208',
    aonId: 2208,
    name: 'Padrão do caminhante do gelo',
    originalName: 'Frostwalker Pattern',
    level: 2,
    priceGp: 30,
    page: 120,
    description:
      'Motivos de geada nos pés. Ignora terreno difícil de gelo e neve. Ativar (concentrar): 1 vez ao dia, andar sobre o gelo/água congelada por 10 minutos sem penalidade.',
  }),
  t({
    id: 'tattoo-2209',
    aonId: 2209,
    name: 'Andorinha do lar',
    originalName: 'Homeward Swallow',
    level: 5,
    priceGp: 150,
    page: 120,
    description:
      'Andorinha em voo. Ativar (concentrar e manipular): 1 vez por semana. Teleporta você e aliados adjacentes até um lugar que você considere lar, a até 150 km, como teleporte de 5º posto.',
  }),
  t({
    id: 'tattoo-2210',
    aonId: 2210,
    name: 'Mapa de memórias',
    originalName: 'Memoir Map',
    level: 1,
    priceGp: 13,
    page: 120,
    description:
      'Mapa que se atualiza com lugares que você visitou. +1 de item em Saber de um local representado. Ativar (concentrar): 1 vez ao dia, Recorde Conhecimento sobre um lugar do mapa com +1 de status.',
  }),
  t({
    id: 'tattoo-2211',
    aonId: 2211,
    name: 'Crônica mortal',
    originalName: 'Mortal Chronicle',
    level: 1,
    priceGp: 10,
    page: 120,
    description:
      'Linha da vida no pulso. +1 de item em Medicina para Tratar ferimentos em você. Ativar (concentrar): 1 vez ao dia, quando cair a 0 PV, fica com 1 PV em vez de morrer (ainda pode ficar morrendo).',
  }),
  t({
    id: 'tattoo-2212',
    aonId: 2212,
    name: 'Estrela do navegador',
    originalName: "Navigator's Star",
    level: 1,
    priceGp: 18,
    page: 120,
    description:
      'Estrela que aponta o norte. +1 de item em Sobrevivência para Sentido de direção. Você sempre sabe onde é o norte, ao ar livre à noite.',
  }),
  t({
    id: 'tattoo-2213',
    aonId: 2213,
    name: 'Nome do nêmesis',
    originalName: 'Nemesis Name',
    level: 9,
    priceGp: 650,
    page: 120,
    rarity: 'uncommon',
    description:
      'Nome de um inimigo jurado, escolhido nas preparações. Golpes contra essa criatura causam +1d6 de precisão. Ativar (concentrar): 1 vez ao dia, ao ferir o nêmesis, ele fica amedrontado 1.',
  }),
  t({
    id: 'tattoo-2214',
    aonId: 2214,
    name: 'Cem vitórias',
    originalName: 'One Hundred Victories',
    level: 3,
    priceGp: 60,
    page: 120,
    description:
      'Marcas de batalha. +1 de item em Intimidação. Ativar (concentrar): 1 vez ao dia, ao Desmoralizar, o alvo também fica ofendido 1 se falhar.',
  }),
  t({
    id: 'tattoo-2215',
    aonId: 2215,
    name: 'Glifos de leitura',
    originalName: 'Reading Glyphs',
    level: 4,
    priceGp: 90,
    page: 120,
    description:
      'Glifos nos dedos ou têmporas. +1 de item em Sociedade para Decifrar escrita. Ativar (concentrar): 1 vez ao dia, compreende um idioma escrito por 10 minutos (como compreender idiomas só para texto).',
  }),
  ...grades(2216, 'Asas altaneiras', 'Soaring Wings', 121, [
    { key: '', name: '', original: '', level: 9, price: 750, extra: 'Ativar (concentrar e manipular): 1 vez ao dia. Asas por 10 minutos: voo 7,5 m ou seu terrestre, o que for menor.' },
    { key: '-greater', name: ' maiores', original: ' (Greater)', level: 14, price: 3800, extra: 'Como as básicas, mas voo 12 m ou seu terrestre, e pode ativar 1 vez por hora.' },
    { key: '-major', name: ' máximas', original: ' (Major)', level: 19, price: 38000, extra: 'Asas permanentes enquanto investida. Pode recolher ou abrir (1 ação concentrar).' },
  ]),
  t({
    id: 'tattoo-2217',
    aonId: 2217,
    name: 'Caveira que encara',
    originalName: 'Staring Skull',
    level: 8,
    priceGp: 550,
    page: 121,
    description:
      'Caveira no peito ou dorso da mão. +1 de item em Intimidação. Ativar (concentrar, visual, emoção): 1 vez ao dia. Uma criatura a 9 m que possa vê-lo: Vontade CD 24 ou amedrontado 2 (amedrontado 3 no crítico).',
  }),
  t({
    id: 'tattoo-2218',
    aonId: 2218,
    name: 'Vista solar',
    originalName: 'Sun Sight',
    level: 10,
    priceGp: 850,
    page: 121,
    description:
      'Sol estilizado junto ao olho. Visão na penumbra. Ativar (concentrar): 1 vez ao dia, luz do dia de 4º posto centrada em você.',
  }),
  ...grades(2219, 'Tatuagem de dente e garra', 'Tooth and Claw Tattoo', 121, [
    { key: '', name: '', original: '', level: 6, price: 250, extra: 'Seus ataques desarmados de dente ou garra ganham o traço mágico e +1 de item no dano.' },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 8, price: 500, extra: 'Como a básica, e os desarmados contam como frio ferro contra fraquezas.' },
    { key: '-major', name: ' máxima', original: ' (Major)', level: 10, price: 1000, extra: 'Como a maior, e também como prata.' },
  ]),
  ...grades(2220, 'Tatuagem do ofício', 'Tradecraft Tattoo', 121, [
    { key: '', name: '', original: '', level: 9, price: 700, extra: 'Escolha uma perícia de Ofício. +2 de item nela. Ativar: 1 vez ao dia, refaça um teste dessa perícia (fortuna).' },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 17, price: 13000, extra: 'Como a básica, mas +3 de item e a ativação é 1 vez por hora.' },
  ]),
  t({
    id: 'tattoo-2221',
    aonId: 2221,
    name: 'Dentes triangulares',
    originalName: 'Triangular Teeth',
    level: 2,
    priceGp: 33,
    page: 121,
    description:
      'Fileira de dentes de tubarão. +1 de item em Atletismo para Nadar. Ativar (manipular): 1 vez ao dia, Golpe desarmado de mordida (1d8 perfurante, mortal d8) contra criatura agarrada ou que você esteja agarrando.',
  }),
  t({
    id: 'tattoo-2222',
    aonId: 2222,
    name: 'Coração inquebrável',
    originalName: 'Unbreakable Heart',
    level: 3,
    priceGp: 60,
    page: 121,
    description:
      'Coração estilizado. +1 de item em Fortitude contra efeitos de emoção. Ativar (concentrar): 1 vez ao dia, ao ficar amedrontado, reduza o valor em 1.',
  }),
  ...shoantiEmblems(),
  ...grades(2224, 'Tinta do bosque selvagem', 'Wildwood Ink', 122, [
    { key: '', name: '', original: '', level: 4, price: 80, extra: 'Motivos vegetais. +1 de item em Natureza. Ativar: 1 vez ao dia, vinha emaranhada.' },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 10, price: 900, extra: 'Como a básica, e você ignora terreno difícil de vegetação.' },
    { key: '-major', name: ' máxima', original: ' (Major)', level: 17, price: 15000, extra: 'Como a maior. Ativar também conjura muralha de espinhos 1 vez ao dia.' },
  ]),
  ...grades(2225, 'Envergadura da wyrm', "Wyrm's Wingspan", 122, [
    { key: '', name: '', original: '', level: 9, price: 700, extra: 'Asas de dragão. Ativar: 1 vez ao dia, cone de 4,5 m do tipo de dano do dragão escolhido (4d6, Reflexos básico CD 25).' },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 13, price: 2800, extra: 'Como a básica, mas 8d6 e CD 30. Resistência 5 a esse tipo enquanto investida.' },
    { key: '-major', name: ' máxima', original: ' (Major)', level: 17, price: 13500, extra: 'Como a maior, mas 12d6 e CD 37. Resistência 10.' },
  ]),
]

function grades(
  aonId: number,
  name: string,
  original: string,
  page: number,
  rows: Array<{ key: string; name: string; original: string; level: number; price: number; extra: string }>,
  prefix = '',
): ItemDefinition[] {
  return rows.map((row) =>
    t({
      id: `tattoo-${aonId}${row.key}`,
      aonId,
      name: `${name}${row.name}`,
      originalName: `${original}${row.original}`,
      level: row.level,
      priceGp: row.price,
      page,
      description: prefix + row.extra,
    }),
  )
}

function bewitchingBlooms(): ItemDefinition[] {
  const intro =
    'Botão que floresce ao ativar (concentrar, 1 vez ao dia): aliado voluntário a 9 m ganha o efeito da flor até as próximas preparações. '
  const blooms = [
    { key: 'amaranth', name: 'amaranto', original: 'Amaranth', level: 15, price: 5500, extra: 'O aliado sente-se imortal: o próximo dano de perigo, ataque ou efeito inimigo não o reduz abaixo de 1 PV (acaba no início do seu próximo turno se não usar).' },
    { key: 'bellflower', name: 'campânula', original: 'Bellflower', level: 7, price: 350, extra: '+2 de status para se livrar de confuso, amedrontado, agarrado, paralisado e imobilizado até o fim do próximo turno do aliado; pode nova salvaguarda ou Escapar como reação.' },
    { key: 'cherry', name: 'cerejeira', original: 'Cherry Blossom', level: 3, price: 50, extra: 'Por 1 minuto, testes de recuperação do aliado têm CD 10 (não 10 + valor de morrendo). Pode visar aliado inconsciente ou morrendo.' },
    { key: 'lilac', name: 'lilás', original: 'Lilac', level: 2, price: 25, extra: 'O aliado Recorre ao Conhecimento com +2 de status.' },
    { key: 'lotus', name: 'lótus', original: 'Lotus', level: 9, price: 600, extra: '+2 de status em Vontade contra mental por 1 minuto (+3 contra emoção).' },
    { key: 'magnolia', name: 'magnólia', original: 'Magnolia', level: 6, price: 220, extra: '+1 de status em Diplomacia por 10 minutos. Uma vez no próximo turno, 1 ação (emoção, mental, visual) para prender o olhar de uma criatura.' },
    { key: 'iris', name: 'íris-roxa', original: 'Purple Iris', level: 11, price: 1200, extra: 'O aliado fica oculto por 1 rodada (como invisibilidade breve).' },
    { key: 'rose', name: 'rosa-vermelha', original: 'Red Rose', level: 4, price: 90, extra: 'O aliado ganha 10 PV temporários até o fim do seu próximo turno.' },
    { key: 'poppy', name: 'papoula-branca', original: 'White Poppy', level: 4, price: 80, extra: 'O aliado pode agir enquanto está morrendo nesta rodada (ainda morrendo).' },
  ]
  return blooms.map((b) =>
    t({
      id: `tattoo-2203-${b.key}`,
      aonId: 2203,
      name: `Flor encantadora (${b.name})`,
      originalName: `Bewitching Bloom (${b.original})`,
      level: b.level,
      priceGp: b.price,
      page: 119,
      description: intro + b.extra,
    }),
  )
}

function shoantiEmblems(): ItemDefinition[] {
  const clans = [
    { key: 'tamiir', name: 'Tamiir-Quah', extra: 'Povo do vento: +1 de item em Acrobacia para Equilibrar-se e +1,5 m de circunstância em saltos horizontais.' },
    { key: 'lyrune', name: 'Lyrune-Quah', extra: 'Povo da lua: visão na penumbra e +1 de item em Furtividade à noite.' },
    { key: 'shadde', name: 'Shadde-Quah', extra: 'Povo da água: +1 de item para Nadar e prende a respiração o dobro do tempo.' },
    { key: 'shriikirri', name: 'Shriikirri-Quah', extra: 'Povo dos falcões: +1 de item em Percepção para Ver e alcance de visão +3 m.' },
    { key: 'shundar', name: 'Shundar-Quah', extra: 'Povo da montanha: +1 de item em Atletismo para Escalar e ignora o primeiro quadrado de terreno difícil de pedra por movimento.' },
    { key: 'sklar', name: 'Sklar-Quah', extra: 'Povo do sol: resistência 2 a fogo e +1 de item em Intimidação sob o sol.' },
    { key: 'skoan', name: 'Skoan-Quah', extra: 'Povo dos ancestrais: +1 de item em Religião e em salvaguardas contra efeitos de mortos-vivos.' },
  ]
  return clans.map((c) =>
    t({
      id: `tattoo-2223-${c.key}`,
      aonId: 2223,
      name: `Emblema unificador (${c.name})`,
      originalName: `Unifying Emblem (${c.name})`,
      level: 3,
      priceGp: 60,
      page: 122,
      description:
        'Marca de clã Shoanti. Enquanto investida, ' +
        c.extra,
    }),
  )
}
