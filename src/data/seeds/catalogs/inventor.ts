import type { ClassCatalogDefinition } from '@/types/class'
import { CLASS_INVENTOR_ID } from '../ids'
import { SOURCE_GUNS_GEARS_ID } from '../sources'
import { CONSTRUCT_MODIFICATIONS } from '../constructCompanions'
import { catalogOption } from './helpers'

const SRC = SOURCE_GUNS_GEARS_ID

function mod(opts: {
  id: string
  name: string
  originalName: string
  category: 'initial' | 'breakthrough' | 'revolutionary'
  subclass: 'innovation-armor' | 'innovation-weapon' | 'innovation-construct' | 'innovation-mortar'
  page: number
  description: string
  rulesSummary: string
  prerequisiteOptionIds?: string[]
}): ReturnType<typeof catalogOption> {
  const level =
    opts.category === 'breakthrough'
      ? 7
      : opts.category === 'revolutionary'
        ? 15
        : 1
  return catalogOption({
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: opts.category,
    level,
    subclassIds: [opts.subclass],
    sourcePage: opts.page,
    description: opts.description,
    rulesSummary: opts.rulesSummary,
    prerequisiteOptionIds: opts.prerequisiteOptionIds,
  })
}

const armorMods = [
  mod({
    id: 'armor-mod-harmonic-oscillator',
    name: 'Oscilador Harmônico',
    originalName: 'Harmonic Oscillator',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Vibração inaudível contra força e som.',
    rulesSummary:
      'Resistência a força e sônico = 3 + metade do nível (+2 durante Sobrecarga).',
  }),
  mod({
    id: 'armor-mod-metallic-reactance',
    name: 'Reatância Metálica',
    originalName: 'Metallic Reactance',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Liga que aterra eletricidade e ácido.',
    rulesSummary:
      'Resistência a ácido e eletricidade = 3 + metade do nível (+2 durante Sobrecarga).',
  }),
  mod({
    id: 'armor-mod-muscular-exoskeleton',
    name: 'Exoesqueleto Muscular',
    originalName: 'Muscular Exoskeleton',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Só Traje de Poder: a armadura empurra a Atletismo.',
    rulesSummary:
      'Só Traje de Poder. Durante Sobrecarga: +1 de circunstância em Atletismo (+2 se mestre em Artesanato).',
  }),
  mod({
    id: 'armor-mod-otherworldly-protection',
    name: 'Proteção de Outro Mundo',
    originalName: 'Otherworldly Protection',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Ciência contra o que não é deste plano.',
    rulesSummary:
      'Resistência a vazio (ou vitalidade se tiver cura de vazio) e a espírito = 3 + metade do nível. Santificado: também vs profano ou santo, conforme a santificação.',
  }),
  mod({
    id: 'armor-mod-phlogistonic-regulator',
    name: 'Regulador Flogístico',
    originalName: 'Phlogistonic Regulator',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Isolamento contra pico de temperatura.',
    rulesSummary:
      'Resistência a frio e fogo = metade do nível (+2 durante Sobrecarga).',
  }),
  mod({
    id: 'armor-mod-speed-boosters',
    name: 'Impulsores de Velocidade',
    originalName: 'Speed Boosters',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Motores nos tornozelos.',
    rulesSummary:
      '+1,5 m de status no Deslocamento (+3 m durante Sobrecarga).',
  }),
  mod({
    id: 'armor-mod-subtle-dampeners',
    name: 'Amortecedores Sutis',
    originalName: 'Subtle Dampeners',
    category: 'initial',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Só Traje de Subterfúgio: silêncio na Sobrecarga.',
    rulesSummary:
      'Só Traje de Subterfúgio. Durante Sobrecarga: +1 de circunstância em Furtividade (+2 se mestre em Artesanato).',
  }),
  mod({
    id: 'armor-mod-antimagic-plating',
    name: 'Blindagem Antimagia',
    originalName: 'Antimagic Plating',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Noqual ou truque próprio contra magia.',
    rulesSummary:
      '+1 de circunstância em saves e CA vs magias. Vs magia que mira a armadura: +4.',
  }),
  mod({
    id: 'armor-mod-camouflage-pigmentation',
    name: 'Pigmentação Camuflada',
    originalName: 'Camouflage Pigmentation',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Só Subterfúgio: some parado.',
    rulesSummary:
      'Só Traje de Subterfúgio. Pode Esconder-se mesmo sem cobertura nem ocultação, se ficar parado.',
  }),
  mod({
    id: 'armor-mod-dense-plating',
    name: 'Blindagem Densa',
    originalName: 'Dense Plating',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Chapas contra corte.',
    rulesSummary: 'Resistência a cortante = metade do nível.',
  }),
  mod({
    id: 'armor-mod-enhanced-resistance',
    name: 'Resistência Aprimorada',
    originalName: 'Enhanced Resistance',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'A inicial passa a usar o nível inteiro.',
    rulesSummary:
      'A resistência da modificação inicial usa o nível cheio, não a metade. Se tiver mais de uma, escolha qual.',
  }),
  mod({
    id: 'armor-mod-heavy-construction',
    name: 'Construção Pesada',
    originalName: 'Heavy Construction',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Só Traje de Poder: vira pesada sem o ônus clássico.',
    rulesSummary:
      'Só Traje de Poder. Vira armadura pesada; sua proficiência nela iguala a média. FOR 3+: sem penalidade de Deslocamento. CA +5, Dex +1, −2, −3 m, For 3, Bulk 3, grupo placa, baluarte + entrincheirar.',
  }),
  mod({
    id: 'armor-mod-hyper-boosters',
    name: 'Hiperimpulsores',
    originalName: 'Hyper Boosters',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Os impulsores sem risco de explodir.',
    rulesSummary:
      'Exige Impulsores. +3 m de status (+6 m em Sobrecarga; +9 m se lendário em Artesanato).',
    prerequisiteOptionIds: ['armor-mod-speed-boosters'],
  }),
  mod({
    id: 'armor-mod-layered-mesh',
    name: 'Malha em Camadas',
    originalName: 'Layered Mesh',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'Rede que espalha perfuração.',
    rulesSummary: 'Resistência a perfurante = metade do nível.',
  }),
  mod({
    id: 'armor-mod-tensile-absorption',
    name: 'Absorção Tênsil',
    originalName: 'Tensile Absorption',
    category: 'breakthrough',
    subclass: 'innovation-armor',
    page: 16,
    description: 'A armadura cede com o impacto.',
    rulesSummary: 'Resistência a concussão = metade do nível.',
  }),
  mod({
    id: 'armor-mod-automated-impediments',
    name: 'Impedimentos Automáticos',
    originalName: 'Automated Impediments',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'Campo que emperra quem chega perto.',
    rulesSummary: 'Espaços adjacentes são terreno difícil para inimigos.',
  }),
  mod({
    id: 'armor-mod-energy-barrier',
    name: 'Barreira de Energia',
    originalName: 'Energy Barrier',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'Ablação contra qualquer energia.',
    rulesSummary:
      'Exige Oscilador, Reatância ou Regulador. Resistência a ácido, frio, eletricidade, fogo, força, sônico, vitalidade e vazio = 2 + metade do nível.',
    prerequisiteOptionIds: [
      'armor-mod-harmonic-oscillator',
      'armor-mod-metallic-reactance',
      'armor-mod-phlogistonic-regulator',
    ],
  }),
  mod({
    id: 'armor-mod-incredible-resistance',
    name: 'Resistência Incrível',
    originalName: 'Incredible Resistance',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'A avanço física usa o nível cheio.',
    rulesSummary:
      'Escolha Blindagem Densa, Malha ou Absorção Tênsil: a resistência vira igual ao nível.',
  }),
  mod({
    id: 'armor-mod-multisensory-mask',
    name: 'Máscara Multissensorial',
    originalName: 'Multisensory Mask',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'Só Subterfúgio: mancha para todos os sentidos.',
    rulesSummary:
      'Só Traje de Subterfúgio. Ocultação contra todos (até sentido preciso não visual). Não serve para Esconder-se. Ação hostil encerra até restaurar (1 ação, manipular).',
  }),
  mod({
    id: 'armor-mod-perfect-fortification',
    name: 'Fortificação Perfeita',
    originalName: 'Perfect Fortification',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'Só Traje de Poder: crítico vira acerto.',
    rulesSummary:
      'Só Traje de Poder. Crítico contra você: teste simples CD 13 para virar acerto normal (não acumula com runa de fortificação). Resistência a precisão = 2 + metade do nível.',
  }),
  mod({
    id: 'armor-mod-physical-protections',
    name: 'Proteções Físicas',
    originalName: 'Physical Protections',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'Tudo que é corpo.',
    rulesSummary:
      'Exige Densa, Malha ou Tênsil. Resistência a concussão, perfurante, cortante e sangramento persistente = metade do nível.',
  }),
  mod({
    id: 'armor-mod-armor-rune-capacity',
    name: 'Capacidade de Runas (armadura)',
    originalName: 'Rune Capacity',
    category: 'revolutionary',
    subclass: 'innovation-armor',
    page: 17,
    description: 'Mais um encaixe de propriedade.',
    rulesSummary:
      'A inovação aceita 1 runa de propriedade a mais (máx. 4 com potência +3).',
  }),
]

