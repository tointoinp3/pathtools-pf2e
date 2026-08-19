import { apexItem, wornItem } from './equipmentFactory'
import type { ItemDefinition, WornMagicStats } from '@/types/equipment'

const ROE = 'Rage of Elements'

function w(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  bulk?: number | 'L' | '—'
  traits?: string[]
  rarity?: ItemDefinition['rarity']
  wornMagic?: WornMagicStats
}): ItemDefinition {
  return wornItem({ ...opts, sourceBook: ROE })
}

/** Itens vestidos — Rage of Elements. Sem armadura/arma específica nem pedra eon reimpressa. */
export const RAGE_OF_ELEMENTS_WORN: ItemDefinition[] = [
  w({
    id: 'worn-2575',
    aonId: 2575,
    name: 'Manto aéreo',
    originalName: 'Aerial Cloak',
    level: 3,
    priceGp: 60,
    page: 74,
    traits: ['Air'],
    wornMagic: {
      slot: 'manto',
      activate:
        'Cair suave (concentrar, ar) 1 vez ao dia, ao cair: trate a queda como 30 pés mais curta e plane até 20 pés do ponto em que cairia.',
      frequency: '1 vez ao dia',
      note: '+1 de item em Atletismo para Pulo e em Acrobacia para Equilíbrio ou Manobrar em voo.',
    },
    description:
      'Manto azul leve que pega o vento. +1 em pulos e em equilíbrio/manobrar em voo. Ativação 1 vez ao dia: queda 30 pés mais curta e plane 20 pés.',
  }),
  w({
    id: 'worn-2578',
    aonId: 2578,
    name: 'Pulmão extra',
    originalName: 'Extra Lung',
    level: 8,
    priceGp: 500,
    page: 74,
    bulk: 'L',
    traits: ['Air'],
    wornMagic: {
      slot: 'manto',
      activate:
        'Cuspir (manipular), ao inalar veneno ou aflição inalada: tussa para o pulmão extra e role nova salvaguarda. O ar fica contaminado; respirá-lo reexpõe. Limpa-se a cada amanhecer.',
      note: '5 rodadas de ar respirável; recarrega 10 minutos ao ar livre. Trocar para o pulmão não gasta ação. Falar não gasta o ar do pulmão.',
    },
    description:
      'Bexiga d’ar na axila, tubo no nariz. 5 rodadas de ar. Ativação: tusso veneno inalado para o pulmão e nova salvaguarda.',
  }),
  w({
    id: 'worn-2582',
    aonId: 2582,
    name: 'Cachecol de jaathoom',
    originalName: "Jaathoom's Scarf",
    level: 10,
    priceGp: 900,
    page: 75,
    traits: ['Air'],
    wornMagic: {
      slot: 'cinto',
      activate:
        'Desaparecer (concentrar) 1 vez ao dia: invisibilidade de 4º posto. Repreensão do jaathoom (concentrar) 1 vez por hora: inimigos em emanação de 10 pés Fortitude CD 27 ou são empurrados 10 pés (falha crítica: também caídos). Criaturas de ar imunes.',
      frequency: 'invisibilidade 1/dia · empurrão 1/hora',
      note: '+2 de item em Performance para dançar e em Acrobacia para Escapar.',
    },
    description:
      'Seda azul-céu com franja dourada. +2 para dançar e Escapar. Invisibilidade de 4º posto 1 vez ao dia; empurrão de 10 pés (CD 27) 1 vez por hora.',
  }),
  w({
    id: 'worn-2593',
    aonId: 2593,
    name: 'Manto de pedra',
    originalName: 'Robe of Stone',
    level: 11,
    priceGp: 1400,
    page: 99,
    bulk: 'L',
    rarity: 'uncommon',
    traits: ['Earth', 'Uncommon'],
    wornMagic: {
      slot: 'roupa',
      activate:
        'Tornar-se pedra (concentrar, manipular, polimorfia) 1 vez ao dia: forma elemental de terra. Além do normal, cave através de rocha na velocidade da magia sem deixar túnel, e o tremor aumenta para 30 pés.',
      frequency: '1 vez ao dia',
      note: 'Tremor impreciso de 10 pés. Fala e lê petrano. Pode comer terra, gemas e metal no lugar de comida.',
    },
    description:
      'Manto com padrões de geodo, solta poeira. Tremor impreciso 10 pés, petrano, come terra/gemas/metal. Ativação 1 vez ao dia: forma elemental de terra e cave pela rocha.',
  }),
  ...ashGown(),
  w({
    id: 'worn-2609',
    aonId: 2609,
    name: 'Véu de fumaça',
    originalName: 'Smoke Veil',
    level: 3,
    priceGp: 60,
    page: 124,
    bulk: 'L',
    traits: ['Fire'],
    wornMagic: {
      slot: 'elmo',
      activate:
        'Olhar flamejante (concentrar), se o dano de fogo mais recente neste turno foi em alvo visível a 30 pés: Desmoralizar visual (sem penalidade por idioma).',
      note: 'Personificar sem kit em 1 minuto, +1 de item. Kit e tempo cheio se mudar o resto da aparência ou imitar alguém específico.',
    },
    description:
      'Peruca ou touca de chama e cinza. Personificar sem kit em 1 minuto (+1). Ativação: Desmoralizar visual após causar dano de fogo.',
  }),
  w({
    id: 'worn-2622',
    aonId: 2622,
    name: 'Luvas de Zuhra',
    originalName: "Zuhra's Gloves",
    level: 13,
    priceGp: 3000,
    page: 148,
    traits: ['Metal'],
    wornMagic: {
      slot: 'luvas',
      activate:
        'Estratégia de Zuhra (concentrar, manipular) 1 vez ao dia, arma principalmente de metal: o zuhra escolhe ofensa (tempestade de armas de 6º posto replicando o metal) ou defesa (muro de metal; perde o bônus das luvas até o muro acabar). CD 30. Você pode Dispensar.',
      frequency: '1 vez ao dia',
      note: '+3 de item na CD de Reflexos contra Desarmar item nas suas mãos.',
    },
    description:
      'Teia metálica nas mãos, nome de um zuhra em talicano. +3 na CD contra Desarmar. Ativação 1 vez ao dia: tempestade de armas de 6º posto ou muro de metal (CD 30).',
  }),
  w({
    id: 'worn-2631',
    aonId: 2631,
    name: 'Manto de pele de tubarão',
    originalName: 'Sharkskin Robe',
    level: 12,
    priceGp: 1900,
    page: 178,
    bulk: 1,
    traits: ['Water'],
    wornMagic: {
      skillBonuses: [{ skillId: 'athletics', value: 2 }],
      slot: 'roupa',
      activate:
        'Elegância do tubarão (concentrar, manipular) 1 vez por hora: por 1 minuto, Golpes ganham o benefício da runa submersa.',
      frequency: '1 vez por hora',
      note: 'Deslocamento de nado igual ao terrestre.',
    },
    description:
      'Manto arenoso com mangas de barbatana. Nado igual ao terrestre, +2 de item em Atletismo. Ativação 1 vez por hora: runa submersa nos Golpes por 1 minuto.',
  }),
  ...gateAttenuators(),
]

