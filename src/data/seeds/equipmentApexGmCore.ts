import { apexItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

/** Itens ápice — GM Core Remaster pg. 270–271. Só um ápice investido conta. */
export const GM_CORE_APEX: ItemDefinition[] = [
  apexItem({
    id: 'apex-3007',
    aonId: 3007,
    name: 'Cinto de vida longa',
    originalName: 'Belt of Long Life',
    level: 17,
    priceGp: 15000,
    page: 270,
    usage: 'worn',
    wornMagic: {
      apexAttribute: 'constitution',
      slot: 'cinto',
      activate:
        'Invocar a vida antiga (1 ação, manipular): 1 vez ao dia. Por 2d4 rodadas, no início do seu turno você recupera 15 PV.',
      frequency: '1 vez ao dia',
      note: 'Na primeira vez que investir o cinto no dia, ganha 15 PV temporários.',
    },
    description:
      'Cinto de couro grosso gravado com uma árvore antiga. Ao investir, o modificador de Constituição sobe em 1 ou vai a +4, o que for maior. Na primeira vez que investir no dia, ganha 15 PV temporários. Ativação 1 vez ao dia: por 2d4 rodadas, recupera 15 PV no início de cada turno.',
  }),
  apexItem({
    id: 'apex-3008',
    aonId: 3008,
    name: 'Braçadeiras de força',
    originalName: 'Bracers of Strength',
    level: 17,
    priceGp: 15000,
    page: 270,
    usage: 'worn',
    wornMagic: {
      apexAttribute: 'strength',
      skillBonuses: [{ skillId: 'athletics', value: 3 }],
      slot: 'braçadeiras',
      activate:
        'Abraço de urso (1 ação, manipular): tente Agarrar. Em sucesso, causa dano de concussão igual ao modificador de Força (crítico: o dobro, e a criatura sufoca enquanto estiver agarrada ou imobilizada).',
      note: '+2 de circunstância em Atletismo para levantar peso, Escapar e Forçar abertura.',
    },
    description:
      'Braçadeiras de latão com ursos. Ao investir, o modificador de Força sobe em 1 ou vai a +4, o que for maior. +3 de bônus de item em Atletismo, e +2 de circunstância para levantar objeto pesado, Escapar e Forçar abertura. Ativação: Abraço de urso ao Agarrar.',
  }),
  apexItem({
    id: 'apex-3009',
    aonId: 3009,
    name: 'Manto da rapidez',
    originalName: 'Cloak of Swiftness',
    level: 17,
    priceGp: 15000,
    page: 270,
    usage: 'worn',
    wornMagic: {
      apexAttribute: 'dexterity',
      skillBonuses: [{ skillId: 'acrobatics', value: 3 }],
      slot: 'manto',
      activate:
        'Cavalgar o vento (1 ação, manipular): 1 vez ao dia. Deslocamento de voo de 30 pés por 1 hora, e você fica translúcido (oculto) enquanto o manto estiver envolvido.',
      frequency: '1 vez ao dia',
    },
    description:
      'Manto leve como nuvem. Ao investir, o modificador de Destreza sobe em 1 ou vai a +4, o que for maior. +3 de bônus de item em Acrobacia. Ativação 1 vez ao dia: voo de 30 pés por 1 hora e fica oculto.',
  }),
  apexItem({
    id: 'apex-3010',
    aonId: 3010,
    name: 'Coroa do intelecto',
    originalName: 'Crown of Intellect',
    level: 17,
    priceGp: 15000,
    page: 270,
    usage: 'worn',
    wornMagic: {
      apexAttribute: 'intelligence',
      slot: 'diadema',
      activate:
        'Vasculhar a mente (1 ação, concentrar): 1 vez por hora. Efeitos de hipercognição.',
      frequency: '1 vez por hora',
      note: '+3 de bônus de item em testes para Recordar conhecimento (qualquer perícia). Perícias e idiomas extras da Inteligência são escolhidos na primeira vez que investir esta coroa e ficam fixos.',
    },
    description:
      'Coroa de ouro com três gemas. Ao investir, o modificador de Inteligência sobe em 1 ou vai a +4, o que for maior — isso dá perícias treinadas e idiomas extras, escolhidos na primeira vez e repetidos sempre que investir a mesma coroa. +3 de bônus de item para Recordar conhecimento, qualquer perícia. Ativação 1 vez por hora: hipercognição.',
  }),
  apexItem({
    id: 'apex-3011',
    aonId: 3011,
    name: 'Faixa da sabedoria',
    originalName: 'Headwrap of Wisdom',
    level: 17,
    priceGp: 15000,
    page: 270,
    usage: 'worn',
    traits: ['Fortune'],
    wornMagic: {
      apexAttribute: 'wisdom',
      slot: 'faixa',
      activate:
        'Pesar as consequências (1 ação, concentrar): 1 vez ao dia, efeitos de augúrio pelos seus instintos. Reclamar a mente (reação, concentrar, fortuna): 1 vez por hora, quando falhar num teste de resistência contra efeito que cause confuso, fascinado ou estupefato; role de novo e use o segundo resultado.',
      frequency: '1 vez ao dia / 1 vez por hora',
    },
    description:
      'Faixa simples com alfinete cravejado. Ao investir, o modificador de Sabedoria sobe em 1 ou vai a +4, o que for maior. Ativações: augúrio 1 vez ao dia; 1 vez por hora, rerrolar falha contra confuso, fascinado ou estupefato (fortuna).',
  }),
  apexItem({
    id: 'apex-3012',
    aonId: 3012,
    name: 'Colar do fascínio',
    originalName: 'Necklace of Allure',
    level: 17,
    priceGp: 15000,
    page: 271,
    usage: 'worn',
    wornMagic: {
      apexAttribute: 'charisma',
      skillBonuses: [
        { skillId: 'deception', value: 2 },
        { skillId: 'diplomacy', value: 2 },
      ],
      slot: 'colar',
      activate:
        'Conquistá-los (2 ações, concentrar): 1 vez por hora. Conjura encantar de 4º posto (CD 38).',
      frequency: '1 vez por hora',
    },
    description:
      'Colar de prata com safiras e pingente de lobo. Ao investir, o modificador de Carisma sobe em 1 ou vai a +4, o que for maior. +2 de bônus de item em Enganação e Diplomacia. Ativação 1 vez por hora: encantar de 4º posto (CD 38).',
  }),
]