const weaponMods = [
  mod({
    id: 'weapon-mod-blunt-shot',
    name: 'Tiro Cego',
    originalName: 'Blunt Shot',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Só à distância: lima a munição.',
    rulesSummary: 'Só arma à distância. Ganha concussivo e derrubar à distância.',
  }),
  mod({
    id: 'weapon-mod-complex-simplicity',
    name: 'Simplicidade Complexa',
    originalName: 'Complex Simplicity',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Só arma simples: o dado sobe.',
    rulesSummary:
      'Só arma simples. Dado de dano +1 passo. Ganha 2 traços: versátil C/P/S ou devastador.',
  }),
  mod({
    id: 'weapon-mod-dynamic-weighting',
    name: 'Peso Dinâmico',
    originalName: 'Dynamic Weighting',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Só corpo a corpo de 1 mão, sem ágil/anexa/mão livre.',
    rulesSummary:
      'Ganha duas mãos (dado +1 passo), versátil C. Se era arremesso, ganha amarrada.',
  }),
  mod({
    id: 'weapon-mod-entangling-form',
    name: 'Forma Emaranhada',
    originalName: 'Entangling Form',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Fios e correias.',
    rulesSummary: 'Só corpo a corpo. Ganha desarmar, agarrar e derrubar.',
  }),
  mod({
    id: 'weapon-mod-hampering-spikes',
    name: 'Espinhos Impedientes',
    originalName: 'Hampering Spikes',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Trava o passo do inimigo.',
    rulesSummary: 'Só corpo a corpo. Ganha impedimento, derrubar e versátil P.',
  }),
  mod({
    id: 'weapon-mod-hefty-composition',
    name: 'Composição Robusta',
    originalName: 'Hefty Composition',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Superfície de maça.',
    rulesSummary: 'Só corpo a corpo. Ganha empurrar, devastador e versátil C.',
  }),
  mod({
    id: 'weapon-mod-modular-head',
    name: 'Cabeça Modular',
    originalName: 'Modular Head',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Superfície que troca o tipo.',
    rulesSummary:
      'Modular C/P/S. Ao Interagir, pode ligar ou desligar não-letal.',
  }),
  mod({
    id: 'weapon-mod-pacification-tools',
    name: 'Ferramentas de Pacificação',
    originalName: 'Pacification Tools',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Nocaute em vez de matar.',
    rulesSummary:
      'Só corpo a corpo. Ganha desarmar, impedimento e não-letal (você escolhe a cada ataque).',
  }),
  mod({
    id: 'weapon-mod-razor-prongs',
    name: 'Ganchos Navalha',
    originalName: 'Razor Prongs',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Lâminas curvas para derrubar e rasgar.',
    rulesSummary: 'Só corpo a corpo. Ganha lacerar, derrubar e versátil S.',
  }),
  mod({
    id: 'weapon-mod-segmented-frame',
    name: 'Chassi Segmentado',
    originalName: 'Segmented Frame',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Dobradiças: cabe no bolso.',
    rulesSummary:
      'Modular C/P/S. Interagir para colapsar a Bulk leve (ocultável, +2 para esconder) ou voltar ao normal.',
  }),
  mod({
    id: 'weapon-mod-advanced-design',
    name: 'Desenho Avançado',
    originalName: 'Advanced Design',
    category: 'initial',
    subclass: 'innovation-weapon',
    page: 17,
    description: 'Usa stats de arma avançada de 0º (conta como marcial).',
    rulesSummary:
      'A inovação usa as estatísticas de uma arma avançada comum de 0º (ou outra à qual você tenha acesso). Você é treinado nela como marcial.',
  }),
  mod({
    id: 'weapon-mod-advanced-rangefinder',
    name: 'Telêmetro Avançado',
    originalName: 'Advanced Rangefinder',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Mira no ponto fraco.',
    rulesSummary: 'Só à distância. Ganha traidora; incremento +6 m.',
  }),
  mod({
    id: 'weapon-mod-aerodynamic-construction',
    name: 'Construção Aerodinâmica',
    originalName: 'Aerodynamic Construction',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'O golpe não perde fôlego no segundo alvo.',
    rulesSummary: 'Só corpo a corpo. Ganha varredura e versátil S.',
  }),
  mod({
    id: 'weapon-mod-inconspicuous-appearance',
    name: 'Aparência Discreta',
    originalName: 'Inconspicuous Appearance',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Parece inofensiva até o golpe.',
    rulesSummary:
      'Só corpo a corpo. Ganha traidora e versátil P. Se for Bulk leve, também ocultável.',
  }),
  mod({
    id: 'weapon-mod-integrated-gauntlet',
    name: 'Manopla Integrada',
    originalName: 'Integrated Gauntlet',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'A mão continua livre para mexer.',
    rulesSummary:
      'Só 1 mão, sem duas mãos nem mira fatal. Ganha mão livre.',
  }),
  mod({
    id: 'weapon-mod-manifold-alloy',
    name: 'Liga Manifold',
    originalName: 'Manifold Alloy',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Ferro frio e prata no mesmo metal.',
    rulesSummary: 'A inovação conta como ferro frio e prata.',
  }),
  mod({
    id: 'weapon-mod-rope-shot',
    name: 'Tiro de Corda',
    originalName: 'Rope Shot',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Rede nas pernas, gancho para subir.',
    rulesSummary:
      'Só à distância. Ganha escalada e derrubar à distância; se for arremesso, também amarrada.',
  }),
  mod({
    id: 'weapon-mod-tangle-line',
    name: 'Linha Emaranhada',
    originalName: 'Tangle Line',
    category: 'breakthrough',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Fio que puxa a arma de volta.',
    rulesSummary: 'Só arremesso. Ganha aparar, derrubar à distância e amarrada.',
  }),
  mod({
    id: 'weapon-mod-attack-refiner',
    name: 'Refinador de Ataque',
    originalName: 'Attack Refiner',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Cada erro afia o próximo.',
    rulesSummary: 'Ganha impulso e vigorosa.',
  }),
  mod({
    id: 'weapon-mod-deadly-strike',
    name: 'Golpe Mortal',
    originalName: 'Deadly Strike',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'O ângulo perfeito no crítico.',
    rulesSummary:
      'Ganha mortal d8. Se já tinha mortal, o dado sobe até 2 passos (máx. d12).',
  }),
  mod({
    id: 'weapon-mod-enhanced-damage',
    name: 'Dano Aprimorado',
    originalName: 'Enhanced Damage',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Mais pesada que a prima de catálogo.',
    rulesSummary:
      'Dado de dano +1 passo. Não acumula com Simplicidade Complexa.',
  }),
  mod({
    id: 'weapon-mod-extensible-weapon',
    name: 'Arma Extensível',
    originalName: 'Extensible Weapon',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Estica sem perder o equilíbrio.',
    rulesSummary:
      'Só corpo a corpo. Ganha alcance. Se já tinha, o alcance extra vira 3 m em vez de 1,5 m.',
  }),
  mod({
    id: 'weapon-mod-impossible-alloy',
    name: 'Liga Impossível',
    originalName: 'Impossible Alloy',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Os sete metais celestes, só para você.',
    rulesSummary:
      'Conta como os sete skymetals (abísio, adamantina, djezet, inúbrix, noqual, oricalco, siccatita) para fraqueza. Sem os outros efeitos de material.',
  }),
  mod({
    id: 'weapon-mod-momentum-enhancer',
    name: 'Amplificador de Momento',
    originalName: 'Momentum Enhancer',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'A arma se move sozinha.',
    rulesSummary:
      'Ganha ágil. Se tiver recarga, 1×/rodada recarregar é ação livre.',
  }),
  mod({
    id: 'weapon-mod-omnirange-stabilizers',
    name: 'Estabilizadores de Qualquer Alcance',
    originalName: 'Omnirange Stabilizers',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Perigosa de perto e de longe.',
    rulesSummary:
      'Só à distância. Remove saraivada, ou aumenta o incremento em 15 m ou no valor base (o maior).',
  }),
  mod({
    id: 'weapon-mod-weapon-rune-capacity',
    name: 'Capacidade de Runas (arma)',
    originalName: 'Rune Capacity',
    category: 'revolutionary',
    subclass: 'innovation-weapon',
    page: 18,
    description: 'Mais um encaixe de propriedade.',
    rulesSummary:
      'A inovação aceita 1 runa de propriedade a mais (máx. 4 com potência +3).',
  }),
]