function ashGown(): ItemDefinition[] {
  return [
    w({
      id: 'worn-2599',
      aonId: 2599,
      name: 'Traje de cinzas',
      originalName: 'Ash Gown',
      level: 7,
      priceGp: 350,
      page: 122,
      bulk: 'L',
      traits: ['Fire'],
      wornMagic: {
        skillBonuses: [{ skillId: 'intimidation', value: 1 }],
        energyResistances: [{ damageType: 'fire', value: 5 }],
        slot: 'roupa',
        activate:
          'Passeio flamejante (manipular) 1 vez ao dia: avance e Golpe no fim. Ignore terreno difícil não mágico (e o destrua). Criaturas adjacentes no trajeto: 2d6 de fogo, Reflexos básico CD 23 (uma vez cada).',
        frequency: '1 vez ao dia',
      },
      description:
        'Traje formal de fumaça e cinza. Resistência 5 a fogo, +1 em Intimidação. Ativação 1 vez ao dia: avance em chamas (2d6, CD 23).',
    }),
    w({
      id: 'worn-2599-greater',
      aonId: 2599,
      name: 'Traje de cinzas maior',
      originalName: 'Ash Gown (Greater)',
      level: 11,
      priceGp: 1300,
      page: 122,
      bulk: 'L',
      traits: ['Fire'],
      wornMagic: {
        skillBonuses: [{ skillId: 'intimidation', value: 2 }],
        energyResistances: [{ damageType: 'fire', value: 10 }],
        slot: 'roupa',
        activate:
          'Passeio flamejante (manipular) 1 vez a cada 10 minutos: avance e Golpe. Ignore terreno difícil não mágico. Adjacentes: 4d6 de fogo, Reflexos básico CD 28.',
        frequency: '1 vez a cada 10 minutos',
      },
      description:
        'Resistência 10 a fogo, +2 em Intimidação. Passeio flamejante a cada 10 minutos (4d6, CD 28).',
    }),
  ]
}

