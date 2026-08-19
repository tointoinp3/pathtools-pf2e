import type { FamiliarAbilityDefinition } from '@/types/companion'

/**
 * Catálogo de habilidades de familiar / pet / mestre (Player Core + Pet feat).
 * Não inclui fichas de criaturas — só opções de habilidade para a UI.
 * Ref: https://2e.aonprd.com/Familiars.aspx · Rules Companions ID=2112
 */
export const FAMILIAR_ABILITY_DEFINITIONS: FamiliarAbilityDefinition[] = [
  // —— Pet feat (também como familiar abilities) ——
  {
    id: 'fam-amphibious',
    name: 'Anfíbio',
    originalName: 'Amphibious',
    kind: 'pet',
    description:
      'Ganha o traço anfíbio (respira ar e água) e Velocidade terrestre e de natação iguais à maior delas.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-burrower',
    name: 'Escavador',
    originalName: 'Burrower',
    kind: 'pet',
    description: 'Ganha Velocidade de escavação de 1,5 m para cavar buracos Minúsculos.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-climber',
    name: 'Escalador',
    originalName: 'Climber',
    kind: 'pet',
    description: 'Ganha Velocidade de escalada de 7,5 m.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-darkvision',
    name: 'Visão no Escuro',
    originalName: 'Darkvision',
    kind: 'pet',
    description: 'Ganha visão no escuro.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-echolocation',
    name: 'Ecolocalização',
    originalName: 'Echolocation',
    kind: 'pet',
    description: 'Usa audição como sentido preciso em até 6 m.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-fast-movement',
    name: 'Movimento Rápido',
    originalName: 'Fast Movement',
    kind: 'pet',
    description: 'Aumenta uma Velocidade de 7,5 m para 12 m.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-flier',
    name: 'Voador',
    originalName: 'Flier',
    kind: 'pet',
    description: 'Ganha Velocidade de voo de 7,5 m.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-manual-dexterity',
    name: 'Destreza Manual',
    originalName: 'Manual Dexterity',
    kind: 'pet',
    description:
      'Pode usar até dois membros como mãos para ações de manipulação.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-scent',
    name: 'Faro',
    originalName: 'Scent',
    kind: 'pet',
    description: 'Usa faro como sentido impreciso em até 9 m.',
    source: 'Player Core pg. 259',
  },
  {
    id: 'fam-tough',
    name: 'Resistente',
    originalName: 'Tough',
    kind: 'pet',
    description: 'PV máximo aumentam em +2 por nível.',
    source: 'Player Core pg. 259',
  },

  // —— Familiar abilities (Player Core) ——
  {
    id: 'fam-accompanist',
    name: 'Acompanhante',
    originalName: 'Accompanist',
    kind: 'familiar',
    description:
      'Quando você faz Performance e o familiar pode agir por perto, +1 de circunstância (+2 se mestre em Performance).',
    source: 'Player Core pg. 212',
  },
  {
    id: 'fam-construct',
    name: 'Construto',
    originalName: 'Construct',
    kind: 'familiar',
    description:
      'Troca o traço animal por construto e imunidades associadas. Exige Resistente.',
    source: 'Player Core pg. 212',
    changesCreatureTrait: true,
    prerequisiteHint: 'Precisa da habilidade Resistente.',
  },
  {
    id: 'fam-damage-avoidance',
    name: 'Evitar Dano',
    originalName: 'Damage Avoidance',
    kind: 'familiar',
    description:
      'Escolha um tipo de salvaguarda: em sucesso nessa salvaguarda, o familiar não sofre dano (outros efeitos ainda se aplicam).',
    source: 'Player Core pg. 212',
  },
  {
    id: 'fam-dragon',
    name: 'Dragão',
    originalName: 'Dragon',
    kind: 'familiar',
    description: 'Troca o traço animal por dragão.',
    source: 'Player Core pg. 212',
    changesCreatureTrait: true,
  },
  {
    id: 'fam-elemental',
    name: 'Elemental',
    originalName: 'Elemental',
    kind: 'familiar',
    description:
      'Troca animal por elemental (ar, terra, fogo, metal, água ou madeira) + imunidades. Exige Resistência.',
    source: 'Player Core pg. 212',
    changesCreatureTrait: true,
    prerequisiteHint: 'Precisa da habilidade Resistência.',
  },
  {
    id: 'fam-focused-rejuvenation',
    name: 'Rejuvenescimento Focado',
    originalName: 'Focused Rejuvenation',
    kind: 'familiar',
    description:
      'Ao Refocar, o familiar recupera 1 PV por seu nível.',
    source: 'Player Core pg. 212',
  },
  {
    id: 'fam-fungus',
    name: 'Fungo',
    originalName: 'Fungus',
    kind: 'familiar',
    description: 'Troca o traço animal por fungo.',
    source: 'Player Core pg. 212',
    changesCreatureTrait: true,
  },
  {
    id: 'fam-independent',
    name: 'Independente',
    originalName: 'Independent',
    kind: 'familiar',
    description:
      'No encontro, se você não Comandar o familiar, ele ainda ganha 1 ação na rodada.',
    source: 'Player Core pg. 212',
  },
  {
    id: 'fam-kinspeech',
    name: 'Fala de Parentes',
    originalName: 'Kinspeech',
    kind: 'familiar',
    description:
      'Entende e fala com animais da mesma espécie. Exige Fala; nível 6+.',
    source: 'Player Core pg. 212',
    minLevel: 6,
    prerequisiteHint: 'Familiar animal com Fala; mestre nv. 6+.',
  },
  {
    id: 'fam-major-resistance',
    name: 'Resistência Maior',
    originalName: 'Major Resistance',
    kind: 'familiar',
    description:
      'Aumenta a Resistência para um valor igual ao seu nível. Nível 8+.',
    source: 'Player Core pg. 213',
    minLevel: 8,
    prerequisiteHint: 'Precisa de Resistência; nv. 8+.',
  },
  {
    id: 'fam-masters-form',
    name: 'Forma do Mestre',
    originalName: "Master's Form",
    kind: 'familiar',
    description:
      'Muda de forma (1 ação) para humanóide cosmética da sua ancestralidade. Exige Destreza Manual e Fala.',
    source: 'Player Core pg. 213',
    prerequisiteHint: 'Destreza Manual + Fala.',
  },
  {
    id: 'fam-partner-in-crime',
    name: 'Parceiro no Crime',
    originalName: 'Partner in Crime',
    kind: 'familiar',
    description:
      'Ganha 1 reação só para Auxiliar em Enganação ou Ladinagem (sucesso automático; crítico se você for mestre).',
    source: 'Player Core pg. 213',
  },
  {
    id: 'fam-plant',
    name: 'Planta',
    originalName: 'Plant',
    kind: 'familiar',
    description: 'Troca o traço animal por planta.',
    source: 'Player Core pg. 213',
    changesCreatureTrait: true,
  },
  {
    id: 'fam-plant-form',
    name: 'Forma de Planta',
    originalName: 'Plant Form',
    kind: 'familiar',
    description:
      'Muda de forma (1 ação) para planta Minúscula similar. Exige traço planta.',
    source: 'Player Core pg. 213',
    prerequisiteHint: 'Familiar com traço planta.',
  },
  {
    id: 'fam-resistance',
    name: 'Resistência',
    originalName: 'Resistance',
    kind: 'familiar',
    description:
      'Escolha dois entre ácido, frio, eletricidade, fogo, veneno ou sônico: resistência igual a metade do nível (mín. 1).',
    source: 'Player Core pg. 213',
  },
  {
    id: 'fam-skilled',
    name: 'Perito',
    originalName: 'Skilled',
    kind: 'familiar',
    description:
      'Escolha uma perícia (exceto Acrobacia/Furtividade): modificador = nível + atributo de conjuração. Repetível.',
    source: 'Player Core pg. 213',
    repeatable: true,
  },
  {
    id: 'fam-speech',
    name: 'Fala',
    originalName: 'Speech',
    kind: 'familiar',
    description: 'Entende e fala um idioma que você conhece.',
    source: 'Player Core pg. 213',
  },
  {
    id: 'fam-spellcasting',
    name: 'Conjuração',
    originalName: 'Spellcasting',
    kind: 'familiar',
    description:
      'Escolha uma magia ≥ 5 postos abaixo do seu maior espaço; o familiar conjura 1×/dia. Exige espaços de 6º posto.',
    source: 'Player Core pg. 213',
    prerequisiteHint: 'Conjurar magias de 6º posto com espaços.',
  },
  {
    id: 'fam-toolbearer',
    name: 'Porta-ferramentas',
    originalName: 'Toolbearer',
    kind: 'familiar',
    description:
      'Carrega um kit de até carga leve; adjacente a você, saca/guarda com a ação. Exige Destreza Manual.',
    source: 'Player Core pg. 213',
    prerequisiteHint: 'Destreza Manual.',
  },
  {
    id: 'fam-touch-telepathy',
    name: 'Telepatia ao Toque',
    originalName: 'Touch Telepathy',
    kind: 'familiar',
    description:
      'Comunica-se telepaticamente com você por toque; com Fala, com qualquer criatura que compartilhe idioma.',
    source: 'Player Core pg. 213',
  },
  {
    id: 'fam-valet',
    name: 'Valete',
    originalName: 'Valet',
    kind: 'familiar',
    description:
      'Ao Comandar, até 2× no seu turno o familiar Interage para colocar um item leve/negligível de você numa mão livre.',
    source: 'Player Core pg. 213',
  },

  // —— Familiar abilities (Player Core 2) ——
  {
    id: 'fam-item-delivery',
    name: 'Entrega de Item',
    originalName: 'Item Delivery',
    kind: 'familiar',
    description:
      'Se o familiar estiver adjacente, ao Comandar ele Interage para pegar um item de carga leve ou menor que você segura, faz 1 ação de movimento e Interage para passar a uma criatura disposta (ou administrar, se for 1 ação — ex.: elixir). Se não alcançar neste turno, segura o item até novo comando.',
    source: 'Player Core 2 pg. 170',
    prerequisiteHint: 'Destreza Manual.',
  },
  {
    id: 'fam-poison-reservoir',
    name: 'Reservatório de Veneno',
    originalName: 'Poison Reservoir',
    kind: 'familiar',
    description:
      'Aplica veneno de ferimento na arma exposta de um aliado adjacente com 1 Interagir. Você abastece o reservatório com 2 Interagir consecutivos.',
    source: 'Player Core 2 pg. 170',
    prerequisiteHint: 'Familiar homúnculo.',
  },
  {
    id: 'fam-second-opinion',
    name: 'Segunda Opinião',
    originalName: 'Second Opinion',
    kind: 'familiar',
    description:
      'Ganha 1 reação no início dos turnos só para Auxiliar em Recordar Conhecimento de uma perícia em que tenha Perito. Sucesso automático (crítico se você for mestre nessa perícia). Ainda precisa preparar o Auxílio.',
    source: 'Player Core 2 pg. 170',
    prerequisiteHint: 'Perito na perícia a auxiliar.',
  },

  // —— Familiar abilities (Rage of Elements) ——
  {
    id: 'fam-jet',
    name: 'Jato',
    originalName: 'Jet',
    kind: 'familiar',
    description:
      'Com rajadas de energia elemental ou magia, pode Saltar até 9 m em qualquer direção, mesmo além do máximo normal. O Salto precisa começar e terminar numa superfície sólida que suporte o familiar.',
    source: 'Rage of Elements pg. 42',
  },
  {
    id: 'fam-levitator',
    name: 'Levitador',
    originalName: 'Levitator',
    kind: 'familiar',
    description:
      'Flutua até 90 cm acima de superfícies sólidas ou líquidas com Velocidade 7,5 m. Ignora terreno difícil e efeitos de contato com a superfície; em geral evita reações de armadilhas que exigem pisar nelas ou numa placa de pressão.',
    source: 'Rage of Elements pg. 42',
  },

  // —— Familiar abilities (Treasure Vault Remastered) ——
  {
    id: 'fam-alchemical-gut',
    name: 'Intestino Alquímico',
    originalName: 'Alchemical Gut',
    kind: 'familiar',
    description:
      'Funciona como alambique coagulante de bombas: engole a bomba (2 Interagir do familiar + 1 seu) e regurgita o item concentrado 1 minuto depois. Se tentar destilar uma bomba de nível maior que o seu −1, sofre dano como se tivesse sido atingido pela bomba.',
    source: 'Treasure Vault (Remastered) pg. 51',
  },

  {
    id: 'fam-play-dead',
    name: 'Fingir de Morto',
    originalName: 'Play Dead',
    kind: 'familiar',
    description:
      'Finge ser inanimado. Pode Furtar-se sem cobertura nem ocultação contra quem não percebeu que está vivo, num lugar onde não chamaria atenção. Sucesso: os observadores ainda o veem, mas o tomam por objeto. Depois de enganados uma vez, percebem que está vivo e ele não pode mais Furtar-se assim contra eles.',
    source: 'Tian Xia Character Guide pg. 124',
  },
  {
    id: 'fam-versatile-form',
    name: 'Forma Versátil',
    originalName: 'Versatile Form',
    kind: 'familiar',
    description:
      '1×/dia, 10 minutos: troque uma habilidade de familiar ou de mestre. O familiar precisa ser construto, e você precisa estar pelo menos treinado em Ofício.',
    source: 'Tian Xia Character Guide pg. 124',
    prerequisiteHint: 'Familiar construto; treinado em Ofício.',
  },

  // —— Master abilities (Player Core) ——
  {
    id: 'mast-absorb-familiar',
    name: 'Absorver Familiar',
    originalName: 'Absorb Familiar',
    kind: 'master',
    description:
      'O familiar vira marca na sua pele (1 min, concentração). Quase invisível a inimigos; empatia permanece.',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-cantrip-connection',
    name: 'Conexão de Truque',
    originalName: 'Cantrip Connection',
    kind: 'master',
    description:
      'Truque extra preparado ou no repertório enquanto esta habilidade estiver selecionada.',
    source: 'Player Core pg. 214',
    prerequisiteHint: 'Precisa preparar ou ter repertório de truques.',
  },
  {
    id: 'mast-familiar-focus',
    name: 'Foco do Familiar',
    originalName: 'Familiar Focus',
    kind: 'master',
    description:
      '1×/dia o familiar gasta 2 ações (concentração) para restaurar 1 Ponto de Foco.',
    source: 'Player Core pg. 214',
    prerequisiteHint: 'Você precisa ter reserva de foco.',
  },
  {
    id: 'mast-innate-surge',
    name: 'Surto Inato',
    originalName: 'Innate Surge',
    kind: 'master',
    description:
      '1×/dia reutiliza uma magia inata de feito de ancestralidade já usada hoje.',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-lifelink',
    name: 'Elo Vital',
    originalName: 'Lifelink',
    kind: 'master',
    description:
      'Reação (concentração): se o familiar ia a 0 PV por dano, você sofre o dano no lugar.',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-recall-familiar',
    name: 'Recobrar Familiar',
    originalName: 'Recall Familiar',
    kind: 'master',
    description:
      '1×/dia, atividade de 3 ações (concentração): teleporta o familiar até você (até 1,6 km).',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-restorative-familiar',
    name: 'Familiar Restaurador',
    originalName: 'Restorative Familiar',
    kind: 'master',
    description:
      '1×/dia, 2 ações (concentração) no seu espaço: cura 1d8 × metade do nível (mín. 1d8).',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-share-senses',
    name: 'Compartilhar Sentidos',
    originalName: 'Share Senses',
    kind: 'master',
    description:
      'A cada 10 min, 1 ação (concentração): projeta sentidos no familiar até 1 minuto (Dispensar).',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-spell-battery',
    name: 'Bateria de Magia',
    originalName: 'Spell Battery',
    kind: 'master',
    description:
      'Espaço extra ≥ 3 postos abaixo do maior. Exige conjurar magias de 4º posto com espaços.',
    source: 'Player Core pg. 214',
    prerequisiteHint: 'Magias de 4º posto com espaços.',
  },
  {
    id: 'mast-spell-delivery',
    name: 'Entrega de Magia',
    originalName: 'Spell Delivery',
    kind: 'master',
    description:
      'Com familiar no seu espaço: magia de toque; ele gasta 2 ações para mover e tocar o alvo.',
    source: 'Player Core pg. 214',
  },
  {
    id: 'mast-extra-alchemy',
    name: 'Alquimia Extra',
    originalName: 'Extra Alchemy',
    kind: 'master',
    description:
      'O familiar ajuda a preparar itens no início do dia. Você cria um item adicional com alquimia avançada nas preparações diárias.',
    source: 'Player Core 2 pg. 170',
  },
  {
    id: 'mast-extra-vial',
    name: 'Frasco Extra',
    originalName: 'Extra Vial',
    kind: 'master',
    description:
      'O familiar acumula líquidos alquímicos no corpo. 1×/dia, Interagir com o familiar adjacente para ganhar um frasco versátil.',
    source: 'Player Core 2 pg. 170',
  },
  {
    id: 'mast-kindling',
    name: 'Acender',
    originalName: 'Kindling',
    kind: 'master',
    description:
      '1×/dia, ação livre: ao Conjurar magia com traço fogo, que cause dano e sem duração, sacrifique o familiar. Ele morre na hora; você ganha bônus de status no dano da magia igual ao dobro do posto da magia.',
    source: 'Tian Xia Character Guide pg. 124',
  },
]

export const FAMILIAR_ABILITIES_BY_ID = Object.fromEntries(
  FAMILIAR_ABILITY_DEFINITIONS.map((a) => [a.id, a]),
) as Record<string, FamiliarAbilityDefinition>