const mortarMods = [
  mod({
    id: 'mortar-mod-contained-shrapnel',
    name: 'Estilhaços Contidos',
    originalName: 'Contained Shrapnel',
    category: 'initial',
    subclass: 'innovation-mortar',
    page: 64,
    description: 'A munição não espalha fragmentos para fora.',
    rulesSummary:
      'O morteiro ganha o traço não-letal. Você escolhe se aplica a cada Disparo.',
  }),
  mod({
    id: 'mortar-mod-enhanced-shrapnel',
    name: 'Estilhaços Aprimorados',
    originalName: 'Enhanced Shrapnel',
    category: 'initial',
    subclass: 'innovation-mortar',
    page: 64,
    description: 'Fragmentos cortantes ou perfurantes no impacto.',
    rulesSummary:
      'Ganha versátil P e versátil S. Você escolhe se aplica um deles a cada Disparo.',
  }),
  mod({
    id: 'mortar-mod-spring-loaded',
    name: 'Molas de Desdobrar',
    originalName: 'Spring-Loaded',
    category: 'initial',
    subclass: 'innovation-mortar',
    page: 64,
    description: 'Molas para abrir o morteiro no instante.',
    rulesSummary: 'Desdobrar o morteiro leve é ação livre.',
  }),
  mod({
    id: 'mortar-mod-blanching-chamber',
    name: 'Câmara de Branqueamento',
    originalName: 'Blanching Chamber',
    category: 'breakthrough',
    subclass: 'innovation-mortar',
    page: 65,
    description: 'Limalha de metal na câmara de disparo.',
    rulesSummary: 'A munição conta como ferro frio e prata.',
  }),
  mod({
    id: 'mortar-mod-earthbreaker',
    name: 'Quebra-terra',
    originalName: 'Earthbreaker',
    category: 'breakthrough',
    subclass: 'innovation-mortar',
    page: 65,
    description: 'A explosão vai para baixo, abrindo o chão.',
    rulesSummary:
      'A cada Disparo você pode causar metade do dano e criar terreno difícil na área.',
  }),
  mod({
    id: 'mortar-mod-narrow-blast',
    name: 'Rajada Estreita',
    originalName: 'Narrow Blast',
    category: 'breakthrough',
    subclass: 'innovation-mortar',
    page: 65,
    description: 'A força do impacto vira um cone estreito.',
    rulesSummary:
      'A cada Disparo você pode usar cone de 6 m no lugar da explosão de 3 m, a partir do impacto (para longe de você ou 45° para os lados).',
  }),
  mod({
    id: 'mortar-mod-enhanced-damage',
    name: 'Dano Aprimorado',
    originalName: 'Enhanced Damage',
    category: 'revolutionary',
    subclass: 'innovation-mortar',
    page: 65,
    description: 'Como a modificação revolucionária de arma de mesmo nome.',
    rulesSummary: 'Aumenta o dano do morteiro (modificação revolucionária de arma).',
  }),
  mod({
    id: 'mortar-mod-impossible-alloy',
    name: 'Liga Impossível',
    originalName: 'Impossible Alloy',
    category: 'revolutionary',
    subclass: 'innovation-mortar',
    page: 65,
    description: 'Liga incrustada na munição no disparo.',
    rulesSummary:
      'Como a modificação revolucionária de arma de mesmo nome, na munição.',
  }),
  mod({
    id: 'mortar-mod-precise-blast',
    name: 'Explosão Precisa',
    originalName: 'Precise Blast',
    category: 'revolutionary',
    subclass: 'innovation-mortar',
    page: 65,
    description: 'A explosão contorna aliados.',
    rulesSummary:
      'Ao Disparar, exclua até o modificador de INT quadrados da área.',
  }),
]