function gateAttenuators(): ItemDefinition[] {
  const elements =
    'Ao investir, sintonize ar, terra, fogo, metal, água ou madeira. O atenuador ganha o traço do elemento.'
  return [
    w({
      id: 'worn-2654',
      aonId: 2654,
      name: 'Atenuador de portal',
      originalName: 'Gate Attenuator',
      level: 3,
      priceGp: 60,
      page: 224,
      wornMagic: {
        slot: 'tronco',
        activate:
          'Magia elemental (concentrar) 1 vez ao dia: magia de 1º posto (modificador +7, CD 17). Cinético pode usar o modificador/CD de impulso se o elemento coincidir. Ar: lufada de vento; terra: escombros; fogo: desidratar; metal: trovão; água: bola de neve; madeira: flora viçosa.',
        frequency: '1 vez ao dia',
        note: `Cinético: +1 de item no modificador de impulso (não na CD). ${elements}`,
      },
      description:
        'Disco ou portal no tronco. Cinético: +1 no impulso. Ao investir, escolha o elemento. Ativação 1 vez ao dia: magia de 1º posto do elemento (CD 17).',
    }),
    w({
      id: 'worn-2654-greater',
      aonId: 2654,
      name: 'Atenuador de portal maior',
      originalName: 'Gate Attenuator (Greater)',
      level: 11,
      priceGp: 1400,
      page: 224,
      wornMagic: {
        slot: 'tronco',
        activate:
          'Magia elemental (concentrar) 1 vez ao dia: magia de 5º posto (+18, CD 28). Ar: zona de pressão; terra: forma de areia; fogo: chamas do ego; metal: espinho impalante; água: chuva congelante; madeira: raízes entrelaçadas.',
        frequency: '1 vez ao dia',
        note: `Cinético: +2 de item no modificador de impulso (não na CD). ${elements}`,
      },
      description:
        'Cinético: +2 no impulso. Ativação 1 vez ao dia: magia de 5º posto do elemento (CD 28).',
    }),
    apexItem({
      id: 'apex-2654-major',
      aonId: 2654,
      name: 'Atenuador de portal maior ainda',
      originalName: 'Gate Attenuator (Major)',
      level: 17,
      priceGp: 15000,
      page: 224,
      sourceBook: ROE,
      wornMagic: {
        apexAttribute: 'constitution',
        slot: 'tronco',
        activate:
          'Magia elemental (concentrar) 1 vez ao dia: magia de 8º posto (+27, CD 37). Ar: redemoinho; terra: terremoto; fogo: ferver sangue; metal: nuvem de ferrugem (8º); água: redemoinho aquático; madeira: vagens de pólen (8º).',
        frequency: '1 vez ao dia',
        note: `Ápice de Constituição. Cinético: +2 de item no modificador de impulso (não na CD). ${elements}`,
      },
      description:
        'Ápice: Constituição sobe em 1 ou vai a +4. Cinético: +2 no impulso. Ativação 1 vez ao dia: magia de 8º posto do elemento (CD 37).',
    }),
  ]
}