const constructMods = CONSTRUCT_MODIFICATIONS.map((m) =>
  catalogOption({
    id: m.id,
    name: m.name,
    originalName: m.originalName,
    category: m.tier,
    level: m.minLevel ?? (m.tier === 'breakthrough' ? 7 : m.tier === 'revolutionary' ? 15 : 1),
    subclassIds: ['innovation-construct'],
    description: m.description,
    rulesSummary: m.description,
    prerequisiteOptionIds: m.prerequisiteModificationId
      ? [m.prerequisiteModificationId]
      : undefined,
  }),
)

export const inventorCatalog: ClassCatalogDefinition = {
  id: 'inventor-modifications',
  classId: CLASS_INVENTOR_ID,
  label: 'Inovação',
  originalName: 'Innovation',
  description:
    'Depois de escolher o tipo (armadura, construto ou arma), defina o traje ou a arma-base e a 1ª modificação. No 7º entra avanço; no 15º, revolucionária. Construto: o chassi da ficha do lacaio continua na aba Companheiros — as modificações aqui são o plano da inovação.',
  kind: 'progression',
  unique: true,
  pickMode: 'perCategory',
  filterBySubclass: true,
  slotsByLevel: [
    { minLevel: 1, count: 1 },
    { minLevel: 7, count: 2 },
    { minLevel: 15, count: 3 },
  ],
  picksPerCategory: [
    { category: 'initial', minLevel: 1, count: 1 },
    { category: 'breakthrough', minLevel: 7, count: 1 },
    { category: 'revolutionary', minLevel: 15, count: 1 },
  ],
  categoryMinLevel: { initial: 1, breakthrough: 7, revolutionary: 15 },
  categoryLabels: {
    initial: 'Inicial',
    breakthrough: 'Avanço (7º)',
    revolutionary: 'Revolucionária (15º)',
  },
  constraints: [
    { kind: 'requireSubclass', message: 'Escolha a inovação primeiro' },
    {
      kind: 'advancedWeaponSkipsInitial',
      message:
        'Arma avançada como base: você não ganha a modificação inicial (só avanço e revolucionária).',
    },
  ],
  searchPlaceholder: 'Buscar modificação…',
  details: [
    {
      id: 'armorStyle',
      label: 'Traje da inovação',
      description: 'As duas estatísticas de armadura média do Guns & Gears (Remastered).',
      subclassIds: ['innovation-armor'],
      kind: 'choice',
      required: true,
      options: [
        {
          id: 'power-suit',
          name: 'Traje de Poder',
          originalName: 'Power Suit',
          rulesSummary:
            'CA +5, Dex +1, penalidade −2, −1,5 m, For 3, Bulk 2, grupo composto.',
        },
        {
          id: 'subterfuge-suit',
          name: 'Traje de Subterfúgio',
          originalName: 'Subterfuge Suit',
          rulesSummary:
            'CA +2, Dex +4, penalidade −1, sem penalidade de Deslocamento, For 0, Bulk 1, grupo composto.',
        },
      ],
    },
    {
      id: 'weaponId',
      label: 'Arma-base da inovação',
      description:
        'Arma comum de 0º simples ou marcial (ou avançada: conta como marcial e você não ganha a modificação inicial).',
      subclassIds: ['innovation-weapon'],
      kind: 'weapon',
      required: true,
    },
  ],
  options: [...armorMods, ...weaponMods, ...constructMods, ...mortarMods].map((o) => ({
    ...o,
    sourceId: SRC,
  })),
}
